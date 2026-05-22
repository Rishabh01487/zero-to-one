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
  },
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    category: "recursion",
    difficulty: "hard",
    description: "Solve a 9x9 Sudoku board using backtracking.",
    constraints: "Empty cells = 0",
    examples: [
      {"input":"9\n5 3 0 0 7 0 0 0 0\n6 0 0 1 9 5 0 0 0\n0 9 8 0 0 0 0 6 0\n8 0 0 0 6 0 0 0 3\n4 0 0 8 0 3 0 0 1\n7 0 0 0 2 0 0 0 6\n0 6 0 0 0 0 2 8 0\n0 0 0 4 1 9 0 0 5\n0 0 0 0 8 0 0 7 9","output":"Solved"}
    ],
    test_cases: [
      {"input":"9\n5 3 0 0 7 0 0 0 0\n6 0 0 1 9 5 0 0 0\n0 9 8 0 0 0 0 6 0\n8 0 0 0 6 0 0 0 3\n4 0 0 8 0 3 0 0 1\n7 0 0 0 2 0 0 0 6\n0 6 0 0 0 0 2 8 0\n0 0 0 4 1 9 0 0 5\n0 0 0 0 8 0 0 7 9","expected":"Solved"}
    ],
    approach: "Backtracking: find empty cell, try digits 1-9, check row/col/box validity, recurse.",
    complexity: {"time":"O(9^(n*n))","space":"O(n²)"},
    sheet: "Striver A2Z",
    solution_code: "// isValid checks row, col, 3x3 box. Try each num, recurse, backtrack if fails.",
    solution_template: "#include <iostream>\nusing namespace std;\n\nbool isValid(int b[][9], int r, int c, int num) {\n  for (int i = 0; i < 9; i++) if (b[r][i] == num) return false;\n  for (int i = 0; i < 9; i++) if (b[i][c] == num) return false;\n  int sr = r/3*3, sc = c/3*3;\n  for (int i = sr; i < sr+3; i++)\n    for (int j = sc; j < sc+3; j++)\n      if (b[i][j] == num) return false;\n  return true;\n}\n\nbool solve(int b[][9]) {\n  for (int r = 0; r < 9; r++)\n    for (int c = 0; c < 9; c++)\n      if (b[r][c] == 0) {\n        for (int num = 1; num <= 9; num++) {\n          if (isValid(b, r, c, num)) {\n            b[r][c] = num;\n            if (solve(b)) return true;\n            b[r][c] = 0;\n          }\n        }\n        return false;\n      }\n  return true;\n}\n\nint main() {\n  int b[9][9];\n  for (int i = 0; i < 9; i++)\n    for (int j = 0; j < 9; j++)\n      cin >> b[i][j];\n  cout << (solve(b) ? \"Solved\" : \"No solution\") << endl;\n  return 0;\n}",
  }
]
