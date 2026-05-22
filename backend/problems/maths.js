export default [
  {
    id: "count-primes",
    title: "Count Primes (Sieve)",
    category: "maths",
    difficulty: "medium",
    description: "Count primes less than n using Sieve of Eratosthenes.",
    constraints: "1 <= n <= 5 * 10^6",
    examples: [
      {"input":"10","output":"4"}
    ],
    test_cases: [
      {"input":"10","expected":"4"},
      {"input":"0","expected":"0"}
    ],
    approach: "Create boolean array of size n. Mark multiples of each prime starting from 2. Count the unmarked.",
    complexity: {"time":"O(n log log n)","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "vector<bool> isPrime(n, true);\nint count = 0;\nfor (int i = 2; i < n; i++) {\n  if (isPrime[i]) { count++; for (int j = i * 2; j < n; j += i) isPrime[j] = false; }\n}",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // sieve\n  return 0;\n}",
  },
  {
    id: "gcd-euclid",
    title: "GCD (Euclidean Algorithm)",
    category: "maths",
    difficulty: "easy",
    description: "Find GCD of two numbers.",
    constraints: "1 <= a,b <= 10^9",
    examples: [
      {"input":"48 18","output":"6"}
    ],
    test_cases: [
      {"input":"48 18","expected":"6"},
      {"input":"17 5","expected":"1"}
    ],
    approach: "Euclidean algorithm: gcd(a,b) = gcd(b, a%b). Repeat until b=0, then a is the GCD.",
    complexity: {"time":"O(log min(a,b))","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "while (b) { int t = b; b = a % b; a = t; }\ncout << a;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int a, b; cin >> a >> b;\n  // Euclidean GCD\n  return 0;\n}",
  }
]
