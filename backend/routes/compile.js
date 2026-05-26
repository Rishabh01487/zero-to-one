import { Router } from 'express';

const router = Router();

const PISTON = 'https://emkc.org/api/v2/piston/execute';

router.post('/', async (req, res) => {
  const { code, input } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  try {
    const start = Date.now();
    const piston = await fetch(PISTON, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'cpp',
        version: '*',
        files: [{ name: 'main.cpp', content: code }],
        stdin: input || '',
        compile_timeout: 10000,
        run_timeout: 5000,
      }),
    });

    const result = await piston.json();

    if (result.compile?.stderr) {
      return res.json({ output: result.compile.stderr, success: false });
    }

    const execTime = Date.now() - start;
    const output = result.run?.stdout || result.run?.output || '(no output)';
    const stderr = result.run?.stderr;

    res.json({
      output: stderr ? `${output}\n${stderr}` : output,
      executionTime: `${execTime}ms`,
      success: result.run?.code === 0,
    });
  } catch (err) {
    res.json({ output: err.message, success: false });
  }
});

export default router;
