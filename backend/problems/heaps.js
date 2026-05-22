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
    approach: "This problem asks us to track the kth largest element dynamically as numbers are added one by one to a stream. Given an integer k, after each insertion we must output the kth largest element among all numbers seen so far, where the kth largest is defined as the element at position k when the stream is sorted in descending order. A brute-force approach would store all elements and sort after each insertion, costing O(n log n) per operation for a total of O(n\u00b2 log n), which is far too slow for real-time or large-stream scenarios. A min-heap of fixed size k provides an optimal O(log k) per insertion solution because we only ever need to remember the k largest elements\u2014anything smaller than the kth largest is irrelevant and can be safely discarded. The algorithm maintains a min-heap that always contains the k largest elements seen so far. For each incoming number, we push it onto the heap. If the heap size exceeds k, we pop the smallest element, which by definition cannot be among the top k largest. After balancing, the root of the min-heap is precisely the kth largest element.\n\nDiagram:\n  stream = [4, 5, 8, 2], k = 3\n\n  Min-heap of size k:\n  [4]       -> push 4: [4]\n  [4, 5]    -> push 5: [4, 5]\n  [4, 5, 8] -> push 8: [4, 5, 8]\n  [4, 5, 8] -> push 2, size>k: pop 2 -> [4, 5, 8]\n\n  kth largest = heap.top() = 5\n\n```\nkth-largest-stream (min-heap of size k):\n  stream = [4, 5, 8, 2], k = 3\n\n  Push 4 \u2192 Heap: [4]\n  Push 5 \u2192 Heap: [4, 5]\n  Push 8 \u2192 Heap: [4, 5, 8]\n  Push 2 \u2192 size > k \u2192 pop min \u2192 Heap: [4, 5, 8]\n\n  After insertion of 4: top=4\n  After insertion of 5: top=4\n  After insertion of 8: top=4\n  After insertion of 2: top=5\n  Output: 4 4 4 5\n```\n\nDry run with k=3 and stream [8,4,5,2]: push 8 \u2192 heap=[8], top=8; push 4 \u2192 heap=[4,8], top=4; push 5 \u2192 heap=[4,5,8], top=4; push 2 \u2192 heap=[2,4,5,8], size=4>3 so pop 2 \u2192 heap=[4,5,8], top=5. Outputs: 8,4,4,5. This is correct because after four elements, the sorted stream is [8,5,4,2] and the 3rd largest is 5. Time complexity is O(n log k) for n insertions and space is O(k) for the heap.",
    complexity: {"time":"O(n log k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<int,vector<int>,greater<int>> pq; for(int x:arr){pq.push(x);if(pq.size()>k)pq.pop();}cout<<pq.top();",
    techniques: ["heaps"],
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
    approach: "This problem asks us to merge k individually sorted arrays into a single sorted array. Given k arrays, each sorted in ascending order, the goal is to produce one combined array containing all elements in sorted order. A naive approach concatenates all arrays and applies a general-purpose sort, costing O(N log N) where N is the total number of elements across all arrays\u2014this completely ignores the existing sorted structure. A slightly better approach repeatedly scans the first element of each array to find the minimum, taking O(k) per selection and O(Nk) total, which is inefficient when k is large. A min-heap elegantly exploits the fact that each array is individually sorted by always selecting the globally smallest available element in O(log k) time.\n\nDiagram:\n  arr = [[1,4,7],[2,5,8],[3,6,9]]\n\n  Initial heap: [(1,0,0), (2,1,0), (3,2,0)]\n\n  Pop 1 \u2192 push 4 from arr[0] \u2192 Heap: [(2,1,0), (3,2,0), (4,0,1)]\n  Pop 2 \u2192 push 5 from arr[1] \u2192 Heap: [(3,2,0), (4,0,1), (5,1,1)]\n  Pop 3 \u2192 push 6 from arr[2] \u2192 Heap: [(4,0,1), (5,1,1), (6,2,1)]\n  Pop 4 \u2192 push 7 from arr[0] \u2192 Heap: [(5,1,1), (6,2,1), (7,0,2)]\n  Pop 5 \u2192 push 8 from arr[1] \u2192 Heap: [(6,2,1), (7,0,2), (8,1,2)]\n  Pop 6 \u2192 push 9 from arr[2] \u2192 Heap: [(7,0,2), (8,1,2), (9,2,2)]\n  Pop 7, 8, 9 \u2192 done\n\n  Result: [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n```\nmerge-k-sorted (min-heap of first elements):\n  arr = [[1,4,7],[2,5,8],[3,6,9]]\n\n  Initial heap: [(1,0,0), (2,1,0), (3,2,0)]\n\n  Pop 1 \u2192 push 4 from arr[0] \u2192 Heap: [(2,1,0), (3,2,0), (4,0,1)]\n  Pop 2 \u2192 push 5 from arr[1] \u2192 Heap: [(3,2,0), (4,0,1), (5,1,1)]\n  Pop 3 \u2192 push 6 from arr[2] \u2192 Heap: [(4,0,1), (5,1,1), (6,2,1)]\n  Pop 4 \u2192 push 7 from arr[0] \u2192 Heap: [(5,1,1), (6,2,1), (7,0,2)]\n  Pop 5 \u2192 push 8 from arr[1] \u2192 Heap: [(6,2,1), (7,0,2), (8,1,2)]\n  Pop 6 \u2192 push 9 from arr[2] \u2192 Heap: [(7,0,2), (8,1,2), (9,2,2)]\n  Pop 7, 8, 9 \u2192 no more elements\n\n  Result: [1, 2, 3, 4, 5, 6, 7, 8, 9]\n```\n\nThe algorithm initializes a min-heap with the first element of each array, storing each as a tuple (value, arrayIndex, elementIndex). While the heap is not empty, we pop the smallest element, append its value to the result, and push the next element from the same array if one exists. This guarantees we always pick the globally smallest available element at each step. Time complexity is O(N log k) since each push and pop costs O(log k) and we process N elements total. Space is O(k) for the heap plus O(N) for the output.",
    complexity: {"time":"O(n log k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "auto cmp=[](Node& a,Node& b){return a.val>b.val;}; priority_queue<Node,vector<Node>,decltype(cmp)> pq(cmp); for(int i=0;i<k;i++)pq.push({lists[i]->val,i}); Node dummy(0); Node* t=&dummy; while(!pq.empty()){Node* cur=pq.top();pq.pop();t->next=cur;t=t->next;if(cur->next)pq.push({cur->next->val});} return dummy.next;",
    techniques: ["heaps"],
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
    approach: "This problem asks us to return the k most frequent elements from a given integer array. Given an array nums and an integer k, we must identify the k elements that appear most frequently, where frequency is the count of occurrences in the array. A straightforward brute-force solution counts frequencies using a hash map and then sorts all distinct elements by frequency in descending order, taking O(n + m log m) where m is the number of distinct elements. When m is large but k is small, sorting all m elements is wasteful. A min-heap of fixed size k solves this optimally by maintaining only the k candidates with the highest frequencies seen so far.\n\nDiagram:\n  nums = [1,1,1,2,2,3], k = 2\n  freq map: {1:3, 2:2, 3:1}\n\n  Min-heap of size k:\n  Push (3,1) \u2192 Heap: [(3,1)]\n  Push (2,2) \u2192 Heap: [(2,2), (3,1)]\n  Push (1,3) \u2192 size > k \u2192 pop min (1,3) \u2192 Heap: [(2,2), (3,1)]\n\n  Top k frequent: [1, 2]\n\n```\ntop-k-freq (min-heap by frequency):\n  nums = [1,1,1,2,2,3], k = 2\n  freq map: {1:3, 2:2, 3:1}\n\n  Push (3,1) \u2192 Heap: [(3,1)]\n  Push (2,2) \u2192 Heap: [(2,2), (3,1)]\n  Push (1,3) \u2192 Heap: [(1,3), (3,1), (2,2)]\n           size > k \u2192 pop min (1,3) \u2192 Heap: [(2,2), (3,1)]\n\n  Heap contains frequencies 2 and 3: elements [2, 1]\n  Result: [1, 2]\n```\n\nThe algorithm first builds a frequency map by iterating through the array and counting each element. Then it iterates over each frequency map entry, pushing a pair (frequency, element) onto a min-heap. The min-heap orders entries by frequency, keeping the smallest frequency at the root. If the heap size exceeds k, we pop the entry with the smallest frequency, discarding it since it cannot be among the top k. After processing all entries, the heap contains exactly the k most frequent elements. Time complexity is O(n log k) for n elements since each heap operation costs O(log k), and space is O(n) for the frequency map.",
    complexity: {"time":"O(n log k)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "unordered_map<int,int> mp; for(int x:arr)mp[x]++; priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>> pq; for(auto& p:mp){pq.push({p.second,p.first});if(pq.size()>k)pq.pop();} while(!pq.empty()){cout<<pq.top().second<<\" \";pq.pop();}",
    techniques: ["heaps", "hash-map"],
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
    approach: "This problem asks us to maintain the median of a running stream of numbers, outputting the median after each new insertion. The median of a sorted list is the middle element for odd length or the average of the two middle elements for even length. A brute-force approach stores all numbers in a list and sorts after each insertion, costing O(n\u00b2 log n) total for n elements, which is impractical for streaming data. Two heaps provide an elegant O(log n) per insertion solution using only standard heap operations.\n\nDiagram:\n  stream = [1, 2, 3, 4, 5, 6]\n  maxH = left half (max-heap), minH = right half (min-heap)\n\n  Step 1: add 1 \u2192 maxH=[1], minH=[]          \u2192 median = 1\n  Step 2: add 2 \u2192 maxH=[1], minH=[2]         \u2192 median = (1+2)/2 = 1.5\n  Step 3: add 3 \u2192 maxH=[2,1], minH=[3]       \u2192 median = 2\n  Step 4: add 4 \u2192 maxH=[2,1], minH=[3,4]     \u2192 median = (2+3)/2 = 2.5\n  Step 5: add 5 \u2192 maxH=[3,2,1], minH=[4,5]   \u2192 median = 3\n  Step 6: add 6 \u2192 maxH=[3,2,1], minH=[4,5,6] \u2192 median = (3+4)/2 = 3.5\n\n```\nfind-median-stream (two heaps):\n  stream = [1, 2, 3, 4, 5, 6]\n  maxH = left half (max-heap), minH = right half (min-heap)\n\n  1 \u2192 maxH=[1]          minH=[]    balance OK  \u2192 median = 1\n  2 \u2192 maxH=[1]          minH=[2]   balance OK  \u2192 median = (1+2)/2 = 1.5\n  3 \u2192 maxH=[1]          minH=[2,3] rebalance   \u2192 maxH=[2,1]  minH=[3]   \u2192 median = 2\n  4 \u2192 maxH=[2,1]        minH=[3,4] balance OK  \u2192 median = (2+3)/2 = 2.5\n  5 \u2192 maxH=[2,1]        minH=[3,4,5] rebalance \u2192 maxH=[3,2,1] minH=[4,5] \u2192 median = 3\n  6 \u2192 maxH=[3,2,1]      minH=[4,5,6] balance OK \u2192 median = (3+4)/2 = 3.5\n```\n\nThe algorithm uses a max-heap to store the smaller half of the numbers and a min-heap to store the larger half. The max-heap root is the largest element in the left half, and the min-heap root is the smallest element in the right half. For each new number, if the max-heap is empty or the number is at most the max-heap root, we insert into the max-heap; otherwise we insert into the min-heap. We then rebalance: if max-heap has more than one extra element than min-heap, move its root to min-heap; if min-heap has more elements than max-heap, move its root to max-heap. After balancing, if max-heap has more elements (odd total), the median is the max-heap root; otherwise it is the average of both roots. Each insertion costs O(log n) with O(n) total space.",
    complexity: {"time":"O(log n) each","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<int> maxh; priority_queue<int,vector<int>,greater<int>> minh; for(int x:arr){if(maxh.empty()||x<=maxh.top())maxh.push(x);else minh.push(x); if(maxh.size()>minh.size()+1){minh.push(maxh.top());maxh.pop();}else if(minh.size()>maxh.size()){maxh.push(minh.top());minh.pop();}cout<<maxh.top()<<\" \";}",
    techniques: ["heaps"],
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
    approach: "This problem asks us to find the k points in a 2D plane that are closest to the origin (0,0). Given an array of points where each point is represented by coordinates (x, y), we need to return the k points with the smallest Euclidean distance from the origin. The Euclidean distance is sqrt(x\u00b2 + y\u00b2), but since we only compare distances relatively, we can use the squared distance (x\u00b2 + y\u00b2) to avoid expensive square root computations and floating-point errors. A naive approach computes all squared distances, sorts the points by distance with O(n log n) complexity, and takes the first k points. A max-heap of size k provides a more efficient O(n log k) solution.\n\nDiagram:\n  points = [(1,3), (-2,2), (5,8)], k = 2\n  squared distances: 1+9=10, 4+4=8, 25+64=89\n\n  Max-heap of size k:\n  Push (10, (1,3))   \u2192 Heap: [(10, (1,3))]\n  Push (8, (-2,2))   \u2192 Heap: [(10, (1,3)), (8, (-2,2))]\n  Push (89, (5,8))   \u2192 size > k \u2192 pop max (89,(5,8)) \u2192 Heap: [(10,(1,3)), (8,(-2,2))]\n\n  K closest: (-2,2) dist 8, (1,3) dist 10\n\n```\nk-closest (max-heap by distance):\n  points = [(1,3), (-2,2), (5,8)], k = 2\n  squared distances: 1+9=10, 4+4=8, 25+64=89\n\n  Push (10, (1,3))    \u2192 Heap: [(10, (1,3))]\n  Push (8, (-2,2))    \u2192 Heap: [(10, (1,3)), (8, (-2,2))]\n  Push (89, (5,8))    \u2192 Heap: [(89,(5,8)), (8,(-2,2)), (10,(1,3))]\n                       size > k \u2192 pop max (89,(5,8)) \u2192 Heap: [(10,(1,3)), (8,(-2,2))]\n\n  Remaining: (-2,2) dist 8, (1,3) dist 10 \u2192 closest 2 points\n```\n\nThe algorithm iterates through each point, computes its squared distance, and pushes a pair (squaredDistance, point) into a max-heap. The max-heap keeps the farthest point among the k candidates at the root. If the heap size exceeds k, we pop the farthest point, ensuring the heap always contains the k closest points seen so far. After processing all points, the heap holds exactly the k closest points to the origin. Time complexity is O(n log k) and space is O(k).",
    complexity: {"time":"O(n log k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<pair<long long,pair<int,int>>> pq; for(auto& p:pts){long long d=1LL*p.first*p.first+1LL*p.second*p.second;pq.push({d,p});if(pq.size()>k)pq.pop();} vector<pair<int,int>> ans; while(!pq.empty()){ans.push_back(pq.top().second);pq.pop();} for(auto& p:ans)cout<<p.first<<\" \"<<p.second<<endl;",
    techniques: ["heaps", "sorting"],
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
    approach: "This problem asks to find the minimum time needed to schedule a list of tasks where identical tasks must be separated by a cooling period. Each task is represented by a letter A-Z, and each unit of time can execute one task or remain idle. If we execute task A at time t, the next execution of task A cannot occur until at least time t + n + 1, where n is the cooling interval. A brute-force approach would simulate all possible schedules, which is exponential in the number of tasks. The greedy insight is that the most frequent task dictates the lower bound on total time, and a max-heap of frequencies provides the optimal scheduling by always picking the most frequent available tasks.\n\nDiagram:\n  tasks = [A,A,A,B,B,B], n = 2\n  freq: A=3, B=3\n\n  Max-heap: [3, 3]\n\n  Cycle 1: pop A, B \u2192 dec to 2,2 \u2192 Heap: [2, 2]        time += 3\n  Cycle 2: pop A, B \u2192 dec to 1,1 \u2192 Heap: [1, 1]        time += 3\n  Cycle 3: pop A, B \u2192 dec to 0,0 \u2192 Heap: empty        time += 2\n\n  Total = 8\n  Schedule: A \u2192 B \u2192 idle \u2192 A \u2192 B \u2192 idle \u2192 A \u2192 B\n\n```\ntask-scheduler (max-heap by frequency):\n  tasks = [A,A,A,B,B,B], n = 2\n\n  freq: A=3, B=3\n  Max-heap: [3, 3]\n\n  Cycle 1: pop A(3), B(3) \u2192 dec to 2,2 \u2192 push back \u2192 Heap: [2, 2]        time += 3\n  Cycle 2: pop A(2), B(2) \u2192 dec to 1,1 \u2192 push back \u2192 Heap: [1, 1]        time += 3\n  Cycle 3: pop A(1), B(1) \u2192 dec to 0,0 \u2192 no push   \u2192 Heap: empty       time += 2\n\n  Total = 8\n  Schedule: A \u2192 B \u2192 idle \u2192 A \u2192 B \u2192 idle \u2192 A \u2192 B\n```\n\nThe algorithm first counts the frequency of each task using a fixed array of size 26. It pushes all non-zero frequencies onto a max-heap. Then it processes time in cycles of n+1 slots. In each cycle, it pops up to n+1 tasks from the heap (the most frequent remaining tasks), decrements each count, and pushes back those that still have remaining instances. The time added is n+1 if any tasks remain after this cycle, or the actual number of tasks processed if the heap becomes empty and no idle slots are needed. Time complexity is O(n) for counting plus O(26 log 26) for heap operations, which is effectively O(n), and space is O(26) for the frequency array.",
    complexity: {"time":"O(n)","space":"O(26)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<int> pq; for(int f:freq)if(f>0)pq.push(f); int time=0; while(!pq.empty()){vector<int> tmp; for(int i=0;i<=cool&&!pq.empty();i++){tmp.push_back(pq.top());pq.pop();} for(int f:tmp)if(--f>0)pq.push(f); time+=tmp.size()<=cool?cool+1:(int)tmp.size();} cout<<time;",
    techniques: ["heaps", "greedy"],
  },
  {
    id: "kth-smallest",
    title: "Kth Smallest Element",
    category: "heaps",
    difficulty: "medium",
    description: "Find kth smallest element in an unsorted array.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"6 3\n7 10 4 3 20 15","output":"7"}
    ],
    test_cases: [
      {"input":"6 3\n7 10 4 3 20 15","expected":"7"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n >> k;\n  vector<int> arr(n);\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  priority_queue<int> pq;\n  for (int x : arr) {\n    pq.push(x);\n    if ((int)pq.size() > k) pq.pop();\n  }\n  cout << pq.top() << endl;\n  return 0;\n}",
    approach: "This problem asks us to find the kth smallest element in an unsorted array. Given an array arr and an integer k, we need to identify the element that would be at position k if the array were sorted in ascending order. A naive solution sorts the entire array in O(n log n) and returns the element at index k-1. Sorting is wasteful when we only need position k. A max-heap of size k provides an optimal O(n log k) solution by maintaining the k smallest elements seen so far. We iterate through the array, pushing each element onto a max-heap. Since it is a max-heap, the root is the largest among the k smallest candidates. When the heap size exceeds k, we pop the root, which is the largest and therefore not among the k smallest. After processing all elements, the root of the max-heap is exactly the kth smallest element.\n\nDiagram:\n  arr = [7, 10, 4, 3, 20, 15], k = 3\n\n  Max-heap of size k:\n  Push 7  \u2192 Heap: [7]\n  Push 10 \u2192 Heap: [10, 7]\n  Push 4  \u2192 Heap: [10, 7, 4]\n  Push 3  \u2192 size > k \u2192 pop max 10 \u2192 [7, 4, 3]\n  Push 20 \u2192 size > k \u2192 pop max 20 \u2192 [7, 4, 3]\n  Push 15 \u2192 size > k \u2192 pop max 15 \u2192 [7, 4, 3]\n\n  kth smallest = heap.top() = 7\n\n```\nkth-smallest (max-heap of size k):\n  arr = [7, 10, 4, 3, 20, 15], k = 3\n\n  Push 7  \u2192 Heap: [7]\n  Push 10 \u2192 Heap: [10, 7]\n  Push 4  \u2192 Heap: [10, 7, 4]\n  Push 3  \u2192 size > k \u2192 pop max \u2192 pop 10 \u2192 [7, 4, 3]\n  Push 20 \u2192 size > k \u2192 pop max \u2192 pop 20 \u2192 [7, 4, 3]\n  Push 15 \u2192 size > k \u2192 pop max \u2192 pop 15 \u2192 [7, 4, 3]\n\n  Top = 7 (3rd smallest)\n```\n\nTime complexity is O(n log k) for n elements processed, and space is O(k) for the heap.",
    complexity: {"time":"O(n log k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<int> pq; for(int x:arr){pq.push(x);if(pq.size()>k)pq.pop();} cout<<pq.top();",
    techniques: ["heaps"],
  },
  {
    id: "connect-ropes",
    title: "Connect Ropes with Minimum Cost",
    category: "heaps",
    difficulty: "easy",
    description: "Connect ropes end-to-end with minimum cost using min-heap.",
    constraints: "1 <= n <= 10^5, 1 <= len <= 10^4",
    examples: [
      {"input":"4\n4 3 2 6","output":"29"}
    ],
    test_cases: [
      {"input":"4\n4 3 2 6","expected":"29"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  priority_queue<int, vector<int>, greater<>> pq;\n  for (int i = 0; i < n; i++) { int x; cin >> x; pq.push(x); }\n\n  long long cost = 0;\n  while (pq.size() > 1) {\n    int a = pq.top(); pq.pop();\n    int b = pq.top(); pq.pop();\n    int sum = a + b;\n    cost += sum;\n    pq.push(sum);\n  }\n  cout << cost << endl;\n  return 0;\n}",
    approach: "This problem asks us to connect n ropes into a single rope with minimum total cost. We are given rope lengths, and the cost to connect two ropes is the sum of their lengths. The goal is to find the minimum cost to connect all ropes end-to-end, where the order of connections can be chosen freely. A greedy strategy works optimally: always connect the two shortest ropes first. This is exactly what Huffman coding does. A min-heap efficiently selects the two smallest ropes at each step. The algorithm pushes all rope lengths into a min-heap. While more than one rope remains, we pop the two smallest, connect them at cost equal to their sum, and push the resulting rope back into the heap. This ensures the shortest ropes are always combined first, minimizing the cost contribution of longer ropes.\n\nDiagram:\n  ropes = [4, 3, 2, 6]\n\n  Min-heap:\n  Initial: [2, 3, 4, 6]\n\n  Pop 2, 3 \u2192 sum=5 \u2192 push 5 \u2192 Heap: [4, 5, 6]   cost=5\n  Pop 4, 5 \u2192 sum=9 \u2192 push 9 \u2192 Heap: [6, 9]     cost=14\n  Pop 6, 9 \u2192 sum=15 \u2192 push 15 \u2192 Heap: [15]     cost=29\n\n  Total cost = 29\n\n```\nconnect-ropes (min-heap):\n  ropes = [4, 3, 2, 6]\n\n  Initial heap: [2, 3, 4, 6]\n\n  Pop 2, 3 \u2192 sum=5 \u2192 push 5 \u2192 Heap: [4, 5, 6]   cost=5\n  Pop 4, 5 \u2192 sum=9 \u2192 push 9 \u2192 Heap: [6, 9]     cost=14\n  Pop 6, 9 \u2192 sum=15 \u2192 push 15 \u2192 Heap: [15]     cost=29\n\n  Total cost = 29\n```\n\nTime complexity is O(n log n) for building the heap and performing n-1 merges, and space is O(n) for the heap.",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "GeeksforGeeks",
    solution_code: "priority_queue<int,vector<int>,greater<int>> pq; for(int x:ropes)pq.push(x); long long cost=0; while(pq.size()>1){int a=pq.top();pq.pop();int b=pq.top();pq.pop();cost+=a+b;pq.push(a+b);} cout<<cost;",
    techniques: ["heaps", "greedy"],
  },
  {
    id: "k-frequent-words",
    title: "Top K Frequent Words",
    category: "heaps",
    difficulty: "medium",
    description: "Return k most frequent words sorted by frequency then lexicographically.",
    constraints: "1 <= n <= 10^4, 1 <= k <= n",
    examples: [
      {"input":"6 2\ni love opencode i love coding","output":"i love"}
    ],
    test_cases: [
      {"input":"6 2\ni love opencode i love coding","expected":"i love"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\n#include <unordered_map>\n#include <string>\nusing namespace std;\n\nstruct Compare {\n  bool operator()(const pair<int,string>& a, const pair<int,string>& b) {\n    if (a.first != b.first) return a.first > b.first;\n    return a.second < b.second;\n  }\n};\n\nint main() {\n  int n, k; cin >> n >> k;\n  unordered_map<string,int> freq;\n  for (int i = 0; i < n; i++) { string s; cin >> s; freq[s]++; }\n\n  priority_queue<pair<int,string>, vector<pair<int,string>>, Compare> pq;\n  for (auto& p : freq) {\n    pq.push({p.second, p.first});\n    if ((int)pq.size() > k) pq.pop();\n  }\n\n  vector<string> ans;\n  while (!pq.empty()) { ans.push_back(pq.top().second); pq.pop(); }\n  for (int i = ans.size()-1; i >= 0; i--) cout << ans[i] << endl;\n  return 0;\n}",
    approach: "This problem asks us to return the k most frequent words from a given list, where the results are sorted by frequency in descending order, and words with the same frequency are sorted lexicographically in ascending order. A brute-force approach counts frequencies and then sorts all unique words by frequency, costing O(m log m) where m is the number of unique words. A min-heap of size k with a custom comparator efficiently maintains the top k candidates. The custom comparator ensures that when frequency differs, lower frequency is at the root (so least frequent gets popped), and when frequency is the same, lexicographically larger word is at the root (so smaller lexicographic word stays).\n\nDiagram:\n  words = [\"i\",\"love\",\"opencode\",\"i\",\"love\",\"coding\"], k = 2\n  freq: {i:2, love:2, opencode:1, coding:1}\n\n  Min-heap (by frequency asc, lexicographically desc):\n  Push (2,\"i\")        \u2192 Heap: [(2,i)]\n  Push (2,\"love\")     \u2192 Heap: [(2,love), (2,i)]\n  Push (1,\"opencode\") \u2192 size > k \u2192 pop (1,opencode) \u2192 [(2,love), (2,i)]\n  Push (1,\"coding\")   \u2192 size > k \u2192 pop (1,coding) \u2192 [(2,love), (2,i)]\n\n  Result reversed: [\"i\", \"love\"]\n\n```\nk-frequent-words (min-heap with custom comparator):\n  words = [\"i\",\"love\",\"opencode\",\"i\",\"love\",\"coding\"], k = 2\n  freq: {i:2, love:2, opencode:1, coding:1}\n\n  Push (2,\"i\")         \u2192 Heap: [(2,i)]\n  Push (2,\"love\")      \u2192 Heap: [(2,love), (2,i)]\n  Push (1,\"opencode\")  \u2192 Heap: [(1,opencode),(2,love),(2,i)]\n                         size > k \u2192 pop min (1,opencode) \u2192 [(2,love), (2,i)]\n  Push (1,\"coding\")    \u2192 Heap: [(1,coding),(2,love),(2,i)]\n                         size > k \u2192 pop min (1,coding) \u2192 [(2,love), (2,i)]\n\n  Result reversed: [\"i\", \"love\"]\n```\n\nTime complexity is O(n log k) and space is O(n) for the frequency map and O(k) for the heap.",
    complexity: {"time":"O(n log k)","space":"O(n)"},
    sheet: "LeetCode",
    solution_code: "unordered_map<string,int> mp; for(auto& s:words)mp[s]++; auto cmp=[](auto& a,auto& b){return a.first>b.first||(a.first==b.first&&a.second<b.second);}; priority_queue<pair<int,string>,vector<pair<int,string>>,decltype(cmp)> pq(cmp); for(auto& p:mp){pq.push({p.second,p.first});if(pq.size()>k)pq.pop();} vector<string> ans; while(!pq.empty()){ans.push_back(pq.top().second);pq.pop();} reverse(ans.begin(),ans.end());",
    techniques: ["heaps", "hash-map", "sorting"],
  },
  {
    id: "kth-smallest-sorted-matrix",
    title: "Kth Smallest Element in a Sorted Matrix",
    category: "heaps",
    difficulty: "medium",
    description: "Find kth smallest element in a row-wise and column-wise sorted matrix.",
    constraints: "1 <= n <= 300, 1 <= k <= n*n",
    examples: [
      {"input":"3 8\n1 5 9\n10 11 13\n12 13 15","output":"13"}
    ],
    test_cases: [
      {"input":"3 8\n1 5 9\n10 11 13\n12 13 15","expected":"13"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nstruct Element {\n  int val, row, col;\n  bool operator>(const Element& other) const { return val > other.val; }\n};\n\nint main() {\n  int n, k; cin >> n >> k;\n  vector<vector<int>> mat(n, vector<int>(n));\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++)\n      cin >> mat[i][j];\n\n  priority_queue<Element, vector<Element>, greater<>> pq;\n  for (int i = 0; i < n; i++) pq.push({mat[i][0], i, 0});\n\n  Element e;\n  for (int i = 0; i < k; i++) {\n    e = pq.top(); pq.pop();\n    if (e.col + 1 < n) pq.push({mat[e.row][e.col+1], e.row, e.col+1});\n  }\n  cout << e.val << endl;\n  return 0;\n}",
    approach: "This problem asks us to find the kth smallest element in a matrix where each row is sorted in ascending order and each column is also sorted in ascending order. The naive approach flattens the matrix and sorts, costing O(n\u00b2 log n). A min-heap approach exploits the sorted property by performing a k-way merge of the n rows. We push the first element of each row into a min-heap. Then we pop the minimum element k times. Each time we pop, we push the next element from the same row if one exists. The kth popped element is our answer.\n\nDiagram:\n  matrix = [[1, 5, 9],\n            [10,11,13],\n            [12,13,15]]\n  k = 8\n\n  Min-heap:\n  Initial: [(1,0,0), (10,1,0), (12,2,0)]\n\n  Pop 1  \u2192 push (5,0,1)  \u2192 Heap: [(5,0,1), (10,1,0), (12,2,0)]\n  Pop 5  \u2192 push (9,0,2)  \u2192 Heap: [(9,0,2), (10,1,0), (12,2,0)]\n  Pop 9  \u2192 row 0 done    \u2192 Heap: [(10,1,0), (12,2,0)]\n  Pop 10 \u2192 push (11,1,1) \u2192 Heap: [(11,1,1), (12,2,0)]\n  Pop 11 \u2192 push (13,1,2) \u2192 Heap: [(12,2,0), (13,1,2)]\n  Pop 12 \u2192 push (13,2,1) \u2192 Heap: [(13,1,2), (13,2,1)]\n  Pop 13 \u2192 8th element! Answer = 13\n\n```\nkth-smallest-sorted-matrix (min-heap):\n  matrix = [[1, 5, 9],\n            [10,11,13],\n            [12,13,15]]\n  k = 8\n\n  Initial heap: [(1,0,0), (10,1,0), (12,2,0)]\n\n  Pop 1  \u2192 push (5,0,1)  \u2192 Heap: [(5,0,1), (10,1,0), (12,2,0)]\n  Pop 5  \u2192 push (9,0,2)  \u2192 Heap: [(9,0,2), (10,1,0), (12,2,0)]\n  Pop 9  \u2192 row 0 done    \u2192 Heap: [(10,1,0), (12,2,0)]\n  Pop 10 \u2192 push (11,1,1) \u2192 Heap: [(11,1,1), (12,2,0)]\n  Pop 11 \u2192 push (13,1,2) \u2192 Heap: [(12,2,0), (13,1,2)]\n  Pop 12 \u2192 push (13,2,1) \u2192 Heap: [(13,1,2), (13,2,1)]\n  Pop 13 \u2192 push (15,2,2) \u2192 Heap: [(13,2,1), (15,2,2)]\n  Pop 13 \u2192 8th element!\n\n  Answer = 13\n```\n\nTime complexity is O(k log n) for k extractions with n rows, and space is O(n) for the heap.",
    complexity: {"time":"O(k log n)","space":"O(n)"},
    sheet: "LeetCode",
    solution_code: "priority_queue<tuple<int,int,int>,vector<tuple<int,int,int>>,greater<>> pq; for(int i=0;i<n;i++)pq.push({matrix[i][0],i,0}); tuple<int,int,int> e; for(int i=0;i<k;i++){e=pq.top();pq.pop();if(get<2>(e)+1<n)pq.push({matrix[get<1>(e)][get<2>(e)+1],get<1>(e),get<2>(e)+1});} cout<<get<0>(e);",
    techniques: ["heaps", "binary-search"],
  },
  {
    id: "k-pairs-smallest-sums",
    title: "Find K Pairs with Smallest Sums",
    category: "heaps",
    difficulty: "medium",
    description: "Find k pairs with smallest sums from two sorted arrays using min-heap.",
    constraints: "1 <= n,m <= 10^4, 1 <= k <= n*m",
    examples: [
      {"input":"3 3 3\n1 7 11\n2 4 6","output":"1 2\n1 4\n1 6"}
    ],
    test_cases: [
      {"input":"3 3 3\n1 7 11\n2 4 6","expected":"1 2\n1 4\n1 6"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m, k; cin >> n >> m >> k;\n  vector<int> nums1(n), nums2(m);\n  for (int i = 0; i < n; i++) cin >> nums1[i];\n  for (int i = 0; i < m; i++) cin >> nums2[i];\n\n  auto cmp = [&](const pair<int,int>& a, const pair<int,int>& b) {\n    return nums1[a.first] + nums2[a.second] > nums1[b.first] + nums2[b.second];\n  };\n  priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);\n\n  for (int i = 0; i < n && i < k; i++) pq.push({i, 0});\n\n  vector<pair<int,int>> ans;\n  while (k-- > 0 && !pq.empty()) {\n    auto [i, j] = pq.top(); pq.pop();\n    ans.push_back({nums1[i], nums2[j]});\n    if (j + 1 < m) pq.push({i, j + 1});\n  }\n\n  for (auto& p : ans) cout << p.first << \" \" << p.second << endl;\n  return 0;\n}",
    approach: "This problem asks us to find the k pairs (nums1[i], nums2[j]) with the smallest sums from two sorted arrays. Each pair consists of one element from each array. A naive approach generates all n*m pairs, computes their sums, and selects the k smallest, costing O(n*m log k) or O(n*m log(n*m)). Since both arrays are sorted, we can use a min-heap to lazily generate only the k smallest pairs. The key insight is that if array nums1 is sorted, then for each i, the smallest sum with nums1[i] is nums1[i] + nums2[0], and as we consume pairs, the next best pair for the same i is nums1[i] + nums2[j+1]. We initialize the heap with (i,0) for the first k indices of nums1 (or all if fewer than k). We pop the minimum sum pair, record it, and push the next candidate from the same row (i, j+1) if available.\n\nDiagram:\n  nums1 = [1, 7, 11], nums2 = [2, 4, 6], k = 3\n\n  Min-heap of sums:\n  Initial: [(0,0):1+2=3, (1,0):7+2=9, (2,0):11+2=13]\n\n  Pop (0,0): sum=3 \u2192 ans=[(1,2)] \u2192 push (0,1): 1+4=5\n  Heap: [(0,1):5, (1,0):9, (2,0):13]\n\n  Pop (0,1): sum=5 \u2192 ans=[(1,2),(1,4)] \u2192 push (0,2): 1+6=7\n  Heap: [(0,2):7, (1,0):9, (2,0):13]\n\n  Pop (0,2): sum=7 \u2192 ans=[(1,2),(1,4),(1,6)]\n\n  Result: (1,2), (1,4), (1,6)\n\n```\nk-pairs-smallest-sums (min-heap):\n  nums1 = [1, 7, 11], nums2 = [2, 4, 6], k = 3\n\n  Initial heap (i,0): [(0,0):1+2=3, (1,0):7+2=9, (2,0):11+2=13]\n\n  Pop (0,0): sum=3 \u2192 ans=[(1,2)] \u2192 push (0,1): 1+4=5\n  Heap: [(0,1):5, (1,0):9, (2,0):13]\n\n  Pop (0,1): sum=5 \u2192 ans=[(1,2),(1,4)] \u2192 push (0,2): 1+6=7\n  Heap: [(0,2):7, (1,0):9, (2,0):13]\n\n  Pop (0,2): sum=7 \u2192 ans=[(1,2),(1,4),(1,6)]\n\n  Result: (1,2), (1,4), (1,6)\n```\n\nTime complexity is O(k log min(n,k)) and space is O(min(n,k)) for the heap.",
    complexity: {"time":"O(k log k)","space":"O(k)"},
    sheet: "LeetCode",
    solution_code: "auto cmp=[&](auto& a,auto& b){return nums1[a.first]+nums2[a.second]>nums1[b.first]+nums2[b.second];}; priority_queue<pair<int,int>,vector<pair<int,int>>,decltype(cmp)> pq(cmp); for(int i=0;i<n&&i<k;i++)pq.push({i,0}); vector<pair<int,int>> ans; while(k--&&!pq.empty()){auto [i,j]=pq.top();pq.pop();ans.push_back({nums1[i],nums2[j]});if(j+1<m)pq.push({i,j+1});}",
    techniques: ["heaps"],
  },
  {
    id: "reorganize-string",
    title: "Reorganize String",
    category: "heaps",
    difficulty: "medium",
    description: "Rearrange string so no two adjacent characters are same.",
    constraints: "1 <= s.length <= 500",
    examples: [
      {"input":"aab","output":"aba"}
    ],
    test_cases: [
      {"input":"aab","expected":"aba"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  int freq[26] = {0};\n  for (char c : s) freq[c-'a']++;\n\n  priority_queue<pair<int,char>> pq;\n  for (int i = 0; i < 26; i++)\n    if (freq[i] > 0) pq.push({freq[i], 'a'+i});\n\n  string ans = \"\";\n  while (!pq.empty()) {\n    auto [cnt, ch] = pq.top(); pq.pop();\n    if (ans.empty() || ans.back() != ch) {\n      ans += ch;\n      if (--cnt > 0) pq.push({cnt, ch});\n    } else {\n      if (pq.empty()) { cout << \"\" << endl; return 0; }\n      auto [cnt2, ch2] = pq.top(); pq.pop();\n      ans += ch2;\n      if (--cnt2 > 0) pq.push({cnt2, ch2});\n      pq.push({cnt, ch});\n    }\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: "This problem asks us to rearrange a string so that no two adjacent characters are the same. If such a rearrangement is impossible, return an empty string. The core constraint is that the most frequent character must not exceed ceil(n/2) occurrences, otherwise rearrangement is impossible. A greedy max-heap approach always picks the character with the highest remaining frequency that is different from the last placed character. We count character frequencies, push all non-zero entries onto a max-heap prioritized by frequency. At each step, we pop the most frequent character. If it differs from the last character appended, we append it, decrement its count, and push it back if still positive. If it matches the last character, we take the next most frequent, append that, and push both back (the first one unchanged). This ensures we always use the most frequent available character that avoids adjacency.\n\nDiagram:\n  s = \"aab\"\n  freq: a=2, b=1\n\n  Max-heap by frequency:\n  Pop (2,a): last='' \u2192 ok \u2192 ans=\"a\" \u2192 dec to 1 \u2192 push (1,a)\n  Pop (1,a): last='a' \u2192 match! \u2192 pop next (1,b) \u2192 ans=\"ab\" \u2192 dec b to 0 \u2192 push back a\n  Pop (1,a): last='b' \u2192 ok \u2192 ans=\"aba\" \u2192 dec to 0\n\n  Result: \"aba\"\n\n```\nreorganize-string (max-heap by frequency):\n  s = \"aab\"\n\n  freq: a=2, b=1\n  Heap: [(2,a), (1,b)]\n\n  Pop (2,a): last='' \u2192 ok \u2192 ans=\"a\" \u2192 dec to 1 \u2192 push (1,a)\n  Heap: [(1,a), (1,b)]\n\n  Pop (1,a): last='a' \u2192 match! \u2192 peek next (1,b) \u2192 ans=\"ab\" \u2192 dec b to 0 \u2192 push back a\n  Heap: [(1,a)]\n\n  Pop (1,a): last='b' \u2192 ok \u2192 ans=\"aba\" \u2192 dec to 0\n  Heap: empty\n\n  Result: \"aba\"\n```\n\nTime complexity is O(n log 26) = O(n) and space is O(26) for the frequency array plus O(n) for the output string.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "LeetCode",
    solution_code: "priority_queue<pair<int,char>> pq; for(int i=0;i<26;i++)if(freq[i])pq.push({freq[i],'a'+i}); string ans; while(!pq.empty()){auto [c,ch]=pq.top();pq.pop();if(ans.empty()||ans.back()!=ch){ans+=ch;if(--c>0)pq.push({c,ch});} else{if(pq.empty())return \"\"; auto [c2,ch2]=pq.top();pq.pop();ans+=ch2;if(--c2>0)pq.push({c2,ch2});pq.push({c,ch});}} return ans;",
    techniques: ["heaps", "greedy"],
  },
  {
    id: "rearrange-k-distance",
    title: "Rearrange String K Distance Apart",
    category: "heaps",
    difficulty: "hard",
    description: "Rearrange string so same characters are at least k distance apart.",
    constraints: "1 <= s.length <= 10^4, 1 <= k <= 100",
    examples: [
      {"input":"3\naabbcc","output":"abcabc"}
    ],
    test_cases: [
      {"input":"3\naabbcc","expected":"abcabc"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  int k; cin >> k;\n  string s; cin >> s;\n  int freq[26] = {0};\n  for (char c : s) freq[c-'a']++;\n\n  priority_queue<pair<int,char>> pq;\n  for (int i = 0; i < 26; i++)\n    if (freq[i] > 0) pq.push({freq[i], 'a'+i});\n\n  string ans = \"\";\n  while (!pq.empty()) {\n    vector<pair<int,char>> temp;\n    int cnt = min(k, (int)pq.size());\n    for (int i = 0; i < cnt; i++) {\n      auto [c, ch] = pq.top(); pq.pop();\n      ans += ch;\n      if (--c > 0) temp.push_back({c, ch});\n    }\n    if (cnt < k && !temp.empty()) { cout << \"\" << endl; return 0; }\n    for (auto& p : temp) pq.push(p);\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: "This problem asks to rearrange a string so that the same characters are at least k distance apart, meaning between any two identical characters there must be at least k-1 other characters. This generalizes the reorganize-string problem (k=2). The greedy approach uses a max-heap to always pick the most frequent available character, processing in rounds of k. In each round, we pop up to k distinct characters from the heap (the most frequent ones), append them to the result, decrement their counts, and collect them. After the round, we push back the ones with remaining count. If a round completes with fewer than k characters and there are still characters left, the task is impossible because some characters would be forced to repeat within distance k.\n\nDiagram:\n  s = \"aabbcc\", k = 3\n  freq: a=2, b=2, c=2\n\n  Max-heap: [(2,a), (2,b), (2,c)]\n\n  Round 1: pop a, b, c \u2192 ans=\"abc\" \u2192 dec to 1,1,1 \u2192 push back\n  Round 2: pop a, b, c \u2192 ans=\"abcabc\" \u2192 dec to 0,0,0\n\n  Result: \"abcabc\"\n\n```\nrearrange-k-distance (max-heap, rounds of k):\n  s = \"aabbcc\", k = 3\n\n  freq: a=2, b=2, c=2\n  Heap: [(2,a), (2,b), (2,c)]\n\n  Round 1: pop a(2), b(2), c(2) \u2192 ans=\"abc\" \u2192 dec to 1,1,1 \u2192 push back\n  Heap: [(1,a), (1,b), (1,c)]\n\n  Round 2: pop a(1), b(1), c(1) \u2192 ans=\"abcabc\" \u2192 dec to 0,0,0\n  Heap: empty\n\n  Result: \"abcabc\"\n```\n\nTime complexity is O(n log 26) = O(n) and space is O(26) for the frequency array plus O(n) for output.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "LeetCode",
    solution_code: "priority_queue<pair<int,char>> pq; for(int i=0;i<26;i++)if(freq[i])pq.push({freq[i],'a'+i}); string ans; while(!pq.empty()){vector<pair<int,char>> tmp; int lim=min(k,(int)pq.size()); for(int i=0;i<lim;i++){auto [c,ch]=pq.top();pq.pop();ans+=ch;if(--c>0)tmp.push_back({c,ch});} if(lim<k&&!tmp.empty())return \"\"; for(auto& p:tmp)pq.push(p);} return ans;",
    techniques: ["heaps", "greedy"],
  },
  {
    id: "least-interval",
    title: "Least Interval (Task Scheduler II)",
    category: "heaps",
    difficulty: "medium",
    description: "Find minimum intervals to complete tasks with cooling period.",
    constraints: "1 <= n <= 10^5, 1 <= cool <= 10^5",
    examples: [
      {"input":"5 2\nA A B C D","output":"5"}
    ],
    test_cases: [
      {"input":"5 2\nA A B C D","expected":"5"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  int n, cool; cin >> n >> cool;\n  char tasks[n];\n  for (int i = 0; i < n; i++) cin >> tasks[i];\n\n  unordered_map<char,int> freq;\n  for (char c : tasks) freq[c]++;\n\n  priority_queue<int> pq;\n  for (auto& p : freq) pq.push(p.second);\n\n  int time = 0;\n  while (!pq.empty()) {\n    vector<int> temp;\n    for (int i = 0; i <= cool; i++) {\n      if (!pq.empty()) {\n        temp.push_back(pq.top());\n        pq.pop();\n      }\n    }\n    for (int f : temp) if (--f > 0) pq.push(f);\n    time += (int)temp.size() <= cool ? cool + 1 : (int)temp.size();\n  }\n  cout << time << endl;\n  return 0;\n}",
    approach: "This problem asks to compute the minimum number of intervals needed to execute all tasks given a cooling period between identical tasks. Each interval can execute one task or be idle. Identical tasks must be separated by at least 'cool' intervals. This is a variant of the classic task scheduler problem. The optimal strategy is to always schedule the most frequent remaining task that is available. We use a max-heap of task frequencies. In each cooling cycle (cool+1 slots), we attempt to schedule the most frequent distinct tasks. If fewer tasks are available than cool+1, we insert idle slots.\n\nDiagram:\n  tasks = [A, A, B, C, D], cool = 2\n  freq: A=2, B=1, C=1, D=1\n\n  Max-heap: [2, 1, 1, 1]\n\n  Cycle 1: pop A(2), B(1), C(1) \u2192 dec to 1,0,0 \u2192 push A(1)\n  Cycle 2: pop D(1), A(1) \u2192 dec to 0,0 \u2192 heap empty\n\n  Total = 5\n  Schedule: A \u2192 B \u2192 C \u2192 D \u2192 A\n\n```\nleast-interval (max-heap by frequency):\n  tasks = [A, A, B, C, D], cool = 2\n  freq: A=2, B=1, C=1, D=1\n  Heap: [2, 1, 1, 1]\n\n  Cycle 1: pop A(2), B(1), C(1) \u2192 dec to 1,0,0 \u2192 push A(1)\n  Heap: [1, 1, 1]\n\n  Cycle 2: pop D(1), A(1) \u2192 dec to 0,0 \u2192 heap empty\n  Only 2 tasks in this cycle, no idle needed (heap empty)\n  time += 2\n\n  Total time = 3 + 2 = 5\n  Schedule: A \u2192 B \u2192 C \u2192 D \u2192 A\n```\n\nTime complexity is O(n log 26) = O(n) and space is O(26) for frequency counting.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "LeetCode",
    solution_code: "priority_queue<int> pq; for(auto& p:freq)pq.push(p.second); int time=0; while(!pq.empty()){vector<int> tmp; for(int i=0;i<=cool&&!pq.empty();i++){tmp.push_back(pq.top());pq.pop();} for(int f:tmp)if(--f>0)pq.push(f); time+=tmp.size()<=cool?cool+1:(int)tmp.size();} cout<<time;",
    techniques: ["heaps", "greedy"],
  },
  {
    id: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    category: "heaps",
    difficulty: "medium",
    description: "Find minimum number of meeting rooms required.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"3\n0 30\n5 10\n15 20","output":"2"}
    ],
    test_cases: [
      {"input":"3\n0 30\n5 10\n15 20","expected":"2"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<pair<int,int>> meetings(n);\n  for (int i = 0; i < n; i++) cin >> meetings[i].first >> meetings[i].second;\n\n  sort(meetings.begin(), meetings.end());\n\n  priority_queue<int, vector<int>, greater<>> pq;\n  pq.push(meetings[0].second);\n\n  for (int i = 1; i < n; i++) {\n    if (meetings[i].first >= pq.top()) pq.pop();\n    pq.push(meetings[i].second);\n  }\n  cout << pq.size() << endl;\n  return 0;\n}",
    approach: "This problem asks us to find the minimum number of conference rooms required to accommodate all given meetings. Each meeting has a start and end time. If two meetings overlap in time, they cannot use the same room. The optimal strategy sorts meetings by start time and uses a min-heap to track the end times of ongoing meetings. For each meeting in sorted order, we check if any room has become free (its end time <= current start time). If so, we free that room by popping from the heap. Then we allocate the current meeting to a room by pushing its end time. The size of the heap at any point represents the number of rooms currently in use, and the maximum size is the minimum rooms needed.\n\nDiagram:\n  meetings = [(0,30), (5,10), (15,20)]\n\n  Sorted by start: [(0,30), (5,10), (15,20)]\n\n  Min-heap of end times:\n  (0,30): heap empty \u2192 push 30 \u2192 Heap: [30]          rooms=1\n  (5,10): 30 > 5 \u2192 no free room \u2192 push 10 \u2192 Heap: [10,30]  rooms=2\n  (15,20): 10 <= 15 \u2192 room free! pop 10, push 20 \u2192 Heap: [20,30] rooms=2\n\n  Minimum rooms needed = 2\n\n```\nmeeting-rooms-ii (min-heap of end times):\n  meetings = [(0,30), (5,10), (15,20)]\n\n  Sorted by start: [(0,30), (5,10), (15,20)]\n\n  Process (0,30): heap empty \u2192 push 30 \u2192 Heap: [30]          rooms=1\n  Process (5,10): 30 > 5 (no free room) \u2192 push 10 \u2192 Heap: [10,30]  rooms=2\n  Process (15,20): 10 <= 15 (room free) \u2192 pop 10 \u2192 push 20 \u2192 Heap: [20,30] rooms=2\n\n  Minimum rooms needed = 2\n```\n\nTime complexity is O(n log n) for sorting and O(n log n) for heap operations, space is O(n) for the heap.",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "sort(meetings.begin(),meetings.end()); priority_queue<int,vector<int>,greater<int>> pq; pq.push(meetings[0].second); for(int i=1;i<n;i++){if(meetings[i].first>=pq.top())pq.pop(); pq.push(meetings[i].second);} cout<<pq.size();",
    techniques: ["heaps", "sorting", "two-pointers"],
  },
  {
    id: "sliding-window-median",
    title: "Sliding Window Median",
    category: "heaps",
    difficulty: "hard",
    description: "Find median of each sliding window of size k.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"6 3\n1 3 -1 -3 5 3 6 7","output":"1 -1 -1 3 5 6"}
    ],
    test_cases: [
      {"input":"6 3\n1 3 -1 -3 5 3 6 7","expected":"1 -1 -1 3 5 6"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n >> k;\n  vector<int> nums(n);\n  for (int i = 0; i < n; i++) cin >> nums[i];\n\n  priority_queue<int> maxH;\n  priority_queue<int, vector<int>, greater<>> minH;\n  unordered_map<int,int> delayed;\n\n  auto balance = [&]() {\n    if (maxH.size() > minH.size() + 1) { minH.push(maxH.top()); maxH.pop(); }\n    if (minH.size() > maxH.size()) { maxH.push(minH.top()); minH.pop(); }\n  };\n\n  auto clean = [&](auto& pq) {\n    while (!pq.empty() && delayed[pq.top()] > 0) { delayed[pq.top()]--; pq.pop(); }\n  };\n\n  for (int i = 0; i < n; i++) {\n    if (maxH.empty() || nums[i] <= maxH.top()) maxH.push(nums[i]);\n    else minH.push(nums[i]);\n    balance();\n\n    if (i >= k) {\n      int rem = nums[i - k];\n      delayed[rem]++;\n      if (rem <= maxH.top()) { clean(maxH); balance(); }\n      else { clean(minH); balance(); }\n    }\n\n    if (i >= k - 1) {\n      clean(maxH); clean(minH);\n      cout << (k % 2 ? maxH.top() : (maxH.top() + minH.top()) / 2.0) << \" \";\n    }\n  }\n  return 0;\n}",
    approach: "This problem asks us to find the median of each sliding window of size k as we move across an array. The median is the middle element of an odd-length window or the average of the two middle elements for even-length windows. This extends the find-median-from-data-stream problem to a sliding window, where we must also remove elements that exit the window. We use two heaps (max-heap for left half, min-heap for right half) plus lazy deletion via a hash map for elements that have left the window. For each new element, we insert into the appropriate heap, rebalance, then lazily remove any elements that should have been deleted from the window start. The median is obtained from the heap roots after cleanup.\n\nDiagram:\n  nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3\n\n  Two heaps: maxH=left half, minH=right half\n\n  Window [1,3,-1]: maxH=[1,-1] minH=[3] \u2192 median = 1\n  Window [3,-1,-3]: maxH=[-1,-3] minH=[3] \u2192 median = -1\n  Window [-1,-3,5]: maxH=[-1,-3] minH=[5] \u2192 median = -1\n  Window [-3,5,3]: maxH=[3,-3] minH=[5] \u2192 median = 3\n  Window [5,3,6]: maxH=[5,3] minH=[6] \u2192 median = 5\n  Window [3,6,7]: maxH=[6,3] minH=[7] \u2192 median = 6\n\n  Output: 1 -1 -1 3 5 6\n\n```\nsliding-window-median (two heaps + lazy deletion):\n  nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3\n\n  Window [1,3,-1]: maxH=[1,-1] minH=[3] \u2192 median = 1\n  Window [3,-1,-3]: maxH=[-1,-3] minH=[3] \u2192 median = -1\n  Window [-1,-3,5]: maxH=[-1,-3] minH=[5] \u2192 median = -1\n  Window [-3,5,3]: maxH=[3,-3] minH=[5] \u2192 median = 3\n  Window [5,3,6]: maxH=[5,3] minH=[6] \u2192 median = 5\n  Window [3,6,7]: maxH=[6,3] minH=[7] \u2192 median = 6\n\n  Output: 1 -1 -1 3 5 6\n```\n\nTime complexity is O(n log k) for each insertion and deletion, and space is O(n) for the heaps and delay map.",
    complexity: {"time":"O(n log k)","space":"O(n)"},
    sheet: "LeetCode",
    solution_code: "priority_queue<int> maxH; priority_queue<int,vector<int>,greater<int>> minH; unordered_map<int,int> delayed; for(int i=0;i<n;i++){if(maxH.empty()||nums[i]<=maxH.top())maxH.push(nums[i]);else minH.push(nums[i]); balance(); if(i>=k){delayed[nums[i-k]]++;clean();} if(i>=k-1)output();}",
    techniques: ["heaps", "sliding-window", "hash-map"],
  },
  {
    id: "find-right-interval",
    title: "Find Right Interval",
    category: "heaps",
    difficulty: "medium",
    description: "For each interval find the interval with smallest start >= its end.",
    constraints: "1 <= n <= 10^4",
    examples: [
      {"input":"3\n1 2\n2 3\n0 1","output":"1 2 -1"}
    ],
    test_cases: [
      {"input":"3\n1 2\n2 3\n0 1","expected":"1 2 -1"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<vector<int>> intervals(n, vector<int>(2));\n  for (int i = 0; i < n; i++) cin >> intervals[i][0] >> intervals[i][1];\n\n  vector<pair<int,int>> starts;\n  for (int i = 0; i < n; i++) starts.push_back({intervals[i][0], i});\n  sort(starts.begin(), starts.end());\n\n  vector<int> ans(n);\n  for (int i = 0; i < n; i++) {\n    int end = intervals[i][1];\n    auto it = lower_bound(starts.begin(), starts.end(), make_pair(end, -1));\n    ans[i] = (it != starts.end()) ? it->second : -1;\n  }\n\n  for (int x : ans) cout << x << \" \";\n  return 0;\n}",
    approach: "This problem asks us to find, for each interval i, the index of the interval j such that interval[j].start >= interval[i].end and interval[j].start is the minimum possible. This is called the 'right interval'. If no such interval exists, return -1. A binary search approach sorts intervals by start time and uses binary search to find the right interval for each end time. A heap-based approach processes intervals in decreasing order of end times and maintains a min-heap of start times to efficiently find matches. The algorithm pairs each interval with its original index, sorts by start time, and for each interval's end time performs a binary search on the sorted starts to find the smallest start >= end.\n\nDiagram:\n  intervals = [(1,2), (2,3), (0,1)]\n  indices: 0:(1,2), 1:(2,3), 2:(0,1)\n\n  Sorted starts: (0,2), (1,0), (2,1)\n\n  Binary search for each end:\n  Interval 0: end=2 \u2192 search(2) \u2192 found (2,1) \u2192 ans[0]=1\n  Interval 1: end=3 \u2192 search(3) \u2192 not found \u2192 ans[1]=-1\n  Interval 2: end=1 \u2192 search(1) \u2192 found (1,0) \u2192 ans[2]=0\n\n  Result: [1, -1, 0]\n\n```\nfind-right-interval (sorting + binary search):\n  intervals = [(1,2), (2,3), (0,1)]\n  indices:  0:(1,2), 1:(2,3), 2:(0,1)\n\n  Sorted starts: (0,2), (1,0), (2,1)\n\n  Interval 0: end=2 \u2192 search 2 in starts \u2192 found (2,1) \u2192 ans[0]=1\n  Interval 1: end=3 \u2192 search 3 in starts \u2192 not found \u2192 ans[1]=-1\n  Interval 2: end=1 \u2192 search 1 in starts \u2192 found (1,0) \u2192 ans[2]=0\n\n  Result: [1, -1, 0]\n```\n\nTime complexity is O(n log n) for sorting and O(n log n) for n binary searches, space is O(n).",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "LeetCode",
    solution_code: "vector<pair<int,int>> st; for(int i=0;i<n;i++)st.push_back({intervals[i][0],i}); sort(st.begin(),st.end()); vector<int> ans(n); for(int i=0;i<n;i++){auto it=lower_bound(st.begin(),st.end(),make_pair(intervals[i][1],-1)); ans[i]=it==st.end()?-1:it->second;} for(int x:ans)cout<<x<<\" \";",
    techniques: ["heaps", "sorting", "binary-search"],
  },
  {
    id: "sort-features-by-freq",
    title: "Sort Features by Frequency",
    category: "heaps",
    difficulty: "easy",
    description: "Sort array elements by their frequency of occurrence.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"8\n2 5 2 8 5 6 8 8","output":"8 8 8 2 2 5 5 6"}
    ],
    test_cases: [
      {"input":"8\n2 5 2 8 5 6 8 8","expected":"8 8 8 2 2 5 5 6"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<int> arr(n);\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  unordered_map<int,int> freq;\n  for (int x : arr) freq[x]++;\n\n  auto cmp = [](const pair<int,int>& a, const pair<int,int>& b) {\n    if (a.first != b.first) return a.first < b.first;\n    return a.second > b.second;\n  };\n  priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);\n\n  for (auto& p : freq) pq.push({p.second, p.first});\n\n  while (!pq.empty()) {\n    auto [cnt, val] = pq.top(); pq.pop();\n    for (int i = 0; i < cnt; i++) cout << val << \" \";\n  }\n  return 0;\n}",
    approach: "This problem asks us to sort the elements of an array by their frequency of occurrence. Elements with higher frequency appear first. If two elements have the same frequency, elements that appear earlier in the original array come first (or by value, depending on the variant). We count frequencies using a hash map, then push all (frequency, value) pairs onto a max-heap. When we pop from the heap, we output the value 'frequency' times. Since the max-heap orders by frequency descending, the most frequent elements are output first.\n\nDiagram:\n  arr = [2, 5, 2, 8, 5, 6, 8, 8]\n  freq: {2:2, 5:2, 8:3, 6:1}\n\n  Max-heap by frequency:\n  [(3,8), (2,2), (2,5), (1,6)]\n\n  Pop (3,8) \u2192 output: 8 8 8\n  Pop (2,2) \u2192 output: 8 8 8 2 2\n  Pop (2,5) \u2192 output: 8 8 8 2 2 5 5\n  Pop (1,6) \u2192 output: 8 8 8 2 2 5 5 6\n\n  Result: [8, 8, 8, 2, 2, 5, 5, 6]\n\n```\nsort-features-by-freq (max-heap by frequency):\n  arr = [2, 5, 2, 8, 5, 6, 8, 8]\n  freq: {2:2, 5:2, 8:3, 6:1}\n\n  Max-heap: [(3,8), (2,2), (2,5), (1,6)]\n\n  Pop (3,8) \u2192 output: 8 8 8\n  Pop (2,2) \u2192 output: 8 8 8 2 2\n  Pop (2,5) \u2192 output: 8 8 8 2 2 5 5\n  Pop (1,6) \u2192 output: 8 8 8 2 2 5 5 6\n\n  Result: [8, 8, 8, 2, 2, 5, 5, 6]\n```\n\nTime complexity is O(n + m log m) where m is the number of distinct elements, and space is O(n).",
    complexity: {"time":"O(n + m log m)","space":"O(n)"},
    sheet: "GeeksforGeeks",
    solution_code: "unordered_map<int,int> mp; for(int x:arr)mp[x]++; priority_queue<pair<int,int>> pq; for(auto& p:mp)pq.push({p.second,p.first}); while(!pq.empty()){auto [c,v]=pq.top();pq.pop();for(int i=0;i<c;i++)cout<<v<<\" \";}",
    techniques: ["heaps", "hash-map", "sorting"],
  },
  {
    id: "farthest-building",
    title: "Farthest Building You Can Reach",
    category: "heaps",
    difficulty: "medium",
    description: "Find farthest building reachable with given bricks and ladders.",
    constraints: "1 <= n <= 10^5, 0 <= bricks, ladders <= 10^9",
    examples: [
      {"input":"5\n4 2 7 6 9\n5\n1","output":"3"}
    ],
    test_cases: [
      {"input":"5\n4 2 7 6 9\n5\n1","expected":"3"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<int> heights(n);\n  for (int i = 0; i < n; i++) cin >> heights[i];\n  int bricks, ladders; cin >> bricks >> ladders;\n\n  priority_queue<int> pq;\n  for (int i = 1; i < n; i++) {\n    int diff = heights[i] - heights[i-1];\n    if (diff <= 0) continue;\n    pq.push(diff);\n    bricks -= diff;\n    if (bricks < 0) {\n      if (ladders <= 0) { cout << i-1 << endl; return 0; }\n      bricks += pq.top(); pq.pop();\n      ladders--;\n    }\n  }\n  cout << n-1 << endl;\n  return 0;\n}",
    approach: "This problem asks how far we can travel through an array of building heights using bricks and ladders. When moving from a shorter to a taller building, we need the difference in height as resources. Bricks can be used to cover any height difference (1 brick per unit). Ladders can cover any height difference but are limited in count. The optimal strategy uses a max-heap to track height differences covered by bricks. We always use bricks first, and when we run out, we replace the largest brick usage with a ladder (popping it from the max-heap and refunding bricks). This greedy approach ensures ladders are used on the largest jumps.\n\nDiagram:\n  heights = [4, 2, 7, 6, 9], bricks = 5, ladders = 1\n\n  Max-heap of brick-used jumps:\n  i=2: 2\u21927, diff=5 \u2192 bricks=5-5=0 \u2192 push 5 \u2192 Heap: [5]\n  i=4: 6\u21929, diff=3 \u2192 bricks=0-3=-3 \u2192 use ladder!\n        pop max 5 \u2192 bricks=-3+5=2 \u2192 ladders=0 \u2192 Heap: [3]\n  i=5: bricks=2, ladders=0 \u2192 cannot proceed\n\n  Farthest building index = 3\n\n```\nfarthest-building (max-heap of brick-used jumps):\n  heights = [4, 2, 7, 6, 9], bricks = 5, ladders = 1\n\n  i=1: 4->2, diff=-3 \u2192 no resource needed\n  i=2: 2->7, diff=5 \u2192 bricks=5-5=0 \u2192 push 5 \u2192 Heap: [5]\n  i=3: 7->6, diff=-1 \u2192 no resource needed\n  i=4: 6->9, diff=3 \u2192 bricks=0-3=-3 \u2192 bricks<0 \u2192 use ladder\n        pop max diff=5 \u2192 bricks=-3+5=2 \u2192 ladders=0 \u2192 Heap: [3]\n  i=5: would need more resources but bricks=2, ladders=0\n        cannot cross diff=... stop at index 3 (building 6)\n\n  Farthest building index = 3\n```\n\nTime complexity is O(n log k) where k is the number of jumps, and space is O(n).",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "LeetCode",
    solution_code: "priority_queue<int> pq; int bricks=givenBricks, ladders=givenLadders; for(int i=1;i<n;i++){int d=heights[i]-heights[i-1]; if(d<=0)continue; pq.push(d); bricks-=d; if(bricks<0){if(--ladders<0)return i-1; bricks+=pq.top();pq.pop();}} return n-1;",
    techniques: ["heaps", "greedy"],
  },
  {
    id: "minimum-refuel",
    title: "Minimum Number of Refueling Stops",
    category: "heaps",
    difficulty: "hard",
    description: "Find minimum refueling stops to reach destination.",
    constraints: "1 <= target <= 10^9, 0 <= startFuel <= 10^9, 0 <= stations.length <= 500",
    examples: [
      {"input":"100\n10\n3\n10 60\n20 30\n30 30\n40 40","output":"2"}
    ],
    test_cases: [
      {"input":"100\n10\n3\n10 60\n20 30\n30 30\n40 40","expected":"2"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int target, startFuel, n; cin >> target >> startFuel >> n;\n  vector<pair<int,int>> stations(n);\n  for (int i = 0; i < n; i++) cin >> stations[i].first >> stations[i].second;\n\n  priority_queue<int> pq;\n  int fuel = startFuel, stops = 0, i = 0;\n\n  while (fuel < target) {\n    while (i < n && stations[i].first <= fuel) pq.push(stations[i++].second);\n    if (pq.empty()) { cout << -1 << endl; return 0; }\n    fuel += pq.top(); pq.pop();\n    stops++;\n  }\n  cout << stops << endl;\n  return 0;\n}",
    approach: "This problem asks to find the minimum number of refueling stops needed to reach a target distance, given a starting amount of fuel and stations along the way each with a certain amount of fuel. The optimal strategy uses a greedy algorithm with a max-heap. We drive as far as we can with current fuel, collecting all reachable stations' fuel amounts into a max-heap. When we run out of fuel, we greedily refuel at the station with the most fuel among those we've passed (pop from max-heap). This minimizes the number of stops because we always choose the station that gives us the maximum range extension.\n\nDiagram:\n  target = 100, startFuel = 10\n  stations: [(10,60), (20,30), (30,30), (40,40)]\n\n  Max-heap of station fuels:\n  fuel=10 \u2192 reach station at 10 \u2192 collect 60 \u2192 Heap: [60]\n  fuel=10 < target \u2192 pop 60 \u2192 fuel=70, stops=1\n\n  fuel=70 \u2192 reach stations 20,30,40 \u2192 collect 30,30,40 \u2192 Heap: [40,30,30]\n  fuel=70 < 100 \u2192 pop 40 \u2192 fuel=110, stops=2\n\n  fuel=110 >= 100 \u2192 reached! Stops = 2\n\n```\nminimum-refuel (max-heap of station fuels):\n  target = 100, startFuel = 10\n  stations: [(10,60), (20,30), (30,30), (40,40)]\n\n  fuel=10, can reach station at 10\n  Collect fuel 60 \u2192 Heap: [60]\n  fuel < target \u2192 pop max 60 \u2192 fuel=70, stops=1\n\n  fuel=70, can reach stations at 20,30,40 (all passed)\n  Collect 30,30,40 \u2192 Heap: [40,30,30]\n  fuel < target (70<100) \u2192 pop max 40 \u2192 fuel=110, stops=2\n\n  fuel=110 >= target=100 \u2192 reached!\n  Stops = 2\n```\n\nTime complexity is O(n log n) and space is O(n) for the heap.",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "LeetCode",
    solution_code: "priority_queue<int> pq; int fuel=startFuel, stops=0, i=0; while(fuel<target){while(i<n&&stations[i].first<=fuel)pq.push(stations[i++].second); if(pq.empty())return -1; fuel+=pq.top();pq.pop();stops++;} return stops;",
    techniques: ["heaps", "greedy"],
  },
  {
    id: "swim-in-rising-water",
    title: "Swim in Rising Water",
    category: "heaps",
    difficulty: "hard",
    description: "Find minimum time to swim from top-left to bottom-right as water rises.",
    constraints: "1 <= n <= 50, 0 <= grid[i][j] <= n^2 - 1",
    examples: [
      {"input":"3\n0 2 1\n3 4 5\n6 7 8","output":"3"}
    ],
    test_cases: [
      {"input":"3\n0 2 1\n3 4 5\n6 7 8","expected":"3"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<vector<int>> grid(n, vector<int>(n));\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++)\n      cin >> grid[i][j];\n\n  auto cmp = [](const vector<int>& a, const vector<int>& b) { return a[0] > b[0]; };\n  priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> pq(cmp);\n  vector<vector<bool>> vis(n, vector<bool>(n, false));\n  int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};\n\n  pq.push({grid[0][0], 0, 0});\n  vis[0][0] = true;\n  int ans = 0;\n\n  while (!pq.empty()) {\n    auto cur = pq.top(); pq.pop();\n    int h = cur[0], r = cur[1], c = cur[2];\n    ans = max(ans, h);\n    if (r == n-1 && c == n-1) break;\n    for (auto& d : dirs) {\n      int nr = r + d[0], nc = c + d[1];\n      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !vis[nr][nc]) {\n        vis[nr][nc] = true;\n        pq.push({grid[nr][nc], nr, nc});\n      }\n    }\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: "This problem asks to find the minimum time (maximum elevation encountered) needed to swim from the top-left corner to the bottom-right corner of a grid, where the water level rises over time and you can only swim through cells whose elevation is at most the current water level. This is a minimax path problem: find a path that minimizes the maximum cell value along it. We use Dijkstra-like approach with a min-heap prioritizing by cell elevation. Starting from (0,0), we always explore the cell with the smallest elevation among unvisited neighbors. The answer is the maximum elevation along the optimal path. Since the min-heap always expands the lowest-elevation frontier first, the first time we reach the target gives the minimax value.\n\nDiagram:\n  grid = [[0,2,1],\n          [3,4,5],\n          [6,7,8]]\n\n  Min-heap by elevation:\n  Initial: pq=[(0,0,0)], ans=0\n\n  Pop (0,0,0): ans=0 \u2192 push (2,0,1),(3,1,0)\n  Pop (2,0,1): ans=2 \u2192 push (1,0,2),(4,1,1)\n  Pop (1,0,2): ans=2 \u2192 push (5,1,2)\n  ...\n  Reach (2,2) with ans=3\n\n  Answer = 3\n\n```\nswim-in-rising-water (min-heap by elevation):\n  grid = [[0,2,1],\n          [3,4,5],\n          [6,7,8]]\n\n  Initial: pq=[(0,0,0)], vis[0][0]=true, ans=0\n\n  Pop (0,0,0): ans=max(0,0)=0 \u2192 push neighbors (2,0,1),(3,1,0)\n  Heap: [(2,0,1), (3,1,0)]\n\n  Pop (2,0,1): ans=max(0,2)=2 \u2192 push (1,0,2),(4,1,1)\n  Heap: [(1,0,2), (3,1,0), (4,1,1)]\n\n  Pop (1,0,2): ans=max(2,1)=2 \u2192 push (5,1,2)\n  (r,c) = (0,2)\n\n  ...continues...\n  Eventually reach (2,2) with ans=3\n\n  Answer = 3\n```\n\nTime complexity is O(n\u00b2 log n) and space is O(n\u00b2).",
    complexity: {"time":"O(n^2 log n)","space":"O(n^2)"},
    sheet: "LeetCode",
    solution_code: "auto cmp=[](auto& a,auto& b){return a[0]>b[0];}; priority_queue<vector<int>,vector<vector<int>>,decltype(cmp)> pq(cmp); pq.push({grid[0][0],0,0}); vector<vector<bool>> vis(n,vector<bool>(n)); vis[0][0]=true; int ans=0, dirs[4][2]={{1,0},{-1,0},{0,1},{0,-1}}; while(!pq.empty()){auto v=pq.top();pq.pop();ans=max(ans,v[0]);if(v[1]==n-1&&v[2]==n-1)break; for(auto& d:dirs){int r=v[1]+d[0],c=v[2]+d[1]; if(r>=0&&r<n&&c>=0&&c<n&&!vis[r][c]){vis[r][c]=true; pq.push({grid[r][c],r,c});}}} cout<<ans;",
    techniques: ["heaps", "dijkstra", "graph"],
  },
  {
    id: "trap-rain-water-ii",
    title: "Trapping Rain Water II",
    category: "heaps",
    difficulty: "hard",
    description: "Calculate volume of water trapped in a 2D elevation map.",
    constraints: "1 <= n,m <= 200, 0 <= height <= 10^5",
    examples: [
      {"input":"3 6\n1 4 3 1 3 2\n3 2 1 3 2 4\n2 3 3 2 3 1","output":"4"}
    ],
    test_cases: [
      {"input":"3 6\n1 4 3 1 3 2\n3 2 1 3 2 4\n2 3 3 2 3 1","expected":"4"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> heightMap(n, vector<int>(m));\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < m; j++)\n      cin >> heightMap[i][j];\n\n  auto cmp = [](const vector<int>& a, const vector<int>& b) { return a[0] > b[0]; };\n  priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> pq(cmp);\n  vector<vector<bool>> vis(n, vector<bool>(m, false));\n\n  for (int i = 0; i < n; i++) {\n    pq.push({heightMap[i][0], i, 0}); vis[i][0] = true;\n    pq.push({heightMap[i][m-1], i, m-1}); vis[i][m-1] = true;\n  }\n  for (int j = 0; j < m; j++) {\n    pq.push({heightMap[0][j], 0, j}); vis[0][j] = true;\n    pq.push({heightMap[n-1][j], n-1, j}); vis[n-1][j] = true;\n  }\n\n  int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};\n  int water = 0, maxBoundary = 0;\n\n  while (!pq.empty()) {\n    auto cur = pq.top(); pq.pop();\n    int h = cur[0], r = cur[1], c = cur[2];\n    maxBoundary = max(maxBoundary, h);\n    for (auto& d : dirs) {\n      int nr = r + d[0], nc = c + d[1];\n      if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc]) {\n        vis[nr][nc] = true;\n        if (heightMap[nr][nc] < maxBoundary) water += maxBoundary - heightMap[nr][nc];\n        pq.push({heightMap[nr][nc], nr, nc});\n      }\n    }\n  }\n  cout << water << endl;\n  return 0;\n}",
    approach: "This problem asks to calculate the total volume of water that can be trapped in a 2D elevation map after heavy rain. Water can only be trapped if there are higher elevations surrounding a lower area. This extends the 1D trapping rain water problem to 2D. We use a min-heap boundary approach. Starting from the outer perimeter cells, we push all boundary cells into a min-heap. We track the maximum boundary height seen so far. We repeatedly pop the cell with smallest height from the heap. For each neighbor, if it is lower than the current max boundary, water can be trapped there (difference = maxBoundary - neighborHeight). We add that water and push the neighbor onto the heap. This ensures water flows from lowest boundaries inward.\n\nDiagram:\n  grid = [[1,4,3,1,3,2],\n          [3,2,1,3,2,4],\n          [2,3,3,2,3,1]]\n\n  Min-heap boundary:\n  Push all perimeter cells, maxB=1\n\n  Pop (1,0,0): maxB=1 \u2192 explore neighbors\n  Pop (1,0,3): maxB=1 \u2192 explore neighbors\n  ...eventually...\n  Interior cell (1,1,2)=1 < maxB=2 \u2192 water = 2-1 = 1\n\n  Total trapped water = 4\n\n```\ntrap-rain-water-ii (min-heap boundary):\n  grid = [[1,4,3,1,3,2],\n          [3,2,1,3,2,4],\n          [2,3,3,2,3,1]]\n\n  Initial boundary (perimeter) pushed to min-heap\n  maxBoundary = 1 (lowest boundary cell)\n\n  Pop (1,0,0): maxB=1 \u2192 explore neighbors\n  Pop (1,0,3): maxB=1 \u2192 explore neighbors\n  ...\n  When we encounter interior cell (1,1,2)=1 < maxB=2?\n  If maxB=2 at that point, water = 2-1 = 1\n\n  Total trapped water = 4\n```\n\nTime complexity is O(n*m log(n+m)) and space is O(n*m) for the heap and visited array.",
    complexity: {"time":"O(n*m log(n+m))","space":"O(n*m)"},
    sheet: "LeetCode",
    solution_code: "auto cmp=[](auto& a,auto& b){return a[0]>b[0];}; priority_queue<vector<int>,vector<vector<int>>,decltype(cmp)> pq(cmp); vector<vector<bool>> vis(n,vector<bool>(m)); for(int i=0;i<n;i++){pq.push({h[i][0],i,0});pq.push({h[i][m-1],i,m-1});vis[i][0]=vis[i][m-1]=true;} for(int j=0;j<m;j++){pq.push({h[0][j],0,j});pq.push({h[n-1][j],n-1,j});vis[0][j]=vis[n-1][j]=true;} int dirs[4][2]={{1,0},{-1,0},{0,1},{0,-1}},water=0,maxB=0; while(!pq.empty()){auto v=pq.top();pq.pop();maxB=max(maxB,v[0]); for(auto& d:dirs){int r=v[1]+d[0],c=v[2]+d[1];if(r>=0&&r<n&&c>=0&&c<m&&!vis[r][c]){vis[r][c]=true;if(h[r][c]<maxB)water+=maxB-h[r][c];pq.push({h[r][c],r,c});}}} cout<<water;",
    techniques: ["heaps", "dijkstra", "matrix"],
  },
  {
    id: "minimum-cost-connect",
    title: "Minimum Cost to Connect All Points",
    category: "heaps",
    difficulty: "medium",
    description: "Connect all points with minimum total cost using Manhattan distance.",
    constraints: "1 <= n <= 1000, -10^6 <= xi, yi <= 10^6",
    examples: [
      {"input":"3\n0 0\n1 1\n2 2","output":"4"}
    ],
    test_cases: [
      {"input":"3\n0 0\n1 1\n2 2","expected":"4"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<pair<int,int>> points(n);\n  for (int i = 0; i < n; i++) cin >> points[i].first >> points[i].second;\n\n  auto cmp = [](const vector<int>& a, const vector<int>& b) { return a[0] > b[0]; };\n  priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> pq(cmp);\n  vector<bool> inMST(n, false);\n  vector<int> key(n, INT_MAX);\n\n  key[0] = 0;\n  pq.push({0, 0});\n  int cost = 0;\n\n  while (!pq.empty()) {\n    auto cur = pq.top(); pq.pop();\n    int u = cur[1];\n    if (inMST[u]) continue;\n    inMST[u] = true;\n    cost += cur[0];\n\n    for (int v = 0; v < n; v++) {\n      if (!inMST[v]) {\n        int dist = abs(points[u].first - points[v].first) + abs(points[u].second - points[v].second);\n        if (dist < key[v]) {\n          key[v] = dist;\n          pq.push({dist, v});\n        }\n      }\n    }\n  }\n  cout << cost << endl;\n  return 0;\n}",
    approach: "This problem asks to find the minimum cost to connect all points in a plane, where the cost of connecting two points is their Manhattan distance. This is a classic Minimum Spanning Tree (MST) problem on a complete graph. Prim's algorithm with a min-heap provides an efficient solution. We start from point 0, maintain a min-heap of edges (cost, vertex), and a key array tracking minimum cost to reach each vertex. We repeatedly extract the minimum edge from the heap. If the vertex is already in the MST, we skip it. Otherwise, we add it to the MST and update the distances to all unvisited vertices. This builds the MST incrementally.\n\nDiagram:\n  points = [(0,0), (1,1), (2,2)]\n  Manhattans: d(0,1)=2, d(0,2)=4, d(1,2)=2\n\n  Prim's min-heap:\n  Pop (0,0): cost=0 \u2192 update v=1: key=2, v=2: key=4\n  Heap: [(2,1), (4,2)]\n\n  Pop (2,1): cost=2 \u2192 update v=2: key=2 (was 4)\n  Heap: [(2,2), (4,2)]\n\n  Pop (2,2): cost=2 \u2192 all visited\n\n  Total cost = 0 + 2 + 2 = 4\n\n```\nminimum-cost-connect (Prim's min-heap):\n  points = [(0,0), (1,1), (2,2)]\n  Manhattans: d(0,1)=2, d(0,2)=4, d(1,2)=2\n\n  Initial: key=[0,INF,INF], pq=[(0,0)]\n\n  Pop (0,0): u=0, cost=0, inMST={T,F,F}\n    Update neighbors:\n      v=1: dist=2 < INF \u2192 key[1]=2, push (2,1)\n      v=2: dist=4 < INF \u2192 key[2]=4, push (4,2)\n  Heap: [(2,1), (4,2)]\n\n  Pop (2,1): u=1, cost=2, inMST={T,T,F}\n    Update:\n      v=0: already in MST\n      v=2: dist=2 < 4 \u2192 key[2]=2, push (2,2)\n  Heap: [(2,2), (4,2)]\n\n  Pop (2,2): u=2, cost=2, inMST={T,T,T}\n    All visited\n\n  Total cost = 0 + 2 + 2 = 4\n```\n\nTime complexity is O(n\u00b2 log n) for dense graph representation, and space is O(n).",
    complexity: {"time":"O(n^2 log n)","space":"O(n)"},
    sheet: "LeetCode",
    solution_code: "auto cmp=[](auto& a,auto& b){return a[0]>b[0];}; priority_queue<vector<int>,vector<vector<int>>,decltype(cmp)> pq(cmp); vector<bool> inMST(n); vector<int> key(n,INT_MAX); key[0]=0; pq.push({0,0}); int cost=0; while(!pq.empty()){auto v=pq.top();pq.pop();int u=v[1];if(inMST[u])continue; inMST[u]=true; cost+=v[0]; for(int w=0;w<n;w++)if(!inMST[w]){int d=abs(points[u].first-points[w].first)+abs(points[u].second-points[w].second); if(d<key[w]){key[w]=d; pq.push({d,w});}}} cout<<cost;",
    techniques: ["heaps", "prim", "graph", "mst"],
  },
  {
    id: "shortest-path-heap",
    title: "Shortest Path using Dijkstra (Heap)",
    category: "heaps",
    difficulty: "medium",
    description: "Find shortest path in a weighted graph using Dijkstra with a min-heap.",
    constraints: "1 <= n <= 10^5, 1 <= m <= 10^5, 0 <= weight <= 10^9",
    examples: [
      {"input":"4 5 0 3\n0 1 1\n0 2 4\n1 2 2\n1 3 6\n2 3 3","output":"6"}
    ],
    test_cases: [
      {"input":"4 5 0 3\n0 1 1\n0 2 4\n1 2 2\n1 3 6\n2 3 3","expected":"6"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m, src, dest; cin >> n >> m >> src >> dest;\n  vector<vector<pair<int,int>>> graph(n);\n  for (int i = 0; i < m; i++) {\n    int u, v, w; cin >> u >> v >> w;\n    graph[u].push_back({v, w});\n  }\n\n  auto cmp = [](const pair<int,int>& a, const pair<int,int>& b) { return a.first > b.first; };\n  priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);\n  vector<int> dist(n, INT_MAX);\n\n  dist[src] = 0;\n  pq.push({0, src});\n\n  while (!pq.empty()) {\n    auto [d, u] = pq.top(); pq.pop();\n    if (d > dist[u]) continue;\n    if (u == dest) break;\n    for (auto& [v, w] : graph[u]) {\n      if (dist[u] + w < dist[v]) {\n        dist[v] = dist[u] + w;\n        pq.push({dist[v], v});\n      }\n    }\n  }\n  cout << dist[dest] << endl;\n  return 0;\n}",
    approach: "This problem asks to find the shortest path from a source node to a destination node in a weighted directed graph with non-negative edge weights. Dijkstra's algorithm using a min-heap (priority queue) provides the optimal O((V+E) log V) solution. We maintain a distance array initialized to infinity, set the source distance to 0, and push (0, source) onto a min-heap. We repeatedly extract the node with the smallest distance from the heap. If this distance is stale (larger than the recorded distance), we skip it. Otherwise, we relax all outgoing edges: if going through this node gives a shorter path to a neighbor, we update the distance and push the new pair onto the heap. The algorithm terminates when we pop the destination node.\n\nDiagram:\n  Graph: 0->1(1), 0->2(4), 1->2(2), 1->3(6), 2->3(3)\n  src=0, dest=3\n\n  Dijkstra min-heap:\n  Pop (0,0): dist[1]=1, dist[2]=4\n  Heap: [(1,1), (4,2)]\n\n  Pop (1,1): dist[2]=3 (via 1), dist[3]=7\n  Heap: [(3,2), (4,2), (7,3)]\n\n  Pop (3,2): dist[3]=6 (via 2)\n  Heap: [(4,2), (6,3), (7,3)]\n\n  Pop (6,3): dest reached! answer=6\n\n  Shortest path: 0\u21921\u21922\u21923, distance = 6\n\n```\nshortest-path-heap (Dijkstra min-heap):\n  Graph: 0->1(1), 0->2(4), 1->2(2), 1->3(6), 2->3(3)\n  src=0, dest=3\n\n  Initial: dist=[0, INF, INF, INF], pq=[(0,0)]\n\n  Pop (0,0): relax neighbors\n    0->1: dist[1]=1 < INF \u2192 push (1,1)\n    0->2: dist[2]=4 < INF \u2192 push (4,2)\n  Heap: [(1,1), (4,2)]\n\n  Pop (1,1): relax neighbors\n    1->2: dist[2]=1+2=3 < 4 \u2192 update (3,2)\n    1->3: dist[3]=1+6=7 < INF \u2192 push (7,3)\n  Heap: [(3,2), (4,2), (7,3)]\n\n  Pop (3,2): relax neighbors\n    2->3: dist[3]=3+3=6 < 7 \u2192 update (6,3)\n  Heap: [(4,2), (6,3), (7,3)]\n\n  Pop (4,2): stale (4 > 3) \u2192 skip\n  Pop (6,3): dest=3 reached \u2192 answer=6\n\n  Shortest distance = 6 (0\u21921\u21922\u21923)\n```\n\nTime complexity is O((V+E) log V) and space is O(V+E) for the adjacency list and O(V) for the heap.",
    complexity: {"time":"O((V+E) log V)","space":"O(V+E)"},
    sheet: "Striver A2Z",
    solution_code: "vector<vector<pair<int,int>>> g(n); for(auto& e:edges)g[e[0]].push_back({e[1],e[2]}); auto cmp=[](auto& a,auto& b){return a.first>b.first;}; priority_queue<pair<int,int>,vector<pair<int,int>>,decltype(cmp)> pq; vector<int> d(n,INT_MAX); d[src]=0; pq.push({0,src}); while(!pq.empty()){auto [dist,u]=pq.top();pq.pop();if(dist>d[u])continue; for(auto [v,w]:g[u])if(d[u]+w<d[v]){d[v]=d[u]+w;pq.push({d[v],v});}} cout<<d[dest];",
    techniques: ["heaps", "dijkstra", "graph"],
  },
  {
    id: "kth-largest-array",
    title: "Kth Largest Element in an Array",
    category: "heaps",
    difficulty: "medium",
    description: "Find the kth largest element in an unsorted array.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"6 2\n3 2 1 5 6 4","output":"5"}
    ],
    test_cases: [
      {"input":"6 2\n3 2 1 5 6 4","expected":"5"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n >> k;\n  vector<int> nums(n);\n  for (int i = 0; i < n; i++) cin >> nums[i];\n\n  priority_queue<int, vector<int>, greater<>> pq;\n  for (int x : nums) {\n    pq.push(x);\n    if ((int)pq.size() > k) pq.pop();\n  }\n  cout << pq.top() << endl;\n  return 0;\n}",
    approach: "This problem asks to find the kth largest element in an unsorted array. This is a classic selection problem. The naive approach sorts the array in O(n log n) and returns the element at index n-k. A min-heap of size k provides a more efficient O(n log k) solution. We iterate through the array, pushing each element onto a min-heap. Since it is a min-heap, the root is the smallest among the k largest candidates. When the heap size exceeds k, we pop the root (the smallest, which cannot be among the k largest). After processing all elements, the root of the min-heap is exactly the kth largest element.\n\nDiagram:\n  nums = [3, 2, 1, 5, 6, 4], k = 2\n\n  Min-heap of size k:\n  [3]       -> push 3: [3]\n  [2, 3]    -> push 2: [2, 3]\n  [1, 2, 3] -> push 1: size>k, pop 1 -> [2, 3]\n  [2, 3, 5] -> push 5: size>k, pop 2 -> [3, 5]\n  [3, 5, 6] -> push 6: size>k, pop 3 -> [5, 6]\n  [4, 5, 6] -> push 4: size>k, pop 4 -> [5, 6]\n\n  kth largest = heap.top() = 5\n\n```\nkth-largest-array (min-heap of size k):\n  nums = [3, 2, 1, 5, 6, 4], k = 2\n\n  Push 3 \u2192 Heap: [3]\n  Push 2 \u2192 Heap: [2, 3]\n  Push 1 \u2192 Heap: [1, 3, 2] \u2192 size > k \u2192 pop min 1 \u2192 [2, 3]\n  Push 5 \u2192 Heap: [2, 3, 5] \u2192 size > k \u2192 pop min 2 \u2192 [3, 5]\n  Push 6 \u2192 Heap: [3, 5, 6] \u2192 size > k \u2192 pop min 3 \u2192 [5, 6]\n  Push 4 \u2192 Heap: [4, 6, 5] \u2192 size > k \u2192 pop min 4 \u2192 [5, 6]\n\n  Top = 5 (2nd largest)\n```\n\nTime complexity is O(n log k) and space is O(k). This can also be solved with quickselect in O(n) average time.",
    complexity: {"time":"O(n log k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<int,vector<int>,greater<int>> pq; for(int x:nums){pq.push(x);if(pq.size()>k)pq.pop();} cout<<pq.top();",
    techniques: ["heaps", "quickselect"],
  },
];
