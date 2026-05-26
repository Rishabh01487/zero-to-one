import { Router } from 'express';

const router = Router();

const WANDBOX = 'https://wandbox.org/api/compile.json';

router.post('/', async (req, res) => {
  const { code, input } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  try {
    const start = Date.now();
    const wandbox = await fetch(WANDBOX, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        compiler: 'gcc-head',
        options: '-std=c++17',
        stdin: input || '',
        save: false,
        compiler_option_raw: true,
        runtime_option_raw: false,
      }),
    });

    const result = await wandbox.json();
    const execTime = Date.now() - start;

    if (result.compiler_error) {
      return res.json({ output: result.compiler_error, success: false });
    }

    res.json({
      output: result.program_output || result.program_message || '(no output)',
      executionTime: `${execTime}ms`,
      success: result.status === '0',
    });
  } catch (err) {
    res.json({ output: err.message, success: false });
  }
});

export default router;
