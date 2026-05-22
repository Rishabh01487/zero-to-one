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
  },
  {
    id: "next-greater",
    title: "Next Greater Element",
    category: "stack-queue",
    difficulty: "medium",
    description: "Find next greater element for each array element.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n4 5 2 25","output":"5 25 25 -1"}
    ],
    test_cases: [
      {"input":"4\n4 5 2 25","expected":"5 25 25 -1"}
    ],
    approach: "Monotonic decreasing stack. Traverse from right. Pop while stack.top <= current. NGE = stack.top (or -1).",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; for(int i=n-1;i>=0;i--){while(!st.empty()&&st.top()<=arr[i])st.pop();nge[i]=st.empty()?-1:st.top();st.push(arr[i]);}",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n], nge[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  stack<int> st;\n  // traverse from right\n\n  for (int i = 0; i < n; i++) cout << nge[i] << \" \";\n  return 0;\n}",
  },
  {
    id: "queue-using-stack",
    title: "Queue Using Stacks",
    category: "stack-queue",
    difficulty: "medium",
    description: "Implement Queue using two stacks.",
    constraints: "1 <= q <= 10^5",
    examples: [
      {"input":"6\npush 1\npush 2\npeek\npop\npush 3\npeek","output":"1 2"}
    ],
    test_cases: [
      {"input":"6\npush 1\npush 2\npeek\npop\npush 3\npeek","expected":"1 2"}
    ],
    approach: "Two stacks: input stack for push, output stack for pop/peek. Transfer when output is empty.",
    complexity: {"time":"O(1) amortized","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "// push: stack in. pop: if out empty, transfer in to out, then pop. peek: same as pop but without removal.",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nclass MyQueue {\n  stack<int> in, out;\npublic:\n  void push(int x) { in.push(x); }\n  int pop() {\n    if (out.empty()) while (!in.empty()) { out.push(in.top()); in.pop(); }\n    int x = out.top(); out.pop(); return x;\n  }\n  int peek() {\n    if (out.empty()) while (!in.empty()) { out.push(in.top()); in.pop(); }\n    return out.top();\n  }\n  bool empty() { return in.empty() && out.empty(); }\n};\n\nint main() {\n  int q; cin >> q;\n  MyQueue mq;\n  while (q--) {\n    string op; cin >> op;\n    if (op == \"push\") { int x; cin >> x; mq.push(x); }\n    else if (op == \"pop\") cout << mq.pop() << endl;\n    else if (op == \"peek\") cout << mq.peek() << endl;\n  }\n  return 0;\n}",
  }
]
