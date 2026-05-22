export default [
  {
    id: "tree-traversal",
    title: "Binary Tree Inorder Traversal",
    category: "trees",
    difficulty: "easy",
    description: "Perform inorder traversal of a binary tree (iterative).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n1 2 3 4 5 6 7","output":"4 2 5 1 6 3 7","explanation":"Tree: 1 left=2 right=3, 2 left=4 right=5, 3 left=6 right=7"}
    ],
    test_cases: [
      {"input":"7\n1 2 3 4 5 6 7","expected":"4 2 5 1 6 3 7"},
      {"input":"3\n1 -1 2","expected":"1 2"}
    ],
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nstruct TreeNode {\n  int val;\n  TreeNode *left, *right;\n  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nint main() {\n  int n;\n  cin >> n;\n  if (n == 0) return 0;\n  int vals[n];\n  for (int i = 0; i < n; i++) cin >> vals[i];\n  TreeNode* nodes[n];\n  for (int i = 0; i < n; i++) nodes[i] = new TreeNode(vals[i]);\n  for (int i = 0; i < n; i++) {\n    if (2*i+1 < n && vals[2*i+1] != -1) nodes[i]->left = nodes[2*i+1];\n    if (2*i+2 < n && vals[2*i+2] != -1) nodes[i]->right = nodes[2*i+2];\n  }\n\n  // iterative inorder: stack\n\n  return 0;\n}",
    approach: "Iterative inorder: use stack. Go left until null, pop, visit, go right.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<TreeNode*> st; TreeNode* cur=root; while(cur||!st.empty()){while(cur){st.push(cur);cur=cur->left;}cur=st.top();st.pop();cout<<cur->val<<\" \";cur=cur->right;}",
  },
  {
    id: "max-depth",
    title: "Maximum Depth of Binary Tree",
    category: "trees",
    difficulty: "easy",
    description: "Find the maximum depth (height) of a binary tree.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n1 2 3 4 5 6 7","output":"3"}
    ],
    test_cases: [
      {"input":"7\n1 2 3 4 5 6 7","expected":"3"},
      {"input":"1\n1","expected":"1"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n  int val;\n  TreeNode *left, *right;\n  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nint maxDepth(TreeNode* root) {\n  // recursive: 1 + max(left, right)\n}\n\nint main() {\n  int n; cin >> n;\n  if (n == 0) { cout << 0; return 0; }\n  int vals[n];\n  for (int i = 0; i < n; i++) cin >> vals[i];\n  TreeNode* nodes[n];\n  for (int i = 0; i < n; i++) nodes[i] = new TreeNode(vals[i]);\n  for (int i = 0; i < n; i++) {\n    if (2*i+1 < n && vals[2*i+1] != -1) nodes[i]->left = nodes[2*i+1];\n    if (2*i+2 < n && vals[2*i+2] != -1) nodes[i]->right = nodes[2*i+2];\n  }\n  cout << maxDepth(nodes[0]) << endl;\n  return 0;\n}",
    approach: "Recursive: height = 1 + max(height of left, height of right).",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "function<int(TreeNode*)> h=[&](TreeNode* r){return r?1+max(h(r->left),h(r->right)):0;}; cout<<h(root);",
  },
  {
    id: "level-order",
    title: "Level Order Traversal",
    category: "trees",
    difficulty: "medium",
    description: "Return level-order (BFS) traversal of a binary tree.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n1 2 3 4 5 6 7","output":"1 2 3 4 5 6 7"}
    ],
    test_cases: [
      {"input":"7\n1 2 3 4 5 6 7","expected":"1 2 3 4 5 6 7"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n  int val;\n  TreeNode *left, *right;\n  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nint main() {\n  int n; cin >> n;\n  if (n == 0) return 0;\n  int vals[n];\n  for (int i = 0; i < n; i++) cin >> vals[i];\n  TreeNode* nodes[n];\n  for (int i = 0; i < n; i++) nodes[i] = new TreeNode(vals[i]);\n  for (int i = 0; i < n; i++) {\n    if (2*i+1 < n && vals[2*i+1] != -1) nodes[i]->left = nodes[2*i+1];\n    if (2*i+2 < n && vals[2*i+2] != -1) nodes[i]->right = nodes[2*i+2];\n  }\n\n  // queue-based BFS\n\n  return 0;\n}",
    approach: "BFS using queue: process each level left to right.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "queue<TreeNode*> q; q.push(root); while(!q.empty()){auto* f=q.front();q.pop();cout<<f->val<<\" \";if(f->left)q.push(f->left);if(f->right)q.push(f->right);}",
  },
  {
    id: "diameter-tree",
    title: "Diameter of Binary Tree",
    category: "trees",
    difficulty: "medium",
    description: "Find the diameter (longest path between any two nodes).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n1 2 3 4 5 6 7","output":"4","explanation":"Longest path: 4-2-1-3-7 (4 edges)"}
    ],
    test_cases: [
      {"input":"7\n1 2 3 4 5 6 7","expected":"4"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n  int val;\n  TreeNode *left, *right;\n  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nint diameter = 0;\nint height(TreeNode* root) {\n  if (!root) return 0;\n  int lh = height(root->left);\n  int rh = height(root->right);\n  diameter = max(diameter, lh + rh);\n  return 1 + max(lh, rh);\n}\n\nint main() {\n  int n; cin >> n;\n  if (n == 0) { cout << 0; return 0; }\n  int vals[n];\n  for (int i = 0; i < n; i++) cin >> vals[i];\n  TreeNode* nodes[n];\n  for (int i = 0; i < n; i++) nodes[i] = new TreeNode(vals[i]);\n  for (int i = 0; i < n; i++) {\n    if (2*i+1 < n && vals[2*i+1] != -1) nodes[i]->left = nodes[2*i+1];\n    if (2*i+2 < n && vals[2*i+2] != -1) nodes[i]->right = nodes[2*i+2];\n  }\n  height(nodes[0]);\n  cout << diameter << endl;\n  return 0;\n}",
    approach: "DFS: compute left and right heights, track max(lh+rh) as diameter.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "int dia=0; function<int(TreeNode*)> h=[&](TreeNode* r){if(!r)return 0;int l=h(r->left),rh=h(r->right);dia=max(dia,l+rh);return 1+max(l,rh);}; h(root); cout<<dia;",
  },
  {
    id: "balanced-tree",
    title: "Check Balanced Binary Tree",
    category: "trees",
    difficulty: "medium",
    description: "Check if tree is height-balanced (difference <= 1 at every node).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n1 2 3 4 5 6 7","output":"Yes"}
    ],
    test_cases: [
      {"input":"7\n1 2 3 4 5 6 7","expected":"Yes"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n  int val;\n  TreeNode *left, *right;\n  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nint check(TreeNode* root) {\n  if (!root) return 0;\n  int l = check(root->left);\n  if (l == -1) return -1;\n  int r = check(root->right);\n  if (r == -1) return -1;\n  if (abs(l - r) > 1) return -1;\n  return 1 + max(l, r);\n}\n\nint main() {\n  int n; cin >> n;\n  if (n == 0) { cout << \"Yes\"; return 0; }\n  int vals[n];\n  for (int i = 0; i < n; i++) cin >> vals[i];\n  TreeNode* nodes[n];\n  for (int i = 0; i < n; i++) nodes[i] = new TreeNode(vals[i]);\n  for (int i = 0; i < n; i++) {\n    if (2*i+1 < n && vals[2*i+1] != -1) nodes[i]->left = nodes[2*i+1];\n    if (2*i+2 < n && vals[2*i+2] != -1) nodes[i]->right = nodes[2*i+2];\n  }\n  cout << (check(nodes[0]) != -1 ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "DFS: compute height. If left/right differ by >1 at any node, tree is unbalanced. Return -1 as sentinel.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "function<int(TreeNode*)> ch=[&](TreeNode* r){if(!r)return 0;int l=ch(r->left);if(l==-1)return -1;int rh=ch(r->right);if(rh==-1)return -1;if(abs(l-rh)>1)return -1;return 1+max(l,rh);}; cout<<(ch(root)!=-1?\"Yes\":\"No\");",
  },
  {
    id: "lca-tree",
    title: "Lowest Common Ancestor of Binary Tree",
    category: "trees",
    difficulty: "medium",
    description: "Find LCA of two nodes in a binary tree.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n1 2 3 4 5 6 7\n4 5","output":"2","explanation":"LCA of 4 and 5 is 2"}
    ],
    test_cases: [
      {"input":"7\n1 2 3 4 5 6 7\n4 5","expected":"2"},
      {"input":"7\n1 2 3 4 5 6 7\n4 6","expected":"1"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct TreeNode {\n  int val;\n  TreeNode *left, *right;\n  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* lca(TreeNode* root, int p, int q) {\n  if (!root || root->val == p || root->val == q) return root;\n  auto* l = lca(root->left, p, q);\n  auto* r = lca(root->right, p, q);\n  if (l && r) return root;\n  return l ? l : r;\n}\n\nint main() {\n  int n, p, q; cin >> n;\n  int vals[n];\n  for (int i = 0; i < n; i++) cin >> vals[i];\n  TreeNode* nodes[n];\n  for (int i = 0; i < n; i++) nodes[i] = new TreeNode(vals[i]);\n  for (int i = 0; i < n; i++) {\n    if (2*i+1 < n && vals[2*i+1] != -1) nodes[i]->left = nodes[2*i+1];\n    if (2*i+2 < n && vals[2*i+2] != -1) nodes[i]->right = nodes[2*i+2];\n  }\n  cin >> p >> q;\n  TreeNode* ans = lca(nodes[0], p, q);\n  cout << (ans ? ans->val : -1) << endl;\n  return 0;\n}",
    approach: "Recursive: if root matches p or q, return root. Get LCA from left and right. If both non-null, root is LCA.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "function<TreeNode*(TreeNode*)> l=[&](TreeNode* r){if(!r||r->val==p||r->val==q)return r;auto* lf=l(r->left),*ri=l(r->right);if(lf&&ri)return r;return lf?lf:ri;}; auto* a=l(root);cout<<(a?a->val:-1);",
  },
  {
    id: "right-view",
    title: "Right Side View of Binary Tree",
    category: "trees",
    difficulty: "medium",
    description: "Return the right-side view of binary tree.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n1 2 3 4 5 6 7","output":"1 3 7"}
    ],
    test_cases: [
      {"input":"7\n1 2 3 4 5 6 7","expected":"1 3 7"}
    ],
    solution_template: "#include <iostream>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n  int val;\n  TreeNode *left, *right;\n  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nint main() {\n  int n; cin >> n;\n  int vals[n];\n  for (int i = 0; i < n; i++) cin >> vals[i];\n  TreeNode* nodes[n];\n  for (int i = 0; i < n; i++) nodes[i] = new TreeNode(vals[i]);\n  for (int i = 0; i < n; i++) {\n    if (2*i+1 < n && vals[2*i+1] != -1) nodes[i]->left = nodes[2*i+1];\n    if (2*i+2 < n && vals[2*i+2] != -1) nodes[i]->right = nodes[2*i+2];\n  }\n\n  // BFS, collect last node at each level\n\n  return 0;\n}",
    approach: "BFS level order, print the last node at each level.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "queue<TreeNode*> q; q.push(root); while(!q.empty()){int sz=q.size();for(int i=0;i<sz;i++){auto* f=q.front();q.pop();if(i==sz-1)cout<<f->val<<\" \";if(f->left)q.push(f->left);if(f->right)q.push(f->right);}}",
  }
]
