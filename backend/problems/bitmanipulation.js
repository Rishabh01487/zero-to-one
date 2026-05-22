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
  }
]
