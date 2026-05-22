export default [
  {
    id: "rev-linked-list",
    title: "Reverse a Linked List",
    category: "linked-list",
    difficulty: "easy",
    description: "Reverse a singly linked list in-place.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n1 2 3 4 5","output":"5 4 3 2 1"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5","expected":"5 4 3 2 1"},
      {"input":"2\n1 2","expected":"2 1"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nNode* reverse(Node* head) {\n  // three-pointer reversal\n}\n\nvoid print(Node* head) {\n  while (head) { cout << head->data << \" \"; head = head->next; }\n}\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) {\n    cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  head = reverse(head);\n  print(head);\n  return 0;\n}",
    approach: "Three-pointer reversal: prev, curr, next. Reverse each link until curr is null.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *prev=nullptr,*curr=head; while(curr){Node* nxt=curr->next; curr->next=prev; prev=curr; curr=nxt;} return prev;",
  },
  {
    id: "mid-linked-list",
    title: "Middle of Linked List",
    category: "linked-list",
    difficulty: "easy",
    description: "Return the middle node of linked list. If even, return second middle.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n1 2 3 4 5","output":"3"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5","expected":"3"},
      {"input":"6\n1 2 3 4 5 6","expected":"4"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) {\n    cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // slow/fast pointer\n\n  cout << slow->data << endl;\n  return 0;\n}",
    approach: "Slow/fast pointer: slow moves 1, fast moves 2. When fast reaches end, slow is at middle.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *slow=head,*fast=head; while(fast&&fast->next){slow=slow->next;fast=fast->next->next;} cout<<slow->data;",
  },
  {
    id: "detect-cycle",
    title: "Detect Cycle in Linked List",
    category: "linked-list",
    difficulty: "medium",
    description: "Check if linked list has a cycle (Floyd cycle detection).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n1 2 3 4\n2","output":"Yes","explanation":"Last node connects to node at position 2 (1-indexed)"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 4\n-1","expected":"No"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nbool hasCycle(Node* head) {\n  // Floyd's algorithm\n}\n\nint main() {\n  int n, pos;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr, *cycleNode = nullptr;\n  for (int i = 0; i < n; i++) {\n    int x; cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> pos;\n  // create cycle if pos != -1\n  if (pos >= 0) {\n    Node* t = head;\n    for (int i = 0; i < pos; i++) t = t->next;\n    tail->next = t;\n  }\n  cout << (hasCycle(head) ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "Floyd cycle detection: slow and fast pointers. If they meet, cycle exists.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *slow=head,*fast=head; while(fast&&fast->next){slow=slow->next;fast=fast->next->next;if(slow==fast)return true;} return false;",
  },
  {
    id: "merge-sorted-lists",
    title: "Merge Two Sorted Linked Lists",
    category: "linked-list",
    difficulty: "medium",
    description: "Merge two sorted linked lists into one sorted list.",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"3\n1 2 4\n3\n1 3 4","output":"1 1 2 3 4 4"}
    ],
    test_cases: [
      {"input":"3\n1 2 4\n3\n1 3 4","expected":"1 1 2 3 4 4"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nNode* merge(Node* a, Node* b) {\n  // dummy node + two pointers\n}\n\nint main() {\n  int n, m, x;\n  cin >> n; Node *a = nullptr, *at = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!a) a = at = nn; else { at->next = nn; at = nn; }\n  }\n  cin >> m; Node *b = nullptr, *bt = nullptr;\n  for (int i = 0; i < m; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!b) b = bt = nn; else { bt->next = nn; bt = nn; }\n  }\n  Node* res = merge(a, b);\n  while (res) { cout << res->data << \" \"; res = res->next; }\n  return 0;\n}",
    approach: "Dummy node + two-pointer merge. Compare nodes, attach smaller one.",
    complexity: {"time":"O(n+m)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node dummy(0); Node* t=&dummy; while(a&&b){if(a->data<b->data){t->next=a;a=a->next;}else{t->next=b;b=b->next;}t=t->next;} t->next=a?a:b; return dummy.next;",
  }
]
