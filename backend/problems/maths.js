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
  },
  {
    id: "factorial-large",
    title: "Factorial of Large Number",
    category: "maths",
    difficulty: "medium",
    description: "Find factorial of n (result can be very large).",
    constraints: "1 <= n <= 1000",
    examples: [
      {"input":"10","output":"3628800"}
    ],
    test_cases: [
      {"input":"10","expected":"3628800"},
      {"input":"5","expected":"120"}
    ],
    approach: "Use array/vector to store digits. Multiply each digit by i (2..n), handle carry. Result stored in reverse.",
    complexity: {"time":"O(n²)","space":"O(n)"},
    sheet: "Love Babbar 450",
    solution_code: "vector<int> res = {1};\nfor (int i = 2; i <= n; i++) {\n  int carry = 0;\n  for (int j = 0; j < res.size(); j++) {\n    int prod = res[j] * i + carry;\n    res[j] = prod % 10;\n    carry = prod / 10;\n  }\n  while (carry) { res.push_back(carry%10); carry /= 10; }\n}",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // large factorial\n  return 0;\n}",
  },
  {
    id: "exponentiation",
    title: "Modular Exponentiation (Fast Power)",
    category: "maths",
    difficulty: "medium",
    description: "Compute (x^n) % m in O(log n).",
    constraints: "1 <= x,n,m <= 10^9",
    examples: [
      {"input":"2 10 1000000007","output":"1024"}
    ],
    test_cases: [
      {"input":"2 10 1000000007","expected":"1024"}
    ],
    approach: "Exponentiation by squaring: if n is even, (x²)^(n/2); if odd, x * x^(n-1). Take mod at each step.",
    complexity: {"time":"O(log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "long long result = 1;\nwhile (n > 0) {\n  if (n & 1) result = (result * x) % m;\n  x = (x * x) % m;\n  n >>= 1;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  long long x, n, m; cin >> x >> n >> m;\n  // fast exponentiation\n  return 0;\n}",
  }
]
