import { Router } from 'express';
import db from '../db/schema.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/user', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });

  let user = db.query('users', { username })[0] || null;
  if (!user) {
    user = { id: uuidv4(), username, created_at: new Date().toISOString() };
    db.insert('users', user);
  }
  res.json(user);
});

router.get('/:userId', (req, res) => {
  const progress = db.query('progress', { user_id: req.params.userId });
  res.json(progress);
});

router.post('/:userId/:itemId', (req, res) => {
  const { userId, itemId } = req.params;
  const { itemType, code } = req.body;

  const existing = db.query('progress', { user_id: userId, item_id: itemId })[0];
  if (existing) {
    db.update('progress', existing.id, { completed: 1, code: code || '', completed_at: new Date().toISOString() });
  } else {
    db.insert('progress', {
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

router.get('/:userId/stats', (req, res) => {
  const allLessons = db.query('lessons');
  const allProblems = db.query('problems');
  const userProgress = db.query('progress', { user_id: req.params.userId });
  const completedLessons = userProgress.filter(p => p.item_type === 'lesson' && p.completed).length;
  const completedProblems = userProgress.filter(p => p.item_type === 'problem' && p.completed).length;

  res.json({
    totalLessons: allLessons.length,
    totalProblems: allProblems.length,
    completedLessons,
    completedProblems
  });
});

export default router;
