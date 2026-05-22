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
  }
]
