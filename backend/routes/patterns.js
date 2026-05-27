import { Router } from 'express';
import db from '../db/index.js';
import patterns from '../patterns/metadata.js';

const router = Router();

function getCategories(p) {
  return p.categories || [p.id];
}

router.get('/', async (req, res) => {
  const allProblems = await db.query('problems');
  const all = patterns.map(p => {
    let filtered;
    if (p.type === 'technique') {
      filtered = allProblems.filter(prob =>
        prob.techniques && prob.techniques.includes(p.id)
      );
    } else {
      const cats = getCategories(p);
      filtered = allProblems.filter(prob => cats.includes(prob.category));
    }
    const difficultyBreakdown = filtered.reduce((acc, prob) => {
      acc[prob.difficulty] = (acc[prob.difficulty] || 0) + 1;
      return acc;
    }, { easy: 0, medium: 0, hard: 0 });
    return { ...p, problemCount: filtered.length, difficultyBreakdown };
  });
  res.json(all);
});

router.get('/:id', async (req, res) => {
  const pattern = patterns.find(p => p.id === req.params.id);
  if (!pattern) return res.status(404).json({ error: 'Pattern not found' });
  const allProblems = await db.query('problems');
  let problems;
  if (pattern.type === 'technique') {
    problems = allProblems.filter(prob =>
      prob.techniques && prob.techniques.includes(pattern.id)
    );
  } else {
    const cats = getCategories(pattern);
    problems = allProblems.filter(prob => cats.includes(prob.category));
  }
  res.json({ ...pattern, problemCount: problems.length, problems });
});

export default router;
