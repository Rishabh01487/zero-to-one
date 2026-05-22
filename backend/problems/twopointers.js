export default [
  {
    id: "two-sum-sorted",
    title: "Two Sum II - Input Array Sorted",
    category: "two-pointers",
    difficulty: "medium",
    description: "Find two numbers in sorted array that sum to target.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n2 7 11 15\n9","output":"1 2"}
    ],
    test_cases: [
      {"input":"4\n2 7 11 15\n9","expected":"1 2"}
    ],
    approach: "Use two pointers: left at start, right at end. If sum < target, move left forward. If sum > target, move right backward.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int i = 0, j = n-1;\nwhile (i < j) {\n  int sum = arr[i] + arr[j];\n  if (sum == target) { cout << i+1 << \" \" << j+1; return 0; }\n  else if (sum < target) i++;\n  else j--;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> target;\n  // two pointers\n  return 0;\n}",
  }
]
