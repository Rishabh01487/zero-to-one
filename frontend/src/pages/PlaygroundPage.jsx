import React, { useState } from 'react';
import Editor from '../components/Editor';

const templates = {
  'hello': `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`,
  'fibonacci': `#include <iostream>
using namespace std;

int fib(int n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}

int main() {
  int n = 10;
  cout << "Fibonacci of " << n << " is: " << fib(n) << endl;
  return 0;
}`,
  'bubble-sort': `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        swap(arr[j], arr[j+1]);
      }
    }
  }
}

int main() {
  int arr[] = {64, 34, 25, 12, 22, 11, 90};
  int n = sizeof(arr)/sizeof(arr[0]);
  bubbleSort(arr, n);
  cout << "Sorted array: ";
  for (int i = 0; i < n; i++) cout << arr[i] << " ";
  cout << endl;
  return 0;
}`,
  'linked-list': `#include <iostream>
using namespace std;

struct Node {
  int data;
  Node* next;
  Node(int val) : data(val), next(nullptr) {}
};

void printList(Node* head) {
  while (head) {
    cout << head->data << " -> ";
    head = head->next;
  }
  cout << "null" << endl;
}

int main() {
  Node* head = new Node(1);
  head->next = new Node(2);
  head->next->next = new Node(3);
  printList(head);
  return 0;
}`,
  'bst': `#include <iostream>
using namespace std;

struct TreeNode {
  int val;
  TreeNode *left, *right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* insert(TreeNode* root, int val) {
  if (!root) return new TreeNode(val);
  if (val < root->val) root->left = insert(root->left, val);
  else root->right = insert(root->right, val);
  return root;
}

void inorder(TreeNode* root) {
  if (!root) return;
  inorder(root->left);
  cout << root->val << " ";
  inorder(root->right);
}

int main() {
  TreeNode* root = nullptr;
  for (int v : {5, 3, 7, 2, 4, 6, 8})
    root = insert(root, v);
  cout << "Inorder: ";
  inorder(root);
  cout << endl;
  return 0;
}`
};

export default function PlaygroundPage() {
  const [activeTemplate, setActiveTemplate] = useState('hello');

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 4px' }}>Code Playground</h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 16px' }}>
          Write, compile, and run C++ code in your browser
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(templates).map(([key, code]) => (
            <button
              key={key}
              className={`btn btn-sm ${activeTemplate === key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTemplate(key)}
            >{key.replace('-', ' ')}</button>
          ))}
        </div>
      </div>
      <Editor key={activeTemplate} initialCode={templates[activeTemplate]} height={500} />
    </div>
  );
}
