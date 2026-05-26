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

function generateMain(code) {
  // Match public method in class Solution
  const methodRe = /public:\s*\n\s*(\w+(?:\s*<[^>]*>)?(?:\s*&)?)\s+(\w+)\s*\(([^)]*)\)/s;
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

  // Generate default-value code for each param (no stdin required)
  const readLines = params.map(p => {
    const parts = p.split(/\s+/);
    const name = parts[parts.length - 1];
    const rawType = parts.slice(0, -1).join(' ');
    const t = typeName(rawType);

    if (t === 'int') return `  int ${name} = 0;`;
    if (t === 'long long') return `  long long ${name} = 0;`;
    if (t === 'string' || t === 'std::string') return `  string ${name};`;
    if (t === 'char') return `  char ${name} = ' ';`;
    if (t === 'double' || t === 'float') return `  ${t} ${name} = 0;`;
    if (t === 'bool') return `  bool ${name} = false;`;

    if (t.startsWith('vector<int>')) return `  vector<int> ${name} = {1, 2, 3};`;
    if (t.startsWith('vector<long long>')) return `  vector<long long> ${name} = {1, 2, 3};`;
    if (t.startsWith('vector<string>')) return `  vector<string> ${name} = {"a", "b"};`;
    if (t.startsWith('vector<double>')) return `  vector<double> ${name} = {1.5, 2.5};`;
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

function wrapCode(code) {
  if (code.includes('int main(') || code.includes('main(')) return code;
  const hasIncludes = code.includes('#include');
  const hasNamespace = code.includes('using namespace');
  const wrapped = [];
  if (!hasIncludes) wrapped.push('#include <bits/stdc++.h>');
  if (!hasNamespace) wrapped.push('using namespace std;');
  wrapped.push('');
  wrapped.push(code);
  wrapped.push('');
  const mainCode = generateMain(code);
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

  try {
    const start = Date.now();
    const wandbox = await fetch(WANDBOX, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: wrapCode(code),
        compiler: 'gcc-head',
        options: '-std=c++17',
        stdin: input || '',
        save: false,
        compiler_option_raw: true,
        runtime_option_raw: false,
      }),
    });

    const result = await wandbox.json();
    const execTime = Date.now() - start;

    if (result.compiler_error) {
      return res.json({ output: result.compiler_error, success: false });
    }

    res.json({
      output: result.program_output || result.program_message || '(no output)',
      executionTime: `${execTime}ms`,
      success: result.status === '0',
    });
  } catch (err) {
    res.json({ output: err.message, success: false });
  }
});

export default router;
