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
  }
]
