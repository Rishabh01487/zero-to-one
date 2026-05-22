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
  }
]
