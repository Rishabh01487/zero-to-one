export default [
  {
    id: "min-stack",
    title: "Min Stack",
    category: "stack-queue",
    difficulty: "medium",
    description: "Design stack that supports push, pop, top, and getMin in O(1).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"8\npush 5\npush 2\npush 7\ngetMin\npop\ngetMin\npop\ngetMin","output":"2 5 5","explanation":"Min after operations"}
    ],
    test_cases: [
      {"input":"8\npush 5\npush 2\npush 7\ngetMin\npop\ngetMin\npop\ngetMin","expected":"2 5 5"}
    ],
    approach: "Maintain auxiliary stack that tracks minimum at each level.",
    complexity: {"time":"O(1) each","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "// Two stacks: main and min. On push, if x <= min.top() push to min. On pop, if top == min.top() pop min.",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nclass MinStack {\n  stack<int> s, minS;\npublic:\n  void push(int x) { s.push(x); if (minS.empty() || x <= minS.top()) minS.push(x); }\n  void pop() { if (s.top() == minS.top()) minS.pop(); s.pop(); }\n  int top() { return s.top(); }\n  int getMin() { return minS.top(); }\n};\n\nint main() {\n  int q; cin >> q;\n  MinStack ms;\n  while (q--) {\n    string op; cin >> op;\n    if (op == \"push\") { int x; cin >> x; ms.push(x); }\n    else if (op == \"pop\") ms.pop();\n    else if (op == \"top\") cout << ms.top() << endl;\n    else if (op == \"getMin\") cout << ms.getMin() << endl;\n  }\n  return 0;\n}",
  }
]
