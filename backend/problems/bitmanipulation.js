export default [
  {
    id: "single-number",
    title: "Single Number (XOR)",
    category: "bit-manipulation",
    difficulty: "easy",
    description: "Find the element that appears once when all others appear twice.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n4 1 2 1 2","output":"4"}
    ],
    test_cases: [
      {"input":"5\n4 1 2 1 2","expected":"4"}
    ],
    approach: "Use XOR property: a^a=0 and a^0=a. XOR all elements; the result is the unique element.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "int result = 0;\nfor (int i = 0; i < n; i++) result ^= arr[i];\ncout << result;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // XOR\n  return 0;\n}",
  },
  {
    id: "count-set-bits",
    title: "Count Set Bits (Brian Kernighan)",
    category: "bit-manipulation",
    difficulty: "easy",
    description: "Count the number of 1 bits (set bits) in an integer.",
    constraints: "0 <= n <= 10^9",
    examples: [
      {"input":"11","output":"3","explanation":"1011 has 3 set bits"}
    ],
    test_cases: [
      {"input":"11","expected":"3"},
      {"input":"128","expected":"1"}
    ],
    approach: "Brian Kernighan algorithm: repeatedly clear the lowest set bit using n = n & (n-1) and count iterations.",
    complexity: {"time":"O(k) where k = number of set bits","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "int count = 0;\nwhile (n) { count++; n &= n - 1; }\ncout << count;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // count set bits\n  return 0;\n}",
  },
  {
    id: "power-two",
    title: "Power of Two",
    category: "bit-manipulation",
    difficulty: "easy",
    description: "Check if n is a power of two.",
    constraints: "-2^31 <= n <= 2^31-1",
    examples: [
      {"input":"16","output":"Yes"},
      {"input":"18","output":"No"}
    ],
    test_cases: [
      {"input":"16","expected":"Yes"},
      {"input":"0","expected":"No"}
    ],
    approach: "Power of two has exactly one set bit. n & (n-1) clears the lowest set bit, so result is 0 for powers of two.",
    complexity: {"time":"O(1)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "cout << (n > 0 && (n & (n-1)) == 0 ? \"Yes\" : \"No\");",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // check power of two\n  return 0;\n}",
  },
  {
    id: "missing-number-bit",
    title: "Missing Number (XOR)",
    category: "bit-manipulation",
    difficulty: "easy",
    description: "Find missing number in array of 0..n with one missing.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n3 0 1 5 2","output":"4"}
    ],
    test_cases: [
      {"input":"5\n3 0 1 5 2","expected":"4"}
    ],
    approach: "XOR all array elements and all numbers 0..n. Paired numbers cancel out, leaving the missing one.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int xor1 = 0, xor2 = 0;\nfor (int i = 0; i < n; i++) { xor1 ^= arr[i]; xor2 ^= i; }\nxor2 ^= n;\ncout << (xor1 ^ xor2);",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // XOR\n  return 0;\n}",
  },
  {
    id: "two-odd-occuring",
    title: "Two Numbers with Odd Occurrences",
    category: "bit-manipulation",
    difficulty: "medium",
    description: "Find two elements that appear odd number of times.",
    constraints: "2 <= n <= 10^5",
    examples: [
      {"input":"8\n4 3 4 4 5 3 5 2","output":"4 2"}
    ],
    test_cases: [
      {"input":"8\n4 3 4 4 5 3 5 2","expected":"4 2"}
    ],
    approach: "XOR all elements to get xor of two odd-occurring numbers. Find a set bit in this xor, partition array based on that bit, XOR each group separately.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "int xorAll = 0;\nfor (int i = 0; i < n; i++) xorAll ^= arr[i];\nint setBit = xorAll & ~(xorAll - 1);\nint x = 0, y = 0;\nfor (int i = 0; i < n; i++) {\n  if (arr[i] & setBit) x ^= arr[i];\n  else y ^= arr[i];\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // XOR partitioning\n  return 0;\n}",
  }
]
