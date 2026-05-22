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
    approach: "Backtracking: place queen per row, check column/diagonal safety, recurse to next row.\n\nDiagram:\n  N=4, place queens row by row:\n\n  Row 0:     Q . . .\n\n  Row 1:     Q . . .    Q . . .\n             . . Q .    . . . Q\n\n  Row 2:     ... (branch continues, pruned if unsafe)\n\n  At row r, try each col c=0..N-1.\n  isSafe checks column, main diag (r-c == const), anti-diag (r+c == const).\n  On success, recurse row+1; on failure, backtrack (board[r][c]=0).",
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
    approach: "Backtracking: find empty cell, try digits 1-9, check row/col/box validity, recurse.\n\nDiagram:\n  Cell (r,c) empty, try digits 1..9:\n\n            findEmpty(r,c)\n                 |\n          try digit 1..9\n           /  |  |  |  \\\n          1   2  3  4 ... 9\n          |   |  |  |     |\n        (valid? check row,col,box)\n          |   |  |  |     |\n        place |  |  |   place\n          |   |  |  |     |\n        recurse|  |  |  recurse\n          |   |  |  |     |\n       success? fail->backtrack->next\n\n  Base: no empty cells remain (board full).\n  Backtrack: reset board[r][c]=0 when no digit works.",
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
    approach: "DFS/backtracking: try moves (D,L,R,U) in order. Mark visited, recurse, unmark.\n\nDiagram:\n  Maze 4x4, start at (0,0):\n\n        (0,0)\n       /     |\n      D      R (blocked)\n      |\n    (1,0)\n      |\n      D -> (2,0)\n      |\n      D (blocked)  R -> (2,1)\n                        |\n                       ... until (3,3)\n\n  At each cell (r,c), try 4 moves.\n  Valid if in bounds and maze[nr][nc] == 1.\n  Mark cell = 0 before recurse, restore = 1 after (backtrack).\n  Base: r==n-1 && c==n-1, record path string.",
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
    approach: "Backtracking with swapping: swap each element into current position, recurse, swap back.\n\nDiagram:\n  Permutations of [1,2,3]:\n\n            idx=0\n         /    |     \\\n    swap(0) swap(1) swap(2)\n    [1,2,3] [2,1,3] [3,2,1]\n        |       |        |\n      idx=1   idx=1    idx=1\n     /   \\    /   \\    /   \\\n  sw1  sw2 sw1  sw2 sw1  sw2\n  1,2,3 1,3,2 ...  ...  ...\n    |     |\n  idx=2 idx=2 (add to ans)\n\n  At each idx, swap arr[idx] with arr[i] for i=idx..n-1.\n  Recurse on idx+1, then swap back (backtrack).\n  Base: idx == n, push copy of arr into ans.",
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
    approach: "Backtracking: pick numbers in increasing order to avoid duplicates.\n\nDiagram:\n  n=4, k=2:\n\n            start=1\n         /    |     |    \\\n       i=1   i=2   i=3  i=4\n        |     |     |     |\n     start=2 start=3 start=4 start=5\n     /  |  \\    |     |     |\n   i=2 i=3 i=4 i=3   i=4   (stop)\n    |   |   |   |     |\n  [1,2][1,3][1,4][2,3][2,4]\n\n  Pick next number i from start..n.\n  Push i, recurse with start=i+1, pop (backtrack).\n  Base: cur.size() == k, add to ans.\n  Increasing order avoids duplicates like {2,1}.",
    complexity: {"time":"O(C(n,k))","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "// for i from start to n: push, recurse with i+1, pop",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid comb(int n, int k, int start, vector<int>& cur, vector<vector<int>>& ans) {\n  if ((int)cur.size() == k) { ans.push_back(cur); return; }\n  for (int i = start; i <= n; i++) {\n    cur.push_back(i);\n    comb(n, k, i+1, cur, ans);\n    cur.pop_back();\n  }\n}\n\nint main() {\n  int n, k; cin >> n >> k;\n  vector<vector<int>> ans;\n  vector<int> cur;\n  comb(n, k, 1, cur, ans);\n  for (auto& v : ans) {\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n  }\n  return 0;\n}",
  },
  {
    id: "subset-generation",
    title: "Subsets (Power Set)",
    category: "recursion",
    difficulty: "medium",
    description: "Generate all subsets of a set of distinct integers.",
    constraints: "1 <= n <= 12",
    examples: [
      {"input":"3\n1 2 3","output":"\n1\n1 2\n1 2 3\n1 3\n2\n2 3\n3"}
    ],
    test_cases: [
      {"input":"3\n1 2 3","expected":"\n1\n1 2\n1 2 3\n1 3\n2\n2 3\n3"}
    ],
    approach: "Pick or skip each element: include arr[idx] and recurse, then exclude and recurse.\n\nDiagram:\n  nums = [1, 2]:\n\n            root\n           /     \\\n       include 1 exclude 1\n         /    \\      /    \\\n     inc2  exc2  inc2  exc2\n       |     |     |     |\n    [1,2]   [1]   [2]   []\n\n  All subsets of [1,2,3]:\n  [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]\n\n  Take/include: push arr[idx], recurse idx+1, pop (backtrack).\n  Skip/exclude: recurse idx+1 directly.\n  Base: idx == n, add cur to ans.\n  Total 2^n subsets.",
    complexity: {"time":"O(2^n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "// push, rec(idx+1), pop, rec(idx+1)",
    solution_template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid gen(vector<int>& arr, int idx, vector<int>& cur, vector<vector<int>>& ans) {\n  if (idx == (int)arr.size()) { ans.push_back(cur); return; }\n  cur.push_back(arr[idx]);\n  gen(arr, idx+1, cur, ans);\n  cur.pop_back();\n  gen(arr, idx+1, cur, ans);\n}\n\nint main() {\n  int n; cin >> n;\n  vector<int> arr(n);\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  sort(arr.begin(), arr.end());\n  vector<vector<int>> ans;\n  vector<int> cur;\n  gen(arr, 0, cur, ans);\n  for (auto& v : ans) {\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n  }\n  return 0;\n}",
  },
  {
    id: "word-break",
    title: "Word Break (Print All)",
    category: "recursion",
    difficulty: "hard",
    description: "Given string and dictionary, print all possible sentences.",
    constraints: "1 <= |s| <= 20, 1 <= n <= 20",
    examples: [
      {"input":"catsanddog\n5\ncat cats and sand dog","output":"cat sand dog\ncats and dog"}
    ],
    test_cases: [
      {"input":"catsanddog\n5\ncat cats and sand dog","expected":"cat sand dog\ncats and dog"}
    ],
    approach: "DFS: at each position, try all words from dictionary that match prefix. Recurse for remaining string.\n\nDiagram:\n  s = \"catsanddog\", dict = {cat, cats, and, sand, dog}\n\n            idx=0\n           /     \\\n       \"cat\"   \"cats\"\n         |        |\n       idx=3    idx=4\n         |        |\n      \"sand\"   \"and\"\n         |        |\n       idx=7    idx=7\n         |        |\n      \"dog\"    \"dog\"\n         |        |\n       idx=10   idx=10\n      (add)     (add)\n\n  At idx, try all prefixes s[idx..i] that exist in dict.\n  Recurse on i+1 with accumulated sentence string.\n  Base: idx == s.length(), add sentence to ans.\n  No explicit backtracking needed (strings are immutable).",
    complexity: {"time":"O(2^n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "// for i from idx to end: if dict has s[idx..i], recurse with string + word",
    solution_template: "#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nvoid solve(string& s, unordered_set<string>& dict, int idx, string cur, vector<string>& ans) {\n  if (idx == (int)s.size()) { ans.push_back(cur); return; }\n  string word = \"\";\n  for (int i = idx; i < (int)s.size(); i++) {\n    word += s[i];\n    if (dict.count(word)) {\n      string nxt = cur.empty() ? word : cur + \" \" + word;\n      solve(s, dict, i+1, nxt, ans);\n    }\n  }\n}\n\nint main() {\n  string s; cin >> s;\n  int n; cin >> n;\n  unordered_set<string> dict;\n  for (int i = 0; i < n; i++) { string w; cin >> w; dict.insert(w); }\n  vector<string> ans;\n  solve(s, dict, 0, \"\", ans);\n  for (string& line : ans) cout << line << endl;\n  return 0;\n}",
  },
  {
    id: "m-coloring",
    title: "M-Coloring Problem",
    category: "recursion",
    difficulty: "medium",
    description: "Check if graph can be colored with m colors (no adjacent same color).",
    constraints: "1 <= n <= 10, 1 <= m <= 3",
    examples: [
      {"input":"4 4\n0 1\n1 2\n2 3\n3 0\n3","output":"Yes","explanation":"Cycle of 4 can be 2-colored, so 3 works"}
    ],
    test_cases: [
      {"input":"4 4\n0 1\n1 2\n2 3\n3 0\n3","expected":"Yes"}
    ],
    approach: "Backtracking: assign color 1..m to each vertex. Check adjacent vertices for same color.\n\nDiagram:\n  4-vertex graph with m=3:\n\n          v=0\n       /   |   \\\n      c1   c2   c3\n       |    |    |\n      v=1  v=1  v=1\n     / \\   / \\   / \\\n   c1 c2 c1 c2 c1 c2 ... (pruned by adj check)\n    |  |  |  |  |  |\n   (X) v2 ... (finds solution)\n\n  At vertex v, try colors 1..m.\n  isSafe: check no neighbor has same color.\n  If safe, assign, recurse v+1.\n  If recursion fails, backtrack (col[v]=0), try next color.\n  Base: v == N, all colored -> return true.",
    complexity: {"time":"O(m^n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "// for c in 1..m: if isSafe(g,col,v,c): col[v]=c, recurse(v+1), backtrack",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool ok(vector<vector<int>>& g, vector<int>& col, int v, int c) {\n  for (int u : g[v]) if (col[u] == c) return false;\n  return true;\n}\n\nbool solve(vector<vector<int>>& g, vector<int>& col, int v, int m) {\n  if (v == (int)g.size()) return true;\n  for (int c = 1; c <= m; c++) {\n    if (ok(g, col, v, c)) {\n      col[v] = c;\n      if (solve(g, col, v+1, m)) return true;\n      col[v] = 0;\n    }\n  }\n  return false;\n}\n\nint main() {\n  int n, e; cin >> n >> e;\n  vector<vector<int>> g(n);\n  for (int i = 0; i < e; i++) {\n    int u, v; cin >> u >> v;\n    g[u].push_back(v); g[v].push_back(u);\n  }\n  int m; cin >> m;\n  vector<int> col(n, 0);\n  cout << (solve(g, col, 0, m) ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
  }
]
