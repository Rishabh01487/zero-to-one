import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMP_DIR = path.join(__dirname, '..', '..', 'temp');

function escapeForCpp(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '');
}

export async function instrumentCode(code, input) {
  const id = uuidv4();
  const srcFile = path.join(TEMP_DIR, `${id}.cpp`);
  const exeFile = path.join(TEMP_DIR, `${id}.exe`);
  const traceFile = path.join(TEMP_DIR, `${id}.trace`);

  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

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
    let functionDepth = 0;
    let lastVarLine = '';
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
        functionDepth = braceCount;
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

      const assignMatch = trimmed.match(/^(\w+)\s*(?:\+=|-=|[*]=|\/=|%=|=)\s*(.*?);?$/);
      if (assignMatch && !trimmed.startsWith('int') && !trimmed.startsWith('float') && !trimmed.startsWith('double') && !trimmed.startsWith('for') && !trimmed.startsWith('while')) {
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
    fs.writeFileSync(srcFile, instrumentedCode);

    try {
      execSync(`g++ "${srcFile}" -o "${exeFile}" -std=c++17 2>&1`, {
        timeout: 15000,
        encoding: 'utf-8'
      });
    } catch (compileErr) {
      return {
        steps: [],
        output: '',
        lineMap: [],
        error: 'Compilation error: ' + (compileErr.stderr || compileErr.message),
        rawOutput: compileErr.stderr || ''
      };
    }

    let rawOutput;
    try {
      rawOutput = execSync(`"${exeFile}"`, {
        input: input || '',
        timeout: 5000,
        encoding: 'utf-8',
        maxBuffer: 1024 * 1024
      });
    } catch (runErr) {
      rawOutput = runErr.stdout || runErr.stderr || '';
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
        lineMap.add(lineNum);
        steps.push({ type: 'line', lineNumber: lineNum });
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
    return { steps: [], output: '', lineMap: [], error: err.message };
  } finally {
    try {
      if (fs.existsSync(srcFile)) fs.unlinkSync(srcFile);
      if (fs.existsSync(exeFile)) fs.unlinkSync(exeFile);
    } catch (e) {}
  }
}
