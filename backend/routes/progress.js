import { Router } from 'express';
import db from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// POST /api/progress/:username/:itemId/submit — increment submission count
router.post('/:username/:itemId/submit', async (req, res) => {
  const { username, itemId } = req.params;
  const { code } = req.body;

  const records = await db.query('progress', { user_id: username, item_id: itemId });
  const record = records[0];
  if (record) {
    await db.update('progress', record.id, {
      submissions: (record.submissions || 0) + 1,
      last_code: code || record.last_code,
      last_submitted: new Date().toISOString()
    });
  } else {
    await db.insert('progress', {
      id: uuidv4(),
      user_id: username,
      item_id: itemId,
      item_type: 'problem',
      submissions: 1,
      completed: 0,
      last_code: code || '',
      last_submitted: new Date().toISOString()
    });
  }
  res.json({ success: true });
});

router.post('/user', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });

  const users = await db.query('users', { username });
  let user = users[0] || null;
  if (!user) {
    user = { id: uuidv4(), username, created_at: new Date().toISOString() };
    await db.insert('users', user);
  }
  res.json(user);
});

router.get('/:userId', async (req, res) => {
  const progress = await db.query('progress', { user_id: req.params.userId });
  res.json(progress);
});

router.post('/:userId/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;
  const { itemType, code } = req.body;

  const existing = (await db.query('progress', { user_id: userId, item_id: itemId }))[0];
  if (existing) {
    await db.update('progress', existing.id, { completed: 1, code: code || '', completed_at: new Date().toISOString() });
  } else {
    await db.insert('progress', {
      id: uuidv4(),
      user_id: userId,
      item_id: itemId,
      item_type: itemType,
      completed: 1,
      code: code || '',
      completed_at: new Date().toISOString()
    });
  }
  res.json({ success: true });
});

router.get('/:userId/stats', async (req, res) => {
  const allLessons = await db.query('lessons');
  const allProblems = await db.query('problems');
  const userProgress = await db.query('progress', { user_id: req.params.userId });
  const completedLessons = userProgress.filter(p => p.item_type === 'lesson' && p.completed).length;
  const completedProblems = userProgress.filter(p => p.item_type === 'problem' && p.completed).length;
  const totalSubmissions = userProgress.reduce((s, p) => s + (p.submissions || 0), 0);
  const attemptedProblems = userProgress.filter(p => p.item_type === 'problem').length;
  const byDifficulty = { easy: 0, medium: 0, hard: 0 };
  for (const p of allProblems) {
    const prog = userProgress.find(pr => pr.item_id === p.id);
    if (prog && prog.completed) {
      const d = (p.difficulty || 'medium').toLowerCase();
      if (byDifficulty[d] !== undefined) byDifficulty[d]++;
    }
  }

  res.json({
    totalLessons: allLessons.length,
    totalProblems: allProblems.length,
    completedLessons,
    completedProblems,
    attemptedProblems,
    totalSubmissions,
    byDifficulty
  });
});

export default router;
