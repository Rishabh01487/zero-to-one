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
    approach: `This problem asks us to reverse a singly linked list in-place, meaning we cannot use extra memory proportional to the list size. A brute-force approach would be to traverse the list, store all node values in an array, and then create a new list in reverse order. This uses O(n) extra space, which is unnecessary since we can reverse the links directly.

The optimal approach uses three pointers: prev (initialized to nullptr), curr (pointing to head), and next (temporary). In each iteration, we: (1) save curr→next into next so we don't lose the rest of the list, (2) reverse the link by setting curr→next = prev, (3) advance prev to curr, and (4) advance curr to next.

Diagram:
\`\`\`
  1 → 2 → 3 → 4 → 5 → null

  Step 1: null ← 1   2 → 3 → 4 → 5 → null
           prev  curr next

  Step 2: null ← 1 ← 2   3 → 4 → 5 → null
                  prev curr next

  Step 3: null ← 1 ← 2 ← 3   4 → 5 → null
                        prev curr next

  Final:  null ← 1 ← 2 ← 3 ← 4 ← 5
                                  prev
  Result: 5 → 4 → 3 → 2 → 1 → null
\`\`\`

Edge cases: empty list (return null), single node (return head as-is). Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *prev=nullptr,*curr=head; while(curr){Node* nxt=curr->next; curr->next=prev; prev=curr; curr=nxt;} return prev;",
    techniques: ["inplace-reversal"],
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
    approach: `This problem asks for the middle node of a singly linked list. For a list with an odd number of nodes, return the exact middle. For an even number, return the second middle (e.g., for 6 nodes, return the 4th). The brute-force approach counts the total nodes in one pass, then traverses again to the n/2-th node. This works but requires two passes. We can do better with a single pass using the slow/fast pointer technique.

Initialize two pointers, slow and fast, both at head. In each iteration, slow moves one step (slow = slow→next) while fast moves two steps (fast = fast→next→next). When fast reaches the end of the list (fast is null for even-length lists, or fast→next is null for odd-length lists), slow will be at the middle.

Diagram:
\`\`\`
  1 → 2 → 3 → 4 → 5 → null
  s,f

  Step 1: 1 → 2 → 3 → 4 → 5 → null
           s   f

  Step 2: 1 → 2 → 3 → 4 → 5 → null
               s   →   f

  Step 3: fast→next is null, stop. slow is at 3 (middle).

  Even case (1→2→3→4→5→6):
  Step 1: 1 → 2 → 3 → 4 → 5 → 6
           s   f
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
  },
  {
    id: "clone-random",
    title: "Clone Linked List with Random Pointer",
    category: "linked-list",
    difficulty: "hard",
    description: "Clone a linked list where each node has next and random pointers.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"4\n1 2 3 4\n-1 0 1 2","output":"1 2 3 4","explanation":"Random: 1->null, 2->1, 3->2, 4->3"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 4\n-1 0 1 2","expected":"1 2 3 4"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node *next, *random;\n  Node(int d) : data(d), next(nullptr), random(nullptr) {}\n};\n\nint main() {\n  int n;\n  cin >> n;\n  vector<Node*> nodes(n);\n  for (int i = 0; i < n; i++) { int x; cin >> x; nodes[i] = new Node(x); }\n  for (int i = 0; i < n-1; i++) nodes[i]->next = nodes[i+1];\n  for (int i = 0; i < n; i++) {\n    int r; cin >> r;\n    if (r >= 0) nodes[i]->random = nodes[r];\n  }\n\n  // interleave clone nodes, set random, separate\n\n  Node* t = nodes[0];\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: "Interleave clone nodes (A->A'->B->B'). Set random pointers using original->next->random = original->random->next. Separate lists.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node* cur=head; while(cur){Node* n=new Node(cur->val);n->next=cur->next;cur->next=n;cur=n->next;} cur=head; while(cur){if(cur->random)cur->next->random=cur->random->next;cur=cur->next->next;} Node* newHead=head->next; cur=head; while(cur){Node* n=cur->next;cur->next=n->next;if(n->next)n->next=n->next->next;cur=cur->next;} return newHead;",
  },
  {
    id: "reverse-k-group",
    title: "Reverse Nodes in K-Group",
    category: "linked-list",
    difficulty: "hard",
    description: "Reverse nodes in groups of k. Leftover nodes stay as-is.",
    constraints: "1 <= n <= 10^4, 1 <= k <= n",
    examples: [
      {"input":"5\n1 2 3 4 5\n3","output":"3 2 1 4 5"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5\n3","expected":"3 2 1 4 5"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nNode* reverseKGroup(Node* head, int k) {\n  // recursive: reverse first k, recurse on rest\n}\n\nint main() {\n  int n, k, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> k;\n  head = reverseKGroup(head, k);\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: "Recursively reverse first k nodes, then recurse on remaining list.",
    complexity: {"time":"O(n)","space":"O(n/k)"},
    sheet: "Striver A2Z",
    solution_code: "Node* cur=head; int cnt=0; while(cur&&cnt<k){cur=cur->next;cnt++;} if(cnt<k)return head; Node *prev=nullptr,*curr=head; for(int i=0;i<k;i++){Node* n=curr->next;curr->next=prev;prev=curr;curr=n;} head->next=reverseKGroup(curr,k); return prev;",
  }
  Odd case (1→2→3→2→1):
    Middle at 3, skip middle, reverse 2→1, compare 1-1, 2-2 → Palindrome!
\`\`\`

Edge cases: empty list or single node (both are palindromes). Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *slow=head,*fast=head; while(fast&&fast->next){slow=slow->next;fast=fast->next->next;} Node *rev=nullptr,*cur=slow; while(cur){Node* n=cur->next;cur->next=rev;rev=cur;cur=n;} Node* a=head,*b=rev; while(b){if(a->data!=b->data){cout<<\"No\";return 0;}a=a->next;b=b->next;}cout<<\"Yes\";",
    techniques: ["fast-slow-pointers", "inplace-reversal"],
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
    approach: `This problem asks to find the node where two singly linked lists intersect (merge), meaning they share all nodes from that point onward. The brute-force approach uses nested loops: for each node in list A, check if any node in list B matches by address, giving O(n*m) time. A hash set approach stores all nodes of A in a set, then checks each node of B, using O(n) space.

The optimal two-pointer approach uses no extra space. Initialize p1 = headA and p2 = headB. While p1 != p2: move each pointer to the next node. When p1 reaches null, reset it to headB. When p2 reaches null, reset it to headA. They will meet at the intersection node (or both be null if no intersection).

