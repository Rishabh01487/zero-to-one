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
    approach: `This problem asks for the maximum sum obtainable from any contiguous subarray of fixed size k within a given array. A straightforward brute force would examine every possible subarray of length k, computing its sum from scratch in O(k) time, leading to O(n x k) overall -- inefficient for large arrays. The sliding window technique eliminates redundant recomputation by recognizing that consecutive windows overlap by k-1 elements. We first compute the sum of the initial window from index 0 to k-1. As we shift the window one position to the right, we subtract the element that exits from the left (arr[i-k]) and add the new element entering from the right (arr[i]). This constant-time update yields the sum of each new window in O(1) instead of O(k).

Diagram:
max-sum-subarray-k:
  arr = [2, 1, 5, 1, 3, 2], k = 3
  
  Window [0..2]: [2, 1, 5] sum=8  max=8
  Window [1..3]: [1, 5, 1] sum=7  max=8
  Window [2..4]: [5, 1, 3] sum=9  max=9
  Window [3..5]: [1, 3, 2] sum=6  max=9
  
  Result: 9`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Maximum Sum Subarray of Size K\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Striver A2Z",
    solution_code: "int maxSum = 0, windowSum = 0;\nfor (int i = 0; i < k; i++) windowSum += arr[i];\nmaxSum = windowSum;\nfor (int i = k; i < n; i++) {\n  windowSum += arr[i] - arr[i - k];\n  maxSum = max(maxSum, windowSum);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // sliding window\n  return 0;\n}",
    techniques: ["sliding-window"],
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
    approach: `This problem requires finding the length of the longest contiguous substring that contains at most k distinct characters. The brute force approach enumerates every possible substring (O(n^2)) and counts distinct characters in each using a set or frequency map, resulting in O(n^3) or O(n^2) time depending on implementation -- prohibitive for strings up to 10^5 characters. The sliding window with a frequency map solves this efficiently. We maintain two pointers: left and right. The right pointer expands the window one character at a time, incrementing the character's frequency in a hashmap and counting a new distinct character when its frequency rises from 0 to 1. Whenever the number of distinct characters exceeds k, we shrink the window from the left by decrementing the frequency of the leftmost character and moving left forward; if that character's frequency drops to zero, we decrement the distinct count. This ensures the window always satisfies the constraint. After each valid state, we update the maximum window length.

Diagram:
longest-substring-k-distinct:
  s = "araaci", k = 2
  
  Window [0..0]: "a"            distinct=1  maxLen=1
  Window [0..1]: "ar"           distinct=2  maxLen=2
  Window [0..2]: "ara"          distinct=2  maxLen=3
  Window [0..3]: "araa"         distinct=2  maxLen=4
  Window [0..4]: "araac"        distinct=3  shrink to [1..4]: "raac" distinct=3, shrink to [2..4]: "aac" distinct=2  maxLen=4
  Window [2..5]: "aaci"         distinct=2  maxLen=4
  
  Result: 4`,
    complexity: {"time":"O(n)","space":"O(k)"},
    mermaid: "flowchart TD\n  A[\"Longest Substring with K Distinct Characters\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Striver A2Z",
    solution_code: "int freq[26] = {0}, distinct = 0, left = 0, maxLen = 0;\nfor (int right = 0; right < s.size(); right++) {\n  if (freq[s[right]-'a']++ == 0) distinct++;\n  while (distinct > k) if (--freq[s[left++]-'a'] == 0) distinct--;\n  maxLen = max(maxLen, right - left + 1);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s; int k;\n  cin >> s >> k;\n  // sliding window + freq\n  return 0;\n}",
    techniques: ["sliding-window"],
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
    approach: `This problem asks for the smallest contiguous substring of s that contains all characters of t (including duplicates). The brute force generates every substring of s (O(n^2)) and checks whether it contains all characters of t using frequency counting, yielding O(n^3) worst-case -- far too slow. The optimal solution uses a sliding window with two frequency arrays (or hashmaps). We first build a 'need' map from t, counting how many of each character are required, and a 'needCnt' tracking how many unique characters must be satisfied. Two pointers, left and right, define the current window. The right pointer expands the window, updating the 'have' map. When the count of a character in 'have' matches its requirement in 'need', we increment haveCnt. Once haveCnt equals needCnt, the window contains all required characters -- we then try to minimize it. We shrink from the left while the window remains valid: before removing left, we record the window length if it beats the current minimum. When shrinking causes a character's count in 'have' to fall below what 'need' requires, we decrement haveCnt and the window becomes invalid, resuming expansion from the right.

Diagram:
min-window-substr:
  s = "ADOBECODEBANC", t = "ABC"
  need = {A:1, B:1, C:1}, needCnt = 3
  
  Expand [0..5]: "ADOBEC"     have={A:1,D:1,O:1,B:1,E:1,C:1} haveCnt=3  minLen=6
  Shrink  [1..5]: "DOBEC"     have={D:1,O:1,B:1,E:1,C:1}    haveCnt=2 (lost A)
  Expand [1..9]: "DOBECODEBA" have={D:1,O:2,B:2,E:2,C:1,A:1} haveCnt=3  minLen=6
  Shrink  [4..9]: "ECODEBA"   have={E:2,C:1,O:1,D:1,B:1,A:1} haveCnt=3  len=6
  Shrink  [5..9]: "CODEBA"    have={C:1,O:1,D:1,E:1,B:1,A:1} haveCnt=3  len=5
  Shrink  [6..9]: "ODEBA"     have={O:1,D:1,E:1,B:1,A:1}     haveCnt=2 (lost C)
  Expand [6..12]: "ODEBANC"   have={O:1,D:1,E:1,B:1,A:1,N:1,C:1} haveCnt=3  minLen=6
  Shrink  [9..12]: "BANC"     have={B:1,A:1,N:1,C:1}         haveCnt=3  len=4  minLen=4
  
  Result: "BANC"`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Minimum Window Substring\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Striver A2Z",
    solution_code: "int need[128] = {0}, have[128] = {0}, needCnt = 0, haveCnt = 0, left = 0, minLen = INT_MAX, start = 0;\nfor (char c : t) if (need[c]++ == 0) needCnt++;\nfor (int right = 0; right < s.size(); right++) {\n  char c = s[right]; have[c]++;\n  if (have[c] == need[c]) haveCnt++;\n  while (haveCnt == needCnt) {\n    if (right - left + 1 < minLen) { minLen = right - left + 1; start = left; }\n    char lc = s[left++]; have[lc]--;\n    if (have[lc] < need[lc]) haveCnt--;\n  }\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s, t; cin >> s >> t;\n  // sliding window\n  return 0;\n}",
    techniques: ["sliding-window"],
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
    approach: `This problem is a direct application of the 'Longest Substring with K Distinct Characters' pattern with k fixed to 2. Given an array of trees (each tree bears one type of fruit), you pick fruits starting from any tree and move right, but your two baskets can each hold only one type of fruit, meaning you can collect at most two distinct fruit types total. The brute force generates every possible contiguous subarray, counts distinct values using a set, and tracks the maximum length of subarrays with at most 2 distinct values -- O(n^2) time with O(1) extra space for the set. The sliding window with a frequency map brings this down to O(n). We maintain a left pointer and expand the right pointer, incrementing the count of each fruit type in a frequency array. A 'distinct' counter tracks how many fruit types are currently in the window. When distinct exceeds 2, we contract from the left: decrement the count of the leftmost fruit, and if it reaches zero, reduce distinct by one. Continue shrinking until distinct is at most 2. At each valid state, we update the maximum window length.

Diagram:
fruit-baskets:
  arr = [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]
  
  Window [0..2]: [3,3,3]        distinct=1  maxLen=3
  Window [0..3]: [3,3,3,1]      distinct=2  maxLen=4
  Window [0..4]: [3,3,3,1,2]    distinct=3  shrink...
  Window [3..4]: [1,2]          distinct=2  maxLen=4
  Window [3..5]: [1,2,1]        distinct=2  maxLen=3? no maxLen=4
  Window [3..6]: [1,2,1,1]      distinct=2  maxLen=4
  Window [3..7]: [1,2,1,1,2]    distinct=2  maxLen=5
  Window [3..8]: [1,2,1,1,2,3]  distinct=3  shrink...
  Window [7..8]: [2,3]          distinct=2  maxLen=5
  Window [7..9]: [2,3,3]        distinct=2  maxLen=5
  Window [7..10]: [2,3,3,4]     distinct=3  shrink...
  
  Result: 5`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Fruit Into Baskets\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Love Babbar 450",
    solution_code: "int freq[100001] = {0}, distinct = 0, left = 0, maxLen = 0;\nfor (int right = 0; right < n; right++) {\n  if (freq[arr[right]]++ == 0) distinct++;\n  while (distinct > 2) if (--freq[arr[left++]] == 0) distinct--;\n  maxLen = max(maxLen, right - left + 1);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sliding window at most 2 distinct\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "longest-repeating-replacement",
    title: "Longest Repeating Character Replacement",
    category: "sliding-window",
    difficulty: "medium",
    description: "Find longest substring containing same letter after at most k replacements.",
    constraints: "1 <= |s| <= 10^5, 1 <= k <= 10^5",
    examples: [
      {"input":"AABABBA\n1","output":"4","explanation":"Replace one B with A -> \"AAAA\" or \"AAAB\""}
    ],
    test_cases: [
      {"input":"AABABBA\n1","expected":"4"}
    ],
    approach: `This problem asks for the length of the longest substring that consists of the same character after performing at most k character replacements. Essentially, within any window, we can replace up to k characters that differ from the majority character. The brute force checks every possible substring (O(n^2)), counts character frequencies, determines if replacements needed are at most k, and tracks the maximum length -- O(n^3) with naive counting. The sliding window solution maintains a frequency array of 26 uppercase letters. As the right pointer expands, we increment the count of the incoming character and update maxFreq, which tracks the frequency of the most common character in the current window. The key insight is that a window is valid if windowSize - maxFreq <= k -- meaning the number of characters that are not the most frequent one does not exceed k, so they can all be replaced to match. If the condition fails, we shrink from the left: decrement the left character's frequency and advance left. Since removing the left character may reduce maxFreq, we optionally recompute maxFreq by scanning all 26 slots (constant time). At each step, we update the maximum valid window size.

Diagram:
longest-repeating-replacement:
  s = "AABABBA", k = 1
  
  Window [0..0]: "A"    maxFreq=1  valid(1-1=0<=1)  maxLen=1
  Window [0..1]: "AA"   maxFreq=2  valid(2-2=0<=1)  maxLen=2
  Window [0..2]: "AAB"  maxFreq=2  valid(3-2=1<=1)  maxLen=3
  Window [0..3]: "AABA" maxFreq=3  valid(4-3=1<=1)  maxLen=4
  Window [0..4]: "AABAB" maxFreq=3 invalid(5-3=2>1) shrink left -> [1..4]: "ABAB" maxFreq=2  valid(4-2=2>1) shrink -> [2..4]: "BAB" maxFreq=1  valid  maxLen=4
  Window [2..5]: "BABB" maxFreq=3 invalid(4-3=1<=1) wait... let's re-check
  
  Actually: [2..5]=B,A,B,B -> freq{B:3,A:1} maxFreq=3, len=4, 4-3=1<=1 valid maxLen=4
  Window [2..6]: "BABBA" freq{B:3,A:2} maxFreq=3 len=5 5-3=2>1 invalid
    shrink [3..6]: "ABBA" freq{A:2,B:2} maxFreq=2 len=4 4-2=2>1 invalid
    shrink [4..6]: "BBA" freq{B:2,A:1} maxFreq=2 len=3 3-2=1<=1 valid
  
  Result: 4`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Longest Repeating Character Replacement\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Striver A2Z",
    solution_code: "int freq[26] = {0}, maxFreq = 0, left = 0, maxLen = 0;\nfor (int right = 0; right < s.size(); right++) {\n  maxFreq = max(maxFreq, ++freq[s[right]-'A']);\n  while ((right - left + 1) - maxFreq > k) {\n    freq[s[left++]-'A']--;\n    maxFreq = 0;\n    for (int i = 0; i < 26; i++) maxFreq = max(maxFreq, freq[i]);\n  }\n  maxLen = max(maxLen, right - left + 1);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s; int k; cin >> s >> k;\n  // sliding window\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "longest-substr-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    category: "sliding-window",
    difficulty: "medium",
    description: "Find length of the longest substring without repeating characters.",
    constraints: "1 <= |s| <= 10^5, s consists of English letters, digits, symbols and spaces",
    examples: [
      {"input":"abcabcbb","output":"3","explanation":"\"abc\" has length 3"}
    ],
    test_cases: [
      {"input":"abcabcbb","expected":"3"},
      {"input":"bbbbb","expected":"1"},
      {"input":"pwwkew","expected":"3"}
    ],
    approach: `This problem asks for the length of the longest contiguous substring that contains no repeating characters. A brute force approach would enumerate every possible substring (O(n^2)) and check each for duplicate characters using a set (O(n) per substring), yielding O(n^3) worst-case -- far too slow. The optimal approach uses a sliding window with a hashmap that stores the most recent index of each character. We maintain a left pointer that jumps to max(left, lastIndex[s[right]] + 1) whenever we encounter a character already in the window, effectively skipping past the previous occurrence. At each step we update the maximum window length as right - left + 1.

Diagram:
longest-substr-without-repeating:
  s = "abcabcbb"
  
  Window [0..0]: "a"         maxLen=1
  Window [0..1]: "ab"        maxLen=2
  Window [0..2]: "abc"       maxLen=3
  Window [1..3]: "bca"       maxLen=3  (a repeats at 3, left jumps to 1)
  Window [2..4]: "cab"       maxLen=3  (b repeats at 4, left jumps to 2)
  Window [3..5]: "abc"       maxLen=3  (c repeats at 5, left jumps to 3)
  Window [5..6]: "cb"        maxLen=3  (b repeats at 6, left jumps to 5)
  Window [6..7]: "b"         maxLen=3  (b repeats at 7, left jumps to 7)
  
  Result: 3`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Longest Substring Without Repeating Characters\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Striver A2Z",
    solution_code: "int lastIdx[128] = {0}, left = 0, maxLen = 0;\nfor (int right = 0; right < s.size(); right++) {\n  left = max(left, lastIdx[s[right]]);\n  maxLen = max(maxLen, right - left + 1);\n  lastIdx[s[right]] = right + 1;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // sliding window\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "min-sum-subarray-len",
    title: "Minimum Size Subarray Sum",
    category: "sliding-window",
    difficulty: "medium",
    description: "Find minimal length of contiguous subarray with sum >= target.",
    constraints: "1 <= n <= 10^5, 0 <= target <= 10^9",
    examples: [
      {"input":"7\n2 3 1 2 4 3\n7","output":"2","explanation":"[4,3] has min length 2 with sum >= 7"}
    ],
    test_cases: [
      {"input":"7\n2 3 1 2 4 3\n7","expected":"2"}
    ],
    approach: `This problem asks for the minimum length of a contiguous subarray whose sum is at least a given target. A brute force approach checks every subarray (O(n^2)) and computes its sum (O(n^2) or O(n^3)), which is too slow for n up to 10^5. An efficient approach uses a sliding window with two pointers. We expand the right pointer, adding elements to the current window sum. When windowSum >= target, we try to minimize the window by shrinking from the left: we record the current window length as a candidate answer, subtract arr[left] from windowSum, and advance left. This continues until the window sum drops below target, at which point we resume expanding from the right.

Diagram:
min-sum-subarray-len:
  arr = [2, 3, 1, 2, 4, 3], target = 7
  
  Window [0..0]: [2]         sum=2  <7
  Window [0..1]: [2,3]       sum=5  <7
  Window [0..2]: [2,3,1]     sum=6  <7
  Window [0..3]: [2,3,1,2]   sum=8 >=7  minLen=4  shrink-> [1..3]: [3,1,2] sum=6 <7
  Window [1..4]: [3,1,2,4]   sum=10>=7  minLen=4  shrink-> [2..4]: [1,2,4] sum=7 >=7 minLen=3 shrink-> [3..4]: [2,4] sum=6 <7
  Window [3..5]: [2,4,3]     sum=9 >=7  minLen=3  shrink-> [4..5]: [4,3] sum=7 >=7 minLen=2 shrink-> [5..5]: [3] sum=3 <7
  
  Result: 2`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Minimum Size Subarray Sum\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "int left = 0, windowSum = 0, minLen = INT_MAX;\nfor (int right = 0; right < n; right++) {\n  windowSum += arr[right];\n  while (windowSum >= target) {\n    minLen = min(minLen, right - left + 1);\n    windowSum -= arr[left++];\n  }\n}\nreturn minLen == INT_MAX ? 0 : minLen;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> target;\n  // sliding window\n  return 0;\n}",
    techniques: ["sliding-window", "two-pointers"],
  },
  {
    id: "max-consecutive-ones",
    title: "Max Consecutive Ones",
    category: "sliding-window",
    difficulty: "easy",
    description: "Find maximum number of consecutive 1s in a binary array.",
    constraints: "1 <= n <= 10^5, arr[i] in {0, 1}",
    examples: [
      {"input":"6\n1 1 0 1 1 1","output":"3","explanation":"Last three 1s are consecutive"}
    ],
    test_cases: [
      {"input":"6\n1 1 0 1 1 1","expected":"3"}
    ],
    approach: `This is the simplest sliding window application. We maintain a running count of consecutive 1s. When we see a 1, we increment the count and update the maximum. When we see a 0, we reset the count to 0. This is essentially a fixed window that resets on zeros.

Diagram:
max-consecutive-ones:
  arr = [1, 1, 0, 1, 1, 1]
  
  i=0: [1]           count=1  max=1
  i=1: [1,1]         count=2  max=2
  i=2: [1,1,0]       count=0  (reset)
  i=3: [0,1]         count=1  max=2
  i=4: [0,1,1]       count=2  max=2
  i=5: [0,1,1,1]     count=3  max=3
  
  Result: 3`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Max Consecutive Ones\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Love Babbar 450",
    solution_code: "int count = 0, maxCount = 0;\nfor (int i = 0; i < n; i++) {\n  if (arr[i] == 1) { count++; maxCount = max(maxCount, count); }\n  else count = 0;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sliding window\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "max-consecutive-ones-iii",
    title: "Max Consecutive Ones III",
    category: "sliding-window",
    difficulty: "medium",
    description: "Find max number of consecutive 1s after flipping at most k zeros.",
    constraints: "1 <= n <= 10^5, 0 <= k <= n",
    examples: [
      {"input":"11\n1 1 1 0 0 0 1 1 1 1 0\n2","output":"6","explanation":"Flip zeros at indices 3,4 -> [1,1,1,1,1,1,1,1,1,1] of length 6"}
    ],
    test_cases: [
      {"input":"11\n1 1 1 0 0 0 1 1 1 1 0\n2","expected":"6"}
    ],
    approach: `This problem asks for the longest subarray containing only 1s after flipping at most k zeros to 1. This is a classic sliding window problem. We maintain a window using two pointers. The right pointer expands the window. A counter zeroCount tracks how many zeros are in the current window. When zeroCount exceeds k, we shrink from the left: if the left element is 0, we decrement zeroCount; then advance left. At each step we update the maximum window length.

Diagram:
max-consecutive-ones-iii:
  arr = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k = 2
  
  Window [0..2]: [1,1,1]           zeros=0 len=3 max=3
  Window [0..3]: [1,1,1,0]         zeros=1 len=4 max=4
  Window [0..4]: [1,1,1,0,0]       zeros=2 len=5 max=5
  Window [0..5]: [1,1,1,0,0,0]     zeros=3 >2 shrink-> [1..5]: zeros=3 >2 shrink-> [2..5]: zeros=3 >2 shrink-> [3..5]: zeros=2 len=3 max=5
  Window [3..6]: [0,0,0,1]         zeros=3 >2 shrink-> [4..6]: zeros=2 len=3 max=5
  Window [4..7]: [0,0,1,1]         zeros=2 len=4 max=5
  Window [4..8]: [0,0,1,1,1]       zeros=2 len=5 max=5
  Window [4..9]: [0,0,1,1,1,1]     zeros=2 len=6 max=6
  Window [4..10]: [0,0,1,1,1,1,0]  zeros=3 >2 shrink-> [5..10]: zeros=2 len=6 max=6
  
  Result: 6`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Max Consecutive Ones III\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Striver A2Z",
    solution_code: "int left = 0, zeroCount = 0, maxLen = 0;\nfor (int right = 0; right < n; right++) {\n  if (arr[right] == 0) zeroCount++;\n  while (zeroCount > k) if (arr[left++] == 0) zeroCount--;\n  maxLen = max(maxLen, right - left + 1);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // sliding window\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "nice-subarrays-count",
    title: "Count Number of Nice Subarrays",
    category: "sliding-window",
    difficulty: "medium",
    description: "Count subarrays with exactly k odd numbers.",
    constraints: "1 <= n <= 10^5, 0 <= k <= n",
    examples: [
      {"input":"5\n1 1 2 1 1\n3","output":"2","explanation":"[1,1,2,1] and [1,2,1,1] have exactly 3 odds"}
    ],
    test_cases: [
      {"input":"5\n1 1 2 1 1\n3","expected":"2"}
    ],
    approach: `This problem asks for the number of contiguous subarrays that contain exactly k odd numbers (odd numbers are "nice"). A brute force enumerates all O(n^2) subarrays and counts odds in each -- too slow. The efficient approach uses the "atMost" trick: number of subarrays with exactly k odds = atMost(k) - atMost(k-1), where atMost(x) counts subarrays with at most x odd numbers. The atMost function uses a sliding window: expand right, increment oddCount if arr[right] is odd, then while oddCount > x, shrink from left. For each valid right, add (right - left + 1) to the count -- this accounts for all subarrays ending at right with at most x odds.

Diagram:
nice-subarrays-count:
  arr = [1, 1, 2, 1, 1], k = 3
  atMost(3) - atMost(2) = ?
  
  atMost(3):
  [0..0]: [1]       odds=1 count+=1 total=1
  [0..1]: [1,1]     odds=2 count+=2 total=3
  [0..2]: [1,1,2]   odds=2 count+=3 total=6
  [0..3]: [1,1,2,1] odds=3 count+=4 total=10
  [0..4]: [1,1,2,1,1] odds=4 >3 shrink-> [1..4]: odds=3 count+=4 total=14
  atMost(3) = 14
  
  atMost(2):
  [0..0]: [1]       odds=1 count+=1 total=1
  [0..1]: [1,1]     odds=2 count+=2 total=3
  [0..2]: [1,1,2]   odds=2 count+=3 total=6
  [0..3]: [1,1,2,1] odds=3 >2 shrink-> [1..3]: odds=2 count+=3 total=9
  [1..4]: [1,2,1,1] odds=3 >2 shrink-> [2..4]: odds=2 count+=3 total=12
  atMost(2) = 12
  
  Result: 14 - 12 = 2`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Count Number of Nice Subarrays\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Striver A2Z",
    solution_code: "auto atMost = [&](int x) {\n  if (x < 0) return 0;\n  int left = 0, oddCount = 0, total = 0;\n  for (int right = 0; right < n; right++) {\n    if (arr[right] % 2) oddCount++;\n    while (oddCount > x) if (arr[left++] % 2) oddCount--;\n    total += right - left + 1;\n  }\n  return total;\n};\nreturn atMost(k) - atMost(k-1);",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // sliding window with atMost\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "max-erasure",
    title: "Maximum Erasure Value",
    category: "sliding-window",
    difficulty: "medium",
    description: "Find max sum of subarray with all unique elements.",
    constraints: "1 <= n <= 10^5, 1 <= arr[i] <= 10^4",
    examples: [
      {"input":"8\n4 2 4 5 6\n3","output":"17","explanation":"[2,4,5,6] has sum 17 with all unique"}
    ],
    test_cases: [
      {"input":"8\n4 2 4 5 6\n3","expected":"17"}
    ],
    approach: `This problem asks for the maximum sum of any contiguous subarray that contains no duplicate elements. It is a variant of "Longest Substring Without Repeating Characters" but tracking sum instead of length. We use a sliding window with a frequency array or set. Expand the right pointer, adding arr[right] to windowSum. If arr[right] is already present (freq > 0), shrink from the left until the duplicate is removed: subtract arr[left] from windowSum, decrement its frequency, advance left. At each valid state, update maxSum.

Diagram:
max-erasure:
  arr = [4, 2, 4, 5, 6]
  
  Window [0..0]: [4]         sum=4  max=4
  Window [0..1]: [4,2]       sum=6  max=6
  Window [0..2]: [4,2,4]     sum=10 duplicate 4 -> shrink-> [1..2]: [2,4] sum=6 max=6
  Window [1..3]: [2,4,5]     sum=11 max=11
  Window [1..4]: [2,4,5,6]   sum=17 max=17
  
  Result: 17`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Maximum Erasure Value\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Hackos",
    solution_code: "int freq[10001] = {0}, left = 0, windowSum = 0, maxSum = 0;\nfor (int right = 0; right < n; right++) {\n  while (freq[arr[right]] > 0) { windowSum -= arr[left]; freq[arr[left++]]--; }\n  freq[arr[right]] = 1;\n  windowSum += arr[right];\n  maxSum = max(maxSum, windowSum);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sliding window + frequency\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "longest-harmonious-sub",
    title: "Longest Harmonious Subsequence",
    category: "sliding-window",
    difficulty: "easy",
    description: "Find longest subarray where max-min difference is exactly 1.",
    constraints: "1 <= n <= 10^5, 1 <= arr[i] <= 10^9",
    examples: [
      {"input":"8\n1 3 2 2 5 2 3 7","output":"5","explanation":"[3,2,2,2,3] has max-min = 1"}
    ],
    test_cases: [
      {"input":"8\n1 3 2 2 5 2 3 7","expected":"5"}
    ],
    approach: `This problem asks for the length of the longest harmonious subarray where the difference between the maximum and minimum elements is exactly 1. A brute force checks every subarray (O(n^2)) -- too slow. The sliding window approach sorts first (to make the condition about adjacent values), then uses two pointers to find the longest window where arr[right] - arr[left] <= 1, and we specifically want windows where the difference is exactly 1 (not 0). For each right, we move left forward until arr[right] - arr[left] <= 1. If arr[right] != arr[left], then the difference is exactly 1 and we update maxLen. Note: a simpler approach uses a frequency map since sorting changes the array; let's use the frequency map approach.

Diagram:
longest-harmonious-sub:
  arr = [1, 3, 2, 2, 5, 2, 3, 7]
  freq map approach: for each unique value v, count = freq[v] + freq[v+1]
  
  freq: {1:1, 3:2, 2:3, 5:1, 7:1}
  v=1: 1+3=4 (values 1 and 2)
  v=2: 3+2=5 (values 2 and 3) max=5
  v=3: 2+0=2 (values 3 and 4, none)
  v=5: 1+0=1
  v=7: 1+0=1
  
  Result: 5`,
    complexity: {"time":"O(n)","space":"O(n)"},
    mermaid: "flowchart TD\n  A[\"Longest Harmonious Subsequence\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Love Babbar 450",
    solution_code: "unordered_map<int,int> freq;\nint maxLen = 0;\nfor (int x : arr) freq[x]++;\nfor (auto& [v,c] : freq)\n  if (freq.count(v+1))\n    maxLen = max(maxLen, c + freq[v+1]);",
    solution_template: "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sliding window / freq map\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "contains-nearby-duplicate",
    title: "Contains Duplicate II",
    category: "sliding-window",
    difficulty: "easy",
    description: "Check if any two equal elements are within distance k.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"5\n1 2 3 1\n3","output":"true","explanation":"1 at index 0 and 3 are within distance 3"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 1\n3","expected":"true"},
      {"input":"4\n1 2 3 1\n2","expected":"false"}
    ],
    approach: `This problem asks whether there exist two distinct indices i and j such that arr[i] == arr[j] and |i-j| <= k. The brute force checks every pair (O(n^2)), which is too slow for n up to 10^5. We use a sliding window approach with a set that maintains at most k elements at any time. As we iterate with the right pointer, we check if arr[right] already exists in the set. If so, return true. If the set size exceeds k, we remove arr[right - k] (the element that falls out of the window). This maintains a window of the last k elements.

Diagram:
contains-nearby-duplicate:
  arr = [1, 2, 3, 1], k = 3
  set = {}
  
  i=0: arr[0]=1 not in set, add 1 -> set={1}
  i=1: arr[1]=2 not in set, add 2 -> set={1,2}
  i=2: arr[2]=3 not in set, add 3 -> set={1,2,3}
  i=3: arr[3]=1 IS in set! Return true.
  
  Result: true`,
    complexity: {"time":"O(n)","space":"O(k)"},
    mermaid: "flowchart TD\n  A[\"Contains Duplicate II\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Love Babbar 450",
    solution_code: "unordered_set<int> window;\nfor (int i = 0; i < n; i++) {\n  if (window.count(arr[i])) return true;\n  window.insert(arr[i]);\n  if (window.size() > k) window.erase(arr[i - k]);\n}",
    solution_template: "#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // sliding window set\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "grumpy-owner",
    title: "Grumpy Bookstore Owner",
    category: "sliding-window",
    difficulty: "medium",
    description: "Maximize satisfied customers using a k-minute non-grumpy window.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n, customers[i] >= 0, grumpy[i] in {0,1}",
    examples: [
      {"input":"8\n1 0 1 2 1 1 7 5\n0 1 0 1 0 1 0 1\n3","output":"16","explanation":"Silence window [5..7] adds 1+7+5=13; base satisfied = 1+1+1+7=10? Actually answer is 16"}
    ],
    test_cases: [
      {"input":"8\n1 0 1 2 1 1 7 5\n0 1 0 1 0 1 0 1\n3","expected":"16"}
    ],
    approach: `This problem asks for the maximum number of customers that can be satisfied. The owner can use a secret technique for k consecutive minutes to not be grumpy. Customers during grumpy minutes are unsatisfied unless the technique is used. First, we compute the base satisfied customers (when the owner is not grumpy, i.e., grumpy[i]==0). For grumpy minutes, we can potentially convert them. We use a sliding window of size k over the grumpy array to find the segment where converting grumpy minutes gains the most additional customers. The gain for each grumpy minute within the window is customers[i] (since grumpy[i]==1 means that customer would otherwise be lost). So we slide a window of size k, summing customers[i] only when grumpy[i]==1, and track the maximum gain.

Diagram:
grumpy-owner:
  customers = [1, 0, 1, 2, 1, 1, 7, 5]
  grumpy    = [0, 1, 0, 1, 0, 1, 0, 1]
  k = 3
  base = 1 + 0 + 1 + 0 + 1 + 0 + 7 + 0 = 10 (when grumpy=0)
  
  Window [0..2]: grumpy=[0,1,0] gain=0   maxGain=0
  Window [1..3]: grumpy=[1,0,1] gain=2   maxGain=2
  Window [2..4]: grumpy=[0,1,0] gain=0   maxGain=2
  Window [3..5]: grumpy=[1,0,1] gain=3   maxGain=3
  Window [4..6]: grumpy=[0,1,0] gain=0   maxGain=3
  Window [5..7]: grumpy=[1,0,1] gain=1+5=6 maxGain=6
  
  Result: base + maxGain = 10 + 6 = 16`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Grumpy Bookstore Owner\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Hackos",
    solution_code: "int base = 0, windowGain = 0, maxGain = 0;\nfor (int i = 0; i < n; i++) {\n  if (!grumpy[i]) base += customers[i];\n  if (grumpy[i]) windowGain += customers[i];\n  if (i >= k && grumpy[i-k]) windowGain -= customers[i-k];\n  maxGain = max(maxGain, windowGain);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int customers[n], grumpy[n];\n  for (int i = 0; i < n; i++) cin >> customers[i];\n  for (int i = 0; i < n; i++) cin >> grumpy[i];\n  cin >> k;\n  // sliding window\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "moving-avg-stream",
    title: "Moving Average from Data Stream",
    category: "sliding-window",
    difficulty: "easy",
    description: "Compute moving average of last k elements in a stream.",
    constraints: "1 <= k <= 10^5, 1 <= operations <= 10^5",
    examples: [
      {"input":"3\n5\n10\n15\n20","output":"5.0\n7.5\n10.0\n15.0","explanation":"After 5: avg=5.0, after 10: avg=7.5, after 15: avg=10.0, after 20: avg=15.0"}
    ],
    test_cases: [
      {"input":"3\n5\n10\n15\n20","expected":"5.0"}
    ],
    approach: `This problem asks for the moving average of the last k elements in a stream. As new elements arrive, we maintain a running sum of the current window. If the window size exceeds k, we subtract the oldest element from the sum before adding the new one. The average is simply sum / min(windowSize, k). This is implemented using a queue to track the window elements.

Diagram:
moving-avg-stream:
  k = 3
  next(5):  window=[5]       sum=5  avg=5.0
  next(10): window=[5,10]    sum=15 avg=7.5
  next(15): window=[5,10,15] sum=30 avg=10.0
  next(20): window=[10,15,20] sum=45 avg=15.0 (5 removed)`,
    complexity: {"time":"O(1) per operation","space":"O(k)"},
    mermaid: "flowchart TD\n  A[\"Moving Average from Data Stream\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Hackos",
    solution_code: "queue<int> q;\ndouble sum = 0;\ndouble next(int val) {\n  q.push(val);\n  sum += val;\n  if (q.size() > k) { sum -= q.front(); q.pop(); }\n  return sum / q.size();\n}",
    solution_template: "#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main() {\n  int k, n; cin >> k >> n;\n  // queue-based moving average\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "sliding-window-max",
    title: "Sliding Window Maximum",
    category: "sliding-window",
    difficulty: "hard",
    description: "Find max element in every sliding window of size k.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"8\n1 3 -1 -3 5 3 6 7\n3","output":"3 3 5 5 6 7","explanation":"Max of each window of size 3"}
    ],
    test_cases: [
      {"input":"8\n1 3 -1 -3 5 3 6 7\n3","expected":"3 3 5 5 6 7"}
    ],
    approach: `This problem asks for the maximum value in each contiguous subarray of size k. A brute force checks each window independently in O(k) time, resulting in O(n*k) which is too slow for n=10^5. The optimal solution uses a deque (double-ended queue) that stores indices of array elements in decreasing order of their values. For each new element at index i, we remove indices from the back of the deque while the corresponding values are less than arr[i] (they cannot be future maximums). Then we push i to the back. If the front index is out of the current window (i - front >= k), we pop it. The front of the deque always holds the index of the maximum element in the current window, and we record arr[front] as the result.

Diagram:
sliding-window-max:
  arr = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
  deque stores indices, values shown in []
  
  i=0: arr=1  deque=[0(1)]                          window=[1]      max=-
  i=1: arr=3  pop back 0(1)<3, deque=[1(3)]         window=[1,3]    max=-
  i=2: arr=-1 deque=[1(3),2(-1)]                    window=[1,3,-1] max=3
  i=3: arr=-3 deque=[1(3),2(-1),3(-3)] front valid  window=[3,-1,-3] max=3
  i=4: arr=5  pop back 3(-3),2(-1),1(3) all<5       window=[-1,-3,5] max=5
               deque=[4(5)]
  i=5: arr=3  deque=[4(5),5(3)]                     window=[-3,5,3] max=5
  i=6: arr=6  pop back 5(3)<6, deque=[4(5),6(6)]    window=[5,3,6]  max=5->pop front 4 out? 6-4=3>=3 pop front, deque=[6(6)] max=6
  i=7: arr=7  pop back 6(6)<7, deque=[7(7)]          window=[3,6,7]  max=6->pop front, deque=[7(7)] max=7
  
  Result: [3, 3, 5, 5, 6, 7]`,
    complexity: {"time":"O(n)","space":"O(k)"},
    mermaid: "flowchart TD\n  A[\"Sliding Window Maximum\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Striver A2Z",
    solution_code: "deque<int> dq;\nvector<int> result;\nfor (int i = 0; i < n; i++) {\n  while (!dq.empty() && dq.front() <= i - k) dq.pop_front();\n  while (!dq.empty() && arr[dq.back()] <= arr[i]) dq.pop_back();\n  dq.push_back(i);\n  if (i >= k - 1) result.push_back(arr[dq.front()]);\n}",
    solution_template: "#include <iostream>\n#include <deque>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // deque-based sliding window max\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "max-points-from-cards",
    title: "Maximum Points You Can Obtain from Cards",
    category: "sliding-window",
    difficulty: "medium",
    description: "Max sum by picking k cards from either end of the array.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"7\n1 2 3 4 5 6 1\n3","output":"12","explanation":"Pick 6, 1 from right and 5 from left -> 6+1+5=12"}
    ],
    test_cases: [
      {"input":"7\n1 2 3 4 5 6 1\n3","expected":"12"}
    ],
    approach: `This problem asks for the maximum sum obtainable by picking exactly k elements from either end of an array (you cannot pick from the middle without also taking elements closer to the ends). A brute force tries all combinations of left and right picks (O(k)), which is actually O(k) in the simplest implementation. But the elegant approach uses a sliding window: instead of picking k from ends, think of it as finding the minimum sum subarray of size n-k in the middle (we discard n-k elements). The total sum - minMiddleSum gives us the maximum end-pick sum. Alternatively, the direct approach: take all k from the left initially (sum of first k), then try replacing one from the left with one from the right, tracking the maximum.

Diagram:
max-points-from-cards:
  arr = [1, 2, 3, 4, 5, 6, 1], k = 3
  
  All left:          [1,2,3]-,-,-,-   sum=6   max=6
  Replace 1 left:    -,[2,3]-,-,-,[1] sum=6   max=6
  Replace 2 left:    -,-,[3]-,-,[6,1] sum=10  max=10
  Replace 3 left:    -,-,-,-,[5,6,1]  sum=12  max=12
  
  Result: 12`,
    complexity: {"time":"O(k)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Maximum Points You Can Obtain from Cards\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Hackos",
    solution_code: "int total = 0, windowSum = 0;\nfor (int i = 0; i < k; i++) windowSum += arr[i];\nint maxSum = windowSum;\nfor (int i = 0; i < k; i++) {\n  windowSum = windowSum - arr[k-1-i] + arr[n-1-i];\n  maxSum = max(maxSum, windowSum);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // sliding window from ends\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "min-flips-ones",
    title: "Minimum K Consecutive Bit Flips",
    category: "sliding-window",
    difficulty: "hard",
    description: "Find minimum flips to turn all bits to 1 using k-length flips.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"8\n0 1 0\n1","output":"2","explanation":"Flip [0,0] and [2,2] -> [1,1,1]"}
    ],
    test_cases: [
      {"input":"8\n0 1 0\n1","expected":"2"}
    ],
    approach: `This problem asks for the minimum number of k-length subarray flips (0->1, 1->0) needed to make all bits 1. This is a greedy sliding window problem. We maintain a variable 'flipped' that tracks the current flip state at position i (whether the current bit has been flipped an odd number of times by previous operations). We also use a boolean array 'isFlipped' or a queue to track where flips occur. When we encounter a position i where (arr[i] + flipped) % 2 == 0 (i.e., the effective value is 0), we need to flip a k-length window starting at i. Increment the flip count, set isFlipped[i] = true, and toggle flipped. When i moves past k, if isFlipped[i-k] was flipped, we toggle flipped back. If a flip cannot be completed because i + k > n, return -1.

Diagram:
min-flips-ones:
  arr = [0, 1, 0], k = 1
  
  i=0: arr[0]=0, flipped=0, effective=0 -> flip! flipCount=1, isFlipped[0]=1, flipped=1
  i=1: arr[1]=1, flipped=1, effective=0 (1+1)%2=0 -> flip! flipCount=2, isFlipped[1]=1, flipped=0
  i=2: arr[2]=0, flipped=0, effective=0 -> flip! flipCount=3, isFlipped[2]=1, flipped=1
  
  Result: 2? Wait, k=1, so each flip just toggles one position. Actually with k=1:
  flip position 0: [1,1,0]
  flip position 2: [1,1,1]
  2 flips. Correct.`,
    complexity: {"time":"O(n)","space":"O(k)"},
    mermaid: "flowchart TD\n  A[\"Minimum K Consecutive Bit Flips\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Hackos",
    solution_code: "int flips = 0, flipped = 0;\nvector<bool> isFlipped(n, false);\nfor (int i = 0; i < n; i++) {\n  if (i >= k && isFlipped[i-k]) flipped ^= 1;\n  if ((arr[i] + flipped) % 2 == 0) {\n    if (i + k > n) return -1;\n    flips++;\n    isFlipped[i] = true;\n    flipped ^= 1;\n  }\n}",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // greedy sliding window\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "max-vowels",
    title: "Maximum Number of Vowels in a Substring of Given Length",
    category: "sliding-window",
    difficulty: "medium",
    description: "Find max number of vowels in any substring of length k.",
    constraints: "1 <= |s| <= 10^5, 1 <= k <= |s|",
    examples: [
      {"input":"abciiidef\n3","output":"3","explanation":"\"iii\" has 3 vowels"}
    ],
    test_cases: [
      {"input":"abciiidef\n3","expected":"3"}
    ],
    approach: `This problem asks for the maximum number of vowels (a, e, i, o, u) in any contiguous substring of length k. This is a straightforward fixed-size sliding window. We maintain a vowel count for the current window. As we slide the window, we add 1 if the new character is a vowel, and subtract 1 if the character exiting the window is a vowel. We track the maximum vowel count seen.

Diagram:
max-vowels:
  s = "abciiidef", k = 3
  isVowel: a=Y b=N c=N i=Y i=Y i=Y d=N e=Y f=N
  
  Window [0..2]: "abc" vowels=1 max=1
  Window [1..3]: "bci" vowels=1 max=1
  Window [2..4]: "cii" vowels=2 max=2
  Window [3..5]: "iii" vowels=3 max=3
  Window [4..6]: "iid" vowels=2 max=3
  Window [5..7]: "ide" vowels=2 max=3
  Window [6..8]: "def" vowels=1 max=3
  
  Result: 3`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Maximum Number of Vowels in a Substring of Given Length\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Love Babbar 450",
    solution_code: "auto isVowel = [](char c) { return c=='a'||c=='e'||c=='i'||c=='o'||c=='u'; };\nint count = 0, maxCount = 0;\nfor (int i = 0; i < s.size(); i++) {\n  if (isVowel(s[i])) count++;\n  if (i >= k && isVowel(s[i-k])) count--;\n  if (i >= k-1) maxCount = max(maxCount, count);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s; int k; cin >> s >> k;\n  // sliding window vowel count\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "longest-turbulent-arr",
    title: "Longest Turbulent Subarray",
    category: "sliding-window",
    difficulty: "medium",
    description: "Find longest subarray with alternating increasing/decreasing pattern.",
    constraints: "1 <= n <= 10^5, 1 <= arr[i] <= 10^9",
    examples: [
      {"input":"8\n9 4 2 10 7 8 8 1 9","output":"5","explanation":"[4,2,10,7,8] has alternating pattern"}
    ],
    test_cases: [
      {"input":"8\n9 4 2 10 7 8 8 1 9","expected":"5"}
    ],
    approach: `This problem asks for the longest subarray where the comparison sign between consecutive elements alternates (i.e., arr[i] > arr[i+1] < arr[i+2] > arr[i+3] < ... or the opposite). A brute force checks every subarray (O(n^2)). The sliding window approach maintains a window that satisfies the turbulent property. We use a variable 'sign' to track the expected direction. As we expand right, we check if the current pair (arr[right-1], arr[right]) follows the expected sign. If not, we reset left to right-1 or adjust. The trick is to track the running length of the turbulent pattern: if arr[i] == arr[i-1], reset to 1; otherwise if the pattern alternates (arr[i] > arr[i-1] and arr[i-1] < arr[i-2]) or (arr[i] < arr[i-1] and arr[i-1] > arr[i-2]), increment length; else set length to 2.

Diagram:
longest-turbulent-arr:
  arr = [9, 4, 2, 10, 7, 8, 8, 1, 9]
  Comparison: [9>4] [4>2] [2<10] [10>7] [7<8] [8==8] [8>1] [1<9]
  
  i=0: [9]           len=1  max=1
  i=1: [9,4]         len=2  max=2  (9>4)
  i=2: [9,4,2]       len=2  max=2  (4>2 same dir as 9>4, not turbulent)
  i=2: reset: [4,2]  len=2  max=2
  i=3: [4,2,10]      len=3  max=3  (2<10 alt)
  i=4: [4,2,10,7]    len=4  max=4  (10>7 alt)
  i=5: [4,2,10,7,8]  len=5  max=5  (7<8 alt)
  i=6: [7,8,8]       len=2  max=5  (8==8 reset)
  i=7: [8,8,1]       len=2  max=5  (reset)
  i=8: [8,1,9]       len=3  max=5  (1<9 alt)
  
  Result: 5`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Longest Turbulent Subarray\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Hackos",
    solution_code: "int maxLen = 1, curLen = 1;\nfor (int i = 1; i < n; i++) {\n  if (arr[i] > arr[i-1]) {\n    if (i == 1 || arr[i-1] < arr[i-2]) curLen++;\n    else curLen = 2;\n  } else if (arr[i] < arr[i-1]) {\n    if (i == 1 || arr[i-1] > arr[i-2]) curLen++;\n    else curLen = 2;\n  } else curLen = 1;\n  maxLen = max(maxLen, curLen);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sliding window turbulent\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "longest-subarray-after-delete",
    title: "Longest Subarray of 1's After Deleting One Element",
    category: "sliding-window",
    difficulty: "medium",
    description: "Find longest subarray of 1s after deleting exactly one element.",
    constraints: "1 <= n <= 10^5, arr[i] in {0,1}",
    examples: [
      {"input":"9\n1 1 0 1 1 1 0 1 1","output":"5","explanation":"Delete the 0 at index 6 -> subarray [1,1,1,1,1] of length 5"}
    ],
    test_cases: [
      {"input":"9\n1 1 0 1 1 1 0 1 1","expected":"5"}
    ],
    approach: `This problem asks for the longest subarray containing only 1s after deleting exactly one element (any element). It is equivalent to finding the longest window that contains at most one zero. We use a sliding window with a zeroCount. When zeroCount exceeds 1, we shrink from the left until zeroCount is at most 1. Then we update maxLen as the current window length. Note: we must delete exactly one element, so the answer is the max window length minus 1 (since we exclude that zero or we count the subarray after deletion). Actually, the window itself can contain at most 1 zero, and the resulting subarray length is window length - 1 (we delete the zero). If there are no zeros in the window, we still delete one element (any), so length = window length - 1.

Diagram:
longest-subarray-after-delete:
  arr = [1, 1, 0, 1, 1, 1, 0, 1, 1]
  
  Window [0..1]: [1,1]          zeros=0  windowLen=2  maxAfterDel=1
  Window [0..2]: [1,1,0]        zeros=1  windowLen=3  maxAfterDel=2
  Window [0..3]: [1,1,0,1]      zeros=1  windowLen=4  maxAfterDel=3
  Window [0..4]: [1,1,0,1,1]    zeros=1  windowLen=5  maxAfterDel=4
  Window [0..5]: [1,1,0,1,1,1]  zeros=1  windowLen=6  maxAfterDel=5
  Window [0..6]: [1,1,0,1,1,1,0] zeros=2 shrink-> [1..6]: zeros=2 shrink-> [2..6]: zeros=1 windowLen=5 maxAfterDel=4
  Window [2..7]: [0,1,1,1,0,1]  zeros=2 shrink-> [3..7]: zeros=1 windowLen=5 maxAfterDel=4
  Window [3..8]: [1,1,1,0,1,1]  zeros=1 windowLen=6 maxAfterDel=5
  
  Result: 5`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Longest Subarray of 1's After Deleting One Element\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Hackos",
    solution_code: "int left = 0, zeroCount = 0, maxLen = 0;\nfor (int right = 0; right < n; right++) {\n  if (arr[right] == 0) zeroCount++;\n  while (zeroCount > 1) if (arr[left++] == 0) zeroCount--;\n  maxLen = max(maxLen, right - left); // we delete one element\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sliding window at most 1 zero\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "sliding-window-median",
    title: "Sliding Window Median",
    category: "sliding-window",
    difficulty: "hard",
    description: "Find median of every sliding window of size k.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n, |arr[i]| <= 10^9",
    examples: [
      {"input":"8\n1 3 -1 -3 5 3 6 7\n3","output":"1 -1 -1 3 3 6","explanation":"Medians of windows: [1,3,-1]=1, [3,-1,-3]=-1, ..."}
    ],
    test_cases: [
      {"input":"8\n1 3 -1 -3 5 3 6 7\n3","expected":"1 -1 -1 3 3 6"}
    ],
    approach: `This problem asks for the median of each contiguous subarray of size k. Unlike Sliding Window Maximum, we need the middle element(s) of a sorted window, which requires a data structure that supports insertion, deletion, and order statistics. The optimal approach uses two multisets (or two heaps): a max-heap for the smaller half and a min-heap for the larger half, maintaining balance so that the heaps differ by at most 1 element. As the window slides, we add the new element to the appropriate heap, rebalance, remove the outgoing element (lazy deletion or direct), and compute the median from the tops of the heaps.

Diagram:
sliding-window-median:
  arr = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
  
  Window [0..2]: [1,3,-1] sorted=[-1,1,3] median=1
  Window [1..3]: [3,-1,-3] sorted=[-3,-1,3] median=-1
  Window [2..4]: [-1,-3,5] sorted=[-3,-1,5] median=-1
  Window [3..5]: [-3,5,3] sorted=[-3,3,5] median=3
  Window [4..6]: [5,3,6] sorted=[3,5,6] median=5
  Window [5..7]: [3,6,7] sorted=[3,6,7] median=6
  
  Result: [1, -1, -1, 3, 3, 6]`,
    complexity: {"time":"O(n log k)","space":"O(k)"},
    mermaid: "flowchart TD\n  A[\"Sliding Window Median\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Hackos",
    solution_code: "vector<double> result;\nmultiset<int> window(arr, arr + k);\nauto mid = next(window.begin(), k/2);\nfor (int i = k; ; i++) {\n  result.push_back(k % 2 ? *mid : (*prev(mid) + *mid) / 2.0);\n  if (i == n) break;\n  window.insert(arr[i]);\n  if (arr[i] < *mid) mid--;\n  if (arr[i-k] <= *mid) mid++;\n  window.erase(window.lower_bound(arr[i-k]));\n}",
    solution_template: "#include <iostream>\n#include <vector>\n#include <set>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // sliding window median using multiset\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "subarrays-k-distinct",
    title: "Subarrays with K Different Integers",
    category: "sliding-window",
    difficulty: "hard",
    description: "Count subarrays with exactly k distinct integers.",
    constraints: "1 <= n <= 10^5, 0 <= k <= n, 1 <= arr[i] <= n",
    examples: [
      {"input":"5\n1 2 1 2 3\n2","output":"7","explanation":"7 subarrays with exactly 2 distinct integers"}
    ],
    test_cases: [
      {"input":"5\n1 2 1 2 3\n2","expected":"7"}
    ],
    approach: `This problem asks for the number of contiguous subarrays that contain exactly k distinct integers. Similar to the nice subarrays problem, we use the atMost trick: exactly(k) = atMost(k) - atMost(k-1). The atMost(x) function uses a sliding window with a frequency map to count subarrays with at most x distinct elements. For each right, we expand, and while distinct > x, shrink from left. Then add right - left + 1 to the total (all subarrays ending at right with at most x distinct elements).

Diagram:
subarrays-k-distinct:
  arr = [1, 2, 1, 2, 3], k = 2
  atMost(2) - atMost(1) = ?
  
  atMost(2):
  [0..0]: [1]         distinct=1 total+=1 =>1
  [0..1]: [1,2]       distinct=2 total+=2 =>3
  [0..2]: [1,2,1]     distinct=2 total+=3 =>6
  [0..3]: [1,2,1,2]   distinct=2 total+=4 =>10
  [0..4]: [1,2,1,2,3] distinct=3 shrink->[1..4]: distinct=3 shrink->[2..4]: distinct=2 total+=3 =>13
  atMost(2)=13
  
  atMost(1):
  [0..0]: [1]         distinct=1 total+=1 =>1
  [0..1]: [1,2]       distinct=2 shrink->[1..1]: distinct=1 total+=1 =>2
  [1..2]: [2,1]       distinct=2 shrink->[2..2]: distinct=1 total+=1 =>3
  [2..3]: [1,2]       distinct=2 shrink->[3..3]: distinct=1 total+=1 =>4
  [3..4]: [2,3]       distinct=2 shrink->[4..4]: distinct=1 total+=1 =>5
  atMost(1)=5
  
  Result: 13-5 = 7`,
    complexity: {"time":"O(n)","space":"O(n)"},
    mermaid: "flowchart TD\n  A[\"Subarrays with K Different Integers\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Striver A2Z",
    solution_code: "auto atMost = [&](int x) {\n  if (x < 0) return 0;\n  unordered_map<int,int> freq;\n  int left = 0, distinct = 0, total = 0;\n  for (int right = 0; right < n; right++) {\n    if (freq[arr[right]]++ == 0) distinct++;\n    while (distinct > x) if (--freq[arr[left++]] == 0) distinct--;\n    total += right - left + 1;\n  }\n  return total;\n};\nreturn atMost(k) - atMost(k-1);",
    solution_template: "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // sliding window + atMost\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "longest-nice-subarray",
    title: "Longest Nice Subarray",
    category: "sliding-window",
    difficulty: "medium",
    description: "Find longest subarray where bitwise AND of any two elements is 0.",
    constraints: "1 <= n <= 10^5, 1 <= arr[i] <= 10^9",
    examples: [
      {"input":"5\n1 3 8 48 10","output":"3","explanation":"[3,8,48] has pairwise AND=0: 3&8=0, 3&48=0, 8&48=0"}
    ],
    test_cases: [
      {"input":"5\n1 3 8 48 10","expected":"3"}
    ],
    approach: `This problem asks for the longest subarray where the bitwise AND of any two distinct elements is 0. This condition means that no two elements in the subarray share a set bit position. Equivalently, the bitwise OR of all elements in the subarray must have no overlapping bits: for each new element arr[right], if (currentOR & arr[right]) != 0, it shares a bit with an existing element, violating the condition. We use a sliding window: maintain currentOR of the window. When a new element causes a conflict (currentOR & arr[right] != 0), shrink from the left: XOR arr[left] from currentOR (using careful bit removal) or recompute. Actually, removing a single element's bits from an OR is tricky since bits may be shared. The best approach: while (currentOR & arr[right]) != 0, remove arr[left] by recomputing OR from scratch or use a frequency count per bit.

Diagram:
longest-nice-subarray:
  arr = [1, 3, 8, 48, 10]
  bits: 1=0001, 3=0011, 8=1000, 48=110000, 10=1010
  
  Window [0..0]: [1]       OR=0001  nice  maxLen=1
  Window [0..1]: [1,3]     OR=0011  nice (1&3=0) maxLen=2
  Window [0..2]: [1,3,8]   OR=1011  nice (all pairwise AND=0) maxLen=3
  Window [0..3]: [1,3,8,48] OR=111011 check: 48&3=0? 48=110000, 3=000011 -> 0 yes. 48&1=0 yes. 48&8=0? 48=110000, 8=001000 -> 0 yes. But OR has many bits. Actually 48&8=0 since bits don't overlap. All pairwise AND=0, so len=4? Wait let's check: 48=110000 (bits 4 and 5), 8=001000 (bit 3), 3=000011 (bits 0,1), 1=000001 (bit 0). 1&3=1 (overlap bit 0)! So [1,3,8,48] is NOT nice. Correct max is 3.
  Window [3..5]: [8,48,10] 8&48=0, 8&10=0? 8=1000, 10=1010 -> 1000&1010=1000 -> NOT 0. So not nice.
  Window [1..3]: [3,8,48] 3&8=0, 3&48=0, 8&48=0 -> nice! len=3 max=3
  
  Result: 3`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Longest Nice Subarray\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Hackos",
    solution_code: "int left = 0, windowOR = 0, maxLen = 0;\nfor (int right = 0; right < n; right++) {\n  while ((windowOR & arr[right]) != 0) {\n    windowOR ^= arr[left++]; // this simplified approach works when we track per-bit counts\n  }\n  windowOR |= arr[right];\n  maxLen = max(maxLen, right - left + 1);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sliding window + bitwise OR\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "diet-plan-performance",
    title: "Diet Plan Performance",
    category: "sliding-window",
    difficulty: "easy",
    description: "Count k-length subarrays where sum is below lower or above upper.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n, 0 <= calories[i] <= 10^4",
    examples: [
      {"input":"5\n1 2 3 4 5\n3\n3\n4","output":"2","explanation":"[1,2,3] sum=6 >4 (+1), [2,3,4] sum=9 >4 (+1), [3,4,5] sum=12 >4 (+1) = 3? Actually needs lower=3, upper=4: [1,2,3]=6>4 (+1), [2,3,4]=9>4 (+1), [3,4,5]=12>4 (+1) = total 3"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5\n3\n3\n4","expected":"3"}
    ],
    approach: `This problem asks for the total points earned over all k-length subarrays. For each window, if the sum is less than lower, we lose 1 point. If greater than upper, we gain 1 point. Otherwise, no change. This is a simple fixed-size sliding window where we maintain the running sum, update it as we slide, and check the conditions.

Diagram:
diet-plan-performance:
  calories = [1, 2, 3, 4, 5], k = 3, lower = 3, upper = 4
  
  Window [0..2]: [1,2,3] sum=6 >4  +1  points=1
  Window [1..3]: [2,3,4] sum=9 >4  +1  points=2
  Window [2..4]: [3,4,5] sum=12 >4 +1  points=3
  
  Result: 3`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Diet Plan Performance\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Hackos",
    solution_code: "int windowSum = 0, points = 0;\nfor (int i = 0; i < k; i++) windowSum += calories[i];\nif (windowSum < lower) points--; else if (windowSum > upper) points++;\nfor (int i = k; i < n; i++) {\n  windowSum += calories[i] - calories[i-k];\n  if (windowSum < lower) points--; else if (windowSum > upper) points++;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, k, lower, upper; cin >> n;\n  int calories[n]; for (int i = 0; i < n; i++) cin >> calories[i];\n  cin >> k >> lower >> upper;\n  // sliding window\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
  {
    id: "longest-continuous-increasing",
    title: "Longest Continuous Increasing Subsequence",
    category: "sliding-window",
    difficulty: "easy",
    description: "Find longest strictly increasing contiguous subarray.",
    constraints: "1 <= n <= 10^5, 1 <= arr[i] <= 10^9",
    examples: [
      {"input":"8\n1 3 5 4 7 8 9 2","output":"4","explanation":"[4,7,8,9] is longest increasing"}
    ],
    test_cases: [
      {"input":"8\n1 3 5 4 7 8 9 2","expected":"4"}
    ],
    approach: `This problem asks for the longest contiguous subarray where each element is strictly greater than the previous one. This is a simple sliding window (or two-pointer) problem. We maintain a running length that increments when arr[i] > arr[i-1], and resets to 1 otherwise. At each step, update the maximum length.

Diagram:
longest-continuous-increasing:
  arr = [1, 3, 5, 4, 7, 8, 9, 2]
  
  i=0: [1]       len=1  max=1
  i=1: [1,3]     len=2  max=2  (3>1)
  i=2: [1,3,5]   len=3  max=3  (5>3)
  i=3: [3,5,4]   len=1  max=3  (4<5, reset)
  i=4: [4,7]     len=2  max=3  (7>4)
  i=5: [4,7,8]   len=3  max=3  (8>7)
  i=6: [4,7,8,9] len=4  max=4  (9>8)
  i=7: [9,2]     len=1  max=4  (2<9, reset)
  
  Result: 4`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Longest Continuous Increasing Subsequence\"] --> B[\"left=0, right=0\"]\n  B --> C{\"right < n?\"}\n  C -->|Yes| D[\"Expand: add arr[right]\"]\n  D --> E{\"Window valid?\"}\n  E -->|No| F[\"right++\"]\n  E -->|Yes| G[\"Update answer\"]\n  G --> H[\"Shrink: left++, remove arr[left]\"]\n  H --> E\n  F --> C\n  C -->|No| I[\"Return answer\"]",
    sheet: "Love Babbar 450",
    solution_code: "int maxLen = 1, curLen = 1;\nfor (int i = 1; i < n; i++) {\n  if (arr[i] > arr[i-1]) curLen++;\n  else curLen = 1;\n  maxLen = max(maxLen, curLen);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sliding window\n  return 0;\n}",
    techniques: ["sliding-window"],
  },
];
