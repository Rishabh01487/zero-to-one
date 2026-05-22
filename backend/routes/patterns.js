import { Router } from 'express';
import db from '../db/schema.js';
import patterns from '../patterns/metadata.js';

const router = Router();

router.get('/', (req, res) => {
  const all = patterns.map(p => {
    const count = db.query('problems').filter(prob => prob.category === p.id).length;
    const difficultyBreakdown = db.query('problems').filter(prob => prob.category === p.id).reduce((acc, prob) => {
      acc[prob.difficulty] = (acc[prob.difficulty] || 0) + 1;
      return acc;
    }, { easy: 0, medium: 0, hard: 0 });
    return { ...p, problemCount: count, difficultyBreakdown };
  });
  res.json(all);
});

router.get('/:id', (req, res) => {
  const pattern = patterns.find(p => p.id === req.params.id);
  if (!pattern) return res.status(404).json({ error: 'Pattern not found' });
  const problems = db.query('problems').filter(prob => prob.category === req.params.id);
  res.json({ ...pattern, problemCount: problems.length, problems });
});

export default router;
