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
  }
]
