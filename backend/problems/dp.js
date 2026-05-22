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
  }
]
