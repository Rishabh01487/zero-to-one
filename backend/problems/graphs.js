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
  },
  {
    id: "topo-sort",
    title: "Topological Sort (Kahn)",
    category: "graphs",
    difficulty: "medium",
    description: "Return topological ordering of DAG.",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"6 6\n5 0\n5 2\n4 0\n4 1\n2 3\n3 1","output":"4 5 0 2 3 1"}
    ],
    test_cases: [
      {"input":"6 6\n5 0\n5 2\n4 0\n4 1\n2 3\n3 1","expected":"4 5 0 2 3 1"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> g(n);\n  vector<int> indeg(n, 0);\n  for (int i = 0; i < m; i++) {\n    int u, v; cin >> u >> v;\n    g[u].push_back(v);\n    indeg[v]++;\n  }\n\n  // Kahn's algorithm: queue nodes with indegree 0\n\n  return 0;\n}",
    approach: "Kahn's algorithm (BFS): queue nodes with indegree 0. Dequeue, reduce neighbor indegrees, add new 0s.",
    complexity: {"time":"O(V+E)","space":"O(V)"},
    sheet: "Striver A2Z",
    solution_code: "queue<int> q; for(int i=0;i<n;i++)if(!indeg[i])q.push(i); while(!q.empty()){int u=q.front();q.pop();cout<<u<<\" \";for(int v:g[u])if(--indeg[v]==0)q.push(v);}",
  },
  {
    id: "shortest-path-unweighted",
    title: "Shortest Path (BFS) in Unweighted Graph",
    category: "graphs",
    difficulty: "medium",
    description: "Find shortest path distances from source to all nodes.",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"5 6 0\n0 1\n0 2\n1 3\n1 4\n2 4\n3 4","output":"0 0\n1 1\n2 1\n3 2\n4 2"}
    ],
    test_cases: [
      {"input":"5 6 0\n0 1\n0 2\n1 3\n1 4\n2 4\n3 4","expected":"0 0\n1 1\n2 1\n3 2\n4 2"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint main() {\n  int n, m, s; cin >> n >> m >> s;\n  vector<vector<int>> g(n);\n  for (int i = 0; i < m; i++) { int u, v; cin >> u >> v; g[u].push_back(v); g[v].push_back(u); }\n\n  vector<int> dist(n, -1);\n  queue<int> q; q.push(s); dist[s] = 0;\n\n  while (!q.empty()) {\n    int u = q.front(); q.pop();\n    for (int v : g[u]) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }\n  }\n\n  for (int i = 0; i < n; i++) cout << i << \" \" << dist[i] << endl;\n  return 0;\n}",
    approach: "BFS from source: distance to each node = distance[parent] + 1 (unweighted edges).",
    complexity: {"time":"O(V+E)","space":"O(V)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> dist(n,-1); queue<int> q; q.push(s); dist[s]=0; while(!q.empty()){int u=q.front();q.pop();for(int v:g[u])if(dist[v]==-1){dist[v]=dist[u]+1;q.push(v);}} for(int i=0;i<n;i++)cout<<i<<\" \"<<dist[i]<<endl;",
  },
  {
    id: "dijkstra",
    title: "Dijkstra's Shortest Path",
    category: "graphs",
    difficulty: "hard",
    description: "Find shortest path distances from source in weighted graph.",
    constraints: "1 <= n,m <= 10^5, edge weight >= 0",
    examples: [
      {"input":"5 6 0\n0 1 4\n0 2 2\n1 2 1\n1 3 5\n2 3 8\n2 4 10","output":"0 0\n1 3\n2 2\n3 8\n4 12"}
    ],
    test_cases: [
      {"input":"5 6 0\n0 1 4\n0 2 2\n1 2 1\n1 3 5\n2 3 8\n2 4 10","expected":"0 0\n1 3\n2 2\n3 8\n4 12"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <queue>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, m, s; cin >> n >> m >> s;\n  vector<vector<pair<int,int>>> g(n);\n  for (int i = 0; i < m; i++) { int u, v, w; cin >> u >> v >> w; g[u].push_back({v,w}); g[v].push_back({u,w}); }\n\n  vector<int> dist(n, INT_MAX);\n  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\n  dist[s] = 0; pq.push({0, s});\n\n  while (!pq.empty()) {\n    auto [d, u] = pq.top(); pq.pop();\n    if (d > dist[u]) continue;\n    for (auto [v, w] : g[u]) if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.push({dist[v], v}); }\n  }\n\n  for (int i = 0; i < n; i++) cout << i << \" \" << dist[i] << endl;\n  return 0;\n}",
    approach: "Priority queue (min-heap). Relax edges from the closest unvisited node.",
    complexity: {"time":"O((V+E) log V)","space":"O(V)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> dist(n,INT_MAX); priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq; dist[s]=0; pq.push({0,s}); while(!pq.empty()){auto[d,u]=pq.top();pq.pop();if(d>dist[u])continue;for(auto[v,w]:g[u])if(dist[u]+w<dist[v]){dist[v]=dist[u]+w;pq.push({dist[v],v});}}",
  },
  {
    id: "mst-prim",
    title: "Minimum Spanning Tree (Prim's)",
    category: "graphs",
    difficulty: "medium",
    description: "Find total weight of MST using Prim algorithm.",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"5 7\n0 1 2\n0 3 6\n1 2 3\n1 3 8\n1 4 5\n2 4 7\n3 4 9","output":"16"}
    ],
    test_cases: [
      {"input":"5 7\n0 1 2\n0 3 6\n1 2 3\n1 3 8\n1 4 5\n2 4 7\n3 4 9","expected":"16"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <queue>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<pair<int,int>>> g(n);\n  for (int i = 0; i < m; i++) { int u, v, w; cin >> u >> v >> w; g[u].push_back({v,w}); g[v].push_back({u,w}); }\n\n  vector<bool> vis(n, false);\n  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\n  pq.push({0, 0});\n  int mstWeight = 0;\n\n  while (!pq.empty()) {\n    auto [w, u] = pq.top(); pq.pop();\n    if (vis[u]) continue;\n    vis[u] = true;\n    mstWeight += w;\n    for (auto [v, w2] : g[u]) if (!vis[v]) pq.push({w2, v});\n  }\n\n  cout << mstWeight << endl;\n  return 0;\n}",
    approach: "Prim's: priority queue of edges from visited set. Add min-weight edge to unvisited vertex.",
    complexity: {"time":"O((V+E) log V)","space":"O(V)"},
    sheet: "Striver A2Z",
    solution_code: "vector<bool> vis(n); priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq; pq.push({0,0}); int mst=0; while(!pq.empty()){auto[w,u]=pq.top();pq.pop();if(vis[u])continue;vis[u]=1;mst+=w;for(auto[v,w2]:g[u])if(!vis[v])pq.push({w2,v});}cout<<mst;",
  },
  {
    id: "bipartite",
    title: "Check Bipartite Graph",
    category: "graphs",
    difficulty: "medium",
    description: "Check if graph is bipartite (2-colorable).",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"4 4\n0 1\n1 2\n2 3\n3 0","output":"No","explanation":"Odd cycle = not bipartite"}
    ],
    test_cases: [
      {"input":"4 4\n0 1\n1 2\n2 3\n3 0","expected":"No"},
      {"input":"4 4\n0 1\n1 2\n2 3\n3 1","expected":"Yes"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<int>> g(n);\n  for (int i = 0; i < m; i++) { int u, v; cin >> u >> v; g[u].push_back(v); g[v].push_back(u); }\n\n  vector<int> color(n, -1);\n  bool bipartite = true;\n\n  for (int i = 0; i < n && bipartite; i++) {\n    if (color[i] != -1) continue;\n    queue<int> q; q.push(i); color[i] = 0;\n    while (!q.empty() && bipartite) {\n      int u = q.front(); q.pop();\n      for (int v : g[u]) {\n        if (color[v] == color[u]) { bipartite = false; break; }\n        if (color[v] == -1) { color[v] = 1 - color[u]; q.push(v); }\n      }\n    }\n  }\n\n  cout << (bipartite ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "BFS with 2-coloring: assign alternating colors. If neighbor has same color, not bipartite.",
    complexity: {"time":"O(V+E)","space":"O(V)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> col(n,-1); queue<int> q; for(int i=0;i<n;i++)if(col[i]==-1){q.push(i);col[i]=0;while(!q.empty()){int u=q.front();q.pop();for(int v:g[u]){if(col[v]==col[u]){cout<<\"No\";return 0;}if(col[v]==-1){col[v]=1-col[u];q.push(v);}}}}cout<<\"Yes\";",
  },
  {
    id: "floyd-warshall",
    title: "Floyd-Warshall (All Pairs)",
    category: "graphs",
    difficulty: "hard",
    description: "Find shortest distances between all pairs of vertices.",
    constraints: "1 <= n <= 500",
    examples: [
      {"input":"4 7\n0 1 5\n0 3 10\n1 2 3\n1 3 2\n2 3 1\n3 0 7\n3 2 6","output":"0 5 8 7\n7 0 3 2\n8 5 0 1\n7 12 6 0"}
    ],
    test_cases: [
      {"input":"4 7\n0 1 5\n0 3 10\n1 2 3\n1 3 2\n2 3 1\n3 0 7\n3 2 6","expected":"0 5 8 7\n7 0 3 2\n8 5 0 1\n7 12 6 0"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int INF = 1e9;\n  int dist[n][n];\n  for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) dist[i][j] = (i == j) ? 0 : INF;\n  for (int i = 0; i < m; i++) { int u, v, w; cin >> u >> v >> w; dist[u][v] = w; }\n\n  for (int k = 0; k < n; k++)\n    for (int i = 0; i < n; i++)\n      for (int j = 0; j < n; j++)\n        if (dist[i][k] < INF && dist[k][j] < INF)\n          dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);\n\n  for (int i = 0; i < n; i++) { for (int j = 0; j < n; j++) cout << dist[i][j] << \" \"; cout << endl; }\n  return 0;\n}",
    approach: "DP: dist[i][j]=min(dist[i][j],dist[i][k]+dist[k][j]) for all k.",
    complexity: {"time":"O(V³)","space":"O(V²)"},
    sheet: "Striver A2Z",
    solution_code: "for(int k=0;k<n;k++)for(int i=0;i<n;i++)for(int j=0;j<n;j++)if(dist[i][k]<INF&&dist[k][j]<INF)dist[i][j]=min(dist[i][j],dist[i][k]+dist[k][j]);",
  },
  {
    id: "islands",
    title: "Number of Islands",
    category: "graphs",
    difficulty: "medium",
    description: "Count number of islands in a binary grid.",
    constraints: "1 <= n,m <= 200",
    examples: [
      {"input":"4 5\n11000\n11000\n00100\n00011","output":"3"}
    ],
    test_cases: [
      {"input":"4 5\n11000\n11000\n00100\n00011","expected":"3"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid dfs(vector<vector<char>>& grid, int r, int c) {\n  int n = grid.size(), m = grid[0].size();\n  if (r < 0 || r >= n || c < 0 || c >= m || grid[r][c] == '0') return;\n  grid[r][c] = '0';\n  dfs(grid, r+1, c); dfs(grid, r-1, c);\n  dfs(grid, r, c+1); dfs(grid, r, c-1);\n}\n\nint main() {\n  int n, m; cin >> n >> m;\n  vector<vector<char>> grid(n, vector<char>(m));\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < m; j++)\n      cin >> grid[i][j];\n\n  int count = 0;\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < m; j++)\n      if (grid[i][j] == '1') { dfs(grid, i, j); count++; }\n\n  cout << count << endl;\n  return 0;\n}",
    approach: "DFS: for each unvisited '1', increment count and sink the entire island via DFS.",
    complexity: {"time":"O(n*m)","space":"O(n*m)"},
    sheet: "Striver A2Z",
    solution_code: "function<void(int,int)> dfs=[&](int r,int c){if(r<0||r>=n||c<0||c>=m||grid[r][c]!='1')return;grid[r][c]='0';dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1);}; int cnt=0; for(int i=0;i<n;i++)for(int j=0;j<m;j++)if(grid[i][j]=='1'){cnt++;dfs(i,j);}cout<<cnt;",
  },
  {
    id: "bellman-ford",
    title: "Bellman-Ford Algorithm",
    category: "graphs",
    difficulty: "hard",
    description: "Find shortest paths from source (handles negative edges).",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"4 5 0\n0 1 4\n1 2 -3\n0 2 5\n2 3 2\n1 3 6","output":"0 4 1 3"}
    ],
    test_cases: [
      {"input":"4 5 0\n0 1 4\n1 2 -3\n0 2 5\n2 3 2\n1 3 6","expected":"0 4 1 3"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, m, s; cin >> n >> m >> s;\n  struct Edge { int u, v, w; };\n  vector<Edge> edges(m);\n  for (int i = 0; i < m; i++) cin >> edges[i].u >> edges[i].v >> edges[i].w;\n\n  vector<int> dist(n, INT_MAX);\n  dist[s] = 0;\n\n  for (int i = 0; i < n-1; i++)\n    for (auto& e : edges)\n      if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v])\n        dist[e.v] = dist[e.u] + e.w;\n\n  for (int i = 0; i < n; i++) cout << dist[i] << \" \";\n  return 0;\n}",
    approach: "Relax all edges n-1 times. Then check for negative cycles.",
    complexity: {"time":"O(V*E)","space":"O(V)"},
    sheet: "Striver A2Z",
    solution_code: "vector<int> dist(n,INT_MAX); dist[s]=0; for(int i=0;i<n-1;i++)for(auto& e:edges)if(dist[e.u]!=INT_MAX&&dist[e.u]+e.w<dist[e.v])dist[e.v]=dist[e.u]+e.w;",
  }
]
