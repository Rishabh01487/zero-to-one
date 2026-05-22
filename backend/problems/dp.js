export default [
  {
    id: "fib-dp",
    title: "Fibonacci Number (DP)",
    category: "dp",
    difficulty: "easy",
    description: "Find nth fibonacci number using dynamic programming.",
    constraints: "1 <= n <= 1000",
    examples: [
      {"input":"10","output":"55"}
    ],
    test_cases: [
      {"input":"10","expected":"55"},
      {"input":"50","expected":"12586269025"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  if (n <= 1) { cout << n << endl; return 0; }\n  \n  // DP: dp[i] = dp[i-1] + dp[i-2]\n\n  return 0;\n}",
    approach: "DP bottom-up: store computed values in array, dp[i]=dp[i-1]+dp[i-2].",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "long long dp[n+1]; dp[0]=0; dp[1]=1; for(int i=2;i<=n;i++)dp[i]=dp[i-1]+dp[i-2]; cout<<dp[n];",
  },
  {
    id: "coin-change",
    title: "Coin Change (Min Coins)",
    category: "dp",
    difficulty: "medium",
    description: "Find minimum number of coins to make a given amount.",
    constraints: "1 <= n <= 12, 1 <= amount <= 10^4",
    examples: [
      {"input":"3\n1 2 5\n11","output":"3","explanation":"5+5+1 = 11"}
    ],
    test_cases: [
      {"input":"3\n1 2 5\n11","expected":"3"},
      {"input":"3\n2\n3","expected":"-1"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, amount;\n  cin >> n;\n  int coins[n];\n  for (int i = 0; i < n; i++) cin >> coins[i];\n  cin >> amount;\n\n  // DP[amt] = min(DP[amt - coin] + 1)\n\n  cout << (dp[amount] > amount ? -1 : dp[amount]) << endl;\n  return 0;\n}",
    approach: "DP: dp[a] = min coins to make amount a. For each coin, dp[a]=min(dp[a],dp[a-coin]+1).",
    complexity: {"time":"O(n*amount)","space":"O(amount)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> dp(amount+1,amount+1); dp[0]=0; for(int a=1;a<=amount;a++)for(int c:coins)if(c<=a)dp[a]=min(dp[a],dp[a-c]+1); cout<<(dp[amount]>amount?-1:dp[amount]);",
  },
  {
    id: "longest-inc-subseq",
    title: "Longest Increasing Subsequence",
    category: "dp",
    difficulty: "medium",
    description: "Find the length of the longest strictly increasing subsequence.",
    constraints: "1 <= n <= 2500",
    examples: [
      {"input":"8\n10 9 2 5 3 7 101 18","output":"4","explanation":"LIS: [2,3,7,101]"}
    ],
    test_cases: [
      {"input":"8\n10 9 2 5 3 7 101 18","expected":"4"},
      {"input":"6\n0 1 0 3 2 3","expected":"4"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  // DP[i] = 1 + max(DP[j]) for j < i and arr[j] < arr[i]\n\n  cout << maxLen << endl;\n  return 0;\n}",
    approach: "DP: dp[i]=1+LIS ending at i. For each j<i, if arr[j]<arr[i], dp[i]=max(dp[i],dp[j]+1).",
    complexity: {"time":"O(n²)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> dp(n,1); int mx=1; for(int i=0;i<n;i++){for(int j=0;j<i;j++)if(arr[j]<arr[i])dp[i]=max(dp[i],dp[j]+1);mx=max(mx,dp[i]);}cout<<mx;",
  },
  {
    id: "0-1-knapsack",
    title: "0/1 Knapsack",
    category: "dp",
    difficulty: "medium",
    description: "Given weights and values, find max value that fits in knapsack capacity.",
    constraints: "1 <= n <= 100, 1 <= W <= 1000",
    examples: [
      {"input":"3\n10 20 30\n60 100 120\n50","output":"220","explanation":"Items 2+3 = 100+120 = 220, weight 20+30=50"}
    ],
    test_cases: [
      {"input":"3\n10 20 30\n60 100 120\n50","expected":"220"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, W;\n  cin >> n;\n  int wt[n], val[n];\n  for (int i = 0; i < n; i++) cin >> wt[i];\n  for (int i = 0; i < n; i++) cin >> val[i];\n  cin >> W;\n\n  // DP: dp[w] = max(dp[w], dp[w-wt[i]] + val[i])\n\n  cout << dp[W] << endl;\n  return 0;\n}",
    approach: "DP 1D: for each item, iterate capacity backwards, dp[w]=max(dp[w],dp[w-wt[i]]+val[i]).",
    complexity: {"time":"O(n*W)","space":"O(W)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> dp(W+1,0); for(int i=0;i<n;i++)for(int w=W;w>=wt[i];w--)dp[w]=max(dp[w],dp[w-wt[i]]+val[i]); cout<<dp[W];",
  },
  {
    id: "edit-distance",
    title: "Edit Distance (Levenshtein)",
    category: "dp",
    difficulty: "hard",
    description: "Min operations to convert word1 to word2 (insert, delete, replace).",
    constraints: "1 <= |s1|,|s2| <= 500",
    examples: [
      {"input":"horse\nros","output":"3","explanation":"horse->rorse->rose->ros (3 ops)"}
    ],
    test_cases: [
      {"input":"horse\nros","expected":"3"},
      {"input":"intention\nexecution","expected":"5"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string s1, s2;\n  cin >> s1 >> s2;\n  int n = s1.size(), m = s2.size();\n\n  // 2D DP: dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+(s1[i]!=s2[j]))\n\n  cout << dp[n][m] << endl;\n  return 0;\n}",
    approach: "2D DP: dp[i][j]=min(insert,delete,replace). Insert=dp[i][j-1]+1, Delete=dp[i-1][j]+1, Replace=dp[i-1][j-1]+(s1[i]!=s2[j]).",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "Striver A2Z",
    solution_code: "vector<vector<int>> dp(n+1,vector<int>(m+1)); for(int i=0;i<=n;i++)dp[i][0]=i; for(int j=0;j<=m;j++)dp[0][j]=j; for(int i=1;i<=n;i++)for(int j=1;j<=m;j++){if(s1[i-1]==s2[j-1])dp[i][j]=dp[i-1][j-1];else dp[i][j]=1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]});}cout<<dp[n][m];",
  },
  {
    id: "lcs",
    title: "Longest Common Subsequence",
    category: "dp",
    difficulty: "medium",
    description: "Find length of longest common subsequence between two strings.",
    constraints: "1 <= |s1|,|s2| <= 1000",
    examples: [
      {"input":"abcde\nace","output":"3","explanation":"LCS = \"ace\""}
    ],
    test_cases: [
      {"input":"abcde\nace","expected":"3"},
      {"input":"abc\nabc","expected":"3"},
      {"input":"abc\ndef","expected":"0"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  string s1, s2;\n  cin >> s1 >> s2;\n  int n = s1.size(), m = s2.size();\n\n  // 2D DP: if match dp[i][j]=1+dp[i-1][j-1], else max(dp[i-1][j], dp[i][j-1])\n\n  cout << dp[n][m] << endl;\n  return 0;\n}",
    approach: "2D DP: if chars match, dp[i][j]=1+dp[i-1][j-1]; else dp[i][j]=max(dp[i-1][j],dp[i][j-1]).",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "Striver A2Z",
    solution_code: "vector<vector<int>> dp(n+1,vector<int>(m+1)); for(int i=1;i<=n;i++)for(int j=1;j<=m;j++){if(s1[i-1]==s2[j-1])dp[i][j]=1+dp[i-1][j-1];else dp[i][j]=max(dp[i-1][j],dp[i][j-1]);}cout<<dp[n][m];",
  },
  {
    id: "rod-cutting",
    title: "Rod Cutting",
    category: "dp",
    difficulty: "medium",
    description: "Find max value from cutting a rod of length n.",
    constraints: "1 <= n <= 100",
    examples: [
      {"input":"8\n1 5 8 9 10 17 17 20","output":"22","explanation":"Cut into 2+6 = 5+17 = 22"}
    ],
    test_cases: [
      {"input":"8\n1 5 8 9 10 17 17 20","expected":"22"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int price[n];\n  for (int i = 0; i < n; i++) cin >> price[i];\n\n  // dp[i] = max(price[j] + dp[i-j-1]) for all j\n\n  cout << dp[n] << endl;\n  return 0;\n}",
    approach: "DP: for each length i, try all cuts j, dp[i]=max(price[j]+dp[i-j-1]).",
    complexity: {"time":"O(n²)","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "int dp[n+1]={0}; for(int i=1;i<=n;i++)for(int j=0;j<i;j++)dp[i]=max(dp[i],price[j]+dp[i-j-1]);cout<<dp[n];",
  },
  {
    id: "min-path-sum",
    title: "Minimum Path Sum in Grid",
    category: "dp",
    difficulty: "medium",
    description: "Find min sum path from top-left to bottom-right (only down/right).",
    constraints: "1 <= n,m <= 200",
    examples: [
      {"input":"3 3\n1 3 1\n1 5 1\n4 2 1","output":"7","explanation":"1->3->1->1->1 = 7"}
    ],
    test_cases: [
      {"input":"3 3\n1 3 1\n1 5 1\n4 2 1","expected":"7"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int grid[n][m];\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < m; j++)\n      cin >> grid[i][j];\n\n  // dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])\n\n  cout << dp[n-1][m-1] << endl;\n  return 0;\n}",
    approach: "DP: first row/col are cumulative sums. For other cells, dp[i][j]=grid[i][j]+min(dp[i-1][j],dp[i][j-1]).",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "Striver A2Z",
    solution_code: "int dp[n][m]; dp[0][0]=grid[0][0]; for(int i=1;i<n;i++)dp[i][0]=dp[i-1][0]+grid[i][0]; for(int j=1;j<m;j++)dp[0][j]=dp[0][j-1]+grid[0][j]; for(int i=1;i<n;i++)for(int j=1;j<m;j++)dp[i][j]=grid[i][j]+min(dp[i-1][j],dp[i][j-1]);cout<<dp[n-1][m-1];",
  },
  {
    id: "subset-sum",
    title: "Subset Sum Problem",
    category: "dp",
    difficulty: "medium",
    description: "Check if subset with given sum exists.",
    constraints: "1 <= n <= 200, 1 <= sum <= 10^4",
    examples: [
      {"input":"6\n3 34 4 12 5 2\n9","output":"Yes","explanation":"4+5=9"}
    ],
    test_cases: [
      {"input":"6\n3 34 4 12 5 2\n9","expected":"Yes"},
      {"input":"4\n1 2 3 7\n10","expected":"No"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> target;\n\n  // dp[s] = can we achieve sum s?\n\n  cout << (dp[target] ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "DP boolean: dp[s]=true if sum s achievable. For each num, iterate sums backwards: dp[s]=dp[s]||dp[s-num].",
    complexity: {"time":"O(n*target)","space":"O(target)"},
    sheet: "Striver A2Z",
    solution_code: "vector<bool> dp(target+1); dp[0]=1; for(int x:arr)for(int s=target;s>=x;s--)if(dp[s-x])dp[s]=1; cout<<(dp[target]?\"Yes\":\"No\");",
  },
  {
    id: "unbounded-knapsack",
    title: "Unbounded Knapsack",
    category: "dp",
    difficulty: "medium",
    description: "Each item can be picked unlimited times.",
    constraints: "1 <= n <= 100, 1 <= W <= 1000",
    examples: [
      {"input":"2\n1 3\n10 40\n4","output":"120","explanation":"Item 3x weight 3+3+3=9, value 40+40+40=120"}
    ],
    test_cases: [
      {"input":"2\n1 3\n10 40\n4","expected":"120"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, W; cin >> n;\n  int wt[n], val[n];\n  for (int i = 0; i < n; i++) cin >> wt[i];\n  for (int i = 0; i < n; i++) cin >> val[i];\n  cin >> W;\n\n  // for each w: dp[w] = max(dp[w], dp[w-wt[i]] + val[i])\n\n  cout << dp[W] << endl;\n  return 0;\n}",
    approach: "DP 1D forward iteration: for each weight, dp[w]=max(dp[w],dp[w-wt[i]]+val[i]).",
    complexity: {"time":"O(n*W)","space":"O(W)"},
    sheet: "Love Babbar 450",
    solution_code: "vector<int> dp(W+1,0); for(int w=1;w<=W;w++)for(int i=0;i<n;i++)if(wt[i]<=w)dp[w]=max(dp[w],dp[w-wt[i]]+val[i]);cout<<dp[W];",
  },
  {
    id: "palindrome-part",
    title: "Palindrome Partitioning (Min Cuts)",
    category: "dp",
    difficulty: "hard",
    description: "Find minimum cuts needed to partition string into all palindromes.",
    constraints: "1 <= |s| <= 2000",
    examples: [
      {"input":"aab","output":"1","explanation":"aa | b = 1 cut"}
    ],
    test_cases: [
      {"input":"aab","expected":"1"},
      {"input":"abcbdd","expected":"2"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  int n = s.size();\n  bool pal[n][n] = {false};\n  int dp[n];\n\n  // O(n^2): mark palindromes + DP for cuts\n\n  cout << dp[n-1] << endl;\n  return 0;\n}",
    approach: "Precompute palindrome table. DP: dp[i]=min cuts for prefix i. If s[j..i] palindrome, dp[i]=min(dp[i],dp[j-1]+1).",
    complexity: {"time":"O(n²)","space":"O(n²)"},
    sheet: "Love Babbar 450",
    solution_code: "vector<vector<bool>> pal(n,vector<bool>(n,0)); for(int i=0;i<n;i++)pal[i][i]=1; for(int len=2;len<=n;len++)for(int i=0;i+len-1<n;i++){int j=i+len-1;if(s[i]==s[j]&&(len==2||pal[i+1][j-1]))pal[i][j]=1;} vector<int> dp(n,0); for(int i=0;i<n;i++){if(pal[0][i])dp[i]=0;else{dp[i]=i;for(int j=0;j<i;j++)if(pal[j+1][i])dp[i]=min(dp[i],dp[j]+1);}}cout<<dp[n-1];",
  },
  {
    id: "egg-drop",
    title: "Egg Dropping Problem",
    category: "dp",
    difficulty: "hard",
    description: "Find min attempts to find critical floor with k eggs and n floors.",
    constraints: "1 <= k <= 100, 1 <= n <= 10^4",
    examples: [
      {"input":"2 10","output":"4"}
    ],
    test_cases: [
      {"input":"2 10","expected":"4"},
      {"input":"1 5","expected":"5"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int k, n; cin >> k >> n;\n\n  // dp[e][f] = min(max(dp[e-1][x-1], dp[e][f-x]) + 1)\n\n  cout << dp[k][n] << endl;\n  return 0;\n}",
    approach: "DP: dp[e][f]=min(1+max(dp[e-1][x-1],dp[e][f-x])) over all floors x. Binary search optimization possible.",
    complexity: {"time":"O(k*n²)","space":"O(k*n)"},
    sheet: "Love Babbar 450",
    solution_code: "vector<vector<int>> dp(k+1,vector<int>(n+1)); for(int i=1;i<=k;i++){dp[i][0]=0;dp[i][1]=1;} for(int j=1;j<=n;j++)dp[1][j]=j; for(int i=2;i<=k;i++)for(int j=2;j<=n;j++){dp[i][j]=INT_MAX;for(int x=1;x<=j;x++)dp[i][j]=min(dp[i][j],1+max(dp[i-1][x-1],dp[i][j-x]));}cout<<dp[k][n];",
  },
  {
    id: "wildcard-match-dp",
    title: "Wildcard Matching (DP)",
    category: "dp",
    difficulty: "hard",
    description: "Match string with pattern: ? = any char, * = any sequence.",
    constraints: "1 <= |s|,|p| <= 2000",
    examples: [
      {"input":"aa a*","output":"Yes"}
    ],
    test_cases: [
      {"input":"aa a*","expected":"Yes"},
      {"input":"cb ?a","expected":"No"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  string s, p;\n  cin >> s >> p;\n  int n = s.size(), m = p.size();\n\n  // 2D boolean DP\n\n  cout << (dp[n][m] ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "2D DP: handle ? matches single char, * matches empty/one/many.",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "Striver A2Z",
    solution_code: "int n=s.size(),m=p.size(); vector<vector<bool>> dp(n+1,vector<bool>(m+1)); dp[0][0]=1; for(int j=1;j<=m;j++)if(p[j-1]=='*')dp[0][j]=dp[0][j-1]; for(int i=1;i<=n;i++)for(int j=1;j<=m;j++){if(p[j-1]=='*')dp[i][j]=dp[i-1][j]||dp[i][j-1];else if(p[j-1]=='?'||s[i-1]==p[j-1])dp[i][j]=dp[i-1][j-1];}cout<<(dp[n][m]?\"Yes\":\"No\");",
  }
]
