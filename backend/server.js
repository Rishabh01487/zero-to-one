import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] } });

app.use(cors());
app.use(express.json({ limit: '50mb' }));

import './db/schema.js';
import compileRoutes from './routes/compile.js';
import lessonsRoutes from './routes/lessons.js';
import problemsRoutes from './routes/problems.js';
import progressRoutes from './routes/progress.js';
import patternsRoutes from './routes/patterns.js';
import { instrumentCode } from './services/visualizer.js';

app.use('/api/compile', compileRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/problems', problemsRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/patterns', patternsRoutes);

app.post('/api/visualize', async (req, res) => {
  const { code, input } = req.body;
  try {
    const result = await instrumentCode(code, input || '');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3002;

// Seed on module load (works on Vercel serverless)
try {
  const { seedDatabase } = await import('./seed.js');
  seedDatabase();
  console.log('Seed completed');
} catch (e) {
  console.log('Seed skipped:', e.message);
}

httpServer.listen(PORT, () => {
  console.log(`Zero to One server running on port ${PORT}`);
});
