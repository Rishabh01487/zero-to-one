import { Router } from 'express';

const router = Router();

const WANDBOX = 'https://wandbox.org/api/compile.json';

// Smart wrap: generate main() from Solution method signature
function isVectorType(t) {
  return t.startsWith('vector<');
}
function baseType(t) {
  const m = t.match(/vector<(.+?)>/);
  return m ? m[1].replace(/&/g, '').trim() : t.replace(/&/g, '').trim();
}
function typeName(t) {
  return t.replace(/&/g, '').replace(/const/g, '').trim();
}

function generateMain(code, useStdin) {
  // Match public method in class Solution
  const methodRe = /public:\s*\n?\s*(\w+(?:\s*<[^>]*>)?(?:\s*&)?)\s+(\w+)\s*\(([^)]*)\)/s;
  const m = code.match(methodRe);
  if (!m) return '';

  const retType = typeName(m[1]);
  const methodName = m[2];
  const paramsStr = m[3].trim();

  // Parse params respecting nested <>
  const params = [];
  if (paramsStr) {
    let depth = 0, cur = '';
    for (const ch of paramsStr) {
      if (ch === '<') depth++;
      else if (ch === '>') depth--;
      if (ch === ',' && depth === 0) { params.push(cur.trim()); cur = ''; }
      else cur += ch;
    }
    params.push(cur.trim());
  }

  // Generate init-code for each param
  const readLines = params.map(p => {
    const parts = p.split(/\s+/);
    const name = parts[parts.length - 1];
    const rawType = parts.slice(0, -1).join(' ');
    const t = typeName(rawType);
    const nl = name.toLowerCase();

    if (useStdin) {
      if (t === 'int') return `  int ${name} = 0; cin >> ${name};`;
      if (t === 'long long') return `  long long ${name} = 0; cin >> ${name};`;
      if (t === 'string' || t === 'std::string') return `  string ${name}; cin >> ${name};`;
      if (t === 'char') return `  char ${name} = ' '; cin >> ${name};`;
      if (t === 'double' || t === 'float') return `  ${t} ${name} = 0; cin >> ${name};`;
      if (t === 'bool') return `  bool ${name} = false; cin >> ${name};`;
      if (t.startsWith('vector<int>')) return `  int ${name}_n = 0; cin >> ${name}_n;\n  vector<int> ${name}(${name}_n);\n  for(auto& x : ${name}) cin >> x;`;
      if (t.startsWith('vector<long long>')) return `  int ${name}_n = 0; cin >> ${name}_n;\n  vector<long long> ${name}(${name}_n);\n  for(auto& x : ${name}) cin >> x;`;
      if (t.startsWith('vector<string>')) return `  int ${name}_n = 0; cin >> ${name}_n;\n  vector<string> ${name}(${name}_n);\n  for(auto& x : ${name}) cin >> x;`;
      if (t.startsWith('vector<double>')) return `  int ${name}_n = 0; cin >> ${name}_n;\n  vector<double> ${name}(${name}_n);\n  for(auto& x : ${name}) cin >> x;`;
      if (t.startsWith('vector<char>')) return `  int ${name}_n = 0; cin >> ${name}_n;\n  vector<char> ${name}(${name}_n);\n  for(auto& x : ${name}) cin >> x;`;
      if (t.startsWith('vector<vector<int>>')) return `  int ${name}_r = 0; cin >> ${name}_r;\n  vector<vector<int>> ${name}(${name}_r);\n  for(auto& row : ${name}) { int ${name}_c = 0; cin >> ${name}_c; row.resize(${name}_c); for(auto& x : row) cin >> x; }`;
      if (t.startsWith('vector<vector<long long>>')) return `  int ${name}_r = 0; cin >> ${name}_r;\n  vector<vector<long long>> ${name}(${name}_r);\n  for(auto& row : ${name}) { int ${name}_c = 0; cin >> ${name}_c; row.resize(${name}_c); for(auto& x : row) cin >> x; }`;
      return `  ${rawType} ${name}; // Cannot auto-read type, please read manually`;
    }

    if (t === 'int' && (nl.includes('target') || nl.includes('sum'))) return `  int ${name} = 9;`;
    if (t === 'int' && (nl.includes('val') || nl.includes('key'))) return `  int ${name} = 3;`;
    if (t === 'int') return `  int ${name} = 0;`;
    if (t === 'long long') return `  long long ${name} = 0;`;
    if (t === 'string' || t === 'std::string') return `  string ${name};`;
    if (t === 'char') return `  char ${name} = ' ';`;
    if (t === 'double' || t === 'float') return `  ${t} ${name} = 0;`;
    if (t === 'bool') return `  bool ${name} = false;`;

    if (t.startsWith('vector<int>') && (nl.includes('nums') || nl.includes('arr'))) return `  vector<int> ${name} = {2, 7, 11, 15};`;
    if (t.startsWith('vector<int>')) return `  vector<int> ${name} = {1, 2, 3};`;
    if (t.startsWith('vector<long long>')) return `  vector<long long> ${name} = {1, 2, 3};`;
    if (t.startsWith('vector<string>')) return `  vector<string> ${name} = {"abc", "xyz"};`;
    if (t.startsWith('vector<double>')) return `  vector<double> ${name} = {3.5, 1.2};`;
    if (t.startsWith('vector<char>')) return `  vector<char> ${name} = {'a', 'b'};`;
    if (t.startsWith('vector<vector<int>>')) return `  vector<vector<int>> ${name} = {{1, 2}, {3, 4}};`;
    if (t.startsWith('vector<vector<long long>>')) return `  vector<vector<long long>> ${name} = {{1, 2}};`;

    return `  ${rawType} ${name}; // Unsupported type`;
  }).join('\n');

  const paramNames = params.map(p => {
    const parts = p.split(/\s+/);
    return parts[parts.length - 1];
  }).join(', ');

  // Generate print-code for return value
  let printCode;
  if (retType === 'void') {
    printCode = `  sol.${methodName}(${paramNames});`;
  } else if (retType === 'int' || retType === 'long long' || retType === 'double' || retType === 'float' || retType === 'char' || retType === 'bool' || retType === 'string' || retType === 'std::string') {
    printCode = `  cout << sol.${methodName}(${paramNames}) << endl;`;
  } else if (retType.startsWith('vector<int>')) {
    printCode = `  auto res = sol.${methodName}(${paramNames});\n  for (size_t i = 0; i < res.size(); i++) {\n    if (i) cout << ' ';\n    cout << res[i];\n  }`;
  } else if (retType.startsWith('vector<long long>')) {
    printCode = `  auto res = sol.${methodName}(${paramNames});\n  for (size_t i = 0; i < res.size(); i++) {\n    if (i) cout << ' ';\n    cout << res[i];\n  }`;
  } else if (retType.startsWith('vector<string>')) {
    printCode = `  auto res = sol.${methodName}(${paramNames});\n  for (size_t i = 0; i < res.size(); i++) {\n    if (i) cout << ' ';\n    cout << res[i];\n  }`;
  } else if (retType.startsWith('vector<vector<int>>')) {
    printCode = `  auto res = sol.${methodName}(${paramNames});\n  for (auto& row : res) {\n    for (auto& x : row) cout << x << ' ';\n    cout << endl;\n  }`;
  } else if (retType.startsWith('vector<bool>')) {
    printCode = `  auto res = sol.${methodName}(${paramNames});\n  for (size_t i = 0; i < res.size(); i++) {\n    if (i) cout << ' ';\n    cout << (res[i] ? "true" : "false");\n  }`;
  } else if (retType === 'bool') {
    printCode = `  cout << (sol.${methodName}(${paramNames}) ? "true" : "false") << endl;`;
  } else {
    printCode = `  cout << sol.${methodName}(${paramNames}) << endl;`;
  }

  return `int main() {\n  Solution sol;\n${readLines}\n${printCode}\n  return 0;\n}`;
}

