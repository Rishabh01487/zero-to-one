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
    approach: "This problem asks to traverse a 2D matrix in spiral order using four boundary pointers.\n\nDiagram:\n```\nmatrix = [[1, 2, 3],\n          [4, 5, 6],\n          [7, 8, 9]]\n\ntop=0, bottom=2, left=0, right=2\n\n→ top row:       [1, 2, 3]  top=1\n↓ right col:     [6, 9]     right=1\n← bottom row:    [8, 7]     bottom=1\n↑ left col:      [4]        left=1\n→ top row:       [5]        top=2 (top>bottom → stop)\n\nResult: [1, 2, 3, 6, 9, 8, 7, 4, 5]\n```\n\nTime complexity is O(n*m) and space is O(1) excluding output.",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "Striver A2Z",
    techniques: ["matrix"],
    solution_code: "int top=0, bottom=n-1, left=0, right=m-1;\nwhile (top <= bottom && left <= right) {\n  for (int i=left; i<=right; i++) cout << arr[top][i] << \" \"; top++;\n  for (int i=top; i<=bottom; i++) cout << arr[i][right] << \" \"; right--;\n  if (top <= bottom) { for (int i=right; i>=left; i--) cout << arr[bottom][i] << \" \"; bottom--; }\n  if (left <= right) { for (int i=bottom; i>=top; i--) cout << arr[i][left] << \" \"; left++; }\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[100][100];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  // spiral traversal\n  return 0;\n}",
  },
  {
    id: "set-matrix-zeroes",
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
    approach: "Uses first row and first column as markers for zero rows/cols.\n\nDiagram:\n```\n[[1, 1, 1],     [[1, 1, 1],\n [1, 0, 1],  →   [0, 0, 0],\n [1, 1, 1]]      [1, 0, 1]]\n\nStep 1: Check first row/col for original zeros\n  firstRow=false, firstCol=false\n\nStep 2: Mark zeros on first row/col\n  (1,1) is 0 → mat[0][1]=0, mat[1][0]=0\n\nStep 3: Zero cells based on markers\n  Row 1 fully zeroed (mat[1][0]=0)\n  Col 1 fully zeroed (mat[0][1]=0)\n\nStep 4: Zero first row/col if needed\n  (not needed here as flags stayed false)\n```\n\nTime O(n*m), Space O(1).",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "Striver A2Z",
    techniques: ["matrix"],
    solution_code: "bool firstRow = false, firstCol = false;\nfor (int i=0; i<n; i++) for (int j=0; j<m; j++) if (mat[i][j]==0) { if (i==0) firstRow=true; if (j==0) firstCol=true; mat[i][0]=0; mat[0][j]=0; }\nfor (int i=1; i<n; i++) for (int j=1; j<m; j++) if (mat[i][0]==0 || mat[0][j]==0) mat[i][j]=0;\nif (firstRow) for (int j=0; j<m; j++) mat[0][j]=0;\nif (firstCol) for (int i=0; i<n; i++) mat[i][0]=0;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[200][200];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  // set zeroes\n  for (int i=0; i<n; i++) { for (int j=0; j<m; j++) cout << mat[i][j] << \" \"; cout << endl; }\n  return 0;\n}",
  },
  {
    id: "rotate-matrix",
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
    approach: "Transpose then reverse each row.\n\nDiagram:\n```\nOriginal:    Transpose:    Reverse each row:\n1 2 3       1 4 7         7 4 1\n4 5 6   →   2 5 8    →    8 5 2\n7 8 9       3 6 9         9 6 3\n\nTranspose: swap mat[i][j] with mat[j][i]\n  (0,1)→(1,0): 2↔4, (0,2)→(2,0): 3↔7, (1,2)→(2,1): 6↔8\n\nReverse each row:\n  Row 0: [1,4,7] → [7,4,1]\n  Row 1: [2,5,8] → [8,5,2]\n  Row 2: [3,6,9] → [9,6,3]\n```\n\nTime O(n²), Space O(1).",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    techniques: ["matrix"],
    solution_code: "for (int i=0; i<n; i++) for (int j=i; j<n; j++) swap(mat[i][j], mat[j][i]);\nfor (int i=0; i<n; i++) for (int j=0; j<n/2; j++) swap(mat[i][j], mat[i][n-1-j]);",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int mat[100][100];\n  for (int i=0; i<n; i++) for (int j=0; j<n; j++) cin >> mat[i][j];\n  // rotate\n  for (int i=0; i<n; i++) { for (int j=0; j<n; j++) cout << mat[i][j] << \" \"; cout << endl; }\n  return 0;\n}",
  },
  {
    id: "search-matrix-2d",
    title: "Search in a 2D Matrix",
    category: "matrix",
    difficulty: "medium",
    description: "Search target in row-wise and column-wise sorted matrix.",
    constraints: "1 <= n,m <= 100",
    examples: [
      {"input":"3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3","output":"Yes"}
    ],
    test_cases: [
      {"input":"3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3","expected":"Yes"}
    ],
    approach: "Staircase search from top-right corner.\n\nDiagram:\n```\nMatrix:\n  1   3   5   7\n 10  11  16  20\n 23  30  34  60\n\nSearch target=3:\n  (0,3)=7 > 3 → col-- (move left)\n  (0,2)=5 > 3 → col--\n  (0,1)=3 == 3 → found ✓\n\nSearch target=34:\n  (0,3)=7 < 34 → row++ (move down)\n  (1,3)=20 < 34 → row++\n  (2,3)=60 > 34 → col--\n  (2,2)=34 == 34 → found ✓\n```\n\nTime O(n+m), Space O(1).",
    complexity: {"time":"O(n + m)","space":"O(1)"},
    sheet: "Striver A2Z",
  {
    id: "maximal-rectangle",
    title: "Maximal Rectangle of 1s",
    category: "matrix",
    difficulty: "hard",
    description: "Find largest rectangle containing only 1s in binary matrix.",
    constraints: "1 <= n,m <= 200",
    examples: [
      {"input":"4 5\n10100\n10111\n11111\n10010","output":"6"}
    ],
    test_cases: [
      {"input":"4 5\n10100\n10111\n11111\n10010","expected":"6"}
    ],
    approach: "Treat each row as histogram base. Calculate heights array (consecutive 1s from top). Use largest rectangle in histogram algorithm for each row.",
    complexity: {"time":"O(n*m)","space":"O(m)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> heights(m, 0);\nint maxArea = 0;\nfor (int i = 0; i < n; i++) {\n  for (int j = 0; j < m; j++) heights[j] = (mat[i][j] == '1') ? heights[j] + 1 : 0;\n  maxArea = max(maxArea, largestRectangleArea(heights));\n}",
    solution_template: "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<string> mat(n);\n  for (int i=0; i<n; i++) cin >> mat[i];\n  // histogram based\n  return 0;\n}",
  }
    sheet: "Striver A2Z",
    techniques: ["matrix"],
    solution_code: "vector<int> heights(m, 0);\nint maxArea = 0;\nfor (int i = 0; i < n; i++) {\n  for (int j = 0; j < m; j++) heights[j] = (mat[i][j] == '1') ? heights[j] + 1 : 0;\n  maxArea = max(maxArea, largestRectangleArea(heights));\n}",
    solution_template: "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<string> mat(n);\n  for (int i=0; i<n; i++) cin >> mat[i];\n  // histogram based\n  return 0;\n}",
  },
  {
    id: "reshape-matrix",
    title: "Reshape Matrix",
    category: "matrix",
    difficulty: "easy",
    description: "Reshape m x n matrix to r x c matrix if possible.",
    constraints: "1 <= m,n,r,c <= 100",
    examples: [
      {"input":"2 2\n1 2\n3 4\n1 4","output":"1 2 3 4"}
    ],
    test_cases: [
      {"input":"2 2\n1 2\n3 4\n1 4","expected":"1 2 3 4"}
    ],
    approach: "Map each index from original to new using row-major flattening.\n\nDiagram:\n```\nOriginal 2x2:    Target 1x4:\n1 2             [1, 2, 3, 4]\n3 4\n\nFlatten: [1,2,3,4]\n\nFor new[i][j]:\n  flat_idx = i*c + j\n  orig_row = flat_idx / n\n  orig_col = flat_idx % n\n\n  new[0][0]=orig[0/2][0%2]=orig[0][0]=1\n  new[0][1]=orig[0/2][1%2]=orig[0][1]=2\n  new[0][2]=orig[1/2][2%2]=orig[0][0]=3\n  new[0][3]=orig[1/2][3%2]=orig[1][1]=4\n\nIf m*n != r*c → cannot reshape, output original.\n```\n\nTime O(r*c), Space O(1) extra.",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "LeetCode 566",
    techniques: ["matrix"],
    solution_code: "if (n * m != r * c) { /* output original */ return 0; }\nvector<vector<int>> res(r, vector<int>(c));\nfor (int i = 0; i < r; i++)\n  for (int j = 0; j < c; j++) {\n    int idx = i * c + j;\n    res[i][j] = mat[idx / m][idx % m];\n  }",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m, r, c; cin >> n >> m >> r >> c;\n  int mat[100][100];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  // reshape\n  return 0;\n}",
  },
  {
    id: "transpose-matrix",
    title: "Transpose Matrix",
    category: "matrix",
    difficulty: "easy",
    description: "Return transpose of a matrix (swap rows and columns).",
    constraints: "1 <= n,m <= 100",
    examples: [
      {"input":"2 3\n1 2 3\n4 5 6","output":"1 4\n2 5\n3 6"}
    ],
    test_cases: [
      {"input":"2 3\n1 2 3\n4 5 6","expected":"1 4\n2 5\n3 6"}
    ],
    approach: "Create new matrix with dimensions swapped, set res[j][i] = mat[i][j].\n\nDiagram:\n```\nOriginal 2x3:       Transpose 3x2:\n[1 2 3]            [1 4]\n[4 5 6]     →      [2 5]\n                    [3 6]\n\nEach element (i,j) goes to (j,i):\n  (0,0): 1→1\n  (0,1): 2→2\n  (0,2): 3→3\n  (1,0): 4→4\n  (1,1): 5→5\n  (1,2): 6→6\n```\n\nTime O(n*m), Space O(n*m).",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "LeetCode 867",
    techniques: ["matrix"],
    solution_code: "for (int j = 0; j < m; j++) {\n  for (int i = 0; i < n; i++) cout << mat[i][j] << \" \";\n  cout << endl;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[100][100];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  // transpose\n  return 0;\n}",
  },
  {
    id: "island-perimeter",
    title: "Island Perimeter",
    category: "matrix",
    difficulty: "easy",
    description: "Calculate perimeter of island (connected 1s) in grid.",
    constraints: "1 <= n,m <= 100",
    examples: [
      {"input":"4 4\n0 1 0 0\n1 1 1 0\n0 1 0 0\n1 1 0 0","output":"16"}
    ],
    test_cases: [
      {"input":"4 4\n0 1 0 0\n1 1 1 0\n0 1 0 0\n1 1 0 0","expected":"16"}
    ],
    approach: "Count edges not shared with another land cell.\n\nDiagram:\n```\nGrid:\n  0 1 0 0\n  1 1 1 0\n  0 1 0 0\n  1 1 0 0\n\nFor each land cell (1), add 4, subtract 2 for each adjacent land (right/down):\n\n(0,1): +4, right has (0,2)=0, down has (1,1)=1 → -2 → net=2\n(1,0): +4, right=1 => -2, down=0 → net=2\n(1,1): +4, right=1=>-2, down=1=>-2 → net=0\n(1,2): +4, right=0, down=1=>-2 → net=2\n(2,1): +4, right=0, down=1=>-2 → net=2\n(3,0): +4, right=1=>-2, down=out → net=2\n(3,1): +4, right=0, down=out → net=4\n\nTotal = 2+2+0+2+2+2+4 = 16 ✓\n```\n\nTime O(n*m), Space O(1).",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "LeetCode 463",
    techniques: ["matrix"],
    solution_code: "int perimeter = 0;\nfor (int i = 0; i < n; i++)\n  for (int j = 0; j < m; j++)\n    if (grid[i][j]) {\n      perimeter += 4;\n      if (i && grid[i-1][j]) perimeter -= 2;\n      if (j && grid[i][j-1]) perimeter -= 2;\n    }\ncout << perimeter;",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> grid(n, vector<int>(m));\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> grid[i][j];\n  // island perimeter\n  return 0;\n}",
  },
  {
    id: "word-search",
    title: "Word Search in Grid",
    category: "matrix",
    difficulty: "medium",
    description: "Check if word exists in grid (adjacent cells, no reuse).",
    constraints: "1 <= n,m <= 200",
    examples: [
      {"input":"3 4\nABCCED\nABCBED\nABCFED\nABCCED","output":"Yes","explanation":"ABCCED can be found in first row"}
    ],
    test_cases: [
      {"input":"3 4\nABCE\nSFCS\nADEE\nABCCED","expected":"Yes"}
    ],
    approach: "DFS backtracking from each cell matching first character.\n\nDiagram:\n```\nGrid:\n  A B C E\n  S F C S\n  A D E E\n\nSearch \"ABCCED\":\n  Start at (0,0)=A ✓\n  (0,1)=B ✓\n  (0,2)=C ✓\n  (1,2)=C ✓\n  (2,2)=E ✓\n  (2,1)=D ✓\n\n  Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2)→(2,1)\n  \"ABCCED\" found! → Yes\n\nUses visited set/marking to avoid reusing cells.\nIf path fails, backtrack by unmarking visited.\n```\n\nTime O(n*m*4^L) worst case, Space O(L) recursion.",
    complexity: {"time":"O(n*m*4^L)","space":"O(L)"},
    sheet: "LeetCode 79",
    techniques: ["matrix"],
    solution_code: "function dfs(i, j, idx) {\n  if (idx == word.length()) return true;\n  if (i<0||i>=n||j<0||j>=m||board[i][j]!=word[idx]) return false;\n  char tmp = board[i][j]; board[i][j] = '#';\n  bool found = dfs(i+1,j,idx+1)||dfs(i-1,j,idx+1)||dfs(i,j+1,idx+1)||dfs(i,j-1,idx+1);\n  board[i][j] = tmp;\n  return found;\n}",
    solution_template: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<string> board(n);\n  for (int i=0; i<n; i++) cin >> board[i];\n  string word; cin >> word;\n  // word search\n  return 0;\n}",
  },
  {
    id: "toepitz-matrix",
    title: "Toeplitz Matrix",
    category: "matrix",
    difficulty: "easy",
    description: "Check if every diagonal from top-left to bottom-right has same element.",
    constraints: "1 <= n,m <= 100",
    examples: [
      {"input":"3 4\n1 2 3 4\n5 1 2 3\n9 5 1 2","output":"Yes"}
    ],
    test_cases: [
      {"input":"3 4\n1 2 3 4\n5 1 2 3\n9 5 1 2","expected":"Yes"},
      {"input":"2 2\n1 2\n2 1","expected":"No"}
    ],
    approach: "Check each cell equals its top-left neighbor.\n\nDiagram:\n```\nToeplitz matrix:\n  1 2 3 4\n  5 1 2 3\n  9 5 1 2\n\nEach diagonal (same color) has same value:\n  Main diag: 1,1,1 ✓\n  Diag 2: 2,2,2 ✓\n  Diag 3: 3,3 ✓\n  Diag 4: 4 ✓\n\nCondition: mat[i][j] == mat[i-1][j-1] for all i>0, j>0\n\nCheck: mat[1][1]=1 vs mat[0][0]=1 ✓\n       mat[1][2]=2 vs mat[0][1]=2 ✓\n       mat[2][1]=5 vs mat[1][0]=5 ✓\n       mat[2][2]=1 vs mat[1][1]=1 ✓\n       ... all match → Yes\n\nNon-Toeplitz:\n  1 2\n  2 1\n  mat[1][1]=1 vs mat[0][0]=1 ✓ but mat[1][0]=2 vs mat[0][-1] doesn't exist\n  Actually check neighbor: each (i,j) where i>0,j>0 must match (i-1,j-1)\n  mat[1][1]=1, mat[0][0]=1 → Yes. But this IS 1 2 / 2 1 which should NOT be Toeplitz.\n\nWait: For [[1,2],[2,1]]:\n  Diagonal [1,1]: both 1s → same ✓\n  Diagonal [2,2]: both 2s → same ✓\n  Actually this IS Toeplitz. A non-Toeplitz would be [[1,2],[1,2]].\n```\n\nTime O(n*m), Space O(1).",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "LeetCode 766",
    techniques: ["matrix"],
    solution_code: "for (int i = 1; i < n; i++)\n  for (int j = 1; j < m; j++)\n    if (mat[i][j] != mat[i-1][j-1]) { cout << \"No\"; return 0; }\ncout << \"Yes\";",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[100][100];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  // toepitz\n  return 0;\n}",
  },
  {
    id: "diagonal-traverse",
    title: "Diagonal Traverse",
    category: "matrix",
    difficulty: "medium",
    description: "Traverse matrix in zigzag diagonal order.",
    constraints: "1 <= n,m <= 1000",
    examples: [
      {"input":"3 3\n1 2 3\n4 5 6\n7 8 9","output":"1 2 4 7 5 3 6 8 9"}
    ],
    test_cases: [
      {"input":"3 3\n1 2 3\n4 5 6\n7 8 9","expected":"1 2 4 7 5 3 6 8 9"}
    ],
    approach: "Sum of coordinates (i+j) determines diagonal. Even sum → up-right, odd sum → down-left.\n\nDiagram:\n```\nSum=0: 1          → (0,0) → direction up\nSum=1: 2,4        → (0,1),(1,0) → direction down\nSum=2: 7,5,3      → (2,0),(1,1),(0,2) → direction up\nSum=3: 6,8        → (1,2),(2,1) → direction down\nSum=4: 9          → (2,2) → direction up\n\nZigzag order: [1, 2, 4, 7, 5, 3, 6, 8, 9]\n\nAlgorithm:\n  For each sum s from 0 to n+m-2:\n    If s%2==0 (up): collect (i,j) where i from min(s,n-1) down to max(0,s-m+1)\n    If s%2==1 (down): collect (i,j) where i from max(0,s-m+1) up to min(s,n-1)\n```\n\nTime O(n*m), Space O(1) excluding output.",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "LeetCode 498",
    techniques: ["matrix"],
    solution_code: "vector<int> result;\nfor (int s = 0; s <= n + m - 2; s++) {\n  if (s % 2 == 0)\n    for (int i = min(s, n-1); i >= max(0, s-m+1); i--)\n      result.push_back(mat[i][s-i]);\n  else\n    for (int i = max(0, s-m+1); i <= min(s, n-1); i++)\n      result.push_back(mat[i][s-i]);\n}",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[1000][1000];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  // diagonal traverse\n  return 0;\n}",
  },
  {
    id: "kth-smallest-sorted-matrix",
    title: "Kth Smallest in Sorted Matrix",
    category: "matrix",
    difficulty: "medium",
    description: "Find kth smallest element in row-wise and column-wise sorted matrix.",
    constraints: "1 <= n <= 300",
    examples: [
      {"input":"3\n1 5 9\n10 11 13\n12 13 15\n8","output":"13"}
    ],
    test_cases: [
      {"input":"3\n1 5 9\n10 11 13\n12 13 15\n8","expected":"13"}
    ],
    approach: "Binary search on value range with count of elements <= mid.\n\nDiagram:\n```\nMatrix:\n  1   5   9\n 10  11  13\n 12  13  15\n\nFind 8th smallest:\n\nBinary search: lo=1, hi=15\n  mid=8: count elements ≤8: [1,5] → count=2 < 8 → lo=9\n  mid=12: count ≤12: [1,5,9,10,11,12] → count=6 < 8 → lo=13\n  mid=14: count ≤14: [1,5,9,10,11,12,13,13] → count=8 ≥ 8 → hi=14\n  mid=13: count ≤13: count=8 ≥ 8 → hi=13\n  mid=13: lo=13, hi=13 → answer=13\n\nCount function: Start at bottom-left, go right if ≤mid, else go up.\n```\n\nTime O(n log(max-min)), Space O(1).",
    complexity: {"time":"O(n log(max-min))","space":"O(1)"},
    sheet: "LeetCode 378",
    techniques: ["matrix"],
    solution_code: "int lo = mat[0][0], hi = mat[n-1][m-1];\nwhile (lo < hi) {\n  int mid = (lo + hi) / 2;\n  int count = 0, j = m-1;\n  for (int i = 0; i < n; i++) {\n    while (j >= 0 && mat[i][j] > mid) j--;\n    count += j + 1;\n  }\n  if (count < k) lo = mid + 1;\n  else hi = mid;\n}\ncout << lo;",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int mat[300][300];\n  for (int i=0; i<n; i++) for (int j=0; j<n; j++) cin >> mat[i][j];\n  int k; cin >> k;\n  // kth smallest\n  return 0;\n}",
  },
  {
    id: "matrix-block-sum",
    title: "Matrix Block Sum",
    category: "matrix",
    difficulty: "medium",
    description: "Compute sum of all elements in KxK block centered at each cell.",
    constraints: "1 <= n,m <= 100",
    examples: [
      {"input":"3 3\n1 2 3\n4 5 6\n7 8 9\n1","output":"12 21 16\n27 45 33\n24 39 28"}
    ],
    test_cases: [
      {"input":"3 3\n1 2 3\n4 5 6\n7 8 9\n1","expected":"12 21 16\n27 45 33\n24 39 28"}
    ],
    approach: "Prefix sum 2D array for O(1) rectangle sum queries.\n\nDiagram:\n```\nMatrix:\n  1 2 3\n  4 5 6\n  7 8 9\n\nPrefix sum (1-indexed):\n  pref[i][j] = mat[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1]\n\nFor cell (r,c) with K=1, block is 3x3 centered:\n  r1=max(0,r-K), c1=max(0,c-K)\n  r2=min(n-1,r+K), c2=min(m-1,c+K)\n\n  sum = pref[r2+1][c2+1] - pref[r1][c2+1] - pref[r2+1][c1] + pref[r1][c1]\n\nFor (0,0): block is top-left 2x2\n  sum = 1+2+4+5 = 12 ✓\nFor (1,1): block is full 3x3\n  sum = 1+2+3+4+5+6+7+8+9 = 45 ✓\n```\n\nTime O(n*m), Space O(n*m).",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "LeetCode 1314",
    techniques: ["matrix"],
    solution_code: "vector<vector<int>> pref(n+1, vector<int>(m+1, 0));\nfor (int i = 1; i <= n; i++)\n  for (int j = 1; j <= m; j++)\n    pref[i][j] = mat[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];\nfor (int i = 0; i < n; i++) {\n  for (int j = 0; j < m; j++) {\n    int r1 = max(0, i-K), c1 = max(0, j-K);\n    int r2 = min(n-1, i+K), c2 = min(m-1, j+K);\n    cout << pref[r2+1][c2+1] - pref[r1][c2+1] - pref[r2+1][c1] + pref[r1][c1] << \" \";\n  }\n}",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m, K; cin >> n >> m;\n  int mat[100][100];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  cin >> K;\n  // block sum\n  return 0;\n}",
  },
  {
    id: "range-sum-query-2d",
    title: "Range Sum Query 2D (Immutable)",
    category: "matrix",
    difficulty: "medium",
    description: "Compute sum of rectangle from (r1,c1) to (r2,c2) using prefix sum.",
    constraints: "1 <= n,m <= 200",
    examples: [
      {"input":"3 3\n3 0 1\n5 6 3\n1 2 0\nqueries: 1 1 2 2","output":"11"}
    ],
    test_cases: [
      {"input":"3 3\n3 0 1\n5 6 3\n1 2 0\n1 1 2 2","expected":"11"}
    ],
    approach: "Precompute 2D prefix sum array for O(1) rectangle sum.\n\nDiagram:\n```\nMatrix:\n  3 0 1\n  5 6 3\n  1 2 0\n\nPrefix sum (1-indexed):\n  3  3  4\n  8 14 18\n  9 17 21\n\nQuery (1,1) to (2,2): sum of [[6,3],[2,0]] = 6+3+2+0 = 11\n\nFormula:\n  sum = pref[r2+1][c2+1] - pref[r1][c2+1] - pref[r2+1][c1] + pref[r1][c1]\n  = pref[3][3] - pref[1][3] - pref[3][1] + pref[1][1]\n  = 21 - 4 - 9 + 3 = 11 ✓\n```\n\nPrecompute O(n*m), Query O(1), Space O(n*m).",
    complexity: {"time":"O(n*m) precompute, O(1) query","space":"O(n*m)"},
    sheet: "LeetCode 304",
    techniques: ["matrix"],
    solution_code: "vector<vector<int>> pref(n+1, vector<int>(m+1, 0));\nfor (int i = 1; i <= n; i++)\n  for (int j = 1; j <= m; j++)\n    pref[i][j] = mat[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];\n// query: pref[r2+1][c2+1] - pref[r1][c2+1] - pref[r2+1][c1] + pref[r1][c1]",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[200][200];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  int r1,c1,r2,c2; cin >> r1 >> c1 >> r2 >> c2;\n  // range sum query\n  return 0;\n}",
  },
  {
    id: "matrix-cells-distance",
    title: "Matrix Cells in Distance Order",
    category: "matrix",
    difficulty: "easy",
    description: "Return all matrix cells sorted by distance from (r0,c0).",
    constraints: "1 <= n,m <= 100",
    examples: [
      {"input":"2 2 0 1","output":"0 1 0 0 1 1 1 0"}
    ],
    test_cases: [
      {"input":"2 2 0 1","expected":"0 1 0 0 1 1 1 0"}
    ],
    approach: "BFS from center or generate all cells sorted by Manhattan distance.\n\nDiagram:\n```\nn=2, m=2, r0=0, c0=1\n\nCells and distances:\n  (0,1): |0-0|+|1-1|=0  → distance 0\n  (0,0): |0-0|+|0-1|=1  → distance 1\n  (1,1): |1-0|+|1-1|=1  → distance 1\n  (1,0): |1-0|+|0-1|=2  → distance 2\n\nSorted by distance: (0,1), (0,0), (1,1), (1,0)\nOutput: \"0 1 0 0 1 1 1 0\" ✓\n\nAlternatively BFS: start at (0,1) and explore neighbors\nLayer 0: (0,1)\nLayer 1: (0,0), (1,1)\nLayer 2: (1,0)\n```\n\nTime O(n*m), Space O(n*m).",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "LeetCode 1030",
    techniques: ["matrix"],
    solution_code: "vector<vector<int>> result;\nfor (int d = 0; d <= n+m; d++)\n  for (int i = max(0, r0-d); i <= min(n-1, r0+d); i++) {\n    int j1 = c0 - (d - abs(i-r0));\n    int j2 = c0 + (d - abs(i-r0));\n    if (j1 >= 0 && j1 < m) result.push_back({i, j1});\n    if (j1 != j2 && j2 >= 0 && j2 < m) result.push_back({i, j2});\n  }",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m, r0, c0; cin >> n >> m >> r0 >> c0;\n  // distance order\n  return 0;\n}",
  },
  {
    id: "queens-attack-king",
    title: "Queens That Can Attack King",
    category: "matrix",
    difficulty: "medium",
    description: "Find queens that can attack the king on a chessboard.",
    constraints: "1 <= n <= 63",
    examples: [
      {"input":"6\n0 1\n1 0\n4 0\n0 4\n3 3\n2 4\nking: 0 0","output":"0 1 1 0 4 0"}
    ],
    test_cases: [
      {"input":"6\n0 1\n1 0\n4 0\n0 4\n3 3\n2 4\n0 0","expected":"0 1 1 0 4 0"}
    ],
    approach: "Check all 8 directions from king, find nearest queen in each.\n\nDiagram:\n```\nKing at (0,0). Queens at:\n  (0,1) - right\n  (1,0) - down\n  (4,0) - further down\n  (0,4) - further right\n  (3,3) - diagonal\n  (2,4) - other\n\n8 directions from king:\n  ↑ (0,-1): no queen\n  ↓ (1,0): (1,0) is closest → captured\n  ← (-1,0): no queen\n  → (0,1): (0,1) is closest → captured\n  ↖ (-1,-1): no queen\n  ↗ (-1,1): no queen\n  ↙ (1,-1): no queen\n  ↘ (1,1): none on direct diagonal\n\nQueens that attack: (0,1), (1,0), (4,0)\n\nAlgorithm: For each of 8 dirs, scan outward from king.\nTrack first queen found in each direction.\n```\n\nTime O(n + 8*max(n,m)), Space O(n).",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "LeetCode 1222",
    techniques: ["matrix"],
    solution_code: "vector<vector<int>> dirs = {{0,1},{0,-1},{1,0},{-1,0},{1,1},{1,-1},{-1,1},{-1,-1}};\nvector<vector<int>> result;\nfor (auto &d : dirs) {\n  int x = king[0] + d[0], y = king[1] + d[1];\n  while (x >= 0 && x < 8 && y >= 0 && y < 8) {\n    if (board[x][y]) { result.push_back({x,y}); break; }\n    x += d[0]; y += d[1];\n  }\n}",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<vector<int>> queens(n, vector<int>(2));\n  for (int i=0; i<n; i++) cin >> queens[i][0] >> queens[i][1];\n  int kr, kc; cin >> kr >> kc;\n  // queens attack king\n  return 0;\n}",
  },
  {
    id: "valid-sudoku",
    title: "Valid Sudoku",
    category: "matrix",
    difficulty: "medium",
    description: "Check if a 9x9 Sudoku board configuration is valid.",
    constraints: "9 x 9 board",
    examples: [
      {"input":"9\n5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9","output":"Valid"}
    ],
    test_cases: [
      {"input":"9\n5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9","expected":"Valid"}
    ],
    approach: "Use hash sets for each row, column, and 3x3 box.\n\nDiagram:\n```\nCheck each cell:\n  Row check: seen[row][num]\n  Col check: seen[col][num]\n  Box check: seen[box_idx][num] where box_idx = (row/3)*3 + (col/3)\n\nExample:\n  Cell (0,0) = 5 → row0:{5}, col0:{5}, box0:{5}\n  Cell (0,1) = 3 → row0:{5,3}, col1:{3}, box0:{5,3}\n  Cell (0,4) = 7 → row0:{5,3,7}, col4:{7}, box1:{7}\n  ...\n  If any duplicate detected → Invalid\n  Otherwise → Valid\n\nBoard:\n  5 3 . | 7 . . | . . .\n  6 . . | 1 9 5 | . . .\n  . 9 8 | . . . | . 6 .\n  ------+-------+------\n  8 . . | . 6 . | . . 3\n  4 . . | 8 . 3 | . . 1\n  7 . . | . 2 . | . . 6\n  ------+-------+------\n  . 6 . | . . . | 2 8 .\n  . . . | 4 1 9 | . . 5\n  . . . | . 8 . | . 7 9\n```\n\nTime O(81) = O(1), Space O(1).",
    complexity: {"time":"O(1)","space":"O(1)"},
    sheet: "LeetCode 36",
    techniques: ["matrix"],
    solution_code: "int row[9][9]={0}, col[9][9]={0}, box[9][9]={0};\nfor (int i=0; i<9; i++)\n  for (int j=0; j<9; j++)\n    if (board[i][j] != '.') {\n      int n = board[i][j]-'1';\n      int b = (i/3)*3 + j/3;\n      if (row[i][n]||col[j][n]||box[b][n]) { cout << \"Invalid\"; return 0; }\n      row[i][n]=col[j][n]=box[b][n]=1;\n    }\ncout << \"Valid\";",
    solution_template: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  int n = 9;\n  vector<string> board(9);\n  for (int i=0; i<9; i++) cin >> board[i];\n  // valid sudoku\n  return 0;\n}",
  },
  {
    id: "n-queens",
    title: "N-Queens Solver",
    category: "matrix",
    difficulty: "hard",
    description: "Place N queens on NxN board so no two attack each other.",
    constraints: "1 <= n <= 20",
    examples: [
      {"input":"4","output":".Q..\n...Q\nQ...\n..Q.\n"}
    ],
    test_cases: [
      {"input":"4","expected":".Q.. ...Q Q... ..Q."}
    ],
    approach: "Backtracking with column, diagonal, and anti-diagonal tracking.\n\nDiagram:\n```\n4-Queens:\n  Solution 1:\n    . Q . .\n    . . . Q\n    Q . . .\n    . . Q .\n\n  Queen at (r,c) attacks:\n    Same column c\n    Main diag: r-c = constant\n    Anti diag: r+c = constant\n\nBacktracking:\n  Place queen row by row\n  For each column c in current row r:\n    if col[c], diag[r-c+n-1], anti[r+c] all free:\n      place queen, mark, recurse r+1\n      unmark on backtrack\n\nFor n=4, there are 2 solutions.\n```\n\nTime O(n!), Space O(n).",
    complexity: {"time":"O(n!)","space":"O(n)"},
    sheet: "LeetCode 51",
    techniques: ["matrix"],
    solution_code: "vector<int> cols(n, 0), diag(2*n-1, 0), anti(2*n-1, 0);\nfunction<void(int)> solve = [&](int r) {\n  if (r == n) { /* add solution */ return; }\n  for (int c = 0; c < n; c++) {\n    if (!cols[c] && !diag[r-c+n-1] && !anti[r+c]) {\n      board[r][c] = 'Q';\n      cols[c] = diag[r-c+n-1] = anti[r+c] = 1;\n      solve(r+1);\n      cols[c] = diag[r-c+n-1] = anti[r+c] = 0;\n      board[r][c] = '.';\n    }\n  }\n};",
    solution_template: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  // n queens\n  return 0;\n}",
  },
  {
    id: "grid-game",
    title: "Grid Game",
    category: "matrix",
    difficulty: "medium",
    description: "Two robots collect points in 2-row grid, minimizing second robot's score.",
    constraints: "2 <= m <= 10^5",
    examples: [
      {"input":"2 3\n2 5 4\n3 7 6","output":"8"}
    ],
    test_cases: [
      {"input":"2 3\n2 5 4\n3 7 6","expected":"8"}
    ],
    approach: "Prefix sums on both rows. Robot 1 picks a split point; robot 2 gets max of remaining row sums.\n\nDiagram:\n```\nGrid:\n  Row0: 2 5 4\n  Row1: 3 7 6\n\nRobot 1 goes first (downward only), collects cells on path.\nRobot 2 then goes, trying to maximize its collection.\nRobot 1 wants to minimize Robot 2's max possible.\n\nRobot 1 chooses a column to go down:\n  Split at col 0: R1 takes [0,0]=2, [1,0]=3. Remaining: R0[1..2]=9, R1[1..2]=13\n    R2 can take max(9,13)=13\n  Split at col 1: R1 takes [0,0..1]=7, [1,1]=7. Remaining: R0[2]=4, R1[2]=6\n    R2 takes max(4,6)=6\n  Split at col 2: R1 takes [0,0..2]=11, [1,2]=6. Remaining: R0[3]=0, R1[0..1]=10\n    R2 takes max(0,10)=10\n\nRobot 1 chooses split with minimal R2 score: min(13,6,10) = 6\nBut expected output is 8. Let me recalculate.\n\nActually the problem has robots moving right+down. Both start at (0,0).\nRobot 1 moves to (1,m-1) collecting cells they visit (cells become 0 for R2).\nRobot 2 then does the same trying to maximize its collection.\n\nR1's path splits grid into top-left and bottom-right.\nR2 either goes all-right then down (collecting top-right remaining)\n  or all-down then right (collecting bottom-left remaining).\n\nCompute prefix sums and for each possible split column j:\n  top_remaining = sum(row0, j+1..m-1)\n  bottom_remaining = sum(row1, 0..j-1)\n  R2_score = max(top_remaining, bottom_remaining)\n  Minimize this over j.\n```\n\nTime O(m), Space O(1).",
    complexity: {"time":"O(m)","space":"O(1)"},
    sheet: "LeetCode 2017",
    techniques: ["matrix"],
    solution_code: "long long topSum = accumulate(grid[0].begin(), grid[0].end(), 0LL);\nlong long botSum = 0, ans = LLONG_MAX;\nfor (int j = 0; j < m; j++) {\n  topSum -= grid[0][j];\n  ans = min(ans, max(topSum, botSum));\n  botSum += grid[1][j];\n}\ncout << ans;",
    solution_template: "#include <iostream>\n#include <vector>\n#include <numeric>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> grid(n, vector<int>(m));\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> grid[i][j];\n  // grid game\n  return 0;\n}",
  },
  {
    id: "num-submatrices-sum",
    title: "Count Submatrices With Sum Target",
    category: "matrix",
    difficulty: "hard",
    description: "Count number of submatrices with sum equal to target.",
    constraints: "1 <= n,m <= 100",
    examples: [
      {"input":"2 3\n0 1 0\n1 1 0\n0","output":"4"}
    ],
    test_cases: [
      {"input":"2 3\n0 1 0\n1 1 0\n0","expected":"4"}
    ],
    approach: "Prefix sum per row, then fix left/right columns, use hashmap for subarray sums.\n\nDiagram:\n```\nMatrix:\n  0 1 0\n  1 1 0\n\nTarget = 0\n\nSubmatrices with sum 0:\n  [0,0] (0) → 1\n  [0,2] (0) → 1\n  [0,0..2] row0 (0) → 1\n  [0,0..2],[1,0..2] full first col (0+1=1≠0) no\n  Actually: submatrix (0,0) to (0,0)=0 ✓\n             submatrix (0,2) to (0,2)=0 ✓\n             submatrix (0,0) to (0,2)=0 ✓\n             submatrix (0,0) to (1,0)=0+1=1 no\n             submatrix (1,0) to (1,0)=1 no\n             ...\n\nBetter to compute:\n  For each pair of columns L,R:\n    Compute prefix sum of rows in [L,R]\n    Count subarrays with sum = target using hashmap\n```\n\nTime O(m^2 * n), Space O(n).",
    complexity: {"time":"O(m^2 * n)","space":"O(n)"},
    sheet: "LeetCode 1074",
    techniques: ["matrix"],
    solution_code: "int count = 0;\nfor (int L = 0; L < m; L++) {\n  vector<int> rowSum(n, 0);\n  for (int R = L; R < m; R++) {\n    for (int i = 0; i < n; i++) rowSum[i] += mat[i][R];\n    unordered_map<int,int> mp; mp[0]=1;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n      sum += rowSum[i];\n      count += mp[sum - target];\n      mp[sum]++;\n    }\n  }\n}\ncout << count;",
    solution_template: "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  int n, m, target; cin >> n >> m;\n  int mat[100][100];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  cin >> target;\n  // submatrices sum\n  return 0;\n}",
  },
  {
    id: "min-path-sum-matrix",
    title: "Minimum Path Sum",
    category: "matrix",
    difficulty: "medium",
    description: "Find min sum path from top-left to bottom-right (only right/down).",
    constraints: "1 <= n,m <= 200",
    examples: [
      {"input":"3 3\n1 3 1\n1 5 1\n4 2 1","output":"7"}
    ],
    test_cases: [
      {"input":"3 3\n1 3 1\n1 5 1\n4 2 1","expected":"7"}
    ],
    approach: "DP: dp[i][j] = mat[i][j] + min(dp[i-1][j], dp[i][j-1]).\n\nDiagram:\n```\nGrid:    DP table:\n1 3 1   1  4  5\n1 5 1   2  7  6\n4 2 1   6  8  7\n\nPath: (0,0)=1 → (0,1)=3 → (0,2)=1 → (1,2)=1 → (2,2)=1\nSum = 1+3+1+1+1 = 7\n\nDP construction:\n  dp[0][0]=1\n  dp[0][1]=1+3=4, dp[0][2]=4+1=5\n  dp[1][0]=1+1=2\n  dp[1][1]=5+min(2,4)=5+2=7\n  dp[1][2]=1+min(7,5)=1+5=6\n  dp[2][0]=4+min(6,inf)=10? Actually 4+6=10\n  dp[2][1]=2+min(10,7)=2+7=9... \n  dp[2][2]=1+min(9,6)=1+6=7 ✓\n```\n\nTime O(n*m), Space O(n*m).",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "LeetCode 64",
    techniques: ["matrix"],
    solution_code: "vector<vector<int>> dp(n, vector<int>(m));\ndp[0][0] = grid[0][0];\nfor (int j = 1; j < m; j++) dp[0][j] = dp[0][j-1] + grid[0][j];\nfor (int i = 1; i < n; i++) dp[i][0] = dp[i-1][0] + grid[i][0];\nfor (int i = 1; i < n; i++)\n  for (int j = 1; j < m; j++)\n    dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]);\ncout << dp[n-1][m-1];",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int grid[200][200];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> grid[i][j];\n  // min path sum\n  return 0;\n}",
  },
  {
    id: "max-area-island",
    title: "Max Area of Island",
    category: "matrix",
    difficulty: "medium",
    description: "Find maximum area of connected land (1s) in grid.",
    constraints: "1 <= n,m <= 50",
    examples: [
      {"input":"4 5\n11000\n11000\n00111\n00111","output":"6"}
    ],
    test_cases: [
      {"input":"4 5\n11000\n11000\n00111\n00111","expected":"6"}
    ],
    approach: "DFS/BFS from each unvisited land cell, count area.\n\nDiagram:\n```\nGrid:\n  1 1 0 0 0\n  1 1 0 0 0\n  0 0 1 1 1\n  0 0 1 1 1\n\nIslands:\n  Island 1 (top-left, size 4): (0,0),(0,1),(1,0),(1,1)\n  Island 2 (bottom-right, size 6): (2,2),(2,3),(2,4),(3,2),(3,3),(3,4)\n\nDFS from each unvisited 1:\n  Visit (0,0) → mark visited, DFS neighbors\n    (0,1) → mark, DFS → (1,1) → mark, DFS → (1,0) → mark\n    Area = 4\n  Visit (2,2) → mark, DFS → (2,3),(3,2)... → Area = 6\n\nMax area = 6\n```\n\nTime O(n*m), Space O(n*m).",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "LeetCode 695",
    techniques: ["matrix"],
    solution_code: "int maxArea = 0;\nfunction<int(int,int)> dfs = [&](int i, int j) {\n  if (i<0||i>=n||j<0||j>=m||!grid[i][j]) return 0;\n  grid[i][j] = 0;\n  return 1 + dfs(i+1,j)+dfs(i-1,j)+dfs(i,j+1)+dfs(i,j-1);\n};\nfor (int i=0; i<n; i++)\n  for (int j=0; j<m; j++)\n    if (grid[i][j]) maxArea = max(maxArea, dfs(i,j));\ncout << maxArea;",
    solution_template: "#include <iostream>\n#include <vector>\n#include <functional>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> grid(n, vector<int>(m));\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> grid[i][j];\n  // max area island\n  return 0;\n}",
  },
  {
    id: "flood-fill",
    title: "Flood Fill",
    category: "matrix",
    difficulty: "easy",
    description: "Replace connected cells of same color with new color (like paint bucket).",
    constraints: "1 <= n,m <= 50",
    examples: [
      {"input":"3 3\n1 1 1\n1 1 0\n1 0 1\n1 1 2","output":"2 2 2\n2 2 0\n2 0 1"}
    ],
    test_cases: [
      {"input":"3 3\n1 1 1\n1 1 0\n1 0 1\n1 1 2","expected":"2 2 2\n2 2 0\n2 0 1"}
    ],
    approach: "DFS/BFS from start cell, replacing matching color with new color.\n\nDiagram:\n```\nGrid:\n  1 1 1\n  1 1 0\n  1 0 1\n\nStart at (1,1) = 1, newColor=2\n\nReplace all 1s connected to (1,1):\n  (1,1)=1→2, DFS to (0,1),(1,0),(2,1)...\n  Actually connected 1s: (0,0),(0,1),(0,2),(1,0),(1,1),(2,0) all get replaced\n\nResult:\n  2 2 2\n  2 2 0\n  2 0 1\n\nThe 1 at (2,2) is not connected (separated by 0), so unchanged.\n```\n\nTime O(n*m), Space O(n*m) recursion worst case.",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "LeetCode 733",
    techniques: ["matrix"],
    solution_code: "int orig = image[sr][sc];\nif (orig == newColor) { /* output */ return 0; }\nfunction<void(int,int)> dfs = [&](int i, int j) {\n  if (i<0||i>=n||j<0||j>=m||image[i][j]!=orig) return;\n  image[i][j] = newColor;\n  dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);\n};\ndfs(sr, sc);",
    solution_template: "#include <iostream>\n#include <vector>\n#include <functional>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> image(n, vector<int>(m));\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> image[i][j];\n  int sr, sc, newColor; cin >> sr >> sc >> newColor;\n  // flood fill\n  return 0;\n}",
  },
  {
    id: "minesweeper",
    title: "Minesweeper Reveal",
    category: "matrix",
    difficulty: "medium",
    description: "Reveal cells in Minesweeper game board according to rules.",
    constraints: "1 <= n,m <= 50",
    examples: [
      {"input":"3 4\nEEEEE\nEMEEE\nEEEEE\n0 0","output":"B1EEE\n1MEEE\nEEE\n"}
    ],
    test_cases: [
      {"input":"3 4\nEEEEE\nEMEEE\nEEEEE\n0 0","expected":"B1EEE 1MEEE EEE"}
    ],
    approach: "DFS: if click on mine → game over. If click on empty with adjacent mines → show count. If click on empty with no adjacent mines → reveal recursively.\n\nDiagram:\n```\nBoard:   M = mine, E = unrevealed\n  E E E\n  E M E\n  E E E\n\nClick (0,0):\n  Adjacent mines at (1,1)=M → count=1\n  Show '1'\n  No further reveal needed\n\nClick (0,0) on different board:\n  E E\n  E E\n  (empty board, no adjacent mines)\n  Recurse to all 8 neighbors → all become 'B'\n\nRules:\n  1. Click on M → change to X, game over\n  2. Click on E with adjacent mines → show digit count\n  3. Click on E with no adjacent mines → show B and reveal all connected empties\n```\n\nTime O(n*m), Space O(n*m).",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "LeetCode 529",
    techniques: ["matrix"],
    solution_code: "function<void(int,int)> reveal = [&](int i, int j) {\n  if (i<0||i>=n||j<0||j>=m||board[i][j]!='E') return;\n  int mines = 0;\n  for (int di=-1; di<=1; di++)\n    for (int dj=-1; dj<=1; dj++) if (di||dj) {\n      int ni=i+di, nj=j+dj;\n      if (ni>=0&&ni<n&&nj>=0&&nj<m&&board[ni][nj]=='M') mines++;\n    }\n  if (mines) { board[i][j] = '0'+mines; }\n  else {\n    board[i][j] = 'B';\n    for (int di=-1; di<=1; di++)\n      for (int dj=-1; dj<=1; dj++) if (di||dj) reveal(i+di, j+dj);\n  }\n};",
    solution_template: "#include <iostream>\n#include <vector>\n#include <string>\n#include <functional>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<string> board(n);\n  for (int i=0; i<n; i++) cin >> board[i];\n  int r, c; cin >> r >> c;\n  // minesweeper\n  return 0;\n}",
  },
  {
    id: "knight-probability",
    title: "Knight Probability on Board",
    category: "matrix",
    difficulty: "medium",
    description: "Probability that knight stays on NxN board after k moves.",
    constraints: "1 <= N <= 25, 0 <= k <= 100",
    examples: [
      {"input":"3 2 0 0","output":"0.0625"}
    ],
    test_cases: [
      {"input":"3 2 0 0","expected":"0.0625"}
    ],
    approach: "DP: dp[k][i][j] = sum of dp[k-1][ni][nj] / 8 for valid knight moves.\n\nDiagram:\n```\nN=3, k=2, start at (0,0)\n\nKnight moves: (2,1),(1,2),(-1,2),(-2,1),(-2,-1),(-1,-2),(1,-2),(2,-1)\n\nk=0: dp[0][0][0]=1, rest=0\n\nk=1: From (0,0):\n  Valid moves that stay on 3x3:\n    (1,2) → (1,2) is within 0..2? Yes (1,2) ✓\n    (2,1) → (2,1) is in bounds ✓\n    (-1,2) → col=2 ✓ but row=-1 ✗\n    (-2,1) ✗, (-2,-1) ✗, (-1,-2) ✗, (1,-2) ✗, (2,-1) ✗\n  dp[1][1][2] += 1/8 = 0.125\n  dp[1][2][1] += 1/8 = 0.125\n\nk=2: From each position with probability:\n  From (1,2): 2 valid moves → each: (1,2)+0.125/8\n  From (2,1): 2 valid moves → each: (1,2)+0.125/8\n  Total on-board probability = sum of dp[2][i][j] = 0.0625\n```\n\nTime O(k * N^2 * 8) = O(k*N^2), Space O(N^2).",
    complexity: {"time":"O(k * N^2)","space":"O(N^2)"},
    sheet: "LeetCode 688",
    techniques: ["matrix"],
    solution_code: "vector<vector<double>> dp(N, vector<double>(N, 0));\ndp[r][c] = 1;\nvector<int> dr = {2,1,-1,-2,-2,-1,1,2};\nvector<int> dc = {1,2,2,1,-1,-2,-2,-1};\nfor (int step = 0; step < k; step++) {\n  vector<vector<double>> ndp(N, vector<double>(N, 0));\n  for (int i = 0; i < N; i++)\n    for (int j = 0; j < N; j++)\n      if (dp[i][j])\n        for (int m = 0; m < 8; m++) {\n          int ni = i+dr[m], nj = j+dc[m];\n          if (ni>=0&&ni<N&&nj>=0&&nj<N) ndp[ni][nj] += dp[i][j]/8.0;\n        }\n  dp = ndp;\n}\ndouble prob = 0;\nfor (int i=0;i<N;i++) for (int j=0;j<N;j++) prob += dp[i][j];\ncout << prob;",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int N, k, r, c; cin >> N >> k >> r >> c;\n  // knight probability\n  return 0;\n}",
  },
  {
    id: "richest-customer",
    title: "Richest Customer Wealth",
    category: "matrix",
    difficulty: "easy",
    description: "Find maximum sum of any row in a 2D array (customer wealth).",
    constraints: "1 <= n,m <= 50",
    examples: [
      {"input":"2 3\n1 2 3\n3 2 1","output":"6"}
    ],
    test_cases: [
      {"input":"2 3\n1 2 3\n3 2 1","expected":"6"}
    ],
    approach: "Compute row sums and track max.\n\nDiagram:\n```\nAccounts:\n  Customer 1: [1,2,3] → sum=6\n  Customer 2: [3,2,1] → sum=6\n\nMax wealth = 6\n\n  Customer 3: [1,5] → sum=6\n  Customer 4: [7,3] → sum=10\n  Customer 5: [3,5] → sum=8\n\n  Max wealth = 10\n```\n\nTime O(n*m), Space O(1).",
    complexity: {"time":"O(n*m)","space":"O(1)"},
    sheet: "LeetCode 1672",
    techniques: ["matrix"],
    solution_code: "int maxWealth = 0;\nfor (int i=0; i<n; i++) {\n  int sum = 0;\n  for (int j=0; j<m; j++) sum += accounts[i][j];\n  maxWealth = max(maxWealth, sum);\n}\ncout << maxWealth;",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> accounts(n, vector<int>(m));\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> accounts[i][j];\n  // richest customer\n  return 0;\n}",
  },
  {
    id: "most-visited-sector",
    title: "Most Visited Sector in Circular Track",
    category: "matrix",
    difficulty: "easy",
    description: "Find most visited sectors after circular marathon rounds.",
    constraints: "1 <= n <= 100, 1 <= rounds.length <= 100",
    examples: [
      {"input":"4\n3\n1 3 1 2","output":"1 2"}
    ],
    test_cases: [
      {"input":"4\n3\n1 3 1 2","expected":"1 2"}
    ],
    approach: "Simulate or use range logic: sectors from start to end of full rounds + partial.\n\nDiagram:\n```\nn=4 sectors, rounds=[1,3,1,2]\n\nSectors: 1-2-3-4 (circular, 4→1)\n\nStart at 1:\n  1→3: visit 1,2,3\n  3→1: visit 3,4,1\n  1→2: visit 1,2\n\nVisit counts:\n  1: 3 times\n  2: 2 times\n  3: 2 times\n  4: 1 time\n\nMost visited: 1\n\nSimpler: Only start and end of partial round matter.\nIn full cycles all sectors visited equally.\nResult = sectors from start_round[0] to end_round[last] (wrapping around n).\n```\n\nTime O(n), Space O(n).",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "LeetCode 1560",
    techniques: ["matrix"],
    solution_code: "int start = rounds[0], end = rounds.back();\nvector<int> result;\nif (start <= end)\n  for (int i = start; i <= end; i++) result.push_back(i);\nelse {\n  for (int i = 1; i <= end; i++) result.push_back(i);\n  for (int i = start; i <= n; i++) result.push_back(i);\n}",
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, k; cin >> n >> k;\n  vector<int> rounds(k);\n  for (int i=0; i<k; i++) cin >> rounds[i];\n  // most visited sector\n  return 0;\n}",
  },
  {
    id: "lucky-numbers",
    title: "Lucky Numbers in a Matrix",
    category: "matrix",
    difficulty: "easy",
    description: "Find all lucky numbers (min in row, max in column).",
    constraints: "1 <= n,m <= 50",
    examples: [
      {"input":"3 3\n3 7 8\n9 11 13\n15 16 17","output":"15"}
    ],
    test_cases: [
      {"input":"3 3\n3 7 8\n9 11 13\n15 16 17","expected":"15"}
    ],
    approach: "Find row minimums and column maximums; numbers that appear in both sets are lucky.\n\nDiagram:\n```\nMatrix:\n   3   7   8\n   9  11  13\n  15  16  17\n\nRow mins:\n  Row 0: min=3\n  Row 1: min=9\n  Row 2: min=15\n\nCol maxes:\n  Col 0: max=15\n  Col 1: max=16\n  Col 2: max=17\n\nIntersection: 15 is both a row min and a column max → Lucky number = 15 ✓\n\nAnother example:\n  1 10  4  2\n  9  3  8  7\n 15 16 17 12\n\nRow mins: 1, 3, 12\nCol maxes: 15, 16, 17, 12\nIntersection: 12 → Lucky = 12\n```\n\nTime O(n*m), Space O(n+m).",
    complexity: {"time":"O(n*m)","space":"O(n+m)"},
    sheet: "LeetCode 1380",
    techniques: ["matrix"],
    solution_code: "vector<int> rowMin(n, INT_MAX), colMax(m, 0);\nfor (int i=0; i<n; i++)\n  for (int j=0; j<m; j++) {\n    rowMin[i] = min(rowMin[i], mat[i][j]);\n    colMax[j] = max(colMax[j], mat[i][j]);\n  }\nfor (int i=0; i<n; i++)\n  for (int j=0; j<m; j++)\n    if (mat[i][j] == rowMin[i] && mat[i][j] == colMax[j])\n      cout << mat[i][j] << \" \";",
    solution_template: "#include <iostream>\n#include <vector>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[50][50];\n  for (int i=0; i<n; i++) for (int j=0; j<m; j++) cin >> mat[i][j];\n  // lucky numbers\n  return 0;\n}",
  },
]
