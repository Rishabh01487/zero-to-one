export default [
  {
    id: "rev-string",
    title: "Reverse a String",
    category: "strings",
    difficulty: "easy",
    description: "Reverse the given string in-place.",
    constraints: "1 <= |s| <= 10^5",
    examples: [
      {"input":"hello","output":"olleh"}
    ],
    test_cases: [
      {"input":"hello","expected":"olleh"},
      {"input":"world","expected":"dlrow"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // reverse s in-place\n\n  cout << s << endl;\n  return 0;\n}",
    approach: "Two-pointer swap from both ends.",
    complexity: {"time":"O(n)","space":"O(1)"},
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
    examples: [
      {"input":"racecar","output":"Yes"}
    ],
    test_cases: [
      {"input":"racecar","expected":"Yes"},
      {"input":"hello","expected":"No"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // two-pointer check\n\n  cout << (isPalindrome ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "Two-pointer: compare characters from both ends moving inward.",
    complexity: {"time":"O(n)","space":"O(1)"},
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
    examples: [
      {"input":"anagram nagaram","output":"Yes"}
    ],
    test_cases: [
      {"input":"anagram nagaram","expected":"Yes"},
      {"input":"cat rat","expected":"No"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string s, t;\n  cin >> s >> t;\n\n  // character count\n\n  cout << (isAnagram ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "Count char frequencies. If all counts match, strings are anagrams.",
    complexity: {"time":"O(n)","space":"O(1)"},
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
    examples: [
      {"input":"geeksforgeeks","output":"f"}
    ],
    test_cases: [
      {"input":"geeksforgeeks","expected":"f"},
      {"input":"aabbcc","expected":"-"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  string s;\n  cin >> s;\n\n  // frequency array\n\n  cout << result << endl;\n  return 0;\n}",
    approach: "Count frequencies in first pass. Second pass finds first char with count 1.",
    complexity: {"time":"O(n)","space":"O(1)"},
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
  }
]
