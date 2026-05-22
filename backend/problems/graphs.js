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
  }
]
