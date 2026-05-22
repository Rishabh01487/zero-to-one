export default [
  {
    id: "activity-select",
    title: "Activity Selection",
    category: "greedy",
    difficulty: "easy",
    description: "Select max number of non-overlapping activities.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n1 2\n3 4\n0 6\n5 7\n8 9\n5 9","output":"4","explanation":"Activities: [1,2], [3,4], [5,7], [8,9]"}
    ],
    test_cases: [
      {"input":"6\n1 2\n3 4\n0 6\n5 7\n8 9\n5 9","expected":"4"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<pair<int,int>> act(n);\n  for (int i = 0; i < n; i++) cin >> act[i].first >> act[i].second;\n\n  sort(act.begin(), act.end(), [](auto& a, auto& b) { return a.second < b.second; });\n\n  int cnt = 1, end = act[0].second;\n  for (int i = 1; i < n; i++)\n    if (act[i].first >= end) { cnt++; end = act[i].second; }\n\n  cout << cnt << endl;\n  return 0;\n}",
    approach: "Sort by finish time. Iterate, selecting activity if its start >= last finish.",
    complexity: {"time":"O(n log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "sort(act,act+n,[](auto& a,auto& b){return a.end<b.end;}); int cnt=1,last=act[0].end; for(int i=1;i<n;i++){if(act[i].start>=last){cnt++;last=act[i].end;}}cout<<cnt;",
  },
  {
    id: "fractional-knapsack",
    title: "Fractional Knapsack",
    category: "greedy",
    difficulty: "medium",
    description: "Maximize value with fractional items allowed.",
    constraints: "1 <= n <= 10^5, 1 <= W <= 10^9",
    examples: [
      {"input":"3 50\n60 10\n100 20\n120 30","output":"240.0","explanation":"Take all items: 60+100+120*(20/30)=240"}
    ],
    test_cases: [
      {"input":"3 50\n60 10\n100 20\n120 30","expected":"240.0"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, W; cin >> n >> W;\n  vector<pair<int,int>> items(n); // value, weight\n  for (int i = 0; i < n; i++) cin >> items[i].first >> items[i].second;\n\n  sort(items.begin(), items.end(), [](auto& a, auto& b) {\n    return (double)a.first / a.second > (double)b.first / b.second;\n  });\n\n  double total = 0;\n  int left = W;\n  for (auto& item : items) {\n    if (item.second <= left) { total += item.first; left -= item.second; }\n    else { total += (double)item.first * left / item.second; break; }\n  }\n\n  cout << total << endl;\n  return 0;\n}",
    approach: "Sort by value/weight ratio descending. Take whole items if possible, else fractional part.",
    complexity: {"time":"O(n log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "sort(items,items+n,[](auto& a,auto& b){return a.value*b.weight>b.value*a.weight;}); double profit=0; for(int i=0;i<n&&W>0;i++){int take=min(items[i].weight,W);profit+=take*items[i].value/items[i].weight;W-=take;}cout<<fixed<<setprecision(2)<<profit;",
  },
  {
    id: "n-meetings",
    title: "N Meetings in One Room",
    category: "greedy",
    difficulty: "easy",
    description: "Schedule maximum meetings in one room.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n1 3 0 5 8 5\n2 4 6 7 9 9","output":"1 2 4 5"}
    ],
    test_cases: [
      {"input":"6\n1 3 0 5 8 5\n2 4 6 7 9 9","expected":"1 2 4 5"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int start[n], end[n];\n  for (int i = 0; i < n; i++) cin >> start[i];\n  for (int i = 0; i < n; i++) cin >> end[i];\n\n  vector<pair<int,int>> meet(n);\n  for (int i = 0; i < n; i++) meet[i] = {end[i], start[i]};\n  sort(meet.begin(), meet.end());\n\n  int lastEnd = -1;\n  for (int i = 0; i < n; i++) {\n    if (meet[i].second > lastEnd) {\n      cout << i+1 << \" \";\n      lastEnd = meet[i].first;\n    }\n  }\n  return 0;\n}",
    approach: "Sort by end time. Pick meeting that starts after last selected meeting ends.",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "sort(meetings,meetings+n,[](auto& a,auto& b){return a.end<b.end;}); int cnt=1,last=meetings[0].end; for(int i=1;i<n;i++){if(meetings[i].start>last){cnt++;last=meetings[i].end;}}cout<<cnt;",
  },
  {
    id: "jump-game",
    title: "Jump Game (Can Reach End)",
    category: "greedy",
    difficulty: "medium",
    description: "Check if you can reach the last index.",
    constraints: "1 <= n <= 10^4",
    examples: [
      {"input":"5\n2 3 1 1 4","output":"Yes"}
    ],
    test_cases: [
      {"input":"5\n2 3 1 1 4","expected":"Yes"},
      {"input":"5\n3 2 1 0 4","expected":"No"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int nums[n];\n  for (int i = 0; i < n; i++) cin >> nums[i];\n\n  int maxReach = 0;\n  for (int i = 0; i < n; i++) {\n    if (i > maxReach) { cout << \"No\" << endl; return 0; }\n    maxReach = max(maxReach, i + nums[i]);\n  }\n  cout << \"Yes\" << endl;\n  return 0;\n}",
    approach: "Greedy: track maxReach. If i > maxReach, unreachable. Else maxReach = max(maxReach, i + nums[i]).",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int maxReach = 0; for (int i = 0; i < n; i++) { if (i > maxReach) { cout << \"No\" << endl; return 0; } maxReach = max(maxReach, i + nums[i]); } cout << \"Yes\" << endl;",
  },
  {
    id: "min-platforms",
    title: "Minimum Platforms Required",
    category: "greedy",
    difficulty: "medium",
    description: "Find min platforms needed at a railway station.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n900 940 950 1100 1500 1800\n910 1200 1120 1130 1900 2000","output":"3"}
    ],
    test_cases: [
      {"input":"6\n900 940 950 1100 1500 1800\n910 1200 1120 1130 1900 2000","expected":"3"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n], dep[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  for (int i = 0; i < n; i++) cin >> dep[i];\n\n  sort(arr, arr+n);\n  sort(dep, dep+n);\n\n  int plat = 1, maxPlat = 1, i = 1, j = 0;\n  while (i < n && j < n) {\n    if (arr[i] <= dep[j]) { plat++; i++; }\n    else { plat--; j++; }\n    maxPlat = max(maxPlat, plat);\n  }\n\n  cout << maxPlat << endl;\n  return 0;\n}",
    approach: "Sort arrivals and departions separately. Two-pointer: if arr <= dep, platform++; else platform--.",
    complexity: {"time":"O(n log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "sort(arr,arr+n);sort(dep,dep+n); int plat=1,maxP=1,i=1,j=0; while(i<n&&j<n){if(arr[i]<=dep[j]){plat++;i++;}else{plat--;j++;}maxP=max(maxP,plat);}cout<<maxP;",
  },
  {
    id: "huffman",
    title: "Huffman Coding",
    category: "greedy",
    difficulty: "hard",
    description: "Build Huffman tree and print codes.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"6\na 5\nb 9\nc 12\nd 13\ne 16\nf 45","output":"f:0 c:100 d:101 a:1100 b:1101 e:111"}
    ],
    test_cases: [
      {"input":"6\na 5\nb 9\nc 12\nd 13\ne 16\nf 45","expected":"f:0 c:100 d:101 a:1100 b:1101 e:111"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nstruct Node {\n  char ch;\n  int freq;\n  Node *left, *right;\n  Node(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {}\n};\n\nstruct Compare {\n  bool operator()(Node* a, Node* b) { return a->freq > b->freq; }\n};\n\nvoid encode(Node* root, string code, unordered_map<char,string>& codes) {\n  if (!root) return;\n  if (!root->left && !root->right) { codes[root->ch] = code; }\n  encode(root->left, code + \"0\", codes);\n  encode(root->right, code + \"1\", codes);\n}\n\nint main() {\n  int n; cin >> n;\n  char ch; int freq;\n  priority_queue<Node*, vector<Node*>, Compare> pq;\n  for (int i = 0; i < n; i++) { cin >> ch >> freq; pq.push(new Node(ch, freq)); }\n\n  while (pq.size() > 1) {\n    Node *l = pq.top(); pq.pop();\n    Node *r = pq.top(); pq.pop();\n    Node *p = new Node('$', l->freq + r->freq);\n    p->left = l; p->right = r;\n    pq.push(p);\n  }\n\n  unordered_map<char,string> codes;\n  encode(pq.top(), \"\", codes);\n  for (auto& [c, code] : codes) cout << c << \":\" << code << \" \";\n  return 0;\n}",
    approach: "Build min-heap of nodes. Extract two smallest, merge with sum weight, push back. Repeat until one node remains.",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "// Build min-heap of nodes. While size > 1: extract min2, create parent = sum, insert. Last node is root.",
  },
  {
    id: "gas-station",
    title: "Gas Station (Circular Tour)",
    category: "greedy",
    difficulty: "medium",
    description: "Find starting station to complete circular tour.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n4 6 7 4\n6 5 3 5","output":"1","explanation":"Start at index 1"}
    ],
    test_cases: [
      {"input":"4\n4 6 7 4\n6 5 3 5","expected":"1"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int gas[n], cost[n];\n  for (int i = 0; i < n; i++) cin >> gas[i];\n  for (int i = 0; i < n; i++) cin >> cost[i];\n\n  int total = 0, cur = 0, start = 0;\n  for (int i = 0; i < n; i++) {\n    total += gas[i] - cost[i];\n    cur += gas[i] - cost[i];\n    if (cur < 0) { start = i + 1; cur = 0; }\n  }\n\n  cout << (total >= 0 ? start : -1) << endl;\n  return 0;\n}",
    approach: "Greedy: track total and current surplus. If cur < 0, reset start to next station. If total >= 0, start is valid.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int total = 0, cur = 0, start = 0; for (int i = 0; i < n; i++) { total += gas[i] - cost[i]; cur += gas[i] - cost[i]; if (cur < 0) { start = i + 1; cur = 0; } } cout << (total >= 0 ? start : -1) << endl;",
  }
]
