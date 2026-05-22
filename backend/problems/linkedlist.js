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
  },
  {
    id: "remove-nth-end",
    title: "Remove Nth Node From End",
    category: "linked-list",
    difficulty: "medium",
    description: "Remove the nth node from the end of the linked list.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"5\n1 2 3 4 5\n2","output":"1 2 3 5","explanation":"Remove 2nd from end (4)"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5\n2","expected":"1 2 3 5"},
      {"input":"1\n1\n1","expected":""}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, k, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) {\n    cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> k;\n\n  // fast pointer goes k steps ahead\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: "Fast pointer goes n steps ahead. Then advance both until fast hits end. Slow->next is the node to remove.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *fast=head,*slow=head; for(int i=0;i<k;i++)fast=fast->next; if(!fast)return head->next; while(fast->next){slow=slow->next;fast=fast->next;} slow->next=slow->next->next;",
  },
  {
    id: "palindrome-list",
    title: "Palindrome Linked List",
    category: "linked-list",
    difficulty: "medium",
    description: "Check if linked list is a palindrome.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n1 2 2 1","output":"Yes"}
    ],
    test_cases: [
      {"input":"4\n1 2 2 1","expected":"Yes"},
      {"input":"3\n1 2 3","expected":"No"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nNode* reverse(Node* head) {\n  Node *prev = nullptr, *curr = head;\n  while (curr) {\n    Node* nxt = curr->next;\n    curr->next = prev;\n    prev = curr; curr = nxt;\n  }\n  return prev;\n}\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) {\n    cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // find mid, reverse second half, compare\n\n  cout << (isPal ? \"Yes\" : \"No\") << endl;\n  return 0;\n}",
    approach: "Find middle, reverse second half, compare both halves.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *slow=head,*fast=head; while(fast&&fast->next){slow=slow->next;fast=fast->next->next;} Node *rev=nullptr,*cur=slow; while(cur){Node* n=cur->next;cur->next=rev;rev=cur;cur=n;} Node* a=head,*b=rev; while(b){if(a->data!=b->data){cout<<\"No\";return 0;}a=a->next;b=b->next;}cout<<\"Yes\";",
  },
  {
    id: "intersection-lists",
    title: "Intersection of Two Linked Lists",
    category: "linked-list",
    difficulty: "medium",
    description: "Find intersection point of two linked lists.",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"4\n1 2 3 4\n2\n5 6\n2","output":"3","explanation":"Lists intersect at node 3"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 4\n2\n5 6\n2","expected":"3"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, m, skip, x;\n  cin >> n;\n  Node *a = nullptr, *at = nullptr;\n  for (int i = 0; i < n; i++) {\n    cin >> x;\n    Node* nn = new Node(x);\n    if (!a) a = at = nn; else { at->next = nn; at = nn; }\n  }\n  cin >> m;\n  Node *b = nullptr, *bt = nullptr;\n  for (int i = 0; i < m; i++) {\n    cin >> x;\n    Node* nn = new Node(x);\n    if (!b) b = bt = nn; else { bt->next = nn; bt = nn; }\n  }\n  cin >> skip;\n  // connect a[skip..] to b for intersection\n  Node* t = a;\n  for (int i = 0; i < skip && t; i++) t = t->next;\n  if (t && bt) bt->next = t;\n\n  // two-pointer: find intersection\n\n  cout << (intersect ? to_string(intersect->data) : \"-1\") << endl;\n  return 0;\n}",
    approach: "Two-pointer: calculate lengths, advance longer list by difference, then advance both until they meet.",
    complexity: {"time":"O(n+m)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *p1=a,*p2=b; while(p1!=p2){p1=p1?p1->next:b;p2=p2?p2->next:a;} return p1;",
  },
  {
    id: "delete-without-head",
    title: "Delete Node Without Head Pointer",
    category: "linked-list",
    difficulty: "medium",
    description: "Given only pointer to a node (not tail), delete it from linked list.",
    constraints: "2 <= n <= 10^5",
    examples: [
      {"input":"4\n1 2 3 4\n2","output":"1 3 4","explanation":"Delete node at position 2 without head"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 4\n2","expected":"1 3 4"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nvoid deleteNode(Node* node) {\n  // copy next node's data, delete next\n}\n\nint main() {\n  int n, pos, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) {\n    cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> pos;\n  Node* t = head;\n  for (int i = 0; i < pos; i++) t = t->next;\n  deleteNode(t);\n  t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: "Copy next node's data into current node, then delete next node.",
    complexity: {"time":"O(1)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node* temp=node->next; node->data=temp->data; node->next=temp->next; delete temp;",
  },
  {
    id: "add-two-numbers",
    title: "Add Two Numbers (Linked Lists)",
    category: "linked-list",
    difficulty: "medium",
    description: "Add two numbers represented as linked lists (digits in reverse order).",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"3\n2 4 3\n3\n5 6 4","output":"7 0 8","explanation":"342 + 465 = 807"}
    ],
    test_cases: [
      {"input":"3\n2 4 3\n3\n5 6 4","expected":"7 0 8"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, m, x;\n  cin >> n; Node *a = nullptr, *at = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!a) a = at = nn; else { at->next = nn; at = nn; }\n  }\n  cin >> m; Node *b = nullptr, *bt = nullptr;\n  for (int i = 0; i < m; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!b) b = bt = nn; else { bt->next = nn; bt = nn; }\n  }\n\n  // sum with carry\n\n  Node* res = result;\n  while (res) { cout << res->data << \" \"; res = res->next; }\n  return 0;\n}",
    approach: "Traverse both lists, sum digits with carry. Create new node for each digit.",
    complexity: {"time":"O(n+m)","space":"O(max(n,m))"},
    sheet: "Striver A2Z",
    solution_code: "Node dummy(0); Node* t=&dummy; int carry=0; while(a||b||carry){int s=carry; if(a){s+=a->data;a=a->next;}if(b){s+=b->data;b=b->next;}t->next=new Node(s%10);carry=s/10;t=t->next;} return dummy.next;",
  },
  {
    id: "rotate-list",
    title: "Rotate Linked List by K",
    category: "linked-list",
    difficulty: "medium",
    description: "Rotate linked list to the right by k places.",
    constraints: "1 <= n <= 10^5, 1 <= k <= 10^5",
    examples: [
      {"input":"5\n1 2 3 4 5\n2","output":"4 5 1 2 3"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5\n2","expected":"4 5 1 2 3"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, k, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> k;\n  k %= n;\n  if (k == 0) { Node* t = head; while (t) { cout << t->data << \" \"; t = t->next; } return 0; }\n\n  // make circular, break at n-k\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: "Make list circular by connecting tail to head. Break at new head position (n-k%n).",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node* t=head; int len=1; while(t->next){t=t->next;len++;} t->next=head; k%=len; int steps=len-k; while(steps--)t=t->next; head=t->next; t->next=nullptr;",
  },
  {
    id: "flatten-list",
    title: "Flatten a Multilevel Linked List",
    category: "linked-list",
    difficulty: "hard",
    description: "Flatten a linked list where nodes have next and child pointers.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"12\n1 2 3 4 5 6 7 8 9 10 11 12\n3 7 10","output":"1 2 3 7 8 9 10 11 12 4 5 6","explanation":"Nodes with children at positions 3,7,10"}
    ],
    test_cases: [
      {"input":"12\n1 2 3 4 5 6 7 8 9 10 11 12\n3 7 10","expected":"1 2 3 7 8 9 10 11 12 4 5 6"}
    ],
    solution_template: "#include <iostream>\n#include <stack>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node *next, *child;\n  Node(int d) : data(d), next(nullptr), child(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  vector<Node*> nodes;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    nodes.push_back(nn);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  int c; while (cin >> c) {\n    if (c < (int)nodes.size() - 1) nodes[c]->child = nodes[c+1];\n  }\n\n  // flatten using stack\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: "Use stack for child pointers. Traverse next, when child exists, push next to stack and follow child.",
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<Node*> st; Node* cur=head; while(cur){if(cur->child&&cur->next)st.push(cur->next);if(cur->child)cur->next=cur->child;else if(!cur->next&&!st.empty()){cur->next=st.top();st.pop();}cur=cur->next;}",
  }
]
