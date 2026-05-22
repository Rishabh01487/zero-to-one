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
  },
  {
    id: "rat-maze",
    title: "Rat in a Maze",
    category: "recursion",
    difficulty: "medium",
    description: "Find paths from (0,0) to (n-1,n-1) in a binary maze (1=open, 0=blocked). Moves: D, L, R, U.",
    constraints: "1 <= n <= 10",
    examples: [
      {"input":"4\n1 0 0 0\n1 1 0 1\n1 1 0 0\n0 1 1 1","output":"DDRDRR DRDDRR","explanation":"Two valid paths"}
    ],
    test_cases: [
      {"input":"4\n1 0 0 0\n1 1 0 1\n1 1 0 0\n0 1 1 1","expected":"DDRDRR DRDDRR"}
    ],
    approach: "DFS/backtracking: try moves (D,L,R,U) in order. Mark visited, recurse, unmark.",
    complexity: {"time":"O(3^(n²))","space":"O(n²)"},
    sheet: "Striver A2Z",
    solution_code: "// dirs array for 4 moves. Check bounds and open cell. Recurse on valid move.",
    solution_template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint dirs[4][2] = {{1,0},{0,-1},{0,1},{-1,0}};\nchar moves[4] = {'D','L','R','U'};\n\nvoid solve(int maze[][10], int n, int r, int c, string path, vector<string>& ans) {\n  if (r == n-1 && c == n-1) { ans.push_back(path); return; }\n  maze[r][c] = 0;\n  for (int i = 0; i < 4; i++) {\n    int nr = r + dirs[i][0], nc = c + dirs[i][1];\n    if (nr >= 0 && nr < n && nc >= 0 && nc < n && maze[nr][nc] == 1)\n      solve(maze, n, nr, nc, path + moves[i], ans);\n  }\n  maze[r][c] = 1;\n}\n\nint main() {\n  int n; cin >> n;\n  int maze[10][10];\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++)\n      cin >> maze[i][j];\n  vector<string> ans;\n  if (maze[0][0] == 1) solve(maze, n, 0, 0, \"\", ans);\n  sort(ans.begin(), ans.end());\n  for (string s : ans) cout << s << \" \";\n  return 0;\n}",
  },
  {
    id: "permutations",
    title: "All Permutations of Array",
    category: "recursion",
    difficulty: "medium",
    description: "Generate all permutations of distinct integers.",
    constraints: "1 <= n <= 8",
    examples: [
      {"input":"3\n1 2 3","output":"1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1"}
    ],
    test_cases: [
      {"input":"3\n1 2 3","expected":"1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1"}
    ],
    approach: "Backtracking with swapping: swap each element into current position, recurse, swap back.",
    complexity: {"time":"O(n*n!)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "// for i from idx to n-1: swap(arr[idx],arr[i]), permute(idx+1), swap back",
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nvoid permute(vector<int>& arr, int idx, vector<vector<int>>& ans) {\n  if (idx == (int)arr.size()) { ans.push_back(arr); return; }\n  for (int i = idx; i < (int)arr.size(); i++) {\n    swap(arr[idx], arr[i]);\n    permute(arr, idx+1, ans);\n    swap(arr[idx], arr[i]);\n  }\n}\n\nint main() {\n  int n; cin >> n;\n  vector<int> arr(n);\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  vector<vector<int>> ans;\n  permute(arr, 0, ans);\n  sort(ans.begin(), ans.end());\n  for (auto& v : ans) {\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n  }\n  return 0;\n}",
  },
  {
    id: "combinations",
    title: "Generate Combinations (nCk)",
    category: "recursion",
    difficulty: "medium",
    description: "Generate all combinations of k numbers from 1..n.",
    constraints: "1 <= n <= 20, 1 <= k <= n",
    examples: [
      {"input":"4 2","output":"1 2\n1 3\n1 4\n2 3\n2 4\n3 4"}
    ],
    test_cases: [
      {"input":"4 2","expected":"1 2\n1 3\n1 4\n2 3\n2 4\n3 4"}
    ],
    approach: "Backtracking: pick numbers in increasing order to avoid duplicates.",
    complexity: {"time":"O(C(n,k))","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "// for i from start to n: push, recurse with i+1, pop",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid comb(int n, int k, int start, vector<int>& cur, vector<vector<int>>& ans) {\n  if ((int)cur.size() == k) { ans.push_back(cur); return; }\n  for (int i = start; i <= n; i++) {\n    cur.push_back(i);\n    comb(n, k, i+1, cur, ans);\n    cur.pop_back();\n  }\n}\n\nint main() {\n  int n, k; cin >> n >> k;\n  vector<vector<int>> ans;\n  vector<int> cur;\n  comb(n, k, 1, cur, ans);\n  for (auto& v : ans) {\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n  }\n  return 0;\n}",
  }
]
