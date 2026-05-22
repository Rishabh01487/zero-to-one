export default [
  {
    id: "rev-array",
    title: "Reverse an Array",
    category: "arrays",
    difficulty: "easy",
    description: "Given an array of integers, reverse it in-place.",
    constraints: "1 <= n <= 10^5, -10^9 <= arr[i] <= 10^9",
    examples: [
      {"input":"5\n1 2 3 4 5","output":"5 4 3 2 1","explanation":"Reverse the entire array"}
    ],
    test_cases: [
      {"input":"5\n1 2 3 4 5","expected":"5 4 3 2 1"},
      {"input":"3\n10 20 30","expected":"30 20 10"},
      {"input":"1\n42","expected":"42"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  // reverse arr here\n\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "Two-pointer technique: swap elements from both ends moving inward until pointers meet.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "int i=0,j=n-1;\nwhile(i<j){\n  int t=arr[i];\n  arr[i]=arr[j];\n  arr[j]=t;\n  i++;\n  j--;\n}",
  },
  {
    id: "max-min",
    title: "Find Max and Min in Array",
    category: "arrays",
    difficulty: "easy",
    description: "Given an array, find the maximum and minimum elements.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n3 7 1 9 4 2","output":"9 1","explanation":"max=9, min=1"}
    ],
    test_cases: [
      {"input":"6\n3 7 1 9 4 2","expected":"9 1"},
      {"input":"4\n5 5 5 5","expected":"5 5"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  // find max and min\n\n  cout << maxVal << \" \" << minVal << endl;\n  return 0;\n}",
    approach: "Linear scan: maintain max and min variables, update on each element.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "int mx=arr[0],mn=arr[0];\nfor(int i=1;i<n;i++){\n  if(arr[i]>mx) mx=arr[i];\n  if(arr[i]<mn) mn=arr[i];\n}\ncout << mx << \" \" << mn;",
  },
  {
    id: "kth-largest",
    title: "Kth Largest Element in Array",
    category: "arrays",
    difficulty: "medium",
    description: "Find the kth largest element in an unsorted array.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"6\n3 2 1 5 6 4\n2","output":"5","explanation":"Sorted: [1,2,3,4,5,6], 2nd largest = 5"}
    ],
    test_cases: [
      {"input":"6\n3 2 1 5 6 4\n2","expected":"5"},
      {"input":"5\n7 2 9 1 8\n3","expected":"7"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, k;\n  cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n\n  // find kth largest\n\n  return 0;\n}",
    approach: "Use min-heap of size k. For each element, push to heap; if heap size exceeds k, pop smallest. Root is kth largest.",
    complexity: {"time":"O(n log k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "priority_queue<int,vector<int>,greater<int>> pq;\nfor(int x:arr){\n  pq.push(x);\n  if(pq.size()>k) pq.pop();\n}\ncout << pq.top();",
  },
  {
    id: "kadane",
    title: "Maximum Subarray Sum (Kadane)",
    category: "arrays",
    difficulty: "medium",
    description: "Find the contiguous subarray with the largest sum.",
    constraints: "1 <= n <= 10^5, -10^4 <= arr[i] <= 10^4",
    examples: [
      {"input":"9\n-2 1 -3 4 -1 2 1 -5 4","output":"6","explanation":"[4,-1,2,1] has sum 6"}
    ],
    test_cases: [
      {"input":"9\n-2 1 -3 4 -1 2 1 -5 4","expected":"6"},
      {"input":"4\n-1 -2 -3 -4","expected":"-1"},
      {"input":"5\n5 4 3 2 1","expected":"15"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  // Kadane's algorithm\n\n  cout << maxSum << endl;\n  return 0;\n}",
    approach: "Kadane: track current sum and max sum. Reset current sum to 0 if it goes negative.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int cur=0,mx=arr[0];\nfor(int x:arr){\n  cur+=x;\n  mx=max(mx,cur);\n  if(cur<0) cur=0;\n}\ncout << mx;",
  },
  {
    id: "sort-012",
    title: "Sort 0s, 1s and 2s (Dutch Flag)",
    category: "arrays",
    difficulty: "medium",
    description: "Given an array of 0s, 1s and 2s, sort them in-place.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n2 0 2 1 1 0","output":"0 0 1 1 2 2","explanation":"Sort using Dutch National Flag algorithm"}
    ],
    test_cases: [
      {"input":"6\n2 0 2 1 1 0","expected":"0 0 1 1 2 2"},
      {"input":"5\n0 1 2 0 1","expected":"0 0 1 1 2"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  // Dutch National Flag: three pointers\n\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "Dutch National Flag: three pointers (low,mid,high). Partition 0s to left, 2s to right, 1s stay in middle.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int l=0,m=0,h=n-1;\nwhile(m<=h){\n  if(arr[m]==0){\n    swap(arr[l],arr[m]);\n    l++; m++;\n  } else if(arr[m]==1){\n    m++;\n  } else {\n    swap(arr[m],arr[h]);\n    h--;\n  }\n}",
  },
  {
    id: "missing-number",
    title: "Find Missing Number",
    category: "arrays",
    difficulty: "easy",
    description: "Given array of n-1 numbers from 1..n, find the missing one.",
    constraints: "2 <= n <= 10^5",
    examples: [
      {"input":"5\n1 2 4 5","output":"3","explanation":"Numbers 1..5, 3 is missing"}
    ],
    test_cases: [
      {"input":"5\n1 2 4 5","expected":"3"},
      {"input":"3\n1 3","expected":"2"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  int arr[n-1];\n  for (int i = 0; i < n-1; i++) cin >> arr[i];\n\n  // find missing number using XOR\n\n  cout << missing << endl;\n  return 0;\n}",
    approach: "XOR all numbers 1..n with all array elements. Paired numbers cancel, leaving the missing one.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "int x=0;\nfor(int i=1;i<=n;i++) x^=i;\nfor(int i=0;i<n-1;i++) x^=arr[i];\ncout << x;",
  },
  {
    id: "rotate-array",
    title: "Rotate Array by K",
    category: "arrays",
    difficulty: "medium",
    description: "Rotate the array to the right by k steps.",
    constraints: "1 <= n <= 10^5, 1 <= k <= 10^5",
    examples: [
      {"input":"7\n1 2 3 4 5 6 7\n3","output":"5 6 7 1 2 3 4","explanation":"Rotate right by 3"}
    ],
    test_cases: [
      {"input":"7\n1 2 3 4 5 6 7\n3","expected":"5 6 7 1 2 3 4"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nvoid reverse(int arr[], int l, int r) {\n  while (l < r) {\n    int t = arr[l]; arr[l] = arr[r]; arr[r] = t;\n    l++; r--;\n  }\n}\n\nint main() {\n  int n, k;\n  cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  k = k % n;\n\n  // rotate using reversal algorithm\n\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "Reversal algorithm: reverse entire array, then reverse first k, then reverse remaining n-k.",
    complexity: {"time":"O(n)","space":"O(1)"},
    sheet: "Love Babbar 450",
    solution_code: "k%=n;\nreverse(arr,arr+n);\nreverse(arr,arr+k);\nreverse(arr+k,arr+n);",
  }
]