function wrapCode(code, useStdin) {
  if (code.includes('int main(') || code.includes('main(')) return code;
  const hasIncludes = code.includes('#include');
  const hasNamespace = code.includes('using namespace');
  const wrapped = [];
  if (!hasIncludes) wrapped.push('#include <bits/stdc++.h>');
  if (!hasNamespace) wrapped.push('using namespace std;');
  wrapped.push('');
  wrapped.push(code);
  wrapped.push('');
  const mainCode = generateMain(code, useStdin);
  if (mainCode) {
    wrapped.push(mainCode);
  } else {
    wrapped.push('int main() {\n  // Could not detect method signature — add your own main()\n  return 0;\n}');
  }
  return wrapped.join('\n');
}

router.post('/', async (req, res) => {
  const { code, input } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  const start = Date.now();
  const MAX_RETRIES = 3;
  const compiled = wrapCode(code, !!(input && input.trim()));
  const body = {
    code: compiled,
    compiler: 'gcc-head',
    options: '-std=c++17',
    stdin: input || '',
    save: false,
    compiler_option_raw: true,
    runtime_option_raw: false,
  };

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt));
      const wandbox = await fetch(WANDBOX, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await wandbox.json();
      const execTime = Date.now() - start;

      // Retry on Wandbox resource exhaustion
      const errMsg = result.compiler_error || result.program_output || '';
      if (errMsg.includes('Resource temporarily unavailable') || errMsg.includes('OCI runtime error')) {
        if (attempt < MAX_RETRIES - 1) continue;
        return res.json({ output: 'Wandbox is busy. Please try again.', success: false });
      }

      if (result.compiler_error) {
        return res.json({ output: result.compiler_error, success: false });
      }

      return res.json({
        output: result.program_output || result.program_message || '(no output)',
        executionTime: `${execTime}ms`,
        success: result.status === '0',
      });
    } catch (err) {
      if (attempt < MAX_RETRIES - 1) continue;
      res.json({ output: err.message, success: false });
    }
  }
});

export default router;
