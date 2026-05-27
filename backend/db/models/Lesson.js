import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  order_index: { type: Number, default: 0 },
  content: { type: String, default: '' },
  code_example: { type: String, default: '' }
});

export default mongoose.model('Lesson', lessonSchema);
