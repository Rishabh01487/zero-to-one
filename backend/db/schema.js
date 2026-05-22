import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'zerotoone.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function load() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    }
  } catch (e) {}
  return { users: [], lessons: [], problems: [], progress: [], bookmarks: [] };
}

function save(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

const db = {
  load,
  save,
  get() { return load(); },
  query(table, filter = {}) {
    const data = load();
    const items = data[table] || [];
    if (Object.keys(filter).length === 0) return items;
    return items.filter(item =>
      Object.entries(filter).every(([k, v]) => item[k] === v)
    );
  },
  getOne(table, id) {
    const data = load();
    return (data[table] || []).find(i => i.id === id) || null;
  },
  insert(table, item) {
    const data = load();
    if (!data[table]) data[table] = [];
    data[table].push(item);
    save(data);
    return item;
  },
  update(table, id, changes) {
    const data = load();
    const idx = (data[table] || []).findIndex(i => i.id === id);
    if (idx === -1) return null;
    data[table][idx] = { ...data[table][idx], ...changes };
    save(data);
    return data[table][idx];
  },
  upsert(table, id, item) {
    const data = load();
    if (!data[table]) data[table] = [];
    const idx = data[table].findIndex(i => i.id === id);
    if (idx === -1) {
      data[table].push(item);
    } else {
      data[table][idx] = { ...data[table][idx], ...item };
    }
    save(data);
    return this.getOne(table, id);
  }
};

export default db;
