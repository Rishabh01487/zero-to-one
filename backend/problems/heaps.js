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
  },
  {
    id: "merge-k-sorted",
    title: "Merge K Sorted Arrays",
    category: "heaps",
    difficulty: "hard",
    description: "Merge k sorted arrays into one sorted array using min-heap.",
    constraints: "1 <= k <= 10^4, total elements <= 10^5",
    examples: [
      {"input":"3\n3\n1 4 7\n3\n2 5 8\n3\n3 6 9","output":"1 2 3 4 5 6 7 8 9"}
    ],
    test_cases: [
      {"input":"3\n3\n1 4 7\n3\n2 5 8\n3\n3 6 9","expected":"1 2 3 4 5 6 7 8 9"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nstruct Element {\n  int val, arrIdx, idx;\n  bool operator>(const Element& other) const { return val > other.val; }\n};\n\nint main() {\n  int k; cin >> k;\n  vector<vector<int>> arr(k);\n  for (int i = 0; i < k; i++) {\n    int sz; cin >> sz;\n    arr[i].resize(sz);\n    for (int j = 0; j < sz; j++) cin >> arr[i][j];\n  }\n\n  priority_queue<Element, vector<Element>, greater<>> pq;\n  for (int i = 0; i < k; i++) if (!arr[i].empty()) pq.push({arr[i][0], i, 0});\n\n  while (!pq.empty()) {\n    auto e = pq.top(); pq.pop();\n    cout << e.val << \" \";\n    if (e.idx + 1 < (int)arr[e.arrIdx].size())\n      pq.push({arr[e.arrIdx][e.idx+1], e.arrIdx, e.idx+1});\n  }\n  return 0;\n}",
    approach: "Min-heap of {value, listIdx, elementIdx}. Pop smallest, push next from same list.",
    complexity: {"time":"O(n log k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "auto cmp=[](Node& a,Node& b){return a.val>b.val;}; priority_queue<Node,vector<Node>,decltype(cmp)> pq(cmp); for(int i=0;i<k;i++)pq.push({lists[i]->val,i}); Node dummy(0); Node* t=&dummy; while(!pq.empty()){Node* cur=pq.top();pq.pop();t->next=cur;t=t->next;if(cur->next)pq.push({cur->next->val});} return dummy.next;",
  }
]
