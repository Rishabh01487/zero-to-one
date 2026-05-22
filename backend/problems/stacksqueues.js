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
  },
  {
    id: "stock-span",
    title: "Stock Span Problem",
    category: "stack-queue",
    difficulty: "medium",
    description: "For each day, find number of consecutive days price <= current day.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n100 80 60 70 60 75 85","output":"1 1 1 2 1 4 6"}
    ],
    test_cases: [
      {"input":"7\n100 80 60 70 60 75 85","expected":"1 1 1 2 1 4 6"}
    ],
    approach: "Monotonic decreasing stack of {price, index}. While stack.top <= current, pop. Span = i - stack.top.index.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<pair<int,int>> st; for(int i=0;i<n;i++){int span=1; while(!st.empty()&&st.top().first<=prices[i]){span+=st.top().second;st.pop();}st.push({prices[i],span});cout<<span<<\" \";}",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int prices[n], span[n];\n  for (int i = 0; i < n; i++) cin >> prices[i];\n\n  stack<int> st;\n  // monotonic decreasing stack\n\n  for (int i = 0; i < n; i++) cout << span[i] << \" \";\n  return 0;\n}",
  },
  {
    id: "largest-rect-hist",
    title: "Largest Rectangle in Histogram",
    category: "stack-queue",
    difficulty: "hard",
    description: "Find largest rectangle area in a histogram.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n2 1 5 6 2 3","output":"10","explanation":"5x2 rectangle"}
    ],
    test_cases: [
      {"input":"6\n2 1 5 6 2 3","expected":"10"}
    ],
    approach: "Monotonic stack of indices. When height decreases, pop and compute area using popped height as smallest.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; int maxA=0; for(int i=0;i<=n;i++){while(!st.empty()&&(i==n||heights[st.top()]>heights[i])){int h=heights[st.top()];st.pop();int w=st.empty()?i:i-st.top()-1;maxA=max(maxA,h*w);}st.push(i);}cout<<maxA;",
    solution_template: "#include <iostream>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int heights[n];\n  for (int i = 0; i < n; i++) cin >> heights[i];\n\n  stack<int> st;\n  int maxArea = 0;\n\n  // monotonic stack: pop when height drops\n\n  cout << maxArea << endl;\n  return 0;\n}",
  },
  {
    id: "sliding-window-max",
    title: "Sliding Window Maximum",
    category: "stack-queue",
    difficulty: "hard",
    description: "Find maximum in every sliding window of size k.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"8\n1 3 -1 -3 5 3 6 7\n3","output":"3 3 5 5 6 7"}
    ],
    test_cases: [
      {"input":"8\n1 3 -1 -3 5 3 6 7\n3","expected":"3 3 5 5 6 7"}
    ],
    approach: "Deque storing indices. Maintain decreasing deque. Front is max. Remove out-of-window indices from front.",
    complexity: {"time":"O(n)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "deque<int> dq; for(int i=0;i<n;i++){while(!dq.empty()&&dq.front()<=i-k)dq.pop_front();while(!dq.empty()&&arr[dq.back()]<=arr[i])dq.pop_back();dq.push_back(i);if(i>=k-1)cout<<arr[dq.front()]<<\" \";}",
    solution_template: "#include <iostream>\n#include <deque>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n\n  deque<int> dq; // store indices\n\n  // maintain decreasing deque\n\n  return 0;\n}",
  },
  {
    id: "celebrity",
    title: "The Celebrity Problem",
    category: "stack-queue",
    difficulty: "medium",
    description: "Find celebrity (everyone knows them, they know no one).",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"3\n0 1 1\n0 0 1\n0 0 0","output":"2","explanation":"Person 2 is the celebrity"}
    ],
    test_cases: [
      {"input":"3\n0 1 1\n0 0 1\n0 0 0","expected":"2"}
    ],
    approach: "Stack elimination: if A knows B, A can't be celebrity. Last remaining is candidate. Verify with everyone.",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; for(int i=0;i<n;i++)st.push(i); while(st.size()>1){int a=st.top();st.pop();int b=st.top();st.pop();if(M[a][b])st.push(b);else st.push(a);} int c=st.top(); for(int i=0;i<n;i++)if(i!=c&&(M[c][i]||!M[i][c])){cout<<-1;return 0;}cout<<c;",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int M[n][n];\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++)\n      cin >> M[i][j];\n\n  // stack elimination\n\n  cout << celebrity << endl;\n  return 0;\n}",
  },
  {
    id: "infix-postfix",
    title: "Infix to Postfix Conversion",
    category: "stack-queue",
    difficulty: "medium",
    description: "Convert infix expression to postfix.",
    constraints: "1 <= |s| <= 10^4",
    examples: [
      {"input":"a+b*(c^d-e)^(f+g*h)-i","output":"abcd^e-fgh*+^*+i-"}
    ],
    test_cases: [
      {"input":"a+b","expected":"ab+"},
      {"input":"a*b+c","expected":"ab*c+"}
    ],
    approach: "Shunting-yard: operators go to stack. Higher precedence operators pop first. '(' pushes, ')' pops until '('.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<char> st; string res; for(char c:s){if(isalnum(c))res+=c;else if(c=='(')st.push(c);else if(c==')'){while(st.top()!='('){res+=st.top();st.pop();}st.pop();}else{while(!st.empty()&&prec(c)<=prec(st.top())){res+=st.top();st.pop();}st.push(c);}} while(!st.empty()){res+=st.top();st.pop();}cout<<res;",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint prec(char c) {\n  if (c == '^') return 3;\n  if (c == '*' || c == '/') return 2;\n  if (c == '+' || c == '-') return 1;\n  return 0;\n}\n\nint main() {\n  string s;\n  cin >> s;\n  stack<char> st;\n\n  // Shunting-yard algorithm\n\n  cout << result << endl;\n  return 0;\n}",
  },
  {
    id: "impl-stack-queue",
    title: "Stack Using Queues",
    category: "stack-queue",
    difficulty: "easy",
    description: "Implement stack using two queues.",
    constraints: "1 <= q <= 10^5",
    examples: [
      {"input":"5\npush 1\npush 2\ntop\npop\ntop","output":"2 1"}
    ],
    test_cases: [
      {"input":"5\npush 1\npush 2\ntop\npop\ntop","expected":"2 1"}
    ],
    approach: "Use a single queue. On push, add and rotate all previous elements to front.",
    complexity: {"time":"O(n) push, O(1) pop","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "// push: q.push(x); for i in 0..size-2: q.push(q.front()); q.pop();",
    solution_template: "#include <iostream>\n#include <queue>\nusing namespace std;\n\nclass MyStack {\n  queue<int> q;\npublic:\n  void push(int x) { q.push(x); for (int i = 0; i < (int)q.size()-1; i++) { q.push(q.front()); q.pop(); } }\n  int pop() { int x = q.front(); q.pop(); return x; }\n  int top() { return q.front(); }\n  bool empty() { return q.empty(); }\n};\n\nint main() {\n  int q; cin >> q;\n  MyStack ms;\n  while (q--) {\n    string op; cin >> op;\n    if (op == \"push\") { int x; cin >> x; ms.push(x); }\n    else if (op == \"pop\") cout << ms.pop() << endl;\n    else if (op == \"top\") cout << ms.top() << endl;\n  }\n  return 0;\n}",
  }
]
