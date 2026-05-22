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
  },
  {
    id: "top-k-freq",
    title: "Top K Frequent Elements",
    category: "heaps",
    difficulty: "medium",
    description: "Return k most frequent elements.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"6\n1 1 1 2 2 3\n2","output":"1 2"}
    ],
    test_cases: [
      {"input":"6\n1 1 1 2 2 3\n2","expected":"1 2"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <queue>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int nums[n];\n  for (int i = 0; i < n; i++) cin >> nums[i];\n  cin >> k;\n\n  unordered_map<int,int> freq;\n  for (int x : nums) freq[x]++;\n\n  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\n  for (auto& p : freq) {\n    pq.push({p.second, p.first});\n    if ((int)pq.size() > k) pq.pop();\n  }\n\n  vector<int> ans;\n  while (!pq.empty()) { ans.push_back(pq.top().second); pq.pop(); }\n  for (int i = ans.size()-1; i >= 0; i--) cout << ans[i] << \" \";\n  return 0;\n}",
    approach: "Count frequencies with map, then min-heap of size k. Pop smallest frequency when size > k.",
    complexity: {"time":"O(n log k)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "unordered_map<int,int> mp; for(int x:arr)mp[x]++; priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>> pq; for(auto& p:mp){pq.push({p.second,p.first});if(pq.size()>k)pq.pop();} while(!pq.empty()){cout<<pq.top().second<<\" \";pq.pop();}",
  },
  {
    id: "find-median-stream",
    title: "Find Median from Data Stream",
    category: "heaps",
    difficulty: "hard",
    description: "Maintain median as numbers are added.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n1 2 3 4 5 6","output":"1 1.5 2 2.5 3 3.5"}
    ],
    test_cases: [
      {"input":"6\n1 2 3 4 5 6","expected":"1 1.5 2 2.5 3 3.5"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n  priority_queue<int> maxHeap;\n  priority_queue<int, vector<int>, greater<>> minHeap;\n\n  int n; while (cin >> n) {\n    if (maxHeap.empty() || n <= maxHeap.top()) maxHeap.push(n);\n    else minHeap.push(n);\n\n    if (maxHeap.size() > minHeap.size() + 1) { minHeap.push(maxHeap.top()); maxHeap.pop(); }\n    if (minHeap.size() > maxHeap.size()) { maxHeap.push(minHeap.top()); minHeap.pop(); }\n\n    if (maxHeap.size() > minHeap.size()) cout << maxHeap.top() << endl;\n    else cout << (maxHeap.top() + minHeap.top()) / 2.0 << endl;\n  }\n  return 0;\n}",
    approach: "Two heaps: max-heap for left half, min-heap for right. Balance sizes. Median is root of left (or average).",
    complexity: {"time":"O(log n) each","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<int> maxh; priority_queue<int,vector<int>,greater<int>> minh; for(int x:arr){if(maxh.empty()||x<=maxh.top())maxh.push(x);else minh.push(x); if(maxh.size()>minh.size()+1){minh.push(maxh.top());maxh.pop();}else if(minh.size()>maxh.size()){maxh.push(minh.top());minh.pop();}cout<<maxh.top()<<\" \";}",
  },
  {
    id: "k-closest",
    title: "K Closest Points to Origin",
    category: "heaps",
    difficulty: "medium",
    description: "Find k closest points to origin.",
    constraints: "1 <= n <= 10^4, 1 <= k <= n",
    examples: [
      {"input":"3 2\n1 3\n-2 2\n5 8","output":"-2 2\n1 3"}
    ],
    test_cases: [
      {"input":"3 2\n1 3\n-2 2\n5 8","expected":"-2 2\n1 3"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n >> k;\n  vector<pair<int,int>> pts(n);\n  for (int i = 0; i < n; i++) cin >> pts[i].first >> pts[i].second;\n\n  priority_queue<pair<long long, pair<int,int>>> pq;\n  for (auto& p : pts) {\n    long long dist = (long long)p.first * p.first + (long long)p.second * p.second;\n    pq.push({dist, p});\n    if ((int)pq.size() > k) pq.pop();\n  }\n\n  vector<pair<int,int>> ans;\n  while (!pq.empty()) { ans.push_back(pq.top().second); pq.pop(); }\n  for (auto& p : ans) cout << p.first << \" \" << p.second << endl;\n  return 0;\n}",
    approach: "Max-heap of size k: push squared distance, pop when size > k. Remaining are k closest.",
    complexity: {"time":"O(n log k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<pair<long long,pair<int,int>>> pq; for(auto& p:pts){long long d=1LL*p.first*p.first+1LL*p.second*p.second;pq.push({d,p});if(pq.size()>k)pq.pop();} vector<pair<int,int>> ans; while(!pq.empty()){ans.push_back(pq.top().second);pq.pop();} for(auto& p:ans)cout<<p.first<<\" \"<<p.second<<endl;",
  },
  {
    id: "task-scheduler",
    title: "Task Scheduler",
    category: "heaps",
    difficulty: "medium",
    description: "Find minimum time to complete tasks with cooling period between same tasks.",
    constraints: "1 <= n <= 10^4, 0 <= cool <= 100",
    examples: [
      {"input":"6\nA A A B B B\n2","output":"8","explanation":"A->B->idle->A->B->idle->A->B"}
    ],
    test_cases: [
      {"input":"6\nA A A B B B\n2","expected":"8"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, cool; cin >> n;\n  char tasks[n];\n  for (int i = 0; i < n; i++) cin >> tasks[i];\n  cin >> cool;\n\n  int freq[26] = {0};\n  for (int i = 0; i < n; i++) freq[tasks[i]-'A']++;\n\n  priority_queue<int> pq;\n  for (int f : freq) if (f > 0) pq.push(f);\n\n  int time = 0;\n  while (!pq.empty()) {\n    vector<int> temp;\n    for (int i = 0; i <= cool; i++) {\n      if (!pq.empty()) { temp.push_back(pq.top()); pq.pop(); }\n    }\n    for (int f : temp) if (--f > 0) pq.push(f);\n    time += temp.size() <= cool ? cool + 1 : (int)temp.size();\n  }\n  cout << time << endl;\n  return 0;\n}",
    approach: "Max-heap of frequencies. Process in cycles of cool+1, decrement and re-push remaining tasks.",
    complexity: {"time":"O(n)","space":"O(26)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<int> pq; for(int f:freq)if(f>0)pq.push(f); int time=0; while(!pq.empty()){vector<int> tmp; for(int i=0;i<=cool&&!pq.empty();i++){tmp.push_back(pq.top());pq.pop();} for(int f:tmp)if(--f>0)pq.push(f); time+=tmp.size()<=cool?cool+1:(int)tmp.size();} cout<<time;",
  }
]
