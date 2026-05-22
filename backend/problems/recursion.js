export default [
  {
    id: "n-queens",
    title: "N-Queens Problem",
    category: "recursion",
    difficulty: "hard",
    description: "Place n queens on nxn board so no two attack each other.",
    constraints: "1 <= n <= 12",
    examples: [
      {"input":"4","output":"0 1 0 0\n0 0 0 1\n1 0 0 0\n0 0 1 0","explanation":"One valid arrangement"}
    ],
    test_cases: [
      {"input":"4","expected":"0 1 0 0\n0 0 0 1\n1 0 0 0\n0 0 1 0"}
    ],
    approach: "Backtracking: place queen per row, check column/diagonal safety, recurse to next row.",
    complexity: {"time":"O(n!)","space":"O(n²)"},
    sheet: "Striver A2Z",
    solution_code: "// isSafe checks column and diagonals. Place on board, recurse, backtrack.",
    solution_template: "#include <iostream>\nusing namespace std;\n\nbool isSafe(int board[][12], int n, int r, int c) {\n  for (int i = 0; i < r; i++) if (board[i][c]) return false;\n  for (int i = r, j = c; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;\n  for (int i = r, j = c; i >= 0 && j < n; i--, j++) if (board[i][j]) return false;\n  return true;\n}\n\nbool solve(int board[][12], int n, int r) {\n  if (r == n) return true;\n  for (int c = 0; c < n; c++) {\n    if (isSafe(board, n, r, c)) {\n      board[r][c] = 1;\n      if (solve(board, n, r+1)) return true;\n      board[r][c] = 0;\n    }\n  }\n  return false;\n}\n\nint main() {\n  int n; cin >> n;\n  int board[12][12] = {0};\n  if (solve(board, n, 0)) {\n    for (int i = 0; i < n; i++) {\n      for (int j = 0; j < n; j++) cout << board[i][j] << \" \";\n      cout << endl;\n    }\n  } else cout << \"No\" << endl;\n  return 0;\n}",
  }
]
