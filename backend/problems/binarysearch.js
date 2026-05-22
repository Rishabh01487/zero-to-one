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
  },
  {
    id: "peak-element",
    title: "Find Peak Element",
    category: "binary-search",
    difficulty: "medium",
    description: "Find a peak element (greater than neighbors).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n1 2 3 1","output":"2","explanation":"arr[2] = 3 is a peak"}
    ],
    test_cases: [
      {"input":"4\n1 2 3 1","expected":"2"},
      {"input":"7\n1 2 1 3 5 6 4","expected":"5"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  int lo = 0, hi = n-1;\n  while (lo < hi) {\n    int mid = lo + (hi-lo)/2;\n    if (arr[mid] > arr[mid+1]) hi = mid;\n    else lo = mid + 1;\n  }\n  cout << lo << endl;\n  return 0;\n}",
    approach: "Binary search: compare mid with mid+1. If mid > mid+1, peak is in left half (including mid). Else peak in right.",
    complexity: {"time":"O(log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int lo=0,hi=n-1; while(lo<hi){int m=lo+(hi-lo)/2;if(arr[m]>arr[m+1])hi=m;else lo=m+1;}cout<<lo;",
  },
  {
    id: "sqrt-binsearch",
    title: "Square Root (Binary Search)",
    category: "binary-search",
    difficulty: "easy",
    description: "Find integer square root of x using binary search.",
    constraints: "1 <= x <= 10^9",
    examples: [
      {"input":"8","output":"2"},
      {"input":"16","output":"4"}
    ],
    test_cases: [
      {"input":"8","expected":"2"},
      {"input":"16","expected":"4"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int x; cin >> x;\n  if (x < 2) { cout << x << endl; return 0; }\n\n  int lo = 1, hi = x / 2, ans = 0;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if ((long long)mid * mid <= x) { ans = mid; lo = mid + 1; }\n    else hi = mid - 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: "Binary search 1..x/2. If mid*mid <= x, record answer and search right. Otherwise search left.",
    complexity: {"time":"O(log x)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int lo=1,hi=x/2,ans=0; while(lo<=hi){int m=lo+(hi-lo)/2;if((long long)m*m<=x){ans=m;lo=m+1;}else hi=m-1;}cout<<ans;",
  },
  {
    id: "median-two-sorted",
    title: "Median of Two Sorted Arrays",
    category: "binary-search",
    difficulty: "hard",
    description: "Find median of two sorted arrays in O(log(min(n,m))).",
    constraints: "1 <= n,m <= 1000",
    examples: [
      {"input":"2\n1 3\n2\n2","output":"2.00000"}
    ],
    test_cases: [
      {"input":"2\n1 3\n2\n2","expected":"2.00000"},
      {"input":"2\n1 2\n2\n3 4","expected":"2.50000"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n;\n  int a[n]; for (int i = 0; i < n; i++) cin >> a[i];\n  cin >> m;\n  int b[m]; for (int i = 0; i < m; i++) cin >> b[i];\n\n  // binary search on smaller array\n\n  return 0;\n}",
    approach: "Binary search on smaller array. Partition both such that left half has n+1/2 elements. Check crossover condition.",
    complexity: {"time":"O(log min(n,m))","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "if(n>m)swap(n,m),swap(a,b); int lo=0,hi=n; while(lo<=hi){int p1=lo+(hi-lo)/2,p2=(n+m+1)/2-p1;int l1=(p1?INT_MIN:p1-1);int r1=(p1==n?INT_MAX:a[p1]);int l2=(p2?INT_MIN:b[p2-1]);int r2=(p2==m?INT_MAX:b[p2]);if(l1<=r2&&l2<=r1){if((n+m)%2)cout<<max(l1,l2);else cout<<(max(l1,l2)+min(r1,r2))/2.0;return 0;}if(l1>r2)hi=p1-1;else lo=p1+1;}",
  },
  {
    id: "aggressive-cows",
    title: "Aggressive Cows (Binary Search)",
    category: "binary-search",
    difficulty: "medium",
    description: "Place c cows in stalls maximizing minimum distance between them.",
    constraints: "2 <= n <= 10^5, 2 <= c <= n",
    examples: [
      {"input":"5 3\n1 2 8 4 9","output":"3","explanation":"Place at 1,4,8 => min dist=3"}
    ],
    test_cases: [
      {"input":"5 3\n1 2 8 4 9","expected":"3"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nbool canPlace(int stalls[], int n, int c, int dist) {\n  int cnt = 1, last = stalls[0];\n  for (int i = 1; i < n; i++)\n    if (stalls[i] - last >= dist) { cnt++; last = stalls[i]; }\n  return cnt >= c;\n}\n\nint main() {\n  int n, c; cin >> n >> c;\n  int stalls[n];\n  for (int i = 0; i < n; i++) cin >> stalls[i];\n  sort(stalls, stalls + n);\n\n  int lo = 0, hi = stalls[n-1] - stalls[0], ans = 0;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (canPlace(stalls, n, c, mid)) { ans = mid; lo = mid + 1; }\n    else hi = mid - 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: "Binary search on answer (min distance). Check if cows can be placed with at least 'mid' distance apart.",
    complexity: {"time":"O(n log range)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "sort(stalls,stalls+n); int lo=0,hi=stalls[n-1]-stalls[0],ans=0; while(lo<=hi){int m=lo+(hi-lo)/2;if(canPlace(stalls,n,c,m)){ans=m;lo=m+1;}else hi=m-1;}cout<<ans;",
  },
  {
    id: "book-allocation",
    title: "Book Allocation Problem",
    category: "binary-search",
    difficulty: "hard",
    description: "Allocate m books to n students minimizing max pages per student.",
    constraints: "1 <= n <= m <= 10^5",
    examples: [
      {"input":"4 2\n12 34 67 90","output":"113"}
    ],
    test_cases: [
      {"input":"4 2\n12 34 67 90","expected":"113"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nbool canAlloc(int pages[], int n, int m, int maxP) {\n  int cnt = 1, sum = 0;\n  for (int i = 0; i < n; i++) {\n    if (pages[i] > maxP) return false;\n    if (sum + pages[i] > maxP) { cnt++; sum = pages[i]; }\n    else sum += pages[i];\n  }\n  return cnt <= m;\n}\n\nint main() {\n  int n, m; cin >> n >> m;\n  int pages[n];\n  int lo = 0, hi = 0;\n  for (int i = 0; i < n; i++) { cin >> pages[i]; hi += pages[i]; lo = max(lo, pages[i]); }\n\n  int ans = hi;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (canAlloc(pages, n, m, mid)) { ans = mid; hi = mid - 1; }\n    else lo = mid + 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: "Binary search on max pages. Check if allocation possible with 'mid' as max pages per student.",
    complexity: {"time":"O(n log sum)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int lo=*max_element(pages,pages+n),hi=accumulate(pages,pages+n,0),ans=hi; while(lo<=hi){int m=lo+(hi-lo)/2;if(canAlloc(pages,n,m,m)){ans=m;hi=m-1;}else lo=m+1;}cout<<ans;",
  }
]
