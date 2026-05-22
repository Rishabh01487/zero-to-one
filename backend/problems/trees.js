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
  }
]
