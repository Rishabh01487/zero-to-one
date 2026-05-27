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

import db, { connectDB } from './db/index.js';
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

app.post('/api/leetcode-graphql', async (req, res) => {
  try {
    const { query, variables } = req.body;
    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
      body: JSON.stringify({ query, variables })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json({ data: null, errors: [{ message: err.message }] });
  }
});

app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3002;

// Connect to MongoDB and seed on module load
try {
  await connectDB();
  const { seedDatabase } = await import('./seed.js');
  await seedDatabase();
  console.log('Seed completed');
} catch (e) {
  console.log('Seed skipped:', e.message);
}

httpServer.listen(PORT, () => {
  console.log(`Zero to One server running on port ${PORT}`);
});
