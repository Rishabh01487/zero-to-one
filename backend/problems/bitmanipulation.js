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
  }
]
