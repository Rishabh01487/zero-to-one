import { Router } from 'express';
import db from '../db/schema.js';

const router = Router();

router.get('/', (req, res) => {
  const lessons = db.query('lessons');
  const summary = lessons
    .sort((a, b) => a.order_index - b.order_index)
    .map(({ id, title, category, order_index }) => ({ id, title, category, order_index }));
  res.json(summary);
});

router.get('/:id', (req, res) => {
  const lesson = db.getOne('lessons', req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  res.json(lesson);
});

router.post('/seed', (req, res) => {
  const { lessons } = req.body;
  if (!Array.isArray(lessons)) return res.status(400).json({ error: 'Lessons array required' });

  for (const item of lessons) {
    db.upsert('lessons', item.id, {
      id: item.id,
      title: item.title,
      category: item.category,
      order_index: item.order_index,
      content: item.content,
      code_example: item.code_example || ''
    });
  }
  res.json({ seeded: lessons.length });
});

export default router;
