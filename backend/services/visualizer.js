const WANDBOX = 'https://wandbox.org/api/compile.json';

function escapeForCpp(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '');
}

export async function instrumentCode(code, input) {
  try {
    const lines = code.split('\n');
    const traceLines = [];

    traceLines.push('#include <iostream>');
    traceLines.push('#include <string>');
    traceLines.push('#include <sstream>');
    traceLines.push('#define TRACE_STEP(x) do { std::cout << "###STEP###" << x << "\\n"; } while(0)');
    traceLines.push('#define TRACE_VAR(name,val) do { std::cout << "###VAR###" << name << "=" << val << "\\n"; } while(0)');
    traceLines.push('#define TRACE_LINE(n) do { std::cout << "###LINE###" << n << "\\n"; } while(0)');
    traceLines.push('');

    let braceCount = 0;
    let inFunction = false;
    let lineNumber = 0;

    for (const rawLine of lines) {
      lineNumber++;
      const line = rawLine;
      const trimmed = line.trim();
      const indent = line.match(/^\s*/)[0];

      if (trimmed.startsWith('#include') || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
        traceLines.push(line);
        continue;
      }

      if (trimmed.startsWith('using namespace')) {
        traceLines.push(line);
        continue;
      }

      if (trimmed === '' || trimmed === '{' || trimmed === '}') {
        if (trimmed === '{') {
          traceLines.push(indent + '{');
          traceLines.push(indent + '  TRACE_LINE(' + lineNumber + ');');
          braceCount++;
        } else if (trimmed === '}') {
          braceCount--;
          traceLines.push(line);
        } else {
          traceLines.push(line);
        }
        continue;
      }

      if (trimmed.startsWith('int main(')) {
        inFunction = true;
        traceLines.push(line);
        continue;
      }

      if (trimmed.startsWith('for (') || trimmed.startsWith('while(') || trimmed.startsWith('while (')) {
        traceLines.push(indent + 'TRACE_LINE(' + lineNumber + ');');
        traceLines.push(line);
        continue;
      }

      if (trimmed.startsWith('if') || trimmed.startsWith('else if') || trimmed.startsWith('else')) {
        traceLines.push(indent + 'TRACE_LINE(' + lineNumber + ');');
        traceLines.push(line);
        continue;
      }

      if (trimmed.startsWith('cout') || trimmed.startsWith('std::cout')) {
        traceLines.push(line);
        continue;
      }

      if (trimmed.startsWith('cin') || trimmed.startsWith('std::cin')) {
        traceLines.push(indent + 'TRACE_LINE(' + lineNumber + ');');
        traceLines.push(line);
        continue;
      }

      if (trimmed.startsWith('return')) {
        traceLines.push(indent + 'TRACE_LINE(' + lineNumber + ');');
        traceLines.push(line);
        continue;
      }

      const arrDeclMatch = trimmed.match(/^(int|float|double|char|bool|string|long)\s+(\w+)\[.*?\]\s*(?:=\s*\{(.*?)\})?\s*;?$/);
      if (arrDeclMatch) {
        const arrName = arrDeclMatch[2];
        const initVals = arrDeclMatch[3];
        traceLines.push(line);
        if (initVals && initVals.trim()) {
          const vals = initVals.split(',').map(v => v.trim());
          vals.forEach((val, idx) => {
            traceLines.push(indent + 'TRACE_LINE(' + lineNumber + ');');
            traceLines.push(indent + 'TRACE_VAR("' + arrName + '[' + idx + ']", ' + arrName + '[' + idx + ']);');
          });
        }
        continue;
      }

      const varDeclMatch = trimmed.match(/^(int|float|double|char|bool|string|long|short|unsigned|auto)\s+(\w+)\s*(?:=\s*(.*?))?;?$/);
      if (varDeclMatch) {
        const type = varDeclMatch[1];
        const varName = varDeclMatch[2];
        const initVal = varDeclMatch[3];
        traceLines.push(line);
        if (initVal && initVal.trim()) {
          traceLines.push(indent + 'TRACE_LINE(' + lineNumber + ');');
          traceLines.push(indent + 'TRACE_VAR("' + varName + '", ' + varName + ');');
        }
        continue;
      }

      const arrElemAssignMatch = trimmed.match(/^(\w+)\[(.*?)\]\s*(?:\+=|-=|=)\s*(.*?);?$/);
      if (arrElemAssignMatch) {
        const arrName = arrElemAssignMatch[1];
        const arrIdx = arrElemAssignMatch[2];
        traceLines.push(indent + 'TRACE_LINE(' + lineNumber + ');');
        traceLines.push(line);
        traceLines.push(indent + 'TRACE_VAR("' + arrName + '[' + arrIdx + ']", ' + arrName + '[' + arrIdx + ']);');
        continue;
      }

      const assignMatch = trimmed.match(/^(\w+)\s*(?:\+=|-=|[*]=|\/=|%=|=)\s*(.*?);?$/);
      if (assignMatch && !trimmed.startsWith('int') && !trimmed.startsWith('float') && !trimmed.startsWith('for') && !trimmed.startsWith('while')) {
        const varName = assignMatch[1];
        traceLines.push(indent + 'TRACE_LINE(' + lineNumber + ');');
        traceLines.push(line);
        traceLines.push(indent + 'TRACE_VAR("' + varName + '", ' + varName + ');');
        continue;
      }

      traceLines.push(indent + 'TRACE_LINE(' + lineNumber + ');');
      traceLines.push(line);
    }

    const instrumentedCode = traceLines.join('\n');

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
        const stripANSI = s => s.replace(/\u001b\[.*?m/g, '').replace(/\u001b\[.*?[A-Za-z]/g, '');
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
            const parts = line.replace('###VAR###', '').trim().split('=');
            const varName = parts[0];
            const varValue = parts.slice(1).join('=');
            steps.push({ type: 'var', varName, varValue });
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
