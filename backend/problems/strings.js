export default [
  {
    id: "rev-string",
    title: "Reverse a String",
    category: "strings",
    difficulty: "easy",
    description: "Reverse the given string in-place.",
    constraints: "1 <= |s| <= 10^5",
    examples: [{"input":"hello","output":"olleh"}],
    test_cases: [{"input":"hello","expected":"olleh"},{"input":"world","expected":"dlrow"}],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // reverse s in-place\n\n  cout << s << endl;\n  return 0;\n}",
    approach: "The problem asks to reverse a given string in-place without using any extra space, meaning the reversal must occur within the original array. A brute-force approach would create a new string and copy characters in reverse order, which requires O(n) extra memory and violates the in-place constraint. The optimal approach uses two pointers: initialize one pointer i at the start (index 0) and another j at the end (index n-1) of the string. While i is less than j, swap the characters at positions i and j, then increment i and decrement j by one. This process continues until the pointers meet at the center, at which point the entire string has been reversed. Each swap places a single character in its mirrored position across the center. For example, with input 'hello', start with i=0 pointing to 'h' and j=4 pointing to 'o': swapping yields 'oellh'. Next, i=1 pointing to 'e' and j=3 pointing to 'l': swapping yields 'olleh'. Now i=2 and j=2, pointers have crossed, so the loop ends and the result is 'olleh'. Edge cases include a string of length 0 or 1, where the condition i < j is immediately false, so the string remains unchanged without any swaps. Time complexity is O(n) because each element is visited exactly once during the swap operation, and space complexity is O(1) as we only use two integer pointer variables and a temporary variable for swapping.\n\nDiagram:\n```\nrev-string:\n  s = ['h','e','l','l','o']\n      ↑                 ↑\n    left=0            right=4\n  swap → ['o','e','l','l','h']\n           ↑            ↑\n         left=1       right=3\n  swap → ['o','l','l','e','h']\n              ↑↑\n           left=2, right=2 → stop\n  Result: \"olleh\"\n```",
    complexity: {"time":"O(n)","space":"O(1)"},
    techniques: ["two-pointers"],
    sheet: "Love Babbar 450",
    solution_code: "int i=0,j=s.size()-1; while(i<j)swap(s[i++],s[j--]); cout<<s;",
  },
  {
    id: "palindrome-string",
    title: "Check Palindrome String",
    category: "strings",
    difficulty: "easy",
    description: "Given a string, check if it is a palindrome.",
    constraints: "1 <= |s| <= 10^5",
    examples: [{"input":"racecar","output":"Yes"}],
    test_cases: [{"input":"racecar","expected":"Yes"},{"input":"hello","expected":"No"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // two-pointer check\n\n  cout << (isPalindrome ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "The problem is to determine whether a given string reads the same forwards and backwards, meaning it is a palindrome. A naive approach would reverse the string completely and then compare it to the original, which requires O(n) extra space and two full passes over the data. The optimal approach uses two pointers: one positioned at the start (left) and the other at the end (right) of the string. While the left pointer is less than the right pointer, compare the characters at these two positions. If the characters differ, the string is immediately not a palindrome and we return false. If they match, move the left pointer one step to the right and the right pointer one step to the left, continuing the comparison inward. If the loop completes without finding any mismatch, the string is a palindrome. For example, with 'racecar', start with left=0 ('r') and right=6 ('r'): match, then left=1 ('a') and right=5 ('a'): match, then left=2 ('c') and right=4 ('c'): match, then left=3 and right=3 causes the loop to exit, confirming it is a palindrome. For 'hello', left=0 ('h') and right=4 ('o') already differ at the first comparison, so it returns false immediately. Edge cases include an empty string which is trivially a palindrome, and single-character strings which are always palindromes since there are no opposing pairs to compare. Time complexity is O(n) with a single pass traversing at most half the string, and space complexity is O(1) since only two integer pointer variables are needed.\n\nDiagram:\n```\npalindrome-check:\n  s = \"racecar\"\n  Step 1:  ↑           ↑\n          left=0      right=6\n          s[0]='r' == s[6]='r' ✓\n  Step 2:   ↑        ↑\n          left=1     right=5\n          s[1]='a' == s[5]='a' ✓\n  Step 3:    ↑     ↑\n          left=2  right=4\n          s[2]='c' == s[4]='c' ✓\n  Step 4:     ↑↑\n          left=3, right=3 → cross, stop\n  Result: \"Yes\" (palindrome)\n```",
    complexity: {"time":"O(n)","space":"O(1)"},
    techniques: ["two-pointers"],
    sheet: "Love Babbar 450",
    solution_code: "int i=0,j=s.size()-1; while(i<j)if(s[i++]!=s[j--]){cout<<\"No\";return 0;}cout<<\"Yes\";",
  },
  {
    id: "anagram",
    title: "Valid Anagram",
    category: "strings",
    difficulty: "easy",
    description: "Check if two strings are anagrams of each other.",
    constraints: "1 <= |s|,|t| <= 10^5",
    examples: [{"input":"anagram nagaram","output":"Yes"}],
    test_cases: [{"input":"anagram nagaram","expected":"Yes"},{"input":"cat rat","expected":"No"}],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string s, t;\n  cin >> s >> t;\n\n  // character count\n\n  cout << (isAnagram ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "An anagram is formed by rearranging the letters of one word to form another, meaning both strings must contain identical characters with identical frequencies. A brute-force method would sort both strings and compare them lexicographically, which costs O(n log n) time and O(n) space for the sorted copies. The optimal approach leverages the constraint that input strings consist only of lowercase English letters, allowing us to use a fixed-size frequency array of 26 integers initialized to zero. First, iterate through the first string and increment the count at index (c - 'a') for each character c, mapping 'a' to index 0, 'b' to index 1, and so on. Next, iterate through the second string and decrement the corresponding count for each character. Finally, check all 26 entries in the frequency array. If every entry is exactly zero, the strings have identical character frequencies and are anagrams; otherwise they are not. For 'anagram' and 'nagaram', each letter's increments and decrements balance perfectly to zero. For 'cat' and 'rat', after processing, the count for 'c' will be 1 and for 'r' will be -1, indicating they are not anagrams. Edge cases include strings of different lengths, which can never be anagrams and should return false immediately without further processing. Time complexity is O(n) for the two linear passes, and space complexity is O(1) because the frequency array occupies constant memory regardless of input size.\n\nDiagram:\n```\nvalid-anagram:\n  s = \"anagram\", t = \"nagaram\"\n  freq array [26] initialized to 0\n\n  Pass 1 (count s):\n    a→1 n→1 a→2 g→1 r→1 a→3 m→1\n  Pass 2 (decrement t):\n    n→0 a→2 g→0 a→1 r→0 a→0 m→0\n  Final check:\n    all 26 entries = 0 → anagram ✓\n```",
    complexity: {"time":"O(n)","space":"O(1)"},
    techniques: ["prefix-sum"],
    sheet: "Love Babbar 450",
    solution_code: "int cnt[26]={0}; for(char c:s)cnt[c-'a']++; for(char c:t)cnt[c-'a']--; for(int i=0;i<26;i++)if(cnt[i]!=0){cout<<\"No\";return 0;}cout<<\"Yes\";",
  },
  {
    id: "first-non-repeat",
    title: "First Non-Repeating Character",
    category: "strings",
    difficulty: "easy",
    description: "Find the first non-repeating character in a string.",
    constraints: "1 <= |s| <= 10^5",
    examples: [{"input":"geeksforgeeks","output":"f"}],
    test_cases: [{"input":"geeksforgeeks","expected":"f"},{"input":"aabbcc","expected":"-"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // frequency array\n\n  cout << result << endl;\n  return 0;\n}",
    approach: "We need to find the first character in a string that does not repeat anywhere else in the entire string, returning a sentinel like '-' if every character repeats. A naive approach would take each character and scan the rest of the string to check for a duplicate, which leads to O(n^2) time. The optimal approach uses two linear passes with a frequency map. In the first pass, iterate through the string and record the frequency of every character in a hash map or an integer array of size 256 covering the full ASCII range. This pass counts how many times each character appears across the entire string. In the second pass, iterate through the string again in the original order, and for each character consult its frequency count from the map. The very first character whose frequency is exactly 1 is the first non-repeating character and should be returned immediately. If the second pass completes without finding any character with count exactly 1, return the sentinel '-'. For 'geeksforgeeks', the first pass builds frequencies: g appears 2 times, e appears 4 times, k appears 2 times, s appears 2 times, f appears 1 time, o appears 1 time, r appears 1 time. In the second pass, g (count 2) is skipped, e (count 4) is skipped, e is skipped again, k (count 2) is skipped, s (count 2) is skipped, and then f (count 1) is found and returned. Edge cases include an empty string returning '-', and strings like 'aabbcc' where all characters repeat, also returning '-'. Time complexity is O(n) for the two combined passes, and space is O(1) since the frequency array has a fixed size of 256.\n\nDiagram:\n```\nfirst-non-repeating:\n  s = \"geeksforgeeks\"\n\n  Pass 1 - Frequency:\n    g:2  e:4  k:2  s:2  f:1  o:1  r:1\n\n  Pass 2 - Scan in order:\n    g (2) → skip\n    e (4) → skip\n    e (4) → skip\n    k (2) → skip\n    s (2) → skip\n    f (1) → FOUND! Return 'f'\n\n  Result: 'f'\n```",
    complexity: {"time":"O(n)","space":"O(1)"},
    techniques: ["prefix-sum"],
    sheet: "Love Babbar 450",
    solution_code: "int cnt[256]={0}; for(char c:s)cnt[c]++; for(char c:s)if(cnt[c]==1){cout<<c;return 0;}cout<<'-';",
  },
  {
    id: "longest-substr-no-repeat",
    title: "Longest Substring Without Repeating Characters",
    category: "strings",
    difficulty: "medium",
    description: "Find the length of the longest substring without repeating characters.",
    constraints: "1 <= |s| <= 10^5",
    examples: [{"input":"abcabcbb","output":"3","explanation":"abc"}],
    test_cases: [{"input":"abcabcbb","expected":"3"},{"input":"bbbbb","expected":"1"},{"input":"pwwkew","expected":"3"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // sliding window + last index map\n\n  cout << maxLen << endl;\n  return 0;\n}",
    approach: "The goal is to find the maximum length of a contiguous substring that contains no repeating characters. A brute-force approach would generate every possible substring and check each for uniqueness, resulting in O(n^3) or O(n^2) time, which is infeasible for n up to 10^5. The optimal approach employs a sliding window maintained by two pointers (left and right) combined with a hash map that stores the most recent index at which each character was seen. Start with both left and right at 0, and a variable maxLen initialized to 0. Expand the right pointer one position at a time, adding the character at that position to the window. Before adding, check whether the current character has been seen before by looking up its last index in the map. If it has been seen and its last occurrence is at or after the left pointer, a duplicate exists inside the current window, so move the left pointer to one position right of the previous occurrence, effectively removing the duplicate from the window. Update the last seen index of the current character to the current right position. At each step, compute the current window length as right minus left plus one, and update maxLen if this is larger. For 'abcabcbb', the window grows to 'abc' length 3, then at right=3 encountering 'a', the previous 'a' was at index 0 which is at left=0, so left moves to 1; the window becomes 'bca', still length 3. This pattern continues, yielding a maximum of 3. For 'bbbbb', each new 'b' causes left to jump to the previous position plus one, so the window never exceeds length 1. Edge cases include an empty string returning 0, and strings with all unique characters where the window simply grows to the full string length. Time complexity is O(n) because each character is processed at most twice (once when right expands past it and once when left moves past it), and space is O(1) for a fixed-size map of 256 ASCII characters.\n\nDiagram:\n```\nlongest-substring-no-repeat:\n  s = \"abcabcbb\"\n  Step 1: [a]          l=0,r=0  len=1  max=1\n  Step 2: [a b]        l=0,r=1  len=2  max=2\n  Step 3: [a b c]      l=0,r=2  len=3  max=3\n  Step 4: a[b c a]     l=1,r=3  len=3  (prev 'a' at 0, move l→1)\n  Step 5: ab[c a b]    l=2,r=4  len=3  (prev 'b' at 1, move l→2)\n  Step 6: abc[a b c]   l=3,r=5  len=3  (prev 'c' at 2, move l→3)\n  Step 7: abca[b c b]  l=4,r=6  'b' at l=4 → len=2\n  Step 8: abcab[c b b] l=5,r=7  'c' at l=5 → len=2\n  Max length = 3\n```",
    complexity: {"time":"O(n)","space":"O(n)"},
    techniques: ["sliding-window"],
    sheet: "Striver A2Z",
    solution_code: "int last[256]; memset(last,-1,sizeof(last)); int l=0,mx=0; for(int r=0;r<s.size();r++){if(last[s[r]]>=l)l=last[s[r]]+1;last[s[r]]=r;mx=max(mx,r-l+1);}cout<<mx;",
  },
  {
    id: "longest-substr-no-repeat",
    title: "Longest Substring Without Repeating Characters",
    category: "strings",
    difficulty: "medium",
    description: "Find the length of the longest substring without repeating characters.",
    constraints: "1 <= |s| <= 10^5",
    examples: [
      {"input":"abcabcbb","output":"3","explanation":"abc"}
    ],
    test_cases: [
      {"input":"abcabcbb","expected":"3"},
      {"input":"bbbbb","expected":"1"},
      {"input":"pwwkew","expected":"3"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // sliding window + last index map\n\n  cout << maxLen << endl;\n  return 0;\n}",
    approach: "Sliding window with last index map. Expand right, shrink left when duplicate found.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "int last[256]; memset(last,-1,sizeof(last)); int l=0,mx=0; for(int r=0;r<s.size();r++){if(last[s[r]]>=l)l=last[s[r]]+1;last[s[r]]=r;mx=max(mx,r-l+1);}cout<<mx;",
  },
  {
    id: "lcp",
    title: "Longest Common Prefix",
    category: "strings",
    difficulty: "easy",
    description: "Find the longest common prefix among an array of strings.",
    constraints: "1 <= n <= 200, 1 <= |s| <= 200",
    examples: [
      {"input":"3\nflower flow flight","output":"fl"}
    ],
    test_cases: [
      {"input":"3\nflower flow flight","expected":"fl"},
      {"input":"3\ndog racecar car","expected":""}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  string strs[n];\n  for (int i = 0; i < n; i++) cin >> strs[i];\n\n  // compare first string with others\n\n  cout << prefix << endl;\n  return 0;\n}",
    approach: "Compare first string with each other string, character by character, shortening prefix when mismatch found.",
    complexity: {"time":"O(n * minLen)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "if(n==0){cout<<\"\";return 0;} string p=strs[0]; for(int i=1;i<n;i++){int j=0;while(j<p.size()&&j<strs[i].size()&&p[j]==strs[i][j])j++;p=p.substr(0,j);}cout<<p;",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    category: "strings",
    difficulty: "easy",
    description: "Check if string of brackets is valid.",
    constraints: "1 <= |s| <= 10^4",
    examples: [
      {"input":"()[]{}","output":"Yes"}
    ],
    test_cases: [
      {"input":"()[]{}","expected":"Yes"},
      {"input":"(]","expected":"No"}
    ],
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  stack<char> st;\n\n  cout << (valid ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "Use stack. Push opening brackets, pop when matching closing bracket found.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<char> st; for(char c:s){if(c=='('||c=='{'||c=='[')st.push(c);else{if(st.empty()){cout<<\"No\";return 0;}char t=st.top();st.pop();if((c==')'&&t!='(')||(c=='}'&&t!='{')||(c==']'&&t!='[')){cout<<\"No\";return 0;}}}cout<<(st.empty()?\"Yes\":\"No\");",
  },
  {
    id: "longest-palindromic",
    title: "Longest Palindromic Substring",
    category: "strings",
    difficulty: "medium",
    description: "Find the longest palindromic substring.",
    constraints: "1 <= |s| <= 1000",
    examples: [
      {"input":"babad","output":"bab","explanation":"\"aba\" is also valid"}
    ],
    test_cases: [
      {"input":"babad","expected":"bab"},
      {"input":"cbbd","expected":"bb"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // expand around center\n\n  cout << result << endl;\n  return 0;\n}",
    approach: "Expand around center for each position (odd and even length). Track longest palindrome.",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int l=0,r=0,mx=0; for(int i=0;i<s.size();i++){int l1=i,r1=i;while(l1>=0&&r1<s.size()&&s[l1]==s[r1]){if(r1-l1+1>mx){mx=r1-l1+1;l=l1;r=r1;}l1--;r1++;}int l2=i,r2=i+1;while(l2>=0&&r2<s.size()&&s[l2]==s[r2]){if(r2-l2+1>mx){mx=r2-l2+1;l=l2;r=r2;}l2--;r2++;}}cout<<s.substr(l,r-l+1);",
  },
  {
    id: "str-str",
    title: "Find First Occurrence (strStr)",
    category: "strings",
    difficulty: "medium",
    description: "Find the first occurrence of needle in haystack.",
    constraints: "1 <= |haystack|,|needle| <= 10^4",
    examples: [
      {"input":"sadbutsad sad","output":"0"}
    ],
    test_cases: [
      {"input":"sadbutsad sad","expected":"0"},
      {"input":"leetcode leeto","expected":"-1"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string haystack, needle;\n  cin >> haystack >> needle;\n\n  // sliding window or KMP\n\n  cout << index << endl;\n  return 0;\n}",
    approach: "Sliding window: compare needle with each haystack substring of same length.",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int n=haystack.size(),m=needle.size(); for(int i=0;i<=n-m;i++){int j=0;while(j<m&&haystack[i+j]==needle[j])j++;if(j==m){cout<<i;return 0;}}cout<<-1;",
  },
  {
    id: "roman-integer",
    title: "Roman to Integer",
    category: "strings",
    difficulty: "medium",
    description: "Convert Roman numeral to integer.",
    constraints: "1 <= |s| <= 15",
    examples: [
      {"input":"MCMXCIV","output":"1994"}
    ],
    test_cases: [
      {"input":"MCMXCIV","expected":"1994"},
      {"input":"LVIII","expected":"58"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint romanValue(char c) {\n  switch(c) {\n    case 'I': return 1;\n    case 'V': return 5;\n    case 'X': return 10;\n    case 'L': return 50;\n    case 'C': return 100;\n    case 'D': return 500;\n    case 'M': return 1000;\n    default: return 0;\n  }\n}\n\nint main() {\n  string s;\n  cin >> s;\n\n  // add normally, subtract if smaller before larger\n\n  cout << result << endl;\n  return 0;\n}",
    approach: "Add values normally. If a smaller value appears before a larger one, subtract it instead.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int val[256]={0}; val['I']=1;val['V']=5;val['X']=10;val['L']=50;val['C']=100;val['D']=500;val['M']=1000; int res=0; for(int i=0;i<s.size();i++){if(i+1<s.size()&&val[s[i]]<val[s[i+1]])res-=val[s[i]];else res+=val[s[i]];}cout<<res;",
  },
  {
    id: "encode-decode",
    title: "String Compression (Run-Length)",
    category: "strings",
    difficulty: "medium",
    description: "Run-length encode a string: aabbbcc -> a2b3c2.",
    constraints: "1 <= |s| <= 10^4",
    examples: [
      {"input":"aabbbcccc","output":"a2b3c4"}
    ],
    test_cases: [
      {"input":"aabbbcccc","expected":"a2b3c4"},
      {"input":"abc","expected":"a1b1c1"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // count consecutive chars\n\n  cout << encoded << endl;\n  return 0;\n}",
    approach: "Count consecutive characters. Append char and count to result.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "string r; int cnt=1; for(int i=1;i<=s.size();i++){if(i<s.size()&&s[i]==s[i-1])cnt++;else{r+=s[i-1]+to_string(cnt);cnt=1;}}cout<<r;",
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    category: "strings",
    difficulty: "medium",
    description: "Group anagrams together from array of strings.",
    constraints: "1 <= n <= 10^4, 1 <= |s| <= 100",
    examples: [
      {"input":"6\nate eat tea tan nat bat","output":"ate eat tea\ntan nat\nbat","explanation":"Groups by sorted signature"}
    ],
    test_cases: [
      {"input":"6\nate eat tea tan nat bat","expected":"ate eat tea\ntan nat\nbat"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  string strs[n];\n  for (int i = 0; i < n; i++) cin >> strs[i];\n\n  // map sorted string to group\n\n  return 0;\n}",
    approach: "Use hash map: sorted string as key, list of original strings as value.",
    complexity: {"time":"O(n * k log k)","space":"O(n * k)"},
    sheet: "Striver A2Z",
    solution_code: "unordered_map<string,vector<string>> mp; for(string& s:strs){string t=s;sort(t.begin(),t.end());mp[t].push_back(s);} for(auto& p:mp){for(string& s:p.second)cout<<s<<\" \";cout<<endl;}",
  },
  {
    id: "count-palindromic-substr",
    title: "Count Palindromic Substrings",
    category: "strings",
    difficulty: "medium",
    description: "Count all palindromic substrings in a string.",
    constraints: "1 <= |s| <= 1000",
    examples: [
      {"input":"aaa","output":"6","explanation":"a,a,a,aa,aa,aaa"}
    ],
    test_cases: [
      {"input":"aaa","expected":"6"},
      {"input":"abc","expected":"3"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // expand around center for each position\n\n  cout << count << endl;\n  return 0;\n}",
    approach: "Expand around each center (odd and even). Count each palindrome found.",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "int cnt=0; for(int i=0;i<s.size();i++){int l=i,r=i;while(l>=0&&r<s.size()&&s[l]==s[r]){cnt++;l--;r++;}l=i;r=i+1;while(l>=0&&r<s.size()&&s[l]==s[r]){cnt++;l--;r++;}}cout<<cnt;",
  },
  {
    id: "min-char-palindrome",
    title: "Min Chars to Make Palindrome",
    category: "strings",
    difficulty: "hard",
    description: "Find min characters to add at front to make string palindrome.",
    constraints: "1 <= |s| <= 10^5",
    examples: [
      {"input":"aacecaaa","output":"1","explanation":"Add \"a\" at front -> \"aaacecaaa\""}
    ],
    test_cases: [
      {"input":"aacecaaa","expected":"1"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // use LPS (KMP) on s + '#' + reverse(s)\n\n  cout << add << endl;\n  return 0;\n}",
    approach: "Compute LPS array on s+'#'+reverse(s). Min chars to add = n - LPS[last].",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "string t=s+'#'+string(s.rbegin(),s.rend()); int lps[t.size()]={0}; for(int i=1;i<t.size();i++){int j=lps[i-1];while(j>0&&t[i]!=t[j])j=lps[j-1];if(t[i]==t[j])j++;lps[i]=j;}cout<<s.size()-lps[t.size()-1];",
  },
  {
    id: "wildcard-match",
    title: "Wildcard Pattern Matching",
    category: "strings",
    difficulty: "hard",
    description: "Match string with wildcards: ? matches single char, * matches any sequence.",
    constraints: "1 <= |s|,|p| <= 2000",
    examples: [
      {"input":"aa a*","output":"Yes"}
    ],
    test_cases: [
      {"input":"aa a*","expected":"Yes"},
      {"input":"cb ?a","expected":"No"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s, p;\n  cin >> s >> p;\n\n  // 2D DP\n\n  cout << (match ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "2D DP: dp[i][j] = match s[0..i] with p[0..j]. Handle ?, and * as empty/single/multiple.",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "Striver A2Z",
    solution_code: "int n=s.size(),m=p.size(); vector<vector<bool>> dp(n+1,vector<bool>(m+1)); dp[0][0]=1; for(int j=1;j<=m;j++)if(p[j-1]=='*')dp[0][j]=dp[0][j-1]; for(int i=1;i<=n;i++)for(int j=1;j<=m;j++){if(p[j-1]=='*')dp[i][j]=dp[i-1][j]||dp[i][j-1];else if(p[j-1]=='?'||s[i-1]==p[j-1])dp[i][j]=dp[i-1][j-1];} cout<<(dp[n][m]?\"Yes\":\"No\");",
  }
    complexity: {"time":"O(4^n/√n)","space":"O(n)"},
    techniques: ["backtracking"],
    sheet: "Striver A2Z",
    solution_code: "vector<string> res; function<void(int,int,string)> bt=[&](int o,int c,string cur){if(o==n&&c==n){res.push_back(cur);return;}if(o<n)bt(o+1,c,cur+'(');if(c<o)bt(o,c+1,cur+')');}; bt(0,0,\"\"); for(auto& s:res)cout<<s<<\" \";",
  },
  {
    id: "letter-combo",
    title: "Letter Combinations of a Phone Number",
    category: "strings",
    difficulty: "medium",
    description: "Return all possible letter combinations from a digit string (phone keypad).",
    constraints: "0 <= |digits| <= 4",
    examples: [{"input":"23","output":"ad ae af bd be bf cd ce cf"}],
    test_cases: [{"input":"23","expected":"ad ae af bd be bf cd ce cf"},{"input":"","expected":""}],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  string digits;\n  cin >> digits;\n\n  // backtracking with mapping\n\n  return 0;\n}",
    approach: "Each digit maps to letters like a phone keypad (2→abc, 3→def, etc.). Generate all combinations by backtracking. Maintain a mapping array from digit to its letters. Start with an empty prefix and index 0. At each index, append each letter corresponding to the current digit and recurse to the next digit. When the index reaches the end of digits, add the current combination to the result. For '23', first digit '2' maps to 'a','b','c' and second digit '3' maps to 'd','e','f', yielding 3×3=9 combinations.\n\nDiagram:\n```\nletter-combo:\n  digits = \"23\"\n  mapping: 2→abc, 3→def\n\n  Backtracking tree:\n  \"\" → \"a\" → \"ad\", \"ae\", \"af\"\n     → \"b\" → \"bd\", \"be\", \"bf\"\n     → \"c\" → \"cd\", \"ce\", \"cf\"\n\n  9 combinations total\n```",
    complexity: {"time":"O(4^n)","space":"O(n)"},
    techniques: ["backtracking"],
    sheet: "Striver A2Z",
    solution_code: "vector<string> res; string map[10]={\"\",\"\",\"abc\",\"def\",\"ghi\",\"jkl\",\"mno\",\"pqrs\",\"tuv\",\"wxyz\"}; function<void(int,string)> bt=[&](int i,string cur){if(i==digits.size()){res.push_back(cur);return;}for(char c:map[digits[i]-'0'])bt(i+1,cur+c);}; if(digits.empty())return 0; bt(0,\"\"); for(auto& s:res)cout<<s<<\" \";",
  },
  {
    id: "decode-ways-str",
    title: "Decode Ways",
    category: "strings",
    difficulty: "medium",
    description: "Count ways to decode a digit string (1→A, 2→B, ..., 26→Z).",
    constraints: "1 <= |s| <= 100",
    examples: [{"input":"226","output":"3","explanation":"BZ(2,26), VF(22,6), BBF(2,2,6)"}],
    test_cases: [{"input":"226","expected":"3"},{"input":"06","expected":"0"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // 1D DP prefix-sum style\n\n  cout << ways << endl;\n  return 0;\n}",
    approach: "Each digit can be decoded alone (1-9) or paired with the next digit (10-26). This is a 1D DP problem where dp[i] represents the number of ways to decode the prefix s[0..i-1]. Initialize dp[0]=1 (empty string). For each position i from 1 to n, check if the single digit s[i-1] is non-zero, and add dp[i-1] to dp[i]. Then check if the two-digit number formed by s[i-2] and s[i-1] is between 10 and 26, and add dp[i-2] to dp[i]. The final answer is dp[n]. For '226', dp[1]=1 (2), dp[2]=2 (22 as 2-2 or 22), dp[3]=3 (2-2-6, 22-6, 2-26), where trailing '6' with '26' gives dp[1]+dp[2]=1+2=3.\n\nDiagram:\n```\ndecode-ways:\n  s = \"226\"\n\n  dp[0] = 1 (empty)\n  dp[1] = 1  (s[0]='2' != '0') → \"2\"\n  dp[2] = dp[1] + dp[0] = 2\n          (s[1]='2' + prev=22 between 10-26)\n          → \"2-2\", \"22\"\n  dp[3] = dp[2] + dp[1] = 3\n          (s[2]='6' + prev=26 between 10-26)\n          → \"2-2-6\", \"22-6\", \"2-26\"\n\n  Result: 3 ways\n```",
    complexity: {"time":"O(n)","space":"O(n)"},
    techniques: ["prefix-sum"],
    sheet: "Love Babbar 450",
    solution_code: "int n=s.size(); vector<int> dp(n+1); dp[0]=1; for(int i=1;i<=n;i++){if(s[i-1]!='0')dp[i]+=dp[i-1];if(i>1&&(s[i-2]=='1'||(s[i-2]=='2'&&s[i-1]<='6')))dp[i]+=dp[i-2];}cout<<dp[n];",
  },
  {
    id: "min-window-substr",
    title: "Minimum Window Substring",
    category: "strings",
    difficulty: "hard",
    description: "Find the minimum window in s which contains all characters of t.",
    constraints: "1 <= |s|,|t| <= 10^5",
    examples: [{"input":"ADOBECODEBANC ABC","output":"BANC"}],
    test_cases: [{"input":"ADOBECODEBANC ABC","expected":"BANC"},{"input":"a a","expected":"a"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s, t;\n  cin >> s >> t;\n\n  // sliding window with freq counts\n\n  cout << minWindow << endl;\n  return 0;\n}",
    approach: "Find the smallest substring of s that contains all characters of t (including duplicates). Use a sliding window with two frequency arrays: one for t's character counts, and one to track the current window. First count characters in t. Expand the right pointer, adding characters to the window. When the window contains all required characters (tracked by a count of matched characters), try shrinking from the left to minimize the window while still containing all characters. Track the minimum window start and length. For s='ADOBECODEBANC' and t='ABC', the window starts at A, expands to include B and C at 'ADOBEC' (length 6), then shrinks as the window slides right, finally finding 'BANC' (length 4) as the minimum.\n\nDiagram:\n```\nmin-window-substr:\n  s = \"ADOBECODEBANC\", t = \"ABC\"\n  need: A:1, B:1, C:1\n\n  Step 1: [A]            l=0,r=0  need C,A,B\n  Step 2: [A D O B E C]  l=0,r=5  have all → len=6\n  Step 3: A D O[B E C]   l=3,r=5  have all → len=3\n  Step 4: A D O B[E C O D E B A]  l=3,r=9  have all → len=6\n  Step 5: A D O B E C O D E[B A N C] l=9,r=12  have all → len=4 ← min\n  Step 6: A D O B E C O D E B A[N C] l=10,r=12 have all → len=3\n\n  Min window: \"BANC\" (length 4)\n```",
    complexity: {"time":"O(n)","space":"O(1)"},
    techniques: ["sliding-window"],
    sheet: "Striver A2Z",
    solution_code: "int cnt[128]={0},ncnt[128]={0}; for(char c:t)cnt[c]++; int l=0,have=0,need=0,mnl=1e9,mns=0; for(char c:t)if(cnt[c]==1)need++; for(int r=0;r<s.size();r++){char c=s[r];ncnt[c]++;if(cnt[c]&&ncnt[c]==cnt[c])have++;while(have>=need){if(r-l+1<mnl){mnl=r-l+1;mns=l;}char lc=s[l];ncnt[lc]--;if(cnt[lc]&&ncnt[lc]<cnt[lc])have--;l++;}}cout<<(mnl==1e9?\"\":s.substr(mns,mnl));",
  },
  {
    id: "check-inclusion-str",
    title: "Check String Inclusion (Permutation in String)",
    category: "strings",
    difficulty: "medium",
    description: "Check if s2 contains a permutation of s1.",
    constraints: "1 <= |s1|,|s2| <= 10^4",
    examples: [{"input":"ab eidbaooo","output":"Yes","explanation":"s2 has \"ba\" which is a permutation of \"ab\""}],
    test_cases: [{"input":"ab eidbaooo","expected":"Yes"},{"input":"ab eidboaoo","expected":"No"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s1, s2;\n  cin >> s1 >> s2;\n\n  // sliding window with freq comparison\n\n  cout << (found ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "Check if s2 contains any substring that is a permutation of s1. Sliding window of fixed size |s1| over s2, comparing character frequency arrays. Build a frequency array for s1. Slide a window of length |s1| over s2, maintaining a frequency array for the window. At each position, compare the two frequency arrays. If they match exactly, a permutation exists. Instead of comparing all 26 positions each time, use a match counter. For 'ab' in 'eidbaooo', the window of size 2 slides: 'ei' (no), 'id' (no), 'db' (no), 'ba' (yes - matches freq of 'ab').\n\nDiagram:\n```\ncheck-inclusion:\n  s1 = \"ab\", s2 = \"eidbaooo\"\n  window size = 2\n\n  freq1: a:1, b:1\n\n  slide over s2:\n  \"ei\" → e:1,i:1 → no match\n  \"id\" → i:1,d:1 → no match\n  \"db\" → d:1,b:1 → no match\n  \"ba\" → b:1,a:1 → MATCH! Return Yes\n\n  Result: Yes\n```",
    complexity: {"time":"O(n)","space":"O(1)"},
    techniques: ["sliding-window"],
    sheet: "Striver A2Z",
    solution_code: "int cnt[26]={0},win[26]={0}; for(char c:s1)cnt[c-'a']++; int l=0; for(int r=0;r<s2.size();r++){win[s2[r]-'a']++;if(r-l+1>s1.size())win[s2[l++]-'a']--;if(r-l+1==s1.size()){int ok=1;for(int i=0;i<26;i++)if(cnt[i]!=win[i]){ok=0;break;}if(ok){cout<<\"Yes\";return 0;}}}cout<<\"No\";",
  },
  {
    id: "reverse-words-str",
    title: "Reverse Words in a String",
    category: "strings",
    difficulty: "medium",
    description: "Reverse the order of words in a string (words separated by spaces).",
    constraints: "1 <= |s| <= 10^4",
    examples: [{"input":"the sky is blue","output":"blue is sky the"}],
    test_cases: [{"input":"the sky is blue","expected":"blue is sky the"},{"input":"  hello world  ","expected":"world hello"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  getline(cin, s);\n\n  // reverse entire string then reverse each word\n\n  cout << result << endl;\n  return 0;\n}",
    approach: "Reverse the order of words while handling leading/trailing/multiple spaces. A two-pass two-pointer approach: first, reverse the entire string. Then, iterate through the reversed string, using two pointers to identify word boundaries, and reverse each individual word. To handle extra spaces simultaneously, use a technique of copying non-space characters with single spaces between words as you walk through. For 'the sky is blue', reverse entire → 'eulb si yks eht', then reverse each word → 'blue is sky the'.\n\nDiagram:\n```\nreverse-words-str:\n  s = \"the sky is blue\"\n\n  Step 1: Reverse entire string\n  \"eulb si yks eht\"\n\n  Step 2: Reverse each word\n  \"eulb\" → \"blue\"\n  \"si\" → \"is\"\n  \"yks\" → \"sky\"\n  \"eht\" → \"the\"\n\n  Result: \"blue is sky the\"\n```",
    complexity: {"time":"O(n)","space":"O(1)"},
    techniques: ["two-pointers"],
    sheet: "Love Babbar 450",
    solution_code: "reverse(s.begin(),s.end()); int l=0; for(int r=0;r<=s.size();r++){if(r==s.size()||s[r]==' '){reverse(s.begin()+l,s.begin()+r);l=r+1;}} cout<<s;",
  },
  {
    id: "is-subsequence",
    title: "Is Subsequence",
    category: "strings",
    difficulty: "easy",
    description: "Check if s is a subsequence of t (not necessarily contiguous).",
    constraints: "1 <= |s|,|t| <= 10^5",
    examples: [{"input":"abc ahbgdc","output":"Yes"}],
    test_cases: [{"input":"abc ahbgdc","expected":"Yes"},{"input":"axc ahbgdc","expected":"No"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s, t;\n  cin >> s >> t;\n\n  // two-pointer greedy\n\n  cout << (isSubseq ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "A string s is a subsequence of t if characters of s appear in t in order (not necessarily contiguous). Use two pointers: i for s and j for t. While both pointers are within bounds, if s[i] equals t[j], advance both pointers. Otherwise, only advance j. If the loop finishes with i reaching the end of s, then s is a subsequence. For s='abc' and t='ahbgdc', i=0 matches 'a' at j=0, i=1 matches 'b' at j=2, i=2 matches 'c' at j=5, and i=3 reaches end, so Yes.\n\nDiagram:\n```\nis-subsequence:\n  s = \"abc\", t = \"ahbgdc\"\n\n  i=0='a'  j=0='a' → match, i=1, j=1\n  i=1='b'  j=1='h' → no match, j=2\n           j=2='b' → match, i=2, j=3\n  i=2='c'  j=3='g' → no match, j=4\n           j=4='d' → no match, j=5\n           j=5='c' → match, i=3 ✓\n\n  i reached s.size() → \"abc\" is a subsequence ✓\n```",
    complexity: {"time":"O(n)","space":"O(1)"},
    techniques: ["two-pointers"],
    sheet: "Love Babbar 450",
    solution_code: "int i=0; for(int j=0;i<s.size()&&j<t.size();j++)if(s[i]==t[j])i++;cout<<(i==s.size()?\"Yes\":\"No\");",
  },
  {
    id: "basic-calc",
    title: "Basic Calculator",
    category: "strings",
    difficulty: "hard",
    description: "Evaluate a simple expression string with +, -, (, ) and spaces.",
    constraints: "1 <= |s| <= 3*10^5",
    examples: [{"input":"(1+(4+5+2)-3)+(6+8)","output":"23"}],
    test_cases: [{"input":"(1+(4+5+2)-3)+(6+8)","expected":"23"},{"input":"2-1+2","expected":"3"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  getline(cin, s);\n\n  // stack-based evaluation with sign tracking\n\n  cout << result << endl;\n  return 0;\n}",
    approach: "Evaluate an arithmetic expression with +, -, parentheses, and spaces. Use a stack-based approach with sign tracking. Maintain a result variable and a current sign (+1 or -1). Iterate through the string: when encountering a digit, parse the full number and add sign*number to result. When encountering '+', set sign=1. When encountering '-', set sign=-1. When encountering '(', push the current result and sign onto the stack, reset result to 0. When encountering ')', pop the previous result and sign, and combine: result = prevResult + prevSign * currentResult. This handles nested parentheses naturally.\n\nDiagram:\n```\nbasic-calc:\n  s = \"(1+(4+5+2)-3)+(6+8)\"\n\n  Processing:\n  ( → push res=0,sign=+\n  1 → res=1\n  + → sign=+\n  ( → push res=1,sign=+, res=0\n  4 → res=4\n  + → sign=+\n  5 → res=9\n  + → sign=+\n  2 → res=11\n  ) → pop: res = 1 + 1*11 = 12\n  - → sign=-\n  3 → res = 12 + (-1)*3 = 9\n  ) → pop: res = 0 + 1*9 = 9\n  + → sign=+\n  ( → push res=9,sign=+, res=0\n  6 → res=6\n  + → sign=+\n  8 → res=14\n  ) → pop: res = 9 + 1*14 = 23\n\n  Result: 23\n```",
    complexity: {"time":"O(n)","space":"O(n)"},
    techniques: ["backtracking"],
    sheet: "Striver A2Z",
    solution_code: "int res=0,sign=1; stack<int> st; for(int i=0;i<s.size();i++){if(isdigit(s[i])){int num=0;while(i<s.size()&&isdigit(s[i]))num=num*10+(s[i++]-'0');i--;res+=sign*num;}else if(s[i]=='+')sign=1;else if(s[i]=='-')sign=-1;else if(s[i]=='('){st.push(res);st.push(sign);res=0;sign=1;}else if(s[i]==')'){res=st.top()*res;st.pop();res+=st.top();st.pop();}}cout<<res;",
  },
  {
    id: "rabin-karp-search",
    title: "Rabin-Karp Pattern Search",
    category: "strings",
    difficulty: "medium",
    description: "Find the first occurrence of pattern P in text T using rolling hash.",
    constraints: "1 <= |T|,|P| <= 10^5",
    techniques: ["rolling-hash"],
    examples: [{"input":"hello ll","output":"2"}],
    test_cases: [{"input":"hello ll","expected":"2"},{"input":"aaaaaa bba","expected":"-1"},{"input":"abcabc abc","expected":"0"}],
    solution_template: "#include <iostream>\n#include <string>\nusing namespace std;\ntypedef long long ll;\nconst ll MOD = 1e9+7;\nconst ll BASE = 911382323;\n\nint main() {\n  string T, P;\n  cin >> T >> P;\n  int n = T.size(), m = P.size();\n  if (m > n) { cout << -1; return 0; }\n  ll pow = 1;\n  for (int i = 0; i < m-1; i++) pow = (pow * BASE) % MOD;\n  ll patHash = 0, txtHash = 0;\n  for (int i = 0; i < m; i++) {\n    patHash = (patHash * BASE + P[i]) % MOD;\n    txtHash = (txtHash * BASE + T[i]) % MOD;\n  }\n  for (int i = 0; i <= n-m; i++) {\n    if (patHash == txtHash) {\n      int j = 0;\n      while (j < m && T[i+j] == P[j]) j++;\n      if (j == m) { cout << i; return 0; }\n    }\n    if (i < n-m) {\n      txtHash = (txtHash - T[i] * pow % MOD + MOD) % MOD;\n      txtHash = (txtHash * BASE + T[i+m]) % MOD;\n    }\n  }\n  cout << -1;\n  return 0;\n}",
    approach: `We want to find the first occurrence of a pattern P in text T. The brute-force approach slides over each position of T and compares P character by character in O(n*m) time. The Rabin-Karp algorithm uses a rolling hash to compare P's hash with each window's hash in O(1) per window, reducing average time to O(n+m).

Compute a polynomial hash for P and the first window of T using base B and modulus M. For each subsequent window, update the hash by removing the leftmost character and adding the rightmost using the rolling hash formula: newHash = ((oldHash - T[i]*B^(m-1)) * B + T[i+m]) % M. When hashes match, verify character-by-character to avoid false positives from collisions.



Diagram:
\`\`\`
rabin-karp-search:
  T = "hello", P = "ll"
  Base=911382323, Mod=1e9+7

  pow = B^(m-1) = 911382323^1 = 911382323

  patHash = 'l'*B + 'l'
  txtHash window 0: 'h'*B + 'e'
    patHash != txtHash
  txtHash window 1: ('e'*B + 'l')  (after rolling)
    patHash != txtHash
  txtHash window 2: ('l'*B + 'l')
    patHash == txtHash → verify 'll' == 'll' → match at index 2

  Rolling step for window i:
    remove T[i]: txtHash = (txtHash - T[i]*pow) % MOD
    shift:       txtHash = (txtHash * BASE) % MOD
    add T[i+m]:  txtHash = (txtHash + T[i+m]) % MOD
\`\`\`

Edge cases: pattern longer than text (immediate -1), empty pattern (return 0), hash collisions (verify on match). Complexity: O(n+m) average, O(n*m) worst-case with collisions. Space: O(1).`,
    complexity: {"time":"O(n+m)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "ll p=1,ph=0,th=0;for(int i=0;i<m-1;i++)p=p*BASE%MOD;for(int i=0;i<m;i++){ph=(ph*BASE+P[i])%MOD;th=(th*BASE+T[i])%MOD;}for(int i=0;i<=n-m;i++){if(ph==th){int j=0;while(j<m&&T[i+j]==P[j])j++;if(j==m){cout<<i;return 0;}}if(i<n-m){th=(th-T[i]*p%MOD+MOD)%MOD;th=(th*BASE+T[i+m])%MOD;}}cout<<-1;",
  },
  {
    id: "longest-common-prefix-rolling",
    title: "Longest Common Prefix Using Rolling Hash",
    category: "strings",
    difficulty: "easy",
    description: "Find the longest common prefix between two strings using binary search and rolling hash.",
    constraints: "1 <= |s1|,|s2| <= 10^5",
    techniques: ["rolling-hash"],
    examples: [{"input":"abcdef abcxyz","output":"abc"}],
    test_cases: [{"input":"abcdef abcxyz","expected":"abc"},{"input":"abc def","expected":""}],
    solution_template: "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\ntypedef long long ll;\nconst ll MOD = 1e9+7;\nconst ll BASE = 911382323;\n\nint main() {\n  string s1, s2;\n  cin >> s1 >> s2;\n  int n = s1.size(), m = s2.size();\n  // precompute powers and prefix hashes for both strings\n  // binary search on LCP length from 0 to min(n,m)\n  // check if prefix hash matches for given length\n  int lo = 0, hi = min(n, m), ans = 0;\n  while (lo <= hi) {\n    int mid = (lo + hi) / 2;\n    // compute hash of s1[0..mid-1] and s2[0..mid-1]\n    // if equal, lo = mid+1, ans = mid; else hi = mid-1\n  }\n  cout << s1.substr(0, ans) << endl;\n  return 0;\n}",
    approach: `We need the longest string that is a prefix of both s1 and s2. A linear scan comparing character by character takes O(n) time. Using binary search combined with rolling hash, we can achieve O(log n) hash comparisons.

Precompute prefix hashes for both strings: h[i] = (h[i-1]*B + s[i]) % MOD. Also precompute powers of B. To get the hash of a substring s[l..r]: hash = (h[r] - h[l-1]*B^(r-l+1)) % MOD. Binary search on the LCP length L: compute hash(s1[0..L-1]) and hash(s2[0..L-1]). If equal, try a larger L; otherwise try a smaller L.



Diagram:
\`\`\`
longest-common-prefix-rolling:
  s1 = "abcdef", s2 = "abcxyz"
  min(n,m) = 6

  Binary search on LCP length:
  lo=0, hi=6
  mid=3: hash(s1[0..2])="abc" vs hash(s2[0..2])="abc" → match, ans=3, lo=4
  mid=5: hash(s1[0..4])="abcde" vs hash(s2[0..4])="abcxy" → no match, hi=4
  mid=4: hash(s1[0..3])="abcd" vs hash(s2[0..3])="abcx" → no match, hi=3
  lo=4 > hi=3 → stop, ans=3

  Result: "abc" (length 3)
\`\`\`

Edge cases: one string empty (return empty string), no common prefix (return empty). Complexity: O(n) precomputation + O(log n) hash lookups. Space: O(n) for prefix hashes.`,
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "int n=s1.size(),m=s2.size();vector<ll> h1(n+1),h2(m+1),pw(max(n,m)+1);pw[0]=1;for(int i=1;i<pw.size();i++)pw[i]=pw[i-1]*BASE%MOD;for(int i=0;i<n;i++)h1[i+1]=(h1[i]*BASE+s1[i])%MOD;for(int i=0;i<m;i++)h2[i+1]=(h2[i]*BASE+s2[i])%MOD;auto get=[&](vector<ll>&h,int l,int r){return (h[r]-h[l]*pw[r-l]%MOD+MOD)%MOD;};int lo=0,hi=min(n,m),ans=0;while(lo<=hi){int mid=(lo+hi)/2;if(get(h1,0,mid)==get(h2,0,mid)){ans=mid;lo=mid+1;}else hi=mid-1;}cout<<s1.substr(0,ans);",
  },
  {
    id: "distinct-substrings",
    title: "Count Distinct Substrings",
    category: "strings",
    difficulty: "hard",
    description: "Count the number of distinct substrings of a given string.",
    constraints: "1 <= |s| <= 10^4",
    techniques: ["rolling-hash"],
    examples: [{"input":"ababa","output":"9"}],
    test_cases: [{"input":"ababa","expected":"9"},{"input":"aaa","expected":"3"},{"input":"abc","expected":"6"}],
    solution_template: "#include <iostream>\n#include <string>\n#include <unordered_set>\nusing namespace std;\ntypedef long long ll;\nconst ll MOD = 1e9+7;\nconst ll BASE = 911382323;\n\nint main() {\n  string s;\n  cin >> s;\n  int n = s.size();\n  // precompute prefix hashes and powers\n  // for each length L from 1 to n, insert hash of each window into set\n  // answer = sum of distinct counts\n  ll cnt = 0;\n  for (int L = 1; L <= n; L++) {\n    unordered_set<ll> seen;\n    for (int i = 0; i + L <= n; i++) {\n      // compute hash of s[i..i+L-1]\n      // insert into seen\n    }\n    cnt += seen.size();\n  }\n  cout << cnt << endl;\n  return 0;\n}",
    approach: `Count every unique substring of s. The total number of substrings is n*(n+1)/2, but many may be duplicates. A brute-force approach extracts all substrings and stores them in a set, which is O(n^3) time and O(n^2) memory. Using rolling hash, we can hash each substring in O(1) and count distinct hashes per length.

For each length L from 1 to n, slide a window over s and compute the rolling hash of each window. Insert each hash into a set. After processing all windows of length L, add the set size to the total count. Use double hashing or a large modulus to minimize collisions.



Diagram:
\`\`\`
distinct-substrings:
  s = "ababa", n=5

  All substrings:
  L=1: "a","b","a","b","a" → distinct: {"a","b"} → 2
  L=2: "ab","ba","ab","ba" → distinct: {"ab","ba"} → 2
  L=3: "aba","bab","aba"   → distinct: {"aba","bab"} → 2
  L=4: "abab","baba"       → distinct: {"abab","baba"} → 2
  L=5: "ababa"             → distinct: {"ababa"} → 1

  Total distinct = 2+2+2+2+1 = 9

  s = "aaa":
  L=1: "a","a","a" → {"a"} → 1
  L=2: "aa","aa"   → {"aa"} → 1
  L=3: "aaa"       → {"aaa"} → 1
  Total = 3
\`\`\`

Edge cases: single character (1 distinct substring), all unique characters (n*(n+1)/2 distinct). Complexity: O(n^2) time, O(n^2) space for hash sets.`,
    complexity: {"time":"O(n^2)","space":"O(n^2)"},
    sheet: "Striver A2Z",
    solution_code: "int n=s.size();ll pw[n+1];pw[0]=1;for(int i=1;i<=n;i++)pw[i]=pw[i-1]*BASE%MOD;ll h[n+1]={0};for(int i=0;i<n;i++)h[i+1]=(h[i]*BASE+s[i])%MOD;auto get=[&](int l,int r){return (h[r]-h[l]*pw[r-l]%MOD+MOD)%MOD;};ll ans=0;for(int L=1;L<=n;L++){unordered_set<ll> st;for(int i=0;i+L<=n;i++)st.insert(get(i,i+L));ans+=st.size();}cout<<ans;",
  },
  {
    id: "longest-palindromic-rolling",
    title: "Longest Palindromic Substring Using Rolling Hash",
    category: "strings",
    difficulty: "medium",
    description: "Find the longest palindromic substring using binary search and rolling hash on forward/reversed strings.",
    constraints: "1 <= |s| <= 10^5",
    techniques: ["rolling-hash"],
    examples: [{"input":"babad","output":"bab"}],
    test_cases: [{"input":"babad","expected":"bab"},{"input":"cbbd","expected":"bb"},{"input":"a","expected":"a"}],
    solution_template: "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\ntypedef long long ll;\nconst ll MOD = 1e9+7;\nconst ll BASE = 911382323;\n\nint main() {\n  string s;\n  cin >> s;\n  int n = s.size();\n  // build forward and reverse prefix hashes\n  // binary search on palindrome length (odd/even separately)\n  // check if hash(l..r) in forward == hash(l..r) in reverse\n  cout << result << endl;\n  return 0;\n}",
    approach: `Find the longest substring that reads the same forwards and backwards. The expand-around-center approach is O(n^2). Using rolling hash on the original and reversed strings, we can binary search on palindrome length and check each candidate in O(1), achieving O(n log n).

Build prefix hashes for the original string and the reversed string. For odd-length palindromes, binary search on radius r (0 to n/2). For each center i, check if s[i-r..i+r] has matching forward and reversed hashes. For even-length palindromes, check s[i..i+2r-1]. The hash comparison on the reversed string maps indices appropriately.



Diagram:
\`\`\`
longest-palindromic-rolling:
  s = "babad", n=5
  rev = "dabab"

  Check odd palindrome centered at i=1 ('a'):
  radius r=0: "b" → palindrome ✓
  radius r=1: "bab" → forward hash(s[0..2]) matches rev hash → palindrome ✓
  radius r=2: s[-1..3] out of bounds → stop
  max odd palindrome at i=1: "bab" (len=3)

  Check odd palindrome centered at i=2 ('b'):
  radius r=0: "a" → palindrome ✓
  radius r=1: "aba" → forward hash(s[1..3]) matches rev hash → palindrome ✓
  radius r=2: "babad" → forward hash(s[0..4]) vs rev hash → no match
  max odd palindrome at i=2: "aba" (also len=3)

  Even palindrome at i=1,2 ("ba","ab"):
  radius r=1: s[1..2]="ab" vs rev → no match
  Even palindrome at i=2,3 ("ab","ba"):
  radius r=1: s[2..3]="ba" → no match

  Longest: "bab" (or "aba") length 3
\`\`\`

Edge cases: single character (palindrome itself), all same characters (whole string is palindrome). Complexity: O(n log n) time, O(n) space for prefix hashes.`,
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "string rev=string(s.rbegin(),s.rend());int n=s.size();vector<ll> pw(n+1),h1(n+1),h2(n+1);pw[0]=1;for(int i=1;i<=n;i++)pw[i]=pw[i-1]*BASE%MOD;for(int i=0;i<n;i++)h1[i+1]=(h1[i]*BASE+s[i])%MOD;for(int i=0;i<n;i++)h2[i+1]=(h2[i]*BASE+rev[i])%MOD;auto g=[&](vector<ll>&h,int l,int r){return (h[r]-h[l]*pw[r-l]%MOD+MOD)%MOD;};int mx=1,st=0;for(int i=0;i<n;i++){int lo=1,hi=min(i,n-1-i);while(lo<=hi){int m=(lo+hi)/2;if(g(h1,i-m,i+m+1)==g(h2,n-1-i-m,n-1-i+m+1)){if(2*m+1>mx){mx=2*m+1;st=i-m;}lo=m+1;}else hi=m-1;}}for(int i=0;i<n-1;i++){int lo=1,hi=min(i+1,n-1-i);while(lo<=hi){int m=(lo+hi)/2;if(g(h1,i-m+1,i+m+1)==g(h2,n-1-i-m,n-1-i+m)){if(2*m>mx){mx=2*m;st=i-m+1;}lo=m+1;}else hi=m-1;}}cout<<s.substr(st,mx);",
  },
  {
    id: "string-matching-all",
    title: "Find All Occurrences of Pattern",
    category: "strings",
    difficulty: "medium",
    description: "Find all starting positions where pattern P appears in text T (Rabin-Karp with collision handling).",
    constraints: "1 <= |T|,|P| <= 10^5",
    techniques: ["rolling-hash"],
    examples: [{"input":"abracadabra abra","output":"0 7"}],
    test_cases: [{"input":"abracadabra abra","expected":"0 7"},{"input":"aaaa aa","expected":"0 1 2"},{"input":"abc def","expected":""}],
    solution_template: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\ntypedef long long ll;\nconst ll MOD = 1e9+7;\nconst ll BASE = 911382323;\n\nint main() {\n  string T, P;\n  cin >> T >> P;\n  int n = T.size(), m = P.size();\n  if (m > n) { cout << endl; return 0; }\n  // compute rolling hash, store all positions where hash matches then verify\n  vector<int> pos;\n  // ... Rabin-Karp with collision verification\n  for (int i = 0; i < pos.size(); i++) cout << pos[i] << (i+1<pos.size()?\" \":\"\");\n  cout << endl;\n  return 0;\n}",
    approach: `Find every index in T where pattern P appears. This extends the Rabin-Karp first-occurrence algorithm to collect all matches. The rolling hash lets us test each window in O(1), but we must verify each hash match with character comparison to handle collisions.

Compute pattern hash and rolling hash over T. At each window i from 0 to n-m, compare hashes. If they match, verify character-by-character. If verified, record i. Collect all matching positions in a vector and output them all.



Diagram:
\`\`\`
string-matching-all:
  T = "abracadabra", P = "abra"
  n=11, m=4

  Windows:
  i=0: "abra" → hash match → verify "abra"=="abra" ✓ → pos=[0]
  i=1: "brac" → no match
  i=2: "raca" → no match
  i=3: "acad" → no match
  i=4: "cada" → no match
  i=5: "adab" → no match
  i=6: "dabr" → no match
  i=7: "abra" → hash match → verify "abra"=="abra" ✓ → pos=[0,7]

  Result: "0 7"

  T = "aaaa", P = "aa":
  i=0: "aa" → match → pos=[0]
  i=1: "aa" → match → pos=[0,1]
  i=2: "aa" → match → pos=[0,1,2]

  Result: "0 1 2"
\`\`\`

Edge cases: pattern longer than text (print empty line), pattern appears at overlapping positions (as in "aaaa"/"aa"), no matches (print empty line). Complexity: O(n+m) average, O(n*m) worst-case with many collisions. Space: O(n) for storing positions.`,
    complexity: {"time":"O(n+m)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "if(m>n){cout<<endl;return 0;}ll p=1,ph=0,th=0;for(int i=0;i<m-1;i++)p=p*BASE%MOD;for(int i=0;i<m;i++){ph=(ph*BASE+P[i])%MOD;th=(th*BASE+T[i])%MOD;}vector<int> pos;for(int i=0;i<=n-m;i++){if(ph==th){int j=0;while(j<m&&T[i+j]==P[j])j++;if(j==m)pos.push_back(i);}if(i<n-m){th=(th-T[i]*p%MOD+MOD)%MOD;th=(th*BASE+T[i+m])%MOD;}}for(int i=0;i<pos.size();i++)cout<<pos[i]<<(i+1<pos.size()?\" \":\"\");",
  },
  {
    id: "repeated-substring-pattern",
    title: "Repeated Substring Pattern",
    category: "strings",
    difficulty: "easy",
    description: "Check if a string is formed by repeating a substring using rolling hash.",
    constraints: "1 <= |s| <= 10^5",
    techniques: ["rolling-hash"],
    examples: [{"input":"abcabcabcabc","output":"Yes"}],
    test_cases: [{"input":"abcabcabcabc","expected":"Yes"},{"input":"abcdef","expected":"No"},{"input":"abab","expected":"Yes"}],
    solution_template: "#include <iostream>\n#include <string>\nusing namespace std;\ntypedef long long ll;\nconst ll MOD = 1e9+7;\nconst ll BASE = 911382323;\n\nint main() {\n  string s;\n  cin >> s;\n  int n = s.size();\n  // for each divisor L of n, check if s consists of repeated s[0..L-1]\n  // use rolling hash: compare hash of first L chars with hash of each block\n  for (int L = 1; L <= n/2; L++) {\n    if (n % L == 0) {\n      // compare hash of s[0..L-1] with s[L..2L-1], s[2L..3L-1], ...\n    }\n  }\n  cout << \"No\" << endl;\n  return 0;\n}",
    approach: `Determine if s can be formed by repeating a shorter substring k times. The brute-force approach tries each divisor L of n and checks character by character whether each block equals the first L characters.

Using rolling hash, precompute prefix hashes. For each divisor L of n, compute the hash of the first L characters (the candidate pattern). Then verify that every subsequent block of length L has the same hash. If all blocks match, the string is formed by repetition.



Diagram:
\`\`\`
repeated-substring-pattern:
  s = "abcabcabcabc", n=12

  Divisors L:
  L=1: pattern="a", hash blocks: a|b|c|a|b|c|a|b|c|a|b|c → no match
  L=2: pattern="ab", hash blocks: ab|ca|bc|ab|ca|bc → no match
  L=3: pattern="abc", hash blocks: abc|abc|abc|abc → all match! → Yes

  Result: "Yes" (repeated substring "abc" 4 times)

  s = "abab", n=4
  L=1: "a" vs b,a,b → no
  L=2: "ab" vs "ab" → match → Yes

  Result: "Yes"
\`\`\`

Edge cases: single character (no divisor L < n, return No), prime length n (only L=1 which always fails for non-uniform strings). Complexity: O(n sqrt(n)) worst-case, O(n) average due to early stopping. Space: O(n) for prefix hashes.`,
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "int n=s.size();vector<ll> pw(n+1),h(n+1);pw[0]=1;for(int i=1;i<=n;i++)pw[i]=pw[i-1]*BASE%MOD;for(int i=0;i<n;i++)h[i+1]=(h[i]*BASE+s[i])%MOD;auto get=[&](int l,int r){return (h[r]-h[l]*pw[r-l]%MOD+MOD)%MOD;};for(int L=1;L<=n/2;L++){if(n%L==0){ll pat=get(0,L);bool ok=1;for(int j=L;j<n;j+=L)if(get(j,j+L)!=pat){ok=0;break;}if(ok){cout<<\"Yes\";return 0;}}}cout<<\"No\";",
  },
  {
    id: "word-dictionary-trie",
    title: "Word Dictionary (Trie with Wildcard Search)",
    category: "strings",
    difficulty: "medium",
    description: "Design a data structure supporting addWord and search with '.' wildcard using Trie.",
    constraints: "1 <= operations <= 10^4, 1 <= |word| <= 500",
    techniques: ["trie"],
    examples: [{"input":"addWord bad addWord dad addWord mad search .ad","output":"true"}],
    test_cases: [{"input":"addWord bad addWord dad addWord mad search .ad","expected":"true"},{"input":"addWord hello search hell","expected":"false"}],
    solution_template: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct TrieNode {\n  TrieNode* child[26];\n  bool isEnd;\n  TrieNode() : isEnd(false) {\n    for (int i = 0; i < 26; i++) child[i] = nullptr;\n  }\n};\n\nclass WordDictionary {\n  TrieNode* root;\npublic:\n  WordDictionary() { root = new TrieNode(); }\n  void addWord(string word) {\n    // insert into trie\n  }\n  bool search(string word) {\n    // DFS with wildcard support\n    return dfs(root, word, 0);\n  }\n  bool dfs(TrieNode* node, string& w, int i) {\n    if (!node) return false;\n    if (i == w.size()) return node->isEnd;\n    if (w[i] != '.') {\n      int c = w[i] - 'a';\n      return node->child[c] ? dfs(node->child[c], w, i+1) : false;\n    }\n    for (int c = 0; c < 26; c++)\n      if (node->child[c] && dfs(node->child[c], w, i+1)) return true;\n    return false;\n  }\n};\n\nint main() {\n  int q; cin >> q;\n  WordDictionary wd;\n  while (q--) {\n    string op, word; cin >> op >> word;\n    if (op == \"addWord\") wd.addWord(word);\n    else cout << (wd.search(word) ? \"true\" : \"false\") << endl;\n  }\n  return 0;\n}",
    approach: `Design a data structure that stores words and supports searching with '.' as a wildcard matching any character. A brute-force approach would scan all stored words for each search, which is O(n * m) per query. Using a Trie, addWord is O(m) and search is O(26^w) in the worst case for w wildcards but much faster in practice.

The Trie stores each character as a node with 26 children. addWord traverses the Trie creating nodes as needed and marks the end node. search uses DFS: at each position, if the character is '.', explore all 26 children; otherwise take the specific child. Return true if the end of word is reached at a node marked as end.



Diagram:
\`\`\`
word-dictionary-trie:
  Insert: "bad", "dad", "mad"
  Trie structure:
    root
    ├── b → a → d[*]
    ├── d → a → d[*]
    └── m → a → d[*]

  search(".ad"):
    '.' → try b,d,m all have 'a'→'d' at end
    branch b: b→a→d[*] → match ✓ true

  search("pad"):
    'p' → root has no 'p' child → false

  search("bad"):
    b→a→d[*] → exact match → true
\`\`\`

Edge cases: empty string (return false for search unless empty word added). Complexity: addWord O(m), search O(26^w * m) worst-case where w is number of wildcards. Space: O(total characters across all words).`,
    complexity: {"time":"O(m) insert, O(26^w) search","space":"O(total_chars)"},
    sheet: "Striver A2Z",
    solution_code: "struct Node{Node* c[26]={};bool e=0;};Node* r=new Node();auto ins=[&](string& w){Node* n=r;for(char ch:w){int i=ch-'a';if(!n->c[i])n->c[i]=new Node();n=n->c[i];}n->e=1;};function<bool(Node*,string&,int)> dfs=[&](Node* n,string& w,int i)->bool{if(!n)return 0;if(i==w.size())return n->e;if(w[i]!='.'){int ci=w[i]-'a';return n->c[ci]?dfs(n->c[ci],w,i+1):0;}for(int j=0;j<26;j++)if(n->c[j]&&dfs(n->c[j],w,i+1))return 1;return 0;};",
  },
  {
    id: "prefix-and-suffix-trie",
    title: "Prefix and Suffix Search",
    category: "strings",
    difficulty: "hard",
    description: "Design a data structure to filter words by prefix and suffix using Trie.",
    constraints: "1 <= n <= 10^4, 1 <= |word| <= 100",
    techniques: ["trie"],
    examples: [{"input":"apple ap le","output":"true"}],
    test_cases: [{"input":"apple ap le","expected":"true"},{"input":"banana ba na","expected":"true"},{"input":"cat ca at","expected":"false"}],
    solution_template: "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n  string word, pref, suff;\n  cin >> word >> pref >> suff;\n  // check if word starts with pref and ends with suff\n  // using Trie: insert words, search prefix, then check suffix on candidates\n  // or simpler: built-in string functions\n  bool ok = word.size() >= pref.size() && word.size() >= suff.size()\n    && word.substr(0, pref.size()) == pref\n    && word.substr(word.size() - suff.size()) == suff;\n  cout << (ok ? \"true\" : \"false\") << endl;\n  return 0;\n}",
    approach: `Given a dictionary of words, determine if any word matches a given prefix and suffix simultaneously. A brute-force approach checks every word for both conditions, taking O(n * m) time. Using a Trie, we can store each word and traverse by prefix to narrow candidates, then check the suffix.

A more elegant approach inserts each word into a Trie normally, and also inserts each word appended with a separator and the word itself (like "word#word") into a second Trie to enable simultaneous prefix-suffix lookup. For a query (pref, suff), search for "suff#pref" in the combined Trie.



Diagram:
\`\`\`
prefix-and-suffix-trie:
  Word: "apple"
  Insert normally: a→p→p→l→e[*]

  Search: pref="ap", suff="le"
  Normal approach:
    Traverse "ap" in Trie → reach node at 'p' (pos 2)
    From there, DFS to find any word ending with "le"
    "apple" ends with "le" → match ✓

  Combined-key approach:
    Build key = suff + \"#\" + pref = \"le#ap\"
    Insert "apple#apple" into Trie
    Search for \"le#ap\" → exists as prefix of \"le#ap\" in \"apple#apple\"
    → match ✓

  Non-match example:
    Word: "cat", pref="ca", suff="at"
    Combined: suff+\"#\"+pref = \"at#ca\"
    Check if any word contains \"at#ca\" as substring:
    \"cat#cat\" → no \"at#ca\" → false
\`\`\`

Edge cases: prefix or suffix longer than the word (immediate false), empty prefix or suffix (should match any). Complexity: O(m) per insertion/query where m is max word length. Space: O(total characters).`,
    complexity: {"time":"O(m) per op","space":"O(total_chars)"},
    sheet: "Striver A2Z",
    solution_code: "struct Node{Node* c[26]={};bool e=0;};auto ins=[&](Node* r,string& w){Node* n=r;for(char ch:w){int i=ch-'a';if(!n->c[i])n->c[i]=new Node();n=n->c[i];}n->e=1;};function<bool(Node*,string&,int)> srch=[&](Node* n,string& w,int i)->bool{if(!n)return 0;if(i==w.size())return 1;int ci=w[i]-'a';return n->c[ci]?srch(n->c[ci],w,i+1):0;};string comb=pref;for(char c:suff)comb+=c;cout<<(srch(root,comb,0)?\"true\":\"false\");",
  },
  {
    id: "longest-common-prefix-strings",
    title: "Longest Common Prefix of Strings",
    category: "strings",
    difficulty: "easy",
    description: "LCP of all strings using rolling hash.",
    constraints: "1 <= n <= 10^4, 1 <= |s| <= 200",
    techniques: ["rolling-hash"],
    examples: [{"input":"3\nflower flow flight","output":"fl"}],
    test_cases: [{"input":"3\nflower flow flight","expected":"fl"},{"input":"3\ndog racecar car","expected":""}],
    solution_template: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<string> strs(n);\n  for(int i=0;i<n;i++)cin>>strs[i];\n\n  // Rolling hash for common prefix\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nlongest-common-prefix-rolling:\n  strs = [\"flower\", \"flow\", \"flight\"]\n\n  Use first string as reference.\n  Binary search on prefix length L:\n  L=0..minLen, check if hash of first L chars of each string matches.\n\n  L=2: hash(\"fl\") same for all ✓ → L=2\n  L=3: hash(\"flo\") same for flower,flow but flight has \"fli\" ✗\n\n  Result: \"fl\"\n```\nBinary search on prefix length. Compute rolling hash for prefixes. Check if all strings share same hash at that length. Time O(n * log(minLen)), Space O(1).",
    complexity: {"time":"O(n * log minLen)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int lo=0,hi=200; string ans; while(lo<=hi){int mid=(lo+hi)/2; bool ok=1;if(mid>strs[0].size()){ok=0;hi=mid-1;continue;}long long h0=0,p=1;for(int j=0;j<mid;j++){h0=(h0*31+strs[0][j])%1000000007;p=p*31%1000000007;}for(int i=1;i<n&&ok;i++){if(mid>strs[i].size()){ok=0;break;}long long h=0;for(int j=0;j<mid;j++)h=(h*31+strs[i][j])%1000000007;if(h!=h0)ok=0;}if(ok){ans=strs[0].substr(0,mid);lo=mid+1;}else hi=mid-1;}cout<<ans;",
  },
  {
    id: "longest-repeating-substring",
    title: "Longest Repeating Substring",
    category: "strings",
    difficulty: "medium",
    description: "Find longest substring that appears at least twice (non-overlapping).",
    constraints: "1 <= |s| <= 2000",
    techniques: ["rolling-hash"],
    examples: [{"input":"banana","output":"ana"}],
    test_cases: [{"input":"banana","expected":"ana"},{"input":"abcd","expected":""}],
    solution_template: "#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // Binary search on length, rolling hash set\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nlongest-repeating-substring:\n  s = \"banana\"\n\n  Binary search on length L:\n  L=1: hashes {b,a,n} → 'a' repeats at 1,3 → ok\n  L=2: hashes {ba,an,na,an,na} → 'an' repeats at 1,3 → ok\n  L=3: hashes {ban,ana,nan,ana} → 'ana' repeats at 1,3 → ok\n  L=4: hashes {bana,anan,nana} → all unique → not ok\n\n  Max L with repeat = 3 → \"ana\"\n```\nBinary search on substring length. For each length L, compute rolling hash for all substrings of length L. Use hash set to detect duplicates. Track if any hash repeats. Time O(n log n), Space O(n).",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "int n=s.size(),lo=1,hi=n-1,ans=0; while(lo<=hi){int L=(lo+hi)/2; unordered_set<long long> seen; long long h=0,p=1; bool found=0; for(int i=0;i<L;i++){h=(h*31+s[i])%1000000007;p=p*31%1000000007;} seen.insert(h); for(int i=L;i<n;i++){h=(h*31-s[i-L]*p%1000000007+1000000007)%1000000007;h=(h+s[i])%1000000007;if(seen.count(h)){found=1;break;}seen.insert(h);} if(found){ans=L;lo=L+1;}else hi=L-1;}cout<<s.substr(0,ans);",
  },
  {
    id: "longest-substring-at-least-k-repeating",
    title: "Longest Substring with at Least K Repeating",
    category: "strings",
    difficulty: "medium",
    description: "Find longest substring where each character appears at least k times.",
    constraints: "1 <= |s| <= 10^4",
    techniques: ["rolling-hash"],
    examples: [{"input":"aaabb 3","output":"3","explanation":"aaa length 3"}],
    test_cases: [{"input":"aaabb 3","expected":"3"},{"input":"ababbc 2","expected":"5"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s; int k; cin >> s >> k;\n  // Sliding window with unique char count\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nlongest-substring-k-repeating:\n  s = \"aaabb\", k = 3\n\n  Brute force: check each substring with frequency count.\n  Optimized: slide window with tracking of unique chars and chars with freq>=k.\n\n  Window [a,a,a]: freq={a:3}, unique=1, valid=1 → len=3, ans=3\n  Window [a,a,a,b]: freq={a:3,b:1}, unique=2, valid=1 → no\n  ...\n  Answer: 3\n```\nDivide-and-conquer: split at chars with freq < k. Or sliding window with frequency tracking. Time O(26*n), Space O(1).",
    complexity: {"time":"O(26*n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "function<int(int,int)> dc=[&](int l,int r){if(r-l<k)return 0;int cnt[26]={0};for(int i=l;i<r;i++)cnt[s[i]-'a']++;int ans=0,start=l;for(int i=l;i<r;i++){if(cnt[s[i]-'a']<k){ans=max(ans,dc(start,i));start=i+1;}}if(start==l)return r-l;ans=max(ans,dc(start,r));return ans;}; cout<<dc(0,s.size());",
  },
  {
    id: "substrings-of-size-k-different-char",
    title: "Substrings of Size K with Distinct Chars",
    category: "strings",
    difficulty: "medium",
    description: "Count substrings of size k with exactly k distinct characters.",
    constraints: "1 <= |s| <= 10^5, 1 <= k <= 26",
    techniques: ["rolling-hash"],
    examples: [{"input":"abcabc 3","output":"3","explanation":"abc,bca,cab"}],
    test_cases: [{"input":"abcabc 3","expected":"3"},{"input":"aa 1","expected":"2"}],
    solution_template: "#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n  string s; int k; cin >> s >> k;\n  // Sliding window with hash set\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nsubstrings-size-k-distinct:\n  s = \"abcabc\", k = 3\n\n  Sliding window of size k:\n  [a,b,c] → distinct=3 ✓ → count=1, hash=abc\n  [b,c,a] → distinct=3 ✓ → count=2, hash=bca\n  [c,a,b] → distinct=3 ✓ → count=3, hash=cab\n  [a,b,c] → same as first → skip (need exactly k distinct)\n\n  Output: 3\n```\nSliding window of fixed size k. Check if all k chars are distinct (no duplicates). Use rolling hash to uniquely identify substrings (or just count). Time O(n), Space O(k).",
    complexity: {"time":"O(n*k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "if(k>s.size()){cout<<0;return 0;} unordered_set<string> seen; int cnt[26]={0},dups=0; for(int i=0;i<k;i++){if(++cnt[s[i]-'a']==2)dups++;} if(!dups)seen.insert(s.substr(0,k)); for(int i=k;i<s.size();i++){if(--cnt[s[i-k]-'a']==1)dups--;if(++cnt[s[i]-'a']==2)dups++;if(!dups)seen.insert(s.substr(i-k+1,k));} cout<<seen.size();",
  },
  {
    id: "substrings-that-begin-and-end-same",
    title: "Substrings with Same Start and End",
    category: "strings",
    difficulty: "medium",
    description: "Count substrings that start and end with same character.",
    constraints: "1 <= |s| <= 10^5",
    techniques: ["rolling-hash"],
    examples: [{"input":"abcab","output":"7","explanation":"a,b,c,a,b,abca,bcab... Actually: a,abca,b,bcab,c,abca? Let's count: each single char (5) + a...a (positions 0-3=abca) + b...b (positions 1-4=bcab) = 7"}],
    test_cases: [{"input":"abcab","expected":"7"},{"input":"aba","expected":"4"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // Count frequency of each character, sum n*(n+1)/2\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nsubstrings-same-start-end:\n  s = \"abcab\"\n\n  For each char, count occurrences:\n  'a': positions 0,3 → 2 occurrences\n  'b': positions 1,4 → 2 occurrences\n  'c': positions 2 → 1 occurrence\n\n  Substrings for char with freq f: f*(f+1)/2\n  'a': 2*3/2=3 (a at pos0, a at pos3, abcab)\n  'b': 2*3/2=3 (b at pos1, b at pos4, bcab)\n  'c': 1*2/2=1 (c)\n  Total: 3+3+1=7\n```\nFor each character, count its frequency. For each char with frequency f, there are f*(f+1)/2 substrings that start and end with that char (choose start and end positions from the f occurrences, including single chars). Sum across all chars. Time O(n), Space O(26).",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "long long cnt[26]={0},ans=0; for(char c:s)cnt[c-'a']++; for(int i=0;i<26;i++)ans+=cnt[i]*(cnt[i]+1)/2; cout<<ans;",
  },
  {
    id: "palindrome-substrings-count",
    title: "Count Palindromic Substrings (Rolling Hash)",
    category: "strings",
    difficulty: "medium",
    description: "Count all palindromic substrings using rolling hash with Rabin-Karp.",
    constraints: "1 <= |s| <= 5000",
    techniques: ["rolling-hash"],
    examples: [{"input":"aaa","output":"6"},{"input":"abc","output":"3"}],
    test_cases: [{"input":"aaa","expected":"6"},{"input":"abc","expected":"3"}],
    solution_template: "#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // Rolling hash + reverse hash for palindrome check\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\npalindromic-substrings-rolling:\n  s = \"aaa\"\n\n  Double rolling hash (forward + reverse) to check palindrome in O(1).\n\n  All substrings:\n  a(0), a(1), a(2) → 3 single\n  aa(0-1): forward=hash(\"aa\"), reverse=hash(\"aa\") → match ✓\n  aa(1-2): same → match ✓\n  aaa(0-2): forward=hash(\"aaa\"), reverse=hash(\"aaa\") → match ✓\n\n  Total: 3+2+1=6\n```\nCompute forward and reverse rolling hashes. For each substring, compare forward hash with reverse hash to check palindrome. Or use expand-around-center with hash for verification. Collect unique palindromes. Time O(n^2), Space O(1).",
    complexity: {"time":"O(n^2)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int n=s.size(),cnt=0; long long pwr[5001]={1},fwd[5002]={0},rev[5002]={0},mod=1e9+7,base=31; for(int i=1;i<=n;i++)pwr[i]=pwr[i-1]*base%mod; for(int i=0;i<n;i++)fwd[i+1]=(fwd[i]*base+s[i])%mod; for(int i=n-1;i>=0;i--)rev[i]=(rev[i+1]*base+s[i])%mod; auto get=[&](int l,int r){return (fwd[r+1]-fwd[l]*pwr[r-l+1]%mod+mod)%mod;}; auto getr=[&](int l,int r){return (rev[l]-rev[r+1]*pwr[r-l+1]%mod+mod)%mod;}; for(int i=0;i<n;i++)for(int j=i;j<n;j++)if(get(i,j)==getr(i,j))cnt++; cout<<cnt;",
  },
  {
    id: "distinct-echo-substrings",
    title: "Distinct Echo Substrings",
    category: "strings",
    difficulty: "hard",
    description: "Count distinct substrings that are the concatenation of two identical substrings (echo).",
    constraints: "1 <= |s| <= 2000",
    techniques: ["rolling-hash"],
    examples: [{"input":"abcabcabc","output":"3","explanation":"abcabc, bcabca, cabcab"}],
    test_cases: [{"input":"abcabcabc","expected":"3"},{"input":"leetcode","expected":"2"}],
    solution_template: "#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // Rolling hash for all substrings, check if s[i..i+L-1]==s[i+L..i+2L-1]\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\ndistinct-echo-substrings:\n  s = \"abcabcabc\"\n\n  For each length L from 1 to n/2:\n    For each start i, check if s[i..i+L-1] == s[i+L..i+2L-1]\n\n  L=1: a==b? no, b==c? no, c==a? no ... no matches\n  L=2: ab==ca? no, bc==ab? no, ca==bc? no ...\n  L=3: abc==abc ✓ (0-2,3-5) → collect \"abcabc\"\n        bca==bca ✓ (1-3,4-6) → \"bcabca\"\n        cab==cab ✓ (2-4,5-7) → \"cabcab\"\n\n  Total: 3\n\n  Use rolling hash for O(1) substring comparison.\n```\nFor each substring length L (1..n/2), slide a window and compare adjacent windows of same length using rolling hash. Collect distinct full strings (2*L length) when hashes match. Time O(n^2), Space O(n^2) worst-case for set.",
    complexity: {"time":"O(n^2)","space":"O(n^2)"},
    sheet: "Striver A2Z",
    solution_code: "int n=s.size(); long long pwr[2001]={1},h[2002]={0},mod=1e9+7; for(int i=1;i<=n;i++)pwr[i]=pwr[i-1]*31%mod; for(int i=0;i<n;i++)h[i+1]=(h[i]*31+s[i])%mod; auto get=[&](int l,int r){return (h[r+1]-h[l]*pwr[r-l+1]%mod+mod)%mod;}; unordered_set<long long> ans; for(int L=1;L<=n/2;L++){int cnt=0;for(int i=0;i+L+L<=n;i++){if(get(i,i+L-1)==get(i+L,i+L+L-1)){cnt++;ans.insert(get(i,i+L+L-1));}else cnt=0;}} cout<<ans.size();",
  },
  {
    id: "longest-nice-substring",
    title: "Longest Nice Substring",
    category: "strings",
    difficulty: "easy",
    description: "Find longest substring where every letter appears in both upper and lower case.",
    constraints: "1 <= |s| <= 100",
    techniques: ["rolling-hash"],
    examples: [{"input":"YazaAay","output":"aAa"}],
    test_cases: [{"input":"YazaAay","expected":"aAa"},{"input":"Bb","output":"Bb"}],
    solution_template: "#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // Brute force all substrings with bitmask check\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nlongest-nice-substring:\n  s = \"YazaAay\"\n\n  Check all substrings:\n  \"aA\" → a and A present ✓  len=2\n  \"aAa\" → a and A present ✓  len=3 ← longest\n  \"azaA\" → no z/Z → ✗\n  ...\n\n  Use bitmask: for each char, set bit for uppercase and lowercase.\n  Substring is nice if mask_lower == mask_upper.\n\n  Answer: \"aAa\"\n```\nBrute force all substrings (n<=100). For each substring, compute bitmask of lowercase letters present and uppercase letters present. If masks match, substring is nice. Return longest. Time O(n^2), Space O(1).",
    complexity: {"time":"O(n^2)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int n=s.size(),best=0,pos=0; for(int i=0;i<n;i++){int lo=0,up=0;for(int j=i;j<n;j++){if(s[j]>='a')lo|=1<<(s[j]-'a');else up|=1<<(s[j]-'A');if(lo==up&&j-i+1>best){best=j-i+1;pos=i;}}} cout<<s.substr(pos,best);",
  },
  {
    id: "delete-columns-to-make-sorted",
    title: "Delete Columns to Make Sorted",
    category: "strings",
    difficulty: "easy",
    description: "Count columns to delete so remaining columns are lexicographically sorted.",
    constraints: "1 <= n,m <= 100",
    techniques: ["rolling-hash"],
    examples: [{"input":"3 3\ncba\ndaf\nghi","output":"1","explanation":"Delete column 1 (index 1, chars b,a,g)"}],
    test_cases: [{"input":"3 3\ncba\ndaf\nghi","expected":"1"}],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<string> strs(n);\n  for(int i=0;i<n;i++)cin>>strs[i];\n\n  // Check each column, delete if unsorted\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\ndelete-columns-sorted:\n  strs = [\"cba\", \"daf\", \"ghi\"]\n\n  Column 0: c,d,g → sorted ✓\n  Column 1: b,a,g → b>a! ✗ → delete this column\n  Column 2: a,f,i → sorted ✓\n\n  Output: 1 (delete column 1)\n```\nFor each column, check if its characters are in non-decreasing order. Count columns that are NOT sorted. Time O(n*m), Space O(1).",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int del=0; for(int j=0;j<m;j++){for(int i=1;i<n;i++){if(strs[i][j]<strs[i-1][j]){del++;break;}}} cout<<del;",
  },
  {
    id: "substring-with-concatenated-words",
    title: "Substring with Concatenation of All Words",
    category: "strings",
    difficulty: "hard",
    description: "Find all start indices where a substring is a concatenation of all words (same length permutations).",
    constraints: "1 <= |s| <= 10^4, 1 <= words.length <= 5000",
    techniques: ["rolling-hash"],
    examples: [{"input":"barfoothefoobarman 2\nfoo bar","output":"0 9","explanation":"barfoo at 0, foobar at 9"}],
    test_cases: [{"input":"barfoothefoobarman 2\nfoo bar","expected":"0 9"}],
    solution_template: "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  string s; int n; cin >> s >> n;\n  vector<string> words(n);\n  for(int i=0;i<n;i++)cin>>words[i];\n\n  // Sliding window with word frequency map\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nsubstring-concatenated-words:\n  s = \"barfoothefoobarman\", words = [\"foo\", \"bar\"]\n  wordLen = 3, totalLen = 6\n\n  For each offset 0..wordLen-1:\n    Slide window of size totalLen, track word frequencies.\n\n  offset 0: \"barfoo\" → bar:1, foo:1 ✓ → index 0\n  slide: \"foothe\" → foo:1, the:1 ✗\n  ...\n  offset 3: \"thefoobar\" → ... index 9 ✓\n\n  Answer: [0, 9]\n```\nUse hash map of word->count. Slide window of size wordLen*n. Maintain word frequency in current window. If all word counts match expected, record start index. Time O(n * wordLen), Space O(words).",
    complexity: {"time":"O(n * wordLen)","space":"O(no. of words)"},
    sheet: "Striver A2Z",
    solution_code: "int wl=words[0].size(), tl=wl*n; unordered_map<string,int> need; for(auto& w:words)need[w]++; for(int off=0;off<wl;off++){unordered_map<string,int> have; int cnt=0; for(int i=off;i+wl<=s.size();i+=wl){if(i>=off+tl){string out=s.substr(i-tl,wl);if(need.count(out)&&--have[out]<need[out])cnt--;}string in=s.substr(i,wl);if(need.count(in)){have[in]++;if(have[in]<=need[in])cnt++;}if(cnt==n)cout<<i-tl+wl<<\" \";}}",
  },
  {
    id: "find-all-anagrams-in-string",
    title: "Find All Anagrams in String",
    category: "strings",
    difficulty: "medium",
    description: "Find all start indices of p's anagrams in s.",
    constraints: "1 <= |s|,|p| <= 3*10^4",
    techniques: ["rolling-hash"],
    examples: [{"input":"cbaebabacd abc","output":"0 6","explanation":"cba at 0, bac at 6"}],
    test_cases: [{"input":"cbaebabacd abc","expected":"0 6"},{"input":"abab ab","expected":"0 1 2"}],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  string s, p; cin >> s >> p;\n  // Sliding window with char frequency\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nfind-anagrams:\n  s = \"cbaebabacd\", p = \"abc\"\n  pLen = 3\n\n  Sliding window of size 3:\n  [c,b,a] → freq matches p → index 0\n  [b,a,e] → e not in p → skip\n  [a,e,b] → skip\n  [e,b,a] → skip\n  [b,a,b] → skip\n  [a,b,a] → skip\n  [b,a,c] → freq matches p → index 6\n  [a,c,d] → skip\n\n  Answer: [0, 6]\n```\nSliding window with frequency array of size 26. Compare window freq with p's freq. If equal, record start index. Use diff counter for O(1) comparison. Time O(n), Space O(1).",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int ns=s.size(),np=p.size(); if(np>ns){return 0;} int need[26]={0},have[26]={0},diff=0; for(char c:p)need[c-'a']++; for(int i=0;i<np;i++)have[s[i]-'a']++; for(int i=0;i<26;i++)if(have[i]!=need[i])diff++; if(!diff)cout<<0<<\" \"; for(int i=np;i<ns;i++){int out=s[i-np]-'a',in=s[i]-'a';if(have[out]==need[out])diff++;have[out]--;if(have[out]==need[out])diff--;if(have[in]==need[in])diff++;have[in]++;if(have[in]==need[in])diff--;if(!diff)cout<<i-np+1<<\" \";}",
  },
  {
    id: "count-number-of-homogenous-substrings",
    title: "Count Homogenous Substrings",
    category: "strings",
    difficulty: "medium",
    description: "Count homogenous substrings (substrings of same character).",
    constraints: "1 <= |s| <= 10^5",
    techniques: ["rolling-hash"],
    examples: [{"input":"abbcccaa","output":"13","explanation":"a:1, b:1, bb:1, c:1, cc:1, ccc:1, a:1, aa:1 = 13"}],
    test_cases: [{"input":"abbcccaa","expected":"13"},{"input":"xy","expected":"2"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // Count consecutive equal chars, add n*(n+1)/2\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nhomogenous-substrings:\n  s = \"abbcccaa\"\n\n  Groups of consecutive same char:\n  'a': len=1 → 1*2/2 = 1\n  'b': len=2 → 2*3/2 = 3  (\"b\", \"bb\")\n  'c': len=3 → 3*4/2 = 6  (\"c\", \"cc\", \"ccc\")\n  'a': len=2 → 2*3/2 = 3  (\"a\", \"aa\")\n\n  Total: 1+3+6+3 = 13\n```\nTraverse string, count consecutive equal characters. For a group of length L, number of homogenous substrings = L*(L+1)/2. Sum all groups. Time O(n), Space O(1).",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "long long ans=0,cnt=1,mod=1e9+7; for(int i=1;i<=s.size();i++){if(i<s.size()&&s[i]==s[i-1])cnt++;else{ans=(ans+cnt*(cnt+1)/2)%mod;cnt=1;}} cout<<ans;",
  },
  {
    id: "check-if-string-contains-binary-codes",
    title: "Check All Binary Codes of Size K",
    category: "strings",
    difficulty: "medium",
    description: "Check if a binary string contains all binary codes of length k as substrings.",
    constraints: "1 <= |s| <= 5*10^5, 1 <= k <= 20",
    techniques: ["rolling-hash"],
    examples: [{"input":"00110110 2","output":"true","explanation":"Contains 00,01,10,11"}],
    test_cases: [{"input":"00110110 2","expected":"true"},{"input":"0110 2","expected":"false"}],
    solution_template: "#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n  string s; int k; cin >> s >> k;\n  // Rolling hash for all substrings of length k\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nbinary-codes-size-k:\n  s = \"00110110\", k = 2\n  Need all 2^k = 4 codes: 00,01,10,11\n\n  Sliding window: substrings of length k:\n  \"00\" → hash 0\n  \"01\" → hash 1\n  \"11\" → hash 3\n  \"10\" → hash 2\n  ...\n  Collected: {0,1,2,3} = all 4 ✓ → true\n\n  With \"0110\", k=2:\n  \"01\"=1, \"11\"=3, \"10\"=2\n  Missing \"00\"=0 → false\n```\nSliding window with bitmask. Convert each binary substring of length k to integer. Track seen integers. If seen size reaches 2^k, return true. Use rolling hash for efficiency. Time O(n), Space O(2^k).",
    complexity: {"time":"O(n)","space":"O(2^k)"},
    sheet: "Striver A2Z",
    solution_code: "if(k>s.size()){cout<<\"false\";return 0;} unordered_set<int> seen; int mask=(1<<k)-1, cur=0; for(int i=0;i<k;i++)cur=(cur<<1)|(s[i]-'0'); seen.insert(cur); for(int i=k;i<s.size();i++){cur=((cur<<1)|(s[i]-'0'))&mask;seen.insert(cur);if(seen.size()==(1<<k)){cout<<\"true\";return 0;}} cout<<\"false\";",
  },
  {
    id: "longest-word-in-dictionary",
    title: "Longest Word in Dictionary",
    category: "strings",
    difficulty: "medium",
    description: "Find longest word that can be built one character at a time from other words.",
    constraints: "1 <= n <= 1000, 1 <= |word| <= 100",
    techniques: ["rolling-hash"],
    examples: [{"input":"6\nw wo wor word world ord","output":"word"}],
    test_cases: [{"input":"6\nw wo wor word world ord","expected":"word"}],
    solution_template: "#include <iostream>\n#include <unordered_set>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  string words[n];\n  for(int i=0;i<n;i++)cin>>words[i];\n  // Sort by length, check prefixes in set\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nlongest-word-dictionary:\n  words = [\"w\", \"wo\", \"wor\", \"word\", \"world\", \"ord\"]\n\n  Sort by length (and lexicographically for ties):\n  \"w\", \"wo\", \"wor\", \"ord\", \"word\", \"world\"\n\n  Buildable set:\n  \"w\" → insert\n  \"wo\" → \"w\" in set ✓ → insert\n  \"wor\" → \"wo\" in set ✓ → insert\n  \"ord\" → \"o\" not in set ✗ → skip\n  \"word\" → \"wor\" in set ✓ → insert, candidate\n  \"world\" → \"worl\" not in set ✗ → skip\n\n  Answer: \"word\"\n```\nSort words by length, then lexicographically. Insert into hash set. For each word, check if prefix (word without last char) is in set. Longest valid word wins. Time O(n log n + total chars), Space O(total chars).",
    complexity: {"time":"O(n log n + total chars)","space":"O(total chars)"},
    sheet: "Striver A2Z",
    solution_code: "sort(words,words+n,[](string& a,string& b){return a.size()!=b.size()?a.size()<b.size():a<b;}); unordered_set<string> st; string ans; for(auto& w:words){if(w.size()==1||st.count(w.substr(0,w.size()-1))){st.insert(w);if(w.size()>ans.size()||(w.size()==ans.size()&&w<ans))ans=w;}} cout<<ans;",
  },
  {
    id: "shortest-palindrome",
    title: "Shortest Palindrome",
    category: "strings",
    difficulty: "hard",
    description: "Add characters to front to make the shortest possible palindrome.",
    constraints: "1 <= |s| <= 5*10^4",
    techniques: ["rolling-hash"],
    examples: [{"input":"aacecaaa","output":"aaacecaaa"},{"input":"abcd","output":"dcbabcd"}],
    test_cases: [{"input":"aacecaaa","expected":"aaacecaaa"},{"input":"abcd","expected":"dcbabcd"}],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // Rolling hash to find longest palindromic prefix\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nshortest-palindrome:\n  s = \"aacecaaa\"\n\n  Find longest palindromic prefix using rolling hash:\n  Forward hash: h = s[0]*b^0 + s[1]*b^1 + ...\n  Reverse hash: rh = s[0]*b^(n-1) + s[1]*b^(n-2) + ...\n\n  Check for each prefix length L:\n  L=1: h(\"a\") == rh(\"a\") ✓\n  L=2: h(\"aa\") == rh(\"aa\") ✓\n  ...\n  L=7: h(\"aacecaa\") == rh(\"aacecaa\") ✓ → longest palindromic prefix = \"aacecaa\" (len=7)\n\n  Remaining: \"a\" (last char)\n  Add reverse of remaining: \"a\" + \"aacecaaa\" = \"aaacecaaa\"\n\n  For \"abcd\":\n  Longest palindromic prefix = \"a\" (len=1)\n  Remaining: \"bcd\" → reverse = \"dcb\"\n  Result: \"dcb\" + \"abcd\" = \"dcbabcd\"\n```\nCompute forward and reverse rolling hashes simultaneously. Find longest prefix where forward_hash == reverse_hash (palindromic prefix). Add reverse of remaining suffix to front. Time O(n), Space O(1).",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "long long f=0,r=0,p=1,mod=1e9+7,base=31,best=0; int n=s.size(); for(int i=0;i<n;i++){f=(f*base+s[i])%mod;r=(r+s[i]*p)%mod;p=p*base%mod;if(f==r)best=i+1;} string rem=s.substr(best); reverse(rem.begin(),rem.end()); cout<<rem+s;",
  },
  {
    id: "substring-with-largest-variance",
    title: "Substring With Largest Variance",
    category: "strings",
    difficulty: "hard",
    description: "Find substring with largest variance (freq of major char minus freq of minor char).",
    constraints: "1 <= |s| <= 10^4",
    techniques: ["rolling-hash"],
    examples: [{"input":"aababbb","output":"3","explanation":"Major=a, minor=b: aababbb → a:3,b:4 → 4-3=1? Actually aa:2a,0b=2, aab:2a,1b=1, ab:1a,1b=0, bab:1a,2b=1,... Let's check: substring \"aababbb\": a=3,b=4 → major=b minor=a → var=4-3=1. Not max. Try \"babbb\": a=1,b=4 → var=3. Answer: 3"}],
    test_cases: [{"input":"aababbb","expected":"3"},{"input":"abcde","expected":"0"}],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // Kadane's algorithm for each pair of letters\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nlargest-variance:\n  s = \"aababbb\"\n\n  For each pair of chars (major, minor) where major!=minor:\n    Scan: count_major++, count_minor++ for minor, track variance.\n    Reset if variance < 0 (Kadane-like).\n\n  Pair (b,a): treat b as +1, a as -1\n  a a b a b b b\n  -1 -2 -1 -2 -1 0 1  → max subarray sum = 1\n\n  Pair (a,b): treat a as +1, b as -1\n  a a b a b b b\n  1 2 1 2 1 0 -1  → max subarray sum with at least one -1\n  Track with hasMinor flag.\n  Result: 3 (from \"babbb\" where a=1,b=4 → var=3)\n```\nFor each pair of distinct letters (26*26=676 pairs), run Kadane's algorithm treating one letter as +1 and the other as -1. Track max variance ensuring at least one occurrence of the minor char. Time O(26^2 * n), Space O(1).",
    complexity: {"time":"O(26^2 * n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int ans=0; for(char ma='a';ma<='z';ma++)for(char mi='a';mi<='z';mi++){if(ma==mi)continue;int cur=0,has=0,first=0;for(char c:s){if(c==ma)cur++;else if(c==mi){has=1;cur--;if(cur<0&&first){cur=-1;first=0;}}if(has)ans=max(ans,cur);if(cur<0){cur=0;has=0;first=1;}}} cout<<ans;",
  },
  {
    id: "string-compression-ii",
    title: "String Compression II",
    category: "strings",
    difficulty: "hard",
    description: "Run-length encode string after deleting at most k characters to minimize encoded length.",
    constraints: "1 <= |s| <= 100, 0 <= k <= 100",
    techniques: ["rolling-hash"],
    examples: [{"input":"aaabcccd 2","output":"4","explanation":"Delete b and d → aaaccc → a3c3 → len=4"}],
    test_cases: [{"input":"aaabcccd 2","expected":"4"},{"input":"a 0","expected":"1"}],
    solution_template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string s; int k; cin >> s >> k;\n  // DP[i][d] = min length for prefix i with d deletions\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nstring-compression-ii:\n  s = \"aaabcccd\", k = 2\n\n  DP[i][d] = min encoding length for prefix ending at i with d deletions.\n\n  For each end position i, try starting a new run from j to i:\n  countSame = frequency of same char in s[j..i]\n  deletionsInRun = (i-j+1) - countSame\n  encodeLen = 1 + len(countSame) if countSame >= 2 else 1\n\n  Deleting b at pos 3 and d at pos 7:\n  \"aaaccc\" → a3c3 → \"a3c3\" = 4 chars\n  Optimal.\n```\nDP with state (index, deletions left). At each index, try keeping consecutive same characters and deleting others in between. Use DP with memoization. Time O(n^2 * k), Space O(n*k).",
    complexity: {"time":"O(n^2 * k)","space":"O(n*k)"},
    sheet: "Striver A2Z",
    solution_code: "int n=s.size(); vector<vector<int>> dp(n+1,vector<int>(k+1,100)); dp[0][0]=0; for(int i=1;i<=n;i++)for(int d=0;d<=k;d++){if(d>0)dp[i][d]=min(dp[i][d],dp[i-1][d-1]);int same=0,del=0;for(int j=i;j>=1;j--){if(s[j-1]==s[i-1])same++;else del++;if(del<=d){int len=1+(same>=10?2:same>=2?1:0);dp[i][d]=min(dp[i][d],dp[j-1][d-del]+len);}}} int ans=100; for(int d=0;d<=k;d++)ans=min(ans,dp[n][d]); cout<<ans;",
  },
  {
    id: "minimum-window-subsequence",
    title: "Minimum Window Subsequence",
    category: "strings",
    difficulty: "hard",
    description: "Find minimum contiguous substring of s that contains t as a subsequence.",
    constraints: "1 <= |s|,|t| <= 2*10^4",
    techniques: ["rolling-hash"],
    examples: [{"input":"abcdebdde bde","output":"bcde","explanation":"bcde contains b,d,e in order"}],
    test_cases: [{"input":"abcdebdde bde","expected":"bcde"},{"input":"jmeqksfrsdcbwq bee","expected":"be"}],
    solution_template: "#include <iostream>\n#include <vector>\n#include <climits>\nusing namespace std;\n\nint main() {\n  string s, t; cin >> s >> t;\n  // DP or two-pointer with next occurrence array\n\n  return 0;\n}",
    approach: "\n\nDiagram:\n```\nmin-window-subsequence:\n  s = \"abcdebdde\", t = \"bde\"\n\n  Two-pointer approach:\n  Find first occurrence of whole subsequence:\n  0:a 1:b 2:c 3:d 4:e 5:b 6:d 7:d 8:e\n  Forward: find b at 1, d at 3, e at 4 → window [1,4] len=4, start=1\n  Backward: from e at 4, find d at 3, b at 1 → window [1,4]\n\n  Continue:\n  Forward from 5: b at 5, d at 6, e at 8 → window [5,8] len=4\n  Backward: from e at 8, d at 7, b at 5 → window [5,7] len=3? No, e at 8.\n  Actually backward from e at 8: find d at 7, b at 5 → window [5,8] = 4\n\n  Min window = \"bcde\" (len 4)\n```\nDP: dp[i][j] = start index of minimum window in s[0..i] containing t[0..j]. Or use next occurrence table for O(1) character lookups and two-pointer scanning. Time O(|s|*|t|), Space O(|s|*|t|) or O(|t|) with optimization.",
    complexity: {"time":"O(|s|*|t|)","space":"O(|s|*|t|)"},
    sheet: "Striver A2Z",
    solution_code: "int ns=s.size(),nt=t.size(); vector<vector<int>> dp(ns+1,vector<int>(nt+1,-1)); for(int i=0;i<=ns;i++)dp[i][0]=i; for(int i=1;i<=ns;i++)for(int j=1;j<=nt;j++){if(s[i-1]==t[j-1])dp[i][j]=dp[i-1][j-1];else dp[i][j]=dp[i-1][j];} int best=1e9,pos=-1; for(int i=1;i<=ns;i++){if(dp[i][nt]!=-1){int len=i-dp[i][nt];if(len<best){best=len;pos=dp[i][nt];}}} cout<<s.substr(pos,best);",
  },
]
