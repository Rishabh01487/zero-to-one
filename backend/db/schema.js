import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use /tmp/data on Vercel (writable) or local data dir
function getDataDir() {
  const local = path.join(__dirname, '..', 'data');
  // Check if local dir is writable
  try {
    const test = path.join(local, '.write-test');
    fs.writeFileSync(test, '');
    fs.unlinkSync(test);
    return local;
  } catch {
    return path.join('/tmp', 'data');
  }
}

const DATA_DIR = getDataDir();
const DB_FILE = path.join(DATA_DIR, 'zerotoone.json');

function initDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
  }
}

function load() {
  initDir();
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
