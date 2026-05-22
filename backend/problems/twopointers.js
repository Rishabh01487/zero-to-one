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
  },
  {
    id: "three-sum",
    title: "3Sum",
    category: "two-pointers",
    difficulty: "medium",
    description: "Find all unique triplets that sum to zero.",
    constraints: "1 <= n <= 3000",
    examples: [
      {"input":"6\n-1 0 1 2 -1 -4","output":"-1 -1 2\n-1 0 1"}
    ],
    test_cases: [
      {"input":"6\n-1 0 1 2 -1 -4","expected":"-1 -1 2\n-1 0 1"}
    ],
    approach: "Sort array. For each i, use two pointers on the remaining array to find pairs summing to -arr[i]. Skip duplicates.",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "sort(nums, nums+n);\nfor (int i = 0; i < n-2; i++) {\n  if (i > 0 && nums[i] == nums[i-1]) continue;\n  int j = i+1, k = n-1;\n  while (j < k) {\n    int sum = nums[i] + nums[j] + nums[k];\n    if (sum == 0) { /* record triplet */ j++; k--; while (j < k && nums[j]==nums[j-1]) j++; while (j < k && nums[k]==nums[k+1]) k--; }\n    else if (sum < 0) j++;\n    else k--;\n  }\n}",
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sort + two pointers\n  return 0;\n}",
  }
]
