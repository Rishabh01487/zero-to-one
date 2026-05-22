import { Router } from 'express';
import db from '../db/schema.js';

const router = Router();

router.get('/', (req, res) => {
  const { difficulty, category, technique } = req.query;
  let problems = db.query('problems');
  if (difficulty) problems = problems.filter(p => p.difficulty === difficulty);
  if (category) problems = problems.filter(p => p.category === category);
  if (technique) problems = problems.filter(p => p.techniques && p.techniques.includes(technique));
  problems.sort((a, b) => {
    const diffOrder = { easy: 0, medium: 1, hard: 2 };
    return (diffOrder[a.difficulty] || 0) - (diffOrder[b.difficulty] || 0) || a.title.localeCompare(b.title);
  });
  res.json(problems.map(({ id, title, difficulty, category, techniques }) => ({ id, title, difficulty, category, techniques: techniques || [] })));
});

router.get('/:id', (req, res) => {
  const problem = db.getOne('problems', req.params.id);
  if (!problem) return res.status(404).json({ error: 'Problem not found' });
  if (typeof problem.examples === 'string') problem.examples = JSON.parse(problem.examples);
  if (typeof problem.test_cases === 'string') problem.test_cases = JSON.parse(problem.test_cases);
  res.json(problem);
});

router.post('/seed', (req, res) => {
  const { problems } = req.body;
  if (!Array.isArray(problems)) return res.status(400).json({ error: 'Problems array required' });

  for (const p of problems) {
    db.upsert('problems', p.id, {
      id: p.id,
      title: p.title,
      difficulty: p.difficulty,
      category: p.category,
      description: p.description,
      examples: p.examples,
      constraints: p.constraints || '',
      solution_template: p.solution_template,
      test_cases: p.test_cases,
      approach: p.approach || '',
      complexity: p.complexity || {},
      sheet: p.sheet || '',
      solution_code: p.solution_code || '',
      techniques: p.techniques || []
    });
  }
  res.json({ seeded: problems.length });
});

export default router;
