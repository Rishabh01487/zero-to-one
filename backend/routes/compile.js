import { Router } from 'express';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

const TEMP_DIR = path.join(__dirname, '..', '..', 'temp');
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

router.post('/', async (req, res) => {
  const { code, input } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  const id = uuidv4();
  const srcFile = path.join(TEMP_DIR, `${id}.cpp`);
  const exeFile = path.join(TEMP_DIR, `${id}.exe`);

  try {
    fs.writeFileSync(srcFile, code);
    execSync(`g++ "${srcFile}" -o "${exeFile}" -std=c++17 2>&1`, {
      timeout: 10000,
      encoding: 'utf-8'
    });

    const startTime = Date.now();
    let output;
    try {
      output = execSync(`"${exeFile}"`, {
        input: input || '',
        timeout: 5000,
        encoding: 'utf-8',
        maxBuffer: 1024 * 1024
      });
    } catch (runErr) {
      output = runErr.stderr || runErr.stdout || 'Execution error';
    }
    const execTime = Date.now() - startTime;

    res.json({
      output: output || '(no output)',
      executionTime: `${execTime}ms`,
      success: true
    });
  } catch (compileErr) {
    res.json({
      output: compileErr.stderr || compileErr.message,
      success: false
    });
  } finally {
    try {
      if (fs.existsSync(srcFile)) fs.unlinkSync(srcFile);
      if (fs.existsSync(exeFile)) fs.unlinkSync(exeFile);
    } catch (e) {}
  }
});

export default router;
