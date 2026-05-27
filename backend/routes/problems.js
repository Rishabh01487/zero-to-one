import { Router } from 'express';
import db from '../db/index.js';
import patterns from '../patterns/metadata.js';

const router = Router();

function categoryOrder(cat) {
  const p = patterns.find(x => x.id === cat && x.type === 'broad');
  return p ? p.order : 999;
}

// ── LeetCode-style template auto-generation ─────────────────
function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(/\s+/)
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function guessMethodSignature(problem) {
  const name = toCamelCase(problem.title);
  const cat = (problem.category || '').toLowerCase();
  const examples = problem.examples || [];
  const sampleIn = examples[0]?.input || '';
  const sampleOut = examples[0]?.output || '';
  const isBool = sampleOut === 'true' || sampleOut === 'false';
  const isNumeric = /^-?\d+$/.test(sampleOut.trim());
  const isArray = sampleOut.includes(' ');
  const lines = sampleIn.split('\n').filter(Boolean);
  let hasArr = cat === 'arrays' || cat === 'sorting' || cat === 'twopointers' || /arr|nums|vector/.test(problem.solution_template || '');
  let hasStr = cat === 'strings' || /string/.test(problem.solution_template || '');
  let hasTarget = /target|sum/.test(problem.title.toLowerCase());
  let hasKey = /val|key/.test(problem.title.toLowerCase());

  // Default return type
  let retType = 'void';
  if (isBool) retType = 'bool';
  else if (isNumeric && !isArray) retType = 'int';
  else if (isArray) retType = 'vector<int>';

  // Default params
  let params = '';
  if (hasStr && !hasArr) {
    params = 'string s';
  } else if (hasArr || cat === 'arrays' || lines.length >= 2) {
    params = 'vector<int>& nums';
    if (hasTarget) params += ', int target';
    else if (hasKey) params += ', int val';
  } else if (cat === 'matrix' || cat === 'graph' || cat === 'dp') {
    params = 'vector<vector<int>>& grid';
  } else {
    params = 'vector<int>& nums';
  }

  if (retType === 'vector<int>' && params === 'vector<int>& nums') {
    retType = 'void';
  }

  return { retType, methodName: name, params };
}

function generateLeetCodeTemplate(problem) {
  const sig = guessMethodSignature(problem);
  return `class Solution {\npublic:\n    ${sig.retType} ${sig.methodName}(${sig.params}) {\n        \n    }\n};`;
}

router.get('/', async (req, res) => {
  const { difficulty, category, technique } = req.query;
  let problems = await db.query('problems');
  if (difficulty) problems = problems.filter(p => p.difficulty === difficulty);
  if (category) problems = problems.filter(p => p.category === category);
  if (technique) problems = problems.filter(p => p.techniques && p.techniques.includes(technique));
  problems.sort((a, b) => {
    const diffOrder = { easy: 0, medium: 1, hard: 2 };
    return categoryOrder(a.category) - categoryOrder(b.category)
        || (diffOrder[a.difficulty] || 0) - (diffOrder[b.difficulty] || 0)
        || a.title.localeCompare(b.title);
  });
  res.json(problems.map(({ id, title, difficulty, category, techniques }) => ({ id, title, difficulty, category, techniques: techniques || [] })));
});

router.get('/:id', async (req, res) => {
  const problem = await db.getOne('problems', req.params.id);
  if (!problem) return res.status(404).json({ error: 'Problem not found' });
  if (typeof problem.examples === 'string') problem.examples = JSON.parse(problem.examples);
  if (typeof problem.test_cases === 'string') problem.test_cases = JSON.parse(problem.test_cases);
  // Add LeetCode-style template alongside the original solution_template
  problem.leetcode_template = generateLeetCodeTemplate(problem);
  res.json(problem);
});

router.post('/seed', async (req, res) => {
  const { problems } = req.body;
  if (!Array.isArray(problems)) return res.status(400).json({ error: 'Problems array required' });

  for (const p of problems) {
    await db.upsert('problems', p.id, {
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