Diagram:
\`\`\`
  A: 1 → 2 → 3 → 4 → null
  B: 5 → 6 → 3 → 4 → null
                ↑
            intersect at 3

  Pointer movement:
  p1: 1 → 2 → 3 → 4 → null → (switch to B) 5 → 6 → 3 ← meet!
  p2: 5 → 6 → 3 → 4 → null → (switch to A) 1 → 2 → 3 ← meet!

  Both traverse len(A) + len(B) - intersection_len = 4 + 4 - 2 = 6 steps
  They meet at node 3.

  No-intersection case:
  A: 1 → 2 → 3 → null
  B: 4 → 5 → null

  p1: 1 → 2 → 3 → null → 4 → 5 → null
  p2: 4 → 5 → null → 1 → 2 → 3 → null
  Both are null simultaneously → return null
\`\`\`

Edge cases: no intersection (return null), one list is empty (return null), lists intersect at the very first node. Complexity: O(n+m) time, O(1) space.`,
    complexity: {"time":"O(n+m)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *p1=a,*p2=b; while(p1!=p2){p1=p1?p1->next:b;p2=p2?p2->next:a;} return p1;",
    techniques: ["two-pointers"],
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
    approach: `This problem asks to delete a given node from a singly linked list, where you are only given a pointer to that node (not the head). This is unconventional because we cannot access the previous node to update its next pointer. The standard deletion technique (finding the previous node and setting prev→next = node→next) is impossible without the head or prev pointer.

The clever trick is to copy the data from the next node into the current node, then delete the next node instead. Specifically: (1) create a temporary pointer temp = node→next, (2) copy node→data = temp→data, (3) set node→next = temp→next, (4) delete temp. This effectively removes the target node's value and replaces the node with its successor.

Diagram:
\`\`\`
  Before:   1 → 2 → 3 → 4 → null
                 ↑
               node (to delete)

  Step 1: temp = node→next (node 3)
  Step 2: node→data = temp→data (2 becomes 3)
  Step 3: node→next = temp→next (2→next becomes 4)
  Step 4: delete temp

  After:    1 → 3 → 4 → null
  The original node 2 now holds 3, and node 3 is deleted.
\`\`\`

The problem guarantees that the given node is not the tail, so node→next is always valid. Edge cases: deleting the last node is not allowed (guaranteed by constraints). Complexity: O(1) time, O(1) space.`,
    complexity: {"time":"O(1)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node* temp=node->next; node->data=temp->data; node->next=temp->next; delete temp;",
    techniques: ["inplace-reversal"],
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
    approach: `This problem asks to add two non-negative integers where each integer's digits are stored in a linked list in reverse order (least significant digit first). Each node contains a single digit. The result should also be a linked list in reverse order. The brute-force approach converts both lists to integers, adds them, and converts back, but this fails for large numbers exceeding 64-bit integer limits.

The optimal approach simulates manual digit-by-digit addition with a carry. Initialize a dummy node as the result head's predecessor, a tail pointer at &dummy, and carry=0. While either list has remaining nodes or carry is non-zero: compute sum = carry + (a ? a→data : 0) + (b ? b→data : 0). Create a new node with value sum % 10, attach to tail→next, and advance tail. Set carry = sum / 10.

Diagram:
\`\`\`
  List A: 2 → 4 → 3  (number 342)
  List B: 5 → 6 → 4  (number 465)

  Step 1: a=2, b=5, carry=0, sum=7 → digit=7, carry=0
  Step 2: a=4, b=6, carry=0, sum=10 → digit=0, carry=1
  Step 3: a=3, b=4, carry=1, sum=8 → digit=8, carry=0

  Result: 7 → 0 → 8  (number 807) ✓

  Uneven lengths (e.g., 9→9 + 1):
  Step 1: a=9, b=1, sum=10 → digit=0, carry=1
  Step 2: a=9, b=null (0), carry=1, sum=10 → digit=0, carry=1
  Step 3: a=null, b=null, carry=1, sum=1 → digit=1, carry=0
  Result: 0 → 0 → 1  (99 + 1 = 100) ✓
\`\`\`

Edge cases: different lengths (shorter list contributes 0 for missing nodes), final carry beyond last digit (e.g., 9→9 + 1 = 0→0→1), one or both lists empty. Complexity: O(max(n,m)) time, O(max(n,m)) space for result list.`,
    complexity: {"time":"O(n+m)","space":"O(max(n,m))"},
    sheet: "Striver A2Z",
    solution_code: "Node dummy(0); Node* t=&dummy; int carry=0; while(a||b||carry){int s=carry; if(a){s+=a->data;a=a->next;}if(b){s+=b->data;b=b->next;}t->next=new Node(s%10);carry=s/10;t=t->next;} return dummy.next;",
    techniques: ["inplace-reversal"],
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
    approach: `This problem asks to rotate a singly linked list to the right by k positions. Each rotation moves the last node to the front of the list. The brute-force approach performs k single rotations (each taking O(n) to find the tail), giving O(n*k) time, which is impractical for large k.

The optimal approach computes the list's length, makes the list circular, and breaks it at the appropriate position. First, traverse to compute its length len and reach the tail. Connect tail→next = head to form a cycle. Compute effective rotations: k = k % len. The new head will be at position (len - k) from the original head. Traverse from head for (len - k) steps, arriving at the new tail. Set newHead = newTail→next. Set newTail→next = nullptr.

Diagram:
\`\`\`
  List: 1 → 2 → 3 → 4 → 5 → null, k=2

  Step 1: Find length and make circular
          len=5, tail→next = head
          1 → 2 → 3 → 4 → 5 → (back to 1) → ...

  Step 2: k = 2 % 5 = 2
          Traverse len-k = 3 steps: 1→2→3 (newTail)

  Step 3: newHead = newTail→next = 4
          newTail→next = null

  Result: 4 → 5 → 1 → 2 → 3 → null

  k=0 case: return head as-is (no rotation needed)
\`\`\`

Edge cases: k=0 or k is a multiple of len (no rotation), single node (return head as-is), empty list (return null). Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node* t=head; int len=1; while(t->next){t=t->next;len++;} t->next=head; k%=len; int steps=len-k; while(steps--)t=t->next; head=t->next; t->next=nullptr;",
    techniques: ["fast-slow-pointers", "inplace-reversal"],
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
    approach: `This problem asks to flatten a multilevel linked list where each node has a next pointer and a child pointer. The child pointer may point to another linked list, and the flattening follows a depth-first traversal order: once we dive into a child chain, we exhaust it before returning to the next node on the parent level. The brute-force approach uses recursion to flatten each child list and weave it back, but recursion depth can be problematic for deep nesting.

The optimal iterative approach uses a stack to handle branching. Traverse with a pointer cur starting at head. At each node: if cur has a child AND also has a next pointer, push cur→next onto the stack. If cur has a child, set cur→next = cur→child (dive into the child level) and set cur→child = nullptr. If cur has no child and cur→next is null (end of current level), and the stack is non-empty, pop the top and set cur→next to it.

Diagram:
\`\`\`
  1 → 2 → 3 → 4 → 5 → 6 → null
          │
          7 → 8 → 9 → null
                  │
                  10 → 11 → 12 → null

  Step 1: traverse 1 → 2 → 3
  Step 2: at 3: has child, has next (4). Push 4. 3→next=7.
  Step 3: traverse 7 → 8 → 9
  Step 4: at 9: has child (10). No next to push. 9→next=10.
  Step 5: traverse 10 → 11 → 12 (end of chain)
  Step 6: at 12: no child, no next. Pop 4. 12→next=4.
  Step 7: traverse 4 → 5 → 6 (end)

  Result: 1→2→3→7→8→9→10→11→12→4→5→6
\`\`\`

Edge cases: no child pointers (behaves as a normal linked list), multiple levels of deep nesting, a node with child but no next (directly follow child without pushing). Complexity: O(n) time, O(n) space for the stack.`,
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "stack<Node*> st; Node* cur=head; while(cur){if(cur->child&&cur->next)st.push(cur->next);if(cur->child)cur->next=cur->child;else if(!cur->next&&!st.empty()){cur->next=st.top();st.pop();}cur=cur->next;}",
    techniques: ["recursion"],
  },
  {
    id: "clone-random",
    title: "Clone Linked List with Random Pointer",
    category: "linked-list",
    difficulty: "hard",
    description: "Clone a linked list where each node has next and random pointers.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"4\n1 2 3 4\n-1 0 1 2","output":"1 2 3 4","explanation":"Random: 1->null, 2->1, 3->2, 4->3"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 4\n-1 0 1 2","expected":"1 2 3 4"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node *next, *random;\n  Node(int d) : data(d), next(nullptr), random(nullptr) {}\n};\n\nint main() {\n  int n;\n  cin >> n;\n  vector<Node*> nodes(n);\n  for (int i = 0; i < n; i++) { int x; cin >> x; nodes[i] = new Node(x); }\n  for (int i = 0; i < n-1; i++) nodes[i]->next = nodes[i+1];\n  for (int i = 0; i < n; i++) {\n    int r; cin >> r;\n    if (r >= 0) nodes[i]->random = nodes[r];\n  }\n\n  // interleave clone nodes, set random, separate\n\n  Node* t = nodes[0];\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to create a deep copy of a linked list where each node has an additional random pointer that can point to any node in the list or be null. A deep copy means entirely new nodes must be allocated; we cannot merely copy the original node addresses. The brute-force approach uses a hash map: first pass creates all new nodes and maps original→clone; second pass sets next and random pointers by looking up the map.

The optimal approach eliminates the extra space by interleaving clone nodes directly within the original list in three phases. Phase 1: traverse the original list. For each node cur, create a new clone node with cur→data. Insert it between cur and cur→next. Phase 2: set the random pointers of all clone nodes. For each original cur, if cur→random exists, set cur→next→random = cur→random→next. Phase 3: separate the two interleaved lists by restoring original next pointers and linking clone next pointers.

Diagram:
\`\`\`
  Phase 1: Interleave
    Original: A → B → C → null
    Interleaved: A → A' → B → B' → C → C' → null

  Phase 2: Set random pointers
    Original random: A→C, B→A, C→B
    Clone random: A'→C' (which is A→random→next = C→next = C')
                  B'→A' (B→random→next = A→next = A')
                  C'→B' (C→random→next = B→next = B')

  Phase 3: Separate
    Original restored: A → B → C → null
    Clone list: A' → B' → C' → null (with correct random pointers)
\`\`\`

Edge cases: null random pointers (check before dereferencing), single node with null random. Complexity: O(n) time, O(1) extra space (excluding output).`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node* cur=head; while(cur){Node* n=new Node(cur->val);n->next=cur->next;cur->next=n;cur=n->next;} cur=head; while(cur){if(cur->random)cur->next->random=cur->random->next;cur=cur->next->next;} Node* newHead=head->next; cur=head; while(cur){Node* n=cur->next;cur->next=n->next;if(n->next)n->next=n->next->next;cur=cur->next;} return newHead;",
    techniques: ["recursion"],
  },
  {
    id: "reverse-k-group",
    title: "Reverse Nodes in K-Group",
    category: "linked-list",
    difficulty: "hard",
    description: "Reverse nodes in groups of k. Leftover nodes stay as-is.",
    constraints: "1 <= n <= 10^4, 1 <= k <= n",
    examples: [
      {"input":"5\n1 2 3 4 5\n3","output":"3 2 1 4 5"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5\n3","expected":"3 2 1 4 5"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nNode* reverseKGroup(Node* head, int k) {\n  // recursive: reverse first k, recurse on rest\n}\n\nint main() {\n  int n, k, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> k;\n  head = reverseKGroup(head, k);\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to reverse nodes in groups of k in a singly linked list. If the number of remaining nodes at the end is less than k, they stay in their original order. The brute-force approach reverses the entire list and then re-reverses groups, but this needlessly violates the requirement that leftover nodes stay as-is.

The optimal approach uses recursion combined with the standard three-pointer reversal. First, traverse k nodes ahead to verify we have a full group. If fewer than k nodes remain, return head unchanged. If k nodes exist, reverse the first k nodes using the standard three-pointer technique applied exactly k times. After reversal, head (the original first node of the group) is now at the end of the reversed segment, and prev (the original k-th node) is at the front. Set head→next = reverseKGroup(curr, k) to recursively reverse the remaining groups and attach them.

Diagram:
\`\`\`
  List: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → null, k=3

  Group 1 (1→2→3):
    Reverse: 3 → 2 → 1
    head=1, prev=3
    1→next = reverseKGroup(4→5→6→7→8, 3)

  Group 2 (4→5→6):
    Reverse: 6 → 5 → 4
    4→next = reverseKGroup(7→8, 3)

  Group 3 (7→8):
    Only 2 nodes < k, return as-is: 7 → 8

  Result: 3 → 2 → 1 → 6 → 5 → 4 → 7 → 8 → null

  Edge cases:
    k=1: no reversal, return head as-is
    Exact multiple: 1→2→3→4→5→6, k=3 → 3→2→1→6→5→4
\`\`\`

Edge cases: k=1 (no reversal), list length is exactly a multiple of k, remaining nodes less than k at the end (left in original order). Complexity: O(n) time, O(n/k) recursion stack space.`,
    complexity: {"time":"O(n)","space":"O(n/k)"},
    sheet: "Striver A2Z",
    solution_code: "Node* cur=head; int cnt=0; while(cur&&cnt<k){cur=cur->next;cnt++;} if(cnt<k)return head; Node *prev=nullptr,*curr=head; for(int i=0;i<k;i++){Node* n=curr->next;curr->next=prev;prev=curr;curr=n;} head->next=reverseKGroup(curr,k); return prev;",
    techniques: ["inplace-reversal"],
  },
  {
    id: "odd-even-list",
    title: "Odd Even Linked List",
    category: "linked-list",
    difficulty: "medium",
    description: "Group all odd-indexed nodes together followed by even-indexed nodes, preserving relative order.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n1 2 3 4 5","output":"1 3 5 2 4"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5","expected":"1 3 5 2 4"},
      {"input":"4\n2 1 3 5","expected":"2 3 1 5"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // odd/even pointer separation\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to rearrange a singly linked list so that all nodes at odd positions (1-indexed) come first, followed by all nodes at even positions, while preserving the relative order within each group. The brute-force approach creates separate odd and even lists by traversing twice, but this requires extra space.

The optimal approach uses four pointers: odd (head), even (head→next), evenHead (stored reference to even head), and a traversal pointer. Starting from head, connect odd-indexed nodes to each other and even-indexed nodes to each other in a single pass. Set odd→next = even→next (next odd node), advance odd. Set even→next = odd→next (next even node), advance even. After the loop, connect odd→next = evenHead to join the two groups.

Diagram:
\`\`\`
  Input:  1 → 2 → 3 → 4 → 5 → null
          o   e

  Step 1: 1 → 3    2 → 4     (odd→next = even→next, even→next = odd→next)
          o       e

  Step 2: 1 → 3 → 5    2 → 4
                  o       e (null)

  Final:  odd→next = evenHead
          1 → 3 → 5 → 2 → 4 → null
\`\`\`

Edge cases: empty list (return null), single node (return head as-is), two nodes (no rearrangement needed). Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "if(!head||!head->next)return head; Node *odd=head,*even=head->next,*evenHead=even; while(even&&even->next){odd->next=even->next;odd=odd->next;even->next=odd->next;even=even->next;} odd->next=evenHead; return head;",
    techniques: ["inplace-reversal"],
  },
  {
    id: "swap-pairs",
    title: "Swap Nodes in Pairs",
    category: "linked-list",
    difficulty: "medium",
    description: "Swap every two adjacent nodes in the linked list.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n1 2 3 4","output":"2 1 4 3"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 4","expected":"2 1 4 3"},
      {"input":"5\n1 2 3 4 5","expected":"2 1 4 3 5"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // swap pairs using dummy node\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to swap every two adjacent nodes in a singly linked list. For a list 1→2→3→4, the result should be 2→1→4→3. If there are an odd number of nodes, the last node remains in place. The brute-force approach swaps node values, but this fails when node values are complex objects. The optimal approach rewires the pointers themselves.

Use a dummy node pointing to head. Maintain a pointer prev starting at dummy. In each iteration, let first = prev→next and second = first→next (the pair to swap). Perform the swap: first→next = second→next, second→next = first, prev→next = second. Then advance prev = first. Continue until fewer than 2 nodes remain.

Diagram:
\`\`\`
  Input:  1 → 2 → 3 → 4 → null

  dummy → 1 → 2 → 3 → 4 → null
  prev   first second

  Swap pair (1,2):
    first→next = second→next (1→3)
    second→next = first      (2→1)
    prev→next = second       (dummy→2)
    prev = first = 1
  Result: dummy → 2 → 1 → 3 → 4 → null
                      prev  first second

  Swap pair (3,4):
    first→next = second→next (3→null)
    second→next = first      (4→3)
    prev→next = second       (1→4)
    prev = first = 3

  Final:  2 → 1 → 4 → 3 → null
\`\`\`

Edge cases: empty list (return null), single node (return head as-is), odd number of nodes (last node stays untouched). Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node dummy(0); dummy.next=head; Node* prev=&dummy; while(prev->next&&prev->next->next){Node* f=prev->next;Node* s=f->next;f->next=s->next;s->next=f;prev->next=s;prev=f;} return dummy.next;",
    techniques: ["inplace-reversal", "recursion"],
  },
  {
    id: "reorder-list",
    title: "Reorder List",
    category: "linked-list",
    difficulty: "medium",
    description: "Reorder list to L0→Ln→L1→Ln-1→L2→Ln-2→...",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n1 2 3 4","output":"1 4 2 3"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 4","expected":"1 4 2 3"},
      {"input":"5\n1 2 3 4 5","expected":"1 5 2 4 3"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // find middle, reverse second half, merge\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to reorder a singly linked list in-place to the pattern L0→Ln→L1→Ln-1→L2→Ln-2→... where Ln is the last node. The brute-force approach repeatedly finds the last node and appends it after each prefix node, giving O(n²) time.

The optimal approach uses three phases: find the middle, reverse the second half, then interleave. First, use slow/fast pointers to find the middle node. Second, reverse the second half of the list starting from the middle. Third, merge the two halves by interleaving: take one node from the first half, then one from the reversed second half, and so on.

Diagram:
\`\`\`
  Input: 1 → 2 → 3 → 4 → 5 → null

  Phase 1: Find middle
    slow=1,fast=1 → slow=2,fast=3 → slow=3,fast=5
    Middle = 3.

  Phase 2: Reverse second half
    First half:  1 → 2 → 3 → null
    Second half: 4 → 5 → null
    Reversed:    5 → 4 → null

  Phase 3: Interleave
    f: 1 → 2 → 3
    r: 5 → 4

    Step 1: 1 → 5    f=2, r=4
    Step 2: 1 → 5 → 2 → 4    f=3, r=null

  Result: 1 → 5 → 2 → 4 → 3 → null
\`\`\`

Edge cases: empty list (return null), single node (return head as-is), two nodes (already in correct order, no reordering possible). Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "if(!head||!head->next)return; Node *s=head,*f=head; while(f&&f->next){s=s->next;f=f->next->next;} Node *prev=nullptr,*cur=s->next; s->next=nullptr; while(cur){Node* n=cur->next;cur->next=prev;prev=cur;cur=n;} Node *a=head,*b=prev; while(b){Node* n1=a->next,*n2=b->next; a->next=b; b->next=n1; a=n1; b=n2;}",
    techniques: ["fast-slow-pointers", "inplace-reversal"],
  },
  {
    id: "split-list-parts",
    title: "Split Linked List in Parts",
    category: "linked-list",
    difficulty: "medium",
    description: "Split linked list into k consecutive parts, sizes differ by at most 1.",
    constraints: "1 <= n <= 10^3, 1 <= k <= 50",
    examples: [
      {"input":"5\n1 2 3 4\n3","output":"1 2 3 4 null","explanation":"Split into 3 parts: [1,2], [3], [4]"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 4\n3","expected":"1 2 3 4 null"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, k, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> k;\n\n  // compute sizes, split into parts\n\n  return 0;\n}",
    approach: `This problem asks to split a singly linked list into k consecutive parts. The parts should be as equal in size as possible, with the difference between any two parts not exceeding 1. The first parts get the extra nodes if the list cannot be divided evenly.

The approach: first compute the total length len of the list. The base size of each part is len / k, and there are len % k parts that get an extra node (the first parts). Traverse the list once, and for each part, cut off a segment of the appropriate size. For each part, set the segment's tail→next = nullptr to separate it from the next part.

Diagram:
\`\`\`
  Input: 1 → 2 → 3 → 4 → 5 → 6 → 7 → null, k=3

  len = 7
  partSize = 7/3 = 2
  extra = 7%3 = 1 → first 1 part gets 3 nodes

  Part 1: size 3 (base 2 + 1 extra)
    1 → 2 → 3 → null

  Part 2: size 2
    4 → 5 → null

  Part 3: size 2
    6 → 7 → null

  Result: [1→2→3] [4→5] [6→7]
\`\`\`

Edge cases: k > n (some parts will be empty/null), k=1 (entire list as one part), empty list (all parts are null). Complexity: O(n) time, O(k) space for the result array.`,
    complexity: {"time":"O(n)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "int len=0; Node* t=head; while(t){len++;t=t->next;} int sz=len/k,ex=len%k; vector<Node*> res(k); t=head; for(int i=0;i<k;i++){res[i]=t;int partSz=sz+(i<ex?1:0);for(int j=0;j<partSz-1;j++)t=t->next;if(t){Node* n=t->next;t->next=nullptr;t=n;}} return res;",
    techniques: ["two-pointers"],
  },
  {
    id: "remove-dupes-sorted",
    title: "Remove Duplicates from Sorted List",
    category: "linked-list",
    difficulty: "easy",
    description: "Remove duplicate nodes from a sorted linked list, keeping only distinct values.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n1 1 2 3 3","output":"1 2 3"}
    ],
    test_cases: [
      {"input":"5\n1 1 2 3 3","expected":"1 2 3"},
      {"input":"3\n1 1 1","expected":"1"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // traverse, skip duplicates\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to remove duplicate nodes from a sorted singly linked list, keeping only one occurrence of each value. Since the list is sorted, all duplicates are adjacent. The brute-force approach could use a hash set, but that's unnecessary and wastes space.

The optimal approach uses a single pointer traversal. Maintain a cur pointer starting at head. While cur→next is not null, compare cur→data with cur→next→data. If they are equal, skip the next node: set cur→next = cur→next→next. Otherwise, advance cur to cur→next. This works because the list is sorted, so we never need to look back.

Diagram:
\`\`\`
  Input:  1 → 1 → 2 → 3 → 3 → null
          cur

  Step 1: cur→data == cur→next→data (1==1)
          Skip: cur→next = cur→next→next
          1 → 2 → 3 → 3 → null
          cur (don't advance)

  Step 2: cur→data != cur→next→data (1!=2)
          Advance: cur = cur→next
          1 → 2 → 3 → 3 → null
              cur

  Step 3: cur→data != cur→next→data (2!=3)
          Advance: cur = cur→next
          1 → 2 → 3 → 3 → null
                  cur

  Step 4: cur→data == cur→next→data (3==3)
          Skip: cur→next = cur→next→next
          1 → 2 → 3 → null
                  cur

  Step 5: cur→next is null → stop

  Result: 1 → 2 → 3 → null
\`\`\`

Edge cases: empty list (return null), single node (return head as-is), all duplicates (e.g., 1→1→1→1 → result 1). Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node* cur=head; while(cur&&cur->next){if(cur->data==cur->next->data)cur->next=cur->next->next;else cur=cur->next;} return head;",
    techniques: ["two-pointers"],
  },
  {
    id: "remove-dupes-unsorted",
    title: "Remove Duplicates from Unsorted List",
    category: "linked-list",
    difficulty: "medium",
    description: "Remove duplicate nodes from an unsorted linked list, keeping only the first occurrence.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n4 2 5 4 2 2","output":"4 2 5"}
    ],
    test_cases: [
      {"input":"6\n4 2 5 4 2 2","expected":"4 2 5"},
      {"input":"4\n1 1 1 1","expected":"1"}
    ],
    solution_template: "#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // hash set to track seen values\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to remove duplicate nodes from an unsorted singly linked list. Unlike the sorted variant, duplicates can appear anywhere in the list. The brute-force approach uses two nested loops (O(n²) time), checking each node against all previous nodes.

The optimal approach uses a hash set for O(1) lookup. Traverse the list with a prev pointer (to enable deletion) and a cur pointer. Maintain a set of seen values. For each node: if cur→data is already in the set, skip it by setting prev→next = cur→next; otherwise, add the value to the set and advance prev to cur. Always advance cur.

Diagram:
\`\`\`
  Input:  4 → 2 → 5 → 4 → 2 → 2 → null

  Step 1: cur=4, not in set → add {4}, prev=4, cur=2
  Step 2: cur=2, not in set → add {2}, prev=2, cur=5
  Step 3: cur=5, not in set → add {5}, prev=5, cur=4
  Step 4: cur=4, in set → skip: prev→next = cur→next (5→2), cur=2
  Step 5: cur=2, in set → skip: prev→next = cur→next (5→2→null becomes 5→null), cur=2→null
  Step 6: cur=null → stop

  Set: {4, 2, 5}

  Result: 4 → 2 → 5 → null
\`\`\`

Edge cases: empty list (return null), single node (return head as-is), all duplicates (set removes all but first). Complexity: O(n) time, O(n) space for the hash set.`,
    complexity: {"time":"O(n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "unordered_set<int> seen; Node *prev=nullptr,*cur=head; while(cur){if(seen.count(cur->data)){prev->next=cur->next;delete cur;cur=prev->next;}else{seen.insert(cur->data);prev=cur;cur=cur->next;}} return head;",
    techniques: ["two-pointers"],
  },
  {
    id: "insert-sorted",
    title: "Insert into Sorted Linked List",
    category: "linked-list",
    difficulty: "easy",
    description: "Insert a new node with given value into a sorted linked list while maintaining order.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n1 3 4 5\n2","output":"1 2 3 4 5"}
    ],
    test_cases: [
      {"input":"4\n1 3 4 5\n2","expected":"1 2 3 4 5"},
      {"input":"3\n2 3 4\n1","expected":"1 2 3 4"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, val, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> val;\n\n  // find insertion point\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to insert a new value into a sorted singly linked list while maintaining the ascending order. The brute-force approach creates a new list by traversing the original and inserting at the correct position, but this unnecessarily rebuilds the list.

The optimal approach uses a single traversal with two pointers (prev and cur) to find the correct insertion point, then creates a new node and adjusts pointers. Handle the special case where the new value should go before the head (new smallest element).

Diagram:
\`\`\`
  Input:  1 → 3 → 4 → 5 → null, val=2

  Case 1: Insert at beginning (if val ≤ head→data)
    e.g., val=0: new→next = head; return new

  Case 2: Insert in middle/end
    Traverse: prev=1, cur=3
    val=2 > prev→data=1 and val < cur→data=3 → insert between

    prev→next = new Node(2)
    new→next = cur

    Result: 1 → 2 → 3 → 4 → 5 → null

  Case 3: Insert at end
    e.g., val=6: prev=5, cur=null
    prev→next = new Node(6)

    Result: 1 → 3 → 4 → 5 → 6 → null
\`\`\`

Edge cases: empty list (return new node as head), insert before head (val is smallest), insert after tail (val is largest), duplicate values (insert after existing equal value). Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node* nn=new Node(val); if(!head||val<head->data){nn->next=head;return nn;} Node* cur=head; while(cur->next&&cur->next->data<val)cur=cur->next; nn->next=cur->next; cur->next=nn; return head;",
    techniques: ["two-pointers"],
  },
  {
    id: "merge-k-lists",
    title: "Merge K Sorted Linked Lists",
    category: "linked-list",
    difficulty: "hard",
    description: "Merge k sorted linked lists into a single sorted list efficiently.",
    constraints: "1 <= k <= 10^4, total nodes <= 10^5",
    examples: [
      {"input":"3\n2\n1 4\n3\n2 5 6\n2\n3 7","output":"1 2 3 4 5 6 7"}
    ],
    test_cases: [
      {"input":"3\n2\n1 4\n3\n2 5 6\n2\n3 7","expected":"1 2 3 4 5 6 7"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int k, n, x;\n  cin >> k;\n  vector<Node*> lists(k);\n  for (int i = 0; i < k; i++) {\n    cin >> n;\n    Node *head=nullptr,*tail=nullptr;\n    for (int j = 0; j < n; j++) { cin >> x;\n      Node* nn = new Node(x);\n      if (!head) head = tail = nn; else { tail->next = nn; tail = nn; }\n    }\n    lists[i] = head;\n  }\n\n  // merge using divide & conquer or priority queue\n\n  Node* t = res;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to merge k sorted linked lists into one sorted linked list. The brute-force approach repeatedly compares the heads of all k lists to find the minimum (O(k) per node, total O(nk)), which is inefficient for large k.

The optimal approach uses a min-heap (priority queue). Push the head of each non-empty list into a min-heap. While the heap is not empty: pop the smallest node, append it to the result list (using a dummy head), and if the popped node has a next node, push that next node into the heap. This takes O(log k) per node. Alternatively, a divide-and-conquer approach merges lists pairwise (like merge sort), also O(n log k).

Diagram:
\`\`\`
  Lists: [1→4→5]  [1→3→4]  [2→6]

  Min-heap states:
  Step 1: push 1,1,2 → pop 1 (from list 1), push list1→next=4
          Result: dummy → 1
  Step 2: heap has 1(list2),2,4 → pop 1, push list2→next=3
          Result: dummy → 1 → 1
  Step 3: heap has 2,3,4 → pop 2, push list3→next=6
          Result: dummy → 1 → 1 → 2
  ...
  Final: dummy → 1 → 1 → 2 → 3 → 4 → 4 → 5 → 6
\`\`\`

Edge cases: k=0 (return null), some lists are empty (skip them), all lists empty (return null), one list non-empty (return it as-is). Complexity: O(n log k) time, O(k) space for heap.`,
    complexity: {"time":"O(n log k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "auto cmp=[](Node* a,Node* b){return a->data>b->data;}; priority_queue<Node*,vector<Node*>,decltype(cmp)> pq(cmp); for(Node* l:lists)if(l)pq.push(l); Node dummy(0),*t=&dummy; while(!pq.empty()){Node* cur=pq.top();pq.pop();t->next=cur;t=t->next;if(cur->next)pq.push(cur->next);} return dummy.next;",
    techniques: ["two-pointers", "recursion"],
  },
  {
    id: "cycle-start-node",
    title: "Linked List Cycle II (Find Cycle Start)",
    category: "linked-list",
    difficulty: "medium",
    description: "Find the node where the cycle begins in a linked list with a cycle.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n1 2 3 4\n1","output":"2","explanation":"Cycle starts at position 1 (0-indexed)"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 4\n-1","expected":""},
      {"input":"4\n1 2 3 4\n1","expected":"2"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, pos, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> pos;\n  Node* t = head;\n  for (int i = 0; i < pos; i++) t = t->next;\n  if (pos >= 0 && tail) tail->next = t;\n\n  // Floyd: detect cycle, then find start\n\n  cout << (start ? to_string(start->data) : \"\") << endl;\n  return 0;\n}",
    approach: `This problem asks to find the node where a cycle begins in a linked list, assuming a cycle exists. This is an extension of the cycle detection problem. The brute-force approach uses a hash set to record visited node addresses; the first node visited twice is the cycle start. This works but uses O(n) space.

Floyd's algorithm can be extended to find the cycle start using O(1) space. First, detect the cycle using slow/fast pointers until they meet. Then, reset one pointer (say slow) to head. Now advance both slow and fast one step at a time. The node where they meet again is the start of the cycle. Mathematically, if the distance from head to cycle start is a, and the distance from cycle start to the meeting point is b, then 2*(a+b) = a+b + k*C (where C is cycle length), so a = k*C - b, meaning the remaining distance from the meeting point to the cycle start equals a.

Diagram:
\`\`\`
  List: 1 → 2 → 3 → 4 → 5 → 6
              ↑         ↓
              ← ← ← ← ←
  Cycle starts at node 2.

  Phase 1: Detect cycle
    slow=1, fast=1 → slow=2, fast=3 → slow=3, fast=5
    → slow=4, fast=3 → slow=5, fast=5 → meet at 5

  Phase 2: Find cycle start
    Reset slow = head = 1
    slow=1, fast=5 → slow=2, fast=6
    → slow=3, fast=3 → meet at 3

  Wait, they meet at 3 not 2... Let me recalculate.

  The formula: after meeting, reset slow to head. Move both one step.
  Head to cycle start = a
  Cycle start to meeting point = b
  Meeting point to cycle start (remaining cycle) = C-b
  a = C-b (for the simplest case where fast makes exactly 1 extra loop)

  Actually let me use a simpler diagram:

  1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9
              ↑                   ↓
              ← ← ← ← ← ← ← ← ←

  Cycle starts at 4.
  Phase 1: slow and fast meet at some point inside the cycle.
  Phase 2: Reset slow to head, advance both 1 step at a time.
           They meet exactly at node 4 (the cycle start).
\`\`\`

Edge cases: no cycle (return null), entire list is a cycle (head→next = head, return head), cycle starts at head. Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *slow=head,*fast=head; while(fast&&fast->next){slow=slow->next;fast=fast->next->next;if(slow==fast){slow=head;while(slow!=fast){slow=slow->next;fast=fast->next;}return slow;}} return nullptr;",
    techniques: ["fast-slow-pointers"],
  },
  {
    id: "sort-list-merge",
    title: "Sort Linked List (Merge Sort)",
    category: "linked-list",
    difficulty: "medium",
    description: "Sort a linked list in O(n log n) time using merge sort.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n4 2 1 3","output":"1 2 3 4"}
    ],
    test_cases: [
      {"input":"4\n4 2 1 3","expected":"1 2 3 4"},
      {"input":"5\n-1 5 0 3 -2","expected":"-2 -1 0 3 5"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nNode* merge(Node* a, Node* b) {\n  Node dummy(0),*t=&dummy;\n  while(a&&b){if(a->data<b->data){t->next=a;a=a->next;}else{t->next=b;b=b->next;}t=t->next;} t->next=a?a:b; return dummy.next;\n}\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // sortList using merge sort\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to sort a singly linked list in O(n log n) time. Common O(n log n) sorting algorithms include merge sort, quicksort, and heapsort. For linked lists, merge sort is ideal because it requires O(1) extra space (no random access needed) and has good cache behavior.

The approach uses the top-down merge sort algorithm: find the middle using slow/fast pointers, recursively sort both halves, and merge the sorted halves using the standard two-pointer merge. The base case is a list with 0 or 1 nodes (already sorted).

Diagram:
\`\`\`
  Input: 4 → 2 → 1 → 3 → null

  Step 1: Find middle (slow=1, from 4→2→1... wait)
          4 → 2 → 1 → 3 → null
          s,f → s=2,f=1 → s=1,f=3 → middle=1

  Wait, let me redo:
  Input: 4 → 2 → 1 → 3 → null
  s=4,f=4 → s=2,f=1 → s=1,f=3 → stop at s=1
  Split into: 4→2 and 1→3

  Step 2: Recursively sort left (4→2)
          middle of 4→2: s=2,f=null → split into 4 and 2
          4 is sorted (base), 2 is sorted (base)
          Merge 4 and 2: 2→4

  Step 3: Recursively sort right (1→3)
          middle of 1→3: s=3,f=null → split into 1 and 3
          Merge 1 and 3: 1→3

  Step 4: Merge sorted halves: 2→4 and 1→3
          1 → 2 → 3 → 4 → null

  Result: 1 → 2 → 3 → 4
\`\`\`

Edge cases: empty list (return null), single node (return head as-is), already sorted list (no additional work after merge). Complexity: O(n log n) time, O(log n) recursion stack space.`,
    complexity: {"time":"O(n log n)","space":"O(log n)"},
    sheet: "Striver A2Z",
    solution_code: "if(!head||!head->next)return head; Node *slow=head,*fast=head->next; while(fast&&fast->next){slow=slow->next;fast=fast->next->next;} Node* mid=slow->next; slow->next=nullptr; return merge(sortList(head),sortList(mid));",
    techniques: ["fast-slow-pointers", "two-pointers", "recursion"],
  },
  {
    id: "partition-list",
    title: "Partition List",
    category: "linked-list",
    difficulty: "medium",
    description: "Partition linked list around a value x such that nodes < x come before nodes >= x, preserving relative order.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n1 4 3 2 5 2\n3","output":"1 2 2 4 3 5"}
    ],
    test_cases: [
      {"input":"6\n1 4 3 2 5 2\n3","expected":"1 2 2 4 3 5"},
      {"input":"2\n2 1\n2","output":"1 2"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x, val;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> val;\n\n  // two dummy lists: less and greater-or-equal\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to partition a singly linked list around a value x, such that all nodes with values less than x appear before all nodes with values greater than or equal to x, while preserving the relative order within each group. This is similar to the partition step in quicksort, but must be stable (preserve relative order).

The optimal approach uses two dummy nodes: one for the "less than x" list and one for the "greater than or equal to x" list. Traverse the original list once. For each node, if its value is less than x, append it to the "less" list; otherwise, append it to the "greater-or-equal" list. After the traversal, connect the tail of the "less" list to the head of the "greater-or-equal" list, and set the tail of the "greater-or-equal" list to null.

Diagram:
\`\`\`
  Input:  1 → 4 → 3 → 2 → 5 → 2 → null, x=3

  lessHead:    dummyL → 1 → 2 → 2
  greaterHead: dummyG → 4 → 3 → 5

  Step-by-step:
  cur=1 (1<3) → dummyL→1
  cur=4 (4>=3) → dummyG→4
  cur=3 (3>=3) → dummyG→4→3
  cur=2 (2<3) → dummyL→1→2
  cur=5 (5>=3) → dummyG→4→3→5
  cur=2 (2<3) → dummyL→1→2→2

  After traversal:
  lessTail→next = greaterHead→next (dummyG→next)
  greaterTail→next = null

  Result: 1 → 2 → 2 → 4 → 3 → 5 → null
\`\`\`

Edge cases: all nodes < x (greater list is empty, just return lessHead→next), all nodes >= x (less list is empty, return greaterHead→next), empty list (return null), single node. Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node lessD(0),greaterD(0); Node *l=&lessD,*g=&greaterD; Node* cur=head; while(cur){if(cur->data<x){l->next=cur;l=l->next;}else{g->next=cur;g=g->next;}cur=cur->next;} l->next=greaterD.next; g->next=nullptr; return lessD.next;",
    techniques: ["two-pointers", "inplace-reversal"],
  },
  {
    id: "swap-kth",
    title: "Swap Kth Nodes from Beginning and End",
    category: "linked-list",
    difficulty: "medium",
    description: "Swap the kth node from the beginning with the kth node from the end.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"5\n1 2 3 4 5\n2","output":"1 4 3 2 5","explanation":"Swap 2nd from start (2) with 2nd from end (4)"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5\n2","expected":"1 4 3 2 5"},
      {"input":"5\n1 2 3 4 5\n1","expected":"5 2 3 4 1"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, k, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> k;\n\n  // find kth from start and kth from end, swap values\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to swap the k-th node from the beginning with the k-th node from the end of a singly linked list. The brute-force approach counts the total length n, then traverses to find both nodes and swaps their data values.

The optimal approach uses two pointers: advance a pointer fast by k steps, then advance both slow (starting at head) and fast together until fast reaches the end. At that point, slow points to the k-th node from the end. Meanwhile, a third pointer kthFromStart can be found by advancing from head for k-1 steps. Swap the data values of kthFromStart and kthFromEnd. If k is greater than n/2, the two positions might overlap or swap with themselves (no-op).

Diagram:
\`\`\`
  Input: 1 → 2 → 3 → 4 → 5 → null, k=2

  Find kth from start (k=2):
    kthStart = head, advance k-1=1 step → node 2

  Find kth from end:
    fast = head, advance k=2 steps: fast=1→2→3
    slow = head
    While fast→next:
      slow=1→2, fast=3→4
      slow=2→3, fast=4→5
      slow=3→4, fast=5→null (stop)
    kthEnd = slow = node 4

  Swap: node 2 and node 4 values
  Result: 1 → 4 → 3 → 2 → 5 → null

  k=1 case (swap first and last):
    kthStart = head (1)
    fast advances 1 step, slow stays until fast at end
    kthEnd = tail (5)
    Swap 1 and 5
    Result: 5 → 2 → 3 → 4 → 1
\`\`\`

Edge cases: k=1 (swap first and last), k > n/2 (the two pointers might be same node), k == n (swap last with first, same as k=1 reversed), single node (swap is no-op). Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *fast=head,*slow=head,*kthStart=head; for(int i=1;i<k;i++)kthStart=kthStart->next; for(int i=0;i<k;i++)fast=fast->next; while(fast){slow=slow->next;fast=fast->next;} swap(kthStart->data,slow->data); return head;",
    techniques: ["two-pointers"],
  },
  {
    id: "delete-middle-node",
    title: "Delete the Middle Node",
    category: "linked-list",
    difficulty: "medium",
    description: "Delete the middle node of a linked list. For even length, delete the second middle.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n1 2 3 4 5","output":"1 2 4 5"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5","expected":"1 2 4 5"},
      {"input":"6\n1 2 3 4 5 6","expected":"1 2 3 5 6"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // slow/fast with prev pointer to delete middle\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to delete the middle node of a singly linked list. For an odd-length list, delete the exact middle node. For an even-length list, delete the second middle node (same definition as "middle of linked list"). The brute-force approach counts nodes in one pass, then finds and deletes the middle in a second pass.

The optimal one-pass approach uses the slow/fast pointer technique with an additional prev pointer. Initialize slow = head, fast = head, and prev = nullptr. Advance slow by 1 and fast by 2. Keep track of prev as the node before slow. When fast reaches the end, slow is at the middle, and prev is the node before it. Delete slow by setting prev→next = slow→next. For the special case where prev is still null (single or two nodes), adjust the head.

Diagram:
\`\`\`
  Input: 1 → 2 → 3 → 4 → 5 → null

  Step 1: slow=1, fast=1, prev=null
  Step 2: slow=2, fast=3, prev=1
  Step 3: slow=3, fast=5, prev=2
  Step 4: fast→next is null → stop. Middle = slow = 3.

  Delete 3: prev→next = slow→next → 2→next = 4
  Result: 1 → 2 → 4 → 5 → null

  Even case (1→2→3→4→5→6):
  Step 1: slow=1, fast=1, prev=null
  Step 2: slow=2, fast=3, prev=1
  Step 3: slow=3, fast=5, prev=2
  Step 4: slow=4, fast=null → stop. Middle = slow = 4.

  Delete 4: prev→next = slow→next → 3→next = 5
  Result: 1 → 2 → 3 → 5 → 6 → null
\`\`\`

Edge cases: single node (return null after deletion), two nodes (delete second node, return first). Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "if(!head||!head->next)return nullptr; Node *slow=head,*fast=head,*prev=nullptr; while(fast&&fast->next){prev=slow;slow=slow->next;fast=fast->next->next;} prev->next=slow->next; return head;",
    techniques: ["fast-slow-pointers", "inplace-reversal"],
  },
  {
    id: "twin-sum",
    title: "Maximum Twin Sum of Linked List",
    category: "linked-list",
    difficulty: "medium",
    description: "Find the maximum sum of twin nodes (i-th and (n-1-i)-th nodes).",
    constraints: "2 <= n <= 10^5, n is even",
    examples: [
      {"input":"4\n4 2 2 3","output":"7","explanation":"Twins: (4,3)=7, (2,2)=4 → max=7"}
    ],
    test_cases: [
      {"input":"4\n4 2 2 3","expected":"7"},
      {"input":"6\n1 2 3 4 5 6","expected":"7"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // find middle, reverse second half, compute twin sums\n\n  int maxSum = 0;\n  cout << maxSum << endl;\n  return 0;\n}",
    approach: `This problem asks to find the maximum sum of twin nodes in a linked list of even length. Twin nodes are defined as the i-th node from the start and the i-th node from the end (0-indexed). The brute-force approach copies all values to an array and computes the sum of symmetric pairs, using O(n) extra space.

The optimal O(1) space approach uses three phases: find the middle using slow/fast pointers, reverse the second half of the list, then pair up nodes from the first half and the reversed second half to compute twin sums. Keep track of the maximum sum encountered. Since the list length is even, both halves have exactly n/2 nodes.

Diagram:
\`\`\`
  Input: 4 → 2 → 2 → 3 → null

  Phase 1: Find middle
    slow=4,fast=4 → slow=2,fast=2 → slow=2,fast=null
    Middle = second 2 (start of second half)

  Phase 2: Reverse second half
    Original: 2 → 3 → null
    Reversed: 3 → 2 → null

  Phase 3: Compute twin sums
    First half:  4 → 2
    Reversed:    3 → 2
    Twin 1: 4 + 3 = 7
    Twin 2: 2 + 2 = 4
    Max sum = 7

  Example: 1 → 2 → 3 → 4 → 5 → 6 → null
    First half: 1 → 2 → 3
    Reversed 2nd: 6 → 5 → 4
    Twins: 1+6=7, 2+5=7, 3+4=7 → max=7
\`\`\`

The problem guarantees n is even, so no middle node ambiguity. Edge cases: two nodes (single twin pair, return their sum), n=2 is the minimum case. Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *slow=head,*fast=head; while(fast&&fast->next){slow=slow->next;fast=fast->next->next;} Node *prev=nullptr,*cur=slow; while(cur){Node* n=cur->next;cur->next=prev;prev=cur;cur=n;} int mx=0; Node *a=head,*b=prev; while(b){mx=max(mx,a->data+b->data);a=a->next;b=b->next;} cout<<mx;",
    techniques: ["fast-slow-pointers", "inplace-reversal"],
  },
  {
    id: "double-num-ll",
    title: "Double a Number Represented as Linked List",
    category: "linked-list",
    difficulty: "medium",
    description: "Given a number as a linked list (most significant digit first), double it and return the result as a linked list.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"3\n1 8 9","output":"3 7 8","explanation":"189 * 2 = 378"}
    ],
    test_cases: [
      {"input":"3\n1 8 9","expected":"3 7 8"},
      {"input":"2\n9 9","expected":"1 9 8"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // reverse, double with carry, reverse back\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to double a number stored as a linked list with the most significant digit first. For example, 1→8→9 represents 189, and 189*2 = 378, which should be returned as 3→7→8. The challenge is that the most significant digit is at the head, but carry propagation goes from least significant to most significant.

The optimal approach reverses the linked list first so that the least significant digit is at the head. Then traverse the reversed list, computing new_digit = (digit * 2 + carry) % 10 and carry = (digit * 2 + carry) / 10 for each node. If there is a carry after processing all nodes, append a new node with value carry. Finally, reverse the result back to restore the original order (most significant first).

Diagram:
\`\`\`
  Input: 1 → 8 → 9 → null  (number 189)

  Step 1: Reverse
    9 → 8 → 1 → null

  Step 2: Double with carry
    cur=9: val=9*2+0=18 → digit=8, carry=1
    cur=8: val=8*2+1=17 → digit=7, carry=1
    cur=1: val=1*2+1=3  → digit=3, carry=0
    Result: 8 → 7 → 3 → null

  Step 3: Reverse back
    3 → 7 → 8 → null

  Result: 3 → 7 → 8  (number 378) ✓

  Edge case (99*2):
    9→9 reversed → 9→9
    9*2=18 → digit=8, carry=1
    9*2+1=19 → digit=9, carry=1
    carry=1 after loop → append new node 1
    Result: 8→9→1 reversed → 1→9→8 (198) ✓
\`\`\`

Edge cases: single digit (e.g., 5→1→0, 9→1→8), overflow to extra digit (e.g., 5 * 2 = 10 becomes 1→0), empty list. Complexity: O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node* rev=nullptr,*cur=head,*t; while(cur){Node* n=cur->next;cur->next=rev;rev=cur;cur=n;} cur=rev; int carry=0; while(cur){int val=cur->data*2+carry;cur->data=val%10;carry=val/10;t=cur;cur=cur->next;} if(carry){Node* nn=new Node(carry);t->next=nn;} Node* res=nullptr; cur=rev; while(cur){Node* n=cur->next;cur->next=res;res=cur;cur=n;} return res;",
    techniques: ["inplace-reversal"],
  },
  {
    id: "insert-gcd-ll",
    title: "Insert Greatest Common Divisor Between Adjacent Nodes",
    category: "linked-list",
    difficulty: "medium",
    description: "Insert a new node with the GCD of adjacent node values between each pair of adjacent nodes.",
    constraints: "1 <= n <= 10^5, 1 <= node values <= 1000",
    examples: [
      {"input":"3\n18 6 10","output":"18 6 6 2 10","explanation":"GCD(18,6)=6, GCD(6,10)=2"}
    ],
    test_cases: [
      {"input":"3\n18 6 10","expected":"18 6 6 2 10"},
      {"input":"2\n7 3","expected":"7 1 3"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint gcd(int a, int b) {\n  while (b) { int t = b; b = a % b; a = t; }\n  return a;\n}\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  // traverse, insert GCD between each pair\n\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `This problem asks to insert a new node containing the Greatest Common Divisor (GCD) of two adjacent node values between every pair of adjacent nodes in a linked list. For example, for 18→6→10, GCD(18,6)=6 and GCD(6,10)=2, so the result is 18→6→6→2→10.

The optimal approach is a simple single traversal with a single pointer. Traverse the list with cur starting at head. While cur→next is not null: compute g = gcd(cur→data, cur→next→data). Create a new node with value g. Insert it between cur and cur→next: new→next = cur→next, cur→next = new. Then advance cur = new→next (skip past the newly inserted node to the original next node).

Diagram:
\`\`\`
  Input: 18 → 6 → 10 → null

  Step 1: cur=18, cur→next=6
    GCD(18,6) = 6
    Insert 6 between 18 and 6:
    18 → 6(gcd) → 6 → 10 → null
    cur = new→next = 6

  Step 2: cur=6, cur→next=10
    GCD(6,10) = 2
    Insert 2 between 6 and 10:
    18 → 6 → 6 → 2 → 10 → null
    cur = new→next = 10 (null, stop)

  Result: 18 → 6 → 6 → 2 → 10 → null

  Simple case (7→3):
    GCD(7,3) = 1
    Insert 1 between 7 and 3:
    7 → 1 → 3 → null
\`\`\`

Edge cases: empty list (return null), single node (return head as-is, no pairs to insert GCD between), two nodes (one GCD insertion). Complexity: O(n) time, O(1) extra space (excluding the new nodes).`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node* cur=head; while(cur&&cur->next){int g=gcd(cur->data,cur->next->data);Node* nn=new Node(g);nn->next=cur->next;cur->next=nn;cur=nn->next;} return head;",
    techniques: ["two-pointers"],
  },
  {
    id: "lru-cache",
    title: "Design LRU Cache",
    category: "linked-list",
    difficulty: "medium",
    description: "Design a data structure that supports get(key) and put(key,value) in O(1) with Least Recently Used eviction policy.",
    constraints: "1 <= capacity <= 3000, 1 <= operations <= 10^5",
    techniques: ["design-ds"],
    examples: [{"input":"2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3","output":"1 -1 3"}],
    test_cases: [{"input":"2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3","expected":"1 -1 3"}],
    solution_template: "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nstruct Node {\n  int key, val;\n  Node *prev, *next;\n  Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}\n};\n\nclass LRUCache {\n  int cap;\n  unordered_map<int, Node*> mp;\n  Node *head, *tail;\n  void remove(Node* n) { n->prev->next = n->next; n->next->prev = n->prev; }\n  void insertFront(Node* n) {\n    n->next = head->next; n->prev = head;\n    head->next->prev = n; head->next = n;\n  }\npublic:\n  LRUCache(int capacity) {\n    cap = capacity;\n    head = new Node(-1,-1); tail = new Node(-1,-1);\n    head->next = tail; tail->prev = head;\n  }\n  int get(int key) {\n    if (!mp.count(key)) return -1;\n    Node* n = mp[key]; remove(n); insertFront(n);\n    return n->val;\n  }\n  void put(int key, int value) {\n    if (mp.count(key)) {\n      Node* n = mp[key]; n->val = value;\n      remove(n); insertFront(n); return;\n    }\n    if (mp.size() == cap) {\n      Node* lru = tail->prev;\n      mp.erase(lru->key); remove(lru); delete lru;\n    }\n    Node* nn = new Node(key, value);\n    mp[key] = nn; insertFront(nn);\n  }\n};\n\nint main() {\n  int cap, q; cin >> cap >> q;\n  LRUCache cache(cap);\n  while (q--) {\n    string op; int k, v;\n    cin >> op >> k;\n    if (op == \"get\") cout << cache.get(k) << endl;\n    else { cin >> v; cache.put(k, v); }\n  }\n  return 0;\n}",
    approach: `Design a cache with O(1) get/put that evicts the LRU item. Combine a doubly linked list (for O(1) reordering) with a hash map (for O(1) lookup). The list maintains usage order: MRU at head, LRU at tail. The map maps keys to list nodes.

On get(key): if found, move its node to head (remove+insertFront) and return value. On put(key,val): if key exists, update and move to front. If at capacity, remove tail node (LRU), erase from map, then insert new node at front.

Diagram:
\`\`\`
lru-cache: capacity=3

put(1,1): head <-> 1 <-> tail
put(2,2): head <-> 2 <-> 1 <-> tail
put(3,3): head <-> 3 <-> 2 <-> 1 <-> tail  (full)
get(2):   head <-> 2 <-> 3 <-> 1 <-> tail  (2 moved to front)
put(4,4): evict 1 (LRU at tail)
          head <-> 4 <-> 2 <-> 3 <-> tail

Map: {1:n1, 2:n2, 3:n3} -> after evict: {2:n2, 3:n3, 4:n4}
\`\`\`

Edge cases: get missing key (-1), capacity=1. O(1) per op, O(capacity) space.`,
    complexity: {"time":"O(1) per op","space":"O(capacity)"},
    sheet: "Striver A2Z",
    solution_code: "class LRUCache{int c;unordered_map<int,Node*> m;Node*h=new Node(-1,-1),*t=new Node(-1,-1);void rm(Node*n){n->p->nxt=n->nxt;n->nxt->p=n->p;}void ins(Node*n){n->nxt=h->nxt;n->p=h;h->nxt->p=n;h->nxt=n;}public:LRUCache(int cap){c=cap;h->nxt=t;t->p=h;}int get(int k){if(!m.count(k))return-1;Node*n=m[k];rm(n);ins(n);return n->v;}void put(int k,int v){if(m.count(k)){Node*n=m[k];n->v=v;rm(n);ins(n);return;}if(m.size()==c){Node*l=t->p;m.erase(l->k);rm(l);}Node*nn=new Node(k,v);m[k]=nn;ins(nn);}};",
  },
  {
    id: "lfu-cache",
    title: "Design LFU Cache",
    category: "linked-list",
    difficulty: "hard",
    description: "Design a data structure supporting get/put in O(1) with Least Frequently Used eviction (ties broken by LRU).",
    constraints: "1 <= capacity <= 3000, 1 <= operations <= 10^5",
    techniques: ["design-ds"],
    examples: [{"input":"2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3\nget 1","output":"1 -1 3 1"}],
    test_cases: [{"input":"2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3\nget 1","expected":"1 -1 3 1"}],
    solution_template: "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nstruct Node {\n  int key, val, freq;\n  Node *prev, *next;\n  Node(int k, int v) : key(k), val(v), freq(1), prev(nullptr), next(nullptr) {}\n};\n\nstruct FreqList {\n  Node *head, *tail;\n  FreqList() {\n    head = new Node(-1,-1); tail = new Node(-1,-1);\n    head->next = tail; tail->prev = head;\n  }\n  void remove(Node* n) { n->prev->next = n->next; n->next->prev = n->prev; }\n  void pushFront(Node* n) {\n    n->next = head->next; n->prev = head;\n    head->next->prev = n; head->next = n;\n  }\n  bool empty() { return head->next == tail; }\n  Node* popBack() { Node* n = tail->prev; remove(n); return n; }\n};\n\nclass LFUCache {\n  int cap, minFreq;\n  unordered_map<int, Node*> kn;\n  unordered_map<int, FreqList*> fl;\npublic:\n  LFUCache(int cap) : cap(cap), minFreq(0) {}\n  int get(int key) {\n    if (!kn.count(key)) return -1;\n    Node* n = kn[key]; update(n); return n->val;\n  }\n  void put(int key, int value) {\n    if (cap == 0) return;\n    if (kn.count(key)) { Node* n = kn[key]; n->val = value; update(n); return; }\n    if (kn.size() == cap) {\n      Node* ev = fl[minFreq]->popBack();\n      kn.erase(ev->key); delete ev;\n    }\n    Node* nn = new Node(key, value);\n    kn[key] = nn; minFreq = 1;\n    if (!fl.count(1)) fl[1] = new FreqList();\n    fl[1]->pushFront(nn);\n  }\n  void update(Node* n) {\n    int of = n->freq;\n    fl[of]->remove(n);\n    if (fl[of]->empty() && of == minFreq) minFreq++;\n    n->freq++;\n    int nf = n->freq;\n    if (!fl.count(nf)) fl[nf] = new FreqList();\n    fl[nf]->pushFront(n);\n  }\n};\n\nint main() {\n  int cap, q; cin >> cap >> q;\n  LFUCache cache(cap);\n  while (q--) {\n    string op; int k, v;\n    cin >> op >> k;\n    if (op == \"get\") cout << cache.get(k) << endl;\n    else { cin >> v; cache.put(k, v); }\n  }\n  return 0;\n}",
    approach: `Design a cache with O(1) get/put that evicts the least frequently used item. When multiple items share the minimum frequency, the LRU among them is evicted. Maintain: (1) key->node map, (2) frequency->FreqList map (each FreqList is a DLL with MRU at front, LRU at back), (3) global minFreq.

On get: increment node's frequency, move it from old FreqList to new one. On put: if at capacity, evict the LRU of the minFreq FreqList. Insert new node with freq=1.


Diagram:
\`\`\`
lfu-cache: capacity=3

put(1,1): freq1: [1]            minFreq=1
put(2,2): freq1: [2,1]          minFreq=1
put(3,3): freq1: [3,2,1]        minFreq=1 (full)
get(1):   freq1: [3,2]          (1->freq2)
          freq2: [1]            minFreq=1
put(4,4): evict LRU of freq1 (2)
          freq1: [4,3]          minFreq=1
          freq2: [1]

freqList[1]: head<->4<->3<->tail
freqList[2]: head<->1<->tail
\`\`\`

Edge: capacity=0 (return -1 for gets). O(1) per op, O(capacity) space.`,
    complexity: {"time":"O(1) per op","space":"O(capacity)"},
    sheet: "Striver A2Z",
    solution_code: "class LFUCache{int c,mf;unordered_map<int,Node*> kn;unordered_map<int,FreqList*> fl;public:LFUCache(int cap){c=cap;mf=0;}int get(int k){if(!kn.count(k))return-1;Node*n=kn[k];up(n);return n->v;}void put(int k,int v){if(!c)return;if(kn.count(k)){Node*n=kn[k];n->v=v;up(n);return;}if(kn.size()==c){Node*e=fl[mf]->pop();kn.erase(e->k);}Node*nn=new Node(k,v);kn[k]=nn;mf=1;if(!fl.count(1))fl[1]=new FreqList();fl[1]->push(nn);}void up(Node*n){int of=n->f;fl[of]->rem(n);if(fl[of]->empty()&&of==mf)mf++;n->f++;if(!fl.count(n->f))fl[n->f]=new FreqList();fl[n->f]->push(n);}};",
  },
  {
    id: "insert-delete-getrandom",
    title: "Insert Delete GetRandom O(1)",
    category: "linked-list",
    difficulty: "medium",
    description: "Design a data structure supporting insert, remove, and getRandom in O(1) average time.",
    constraints: "1 <= operations <= 10^5",
    techniques: ["design-ds"],
    examples: [{"input":"insert 1 insert 2 remove 1 getRandom","output":"2"}],
    test_cases: [{"input":"insert 1 insert 2 remove 1 getRandom","expected":"2"},{"input":"insert 1 remove 2 getRandom","expected":"1"}],
    solution_template: "#include <iostream>\n#include <unordered_map>\n#include <vector>\n#include <cstdlib>\nusing namespace std;\n\nclass RandomizedSet {\n  unordered_map<int, int> mp;\n  vector<int> arr;\npublic:\n  RandomizedSet() { srand(time(0)); }\n  bool insert(int val) {\n    if (mp.count(val)) return false;\n    mp[val] = arr.size();\n    arr.push_back(val);\n    return true;\n  }\n  bool remove(int val) {\n    if (!mp.count(val)) return false;\n    int idx = mp[val];\n    int last = arr.back();\n    arr[idx] = last;\n    mp[last] = idx;\n    arr.pop_back();\n    mp.erase(val);\n    return true;\n  }\n  int getRandom() {\n    return arr[rand() % arr.size()];\n  }\n};\n\nint main() {\n  int q; cin >> q;\n  RandomizedSet rs;\n  while (q--) {\n    string op; int x; cin >> op >> x;\n    if (op == \"insert\") cout << rs.insert(x) << endl;\n    else if (op == \"remove\") cout << rs.remove(x) << endl;\n    else cout << rs.getRandom() << endl;\n  }\n  return 0;\n}",
    approach: `Design a set with O(1) insert, remove, getRandom using hash map + dynamic array. The map stores value->index in array. Insert: push to array, store index in map. Remove: swap with last element (to avoid O(n) shift), update map, pop back. getRandom: random index into array.


Diagram:
\`\`\`
insert-delete-getrandom:

insert(1): arr=[1], mp={1:0}
insert(2): arr=[1,2], mp={1:0, 2:1}

remove(1):
  idx = mp[1] = 0
  last = arr.back() = 2
  arr[0] = 2           (copy last to idx)
  mp[2] = 0            (update last's index)
  arr.pop_back()       -> arr=[2]
  mp.erase(1)          -> mp={2:0}

getRandom(): return arr[rand()%1] = 2

Swap-with-last trick:
  Before: [1, 2]    mp: 1->0, 2->1
             ^  ^
            idx last
  After:  [2]       mp: 2->0
\`\`\`

Edge: insert existing (false), remove missing (false), getRandom on empty (undefined). O(1) avg, O(n) space.`,
    complexity: {"time":"O(1) avg per op","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "unordered_map<int,int> m;vector<int> a;auto ins=[&](int v){if(m.count(v))return 0;m[v]=a.size();a.push_back(v);return 1;};auto rem=[&](int v){if(!m.count(v))return 0;int i=m[v],l=a.back();a[i]=l;m[l]=i;a.pop_back();m.erase(v);return 1;};auto rnd=[&]{return a[rand()%a.size()];};",
  },
  {
    id: "time-based-kv-store",
    title: "Time-Based Key-Value Store",
    category: "linked-list",
    difficulty: "medium",
    description: "Design a key-value store where each key has multiple values at different timestamps; get(key, timestamp) returns the value at or before the given timestamp.",
    constraints: "1 <= operations <= 10^5",
    techniques: ["design-ds"],
    examples: [{"input":"set foo 1 10 set foo 2 20 get foo 15 get foo 25","output":"1 2"}],
    test_cases: [{"input":"set foo 1 10 set foo 2 20 get foo 15","expected":"1"},{"input":"set foo 1 10 get foo 5","expected":""}],
    solution_template: "#include <iostream>\n#include <unordered_map>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass TimeMap {\n  unordered_map<string, vector<pair<int, string>>> mp;\npublic:\n  void set(string key, string value, int timestamp) {\n    mp[key].push_back({timestamp, value});\n  }\n  string get(string key, int timestamp) {\n    if (!mp.count(key)) return \"\";\n    auto& v = mp[key];\n    int lo = 0, hi = v.size()-1, ans = -1;\n    while (lo <= hi) {\n      int mid = (lo + hi) / 2;\n      if (v[mid].first <= timestamp) { ans = mid; lo = mid + 1; }\n      else hi = mid - 1;\n    }\n    return ans == -1 ? \"\" : v[ans].second;\n  }\n};\n\nint main() {\n  int q; cin >> q;\n  TimeMap tm;\n  while (q--) {\n    string op, k, v; int t;\n    cin >> op >> k;\n    if (op == \"set\") { cin >> v >> t; tm.set(k, v, t); }\n    else { cin >> t; cout << tm.get(k, t) << endl; }\n  }\n  return 0;\n}",
    approach: `Design a KV store where each key has timestamped values. set(key, val, ts) appends a (ts, val) pair. get(key, ts) returns the value with the largest timestamp <= ts.

Use a hash map from key to vector of (timestamp, value). Timestamps are strictly increasing in set calls, so just push_back. For get, binary search on the vector to find the rightmost timestamp <= query.


Diagram:
\`\`\`
time-based-kv-store:

set(foo, 1, 10):  foo -> [(10, '1')]
set(foo, 2, 20):  foo -> [(10, '1'), (20, '2')]

get(foo, 15):
  binary search [10, 20]:
  mid=0: 10 <= 15 -> ans=0, lo=1
  mid=1: 20 > 15  -> hi=0
  return v[0].second = '1'

get(foo, 5):
  mid=0: 10 > 5 -> hi=-1
  ans=-1 -> return ''

get(foo, 25):
  mid=0: 10 <= 25 -> ans=0, lo=1
  mid=1: 20 <= 25 -> ans=1, lo=2
  return v[1].second = '2'
\`\`\`

Edge: key not found (return ''), ts before all values (return ''). O(1) set, O(log n) get. Space: O(entries).`,
    complexity: {"time":"O(1) set, O(log n) get","space":"O(entries)"},
    sheet: "Striver A2Z",
    solution_code: "unordered_map<string,vector<pair<int,string>>> m;auto st=[&](string k,string v,int t){m[k].push_back({t,v});};auto gt=[&](string k,int t)->string{if(!m.count(k))return\"\";auto&v=m[k];int l=0,r=v.size()-1,a=-1;while(l<=r){int md=(l+r)/2;if(v[md].first<=t){a=md;l=md+1;}else r=md-1;}return a==-1?\"\":v[a].second;};",
  },
  {
    id: "snapshot-array",
    title: "Snapshot Array",
    category: "linked-list",
    difficulty: "medium",
    description: "Design an array supporting set(index, val), snap() returning snap_id, and get(index, snap_id) returning value at that snapshot.",
    constraints: "1 <= length <= 50000, 1 <= operations <= 50000",
    techniques: ["design-ds"],
    examples: [{"input":"3\nset 0 5\nsnap\nset 0 6\nsnap\nget 0 0","output":"5"}],
    test_cases: [{"input":"3\nset 0 5\nsnap\nset 0 6\nsnap\nget 0 0","expected":"5"},{"input":"3\nset 0 1\nget 0 0","expected":"0"}],
    solution_template: "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass SnapshotArray {\n  vector<unordered_map<int, int>> snaps;\n  unordered_map<int, int> cur;\n  int snapId;\npublic:\n  SnapshotArray(int len) { snapId = 0; }\n  void set(int idx, int val) { cur[idx] = val; }\n  int snap() {\n    snaps.push_back(cur);\n    return snapId++;\n  }\n  int get(int idx, int snap_id) {\n    for (int id = snap_id; id >= 0; id--)\n      if (snaps[id].count(idx)) return snaps[id][idx];\n    return 0;\n  }\n};\n\nint main() {\n  int len, q; cin >> len >> q;\n  SnapshotArray sa(len);\n  while (q--) {\n    string op; int idx, val;\n    cin >> op >> idx;\n    if (op == \"set\") { cin >> val; sa.set(idx, val); }\n    else if (op == \"snap\") cout << sa.snap() << endl;\n    else { cin >> val; cout << sa.get(idx, val) << endl; }\n  }\n  return 0;\n}",
    approach: `Design an array supporting snapshots. set(idx, val) updates the current state. snap() records the current state and returns an ID. get(idx, snap_id) returns the value at that snapshot.

Optimized approach: maintain a list of maps per snapshot, storing only changed indices. For each index, track a history of (snap_id, value) pairs. When getting, binary search for the latest snap_id <= requested.


Diagram:
\`\`\`
snapshot-array: length=3

set(0,5):  cur={0:5}
snap()=0:  snaps[0]={0:5}, snapId=1
set(0,6):  cur={0:6}
snap()=1:  snaps[1]={0:6}, snapId=2

get(0,0): search snaps[0] -> {0:5} -> return 5
get(0,1): search snaps[1] -> {0:6} -> return 6
get(1,0): search snaps[0] -> no key 1 -> return 0 (default)

Alternative index-history view:
  hist[0] = [(snap=0,5), (snap=1,6)]
  hist[1] = [(snap=0,0)]  (default)
\`\`\`

Edge: get on unset index (return 0), query snap_id before any set (return 0). O(1) set/snap, O(log k) get. Space: O(changes).`,
    complexity: {"time":"O(1) set/snap, O(log k) get","space":"O(changes)"},
    sheet: "Striver A2Z",
    solution_code: "vector<unordered_map<int,int>> ss;unordered_map<int,int> cur;int sid=0;auto st=[&](int i,int v){cur[i]=v;};auto sp=[&]{ss.push_back(cur);return sid++;};auto gt=[&](int i,int si){for(int id=si;id>=0;id--)if(ss[id].count(i))return ss[id][i];return 0;};",
  },
  {
    id: "middle-node-list",
    title: "Middle of the Linked List",
    category: "linked-list",
    difficulty: "easy",
    description: "Return the middle node of a linked list using slow and fast pointers. If even length, return the second middle.",
    constraints: "1 <= n <= 10^5",
    techniques: ["fast-slow-pointers"],
    examples: [{"input":"5\n1 2 3 4 5","output":"3"}],
    test_cases: [{"input":"5\n1 2 3 4 5","expected":"3"},{"input":"6\n1 2 3 4 5 6","expected":"4"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) {\n    cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  Node *slow = head, *fast = head;\n  while (fast && fast->next) {\n    slow = slow->next;\n    fast = fast->next->next;\n  }\n  cout << slow->data << endl;\n  return 0;\n}",
    approach: `Find the middle node using slow/fast pointers. Initialize both at head. Slow moves 1 step, fast moves 2 steps per iteration. When fast reaches the end (null for even, fast->next null for odd), slow is at the middle. For even lists, this returns the second middle node.


Diagram:
\`\`\`
middle-node-list:
  1 -> 2 -> 3 -> 4 -> 5 -> null
  s=1, f=1
  s=2, f=3
  s=3, f=5 -> fast->next is null -> stop, slow=3 (middle)

  Even: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
  s=1, f=1 -> s=2, f=3 -> s=3, f=5 -> s=4, f=null
  slow=4 (second middle)
\`\`\`

Edge: empty (null), single node (return head). O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *s=head,*f=head; while(f&&f->next){s=s->next;f=f->next->next;} cout<<s->data;",
  },
  {
    id: "detect-cycle-start",
    title: "Linked List Cycle II (Detect Cycle Start)",
    category: "linked-list",
    difficulty: "medium",
    description: "Detect if a linked list has a cycle and return the node where the cycle begins.",
    constraints: "1 <= n <= 10^5",
    techniques: ["fast-slow-pointers"],
    examples: [{"input":"4\n1 2 3 4\n1","output":"2","explanation":"Cycle at position 1 (0-indexed)"}],
    test_cases: [{"input":"4\n1 2 3 4\n-1","expected":""},{"input":"4\n1 2 3 4\n1","expected":"2"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, pos, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> pos;\n  Node* t = head;\n  for (int i = 0; i < pos; i++) t = t->next;\n  if (pos >= 0 && tail) tail->next = t;\n\n  Node *slow = head, *fast = head;\n  while (fast && fast->next) {\n    slow = slow->next; fast = fast->next->next;\n    if (slow == fast) {\n      slow = head;\n      while (slow != fast) { slow = slow->next; fast = fast->next; }\n      cout << slow->data << endl; return 0;\n    }\n  }\n  cout << endl;\n  return 0;\n}",
    approach: `Floyd's cycle detection extended to find cycle start. Phase 1: slow+1, fast+2 until they meet inside the cycle. Phase 2: reset slow to head, advance both one step at a time. They meet at the cycle start. Proof: if a = distance head->cycle start, b = cycle start->meeting point, C = cycle length, then a = k*C - b.


Diagram:
\`\`\`
detect-cycle-start:
  3 -> 2 -> 0 -> -4
       ^          |
       |__________|

  Phase 1: Detect cycle
  s=3,f=3 -> s=2,f=0 -> s=0,f=2 -> s=-4,f=0 -> s=2,f=2 -> meet at 2

  Phase 2: Find start
  s=head=3, f=2
  s=2, f=0 -> s=0, f=-4 -> s=-4, f=2 -> s=2, f=2 -> meet at 2 (start)
\`\`\`

Edge: no cycle (print empty). O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node *s=head,*f=head; while(f&&f->next){s=s->next;f=f->next->next;if(s==f){s=head;while(s!=f){s=s->next;f=f->next;}cout<<s->data;return 0;}} cout<<endl;",
  },
  {
    id: "reverse-k-group-list",
    title: "Reverse Nodes in K-Group",
    category: "linked-list",
    difficulty: "hard",
    description: "Reverse the nodes of a linked list k at a time. If the number of nodes is not a multiple of k, leftover nodes remain in original order.",
    constraints: "1 <= n <= 10^4, 1 <= k <= n",
    techniques: ["inplace-reversal"],
    examples: [{"input":"5\n1 2 3 4 5\n3","output":"3 2 1 4 5"}],
    test_cases: [{"input":"5\n1 2 3 4 5\n3","expected":"3 2 1 4 5"},{"input":"4\n1 2 3 4\n2","expected":"2 1 4 3"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nNode* reverseKGroup(Node* head, int k) {\n  Node* cur = head;\n  int cnt = 0;\n  while (cur && cnt < k) { cur = cur->next; cnt++; }\n  if (cnt < k) return head;\n  Node *prev = nullptr, *curr = head;\n  for (int i = 0; i < k; i++) {\n    Node* n = curr->next;\n    curr->next = prev;\n    prev = curr;\n    curr = n;\n  }\n  head->next = reverseKGroup(curr, k);\n  return prev;\n}\n\nint main() {\n  int n, k, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> k;\n  head = reverseKGroup(head, k);\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `Recursively reverse in groups of k. First, check if at least k nodes remain. If not, return head. If yes, reverse first k using three pointers, then recursively process the rest. The original head (now tail of reversed group) points to result of recursive call.


Diagram:
\`\`\`
reverse-k-group-list:
  1 -> 2 -> 3 -> 4 -> 5 -> null, k=2

  Group 1 (1->2):
    p=null, c=1 -> n=2, 1->null, p=1, c=2
               -> n=3, 2->1, p=2, c=3
    1->next = reverseKGroup(3->4->5, 2)

  Group 2 (3->4):
    p=null, c=3 -> 3->null, p=3, c=4
               -> n=5, 4->3, p=4, c=5
    3->next = reverseKGroup(5, 2)

  Group 3 (5): cnt=1 < k=2 -> return 5

  Result: 2 -> 1 -> 4 -> 3 -> 5 -> null
\`\`\`

Edge: k=1 (no change), k=n (reverse all), leftovers stay in order. O(n) time, O(n/k) stack space.`,
    complexity: {"time":"O(n)","space":"O(n/k)"},
    sheet: "Striver A2Z",
    solution_code: "Node* cur=head;int cnt=0;while(cur&&cnt<k){cur=cur->next;cnt++;}if(cnt<k)return head;Node *p=nullptr,*c=head;for(int i=0;i<k;i++){Node* n=c->next;c->next=p;p=c;c=n;}head->next=reverseKGroup(cur,k);return p;",
  },
  {
    id: "swap-nodes-pairs",
    title: "Swap Nodes in Pairs",
    category: "linked-list",
    difficulty: "medium",
    description: "Swap every two adjacent nodes in a linked list using in-place pointer manipulation.",
    constraints: "1 <= n <= 10^5",
    techniques: ["inplace-reversal"],
    examples: [{"input":"4\n1 2 3 4","output":"2 1 4 3"}],
    test_cases: [{"input":"4\n1 2 3 4","expected":"2 1 4 3"},{"input":"5\n1 2 3 4 5","expected":"2 1 4 3 5"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n\n  Node dummy(0);\n  dummy.next = head;\n  Node* prev = &dummy;\n  while (prev->next && prev->next->next) {\n    Node* first = prev->next;\n    Node* second = first->next;\n    first->next = second->next;\n    second->next = first;\n    prev->next = second;\n    prev = first;\n  }\n  head = dummy.next;\n  Node* t = head;\n  while (t) { cout << t->data << \" \"; t = t->next; }\n  return 0;\n}",
    approach: `Swap adjacent nodes by rewiring pointers using a dummy node. This is reverse-k-group with k=2. For each pair (first, second): first->next = second->next, second->next = first, prev->next = second. Advance prev to first and continue. The dummy node handles the head swap uniformly.


Diagram:
\`\`\`
swap-nodes-pairs:
  1 -> 2 -> 3 -> 4 -> null

  dummy -> 1 -> 2 -> 3 -> 4 -> null
  prev    first second

  Swap (1,2): 1->3, 2->1, dummy->2, prev=1
  dummy -> 2 -> 1 -> 3 -> 4 -> null
               prev first second

  Swap (3,4): 3->null, 4->3, 1->4, prev=3
  dummy -> 2 -> 1 -> 4 -> 3 -> null

  Result: 2 -> 1 -> 4 -> 3 -> null

  Odd: 1->2->3 -> null   ->   2->1->3->null
\`\`\`

Edge: empty, single node (return head), odd nodes (last stays). O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "Node d(0); d.next=head; Node* p=&d; while(p->next&&p->next->next){Node* f=p->next,*s=f->next;f->next=s->next;s->next=f;p->next=s;p=f;} head=d.next;",
  },
  {
    id: "rotate-right",
    title: "Rotate Linked List by K Positions",
    category: "linked-list",
    difficulty: "medium",
    description: "Rotate the linked list to the right by k positions in-place.",
    constraints: "1 <= n <= 10^5, 1 <= k <= 10^5",
    techniques: ["inplace-reversal"],
    examples: [{"input":"5\n1 2 3 4 5\n2","output":"4 5 1 2 3"}],
    test_cases: [{"input":"5\n1 2 3 4 5\n2","expected":"4 5 1 2 3"},{"input":"3\n1 2 3\n4","expected":"3 1 2"}],
    solution_template: "#include <iostream>\nusing namespace std;\n\nstruct Node {\n  int data;\n  Node* next;\n  Node(int d) : data(d), next(nullptr) {}\n};\n\nint main() {\n  int n, k, x;\n  cin >> n;\n  Node *head = nullptr, *tail = nullptr;\n  for (int i = 0; i < n; i++) { cin >> x;\n    Node* nn = new Node(x);\n    if (!head) head = tail = nn;\n    else { tail->next = nn; tail = nn; }\n  }\n  cin >> k;\n  if (!head || !head->next || k % n == 0) { Node* t = head; while (t) { cout << t->data << \" \"; t = t->next; } return 0; }\n  k %= n;\n  int len = 1;\n  Node* t = head;\n  while (t->next) { t = t->next; len++; }\n  t->next = head;\n  int steps = len - k;\n  while (steps--) t = t->next;\n  head = t->next;\n  t->next = nullptr;\n  Node* r = head;\n  while (r) { cout << r->data << \" \"; r = r->next; }\n  return 0;\n}",
    approach: `Rotate right by k positions. Compute list length, make it circular, then break at the correct position. Connect tail->next = head, then traverse len - k steps from head to find new tail. New head is newTail->next. Break the cycle.


Diagram:
\`\`\`
rotate-right:
  1 -> 2 -> 3 -> 4 -> 5 -> null, k=2

  Step 1: Find length, make circular
  len=5, tail->next = head
  1 -> 2 -> 3 -> 4 -> 5 -> (back to 1) -> ...

  Step 2: k = 2 % 5 = 2
  steps = len - k = 3 -> traverse 1->2->3 (newTail)

  Step 3: newHead = 3->next = 4
  3->next = null

  Result: 4 -> 5 -> 1 -> 2 -> 3 -> null

  k=4 for len=3: k%3=1, steps=2 -> 1->2->newTail
  newHead=3, result: 3->1->2->null
\`\`\`

Edge: k multiple of len (no change), single node (return head). O(n) time, O(1) space.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "if(!head||!head->next||k%n==0)return head; k%=n; Node* t=head; while(t->next)t=t->next; t->next=head; int s=n-k; while(s--)t=t->next; head=t->next; t->next=nullptr;",
  },
]
