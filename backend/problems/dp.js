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
  }
]
