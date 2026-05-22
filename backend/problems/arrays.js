export default [
  {
    id: "rev-array",
    title: "Reverse an Array",
    category: "arrays",
    difficulty: "easy",
    description: "Given an array of integers, reverse it in-place.",
    constraints: "1 <= n <= 10^5, -10^9 <= arr[i] <= 10^9",
    examples: [
      {"input":"5\n1 2 3 4 5","output":"5 4 3 2 1","explanation":"Reverse the entire array"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5","expected":"5 4 3 2 1"},
      {"input":"3\n10 20 30","expected":"30 20 10"},
      {"input":"1\n42","expected":"42"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  // reverse arr here\n\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "Two-pointer technique: swap elements from both ends moving inward until pointers meet.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "int i=0,j=n-1;\nwhile(i<j){\n  int t=arr[i];\n  arr[i]=arr[j];\n  arr[j]=t;\n  i++;\n  j--;\n}",
  }
]
