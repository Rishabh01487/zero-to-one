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
  }
]
