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
  },
  {
    id: "container-water",
    title: "Container With Most Water",
    category: "two-pointers",
    difficulty: "medium",
    description: "Find max water container formed by two vertical lines.",
    constraints: "2 <= n <= 10^5",
    examples: [
      {"input":"9\n1 8 6 2 5 4 8 3 7","output":"49"}
    ],
    test_cases: [
      {"input":"9\n1 8 6 2 5 4 8 3 7","expected":"49"}
    ],
    approach: "Two pointers at ends. Area = min(height[i],height[j]) * (j-i). Move the pointer with smaller height inward. Track max area.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int i = 0, j = n-1, maxArea = 0;\nwhile (i < j) {\n  int area = min(height[i], height[j]) * (j - i);\n  maxArea = max(maxArea, area);\n  if (height[i] < height[j]) i++;\n  else j--;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int h[n]; for (int i = 0; i < n; i++) cin >> h[i];\n  // two pointers\n  cout << maxArea << endl;\n  return 0;\n}",
  },
  {
    id: "remove-duplicates",
    title: "Remove Duplicates from Sorted Array",
    category: "two-pointers",
    difficulty: "easy",
    description: "Remove duplicates in-place from sorted array, return new length.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n1 1 2 2 3","output":"3"}
    ],
    test_cases: [
      {"input":"5\n1 1 2 2 3","expected":"3"}
    ],
    approach: "Slow/fast pointer. Fast scans forward; when fast finds new value, copy to slow+1 and advance slow.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "if (n == 0) return 0;\nint slow = 0;\nfor (int fast = 1; fast < n; fast++)\n  if (arr[fast] != arr[slow]) arr[++slow] = arr[fast];",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // two pointer removal\n  return 0;\n}",
  },
  {
    id: "four-sum",
    title: "4Sum",
    category: "two-pointers",
    difficulty: "medium",
    description: "Find all unique quadruplets summing to target.",
    constraints: "1 <= n <= 200",
    examples: [
      {"input":"6\n1 0 -1 0 -2 2\n0","output":"-2 -1 1 2\n-2 0 0 2\n-1 0 0 1"}
    ],
    test_cases: [
      {"input":"6\n1 0 -1 0 -2 2\n0","expected":"-2 -1 1 2\n-2 0 0 2\n-1 0 0 1"}
    ],
    approach: "Sort array. Fix i and j, then use two pointers for the remaining two. Skip duplicates at each level.",
    complexity: {"time":"O(n³)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "sort(nums, nums+n);\nfor (int i = 0; i < n-3; i++) {\n  if (i > 0 && nums[i] == nums[i-1]) continue;\n  for (int j = i+1; j < n-2; j++) {\n    if (j > i+1 && nums[j] == nums[j-1]) continue;\n    int k = j+1, l = n-1;\n    while (k < l) {\n      long long sum = (long long)nums[i]+nums[j]+nums[k]+nums[l];\n      if (sum == target) { /* record */ k++; l--; while (k<l && nums[k]==nums[k-1]) k++; while (k<l && nums[l]==nums[l+1]) l--; }\n      else if (sum < target) k++;\n      else l--;\n    }\n  }\n}",
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> target;\n  // sort + 2 nested loops + 2 pointers\n  return 0;\n}",
  }
]
