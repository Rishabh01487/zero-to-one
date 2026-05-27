import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  item_id: { type: String, required: true },
  item_type: { type: String, default: 'problem' },
  completed: { type: Number, default: 0 },
  submissions: { type: Number, default: 0 },
  code: { type: String, default: '' },
  last_code: { type: String, default: '' },
  completed_at: { type: String, default: '' },
  last_submitted: { type: String, default: '' }
});

progressSchema.index({ user_id: 1, item_id: 1 });

export default mongoose.model('Progress', progressSchema);
