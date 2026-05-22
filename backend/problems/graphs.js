export default [
  {
    id: "graph-bfs",
    title: "BFS of a Graph",
    category: "graphs",
    difficulty: "easy",
    description: "Perform BFS traversal of a graph starting from node 0.",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"5 6\n0 1\n0 2\n1 3\n1 4\n2 4\n3 4","output":"0 1 2 3 4"}
    ],
    test_cases: [
      {"input":"5 6\n0 1\n0 2\n1 3\n1 4\n2 4\n3 4","expected":"0 1 2 3 4"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> g(n);\n  for (int i = 0; i < m; i++) {\n    int u, v; cin >> u >> v;\n    g[u].push_back(v);\n    g[v].push_back(u);\n  }\n\n  // BFS using queue\n\n  return 0;\n}",
    approach: "Queue-based level-order traversal. Mark visited, enqueue neighbors.",
    complexity: {"time":"O(V+E)","space":"O(V)"},
    sheet: "Striver A2Z",
    solution_code: "queue<int> q; vector<bool> vis(n); q.push(0); vis[0]=1; while(!q.empty()){int u=q.front();q.pop();cout<<u<<\" \";for(int v:g[u])if(!vis[v]){vis[v]=1;q.push(v);}}",
  },
  {
    id: "graph-dfs",
    title: "DFS of a Graph",
    category: "graphs",
    difficulty: "easy",
    description: "Perform DFS traversal of a graph starting from node 0.",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"5 6\n0 1\n0 2\n1 3\n1 4\n2 4\n3 4","output":"0 1 3 4 2"}
    ],
    test_cases: [
      {"input":"5 6\n0 1\n0 2\n1 3\n1 4\n2 4\n3 4","expected":"0 1 3 4 2"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> g(n);\n  for (int i = 0; i < m; i++) {\n    int u, v; cin >> u >> v;\n    g[u].push_back(v); g[v].push_back(u);\n  }\n\n  // DFS using stack or recursion\n\n  return 0;\n}",
    approach: "Stack-based or recursive depth-first traversal.",
    complexity: {"time":"O(V+E)","space":"O(V)"},
    sheet: "Striver A2Z",
    solution_code: "vector<bool> vis(n); function<void(int)> dfs=[&](int u){vis[u]=1;cout<<u<<\" \";for(int v:g[u])if(!vis[v])dfs(v);}; dfs(0);",
  },
  {
    id: "cycle-undirected",
    title: "Detect Cycle in Undirected Graph",
    category: "graphs",
    difficulty: "medium",
    description: "Check if undirected graph contains a cycle.",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"5 6\n0 1\n0 2\n1 3\n1 4\n2 4\n3 4","output":"Yes"}
    ],
    test_cases: [
      {"input":"5 6\n0 1\n0 2\n1 3\n1 4\n2 4\n3 4","expected":"Yes"},
      {"input":"3 2\n0 1\n1 2","expected":"No"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool dfs(vector<vector<int>>& g, vector<bool>& vis, int u, int parent) {\n  vis[u] = true;\n  for (int v : g[u]) {\n    if (!vis[v]) { if (dfs(g, vis, v, u)) return true; }\n    else if (v != parent) return true;\n  }\n  return false;\n}\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> g(n);\n  for (int i = 0; i < m; i++) { int u, v; cin >> u >> v; g[u].push_back(v); g[v].push_back(u); }\n  vector<bool> vis(n, false);\n  bool cycle = false;\n  for (int i = 0; i < n; i++) if (!vis[i] && dfs(g, vis, i, -1)) { cycle = true; break; }\n  cout << (cycle ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "DFS with parent tracking. If a neighbor is visited and is not parent, cycle exists.",
    complexity: {"time":"O(V+E)","space":"O(V)"},
    sheet: "Striver A2Z",
    solution_code: "vector<bool> vis(n); function<bool(int,int)> dfs=[&](int u,int p){vis[u]=1;for(int v:g[u]){if(!vis[v]){if(dfs(v,u))return 1;}else if(v!=p)return 1;}return 0;}; bool cycle=0; for(int i=0;i<n;i++)if(!vis[i]&&dfs(i,-1))cycle=1; cout<<(cycle?\"Yes\":\"No\");",
  },
  {
    id: "cycle-directed",
    title: "Detect Cycle in Directed Graph",
    category: "graphs",
    difficulty: "medium",
    description: "Check if directed graph contains a cycle.",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"4 4\n0 1\n1 2\n2 3\n3 1","output":"Yes"}
    ],
    test_cases: [
      {"input":"4 4\n0 1\n1 2\n2 3\n3 1","expected":"Yes"},
      {"input":"4 3\n0 1\n1 2\n2 3","expected":"No"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool dfs(vector<vector<int>>& g, vector<int>& state, int u) {\n  state[u] = 1;\n  for (int v : g[u]) {\n    if (state[v] == 1) return true;\n    if (state[v] == 0 && dfs(g, state, v)) return true;\n  }\n  state[u] = 2;\n  return false;\n}\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> g(n);\n  for (int i = 0; i < m; i++) { int u, v; cin >> u >> v; g[u].push_back(v); }\n  vector<int> state(n, 0);\n  bool cycle = false;\n  for (int i = 0; i < n; i++) if (state[i] == 0 && dfs(g, state, i)) { cycle = true; break; }\n  cout << (cycle ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "DFS with three-state tracking: 0=unvisited, 1=in current path, 2=done. If neighbor in current path, cycle.",
    complexity: {"time":"O(V+E)","space":"O(V)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> state(n); function<bool(int)> dfs=[&](int u){state[u]=1;for(int v:g[u]){if(state[v]==1)return 1;if(state[v]==0&&dfs(v))return 1;}state[u]=2;return 0;}; bool cycle=0; for(int i=0;i<n;i++)if(!state[i]&&dfs(i))cycle=1; cout<<(cycle?\"Yes\":\"No\");",
  }
]
