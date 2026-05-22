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
]
