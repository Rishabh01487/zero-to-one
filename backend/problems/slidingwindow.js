export default [
  {
    id: "max-subarray-k",
    title: "Maximum Sum Subarray of Size K",
    category: "sliding-window",
    difficulty: "easy",
    description: "Find max sum of any subarray of size k.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"6\n2 1 5 1 3 2\n3","output":"9","explanation":"Subarray [5,1,3] has sum 9"}
    ],
    test_cases: [
      {"input":"6\n2 1 5 1 3 2\n3","expected":"9"}
    ],
    approach: "Use a sliding window of size k. Compute sum of first k elements, then slide the window by subtracting the leftmost element and adding the next. Track the maximum sum seen.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int maxSum = 0, windowSum = 0;\nfor (int i = 0; i < k; i++) windowSum += arr[i];\nmaxSum = windowSum;\nfor (int i = k; i < n; i++) {\n  windowSum += arr[i] - arr[i - k];\n  maxSum = max(maxSum, windowSum);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // sliding window\n  return 0;\n}",
  },
  {
    id: "longest-substring-k-distinct",
    title: "Longest Substring with K Distinct Characters",
    category: "sliding-window",
    difficulty: "medium",
    description: "Find length of longest substring with at most k distinct characters.",
    constraints: "1 <= |s| <= 10^5, 1 <= k <= 26",
    examples: [
      {"input":"araaci\n2","output":"4","explanation":"\"araa\" has 2 distinct chars"}
    ],
    test_cases: [
      {"input":"araaci\n2","expected":"4"}
    ],
    approach: "Use sliding window with frequency map. Expand right pointer, add char to map. When distinct count exceeds k, shrink from left. Track max window length.",
    complexity: {"time":"O(n)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "int freq[26] = {0}, distinct = 0, left = 0, maxLen = 0;\nfor (int right = 0; right < s.size(); right++) {\n  if (freq[s[right]-'a']++ == 0) distinct++;\n  while (distinct > k) if (--freq[s[left++]-'a'] == 0) distinct--;\n  maxLen = max(maxLen, right - left + 1);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s; int k;\n  cin >> s >> k;\n  // sliding window + freq\n  return 0;\n}",
  },
  {
    id: "min-window-substr",
    title: "Minimum Window Substring",
    category: "sliding-window",
    difficulty: "hard",
    description: "Find smallest substring of s that contains all chars of t.",
    constraints: "1 <= |s|,|t| <= 10^5",
    examples: [
      {"input":"ADOBECODEBANC\nABC","output":"BANC"}
    ],
    test_cases: [
      {"input":"ADOBECODEBANC\nABC","expected":"BANC"}
    ],
    approach: "Use sliding window with two frequency maps. Expand right until all chars of t are covered. Then shrink from left while still covering all, tracking minimum window length.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int need[128] = {0}, have[128] = {0}, needCnt = 0, haveCnt = 0, left = 0, minLen = INT_MAX, start = 0;\nfor (char c : t) if (need[c]++ == 0) needCnt++;\nfor (int right = 0; right < s.size(); right++) {\n  char c = s[right]; have[c]++;\n  if (have[c] == need[c]) haveCnt++;\n  while (haveCnt == needCnt) {\n    if (right - left + 1 < minLen) { minLen = right - left + 1; start = left; }\n    char lc = s[left++]; have[lc]--;\n    if (have[lc] < need[lc]) haveCnt--;\n  }\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s, t; cin >> s >> t;\n  // sliding window\n  return 0;\n}",
  },
  {
    id: "fruit-baskets",
    title: "Fruit Into Baskets",
    category: "sliding-window",
    difficulty: "medium",
    description: "Maximize fruits collected with at most 2 types (Longest subarray with at most 2 distinct).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"8\n3 3 3 1 2 1 1 2 3 3 4","output":"5","explanation":"[1,2,1,1,2] or [2,1,1,2,3]"}
    ],
    test_cases: [
      {"input":"8\n3 3 3 1 2 1 1 2 3 3 4","expected":"5"}
    ],
    approach: "Sliding window with frequency map tracking at most 2 distinct numbers.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "int freq[100001] = {0}, distinct = 0, left = 0, maxLen = 0;\nfor (int right = 0; right < n; right++) {\n  if (freq[arr[right]]++ == 0) distinct++;\n  while (distinct > 2) if (--freq[arr[left++]] == 0) distinct--;\n  maxLen = max(maxLen, right - left + 1);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sliding window at most 2 distinct\n  return 0;\n}",
  }
]
