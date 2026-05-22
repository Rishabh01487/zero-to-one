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
  }
]
