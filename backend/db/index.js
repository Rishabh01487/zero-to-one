import mongoose from 'mongoose';
import User from './models/User.js';
import Lesson from './models/Lesson.js';
import Problem from './models/Problem.js';
import Progress from './models/Progress.js';
import { v4 as uuidv4 } from 'uuid';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zerotoone';

let connected = false;

export async function connectDB() {
  if (connected) return;
  try {
    await mongoose.connect(MONGO_URI);
    connected = true;
    console.log('✓ MongoDB connected');
  } catch (err) {
    console.warn('⚠ MongoDB connection failed:', err.message);
  }
}

// ── Compatibility layer: same API as old schema.js but backed by Mongoose ──
const MODELS = { users: User, lessons: Lesson, problems: Problem, progress: Progress };

async function ensureConnected() {
  if (!connected) await connectDB();
}

function modelFor(table) {
  const m = MODELS[table];
  if (!m) throw new Error(`Unknown table: ${table}`);
  return m;
}

const db = {
  async query(table, filter = {}) {
    await ensureConnected();
    const Model = modelFor(table);
    if (Object.keys(filter).length === 0) {
      const docs = await Model.find().lean();
      return docs.map(d => ({ ...d, id: d.id || d._id.toString() }));
    }
    const docs = await Model.find(filter).lean();
    return docs.map(d => ({ ...d, id: d.id || d._id.toString() }));
  },

  async getOne(table, id) {
    await ensureConnected();
    const Model = modelFor(table);
    const doc = await Model.findOne({ id }).lean();
    if (!doc) return null;
    return { ...doc, id: doc.id || doc._id.toString() };
  },

  async insert(table, item) {
    await ensureConnected();
    const Model = modelFor(table);
    const doc = await Model.create(item);
    return { ...doc.toObject(), id: doc.id || doc._id.toString() };
  },

  async update(table, id, changes) {
    await ensureConnected();
    const Model = modelFor(table);
    const doc = await Model.findOneAndUpdate(
      { id },
      { $set: changes },
      { new: true }
    ).lean();
    if (!doc) return null;
    return { ...doc, id: doc.id || doc._id.toString() };
  },

  async upsert(table, id, item) {
    await ensureConnected();
    const Model = modelFor(table);
    const doc = await Model.findOneAndUpdate(
      { id },
      { $set: item },
      { upsert: true, new: true }
    ).lean();
    return { ...doc, id: doc.id || doc._id.toString() };
  },

  // Direct model access for advanced queries
  models: { User, Lesson, Problem, Progress }
};

export default db;
export { User, Lesson, Problem, Progress };
