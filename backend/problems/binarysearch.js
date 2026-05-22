export default [
  {
    id: "binary-search",
    title: "Binary Search (Find Index)",
    category: "binary-search",
    difficulty: "easy",
    description: "Find the index of target in a sorted array. Return -1 if not found.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n-1 0 3 5 9 12\n9","output":"4"}
    ],
    test_cases: [
      {"input":"6\n-1 0 3 5 9 12\n9","expected":"4"},
      {"input":"6\n-1 0 3 5 9 12\n2","expected":"-1"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> target;\n\n  int lo = 0, hi = n-1;\n  while (lo <= hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (arr[mid] == target) { cout << mid << endl; return 0; }\n    if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  cout << -1 << endl;\n  return 0;\n}",
    approach: "Divide search space in half: compare mid with target, eliminate one half.",
    complexity: {"time":"O(log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int lo=0,hi=n-1; while(lo<=hi){int m=lo+(hi-lo)/2;if(arr[m]==target){cout<<m;return 0;}if(arr[m]<target)lo=m+1;else hi=m-1;}cout<<-1;",
  },
  {
    id: "first-last-pos",
    title: "First and Last Position in Sorted Array",
    category: "binary-search",
    difficulty: "medium",
    description: "Find first and last occurrence of target in sorted array.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"8\n5 7 7 8 8 10\n8","output":"3 4"}
    ],
    test_cases: [
      {"input":"8\n5 7 7 8 8 10\n8","expected":"3 4"},
      {"input":"6\n5 7 7 8 8 10\n6","expected":"-1 -1"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint firstPos(int arr[], int n, int t) {\n  int lo = 0, hi = n-1, ans = -1;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (arr[mid] == t) { ans = mid; hi = mid - 1; }\n    else if (arr[mid] < t) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return ans;\n}\n\nint lastPos(int arr[], int n, int t) {\n  int lo = 0, hi = n-1, ans = -1;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (arr[mid] == t) { ans = mid; lo = mid + 1; }\n    else if (arr[mid] < t) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return ans;\n}\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> target;\n  cout << firstPos(arr, n, target) << \" \" << lastPos(arr, n, target) << endl;\n  return 0;\n}",
    approach: "Binary search twice: first for leftmost, using hi=mid-1 on match; second for rightmost, using lo=mid+1.",
    complexity: {"time":"O(log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int lo=0,hi=n-1,first=-1; while(lo<=hi){int m=lo+(hi-lo)/2;if(arr[m]==target){first=m;hi=m-1;}else if(arr[m]<target)lo=m+1;else hi=m-1;} lo=0;hi=n-1;int last=-1; while(lo<=hi){int m=lo+(hi-lo)/2;if(arr[m]==target){last=m;lo=m+1;}else if(arr[m]<target)lo=m+1;else hi=m-1;}cout<<first<<\" \"<<last;",
  },
  {
    id: "search-rotated",
    title: "Search in Rotated Sorted Array",
    category: "binary-search",
    difficulty: "medium",
    description: "Search for target in a rotated sorted array.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n4 5 6 7 0 1 2\n0","output":"4"}
    ],
    test_cases: [
      {"input":"7\n4 5 6 7 0 1 2\n0","expected":"4"},
      {"input":"7\n4 5 6 7 0 1 2\n3","expected":"-1"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> target;\n\n  int lo = 0, hi = n-1;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (arr[mid] == target) { cout << mid << endl; return 0; }\n    if (arr[lo] <= arr[mid]) {\n      if (target >= arr[lo] && target < arr[mid]) hi = mid - 1;\n      else lo = mid + 1;\n    } else {\n      if (target > arr[mid] && target <= arr[hi]) lo = mid + 1;\n      else hi = mid - 1;\n    }\n  }\n  cout << -1 << endl;\n  return 0;\n}",
    approach: "Binary search: identify sorted half by comparing arr[lo] with arr[mid]. Search in sorted half or pivot elsewhere.",
    complexity: {"time":"O(log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int lo=0,hi=n-1; while(lo<=hi){int m=lo+(hi-lo)/2;if(arr[m]==target){cout<<m;return 0;}if(arr[lo]<=arr[m]){if(target>=arr[lo]&&target<arr[m])hi=m-1;else lo=m+1;}else{if(target>arr[m]&&target<=arr[hi])lo=m+1;else hi=m-1;}}cout<<-1;",
  }
]
