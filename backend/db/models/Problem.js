import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  constraints: { type: String, default: '' },
  techniques: [{ type: String }],
  examples: { type: mongoose.Schema.Types.Mixed, default: [] },
  test_cases: { type: mongoose.Schema.Types.Mixed, default: [] },
  solution_template: { type: String, default: '' },
  solution_code: { type: String, default: '' },
  approach: { type: String, default: '' },
  complexity: { type: mongoose.Schema.Types.Mixed, default: {} },
  mermaid: { type: String, default: '' },
  sheet: { type: String, default: '' }
});

export default mongoose.model('Problem', problemSchema);
