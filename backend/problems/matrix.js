export default [
  {
    id: "spiral-matrix",
    title: "Spiral Matrix Traversal",
    category: "matrix",
    difficulty: "medium",
    description: "Return all elements of matrix in spiral order.",
    constraints: "1 <= n,m <= 100",
    examples: [
      {"input":"3 3\n1 2 3\n4 5 6\n7 8 9","output":"1 2 3 6 9 8 7 4 5"}
    ],
    test_cases: [
      {"input":"3 3\n1 2 3\n4 5 6\n7 8 9","expected":"1 2 3 6 9 8 7 4 5"}
    ],
    approach: "Maintain four boundaries (top, bottom, left, right). Traverse right across top, down right column, left across bottom, up left column. Shrink boundaries and repeat.",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int top=0, bottom=n-1, left=0, right=m-1;\nwhile (top <= bottom && left <= right) {\n  for (int i=left; i<=right; i++) cout << arr[top][i] << \" \"; top++;\n  for (int i=top; i<=bottom; i++) cout << arr[i][right] << \" \"; right--;\n  if (top <= bottom) { for (int i=right; i>=left; i--) cout << arr[bottom][i] << \" \"; bottom--; }\n  if (left <= right) { for (int i=bottom; i>=top; i--) cout << arr[i][left] << \" \"; left++; }\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[100][100];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  // spiral traversal\n  return 0;\n}",
  }
]
