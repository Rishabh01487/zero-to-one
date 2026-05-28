const WANDBOX = 'https://wandbox.org/api/compile.json';

const STD_HEADERS = [
  'algorithm','array','bitset','cassert','cctype','chrono','climits','cmath',
  'cstdint','cstdio','cstdlib','cstring','ctime','deque','forward_list','fstream',
  'functional','iomanip','ios','iostream','istream','iterator','limits','list',
  'locale','map','memory','mutex','numeric','ostream','queue','random','regex',
  'set','sstream','stack','stdexcept','streambuf','string','thread','tuple',
  'type_traits','typeinfo','unordered_map','unordered_set','utility','valarray','vector'
].map(h => `#include <${h}>`).join('\n');

function escapeForCpp(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '');
}

function stripANSI(s) {
  return s.replace(/\u001b\[.*?m/g, '').replace(/\u001b\[.*?[A-Za-z]/g, '');
}

function isSkipLine(trimmed) {
  if (!trimmed) return true;
  if (trimmed.startsWith('#include') || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return true;
  if (trimmed.startsWith('using namespace') || trimmed.startsWith('#define') || trimmed.startsWith('#if') || trimmed.startsWith('#endif') || trimmed.startsWith('#else') || trimmed.startsWith('#pragma')) return true;
  return false;
}

// Find first `=` at depth 0 (not inside parens/brackets/braces), excluding `==`
function findFirstEq(str) {
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;
    else if (ch === '=' && depth === 0 && str[i + 1] !== '=') return i;
  }
  return -1;
}

// Extract all lvalues from potentially chained assignment (a = b = c = 0 → [a, b, c])
function extractLvalues(line) {
  const result = [];
  let remaining = line.replace(/;\s*$/, '').trim();
  while (true) {
    const eqPos = findFirstEq(remaining);
    if (eqPos === -1) break;
    let lhs = remaining.substring(0, eqPos).trim();
    if (lhs) result.push(lhs);
    remaining = remaining.substring(eqPos + 1).trim();
  }
  return result;
}

// True if line starts with a type keyword → likely a declaration
function isDeclaration(lhs) {
  return /^\s*(?:(?:const|static|mutable|volatile|register|extern)\s+)*(?:\w+(?:\s*<[^>]*>)?(?:\s*[*&])?)\s+\w/.test(lhs);
}

// Extract variable name from declaration lhs like "int x" → "x", "vector<int> nums" → "nums"
function declVarName(lhs) {
  const m = lhs.match(/(\w+)\s*$/);
  return m ? m[1] : null;
}

export async function instrumentCode(code, input) {
  try {
    const lines = code.split('\n');
    const out = [];

    out.push(STD_HEADERS);
    out.push('#define TRACE_STEP(x) do { std::cout << "###STEP###" << x << "\\n"; } while(0)');
    out.push('#define TRACE_VAR(n,v) do { std::cout << "###VAR###" << n << "=" << v << "\\n"; } while(0)');
    out.push('#define TRACE_LINE(n) do { std::cout << "###LINE###" << n << "\\n"; } while(0)');
    out.push('');

    let inFunction = false;
    let lineIdx = 0;

    for (const rawLine of lines) {
      lineIdx++;
      const indent = rawLine.match(/^\s*/)[0];
      const trimmed = rawLine.trim();
      const isBrace = trimmed === '{' || trimmed === '}' || trimmed === '};';
      const isBlockEnd = trimmed === '}' || trimmed === '};';

      // Preserve includes, comments, preprocessor, empty lines, namespace
      if (isSkipLine(trimmed)) {
        out.push(rawLine);
        continue;
      }

      // Blank lines
      if (!trimmed) {
        out.push(rawLine);
        continue;
      }

      // Pure braces
      if (isBrace && trimmed.length <= 2) {
        if (isBlockEnd) {
          out.push(rawLine);
        } else {
          out.push(rawLine);
          out.push(indent + '  TRACE_LINE(' + lineIdx + ');');
        }
        continue;
      }

      // Detect function start (includes main, Solution methods, lambdas, etc.)
      if (/\b(?:int|void|bool|char|float|double|long|string|auto|size_t|vector|list|map|set|unordered_map|unordered_set|pair|ListNode|TreeNode|Node)\s+\w+\s*\(/.test(trimmed) && trimmed.endsWith('{')) {
        inFunction = true;
        out.push(rawLine);
        continue;
      }
      if (/^int\s+main\s*\(/.test(trimmed)) {
        inFunction = true;
        out.push(rawLine);
        continue;
      }

      // Loop/condition headers that open a brace on the same line or next
      if (/^\s*(?:for|while|do|if|else\s+if|else|switch|catch)\s*\(/.test(trimmed) || /^\s*else\s*{?\s*$/.test(trimmed)) {
        out.push(indent + 'TRACE_LINE(' + lineIdx + ');');
        out.push(rawLine);
        continue;
      }

      // Try/catch
      if (/^\s*try\s*{?\s*$/.test(trimmed)) {
        out.push(indent + 'TRACE_LINE(' + lineIdx + ');');
        out.push(rawLine);
        continue;
      }

      // Lines that end with semicolon (statements) or are expressions
      if (trimmed.endsWith(';') || trimmed.endsWith('};')) {
        out.push(indent + 'TRACE_LINE(' + lineIdx + ');');

        const hasEq = trimmed.includes('=') && !/==|<=|>=|!=/.test(trimmed);

        if (hasEq) {
          out.push(rawLine);
          // Extract all lvalues from chained assignments (a=b=c=0 → a,b,c)
          const lvalues = extractLvalues(trimmed);
          for (const lval of lvalues) {
            let traceExpr = lval;
            // If it's a declaration like "int x", use just "x"
            if (isDeclaration(traceExpr) || /\s/.test(traceExpr)) {
              const vn = declVarName(traceExpr);
              if (vn && !/(?:int|void|bool|char|float|double|long|auto|const|return)/.test(vn)) traceExpr = vn;
            }
            // Strip trailing garbage
            traceExpr = traceExpr.replace(/[;{]*$/, '').trim();
            if (traceExpr && !/^(?:int|void|bool|char|float|double|long|auto|const|return|if|while|for|switch)$/.test(traceExpr)) {
              out.push(indent + 'TRACE_VAR("' + traceExpr.replace(/"/g, '\\"') + '", ' + traceExpr + ');');
            }
          }
        } else if (/^\s*(?:return)\b/.test(trimmed)) {
          const retVal = trimmed.replace(/^\s*return\s*/, '').replace(/;\s*$/, '').trim();
          out.push(rawLine);
          if (retVal) {
            out.push(indent + 'TRACE_VAR("return", ' + retVal + ');');
          }
        } else if (/^\s*(?:cin|std::cin)\s*[>]/.test(trimmed)) {
          out.push(rawLine);
          // Trace each variable after >>
          const cinVars = trimmed.replace(/^\s*(?:cin|std::cin)\s*>>\s*/, '').replace(/;\s*$/, '').split(/\s*>>\s*/);
          for (const v of cinVars) {
            if (v.trim()) out.push(indent + 'TRACE_VAR("' + v.trim() + '", ' + v.trim() + ');');
          }
        } else if (/^\s*(?:cout|std::cout)/.test(trimmed)) {
          out.push(rawLine);
        } else {
          // Declaration without initializer? (int x;)
          const bareDecl = trimmed.match(/^\s*(?:\w+(?:\s*<[^>]*>)?(?:\s*[*&])?)\s+(\w+)\s*(?:\[.*?\])?\s*;\s*$/);
          if (bareDecl) {
            out.push(rawLine);
            const vn = bareDecl[1];
            if (vn) out.push(indent + 'TRACE_VAR("' + vn + '", ' + vn + ');');
          } else {
            out.push(rawLine);
          }
        }
        continue;
      }

      // Lines without semicolons (labels, case, standalone expressions)
      out.push(indent + 'TRACE_LINE(' + lineIdx + ');');
      out.push(rawLine);
    }

    const instrumentedCode = out.join('\n');

    const MAX_RETRIES = 3;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt));
        const wandbox = await fetch(WANDBOX, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: instrumentedCode,
            compiler: 'clang-head',
            options: '-std=c++23 -O2 -fsanitize=address -stdlib=libstdc++',
            stdin: input || '',
            save: false,
            compiler_option_raw: true,
          }),
        });
        const result = await wandbox.json();
        const rawOutput = stripANSI(result.program_output || result.compiler_error || '');

        const errMsg = stripANSI(result.compiler_error || result.program_output || '');
        if (errMsg.includes('Resource temporarily unavailable') || errMsg.includes('OCI runtime error')) {
          if (attempt < MAX_RETRIES - 1) continue;
          return { steps: [], output: '', lineMap: [], error: 'Wandbox is busy. Please try again.' };
        }

        if (result.compiler_error) {
          return { steps: [], output: '', lineMap: [], error: 'Compilation error: ' + stripANSI(result.compiler_error), rawOutput: stripANSI(result.compiler_error) };
        }

        const steps = [];
        const lineMap = new Set();
        let programOutput = '';

        for (const line of rawOutput.split('\n')) {
          if (line.startsWith('###STEP###')) {
            steps.push({ type: 'step', value: line.replace('###STEP###', '').trim() });
          } else if (line.startsWith('###VAR###')) {
            const eqIdx = line.indexOf('=');
            const rawName = line.substring(7, eqIdx);
            const rawValue = line.substring(eqIdx + 1);
            steps.push({ type: 'var', varName: rawName, varValue: rawValue });
          } else if (line.startsWith('###LINE###')) {
            const lineNum = parseInt(line.replace('###LINE###', '').trim());
            if (!isNaN(lineNum)) {
              lineMap.add(lineNum);
              steps.push({ type: 'line', lineNumber: lineNum });
            }
          } else {
            programOutput += line + '\n';
          }
        }

        return {
          steps,
          output: programOutput.trim(),
          lineMap: Array.from(lineMap).sort((a, b) => a - b),
          code: instrumentedCode,
          originalCode: code
        };
      } catch (err) {
        if (attempt < MAX_RETRIES - 1) continue;
        return { steps: [], output: '', lineMap: [], error: err.message };
      }
    }
  } catch (err) {
    return { steps: [], output: '', lineMap: [], error: err.message };
  }
}
