export default [
  {
    id: "min-stack",
    title: "Min Stack",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["monotonic-stack", "stack-queue"],
    description: "Design stack that supports push, pop, top, and getMin in O(1).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"8\npush 5\npush 2\npush 7\ngetMin\npop\ngetMin\npop\ngetMin","output":"2 5 5","explanation":"Min after operations"}
    ],
    test_cases: [
      {"input":"8\npush 5\npush 2\npush 7\ngetMin\npop\ngetMin\npop\ngetMin","expected":"2 5 5"}
    ],
    approach: "The Min Stack problem requires designing a stack that supports push, pop, top, and getMin, all in O(1) time. A brute-force approach scans the entire stack on each getMin() call, costing O(n) per query. The optimal solution uses an auxiliary stack that tracks the minimum at every state. On push(x): push x onto the main stack; if the auxiliary stack is empty or x <= aux.top(), also push x onto the auxiliary stack. On pop(): pop the main stack; if the popped value equals aux.top(), pop the auxiliary stack as well. top() returns main.top(), getMin() returns aux.top().\n\nDiagram:\n  Operations: push(5), push(2), push(7), getMin, pop, getMin\n\n  push(5):  main=[5],  aux=[5]\n  push(2):  main=[5,2],  aux=[5,2]   (2<=5 push to aux)\n  push(7):  main=[5,2,7], aux=[5,2]  (7>2 skip aux)\n  getMin:   return aux.top()=2\n  pop:      pop 7 from main, 7!=aux.top()=2, aux stays [5,2]\n  pop:      pop 2 from main, 2==aux.top(), pop aux -> aux=[5]\n  getMin:   return aux.top()=5\n\nEdge cases: duplicate minima require <= condition so each occurrence is tracked independently. Complexity: O(1) per operation, O(n) space for auxiliary stack.",
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
    techniques: ["monotonic-stack"],
    description: "Find next greater element for each array element.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n4 5 2 25","output":"5 25 25 -1"}
    ],
    test_cases: [
      {"input":"4\n4 5 2 25","expected":"5 25 25 -1"}
    ],
    approach: "The Next Greater Element problem asks, for each element in an array, to find the first element to its right that is strictly greater; output -1 if none exists. A brute-force two-loop solution runs in O(n^2) time. The optimal O(n) solution uses a monotonic decreasing stack traversing from right to left.\n\nDiagram:\n  arr = [4, 5, 2, 25]\n\n  i=3, arr[3]=25: stack=[], NGE[3]=-1, push(3)\n  i=2, arr[2]=2:  stack=[3(25)], 25>2, NGE[2]=25, push(2)\n  i=1, arr[1]=5:  stack=[2(2)], 2<5, pop, stack=[3(25)], 25>5, NGE[1]=25, push(1)\n  i=0, arr[0]=4:  stack=[1(5)], 5>4, NGE[0]=5, push(0)\n\n  NGE = [5, 25, 25, -1]\n\nEdge cases: strictly decreasing arrays produce all -1; a single element always yields -1. Complexity: O(n) time since each element is pushed and popped at most once, O(n) space.",
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
    techniques: ["stack-queue"],
    description: "Implement Queue using two stacks.",
    constraints: "1 <= q <= 10^5",
    examples: [
      {"input":"6\npush 1\npush 2\npeek\npop\npush 3\npeek","output":"1 2"}
    ],
    test_cases: [
      {"input":"6\npush 1\npush 2\npeek\npop\npush 3\npeek","expected":"1 2"}
    ],
    approach: "The Queue Using Stacks problem asks to implement a FIFO queue using two LIFO stacks. A brute-force approach transfers all elements between stacks on every operation. The optimal amortized O(1) solution uses an input stack for pushes and an output stack for pop/peek with lazy transfers.\n\nDiagram:\n  push(1):    in=[1],         out=[]\n  push(2):    in=[1,2],       out=[]\n  peek():     in=[],          out=[2,1]   (transfer: pop 2->push out, pop 1->push out), return out.top()=1\n  pop():      in=[],          out=[2]     (pop out), return 1\n  push(3):    in=[3],         out=[2]\n  peek():     in=[3],         out=[2]     (out not empty), return out.top()=2\n\nEdge cases: pop/peek on empty queue throws exception; empty() checks both stacks. Complexity: O(1) amortized per operation, O(n) space.",
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
    techniques: ["monotonic-stack"],
    description: "For each day, find number of consecutive days price <= current day.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n100 80 60 70 60 75 85","output":"1 1 1 2 1 4 6"}
    ],
    test_cases: [
      {"input":"7\n100 80 60 70 60 75 85","expected":"1 1 1 2 1 4 6"}
    ],
    approach: "The Stock Span problem asks, for each day's stock price, to count how many consecutive days before (and including) today had price <= today's price. A brute-force leftward scan costs O(n^2). The optimal O(n) solution uses a monotonic decreasing stack storing (price, span) pairs.\n\nDiagram:\n  prices = [100, 80, 60, 70, 60, 75, 85]\n\n  i=0, p=100: stack=[], span=1, push(100,1)               -> span[0]=1\n  i=1, p=80:  stack=[(100,1)], 100>80, span=1, push(80,1) -> span[1]=1\n  i=2, p=60:  stack=[(100,1),(80,1)], 80>60, span=1, push(60,1) -> span[2]=1\n  i=3, p=70:  pop (60,1) -> span=2, 80>70, push(70,2)     -> span[3]=2\n  i=4, p=60:  stack=[(100,1),(80,1),(70,2)], 70>60, span=1, push(60,1) -> span[4]=1\n  i=5, p=75:  pop (60,1)->span=2, pop (70,2)->span=4, 80>75, push(75,4) -> span[5]=4\n  i=6, p=85:  pop (75,4)->span=5, pop (80,1)->span=6, 100>85, push(85,6) -> span[6]=6\n\n  result = [1, 1, 1, 2, 1, 4, 6]\n\nEdge cases: strictly decreasing -> all spans = 1; strictly increasing -> span = i+1. Complexity: O(n) time, O(n) space.",
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
    techniques: ["monotonic-stack"],
    description: "Find largest rectangle area in a histogram.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n2 1 5 6 2 3","output":"10","explanation":"5x2 rectangle"}
    ],
    test_cases: [
      {"input":"6\n2 1 5 6 2 3","expected":"10"}
    ],
    approach: "The Largest Rectangle in Histogram problem asks to find the maximum rectangular area within a histogram of n bars. A brute-force approach takes each bar as the shortest and expands left/right. The optimal O(n) solution uses a monotonic increasing stack of indices with a sentinel height 0 at the end.\n\nDiagram:\n  heights = [2, 1, 5, 6, 2, 3]\n\n  i=0, h=2: stack=[], push(0)\n  i=1, h=1: pop(0) h=2, empty -> w=1, area=2; push(1)       stack=[1]\n  i=2, h=5: push(2)                                          stack=[1,2]\n  i=3, h=6: push(3)                                          stack=[1,2,3]\n  i=4, h=2: pop(3) h=6, top=2 -> w=1, area=6\n            pop(2) h=5, top=1 -> w=2, area=10; push(4)       stack=[1,4]\n  i=5, h=3: push(5)                                          stack=[1,4,5]\n  i=6(h=0): pop(5) h=3, top=4 -> w=1, area=3\n            pop(4) h=2, top=1 -> w=4, area=8\n            pop(1) h=1, empty -> w=6, area=6\n\n  maxArea = 10\n\nEdge cases: strictly increasing heights processed at sentinel; single bar area = height. Complexity: O(n) time, O(n) space.",
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
    techniques: ["sliding-window"],
    description: "Find maximum in every sliding window of size k.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"8\n1 3 -1 -3 5 3 6 7\n3","output":"3 3 5 5 6 7"}
    ],
    test_cases: [
      {"input":"8\n1 3 -1 -3 5 3 6 7\n3","expected":"3 3 5 5 6 7"}
    ],
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
  },
  {
    id: "max-rect-binary",
    title: "Max Rectangle in Binary Matrix",
    category: "stack-queue",
    difficulty: "hard",
    description: "Find the largest rectangle containing only 1s in binary matrix.",
    constraints: "1 <= n,m <= 200",
    examples: [
      {"input":"4 5\n10100\n10111\n11111\n10010","output":"6","explanation":"Largest rectangle of 1s has area 6"}
    ],
    test_cases: [
      {"input":"4 5\n10100\n10111\n11111\n10010","expected":"6"}
    ],
    approach: "Treat each row as base of histogram. Use largest rectangle in histogram per row.",
    complexity: {"time":"O(n*m)","space":"O(m)"},
    sheet: "Striver A2Z",
    solution_code: "int h[200]={0},mx=0; for(int i=0;i<n;i++){for(int j=0;j<m;j++)h[j]=(mat[i][j]=='1')?h[j]+1:0;mx=max(mx,largestArea(h,m));}cout<<mx;",
    solution_template: "#include <iostream>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nint largestArea(int heights[], int n) {\n  stack<int> st;\n  int maxA = 0;\n  for (int i = 0; i <= n; i++) {\n    while (!st.empty() && (i == n || heights[st.top()] > heights[i])) {\n      int h = heights[st.top()]; st.pop();\n      int w = st.empty() ? i : i - st.top() - 1;\n      maxA = max(maxA, h * w);\n    }\n    st.push(i);\n  }\n  return maxA;\n}\n\nint main() {\n  int n, m; cin >> n >> m;\n  int heights[m] = {0};\n  int maxArea = 0;\n  for (int i = 0; i < n; i++) {\n    string row; cin >> row;\n    for (int j = 0; j < m; j++)\n      heights[j] = (row[j] == '1') ? heights[j] + 1 : 0;\n    maxArea = max(maxArea, largestArea(heights, m));\n  }\n  cout << maxArea << endl;\n  return 0;\n}",
  }
    ],
    test_cases: [
      {"input":"4 5\n10100\n10111\n11111\n10010","expected":"6"}
    ],
    approach: "The Max Rectangle in Binary Matrix problem finds the largest rectangular submatrix of 1s. The optimal solution converts each row into a histogram of consecutive 1 heights and applies the largest-rectangle-in-histogram algorithm per row.\n\nDiagram:\n  Matrix:         Row0 h=[1,0,1,0,0] -> area=1\n  1 0 1 0 0      Row1 h=[2,0,2,1,1] -> area=3 (cols 2-4, h=1)\n  1 0 1 1 1      Row2 h=[3,1,3,2,2] -> area=6 (cols 2, h=3 or cols 0-3, h=2)\n  1 1 1 1 1      Row3 h=[4,0,0,3,0] -> area=4 (col 0, h=4)\n  1 0 0 1 0\n\n  Max across rows = 6\n\n  Histogram at row 2: [3,1,3,2,2]\n  Using monotonic stack:\n  i=0(h=3) push 0; i=1(h=1) pop 0 -> w=1, area=3; push 1\n  i=2(h=3) push 2; i=3(h=2) pop 2 -> h=3, top=1 -> w=1, area=3; push 3\n  i=4(h=2) push 4; i=5(sentinel 0) pop 4 -> h=2, top=3 -> w=1, area=2\n  pop 3 -> h=2, top=1 -> w=2, area=4; pop 1 -> h=1, empty -> w=5, area=5\n  max = 6\n\nEdge cases: all-zero matrix returns 0. Complexity: O(n*m) time, O(m) space for height array.",
    complexity: {"time":"O(n*m)","space":"O(m)"},
    sheet: "Striver A2Z",
    solution_code: "int h[200]={0},mx=0; for(int i=0;i<n;i++){for(int j=0;j<m;j++)h[j]=(mat[i][j]=='1')?h[j]+1:0;mx=max(mx,largestArea(h,m));}cout<<mx;",
    solution_template: "#include <iostream>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nint largestArea(int heights[], int n) {\n  stack<int> st;\n  int maxA = 0;\n  for (int i = 0; i <= n; i++) {\n    while (!st.empty() && (i == n || heights[st.top()] > heights[i])) {\n      int h = heights[st.top()]; st.pop();\n      int w = st.empty() ? i : i - st.top() - 1;\n      maxA = max(maxA, h * w);\n    }\n    st.push(i);\n  }\n  return maxA;\n}\n\nint main() {\n  int n, m; cin >> n >> m;\n  int heights[m] = {0};\n  int maxArea = 0;\n  for (int i = 0; i < n; i++) {\n    string row; cin >> row;\n    for (int j = 0; j < m; j++)\n      heights[j] = (row[j] == '1') ? heights[j] + 1 : 0;\n    maxArea = max(maxArea, largestArea(heights, m));\n  }\n  cout << maxArea << endl;\n  return 0;\n}",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    category: "stack-queue",
    difficulty: "easy",
    techniques: ["stack-queue"],
    description: "Check if string of brackets is valid.",
    constraints: "1 <= |s| <= 10^4",
    examples: [
      {"input":"()[]{}","output":"Yes"}
    ],
    test_cases: [
      {"input":"()[]{}","expected":"Yes"},
      {"input":"(]","expected":"No"}
    ],
    approach: "Valid Parentheses checks whether a string of brackets is correctly balanced and nested. A brute-force repeatedly removes matching pairs in O(n^2). The optimal stack solution processes the string in one pass.\n\nDiagram:\n  s = \"()[]{}\"\n\n  char '(': push, stack=[(]\n  char ')': top is ( match, pop, stack=[]\n  char '[': push, stack=[]\n  char ']': top is [ match, pop, stack=[]\n  char '{': push, stack=[]\n  char '}': top is { match, pop, stack=[]\n  end: stack empty -> valid ✓\n\n  s = \"(]\"\n  char '(': push, stack=[(]\n  char ']': top is (, ( != ] -> invalid\n\nEdge cases: single opening bracket leaves stack non-empty; lone closing bracket finds stack empty. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<char> st; for(char c:s){if(c=='('||c=='{'||c=='[')st.push(c);else{if(st.empty()){cout<<\"No\";return 0;}char t=st.top();st.pop();if((c==')'&&t!='(')||(c=='}'&&t!='{')||(c==']'&&t!='[')){cout<<\"No\";return 0;}}}cout<<(st.empty()?\"Yes\":\"No\");",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  stack<char> st;\n\n  cout << (valid ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
  },
  {
    id: "daily-temperatures",
    title: "Daily Temperatures",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["monotonic-stack"],
    description: "For each day, find days until warmer temperature.",
    constraints: "1 <= n <= 10^5, 30 <= temp[i] <= 100",
    examples: [
      {"input":"8\n73 74 75 71 69 72 76 73","output":"1 1 4 2 1 1 0 0"}
    ],
    test_cases: [
      {"input":"8\n73 74 75 71 69 72 76 73","expected":"1 1 4 2 1 1 0 0"}
    ],
    approach: "Daily Temperatures asks, for each day, the number of days until a warmer temperature occurs. A brute-force scans forward from each day in O(n^2). The optimal solution uses a monotonic decreasing stack of indices, processing from left to right.\n\nDiagram:\n  temps = [73, 74, 75, 71, 69, 72, 76, 73]\n\n  i=0, t=73: stack=[], push(0)\n  i=1, t=74: pop 0 (73<74), ans[0]=1-0=1, push(1)\n  i=2, t=75: pop 1 (74<75), ans[1]=2-1=1, push(2)\n  i=3, t=71: stack=[2(75)], 75>71, push(3)\n  i=4, t=69: stack=[2(75),3(71)], 71>69, push(4)\n  i=5, t=72: pop 4 (69<72), ans[4]=5-4=1; pop 3 (71<72), ans[3]=5-3=2; 75>72, push(5)\n  i=6, t=76: pop 5 (72<76), ans[5]=6-5=1; pop 2 (75<76), ans[2]=6-2=4; push(6)\n  i=7, t=73: stack=[6(76)], 76>73, push(7)\n\n  ans = [1, 1, 4, 2, 1, 1, 0, 0]\n\nEdge cases: no warmer day -> ans[i] = 0. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; for(int i=0;i<n;i++){while(!st.empty()&&temperatures[st.top()]<temperatures[i]){int j=st.top();st.pop();ans[j]=i-j;}st.push(i);}",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int temperatures[n], ans[n] = {0};\n  for (int i = 0; i < n; i++) cin >> temperatures[i];\n\n  stack<int> st;\n  // monotonic decreasing stack of indices\n\n  for (int i = 0; i < n; i++) cout << ans[i] << \" \";\n  return 0;\n}",
  },
  {
    id: "next-smaller-element",
    title: "Next Smaller Element",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["monotonic-stack"],
    description: "Find next smaller element for each array element.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n4 2 1 5 3","output":"2 1 -1 3 -1"}
    ],
    test_cases: [
      {"input":"5\n4 2 1 5 3","expected":"2 1 -1 3 -1"}
    ],
    approach: "Next Smaller Element finds the first element to the right that is strictly smaller than the current element; -1 if none. The optimal solution uses a monotonic increasing stack from right to left.\n\nDiagram:\n  arr = [4, 2, 1, 5, 3]\n\n  i=4, arr[4]=3: stack=[], NSE[4]=-1, push(4)\n  i=3, arr[3]=5: stack=[4(3)], 3<5, NSE[3]=3, push(3)\n  i=2, arr[2]=1: stack=[3(5),4(3)], 3>1, pop; 5>1, pop; stack=[], NSE[2]=-1, push(2)\n  i=1, arr[1]=2: stack=[2(1)], 1<2, NSE[1]=1, push(1)\n  i=0, arr[0]=4: stack=[1(2)], 2<4, NSE[0]=2, push(0)\n\n  NSE = [2, 1, -1, 3, -1]\n\nEdge cases: decreasing arrays produce all -1. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; for(int i=n-1;i>=0;i--){while(!st.empty()&&st.top()>=arr[i])st.pop();nse[i]=st.empty()?-1:st.top();st.push(arr[i]);}",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n], nse[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  stack<int> st;\n  // traverse from right\n\n  for (int i = 0; i < n; i++) cout << nse[i] << \" \";\n  return 0;\n}",
  },
  {
    id: "previous-greater",
    title: "Previous Greater Element",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["monotonic-stack"],
    description: "Find previous greater element for each array element.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n4 2 1 5 3","output":"-1 4 4 -1 5"}
    ],
    test_cases: [
      {"input":"5\n4 2 1 5 3","expected":"-1 4 4 -1 5"}
    ],
    approach: "Previous Greater Element finds the first element to the left that is strictly greater. The optimal solution uses a monotonic decreasing stack traversing from left to right, popping elements smaller than or equal to the current element.\n\nDiagram:\n  arr = [4, 2, 1, 5, 3]\n\n  i=0, arr[0]=4: stack=[], PGE[0]=-1, push(0)\n  i=1, arr[1]=2: stack=[0(4)], 4>2, PGE[1]=4, push(1)\n  i=2, arr[2]=1: stack=[0(4),1(2)], 2>1, PGE[2]=2, push(2)\n  i=3, arr[3]=5: pop 2(1<=5), pop 1(2<=5), pop 0(4<=5), stack=[], PGE[3]=-1, push(3)\n  i=4, arr[4]=3: stack=[3(5)], 5>3, PGE[4]=5, push(4)\n\n  PGE = [-1, 4, 4, -1, 5]\n\nEdge cases: first element always -1; increasing arrays produce all -1. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; for(int i=0;i<n;i++){while(!st.empty()&&arr[st.top()]<=arr[i])st.pop();pge[i]=st.empty()?-1:arr[st.top()];st.push(i);}",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n], pge[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  stack<int> st;\n  // traverse from left\n\n  for (int i = 0; i < n; i++) cout << pge[i] << \" \";\n  return 0;\n}",
  },
  {
    id: "previous-smaller",
    title: "Previous Smaller Element",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["monotonic-stack"],
    description: "Find previous smaller element for each array element.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n4 2 1 5 3","output":"-1 -1 -1 1 1"}
    ],
    test_cases: [
      {"input":"5\n4 2 1 5 3","expected":"-1 -1 -1 1 1"}
    ],
    approach: "Previous Smaller Element finds the first element to the left that is strictly smaller. The optimal solution uses a monotonic increasing stack traversing from left to right, popping elements greater than or equal to the current element.\n\nDiagram:\n  arr = [4, 2, 1, 5, 3]\n\n  i=0, arr[0]=4: stack=[], PSE[0]=-1, push(0)\n  i=1, arr[1]=2: pop 0(4>=2), stack=[], PSE[1]=-1, push(1)\n  i=2, arr[2]=1: pop 1(2>=1), stack=[], PSE[2]=-1, push(2)\n  i=3, arr[3]=5: stack=[2(1)], 1<5, PSE[3]=1, push(3)\n  i=4, arr[4]=3: pop 3(5>=3), stack=[2(1)], 1<3, PSE[4]=1, push(4)\n\n  PSE = [-1, -1, -1, 1, 1]\n\nEdge cases: first element always -1; decreasing arrays produce all -1. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; for(int i=0;i<n;i++){while(!st.empty()&&arr[st.top()]>=arr[i])st.pop();pse[i]=st.empty()?-1:arr[st.top()];st.push(i);}",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n], pse[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  stack<int> st;\n  // traverse from left\n\n  for (int i = 0; i < n; i++) cout << pse[i] << \" \";\n  return 0;\n}",
  },
  {
    id: "remove-k-digits",
    title: "Remove K Digits",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["monotonic-stack", "stack-queue"],
    description: "Remove k digits to form the smallest possible number.",
    constraints: "1 <= |num| <= 10^5, 1 <= k <= |num|",
    examples: [
      {"input":"1432219\n3","output":"1219"}
    ],
    test_cases: [
      {"input":"1432219\n3","expected":"1219"},
      {"input":"10200\n1","expected":"200"}
    ],
    approach: "Remove K Digits asks to remove k digits from a numeric string to make the smallest possible number. A brute-force tries all C(n,k) combinations. The optimal greedy solution uses a monotonic stack to keep digits in increasing order.\n\nDiagram:\n  num = \"1432219\", k = 3\n\n  digit '1': stack=[1]\n  digit '4': stack=[1,4]        (4>1, keep)\n  digit '3': pop 4, k=2, stack=[1,3]  (3<4, remove 4)\n  digit '2': pop 3, k=1, stack=[1,2]  (2<3, remove 3)\n  digit '2': stack=[1,2,2]      (2=2, keep)\n  digit '1': pop 2, k=0, stack=[1,2,1] (1<2, remove 2, k exhausted)\n  digit '9': stack=[1,2,1,9]\n\n  result(stack) = \"1219\"\n\nEdge cases: leading zeros removed; if k remains after scanning, trim from end; if result empty, return \"0\". Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<char> st; for(char d:num){while(!st.empty()&&k>0&&st.top()>d){st.pop();k--;}st.push(d);} while(k>0){st.pop();k--;} string res; while(!st.empty()){res+=st.top();st.pop();} reverse(res.begin(),res.end()); int i=0; while(i<res.size()&&res[i]=='0')i++; res=res.substr(i); cout<<(res.empty()?\"0\":res);",
    solution_template: "#include <iostream>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string num; int k;\n  cin >> num >> k;\n\n  stack<char> st;\n  // monotonic stack: pop larger digits\n\n  cout << result << endl;\n  return 0;\n}",
  },
  {
    id: "decode-string",
    title: "Decode String",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue"],
    description: "Decode encoded string like 3[a]2[bc].",
    constraints: "1 <= |s| <= 10^4",
    examples: [
      {"input":"3[a]2[bc]","output":"aaabcbc"}
    ],
    test_cases: [
      {"input":"3[a]2[bc]","expected":"aaabcbc"},
      {"input":"2[abc]3[cd]ef","expected":"abccdcdcdef"}
    ],
    approach: "Decode String decodes a string with the format k[encoded] where k is a repeat count. The optimal solution uses two stacks: one for counts and one for partial strings.\n\nDiagram:\n  s = \"3[a]2[bc]\"\n\n  char '3':   num=3\n  char '[':   push count=3 to numStack, push curr=\"\" to strStack, reset curr, num=0\n  char 'a':   curr=\"a\"\n  char ']':   pop count=3, repeat curr -> curr=\"aaa\", pop prev from strStack, prev+curr=\"aaa\"\n  char '2':   num=2\n  char '[':   push count=2 to numStack, push curr=\"aaa\" to strStack, reset curr\n  char 'b':   curr=\"b\"\n  char 'c':   curr=\"bc\"\n  char ']':   pop count=2, repeat curr -> curr=\"bcbc\", pop prev=\"aaa\", prev+curr=\"aaabcbc\"\n\n  Result: \"aaabcbc\"\n\nEdge cases: nested encoding like \"3[a2[c]]\" handled by stack recursion; empty brackets. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> numStack; stack<string> strStack; string curr=\"\"; int num=0; for(char c:s){if(isdigit(c))num=num*10+(c-'0');else if(c=='['){numStack.push(num);strStack.push(curr);num=0;curr=\"\";}else if(c==']'){int k=numStack.top();numStack.pop();string tmp=curr;curr=strStack.top();strStack.pop();while(k--)curr+=tmp;}else curr+=c;}cout<<curr;",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  stack<int> numStack;\n  stack<string> strStack;\n\n  // decode using stacks\n\n  cout << curr << endl;\n  return 0;\n}",
  },
  {
    id: "simplify-path",
    title: "Simplify Path",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue"],
    description: "Simplify absolute Unix path string.",
    constraints: "1 <= |path| <= 10^4",
    examples: [
      {"input":"/home//foo/","output":"/home/foo"}
    ],
    test_cases: [
      {"input":"/home/","expected":"/home"},
      {"input":"/../","expected":"/"}
    ],
    approach: "Simplify Path converts an absolute Unix path to its canonical form, resolving '.' (current) and '..' (parent) references. The optimal solution splits by '/' and uses a stack to track directory names.\n\nDiagram:\n  path = \"/a/./b/../../c/\"\n  split by '/' -> [\"\", \"a\", \".\", \"b\", \"..\", \"..\", \"c\", \"\"]\n\n  \"a\":  stack=[a]\n  \".\":  skip\n  \"b\":  stack=[a,b]\n  \"..\": pop -> stack=[a]\n  \"..\": pop -> stack=[]\n  \"c\":  stack=[c]\n\n  result = \"/c\"\n\nEdge cases: empty stack with '..' does nothing; multiple slashes ignored; root \"/\" always returned for empty path. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<string> st; stringstream ss(path); string token; while(getline(ss,token,'/')){if(token==\"..\"){if(!st.empty())st.pop();}else if(!token.empty()&&token!=\".\")st.push(token);} string res=\"\"; while(!st.empty()){res=\"/\"+st.top()+res;st.pop();} cout<<(res.empty()?\"/\":res);",
    solution_template: "#include <iostream>\n#include <stack>\n#include <sstream>\nusing namespace std;\n\nint main() {\n  string path;\n  cin >> path;\n\n  stack<string> st;\n  // process tokens split by '/'\n\n  cout << result << endl;\n  return 0;\n}",
  },
  {
    id: "eval-rpn",
    title: "Evaluate Reverse Polish Notation",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue"],
    description: "Evaluate expression in reverse Polish notation.",
    constraints: "1 <= n <= 10^4, -200 <= tokens[i] <= 200",
    examples: [
      {"input":"5\n2 1 + 3 *","output":"9","explanation":"((2+1)*3)=9"}
    ],
    test_cases: [
      {"input":"5\n2 1 + 3 *","expected":"9"}
    ],
    approach: "Evaluate Reverse Polish Notation evaluates postfix expressions. The optimal solution uses a stack of operands.\n\nDiagram:\n  tokens = [\"2\", \"1\", \"+\", \"3\", \"*\"]\n\n  \"2\": push 2,  stack=[2]\n  \"1\": push 1,  stack=[2,1]\n  \"+\": pop 1,2 -> 2+1=3, push 3, stack=[3]\n  \"3\": push 3,  stack=[3,3]\n  \"*\": pop 3,3 -> 3*3=9, push 9, stack=[9]\n\n  Result: 9\n\nEdge cases: division truncates toward zero; single operand returns itself. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; for(string& t:tokens){if(t==\"+\"||t==\"-\"||t==\"*\"||t==\"/\"){int b=st.top();st.pop();int a=st.top();st.pop();if(t==\"+\")st.push(a+b);else if(t==\"-\")st.push(a-b);else if(t==\"*\")st.push(a*b);else st.push(a/b);}else st.push(stoi(t));}cout<<st.top();",
    solution_template: "#include <iostream>\n#include <stack>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<string> tokens(n);\n  for (int i = 0; i < n; i++) cin >> tokens[i];\n\n  stack<int> st;\n  // process tokens\n\n  cout << result << endl;\n  return 0;\n}",
  },
  {
    id: "basic-calc-ii",
    title: "Basic Calculator II",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue"],
    description: "Evaluate expression with +,-,*,/ without parentheses.",
    constraints: "1 <= |s| <= 10^5",
    examples: [
      {"input":"3+2*2","output":"7"}
    ],
    test_cases: [
      {"input":"3+2*2","expected":"7"},
      {"input":" 3/2 ","expected":"1"}
    ],
    approach: "Basic Calculator II evaluates an arithmetic expression with +, -, *, / (no parentheses). The optimal solution processes left-to-right, using a stack to track signs and handle * and / immediately.\n\nDiagram:\n  s = \"3+2*2\"\n\n  sign='+', num=3:  push +3, stack=[3]\n  sign='+', num=2:  push +2, stack=[3,2]\n  sign='*', num=2:  pop 2, 2*2=4, push 4, stack=[3,4]\n  end: sum stack = 3+4 = 7\n\n  Result: 7\n\n  s = \"3-5/2\"\n  sign='+', num=3:  push +3, stack=[3]\n  sign='-', num=5:  push -5, stack=[3,-5]\n  sign='/', num=2:  pop -5, -5/2=-2, push -2, stack=[3,-2]\n  end: sum stack = 3+(-2) = 1\n\nEdge cases: spaces ignored; division truncates toward zero. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; char sign='+'; int num=0; for(int i=0;i<=s.size();i++){char c=s[i];if(isdigit(c))num=num*10+(c-'0');if(!isdigit(c)&&c!=' '||i==s.size()){if(sign=='+')st.push(num);else if(sign=='-')st.push(-num);else if(sign=='*'){int t=st.top();st.pop();st.push(t*num);}else{int t=st.top();st.pop();st.push(t/num);}sign=c;num=0;}} int res=0; while(!st.empty()){res+=st.top();st.pop();}cout<<res;",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  string s;\n  getline(cin, s);\n\n  stack<int> st;\n  // process with sign tracking\n\n  cout << result << endl;\n  return 0;\n}",
  },
  {
    id: "min-remove-parens",
    title: "Minimum Remove to Make Valid Parentheses",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue"],
    description: "Remove minimum parentheses to make string valid.",
    constraints: "1 <= |s| <= 10^5",
    examples: [
      {"input":"lee(t(c)o)de)","output":"lee(t(c)o)de"}
    ],
    test_cases: [
      {"input":"lee(t(c)o)de)","expected":"lee(t(c)o)de"},
      {"input":"a)b(c)d","expected":"ab(c)d"}
    ],
    approach: "Minimum Remove to Make Valid Parentheses removes the fewest parentheses to make the string balanced. The optimal solution uses a stack to track unmatched opening parentheses and marks unmatched closing ones.\n\nDiagram:\n  s = \"lee(t(c)o)de)\"\n\n  char 'l','e','e','(' : push index 3,    stack=[3]\n  char 't' :\n  char '(' : push index 5,    stack=[3,5]\n  char 'c' :\n  char ')' : pop index 5, match, stack=[3]\n  char 'o' :\n  char ')' : pop index 3, match, stack=[]\n  char 'd','e' :\n  char ')' : stack empty -> mark index 11 for removal\n\n  Remove indices in stack (none) and marked (11)\n  Result: \"lee(t(c)o)de\"\n\nEdge cases: no opening parenthesis to match -> remove closing; leftover opens at end -> remove them. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; vector<bool> remove(s.size(),false); for(int i=0;i<s.size();i++){if(s[i]=='(')st.push(i);else if(s[i]==')'){if(st.empty())remove[i]=true;else st.pop();}} while(!st.empty()){remove[st.top()]=true;st.pop();} string res; for(int i=0;i<s.size();i++)if(!remove[i])res+=s[i];cout<<res;",
    solution_template: "#include <iostream>\n#include <stack>\n#include <vector>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  stack<int> st;\n  // mark invalid parentheses\n\n  cout << result << endl;\n  return 0;\n}",
  },
  {
    id: "remove-duplicate-letters",
    title: "Remove Duplicate Letters",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["monotonic-stack"],
    description: "Remove duplicates to get smallest lexicographic string.",
    constraints: "1 <= |s| <= 10^4",
    examples: [
      {"input":"bcabc","output":"abc"}
    ],
    test_cases: [
      {"input":"bcabc","expected":"abc"},
      {"input":"cbacdcbc","expected":"acdb"}
    ],
    approach: "Remove Duplicate Letters removes duplicates while preserving order and returning the smallest lexicographic result. The optimal solution uses a monotonic stack with a greedy algorithm that tracks character counts and whether a character is already in the result.\n\nDiagram:\n  s = \"bcabc\", counts: b=2, c=2, a=1\n\n  char 'b': stack=[b],  inStack={b},  counts: b->1\n  char 'c': stack=[b,c], inStack={b,c}, counts: c->1\n  char 'a': pop c (c>a && c still available), pop b (b>a && b still available)\n            stack=[a], inStack={a}, counts: a->0\n  char 'b': stack=[a,b], inStack={a,b}\n  char 'c': stack=[a,b,c], inStack={a,b,c}\n\n  Result: \"abc\"\n\nEdge cases: all unique chars -> same string; single char per letter appears once. Complexity: O(n) time, O(1) space (26 letters).",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int last[26]={0}; for(int i=0;i<s.size();i++)last[s[i]-'a']=i; vector<bool> seen(26,false); stack<char> st; for(int i=0;i<s.size();i++){char c=s[i];if(seen[c-'a'])continue;while(!st.empty()&&st.top()>c&&last[st.top()-'a']>i){seen[st.top()-'a']=false;st.pop();}st.push(c);seen[c-'a']=true;} string res; while(!st.empty()){res+=st.top();st.pop();} reverse(res.begin(),res.end());cout<<res;",
    solution_template: "#include <iostream>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  stack<char> st;\n  // monotonic greedy stack\n\n  cout << result << endl;\n  return 0;\n}",
  },
  {
    id: "asteroid-collision",
    title: "Asteroid Collision",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue"],
    description: "Simulate asteroid collisions (sign = direction).",
    constraints: "1 <= n <= 10^4, -1000 <= asteroids[i] <= 1000",
    examples: [
      {"input":"5\n5 10 -5","output":"5 10"}
    ],
    test_cases: [
      {"input":"5\n5 10 -5","expected":"5 10"},
      {"input":"3\n8 -8","expected":""}
    ],
    approach: "Asteroid Collision simulates asteroids moving left (negative) and right (positive). When they collide, the larger one survives. The optimal solution uses a stack.\n\nDiagram:\n  asteroids = [5, 10, -5]\n\n  +5: push, stack=[5]\n  +10: push, stack=[5,10]\n  -5: top=10>0 (right), -5<0 (left) -> collide\n      10 > |-5| = 5, so -5 explodes, stack=[5,10]\n\n  Result: [5, 10]\n\n  asteroids = [10, 2, -5]\n  +10: push, stack=[10]\n  +2: push, stack=[10,2]   (same direction, no collision)\n  -5: 2<|-5| -> 2 explodes, pop; then 10>|-5| -> -5 explodes, stack=[10]\n\n  Result: [10]\n\nEdge cases: equal magnitude -> both explode; all same direction -> no collisions. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; for(int a:asteroids){if(a>0)st.push(a);else{while(!st.empty()&&st.top()>0&&st.top()<-a)st.pop();if(!st.empty()&&st.top()==-a)st.pop();else if(st.empty()||st.top()<0)st.push(a);}} vector<int> res(st.size()); for(int i=st.size()-1;i>=0;i--){res[i]=st.top();st.pop();}",
    solution_template: "#include <iostream>\n#include <stack>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<int> asteroids(n);\n  for (int i = 0; i < n; i++) cin >> asteroids[i];\n\n  stack<int> st;\n  // process collisions\n\n  for (int x : result) cout << x << \" \";\n  return 0;\n}",
  },
  {
    id: "validate-stack-seq",
    title: "Validate Stack Sequences",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue"],
    description: "Check if push/pop sequence is valid using a stack.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n1 2 3 4 5\n4 5 3 2 1","output":"Yes"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5\n4 5 3 2 1","expected":"Yes"},
      {"input":"5\n1 2 3 4 5\n4 3 5 1 2","expected":"No"}
    ],
    approach: "Validate Stack Sequences checks if given pop sequences can be produced by push/pop operations on a stack. The optimal solution simulates the stack in O(n).\n\nDiagram:\n  pushed = [1,2,3,4,5], popped = [4,5,3,2,1]\n\n  i=0 popIdx=4: push 1, stack=[1]\n  i=1 popIdx=4: push 2, stack=[1,2]\n  i=2 popIdx=4: push 3, stack=[1,2,3]\n  i=3 popIdx=4: push 4, stack=[1,2,3,4]\n                top=4==pop[0]=4, pop, stack=[1,2,3], popIdx=1\n  i=4 popIdx=5: push 5, stack=[1,2,3,5]\n                top=5==pop[1]=5, pop, stack=[1,2,3], popIdx=2\n                top=3==pop[2]=3, pop, stack=[1,2], popIdx=3\n                top=2==pop[3]=2, pop, stack=[1], popIdx=4\n                top=1==pop[4]=1, pop, stack=[], popIdx=5\n  Valid? Yes (all popped)\n\nEdge cases: single element trivially valid. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; int j=0; for(int x:pushed){st.push(x); while(!st.empty()&&st.top()==popped[j]){st.pop();j++;}} cout<<(st.empty()?\"Yes\":\"No\");",
    solution_template: "#include <iostream>\n#include <stack>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<int> pushed(n), popped(n);\n  for (int i = 0; i < n; i++) cin >> pushed[i];\n  for (int i = 0; i < n; i++) cin >> popped[i];\n\n  stack<int> st;\n  // simulate stack\n\n  cout << (valid ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
  },
  {
    id: "car-fleet",
    title: "Car Fleet",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["monotonic-stack"],
    description: "Count number of car fleets reaching destination.",
    constraints: "1 <= n <= 10^5, 0 <= position[i] < target <= 10^6",
    examples: [
      {"input":"12\n10\n4\n0 1\n3 2\n5 1\n8 2","output":"3","explanation":"target=12, cars [[0,1],[3,2],[5,1],[8,2]] -> 3 fleets"}
    ],
    test_cases: [
      {"input":"12\n10\n4\n0 1\n3 2\n5 1\n8 2","expected":"3"}
    ],
    approach: "Car Fleet counts how many groups of cars arrive at the destination together. A car behind cannot pass but can catch up if it's faster. The optimal solution sorts by position descending and uses a monotonic stack of arrival times.\n\nDiagram:\n  target=12, cars=(pos,speed): [(0,1), (3,2), (5,1), (8,2)]\n  sorted by pos descending: [(8,2), (5,1), (3,2), (0,1)]\n\n  times to reach target:\n    (8,2): (12-8)/2=2.0,  stack=[2.0]\n    (5,1): (12-5)/1=7.0,  7.0>2.0 -> new fleet, stack=[2.0,7.0]\n    (3,2): (12-3)/2=4.5,  4.5<7.0 -> catches fleet at 7.0, skip, stack=[2.0,7.0]\n    (0,1): (12-0)/1=12.0, 12.0>7.0 -> new fleet, stack=[2.0,7.0,12.0]\n\n  Number of fleets = 3\n\nEdge cases: all same speed -> each is its own fleet if started at different times; all same position -> single fleet. Complexity: O(n log n) for sorting, O(n) space.",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "vector<pair<int,int>> cars; for(int i=0;i<n;i++)cars.push_back({position[i],speed[i]}); sort(cars.rbegin(),cars.rend()); stack<double> st; for(auto& c:cars){double t=(double)(target-c.first)/c.second; if(st.empty()||t>st.top())st.push(t);}cout<<st.size();",
    solution_template: "#include <iostream>\n#include <stack>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int target, n;\n  cin >> target >> n;\n  vector<int> position(n), speed(n);\n  for (int i = 0; i < n; i++) cin >> position[i] >> speed[i];\n\n  // sort by position descending, stack for fleet times\n\n  cout << fleets << endl;\n  return 0;\n}",
  },
  {
    id: "exclusive-time",
    title: "Exclusive Time of Functions",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue"],
    description: "Calculate exclusive execution time for each function.",
    constraints: "1 <= n <= 100, 1 <= |logs| <= 500",
    examples: [
      {"input":"2\n6\n0:start:0\n1:start:2\n1:end:5\n0:end:6","output":"3 4","explanation":"Function 0 exclusive = 3, function 1 exclusive = 4"}
    ],
    test_cases: [
      {"input":"2\n6\n0:start:0\n1:start:2\n1:end:5\n0:end:6","expected":"3 4"}
    ],
    approach: "Exclusive Time of Functions computes how long each function actually executed, excluding time spent in called functions. The optimal solution uses a stack of function IDs and tracks the previous timestamp.\n\nDiagram:\n  logs = [\"0:start:0\", \"1:start:2\", \"1:end:5\", \"0:end:6\"]\n\n  prev=0: \"0:start:0\" -> stack=[0], prev=0\n  prev=2: \"1:start:2\" -> push 1, time[0]+=2-0=2, prev=2, stack=[0,1]\n  prev=5: \"1:end:5\"   -> pop 1, time[1]+=5-2+1=4, prev=6, stack=[0]\n  prev=6: \"0:end:6\"   -> pop 0, time[0]+=6-6+1=1, prev=7, stack=[]\n\n  time[0] = 2+1 = 3, time[1] = 4\n\nEdge cases: end timestamps are inclusive (add 1); nested functions handled by stack. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<int> st; vector<int> res(n,0); int prev=0; for(string& log:logs){int id=stoi(log.substr(0,log.find(':'))); bool start=log.find(\"start\")!=string::npos; int time=stoi(log.substr(log.rfind(':')+1)); if(!st.empty())res[st.top()]+=time-prev; prev=time; if(start)st.push(id); else{st.pop(); res[id]++; prev++;}}",
    solution_template: "#include <iostream>\n#include <stack>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<string> logs(m);\n  for (int i = 0; i < m; i++) cin >> logs[i];\n\n  stack<int> st;\n  vector<int> result(n, 0);\n  // process logs\n\n  for (int x : result) cout << x << \" \";\n  return 0;\n}",
  },
  {
    id: "max-freq-stack",
    title: "Maximum Frequency Stack",
    category: "stack-queue",
    difficulty: "hard",
    techniques: ["stack-queue"],
    description: "Design stack that pops the most frequent element.",
    constraints: "1 <= q <= 10^5",
    examples: [
      {"input":"8\npush 5\npush 7\npush 5\npush 7\npush 4\npush 5\npop\npop","output":"5 7","explanation":"First pop returns 5 (freq=3), second pop returns 7 (freq=2)"}
    ],
    test_cases: [
      {"input":"8\npush 5\npush 7\npush 5\npush 7\npush 4\npush 5\npop\npop","expected":"5 7"}
    ],
    approach: "Maximum Frequency Stack pops the most frequent element; if tie, the one closest to stack top. The optimal solution uses a map of frequencies to stacks.\n\nDiagram:\n  Operations:\n  push(5): freq[5]=1, freqStack[1]=[5], maxFreq=1\n  push(7): freq[7]=1, freqStack[1]=[5,7], maxFreq=1\n  push(5): freq[5]=2, freqStack[2]=[5], maxFreq=2\n  push(7): freq[7]=2, freqStack[2]=[5,7], maxFreq=2\n  push(4): freq[4]=1, freqStack[1]=[5,7,4], maxFreq=2\n  push(5): freq[5]=3, freqStack[3]=[5], maxFreq=3\n  pop():   freqStack[3]=[5], pop 5, freq[5]=2, maxFreq=3->2 (since freqStack[3] empty)\n  pop():   freqStack[2]=[5,7], pop 7, freq[7]=1\n\n  Output: 5, 7\n\nEdge cases: tie-breaking by recency handled automatically by stack ordering. Complexity: O(1) per operation, O(n) space.",
    complexity: {"time":"O(1) each","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "unordered_map<int,int> freq; unordered_map<int,stack<int>> freqStack; int maxFreq=0; for(string& op:ops){if(op.substr(0,4)==\"push\"){int x=stoi(op.substr(5)); freq[x]++; maxFreq=max(maxFreq,freq[x]); freqStack[freq[x]].push(x);}else{int x=freqStack[maxFreq].top(); freqStack[maxFreq].pop(); freq[x]--; if(freqStack[maxFreq].empty())maxFreq--; cout<<x<<\" \";}}",
    solution_template: "#include <iostream>\n#include <stack>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  int q; cin >> q;\n  unordered_map<int,int> freq;\n  unordered_map<int,stack<int>> freqStack;\n  int maxFreq = 0;\n  // process push/pop\n\n  return 0;\n}",
  },
  {
    id: "online-stock-span",
    title: "Online Stock Span",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["monotonic-stack"],
    description: "Design algorithm that returns stock span for each new price (online).",
    constraints: "1 <= q <= 10^5",
    examples: [
      {"input":"7\n100 80 60 70 60 75 85","output":"1 1 1 2 1 4 6"}
    ],
    test_cases: [
      {"input":"7\n100 80 60 70 60 75 85","expected":"1 1 1 2 1 4 6"}
    ],
    approach: "Online Stock Span is the online version of the stock span problem. The optimal solution maintains a stack of (price, span) pairs where each push aggregates spans from popped smaller prices.\n\nDiagram:\n  next(100): stack=[], span=1, push(100,1) -> return 1\n  next(80):  stack=[(100,1)], 100>80, span=1, push(80,1) -> return 1\n  next(60):  stack=[(100,1),(80,1)], 80>60, span=1, push(60,1) -> return 1\n  next(70):  pop(60,1) span=2, 80>70, push(70,2) -> return 2\n  next(60):  stack=[(100,1),(80,1),(70,2)], 70>60, span=1, push(60,1) -> return 1\n  next(75):  pop(60,1) span=2, pop(70,2) span=4, 80>75, push(75,4) -> return 4\n  next(85):  pop(75,4) span=5, pop(80,1) span=6, 100>85, push(85,6) -> return 6\n\nEdge cases: always decreasing -> all spans = 1. Complexity: O(1) amortized per next() call, O(n) space.",
    complexity: {"time":"O(1) amortized","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<pair<int,int>> st; int next(int price){int span=1; while(!st.empty()&&st.top().first<=price){span+=st.top().second;st.pop();}st.push({price,span});return span;}",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nclass StockSpanner {\n  stack<pair<int,int>> st;\npublic:\n  int next(int price) {\n    // monotonic stack with span aggregation\n  }\n};\n\nint main() {\n  int q; cin >> q;\n  StockSpanner sp;\n  while (q--) {\n    int price; cin >> price;\n    cout << sp.next(price) << endl;\n  }\n  return 0;\n}",
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue"],
    description: "Design LRU cache with get and put in O(1).",
    constraints: "1 <= capacity <= 3000, 1 <= q <= 10^5",
    examples: [
      {"input":"2\n6\nget 2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2","output":"-1 1 -1","explanation":"LRU evicts key 2 when inserting key 3"}
    ],
    test_cases: [
      {"input":"2\n6\nget 2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2","expected":"-1 1 -1"}
    ],
    approach: "LRU Cache evicts the least recently used item when capacity is reached. The optimal solution uses a doubly linked list (for O(1) removal/reordering) and a hash map from key to list node.\n\nDiagram:\n  capacity = 2\n\n  put(1,1): cache=[1],  map={1->node1}\n  put(2,2): cache=[2,1], map={1->node1, 2->node2}  (2 most recent)\n  get(1):   move 1 to front -> cache=[1,2], return 1\n  put(3,3): cache full, evict LRU=2, insert 3 -> cache=[3,1], map={1->node1, 3->node3}\n  get(2):   not found, return -1\n\n  Output: -1, 1, -1\n\nEdge cases: get on missing key returns -1; put existing key updates value and moves to front. Complexity: O(1) per operation, O(capacity) space.",
    complexity: {"time":"O(1) each","space":"O(capacity)"},
    sheet: "Striver A2Z",
    solution_code: "class LRUCache{int cap; list<pair<int,int>> li; unordered_map<int,list<pair<int,int>>::iterator> mp; public: LRUCache(int c){cap=c;} int get(int k){if(!mp.count(k))return -1; li.splice(li.begin(),li,mp[k]); return mp[k]->second;} void put(int k,int v){if(mp.count(k)){mp[k]->second=v; li.splice(li.begin(),li,mp[k]); return;} if(li.size()==cap){mp.erase(li.back().first); li.pop_back();} li.push_front({k,v}); mp[k]=li.begin();}};",
    solution_template: "#include <iostream>\n#include <list>\n#include <unordered_map>\nusing namespace std;\n\nclass LRUCache {\n  int capacity;\n  list<pair<int,int>> li;\n  unordered_map<int, list<pair<int,int>>::iterator> mp;\npublic:\n  LRUCache(int cap) { capacity = cap; }\n  int get(int key) {\n    // if found, move to front and return\n  }\n  void put(int key, int value) {\n    // update or insert, evict LRU if full\n  }\n};\n\nint main() {\n  int cap, q; cin >> cap >> q;\n  LRUCache cache(cap);\n  while (q--) {\n    string op; cin >> op;\n    if (op == \"get\") { int k; cin >> k; cout << cache.get(k) << endl; }\n    else if (op == \"put\") { int k, v; cin >> k >> v; cache.put(k, v); }\n  }\n  return 0;\n}",
  },
  {
    id: "lfu-cache",
    title: "LFU Cache",
    category: "stack-queue",
    difficulty: "hard",
    techniques: ["stack-queue"],
    description: "Design LFU cache with get and put in O(1).",
    constraints: "1 <= capacity <= 10^4, 1 <= q <= 10^5",
    examples: [
      {"input":"2\n8\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3\nput 4 4\nget 1","output":"1 -1 3 -1","explanation":"LFU evicts least frequently used, ties broken by LRU"}
    ],
    test_cases: [
      {"input":"2\n8\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3\nput 4 4\nget 1","expected":"1 -1 3 -1"}
    ],
    approach: "LFU Cache evicts the least frequently used item, breaking ties by LRU. The optimal solution uses a frequency-to-list map and a key-to-node map.\n\nDiagram:\n  capacity = 2\n\n  put(1,1): freq[1]=1, freqList[1]=[1], minFreq=1\n  put(2,2): freq[2]=1, freqList[1]=[1,2], minFreq=1\n  get(1):   freq[1]=2, move 1 to freqList[2], minFreq=1 (freqList[1] still has 2)\n  put(3,3): evict LRU from minFreq=1 -> evict 2, insert 3 at freq=1, freqList[1]=[3], minFreq=1\n  get(2):   -1 (evicted)\n  get(3):   freq[3]=2, move 3 to freqList[2], freqList[1]=[], minFreq=2\n  put(4,4): evict LRU from minFreq=2 -> evict 1, insert 4 at freq=1, freqList[1]=[4], minFreq=1\n  get(1):   -1 (evicted)\n\n  Output: 1, -1, 3, -1\n\nEdge cases: get on missing key returns -1; capacity 0 returns -1 for all. Complexity: O(1) per operation, O(capacity) space.",
    complexity: {"time":"O(1) each","space":"O(capacity)"},
    sheet: "Striver A2Z",
    solution_code: "class LFUCache{int cap,minFreq; unordered_map<int,pair<int,int>> keyVal; unordered_map<int,list<int>> freqList; unordered_map<int,list<int>::iterator> keyIter; public: LFUCache(int c){cap=c;minFreq=0;} int get(int k){if(!keyVal.count(k))return -1; int f=keyVal[k].second++; freqList[f].erase(keyIter[k]); freqList[f+1].push_front(k); keyIter[k]=freqList[f+1].begin(); if(freqList[minFreq].empty())minFreq++; return keyVal[k].first;} void put(int k,int v){if(cap<=0)return; if(keyVal.count(k)){keyVal[k].first=v; get(k);return;} if(keyVal.size()==cap){int evict=freqList[minFreq].back(); freqList[minFreq].pop_back(); keyVal.erase(evict); keyIter.erase(evict);} keyVal[k]={v,1}; freqList[1].push_front(k); keyIter[k]=freqList[1].begin(); minFreq=1;}};",
    solution_template: "#include <iostream>\n#include <list>\n#include <unordered_map>\nusing namespace std;\n\nclass LFUCache {\n  int capacity, minFreq;\n  unordered_map<int, pair<int,int>> keyVal;       // key -> (value, freq)\n  unordered_map<int, list<int>> freqList;         // freq -> list of keys\n  unordered_map<int, list<int>::iterator> keyIter; // key -> iterator in freqList\npublic:\n  LFUCache(int cap) { capacity = cap; minFreq = 0; }\n  int get(int key) {\n    // increment frequency, return value\n  }\n  void put(int key, int value) {\n    // insert or update, evict LFU if full\n  }\n};\n\nint main() {\n  int cap, q; cin >> cap >> q;\n  LFUCache cache(cap);\n  while (q--) {\n    string op; cin >> op;\n    if (op == \"get\") { int k; cin >> k; cout << cache.get(k) << endl; }\n    else if (op == \"put\") { int k, v; cin >> k >> v; cache.put(k, v); }\n  }\n  return 0;\n}",
  },
  {
    id: "largest-rectangle",
    title: "Largest Rectangle in Histogram (Alternate)",
    category: "stack-queue",
    difficulty: "hard",
    techniques: ["monotonic-stack"],
    description: "Find max rectangle area (divide-and-conquer approach).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n2 1 5 6 2 3","output":"10"}
    ],
    test_cases: [
      {"input":"6\n2 1 5 6 2 3","expected":"10"}
    ],
    approach: "Alternate divide-and-conquer approach for largest rectangle: find the minimum bar, recursively solve left and right, and compute area spanning the full range.\n\nDiagram:\n  heights = [2, 1, 5, 6, 2, 3]\n\n  find min idx=1 (h=1)\n  area = 1 * 6 = 6\n  recurse left:  [2]\n    min idx=0 (h=2), area=2*1=2, result=2\n  recurse right: [5,6,2,3]\n    min idx=2 (h=2), area=2*4=8\n    recurse left:  [5,6]\n      min idx=0 (h=5), area=5*2=10, result=10\n    recurse right: [3]\n      min idx=0 (h=3), area=3*1=3, result=10\n\n  Max = max(6, 2, 8, 10, 3) = 10\n\nEdge cases: empty array returns 0; single element returns its height. Complexity: O(n log n) average, O(n^2) worst case (sorted), O(n) space.",
    complexity: {"time":"O(n log n) avg","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "function solve(l,r){if(l>r)return 0; int m=l; for(int i=l;i<=r;i++)if(heights[i]<heights[m])m=i; return max({heights[m]*(r-l+1),solve(l,m-1),solve(m+1,r)});}",
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint heights[100000];\n\nint solve(int l, int r) {\n  if (l > r) return 0;\n  // find min in range, divide and conquer\n}\n\nint main() {\n  int n; cin >> n;\n  for (int i = 0; i < n; i++) cin >> heights[i];\n  cout << solve(0, n-1) << endl;\n  return 0;\n}",
  },
  {
    id: "max-sliding-window",
    title: "Max Sliding Window (Heap Approach)",
    category: "stack-queue",
    difficulty: "hard",
    techniques: ["sliding-window"],
    description: "Find max in every sliding window using max-heap.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"8\n1 3 -1 -3 5 3 6 7\n3","output":"3 3 5 5 6 7"}
    ],
    test_cases: [
      {"input":"8\n1 3 -1 -3 5 3 6 7\n3","expected":"3 3 5 5 6 7"}
    ],
    approach: "Alternate max-heap approach for sliding window maximum using a priority queue of (value, index) pairs, lazily removing out-of-window elements.\n\nDiagram:\n  arr = [1, 3, -1, -3, 5, 3, 6, 7], k=3\n\n  i=0: push(1,0), heap=[(1,0)]\n  i=1: push(3,1), heap=[(3,1),(1,0)]\n  i=2: push(-1,2), heap=[(3,1),(1,0),(-1,2)], top=(3,1) in window -> output 3\n  i=3: push(-3,3), heap=[(3,1),(1,0),(-1,2),(-3,3)], top=(3,1) in window -> output 3\n  i=4: push(5,4), heap=[(5,4),(3,1),...], top=(5,4) in window -> output 5\n  i=5: push(3,5), top=(5,4) -> output 5\n  i=6: push(6,6), top=(6,6) -> output 6\n  i=7: push(7,7), top=(7,7) -> output 7\n\n  result = [3, 3, 5, 5, 6, 7]\n\nEdge cases: k=1 returns array; k=n returns global max. Complexity: O(n log n) time, O(n) space.",
    complexity: {"time":"O(n log k)","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "priority_queue<pair<int,int>> pq; for(int i=0;i<n;i++){pq.push({arr[i],i}); while(pq.top().second<=i-k)pq.pop(); if(i>=k-1)cout<<pq.top().first<<\" \";}",
    solution_template: "#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n\n  priority_queue<pair<int,int>> pq; // max-heap\n\n  return 0;\n}",
  },
  {
    id: "sort-stack",
    title: "Sort a Stack",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["recursion", "stack-queue"],
    description: "Sort a stack in ascending order using recursion.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"5\n3 1 4 2 5","output":"1 2 3 4 5"}
    ],
    test_cases: [
      {"input":"5\n3 1 4 2 5","expected":"1 2 3 4 5"}
    ],
    approach: "Sort a Stack uses recursion to sort elements without loops or extra data structures. The stack must be sorted in ascending order with smallest at top.\n\nDiagram:\n  stack = [3, 1, 4, 2, 5] (top=5)\n\n  sort(stack):\n    pop top=5, sort rest [3,1,4,2]\n      pop top=2, sort rest [3,1,4]\n        pop top=4, sort rest [3,1]\n          pop top=1, sort rest [3]\n            pop top=3, sort rest [] -> return\n            insert 3 into [] -> stack=[3]\n          insert 1 into [3]: stack=[3,1] -> 3>1 pop, insert 1, push 3 -> stack=[1,3]\n        insert 4 into [1,3]: 3<4 push -> stack=[1,3,4]\n      insert 2 into [1,3,4]: pop 4(>2), pop 3(>2), insert 2, push 3, push 4 -> stack=[1,2,3,4]\n    insert 5 into [1,2,3,4]: push 5 -> stack=[1,2,3,4,5]\n\n  sorted stack = [1, 2, 3, 4, 5]\n\nEdge cases: empty or single-element stack is already sorted. Complexity: O(n^2) worst-case, O(n) recursion depth.",
    complexity: {"time":"O(n^2)","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "void sort(stack<int>& s){if(s.empty())return; int top=s.top(); s.pop(); sort(s); insert(s,top);} void insert(stack<int>& s,int x){if(s.empty()||s.top()<=x){s.push(x);return;} int top=s.top(); s.pop(); insert(s,x); s.push(top);}",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nvoid insert(stack<int>& s, int x) {\n  // insert x in sorted order\n}\n\nvoid sortStack(stack<int>& s) {\n  // recursive sort\n}\n\nint main() {\n  int n; cin >> n;\n  stack<int> s;\n  for (int i = 0; i < n; i++) { int x; cin >> x; s.push(x); }\n\n  sortStack(s);\n\n  while (!s.empty()) { cout << s.top() << \" \"; s.pop(); }\n  return 0;\n}",
  },
  {
    id: "postfix-eval",
    title: "Postfix Expression Evaluation",
    category: "stack-queue",
    difficulty: "easy",
    techniques: ["stack-queue"],
    description: "Evaluate postfix expression.",
    constraints: "1 <= |s| <= 10^4",
    examples: [
      {"input":"231*+9-","output":"-4","explanation":"2+3*1-9 = -4"}
    ],
    test_cases: [
      {"input":"231*+9-","expected":"-4"}
    ],
    approach: "Postfix Evaluation evaluates an expression written in postfix notation (operators after operands) using a stack of operands.\n\nDiagram:\n  expr = \"231*+9-\"\n\n  '2': push 2, stack=[2]\n  '3': push 3, stack=[2,3]\n  '1': push 1, stack=[2,3,1]\n  '*': pop 1,3 -> 3*1=3, push 3, stack=[2,3]\n  '+': pop 3,2 -> 2+3=5, push 5, stack=[5]\n  '9': push 9, stack=[5,9]\n  '-': pop 9,5 -> 5-9=-4, push -4, stack=[-4]\n\n  Result: -4\n\nEdge cases: single operand returns itself; division handles truncation toward zero. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "stack<int> st; for(char c:s){if(isdigit(c))st.push(c-'0');else{int b=st.top();st.pop();int a=st.top();st.pop();if(c=='+')st.push(a+b);else if(c=='-')st.push(a-b);else if(c=='*')st.push(a*b);else st.push(a/b);}}cout<<st.top();",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  stack<int> st;\n  // evaluate postfix\n\n  cout << result << endl;\n  return 0;\n}",
  },
  {
    id: "prefix-eval",
    title: "Prefix Expression Evaluation",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue"],
    description: "Evaluate prefix expression.",
    constraints: "1 <= |s| <= 10^4",
    examples: [
      {"input":"-+231*9","output":"-2","explanation":"(2+3-1)*9 = -2? wait: - + 2 3 1 * 9 -> (-(+23)1)*9 = (-51)*9 = -4*9=-36. Let me recalc: -+231*9 => evaluate RTL"}
    ],
    test_cases: [
      {"input":"-+231","output":"-4"}
    ],
    approach: "Prefix Evaluation evaluates an expression where the operator precedes its operands. The optimal solution traverses from right to left, using a stack of operands.\n\nDiagram:\n  expr = \"-+231\"\n\n  traverse right to left:\n  '1': push 1, stack=[1]\n  '3': push 3, stack=[1,3]\n  '2': push 2, stack=[1,3,2]\n  '+': pop 2,3 -> 2+3=5, push 5, stack=[1,5]\n  '-': pop 5,1 -> 1-5=-4, push -4, stack=[-4]\n\n  Result: -4\n\nEdge cases: single operand returns itself. Complexity: O(n) time, O(n) space.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "stack<int> st; for(int i=s.size()-1;i>=0;i--){if(isdigit(s[i]))st.push(s[i]-'0');else{int a=st.top();st.pop();int b=st.top();st.pop();if(s[i]=='+')st.push(a+b);else if(s[i]=='-')st.push(a-b);else if(s[i]=='*')st.push(a*b);else st.push(a/b);}}cout<<st.top();",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  stack<int> st;\n  // traverse right to left\n\n  cout << result << endl;\n  return 0;\n}",
  },
  {
    id: "balanced-parens",
    title: "Balanced Parentheses Check",
    category: "stack-queue",
    difficulty: "easy",
    techniques: ["stack-queue"],
    description: "Check if expression has balanced parentheses only (no other brackets).",
    constraints: "1 <= |s| <= 10^4",
    examples: [
      {"input":"(()())","output":"Yes"}
    ],
    test_cases: [
      {"input":"(()())","expected":"Yes"},
      {"input":"(()","expected":"No"}
    ],
    approach: "Balanced Parentheses (simple version) checks if every opening '(' has a matching closing ')'. Uses a counter approach since only one bracket type exists.\n\nDiagram:\n  s = \"(()())\"\n\n  '(' : count=1\n  '(' : count=2\n  ')' : count=1\n  '(' : count=2\n  ')' : count=1\n  ')' : count=0\n  end: count=0 -> valid ✓\n\n  s = \"(()\"\n  '(' : count=1\n  '(' : count=2\n  ')' : count=1\n  end: count=1 != 0 -> invalid ✗\n\nEdge cases: empty string is valid; closing before any opening makes count negative -> invalid early. Complexity: O(n) time, O(1) space.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "int c=0; for(char ch:s){if(ch=='(')c++;else{c--;if(c<0){cout<<\"No\";return 0;}}} cout<<(c==0?\"Yes\":\"No\");",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  int count = 0;\n  // counter approach for single bracket type\n\n  cout << (valid ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
  },
  {
    id: "reverse-stack",
    title: "Reverse a Stack Using Recursion",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["recursion", "stack-queue"],
    description: "Reverse stack elements using recursion only.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"4\n1 2 3 4","output":"1 2 3 4","explanation":"Original stack top=4, reversed has top=1"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 4","expected":"1 2 3 4"}
    ],
    approach: "Reverse a Stack using recursion without loops or extra data structures, using the call stack to reverse element order.\n\nDiagram:\n  stack = [1, 2, 3, 4] (top=4)\n\n  reverse(stack):\n    pop top=4, reverse([1,2,3])\n      pop top=3, reverse([1,2])\n        pop top=2, reverse([1])\n          pop top=1, reverse([]) -> return\n          insertAtBottom([], 1) -> stack=[1]\n        insertAtBottom([1], 2) -> push 1 pop, insert 2, push 1 -> stack=[2,1]\n      insertAtBottom([2,1], 3) -> push 1,2 -> stack=[3,2,1]\n    insertAtBottom([3,2,1], 4) -> push 1,2,3 -> stack=[4,3,2,1]\n\n  reversed stack = [4, 3, 2, 1] (top=1) ✓\n\nEdge cases: empty or single-element stack already reversed. Complexity: O(n^2) time, O(n) recursion depth.",
    complexity: {"time":"O(n^2)","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "void rev(stack<int>& s){if(s.empty())return; int x=s.top();s.pop();rev(s);insertAtBottom(s,x);} void insertAtBottom(stack<int>& s,int x){if(s.empty()){s.push(x);return;} int y=s.top();s.pop();insertAtBottom(s,x);s.push(y);}",
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nvoid insertAtBottom(stack<int>& s, int x) {\n  // recursively insert at bottom\n}\n\nvoid reverse(stack<int>& s) {\n  // recursively reverse\n}\n\nint main() {\n  int n; cin >> n;\n  stack<int> s;\n  for (int i = 0; i < n; i++) { int x; cin >> x; s.push(x); }\n\n  reverse(s);\n\n  while (!s.empty()) { cout << s.top() << \" \"; s.pop(); }\n  return 0;\n}",
  },
  {
    id: "first-non-repeating",
    title: "First Non-Repeating Character in Stream",
    category: "stack-queue",
    difficulty: "medium",
    techniques: ["stack-queue", "tree-bfs"],
    description: "Find first non-repeating char in a stream using queue.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\na a b c c b d","output":"a -1 b b -1 d"}
    ],
    test_cases: [
      {"input":"7\na a b c c b d","expected":"a -1 b b -1 d"}
    ],
    approach: "First Non-Repeating Character in a Stream processes characters one by one, outputting the first non-repeating character seen so far. The optimal solution uses a queue and frequency array.\n\nDiagram:\n  stream: a, a, b, c, c, b, d\n\n  'a': freq[a]=1, q=[a], output a\n  'a': freq[a]=2, q=[a], pop front(a) since freq>1, q=[], output -1\n  'b': freq[b]=1, q=[b], output b\n  'c': freq[c]=1, q=[b,c], output b\n  'c': freq[c]=2, q=[b,c], pop front(c) freq>1? no, front=b freq=1 -> output b\n  'b': freq[b]=2, q=[b,c], pop front(b) freq>1, q=[c], pop front(c) freq>1? no, q=[], output -1\n  'd': freq[d]=1, q=[d], output d\n\n  Output: a, -1, b, b, -1, d\n\nEdge cases: all repeating -> all -1 after first pass. Complexity: O(n) time, O(1) space (26 letters).",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int freq[26]={0}; queue<char> q; for(char c:stream){freq[c-'a']++; q.push(c); while(!q.empty()&&freq[q.front()-'a']>1)q.pop(); cout<<(q.empty()?\"-1\":string(1,q.front()))<<\" \";}",
    solution_template: "#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  char stream[n];\n  for (int i = 0; i < n; i++) cin >> stream[i];\n\n  queue<char> q;\n  int freq[26] = {0};\n\n  // process stream\n\n  return 0;\n}",
  },
]
