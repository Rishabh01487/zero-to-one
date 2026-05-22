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
  },
  {
    id: "set-zeroes",
    title: "Set Matrix Zeroes",
    category: "matrix",
    difficulty: "medium",
    description: "If any cell is 0, set its entire row and column to 0 (in-place).",
    constraints: "1 <= n,m <= 200",
    examples: [
      {"input":"3 3\n1 1 1\n1 0 1\n1 1 1","output":"1 0 1\n0 0 0\n1 0 1"}
    ],
    test_cases: [
      {"input":"3 3\n1 1 1\n1 0 1\n1 1 1","expected":"1 0 1\n0 0 0\n1 0 1"}
    ],
    approach: "Use first row and first column as markers. First pass: mark rows/columns to zero. Second pass: set cells to zero based on markers. Handle first row/col separately.",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "bool firstRow = false, firstCol = false;\nfor (int i=0; i<n; i++) for (int j=0; j<m; j++) if (mat[i][j]==0) { if (i==0) firstRow=true; if (j==0) firstCol=true; mat[i][0]=0; mat[0][j]=0; }\nfor (int i=1; i<n; i++) for (int j=1; j<m; j++) if (mat[i][0]==0 || mat[0][j]==0) mat[i][j]=0;\nif (firstRow) for (int j=0; j<m; j++) mat[0][j]=0;\nif (firstCol) for (int i=0; i<n; i++) mat[i][0]=0;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[200][200];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  // set zeroes\n  for (int i=0; i<n; i++) { for (int j=0; j<m; j++) cout << mat[i][j] << \" \"; cout << endl; }\n  return 0;\n}",
  },
  {
    id: "rotate-image",
    title: "Rotate Image (90 degrees)",
    category: "matrix",
    difficulty: "medium",
    description: "Rotate n x n matrix by 90 degrees clockwise in-place.",
    constraints: "1 <= n <= 100",
    examples: [
      {"input":"3\n1 2 3\n4 5 6\n7 8 9","output":"7 4 1\n8 5 2\n9 6 3"}
    ],
    test_cases: [
      {"input":"3\n1 2 3\n4 5 6\n7 8 9","expected":"7 4 1\n8 5 2\n9 6 3"}
    ],
    approach: "Transpose the matrix (swap across diagonal), then reverse each row. Both operations are in-place.",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "for (int i=0; i<n; i++) for (int j=i; j<n; j++) swap(mat[i][j], mat[j][i]);\nfor (int i=0; i<n; i++) for (int j=0; j<n/2; j++) swap(mat[i][j], mat[i][n-1-j]);",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int mat[100][100];\n  for (int i=0; i<n; i++) for (int j=0; j<n; j++) cin >> mat[i][j];\n  // rotate\n  for (int i=0; i<n; i++) { for (int j=0; j<n; j++) cout << mat[i][j] << \" \"; cout << endl; }\n  return 0;\n}",
  }
]
