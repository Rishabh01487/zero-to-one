export default [
  {
    id: "kth-largest-stream",
    title: "Kth Largest Element in a Stream",
    category: "heaps",
    difficulty: "easy",
    description: "Track kth largest element as numbers are added.",
    constraints: "1 <= n <= 10^4, 1 <= k <= n",
    examples: [
      {"input":"3 8\n4 5 8 2","output":"4 5 5 8"}
    ],
    test_cases: [
      {"input":"3 8\n4 5 8 2","expected":"4 5 5 8"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int k, x; cin >> k >> x;\n  priority_queue<int, vector<int>, greater<>> pq;\n  pq.push(x);\n\n  int n; while (cin >> n) {\n    pq.push(n);\n    if ((int)pq.size() > k) pq.pop();\n    cout << pq.top() << \" \";\n  }\n  return 0;\n}",
    approach: "Min-heap of size k: push elements, pop when size > k. Root is kth largest.",
    complexity: {"time":"O(n log k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<int,vector<int>,greater<int>> pq; for(int x:arr){pq.push(x);if(pq.size()>k)pq.pop();}cout<<pq.top();",
  }
]
