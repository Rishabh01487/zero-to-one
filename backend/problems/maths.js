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
    approach: "This problem asks to count the number of prime numbers less than a given non-negative integer n using the Sieve of Eratosthenes. The core intuition is that any composite number has a prime factor at most its square root. The sieve starts with a boolean array of size n, initially all true. We iterate i from 2 up to sqrt(n). When we encounter a prime i, we mark all multiples of i starting from i*i as non-prime, since any smaller multiple i*k where k < i would have already been marked by the smaller prime factor k.\n\nDiagram:\n```\nn = 10\n\nInitial: [2, 3, 4, 5, 6, 7, 8, 9]\n\ni=2: mark 4, 6, 8 as composite\ni=3: mark 9 as composite\ni=4: already composite, skip\ni=5: 5^2 = 25 > 10 → stop\n\nRemaining primes: 2, 3, 5, 7 → count = 4\n\nn = 30:\n  Initial: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]\n  i=2: mark 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30\n  i=3: mark 9, 15, 21, 27\n  i=5: mark 25\n  i=7: 7^2=49 > 30 → stop\n  Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 (10 primes)\n```\n\nTime complexity is O(n log log n) and space is O(n).",
    complexity: {"time":"O(n log log n)","space":"O(n)"},
    sheet: "Love Babbar 450",
    techniques: ["maths-technique"],
    solution_code: "vector<bool> isPrime(n, true);\nint count = 0;\nfor (int i = 2; i < n; i++) {\n  if (isPrime[i]) { count++; for (int j = i * 2; j < n; j += i) isPrime[j] = false; }\n}",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // sieve\n  return 0;\n}",
  },
  {
    id: "gcd-euclidean",
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
    approach: "This problem asks to find the greatest common divisor (GCD) of two positive integers using the Euclidean algorithm. The fundamental insight is gcd(a, b) = gcd(b, a mod b). The algorithm repeatedly replaces (a, b) with (b, a % b) until b becomes 0.\n\nDiagram:\n```\ngcd(48, 18)\n\n  48 ÷ 18 = 2 remainder 12\n  gcd(48, 18) = gcd(18, 12)\n\n  18 ÷ 12 = 1 remainder 6\n  gcd(18, 12) = gcd(12, 6)\n\n  12 ÷ 6 = 2 remainder 0\n  gcd(12, 6) = gcd(6, 0) = 6\n\n  Result: 6\n\n  a=48, b=18 → a=18, b=12 → a=12, b=6 → a=6, b=0 → return 6\n\ngcd(17, 5): 17%5=2, 5%2=1, 2%1=0 → gcd=1 (coprime)\n```\n\nTime complexity is O(log min(a,b)), space O(1).",
    complexity: {"time":"O(log min(a,b))","space":"O(1)"},
    sheet: "Love Babbar 450",
    techniques: ["maths-technique"],
    solution_code: "while (b) { int t = b; b = a % b; a = t; }\ncout << a;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int a, b; cin >> a >> b;\n  // Euclidean GCD\n  return 0;\n}",
  },
  {
    id: "power-mod",
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
    approach: "Compute (x^n) % m using exponentiation by squaring.\n\nDiagram:\n```\nx=2, n=10, m=1000000007\n\nn=10 = 1010₂\n\nresult=1, base=2\nn=10 (even): base=4, n=5\nn=5 (odd): result=1*4=4, base=16, n=2\nn=2 (even): base=256, n=1\nn=1 (odd): result=4*256=1024, base=..., n=0\n\nReturn 1024 = 2^10 ✓\n\nx=3, n=5\nn=5 (odd): result=3, base=9, n=2\nn=2 (even): base=81, n=1\nn=1 (odd): result=3*81=243, n=0\nReturn 243 = 3^5 ✓\n```\n\nTime O(log n), Space O(1).",
    complexity: {"time":"O(log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    techniques: ["maths-technique"],
    solution_code: "long long result = 1;\nwhile (n > 0) {\n  if (n & 1) result = (result * x) % m;\n  x = (x * x) % m;\n  n >>= 1;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  long long x, n, m; cin >> x >> n >> m;\n  // fast exponentiation\n  return 0;\n}",
  },
  {
    id: "sieve-eratosthenes",
    title: "Sieve of Eratosthenes (Generate Primes)",
    category: "maths",
    difficulty: "medium",
    description: "Generate all prime numbers less than n using the Sieve of Eratosthenes.",
    constraints: "2 <= n <= 10^6",
    examples: [
      {"input":"20","output":"2 3 5 7 11 13 17 19"}
    ],
    test_cases: [
      {"input":"20","expected":"2 3 5 7 11 13 17 19"}
    ],
    approach: "Generate primes by marking composites using the classic sieve.\n\nDiagram:\n```\nn = 20\n\ni=2:  mark 4,6,8,10,12,14,16,18 as composite\ni=3:  mark 9,15 as composite\ni=4:  skip (already composite)\ni=5:  5² = 25 > 19 → stop\n\nPrimes: 2,3,5,7,11,13,17,19\n\nSieve visual:\n  i: 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19\n     P P C P C P C C C  P  C  P  C  C  C  P  C  P\n  (P=prime, C=composite)\n```\n\nTime O(n log log n), Space O(n).",
    complexity: {"time":"O(n log log n)","space":"O(n)"},
    sheet: "Love Babbar 450",
    techniques: ["maths-technique"],
    solution_code: "vector<bool> isPrime(n, true);\nfor (int i = 2; i * i < n; i++) if (isPrime[i]) for (int j = i * i; j < n; j += i) isPrime[j] = false;\nfor (int i = 2; i < n; i++) if (isPrime[i]) cout << i << \" \";",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // sieve\n  return 0;\n}",
  },
  {
    id: "factorial-trailing-zeros",
    title: "Factorial Trailing Zeros",
    category: "maths",
    difficulty: "easy",
    description: "Count the number of trailing zeros in n!.",
    constraints: "1 <= n <= 10^9",
    examples: [
      {"input":"25","output":"6"},
      {"input":"10","output":"2"}
    ],
    test_cases: [
      {"input":"25","expected":"6"},
      {"input":"10","expected":"2"}
    ],
    approach: "Count factors of 5 in n! since factors of 2 are always more abundant.\n\nDiagram:\n```\nn=25: 25/5=5, 25/25=1, 25/125=0 → total=6\nnn=10: 10/5=2, 10/25=0 → total=2\nnn=100: 100/5=20, 100/25=4, 100/125=0 → total=24\n\nVerification:\n  10! = 3628800 (2 trailing zeros) ✓\n  25! = 15511210043330985984000000 (6 trailing zeros) ✓\n```\n\nTime O(log₅ n), Space O(1).",
    complexity: {"time":"O(log_5 n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    techniques: ["maths-technique"],
    solution_code: "int count = 0;\nfor (int d = 5; d <= n; d *= 5) count += n / d;\ncout << count;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // count trailing zeros\n  return 0;\n}",
  },
  {
    id: "ncr-mod-p",
    title: "nCr modulo p (Lucas Theorem)",
    category: "maths",
    difficulty: "hard",
    description: "Compute binomial coefficient nCr modulo prime p using Lucas Theorem.",
    constraints: "1 <= n,r <= 10^18, p <= 10^5",
    examples: [
      {"input":"5 2 7","output":"3"}
    ],
    test_cases: [
      {"input":"5 2 7","expected":"3"},
      {"input":"10 3 13","expected":"1"}
    ],
    approach: "Decompose n and r in base p, multiply nCr for each digit position using Fermat's little theorem for modular inverses.\n\nDiagram:\n```\nn=5, r=2, p=7 → 5C2=10, 10 mod 7=3\n\nn=100 (base 5), r=50 (base 5), p=5\n  n base5: (4,0,0), r base5: (2,0,0)\n  result = C(4,2) x C(0,0) x C(0,0) mod 5\n         = 6 x 1 x 1 mod 5 = 1\n\nIf any digit of r > corresponding digit of n, result is 0.\n```\n\nTime O(p) precompute + O(log_p n), Space O(p).",
    complexity: {"time":"O(p + log_p n)","space":"O(p)"},
    sheet: "Codeforces",
    techniques: ["maths-technique"],
    solution_code: "long long nCrModP(long long n, long long r, int p) {\n  if (r > n) return 0;\n  vector<long long> fact(p), invFact(p);\n  fact[0] = 1;\n  for (int i = 1; i < p; i++) fact[i] = fact[i-1] * i % p;\n  invFact[p-1] = modPow(fact[p-1], p-2, p);\n  for (int i = p-2; i >= 0; i--) invFact[i] = invFact[i+1] * (i+1) % p;\n  long long res = 1;\n  while (n || r) {\n    int ni = n % p, ri = r % p;\n    if (ri > ni) return 0;\n    res = res * fact[ni] % p * invFact[ri] % p * invFact[ni - ri] % p;\n    n /= p; r /= p;\n  }\n  return res;\n}",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  long long n, r; int p; cin >> n >> r >> p;\n  // nCr mod p\n  return 0;\n}",
  },
  {
    id: "euler-totient",
    title: "Euler Totient Function",
    category: "maths",
    difficulty: "medium",
    description: "Compute phi(n) = count of numbers <= n that are coprime to n.",
    constraints: "1 <= n <= 10^12",
    examples: [
      {"input":"10","output":"4"}
    ],
    test_cases: [
      {"input":"10","expected":"4"},
      {"input":"1","expected":"1"}
    ],
    approach: "phi(n) = n * Pi(1 - 1/p) for each distinct prime factor p of n.\n\nDiagram:\n```\nn=10: prime factors 2,5 → phi=10*(1-1/2)*(1-1/5)=10*0.5*0.8=4\n  Coprime to 10: 1,3,7,9 → 4 ✓\nn=36: prime factors 2,3 → phi=36*(1-1/2)*(1-1/3)=36*0.5*0.666=12\n  Coprime to 36: 1,5,7,11,13,17,19,23,25,29,31,35 → 12 ✓\nn=7 (prime): phi=7*(1-1/7)=6 → 1..6 all coprime ✓\n\nAlgorithm: result=n; for p=2..sqrt(n): if n%p==0: while n%p==0 n/=p; result-=result/p\nif n>1: result-=result/n\n```\n\nTime O(sqrt(n)), Space O(1).",
    complexity: {"time":"O(sqrt(n))","space":"O(1)"},
    sheet: "GeeksforGeeks",
    techniques: ["maths-technique"],
    solution_code: "long long result = n;\nfor (long long p = 2; p * p <= n; p++) {\n  if (n % p == 0) {\n    while (n % p == 0) n /= p;\n    result -= result / p;\n  }\n}\nif (n > 1) result -= result / n;\ncout << result;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  long long n; cin >> n;\n  // euler totient\n  return 0;\n}",
  },
  {
    id: "fibonacci-matrix",
    title: "Fibonacci Using Matrix Exponentiation",
    category: "maths",
    difficulty: "hard",
    description: "Compute nth Fibonacci number in O(log n) using matrix exponentiation.",
    constraints: "0 <= n <= 10^18",
    examples: [
      {"input":"10","output":"55"}
    ],
    test_cases: [
      {"input":"10","expected":"55"},
      {"input":"50","expected":"12586269025"}
    ],
    approach: "Use [[1,1],[1,0]]^n = [[F(n+1), F(n)], [F(n), F(n-1)]].\n\nDiagram:\n```\nM = [[1,1],[1,0]]\nM^1 = [[1,1],[1,0]]  → F(1)=1, F(2)=1\nM^2 = [[2,1],[1,1]]  → F(2)=1, F(3)=2\nM^3 = [[3,2],[2,1]]  → F(3)=2, F(4)=3\n\nn=5: M^5 = [[8,5],[5,3]] → F(5)=5, F(6)=8\nn=10: binary exponentiation → F(10)=55 ✓\n```\n\nTime O(log n), Space O(1).",
    complexity: {"time":"O(log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    techniques: ["maths-technique"],
    solution_code: "vector<vector<long long>> matPow(vector<vector<long long>> &M, long long n) {\n  vector<vector<long long>> res = {{1,0},{0,1}};\n  while (n) {\n    if (n & 1) res = mul(res, M);\n    M = mul(M, M);\n    n >>= 1;\n  }\n  return res;\n}\n// F(n) = matPow({{1,1},{1,0}}, n)[0][1];",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  long long n; cin >> n;\n  // matrix fibonacci\n  return 0;\n}",
  },
  {
    id: "fast-fibonacci",
    title: "Fast Doubling Fibonacci",
    category: "maths",
    difficulty: "medium",
    description: "Compute nth Fibonacci in O(log n) using fast doubling identities.",
    constraints: "0 <= n <= 10^18",
    examples: [
      {"input":"10","output":"55"}
    ],
    test_cases: [
      {"input":"10","expected":"55"},
      {"input":"0","expected":"0"}
    ],
    approach: "Use identities: F(2k)=F(k)*(2*F(k+1)-F(k)), F(2k+1)=F(k+1)^2+F(k)^2.\n\nDiagram:\n```\nCompute F(10):\n  F(5) = F(2)^2+F(3)^2 = 1^2+2^2 = 5\n  F(6) = F(3)*(2*F(4)-F(3)) = 2*(2*3-2) = 8\n  F(10) = F(5)*(2*F(6)-F(5)) = 5*(2*8-5) = 55\n\nCompute F(50) recursion:\n  50→25→12→6→3→1→0, then build back up.\n```\n\nTime O(log n), Space O(log n) recursion stack.",
    complexity: {"time":"O(log n)","space":"O(log n)"},
    sheet: "CP-Algorithms",
    techniques: ["maths-technique"],
    solution_code: "pair<long long, long long> fib(long long n) {\n  if (n == 0) return {0, 1};\n  auto [f_k, f_k1] = fib(n >> 1);\n  long long f_2k = f_k * (2 * f_k1 - f_k);\n  long long f_2k1 = f_k1 * f_k1 + f_k * f_k;\n  if (n & 1) return {f_2k1, f_2k1 + f_2k};\n  return {f_2k, f_2k1};\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  long long n; cin >> n;\n  // fast fibonacci\n  return 0;\n}",
  },
  {
    id: "prime-factors",
    title: "Prime Factorisation",
    category: "maths",
    difficulty: "easy",
    description: "Find all distinct prime factors of n.",
    constraints: "2 <= n <= 10^12",
    examples: [
      {"input":"12","output":"2 3"}
    ],
    test_cases: [
      {"input":"12","expected":"2 3"},
      {"input":"98","expected":"2 7"}
    ],
    approach: "Divide by 2 repeatedly, then check odd divisors up to sqrt(n).\n\nDiagram:\n```\nn=12: 12/2=6, 6/2=3, 3/3=1 → factors: 2,3\nnn=98: 98/2=49, 49/7=7, 7/7=1 → factors: 2,7\nnn=97: not divisible by 2..10 (11^2=121>97) → 97 is prime\n```\n\nTime O(sqrt(n)), Space O(1).",
    complexity: {"time":"O(sqrt(n))","space":"O(k) where k = distinct primes"},
    sheet: "GeeksforGeeks",
    techniques: ["maths-technique"],
    solution_code: "while (n % 2 == 0) { cout << 2 << \" \"; n /= 2; }\nfor (int i = 3; i * i <= n; i += 2) {\n  while (n % i == 0) { cout << i << \" \"; n /= i; }\n}\nif (n > 1) cout << n;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // prime factors\n  return 0;\n}",
  },
  {
    id: "divisor-count",
    title: "Count Divisors",
    category: "maths",
    difficulty: "easy",
    description: "Count number of divisors of n.",
    constraints: "1 <= n <= 10^12",
    examples: [
      {"input":"12","output":"6"}
    ],
    test_cases: [
      {"input":"12","expected":"6"},
      {"input":"7","expected":"2"}
    ],
    approach: "Prime factorise n, then divisor count = Pi (exponent_i + 1).\n\nDiagram:\n```\nn=12=2^2 x 3^1 → count=(2+1)*(1+1)=6\n  Divisors: 1,2,3,4,6,12 ✓\nn=36=2^2 x 3^2 → count=(2+1)*(2+1)=9\n  Divisors: 1,2,3,4,6,9,12,18,36 ✓\nn=7=7^1 → count=1+1=2 (1,7) ✓\n```\n\nTime O(sqrt(n)), Space O(1).",
    complexity: {"time":"O(sqrt(n))","space":"O(1)"},
    sheet: "GeeksforGeeks",
    techniques: ["maths-technique"],
    solution_code: "int count = 1;\nfor (int p = 2; p * p <= n; p++) {\n  int exp = 0;\n  while (n % p == 0) { exp++; n /= p; }\n  count *= (exp + 1);\n}\nif (n > 1) count *= 2;\ncout << count;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // divisor count\n  return 0;\n}",
  },
  {
    id: "divisor-sum",
    title: "Sum of Divisors",
    category: "maths",
    difficulty: "easy",
    description: "Find sum of all divisors of n.",
    constraints: "1 <= n <= 10^12",
    examples: [
      {"input":"12","output":"28"}
    ],
    test_cases: [
      {"input":"12","expected":"28"},
      {"input":"6","expected":"12"}
    ],
    approach: "Sum of divisors = Pi (p^(e+1)-1)/(p-1).\n\nDiagram:\n```\nn=12=2^2 x 3^1: sum=(2^3-1)/(2-1)*(3^2-1)/(3-1)=7*4=28\n  Divisors: 1+2+3+4+6+12=28 ✓\nn=6=2^1 x 3^1: sum=(2^2-1)/(2-1)*(3^2-1)/(3-1)=3*4=12\n  Divisors: 1+2+3+6=12 ✓\n```\n\nTime O(sqrt(n)), Space O(1).",
    complexity: {"time":"O(sqrt(n))","space":"O(1)"},
    sheet: "GeeksforGeeks",
    techniques: ["maths-technique"],
    solution_code: "long long sum = 1;\nfor (int p = 2; p * p <= n; p++) {\n  if (n % p == 0) {\n    long long pk = p;\n    while (n % p == 0) { n /= p; pk *= p; }\n    sum *= (pk - 1) / (p - 1);\n  }\n}\nif (n > 1) sum *= (1 + n);\ncout << sum;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  long long n; cin >> n;\n  // divisor sum\n  return 0;\n}",
  },
  {
    id: "smallest-prime-factor",
    title: "Smallest Prime Factor (SPF)",
    category: "maths",
    difficulty: "medium",
    description: "Precompute smallest prime factor for all numbers up to N.",
    constraints: "1 <= N <= 10^6",
    examples: [
      {"input":"20","output":"spf[1]=1 spf[2]=2 spf[3]=3 spf[4]=2 spf[5]=5 spf[6]=2 spf[7]=7 spf[8]=2 spf[9]=3 spf[10]=2"}
    ],
    test_cases: [
      {"input":"20","expected":"spf[1]=1 spf[2]=2 spf[3]=3 spf[4]=2 spf[5]=5 spf[6]=2 spf[7]=7 spf[8]=2 spf[9]=3 spf[10]=2"}
    ],
    approach: "Modified sieve: for each prime p, set spf[multiple] = p if not already set.\n\nDiagram:\n```\nSPF for N=20: init spf[i]=i\n\ni=2: spf[2]=2, mark: spf[4]=2,spf[6]=2,spf[8]=2,spf[10]=2,...\ni=3: spf[3]=3, mark: spf[9]=3,spf[15]=3...\ni=4: spf[4]=2≠4 → skip\ni=5: spf[5]=5, mark...\n\nResult:\ni:  1 2 3 4 5 6 7 8 9 10\nspf:1 2 3 2 5 2 7 2 3 2\n```\n\nTime O(N log log N), Space O(N).",
    complexity: {"time":"O(N log log N)","space":"O(N)"},
    sheet: "CP-Algorithms",
    techniques: ["maths-technique"],
    solution_code: "vector<int> spf(N+1);\niota(spf.begin(), spf.end(), 0);\nfor (int i = 2; i * i <= N; i++)\n  if (spf[i] == i)\n    for (int j = i * i; j <= N; j += i)\n      if (spf[j] == j) spf[j] = i;",
    solution_template: "#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint main() {\n  int N; cin >> N;\n  // smallest prime factor\n  return 0;\n}",
  },
  {
    id: "perfect-number",
    title: "Perfect Number",
    category: "maths",
    difficulty: "easy",
    description: "Check if n is a perfect number (sum of proper divisors equals n).",
    constraints: "1 <= n <= 10^8",
    examples: [
      {"input":"28","output":"Yes"}
    ],
    test_cases: [
      {"input":"28","expected":"Yes"},
      {"input":"12","expected":"No"}
    ],
    approach: "Find sum of proper divisors, compare with n.\n\nDiagram:\n```\nn=28: divisors <= sqrt(28): 1(28),2(14),4(7) → sum=1+2+14+4+7=28 → Yes\nnn=12: divisors: 1+2+3+4+6=16 ≠ 12 → No\nnKnown perfect numbers: 6,28,496,8128,33550336\n```\n\nTime O(sqrt(n)), Space O(1).",
    complexity: {"time":"O(sqrt(n))","space":"O(1)"},
    sheet: "LeetCode 507",
    techniques: ["maths-technique"],
    solution_code: "int sum = 1;\nfor (int i = 2; i * i <= n; i++) {\n  if (n % i == 0) {\n    sum += i;\n    if (i != n / i) sum += n / i;\n  }\n}\ncout << (n > 1 && sum == n ? \"Yes\" : \"No\");",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // perfect number\n  return 0;\n}",
  },
  {
    id: "n-th-tribonacci",
    title: "N-th Tribonacci Number",
    category: "maths",
    difficulty: "easy",
    description: "Compute nth Tribonacci number where T(0)=0, T(1)=1, T(2)=1, T(n)=T(n-1)+T(n-2)+T(n-3).",
    constraints: "0 <= n <= 37",
    examples: [
      {"input":"4","output":"4"}
    ],
    test_cases: [
      {"input":"4","expected":"4"},
      {"input":"25","expected":"1389537"}
    ],
    approach: "Iterative DP computing T(n) = T(n-1) + T(n-2) + T(n-3).\n\nDiagram:\n```\nT(0)=0, T(1)=1, T(2)=1\nSequence: 0,1,1,2,4,7,13,24,44,...\n\nTrace n=4: a=0,b=1,c=1\n  i=3: sum=0+1+1=2→a=1,b=1,c=2\n  i=4: sum=1+1+2=4→a=1,b=2,c=4\nReturn 4\n```\n\nTime O(n), Space O(1).",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "LeetCode 1137",
    techniques: ["maths-technique"],
    solution_code: "if (n == 0) return 0;\nif (n <= 2) return 1;\nint a=0, b=1, c=1;\nfor (int i = 3; i <= n; i++) {\n  int sum = a + b + c;\n  a = b; b = c; c = sum;\n}\ncout << c;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // tribonacci\n  return 0;\n}",
  },
  {
    id: "ugly-number",
    title: "Ugly Number",
    category: "maths",
    difficulty: "easy",
    description: "Check if n is an ugly number (prime factors only 2, 3, 5).",
    constraints: "|n| <= 2^31-1",
    examples: [
      {"input":"6","output":"Yes"},
      {"input":"14","output":"No"}
    ],
    test_cases: [
      {"input":"6","expected":"Yes"},
      {"input":"1","expected":"Yes"}
    ],
    approach: "Repeatedly divide n by 2, 3, 5. If remaining n is 1, it's ugly.\n\nDiagram:\n```\nn=6: 6/2=3, 3/3=1 → Yes\nnn=14: 14/2=7, 7 not divisible by 2,3,5 → No\nnn=1: convention → Yes\nnn=30: 30/2=15, 15/3=5, 5/5=1 → Yes\n```\n\nTime O(log n), Space O(1).",
    complexity: {"time":"O(log n)","space":"O(1)"},
    sheet: "LeetCode 263",
    techniques: ["maths-technique"],
    solution_code: "if (n <= 0) { cout << \"No\"; return 0; }\nfor (int p : {2, 3, 5}) while (n % p == 0) n /= p;\ncout << (n == 1 ? \"Yes\" : \"No\");",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // ugly number\n  return 0;\n}",
  },
  {
    id: "ugly-number-ii",
    title: "Ugly Number II",
    category: "maths",
    difficulty: "medium",
    description: "Find the nth ugly number (numbers with only 2,3,5 as prime factors).",
    constraints: "1 <= n <= 1690",
    examples: [
      {"input":"10","output":"12"}
    ],
    test_cases: [
      {"input":"10","expected":"12"},
      {"input":"1","expected":"1"}
    ],
    approach: "Use 3-pointer DP: generate next ugly as min(2*ptr2, 3*ptr3, 5*ptr5).\n\nDiagram:\n```\nugly=[1]; p2=p3=p5=0\n\ni=1: min(2*1,3*1,5*1)=2 → p2++ → [1,2]\ni=2: min(2*2,3*1,5*1)=3 → p3++ → [1,2,3]\ni=3: min(2*2,3*2,5*1)=4 → p2++ → [1,2,3,4]\ni=4: min(2*3,3*2,5*1)=5 → p5++ → [1,2,3,4,5]\ni=5: min(2*3,3*2,5*2)=6 → p2++,p3++ → [1,2,3,4,5,6]\ni=6→8, i=7→9, i=8→10, i=9→12\n\nn=10 → ugly[9]=12 ✓\n```\n\nTime O(n), Space O(n).",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "LeetCode 264",
    techniques: ["maths-technique"],
    solution_code: "vector<int> ugly(n);\nugly[0] = 1;\nint p2=0, p3=0, p5=0;\nfor (int i = 1; i < n; i++) {\n  int next = min({2*ugly[p2], 3*ugly[p3], 5*ugly[p5]});\n  ugly[i] = next;\n  if (next == 2*ugly[p2]) p2++;\n  if (next == 3*ugly[p3]) p3++;\n  if (next == 5*ugly[p5]) p5++;\n}\ncout << ugly[n-1];",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // ugly number ii\n  return 0;\n}",
  },
  {
    id: "super-ugly",
    title: "Super Ugly Number",
    category: "maths",
    difficulty: "medium",
    description: "Find nth ugly number with given set of prime factors.",
    constraints: "1 <= n <= 10^6, 1 <= k <= 100",
    examples: [
      {"input":"12\n4\n2 7 13 19","output":"32"}
    ],
    test_cases: [
      {"input":"12\n4\n2 7 13 19","expected":"32"}
    ],
    approach: "Generalised Ugly Number II with k pointers.\n\nDiagram:\n```\nn=12, primes=[2,7,13,19]\nSequence: 1,2,4,7,8,13,14,16,19,26,28,32\n\nDP: ugly=[1]\ni=1: min(2*1,7*1,13*1,19*1)=2 → ptr[0]++\ni=2: min(2*2,7*1,13*1,19*1)=4 → ptr[0]++\ni=3: min(2*4,7*1,13*1,19*1)=7 → ptr[1]++\ni=11: → 32\n```\n\nTime O(n log k), Space O(n+k).",
    complexity: {"time":"O(n log k)","space":"O(n+k)"},
    sheet: "LeetCode 313",
    techniques: ["maths-technique"],
    solution_code: "vector<long long> ugly(n, INT_MAX);\nugly[0] = 1;\nvector<int> ptr(k, 0);\nfor (int i = 1; i < n; i++) {\n  for (int j = 0; j < k; j++) ugly[i] = min(ugly[i], primes[j] * ugly[ptr[j]]);\n  for (int j = 0; j < k; j++) if (ugly[i] == primes[j] * ugly[ptr[j]]) ptr[j]++;\n}\ncout << ugly[n-1];",
    solution_template: "#include <iostream>\n#include <vector>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n >> k;\n  vector<int> primes(k); for (int i = 0; i < k; i++) cin >> primes[i];\n  // super ugly\n  return 0;\n}",
  },
  {
    id: "excellent-pairs",
    title: "Excellent Pairs",
    category: "maths",
    difficulty: "hard",
    description: "Count pairs (i,j) such that nums[i] + nums[j] has same number of set bits as nums[i] XOR nums[j].",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"3\n1 2 3","output":"2"}
    ],
    test_cases: [
      {"input":"3\n1 2 3","expected":"2"}
    ],
    approach: "Property: popcount(a&b)=0 for equality, meaning a and b have no overlapping set bits.\n\nDiagram:\n```\narr=[1,2,3] → binary: 1=01, 2=10, 3=11\n\n(1,2): 01&10=00 → popcount=0 → valid\n(1,3): 01&11=01 → popcount=1 → invalid\n(2,3): 10&11=10 → popcount=1 → invalid\n\nValid: (1,2),(2,1) → count=2\n\npopcount(a+b)=popcount(a|b)+popcount(a&b)\npopcount(a^b)=popcount(a|b)-popcount(a&b)\nEqual when popcount(a&b)=0.\n```\n\nTime O(n * log max), Space O(n).",
    complexity: {"time":"O(n * log max)","space":"O(n)"},
    sheet: "LeetCode",
    techniques: ["maths-technique"],
    solution_code: "int count = 0;\nfor (int i = 0; i < n; i++)\n  for (int j = i + 1; j < n; j++)\n    if ((nums[i] & nums[j]) == 0) count += 2;\ncout << count;",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<int> nums(n); for (int i = 0; i < n; i++) cin >> nums[i];\n  // excellent pairs\n  return 0;\n}",
  },
  {
    id: "gcd-of-array",
    title: "GCD of Array",
    category: "maths",
    difficulty: "easy",
    description: "Find GCD of all elements in an array.",
    constraints: "1 <= n <= 10^5, 1 <= arr[i] <= 10^9",
    examples: [
      {"input":"4\n12 18 24 36","output":"6"}
    ],
    test_cases: [
      {"input":"4\n12 18 24 36","expected":"6"},
      {"input":"3\n7 11 13","expected":"1"}
    ],
    approach: "Compute GCD iteratively.\n\nDiagram:\n```\narr=[12,18,24,36]\ngcd(12,18)=6\ngcd(6,24)=6\ngcd(6,36)=6 → Result=6\n\narr=[7,11,13]\ngcd(7,11)=1\ngcd(1,13)=1 → Result=1\n```\n\nTime O(n log max), Space O(1).",
    complexity: {"time":"O(n log max)","space":"O(1)"},
    sheet: "GeeksforGeeks",
    techniques: ["maths-technique"],
    solution_code: "int g = arr[0];\nfor (int i = 1; i < n; i++) g = __gcd(g, arr[i]);\ncout << g;",
    solution_template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<int> arr(n); for (int i = 0; i < n; i++) cin >> arr[i];\n  // gcd of array\n  return 0;\n}",
  },
  {
    id: "lcm-of-array",
    title: "LCM of Array",
    category: "maths",
    difficulty: "easy",
    description: "Find LCM of all elements in an array.",
    constraints: "1 <= n <= 10^5, 1 <= arr[i] <= 10^6",
    examples: [
      {"input":"4\n2 3 4 5","output":"60"}
    ],
    test_cases: [
      {"input":"4\n2 3 4 5","expected":"60"},
      {"input":"3\n6 10 15","expected":"30"}
    ],
    approach: "LCM(a,b)=a*b/GCD(a,b). Compute iteratively.\n\nDiagram:\n```\narr=[2,3,4,5]\nlcm(2,3)=6\nlcm(6,4)=6*4/gcd(6,4)=24/2=12\nlcm(12,5)=12*5/gcd(12,5)=60/1=60\n\narr=[6,10,15]\nlcm(6,10)=30\nlcm(30,15)=30 → Result=30\n(6=2*3, 10=2*5, 15=3*5, LCM=2*3*5=30) ✓\n```\n\nTime O(n log max), Space O(1).",
    complexity: {"time":"O(n log max)","space":"O(1)"},
    sheet: "GeeksforGeeks",
    techniques: ["maths-technique"],
    solution_code: "long long l = arr[0];\nfor (int i = 1; i < n; i++) l = (l * arr[i]) / __gcd((int)l, arr[i]);\ncout << l;",
    solution_template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<int> arr(n); for (int i = 0; i < n; i++) cin >> arr[i];\n  // lcm of array\n  return 0;\n}",
  },
  {
    id: "least-prime-factor",
    title: "Least Prime Factor (LPF) Sieve",
    category: "maths",
    difficulty: "medium",
    description: "Precompute least prime factor for all numbers up to N (variant of SPF).",
    constraints: "1 <= N <= 10^6",
    examples: [
      {"input":"10","output":"0 0 2 3 2 5 2 7 2 3 2"}
    ],
    test_cases: [
      {"input":"10","expected":"0 0 2 3 2 5 2 7 2 3 2"}
    ],
    approach: "Sieve-based approach marking LPF for each composite.\n\nDiagram:\n```\nLPF for N=10: init lpf[i]=0\n\ni=2: lpf[2]=2, mark lpf[4]=2,lpf[6]=2,lpf[8]=2,lpf[10]=2\ni=3: lpf[3]=3, mark lpf[6] already 2, lpf[9]=3\ni=4: lpf[4]=2≠0 skip\ni=5: lpf[5]=5\n\ni=7: lpf[7]=7\n\nFinal: [0,0,2,3,2,5,2,7,2,3,2]\n```\n\nTime O(N log log N), Space O(N).",
    complexity: {"time":"O(N log log N)","space":"O(N)"},
    sheet: "GeeksforGeeks",
    techniques: ["maths-technique"],
    solution_code: "vector<int> lpf(N+1, 0);\nfor (int i = 2; i <= N; i++) {\n  if (lpf[i] == 0) { lpf[i] = i; for (int j = i*i; j <= N; j += i) if (lpf[j] == 0) lpf[j] = i; }\n}",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int N; cin >> N;\n  // least prime factor\n  return 0;\n}",
  },
  {
    id: "consecutive-numbers-sum",
    title: "Consecutive Numbers Sum",
    category: "maths",
    difficulty: "hard",
    description: "Count ways to express n as sum of consecutive positive integers.",
    constraints: "1 <= n <= 10^9",
    examples: [
      {"input":"15","output":"4"}
    ],
    test_cases: [
      {"input":"15","expected":"4"},
      {"input":"5","expected":"2"}
    ],
    approach: "Sum of k consecutive integers starting at a: n = k*(2a+k-1)/2. Check each k.\n\nDiagram:\n```\nn=15: \n  k=1: (15-0)%1=0 → valid (15)\n  k=2: (15-1)%2=0 → valid (7+8)\n  k=3: (15-3)%3=0 → valid (4+5+6)\n  k=4: (15-6)%4=1 → invalid\n  k=5: (15-10)%5=0 → valid (1+2+3+4+5)\n  k=6: stop (k*(k-1)/2=15 >= n)\n  Count=4 ✓\n```\n\nTime O(sqrt(n)), Space O(1).",
    complexity: {"time":"O(sqrt(n))","space":"O(1)"},
    sheet: "LeetCode 829",
    techniques: ["maths-technique"],
    solution_code: "int count = 0;\nfor (int k = 1; k * (k - 1) / 2 < n; k++) {\n  if ((n - k * (k - 1) / 2) % k == 0) count++;\n}\ncout << count;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // consecutive sum\n  return 0;\n}",
  },
  {
    id: "broken-calc-math",
    title: "Broken Calculator (Math Greedy)",
    category: "maths",
    difficulty: "medium",
    description: "Minimum operations to convert X to Y: multiply by 2 or subtract 1.",
    constraints: "1 <= X,Y <= 10^9",
    examples: [
      {"input":"2 3","output":"2"},
      {"input":"5 8","output":"2"}
    ],
    approach: "Work backwards: if Y < X, answer is X-Y. If Y is even, divide by 2; else add 1.\n\nDiagram:\n```\nX=2, Y=3:\n  Y odd → Y=4 (ops=1)\n  Y even → Y=2 (ops=2)\n  Y==X → stop, ops=2 ✓\n\nX=5, Y=8:\n  Y even → Y=4 (ops=1)\n  Y<X → X-Y=1 → ops=2 ✓\n\nX=3, Y=10:\n  Y even→5 (ops=1), Y odd→6 (ops=2), Y even→3 (ops=3) → 3 ✓\n```\n\nTime O(log Y), Space O(1).",
    complexity: {"time":"O(log Y)","space":"O(1)"},
    sheet: "LeetCode 991",
    techniques: ["maths-technique"],
    solution_code: "int ops = 0;\nwhile (Y > X) {\n  if (Y & 1) Y++;\n  else Y /= 2;\n  ops++;\n}\ncout << ops + (X - Y);",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int X, Y; cin >> X >> Y;\n  // broken calculator\n  return 0;\n}",
  },
  {
    id: "nim-game",
    title: "Nim Game",
    category: "maths",
    difficulty: "easy",
    description: "Determine if first player can win Nim game with n stones (take 1-3 each turn).",
    constraints: "1 <= n <= 2^31-1",
    examples: [
      {"input":"4","output":"false"},
      {"input":"5","output":"true"}
    ],
    test_cases: [
      {"input":"4","expected":"false"},
      {"input":"1","expected":"true"}
    ],
    approach: "If n%4==0, first player loses. Otherwise first player wins.\n\nDiagram:\n```\nn=1: take 1 → win → true\nn=2: take 2 → win → true\nn=3: take 3 → win → true\nn=4: any move (1-3) leaves 3-1 → opponent can take all → false\nn=5: take 1 → leaves 4 for opponent → true\nn=6: take 2 → leaves 4 → true\nn=7: take 3 → leaves 4 → true\nn=8: false (any move leaves 5-7 → opponent leaves 4)\n\nPattern: true if n%4 != 0\n```\n\nTime O(1), Space O(1).",
    complexity: {"time":"O(1)","space":"O(1)"},
    sheet: "LeetCode 292",
    techniques: ["maths-technique"],
    solution_code: "cout << (n % 4 != 0 ? \"true\" : \"false\");",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // nim game\n  return 0;\n}",
  },
  {
    id: "bulb-switcher",
    title: "Bulb Switcher",
    category: "maths",
    difficulty: "medium",
    description: "How many bulbs are on after n rounds of toggling?",
    constraints: "0 <= n <= 10^9",
    examples: [
      {"input":"3","output":"1"},
      {"input":"0","output":"0"}
    ],
    test_cases: [
      {"input":"3","expected":"1"},
      {"input":"4","expected":"2"}
    ],
    approach: "Only bulbs at perfect square positions remain on (toggled odd number of times).\n\nDiagram:\n```\nn=3: after all rounds → bulb 1 on → count=1\nnn=4: bulbs 1,4 on → count=2\nnn=10: perfect squares ≤10: 1,4,9 → count=3 = floor(sqrt(10))\n\nAnswer: floor(sqrt(n))\n```\n\nTime O(1), Space O(1).",
    complexity: {"time":"O(1)","space":"O(1)"},
    sheet: "LeetCode 319",
    techniques: ["maths-technique"],
    solution_code: "cout << (int)sqrt(n);",
    solution_template: "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // bulb switcher\n  return 0;\n}",
  },
  {
    id: "arrange-coins",
    title: "Arrange Coins (Staircase)",
    category: "maths",
    difficulty: "easy",
    description: "Find max k such that 1+2+...+k <= n (complete rows of coin staircase).",
    constraints: "1 <= n <= 2^31-1",
    examples: [
      {"input":"5","output":"2"},
      {"input":"8","output":"3"}
    ],
    test_cases: [
      {"input":"5","expected":"2"},
      {"input":"8","expected":"3"}
    ],
    approach: "Solve k*(k+1)/2 <= n. Formula: k = floor((sqrt(8n+1)-1)/2).\n\nDiagram:\n```\nn=5:\n  Row1: * (1)\n  Row2: ** (2, total=3)\n  Row3: *** (needs 3, only 2 left) → complete rows=2\n\nn=8:\n  Rows 1-3: 1+2+3=6 total\n  Row 4: needs 4, only 2 left → complete rows=3\n\nFormula verification:\n  n=5: k=(sqrt(41)-1)/2 = (6.4-1)/2=2.7→floor=2 ✓\n  n=8: k=(sqrt(65)-1)/2 = (8.06-1)/2=3.53→floor=3 ✓\n```\n\nTime O(1), Space O(1).",
    complexity: {"time":"O(1)","space":"O(1)"},
    sheet: "LeetCode 441",
    techniques: ["maths-technique"],
    solution_code: "cout << (int)((sqrt(8 * (long long)n + 1) - 1) / 2);",
    solution_template: "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // arrange coins\n  return 0;\n}",
  },
  {
    id: "random-pick-index",
    title: "Random Pick Index (Reservoir Sampling)",
    category: "maths",
    difficulty: "medium",
    description: "Pick a random index of a target value from an array using reservoir sampling.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5 3\n1 2 3 3 3\n3","output":"2"}
    ],
    test_cases: [
      {"input":"5 3\n1 2 3 3 3","expected":"valid"},
      {"input":"3 1\n1 2 3","expected":"valid"},
      {"input":"4 2\n4 4 4 4","expected":"valid"}
    ],
    approach: `Reservoir sampling: iterate through the array. When we see the target, increment count and replace the selected index with probability 1/count.

    Diagram:
    ```
    arr = [1, 2, 3, 3, 3], target = 3

    i=0: arr[0]=1 ≠ 3 → skip
    i=1: arr[1]=2 ≠ 3 → skip
    i=2: arr[2]=3 == 3 → count=1, pick idx=2 (prob 1/1)
    i=3: arr[3]=3 == 3 → count=2, pick idx=3 (prob 1/2)
    i=4: arr[4]=3 == 3 → count=3, pick idx=4 (prob 1/3)

    Each index with value 3 has equal probability (1/3) of being selected.

    Distribution over many runs:
      idx=2: 1/3
      idx=3: 1/3
      idx=4: 1/3
    ````,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    techniques: ["reservoir-sampling"],
    solution_code: "int pick(vector<int>& a, int t) {\n  int cnt=0, res=-1;\n  for(int i=0;i<(int)a.size();i++) {\n    if(a[i]==t) { cnt++; if(rand()%cnt==0) res=i; }\n  }\n  return res;\n}",
    solution_template: `#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;

int main() {
  int n, t; cin>>n>>t;
  vector<int> a(n);
  for(int i=0;i<n;i++) cin>>a[i];
  int cnt=0, res=-1;
  for(int i=0;i<n;i++) {
    if(a[i]==t) { cnt++; if(rand()%cnt==0) res=i; }
  }
  cout<<res<<endl;
  return 0;
}`,
  },
  {
    id: "linked-list-random-node",
    title: "Linked List Random Node",
    category: "maths",
    difficulty: "medium",
    description: "Get a random node's value from a singly linked list of unknown length.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n1 2 3 4 5","output":"1"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5","expected":"valid"},
      {"input":"3\n10 20 30","expected":"valid"},
      {"input":"1\n42","expected":"42"}
    ],
    techniques: ["reservoir-sampling"],
    approach: `Reservoir sampling with k=1 over a linked list of unknown length. Traverse the list, for the i-th node, replace result with probability 1/(i+1).

    Diagram:
    ```
    List: 1 → 2 → 3 → 4 → 5

    i=0: val=1, count=1, pick val=1 (prob 1/1)
    i=1: val=2, count=2, pick val=2 (prob 1/2)
    i=2: val=3, count=3, pick val=3 (prob 1/3)
    i=3: val=4, count=4, pick val=4 (prob 1/4)
    i=4: val=5, count=5, pick val=5 (prob 1/5)

    After full traversal, each node has exactly 1/5 probability of being selected.

    Proof by induction:
    At i=0, prob(val=1) = 1
    At i=1, prob(val=1) = 1*(1-1/2) = 1/2, prob(val=2) = 1/2
    At i=2, prob(val=1) = 1/2*2/3 = 1/3, prob(val=2)=1/3, prob(val=3)=1/3
    ...
    At i=4, each has 1/5 probability.
    ````,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int res, cnt=0;\nwhile(head) {\n  cnt++;\n  if(rand()%cnt==0) res=head->val;\n  head=head->next;\n}\nreturn res;",
    solution_template: `#include <iostream>
#include <cstdlib>
using namespace std;

struct ListNode { int val; ListNode* next; };

int main() {
  int n; cin>>n;
  ListNode* head=nullptr, *tail=nullptr;
  for(int i=0;i<n;i++) {
    int x; cin>>x;
    ListNode* node = new ListNode{x, nullptr};
    if(!head) head=tail=node;
    else { tail->next=node; tail=node; }
  }
  int cnt=0, res=0;
  ListNode* cur=head;
  while(cur) {
    cnt++;
    if(rand()%cnt==0) res=cur->val;
    cur=cur->next;
  }
  cout<<res<<endl;
  return 0;
}`,
  },
  {
    id: "random-pick-weight",
    title: "Random Pick with Weight",
    category: "maths",
    difficulty: "medium",
    description: "Pick an index randomly with probability proportional to its weight.",
    constraints: "1 <= n <= 10^4, 1 <= w[i] <= 10^5",
    examples: [
      {"input":"3\n1 3 2","output":"1 (with prob 3/6)"}
    ],
    test_cases: [
      {"input":"3\n1 3 2","expected":"valid"},
      {"input":"2\n1 1","expected":"valid"},
      {"input":"4\n2 4 6 8","expected":"valid"}
    ],
    techniques: ["reservoir-sampling"],
    approach: `Build prefix sum array, generate random number in [1, total], binary search the prefix sum to find the index.

    Diagram:
    ```
    weights = [1, 3, 2]

    prefix = [1, 4, 6]
    total = 6

    random r in [1, 6]:
      r=1 → prefix ≥ 1 at idx 0 → return 0 (weight 1, prob 1/6)
      r=2 → prefix ≥ 2 at idx 1 → return 1 (prob 3/6)
      r=3 → prefix ≥ 3 at idx 1 → return 1
      r=4 → prefix ≥ 4 at idx 1 → return 1
      r=5 → prefix ≥ 5 at idx 2 → return 2 (prob 2/6)
      r=6 → prefix ≥ 6 at idx 2 → return 2

    Visual distribution:

    Index 0: [1]        1 space
    Index 1: [2 3 4]    3 spaces
    Index 2: [5 6]      2 spaces

    r=1 → 0, r=2,3,4 → 1, r=5,6 → 2
    ````,
    complexity: {"time":"O(log n) per query","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> pref;\npref.push_back(w[0]);\nfor(int i=1;i<n;i++) pref.push_back(pref.back()+w[i]);\nint r=rand()%pref.back()+1;\nint idx=lower_bound(pref.begin(),pref.end(),r)-pref.begin();\nreturn idx;",
    solution_template: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>
using namespace std;

int main() {
  int n; cin>>n;
  vector<int> w(n);
  for(int i=0;i<n;i++) cin>>w[i];
  vector<int> pref;
  pref.push_back(w[0]);
  for(int i=1;i<n;i++) pref.push_back(pref.back()+w[i]);
  int r=rand()%pref.back()+1;
  int idx=lower_bound(pref.begin(),pref.end(),r)-pref.begin();
  cout<<idx<<endl;
  return 0;
}`,
  },
  {
    id: "kth-factor",
    title: "Kth Factor of N",
    category: "maths",
    difficulty: "medium",
    description: "Find the kth positive factor of n (1-indexed).",
    constraints: "1 <= n <= 10^9, 1 <= k <= n",
    examples: [
      {"input":"12 3","output":"3"}
    ],
    test_cases: [
      {"input":"12 3","expected":"3"},
      {"input":"12 6","expected":"12"},
      {"input":"7 2","expected":"7"}
    ],
    techniques: ["maths-technique"],
    approach: `Collect all factors up to sqrt(n). If i divides n, both i and n/i are factors. Sort and return kth (1-indexed).

    Diagram:
    ```
    n = 12

    Factors come in pairs:

    i=1: 1×12 → factors: 1, 12
    i=2: 2×6  → factors: 2, 6
    i=3: 3×4  → factors: 3, 4
    i=4: 4≥√12 → stop

    Sorted factors: [1, 2, 3, 4, 6, 12]

    k=1 → 1
    k=2 → 2
    k=3 → 3 ✓
    k=4 → 4
    k=5 → 6
    k=6 → 12

    n = 7 (prime):
    i=1: 1×7 → factors: 1, 7
    i=2: 2≥√7 → stop
    Sorted: [1, 7]
    k=2 → 7

    n = 16:
    i=1: 1,16
    i=2: 2,8
    i=4: 4,4 (only add once)
    Sorted: [1,2,4,8,16]
    ````,
    complexity: {"time":"O(√n log √n)","space":"O(√n)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> f;\nfor(int i=1;i*i<=n;i++) {\n  if(n%i==0) {\n    f.push_back(i);\n    if(i!=n/i) f.push_back(n/i);\n  }\n}\nsort(f.begin(),f.end());\nreturn (k<=f.size()) ? f[k-1] : -1;",
    solution_template: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
  int n, k; cin>>n>>k;
  vector<int> f;
  for(int i=1;i*i<=n;i++) {
    if(n%i==0) {
      f.push_back(i);
      if(i!=n/i) f.push_back(n/i);
    }
  }
  sort(f.begin(),f.end());
  cout<<(k<=f.size()?f[k-1]:-1)<<endl;
  return 0;
}`,
  },
  {
    id: "ugly-number-iii",
    title: "Find Nth Ugly Number Divisible by A,B,C",
    category: "maths",
    difficulty: "medium",
    description: "Find the nth number divisible by a, b, or c using binary search and inclusion-exclusion.",
    constraints: "1 <= n,a,b,c <= 10^9",
    examples: [
      {"input":"3 2 3 5","output":"4"}
    ],
    test_cases: [
      {"input":"3 2 3 5","expected":"4"},
      {"input":"4 2 3 4","expected":"6"},
      {"input":"5 2 11 13","expected":"10"}
    ],
    techniques: ["maths-technique"],
    approach: `Binary search on the answer. Count how many numbers ≤ mid are divisible by a, b, or c using inclusion-exclusion: count = mid/a + mid/b + mid/c - mid/lcm(a,b) - mid/lcm(b,c) - mid/lcm(a,c) + mid/lcm(a,b,c).

    Diagram:
    ```
    n=3, a=2, b=3, c=5

    Numbers divisible by 2, 3, or 5:
    1, 2, 3, 4, 5, 6, 8, 9, 10, 12, ...
    Index: 1  2  3  4  5  6  7  8  9  10

    3rd ugly number is 4.

    Binary search for answer:
    low=1, high=2*10^9

    mid=10: count=10/2 + 10/3 + 10/5 - 10/6 - 10/15 - 10/10 + 10/30
         = 5+3+2-1-0-1+0 = 8 → too big, high=9

    mid=5: count=5/2+5/3+5/5-5/6-5/15-5/10+5/30
         = 2+1+1-0-0-0+0 = 4 → too big, high=4

    mid=3: count=3/2+3/3+3/5-...= 0+1+0-... = 1 → too small, low=4

    mid=4: count=4/2+4/3+4/5-4/6-4/15-4/10+4/30
         = 2+1+0-0-0-0+0 = 3 → ans=4

    For (a,b,c)=(2,3,4), n=4:
    Divisible by 2,3,4: 2,3,4,6,8,9,10,12,14,15,16,18,20...
    4th = 6 ✓
    ````,
    complexity: {"time":"O(log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "long long lcm(long long a, long long b) { return a/__gcd(a,b)*b; }\nlong long count(long long m, long long a, long long b, long long c) {\n  return m/a + m/b + m/c - m/lcm(a,b) - m/lcm(b,c) - m/lcm(a,c) + m/lcm(lcm(a,b),c);\n}",
    solution_template: `#include <iostream>
#include <algorithm>
using namespace std;

long long lcm(long long a, long long b) { return a/__gcd(a,b)*b; }

long long count(long long m, long long a, long long b, long long c) {
  return m/a + m/b + m/c - m/lcm(a,b) - m/lcm(b,c) - m/lcm(a,c) + m/lcm(lcm(a,b),c);
}

int main() {
  long long n, a, b, c; cin>>n>>a>>b>>c;
  long long lo=1, hi=2e9, ans;
  while(lo<=hi) {
    long long mid=lo+(hi-lo)/2;
    if(count(mid,a,b,c)>=n) { ans=mid; hi=mid-1; }
    else lo=mid+1;
  }
  cout<<ans<<endl;
  return 0;
}`,
  },
]
