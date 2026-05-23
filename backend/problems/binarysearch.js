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
    approach: `Binary search solves finding a target in a sorted array in O(log n) by repeatedly halving the search space.

Diagram:

  arr = [-1, 0, 3, 5, 9, 12], target = 9

  Step 1: [-1, 0, 3, 5, 9, 12]
            ^        ^        ^
           low=0    mid=2    high=5
           arr[2]=3 < 9 -> low=mid+1=3

  Step 2: [-1, 0, 3, 5, 9, 12]
                       ^   ^   ^
                      low mid high
           low=3, mid=4, high=5
           arr[4]=9 == 9 -> return 4

Brute force scans all n elements O(n). Since array is sorted, comparing with middle element discards half the search space each iteration. Initialize lo=0, hi=n-1. While lo<=hi, compute mid=lo+(hi-lo)/2 to avoid overflow. If arr[mid]==target return mid. If target<arr[mid], set hi=mid-1; else lo=mid+1. Edge cases: target outside range, single element.`,
    complexity: {"time":"O(log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Binary Search (Find Index)\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "Striver A2Z",
    solution_code: "int lo=0,hi=n-1; while(lo<=hi){int m=lo+(hi-lo)/2;if(arr[m]==target){cout<<m;return 0;}if(arr[m]<target)lo=m+1;else hi=m-1;}cout<<-1;",
    techniques: ["binary-search"],
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
    approach: `Two binary searches find first/last occurrence of duplicates.

Diagram:

  arr = [5, 7, 7, 8, 8, 10], target = 8

  firstPos:
  Step 1: [5, 7, 7, 8, 8, 10]
            ^        ^        ^
           low=0    mid=2    high=5
           arr[2]=7 < 8 -> low=3

  Step 2: [5, 7, 7, 8, 8, 10]
                       ^  ^  ^
                      low mid high
           arr[4]=8==8, ans=4, hi=3

  Step 3: [5, 7, 7, 8, 8, 10]
                    ^
                  low=hi=3
           arr[3]=8==8, ans=3, hi=2 -> exit, ans=3

  lastPos:
  Step 1: [5, 7, 7, 8, 8, 10]
            ^        ^        ^
           arr[2]=7<8 -> lo=3

  Step 2: [5, 7, 7, 8, 8, 10]
                       ^  ^  ^
           arr[4]=8==8, ans=4, lo=5

  Step 3: [5, 7, 7, 8, 8, 10]
                             ^
                            lo=hi=5
           arr[5]=10>8 -> hi=4, exit, ans=4

Brute force O(n) scans left for first and right for last. For first occurrence, when match found store ans and move hi=mid-1. For last occurrence, store ans and move lo=mid+1.`,
    complexity: {"time":"O(log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"First and Last Position in Sorted Array\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "Striver A2Z",
    solution_code: "int lo=0,hi=n-1,first=-1; while(lo<=hi){int m=lo+(hi-lo)/2;if(arr[m]==target){first=m;hi=m-1;}else if(arr[m]<target)lo=m+1;else hi=m-1;} lo=0;hi=n-1;int last=-1; while(lo<=hi){int m=lo+(hi-lo)/2;if(arr[m]==target){last=m;lo=m+1;}else if(arr[m]<target)lo=m+1;else hi=m-1;}cout<<first<<\" \"<<last;",
    techniques: ["binary-search"],
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
    approach: `Binary search with sorted-half detection for rotated arrays.

Diagram:

  arr = [4, 5, 6, 7, 0, 1, 2], target = 0

  Step 1: [4, 5, 6, 7, 0, 1, 2]
            ^        ^         ^
           lo=0     mid=3     hi=6
           left sorted [4..7], target 0 not in [4,7)
           -> lo=4

  Step 2: [4, 5, 6, 7, 0, 1, 2]
                          ^  ^  ^
                         lo mid hi
           left sorted [0..1], target 0 in [0,1)
           -> hi=4

  Step 3: [4, 5, 6, 7, 0, 1, 2]
                          ^
                        lo=hi=4
           arr[4]=0 == 0 -> return 4

At every mid, at least one half is fully sorted. Check arr[lo]<=arr[mid] to identify the sorted left half; if target lies within its range, search there; otherwise search the other half.`,
    complexity: {"time":"O(log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Search in Rotated Sorted Array\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "Striver A2Z",
    solution_code: "int lo=0,hi=n-1; while(lo<=hi){int m=lo+(hi-lo)/2;if(arr[m]==target){cout<<m;return 0;}if(arr[lo]<=arr[m]){if(target>=arr[lo]&&target<arr[m])hi=m-1;else lo=m+1;}else{if(target>arr[m]&&target<=arr[hi])lo=m+1;else hi=m-1;}}cout<<-1;",
    techniques: ["binary-search"],
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
    approach: `Binary search to find a peak using slope direction.

Diagram:

  arr = [1, 2, 3, 1]

  Step 1: [1, 2, 3, 1]
            ^     ^  ^
           lo   mid  hi
           arr[1]=2 > arr[2]=3? No -> lo=2

  Step 2: [1, 2, 3, 1]
                  ^  ^
                 lo hi (mid=2)
           arr[2]=3 > arr[3]=1? Yes -> hi=2
           lo=2 == hi=2 -> return 2 (value 3)

  arr = [1, 2, 1, 3, 5, 6, 4]

  Step 1: [1, 2, 1, 3, 5, 6, 4]
            ^        ^         ^
           lo      mid       hi
           arr[3]=3 > arr[4]=5? No -> lo=4

  Step 2: [1, 2, 1, 3, 5, 6, 4]
                          ^  ^  ^
                         lo mid hi
           arr[5]=6 > arr[6]=4? Yes -> hi=5

  Step 3: [1, 2, 1, 3, 5, 6, 4]
                          ^  ^
                         lo hi (mid=4)
           arr[4]=5 > arr[5]=6? No -> lo=5, exit -> return 5

If arr[mid] > arr[mid+1], array descends, peak on left (including mid). Else peak on right (excluding mid).`,
    complexity: {"time":"O(log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Find Peak Element\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "Striver A2Z",
    solution_code: "int lo=0,hi=n-1; while(lo<hi){int m=lo+(hi-lo)/2;if(arr[m]>arr[m+1])hi=m;else lo=m+1;}cout<<lo;",
    techniques: ["binary-search"],
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
    approach: `Binary search for floor(sqrt(x)) using monotonic predicate mid*mid <= x.

Diagram:

  x = 8, search range [1, 4]

  Step 1: search=[1, 2, 3, 4]
                  ^     ^     ^
                 lo   mid    hi
           mid=2, 2*2=4 <= 8 -> ans=2, lo=3

  Step 2: search=[1, 2, 3, 4]
                        ^  ^  ^
                       lo mid hi
           mid=3, 3*3=9 > 8 -> hi=2

  Step 3: lo=3 > hi=2, exit, ans=2

  x = 16, search range [1, 8]

  Step 1: [1, 2, 3, 4, 5, 6, 7, 8]
            ^        ^           ^
           lo      mid         hi
           mid=4, 4*4=16 <= 16 -> ans=4, lo=5

  Step 2: [1, 2, 3, 4, 5, 6, 7, 8]
                           ^  ^   ^
                          lo mid hi
           mid=6, 6*6=36 > 16 -> hi=5

  Step 3: [1, 2, 3, 4, 5, 6, 7, 8]
                           ^  ^
                          lo hi
           mid=5, 5*5=25 > 16 -> hi=4, exit, ans=4

Brute force O(x) checks every integer. Binary search on [1, x/2] is O(log x). Handle x<2 as base case. Use long long cast for multiplication.`,
    complexity: {"time":"O(log x)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Square Root (Binary Search)\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "Striver A2Z",
    solution_code: "int lo=1,hi=x/2,ans=0; while(lo<=hi){int m=lo+(hi-lo)/2;if((long long)m*m<=x){ans=m;lo=m+1;}else hi=m-1;}cout<<ans;",
    techniques: ["binary-search"],
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
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n;\n  int a[n]; for (int i = 0; i < n; i++) cin >> a[i];\n  cin >> m;\n  int b[m]; for (int i = 0; i < m; i++) cin >> b[i];\n\n  if (n > m) { swap(n, m); swap(a, b); }\n  int lo = 0, hi = n;\n  while (lo <= hi) {\n    int p1 = lo + (hi-lo)/2;\n    int p2 = (n+m+1)/2 - p1;\n    int l1 = (p1 == 0 ? INT_MIN : a[p1-1]);\n    int r1 = (p1 == n ? INT_MAX : a[p1]);\n    int l2 = (p2 == 0 ? INT_MIN : b[p2-1]);\n    int r2 = (p2 == m ? INT_MAX : b[p2]);\n    if (l1 <= r2 && l2 <= r1) {\n      if ((n+m) % 2 == 1) { cout << max(l1, l2) << endl; return 0; }\n      else { cout << (max(l1, l2) + min(r1, r2)) / 2.0 << endl; return 0; }\n    }\n    else if (l1 > r2) hi = p1 - 1;\n    else lo = p1 + 1;\n  }\n  return 0;\n}",
    approach: `Binary search on smaller array to find correct partition.

Diagram:

  a = [1, 3], n=2
  b = [2], m=1
  total = 3, leftHalf = 2 elements

  Step 1: partition a at p1=1
           a: [1 | 3]    b: [2 | ]
              l1 r1         l2 r2
           l1=1, r1=3, l2=2, r2=INF
           l1<=r2(1<=INF) && l2<=r1(2<=3)? Yes
           total odd -> median = max(1,2) = 2

  a = [1, 2], n=2
  b = [3, 4], m=2
  total = 4, leftHalf = 2 elements

  Step 1: partition a at p1=1
           a: [1 | 2]    b: [3 | 4]
           l1=1, r1=2, l2=3, r2=4
           l1<=r2(1<=4) && l2<=r1(3<=2)? No
           l2 > r1 -> need more from a, lo=p1+1=2

  Step 2: p1=2
           a: [1, 2 | ]   b: [ | 3, 4]
           l1=2, r1=INF, l2=INT_MIN, r2=3
           l1<=r2(2<=3) && l2<=r1(-INF<=INF)? Yes
           total even -> median = (max(2,-INF)+min(INF,3))/2 = (2+3)/2 = 2.5

The key insight: partition both arrays so left half has (n+m+1)/2 elements and all left elements <= all right elements.`,
    complexity: {"time":"O(log min(n,m))","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Median of Two Sorted Arrays\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "Striver A2Z",
    solution_code: "if(n>m)swap(n,m),swap(a,b); int lo=0,hi=n; while(lo<=hi){int p1=lo+(hi-lo)/2,p2=(n+m+1)/2-p1;int l1=(p1?INT_MIN:p1-1);int r1=(p1==n?INT_MAX:a[p1]);int l2=(p2?INT_MIN:b[p2-1]);int r2=(p2==m?INT_MAX:b[p2]);if(l1<=r2&&l2<=r1){if((n+m)%2)cout<<max(l1,l2);else cout<<(max(l1,l2)+min(r1,r2))/2.0;return 0;}if(l1>r2)hi=p1-1;else lo=p1+1;}",
    techniques: ["binary-search"],
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
    approach: `Binary search on answer (maximum minimal distance).

Diagram:

  stalls = [1, 2, 4, 8, 9] (sorted), c=3

  Search range: lo=1, hi=8 (max-min)

  Step 1: mid=4
           Try placing with dist >= 4:
           Cow1 at 1, Cow2 at 8 (dist 7 >= 4), Cow3? 9-8=1 < 4
           Only 2 cows < 3 -> infeasible, hi=3

  Step 2: mid=2
           Cow1 at 1, Cow2 at 4 (3 >= 2), Cow3 at 8 (4 >= 2)
           3 cows placed -> feasible, ans=2, lo=3

  Step 3: mid=3
           Cow1 at 1, Cow2 at 4 (3 >= 3), Cow3 at 8 (4 >= 3)
           3 cows placed -> feasible, ans=3, lo=4

  Step 4: lo=4 > hi=3, exit -> ans=3

Feasibility is monotonic: if distance d works, all smaller d also work. Greedy canPlace() places first cow at stalls[0], then each next cow when distance >= mid.`,
    complexity: {"time":"O(n log range)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Aggressive Cows (Binary Search)\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "Striver A2Z",
    solution_code: "sort(stalls,stalls+n); int lo=0,hi=stalls[n-1]-stalls[0],ans=0; while(lo<=hi){int m=lo+(hi-lo)/2;if(canPlace(stalls,n,c,m)){ans=m;lo=m+1;}else hi=m-1;}cout<<ans;",
    techniques: ["binary-search"],
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
    approach: `Binary search on max pages per student.

Diagram:

  pages = [12, 34, 67, 90], students m=2
  lo = max(pages) = 90, hi = sum(pages) = 203

  Step 1: mid = (90+203)/2 = 146
           Allocate:
           Student1: 12+34+67=113 <= 146
           Student2: 90 <= 146
           2 students used -> feasible, ans=146, hi=145

  Step 2: mid = (90+145)/2 = 117
           Student1: 12+34+67=113 <= 117
           Student2: 90 <= 117
           2 students -> feasible, ans=117, hi=116

  Step 3: mid = (90+116)/2 = 103
           Student1: 12+34=46 <= 103
           Student2: 67+90=157 > 103 -> needs 3rd
           3 > 2 -> infeasible, lo=104

  Step 4: mid = (104+116)/2 = 110
           Student1: 12+34+67=113 > 110 -> Student1: 12+34=46
           Student2: 67 <= 110
           Student3: 90 <= 110
           3 > 2 -> infeasible, lo=111

  ... eventually converges to ans=113

Binary search on answer: lo=max pages (largest single book), hi=sum of pages. canAlloc() greedily checks if we can split with maxP limit using <= m students.`,
    complexity: {"time":"O(n log sum)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Book Allocation Problem\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "Striver A2Z",
    solution_code: "int lo=*max_element(pages,pages+n),hi=accumulate(pages,pages+n,0),ans=hi; while(lo<=hi){int m=lo+(hi-lo)/2;if(canAlloc(pages,n,m,m)){ans=m;hi=m-1;}else lo=m+1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "search-insert",
    title: "Search Insert Position",
    category: "binary-search",
    difficulty: "easy",
    description: "Return the index where target would be inserted in sorted array if not found.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n1 3 5 6\n5","output":"2"},
      {"input":"4\n1 3 5 6\n2","output":"1"}
    ],
    test_cases: [
      {"input":"4\n1 3 5 6\n5","expected":"2"},
      {"input":"4\n1 3 5 6\n2","expected":"1"},
      {"input":"4\n1 3 5 6\n7","expected":"4"},
      {"input":"4\n1 3 5 6\n0","expected":"0"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> target;\n\n  int lo = 0, hi = n;\n  while (lo < hi) {\n    int mid = lo + (hi-lo)/2;\n    if (arr[mid] < target) lo = mid + 1;\n    else hi = mid;\n  }\n  cout << lo << endl;\n  return 0;\n}",
    approach: `Binary search for lower_bound (first position >= target).

Diagram:

  arr = [1, 3, 5, 6], target = 2

  Step 1: [1, 3, 5, 6]
            ^     ^     ^
           lo   mid    hi (n=4)
           arr[1]=3 >= 2 -> hi=1

  Step 2: [1, 3, 5, 6]
            ^  ^
           lo hi (mid=0)
           arr[0]=1 < 2 -> lo=1
           lo=1 == hi=1 -> return 1

  arr = [1, 3, 5, 6], target = 7

  Step 1: arr[1]=3 < 7 -> lo=2
  Step 2: arr[2]=5 < 7 -> lo=3
  Step 3: arr[3]=6 < 7 -> lo=4
           lo=4 == hi=4 -> return 4

Standard lower_bound binary search. hi starts at n (not n-1) to handle insert at end. Returns smallest index i where arr[i] >= target.`,
    complexity: {"time":"O(log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Search Insert Position\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=0,hi=n; while(lo<hi){int m=lo+(hi-lo)/2;if(arr[m]<target)lo=m+1;else hi=m;}cout<<lo;",
    techniques: ["binary-search"],
  },
  {
    id: "find-min-rotated",
    title: "Find Minimum in Rotated Sorted Array",
    category: "binary-search",
    difficulty: "medium",
    description: "Find the minimum element in a rotated sorted array (no duplicates).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n3 4 5 1 2","output":"1"}
    ],
    test_cases: [
      {"input":"5\n3 4 5 1 2","expected":"1"},
      {"input":"6\n4 5 6 7 0 1 2","expected":"0"},
      {"input":"3\n11 13 15","expected":"11"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  int lo = 0, hi = n-1;\n  while (lo < hi) {\n    int mid = lo + (hi-lo)/2;\n    if (arr[mid] > arr[hi]) lo = mid + 1;\n    else hi = mid;\n  }\n  cout << arr[lo] << endl;\n  return 0;\n}",
    approach: `Binary search to find the rotation pivot (minimum element).

Diagram:

  arr = [3, 4, 5, 1, 2]

  Step 1: [3, 4, 5, 1, 2]
            ^     ^     ^
           lo   mid    hi
           arr[2]=5 > arr[4]=2 -> pivot on right, lo=3

  Step 2: [3, 4, 5, 1, 2]
                       ^  ^
                      lo hi (mid=3)
           arr[3]=1 > arr[4]=2? No -> hi=3
           lo=3 == hi=3 -> return arr[3]=1

  arr = [4, 5, 6, 7, 0, 1, 2]

  Step 1: arr[3]=7 > arr[6]=2 -> lo=4
  Step 2: arr[5]=1 > arr[6]=2? No -> hi=5
  Step 3: arr[4]=0 > arr[5]=1? No -> hi=4
           lo=4 == hi=4 -> return arr[4]=0

Compare arr[mid] with arr[hi]. If arr[mid] > arr[hi], minimum is in right half (lo=mid+1). Else minimum is in left half (hi=mid).`,
    complexity: {"time":"O(log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Find Minimum in Rotated Sorted Array\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "Striver A2Z",
    solution_code: "int lo=0,hi=n-1; while(lo<hi){int m=lo+(hi-lo)/2;if(arr[m]>arr[hi])lo=m+1;else hi=m;}cout<<arr[lo];",
    techniques: ["binary-search"],
  },
  {
    id: "count-rotations",
    title: "Count Rotations in Rotated Sorted Array",
    category: "binary-search",
    difficulty: "easy",
    description: "Count number of rotations performed on a sorted array.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n3 4 5 1 2","output":"3"}
    ],
    test_cases: [
      {"input":"5\n3 4 5 1 2","expected":"3"},
      {"input":"5\n5 1 2 3 4","expected":"1"},
      {"input":"4\n2 3 4 1","expected":"3"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  int lo = 0, hi = n-1;\n  while (lo < hi) {\n    int mid = lo + (hi-lo)/2;\n    if (arr[mid] > arr[hi]) lo = mid + 1;\n    else hi = mid;\n  }\n  cout << lo << endl;\n  return 0;\n}",
    approach: `Same as finding minimum index in rotated sorted array.

Diagram:

  arr = [3, 4, 5, 1, 2]

  Step 1: [3, 4, 5, 1, 2]
            ^     ^     ^
           lo   mid    hi
           arr[2]=5 > arr[4]=2 -> lo=3

  Step 2: [3, 4, 5, 1, 2]
                       ^  ^
                      lo hi
           arr[3]=1 > arr[4]=2? No -> hi=3

  Step 3: lo=3 == hi=3 -> rotation count = 3

  arr = [5, 1, 2, 3, 4]

  Step 1: [5, 1, 2, 3, 4]
            ^     ^     ^
           arr[2]=2 > arr[4]=4? No -> hi=2

  Step 2: [5, 1, 2, 3, 4]
            ^  ^  ^
           lo mid hi
           arr[1]=1 > arr[2]=2? No -> hi=1

  Step 3: [5, 1, 2, 3, 4]
            ^  ^
           lo hi
           arr[0]=5 > arr[1]=1? Yes -> lo=1
           lo=1 == hi=1 -> rotation count = 1

Index of minimum element equals number of rotations.`,
    complexity: {"time":"O(log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Count Rotations in Rotated Sorted Array\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "GeeksforGeeks",
    solution_code: "int lo=0,hi=n-1; while(lo<hi){int m=lo+(hi-lo)/2;if(arr[m]>arr[hi])lo=m+1;else hi=m;}cout<<lo;",
    techniques: ["binary-search"],
  },
  {
    id: "single-element-sorted",
    title: "Single Element in a Sorted Array",
    category: "binary-search",
    difficulty: "medium",
    description: "Find the single element that appears once; all others appear twice.",
    constraints: "1 <= n <= 10^5, n is odd",
    examples: [
      {"input":"9\n1 1 2 3 3 4 4 8 8","output":"2"}
    ],
    test_cases: [
      {"input":"9\n1 1 2 3 3 4 4 8 8","expected":"2"},
      {"input":"7\n3 3 7 7 10 11 11","expected":"10"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  int lo = 0, hi = n-1;\n  while (lo < hi) {\n    int mid = lo + (hi-lo)/2;\n    if (mid % 2 == 1) mid--;\n    if (arr[mid] == arr[mid+1]) lo = mid + 2;\n    else hi = mid;\n  }\n  cout << arr[lo] << endl;\n  return 0;\n}",
    approach: `Binary search using parity pattern of pairs.

Diagram:

  arr = [1, 1, 2, 3, 3, 4, 4, 8, 8]

  Before single element: pairs start at even index (0,2,4,...).
  After single element: pairs start at odd index.

  Step 1: [1, 1, 2, 3, 3, 4, 4, 8, 8]
            ^        ^              ^
           lo      mid            hi
           mid=3, mid%2=1 -> mid=2
           arr[2]=2 == arr[3]=3? No -> hi=2

  Step 2: [1, 1, 2, 3, 3, 4, 4, 8, 8]
            ^  ^  ^
           lo mid hi
           mid=1, mid%2=1 -> mid=0
           arr[0]=1 == arr[1]=1? Yes -> lo=2
           lo=2 == hi=2 -> return arr[2]=2

  Check: if pairs are intact (arr[mid]==arr[mid+1]), single element is on the right. Otherwise it's on the left. Ensure mid is even for clean pair check.`,
    complexity: {"time":"O(log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Single Element in a Sorted Array\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=0,hi=n-1; while(lo<hi){int m=lo+(hi-lo)/2;if(m%2)m--;if(arr[m]==arr[m+1])lo=m+2;else hi=m;}cout<<arr[lo];",
    techniques: ["binary-search"],
  },
  {
    id: "kth-element-sorted",
    title: "Kth Element of Two Sorted Arrays",
    category: "binary-search",
    difficulty: "hard",
    description: "Find the kth smallest element in two sorted arrays.",
    constraints: "1 <= n,m <= 10^5, 1 <= k <= n+m",
    examples: [
      {"input":"4\n2 3 6 7\n4\n1 4 8 10\n5","output":"6"}
    ],
    test_cases: [
      {"input":"4\n2 3 6 7\n4\n1 4 8 10\n5","expected":"6"},
      {"input":"3\n1 2 3\n3\n4 5 6\n3","expected":"3"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n, m, k; cin >> n;\n  int a[n]; for(int i=0;i<n;i++) cin>>a[i];\n  cin>>m;\n  int b[m]; for(int i=0;i<m;i++) cin>>b[i];\n  cin>>k;\n\n  if (n > m) { swap(n,m); swap(a,b); }\n  int lo = max(0, k-m), hi = min(k, n);\n  while (lo <= hi) {\n    int p1 = lo + (hi-lo)/2;\n    int p2 = k - p1;\n    int l1 = (p1==0 ? INT_MIN : a[p1-1]);\n    int r1 = (p1==n ? INT_MAX : a[p1]);\n    int l2 = (p2==0 ? INT_MIN : b[p2-1]);\n    int r2 = (p2==m ? INT_MAX : b[p2]);\n    if (l1 <= r2 && l2 <= r1) { cout << max(l1, l2) << endl; return 0; }\n    if (l1 > r2) hi = p1 - 1;\n    else lo = p1 + 1;\n  }\n  return 0;\n}",
    approach: `Binary search on smaller array to pick k elements total.

Diagram:

  a = [2, 3, 6, 7], n=4
  b = [1, 4, 8, 10], m=4
  k = 5

  Step 1: lo=max(0,5-4)=1, hi=min(5,4)=4
           p1=2, p2=5-2=3
           a: [2, 3 | 6, 7]    b: [1, 4, 8 | 10]
               l1 r1                l2    r2
           l1=3, r1=6, l2=8, r2=10
           l1 <= r2 (3<=10) && l2 <= r1 (8<=6)? No
           l2 > r1 -> need more from a, lo=3

  Step 2: p1=3, p2=2
           a: [2, 3, 6 | 7]    b: [1, 4 | 8, 10]
               l1    r1           l2 r2
           l1=6, r1=7, l2=4, r2=8
           l1<=r2(6<=8) && l2<=r1(4<=7)? Yes
           kth = max(l1,l2) = max(6,4) = 6

Generalized median-of-two approach for arbitrary k. Partition a at p1, b at p2=k-p1. Adjust using binary search until all left elements <= all right elements.`,
    complexity: {"time":"O(log min(n,m))","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Kth Element of Two Sorted Arrays\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "GeeksforGeeks",
    solution_code: "if(n>m)swap(n,m),swap(a,b); int lo=max(0,k-m),hi=min(k,n); while(lo<=hi){int p1=lo+(hi-lo)/2,p2=k-p1;int l1=(p1?INT_MIN:a[p1-1]),r1=(p1==n?INT_MAX:a[p1]);int l2=(p2?INT_MIN:b[p2-1]),r2=(p2==m?INT_MAX:b[p2]);if(l1<=r2&&l2<=r1){cout<<max(l1,l2);return 0;}if(l1>r2)hi=p1-1;else lo=p1+1;}",
    techniques: ["binary-search"],
  },
  {
    id: "koko-bananas",
    title: "Koko Eating Bananas",
    category: "binary-search",
    difficulty: "medium",
    description: "Find minimum eating speed k such that Koko finishes all bananas within h hours.",
    constraints: "1 <= n <= 10^4, n <= h <= 10^9",
    examples: [
      {"input":"4\n3 6 7 11\n8","output":"4"}
    ],
    test_cases: [
      {"input":"4\n3 6 7 11\n8","expected":"4"},
      {"input":"5\n30 11 23 4 20\n5","expected":"30"},
      {"input":"5\n30 11 23 4 20\n6","expected":"23"}
    ],
    solution_template: "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nbool canEat(int piles[], int n, int h, int k) {\n  long long hours = 0;\n  for (int i = 0; i < n; i++)\n    hours += (piles[i] + k - 1) / k;\n  return hours <= h;\n}\n\nint main() {\n  int n, h; cin >> n;\n  int piles[n];\n  int lo = 1, hi = 0;\n  for (int i = 0; i < n; i++) { cin >> piles[i]; if (piles[i] > hi) hi = piles[i]; }\n  cin >> h;\n\n  int ans = hi;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (canEat(piles, n, h, mid)) { ans = mid; hi = mid - 1; }\n    else lo = mid + 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: `Binary search on eating speed k.

Diagram:

  piles = [3, 6, 7, 11], h = 8
  Range: lo=1, hi=11 (max pile)

  Step 1: mid = 6
           Hours: ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6)
                = 1+1+2+2 = 6 <= 8 -> feasible, ans=6, hi=5

  Step 2: mid = 3
           Hours: 1+2+3+4 = 10 > 8 -> infeasible, lo=4

  Step 3: mid = 4
           Hours: 1+2+2+3 = 8 <= 8 -> feasible, ans=4, hi=3

  Step 4: lo=4 > hi=3, exit -> ans=4

Monotonic: if speed k works, all k' > k also work. Find minimum feasible k.`,
    complexity: {"time":"O(n log maxPile)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Koko Eating Bananas\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=1,hi=*max_element(piles,piles+n),ans=hi; while(lo<=hi){int m=lo+(hi-lo)/2;if(canEat(piles,n,h,m)){ans=m;hi=m-1;}else lo=m+1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "capacity-ship-days",
    title: "Capacity to Ship Packages Within D Days",
    category: "binary-search",
    difficulty: "medium",
    description: "Find minimum ship capacity to ship all packages within D days.",
    constraints: "1 <= n <= 5*10^4, 1 <= days <= n",
    examples: [
      {"input":"5\n1 2 3 4 5 6 7 8 9 10\n5","output":"15"}
    ],
    test_cases: [
      {"input":"10\n1 2 3 4 5 6 7 8 9 10\n5","expected":"15"},
      {"input":"3\n3 2 2 4 1 4\n3","expected":"6"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nbool canShip(int weights[], int n, int days, int cap) {\n  int cnt = 1, sum = 0;\n  for (int i = 0; i < n; i++) {\n    if (weights[i] > cap) return false;\n    if (sum + weights[i] > cap) { cnt++; sum = weights[i]; }\n    else sum += weights[i];\n  }\n  return cnt <= days;\n}\n\nint main() {\n  int n, days; cin >> n;\n  int weights[n];\n  int lo = 0, hi = 0;\n  for (int i = 0; i < n; i++) { cin >> weights[i]; hi += weights[i]; lo = max(lo, weights[i]); }\n  cin >> days;\n\n  int ans = hi;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (canShip(weights, n, days, mid)) { ans = mid; hi = mid - 1; }\n    else lo = mid + 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: `Binary search on ship capacity.

Diagram:

  weights = [1,2,3,4,5,6,7,8,9,10], days = 5
  lo = max(weight) = 10, hi = sum = 55

  Step 1: mid = 32
           Day1: 1+2+3+4+5+6+7=28 <=32
           Day2: 8+9+10=27 <=32
           2 days <=5 -> feasible, ans=32, hi=31

  Step 2: mid = 20
           Day1: 1+2+3+4+5=15 <=20
           Day2: 6+7+8=21 >20 -> Day2:6+7=13, Day3:8+9+... 
           4 days actually, but too long to trace
           Eventually: if feasible at capacity 15 -> ans=15

  Step 3: ... converge to ans=15

Feasibility: can we ship with <= days using capacity mid? Ship until weight exceeds capacity, then next day.`,
    complexity: {"time":"O(n log sum)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Capacity to Ship Packages Within D Days\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=*max_element(w,w+n),hi=accumulate(w,w+n,0),ans=hi; while(lo<=hi){int m=lo+(hi-lo)/2;if(canShip(w,n,days,m)){ans=m;hi=m-1;}else lo=m+1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "split-array-largest",
    title: "Split Array Largest Sum",
    category: "binary-search",
    difficulty: "hard",
    description: "Split array into m subarrays minimizing the largest sum among them.",
    constraints: "1 <= n <= 1000, 1 <= m <= min(50, n)",
    examples: [
      {"input":"5\n7 2 5 10 8\n2","output":"18","explanation":"Split at [7,2,5] and [10,8] -> max sum 18"}
    ],
    test_cases: [
      {"input":"5\n7 2 5 10 8\n2","expected":"18"},
      {"input":"3\n1 2 3 4 5\n2","expected":"9"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nbool canSplit(int arr[], int n, int m, int maxSum) {\n  int cnt = 1, sum = 0;\n  for (int i = 0; i < n; i++) {\n    if (arr[i] > maxSum) return false;\n    if (sum + arr[i] > maxSum) { cnt++; sum = arr[i]; }\n    else sum += arr[i];\n  }\n  return cnt <= m;\n}\n\nint main() {\n  int n, m; cin >> n;\n  int arr[n];\n  int lo = 0, hi = 0;\n  for (int i = 0; i < n; i++) { cin >> arr[i]; hi += arr[i]; lo = max(lo, arr[i]); }\n  cin >> m;\n\n  int ans = hi;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (canSplit(arr, n, m, mid)) { ans = mid; hi = mid - 1; }\n    else lo = mid + 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: `Binary search on minimized largest sum.

Diagram:

  arr = [7, 2, 5, 10, 8], m = 2
  lo = max = 10, hi = sum = 32

  Step 1: mid = 21
           Sub1: 7+2+5+10=24 >21 -> Sub1: 7+2+5=14, Sub2: 10+8=18
           2 subarrays <= 2 -> feasible, ans=21, hi=20

  Step 2: mid = 15
           Sub1: 7+2+5=14 <=15, Sub2: 10+8=18 >15 -> Sub2:10, Sub3:8
           3 > 2 -> infeasible, lo=16

  Step 3: mid = 18
           Sub1: 7+2+5=14 <=18, Sub2: 10+8=18 <=18
           2 <= 2 -> feasible, ans=18, hi=17

  Step 4: lo=18 > hi=17 -> exit, ans=18

Same pattern as book allocation: binary search on answer, greedy feasibility check.`,
    complexity: {"time":"O(n log sum)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Split Array Largest Sum\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=*max_element(arr,arr+n),hi=accumulate(arr,arr+n,0),ans=hi; while(lo<=hi){int m=lo+(hi-lo)/2;if(canSplit(arr,n,m,m)){ans=m;hi=m-1;}else lo=m+1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "nth-root",
    title: "Nth Root of an Integer",
    category: "binary-search",
    difficulty: "easy",
    description: "Find floor of nth root of m using binary search.",
    constraints: "1 <= m <= 10^9, 1 <= n <= 30",
    examples: [
      {"input":"3\n27","output":"3"},
      {"input":"4\n69","output":"3"}
    ],
    test_cases: [
      {"input":"3\n27","expected":"3"},
      {"input":"4\n69","expected":"3"},
      {"input":"2\n16","expected":"4"}
    ],
    solution_template: "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nlong long power(long long base, int exp) {\n  long long res = 1;\n  for (int i = 0; i < exp; i++) {\n    res *= base;\n    if (res > 1e9) return 1e9 + 1;\n  }\n  return res;\n}\n\nint main() {\n  int n, m; cin >> n >> m;\n\n  int lo = 1, hi = pow(m, 1.0/n) + 2, ans = 1;\n  if (n == 1) { cout << m << endl; return 0; }\n\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (power(mid, n) <= m) { ans = mid; lo = mid + 1; }\n    else hi = mid - 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: `Binary search for floor nth root of m.

Diagram:

  m = 27, n = 3
  Search range: [1, 4] (since 3^3=27, 4^3=64)

  Step 1: [1, 2, 3, 4]
            ^     ^  ^
           lo   mid hi
           mid=2, 2^3=8 <= 27 -> ans=2, lo=3

  Step 2: [1, 2, 3, 4]
                  ^  ^
                 lo hi (mid=3)
           mid=3, 3^3=27 <= 27 -> ans=3, lo=4

  Step 3: [1, 2, 3, 4]
                     ^
                    lo=hi=4
           mid=4, 4^3=64 > 27 -> hi=3, exit, ans=3

Monotonic: if mid^n <= m, all smaller values also satisfy. Use overflow-safe power function.`,
    complexity: {"time":"O(log m * n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Nth Root of an Integer\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "GeeksforGeeks",
    solution_code: "int lo=1,hi=pow(m,1.0/n)+2,ans=1; while(lo<=hi){int mid=lo+(hi-lo)/2;long long p=1;for(int i=0;i<n;i++){p*=mid;if(p>m)break;}if(p<=m){ans=mid;lo=mid+1;}else hi=mid-1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "smallest-divisor",
    title: "Find the Smallest Divisor Given a Threshold",
    category: "binary-search",
    difficulty: "medium",
    description: "Find smallest divisor such that sum of ceil division results <= threshold.",
    constraints: "1 <= n <= 5*10^4, 1 <= threshold >= n",
    examples: [
      {"input":"4\n1 2 5 9\n6","output":"5"}
    ],
    test_cases: [
      {"input":"4\n1 2 5 9\n6","expected":"5"},
      {"input":"4\n44 22 33 11\n5","expected":"44"}
    ],
    solution_template: "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nbool check(int arr[], int n, int threshold, int d) {\n  long long sum = 0;\n  for (int i = 0; i < n; i++)\n    sum += (arr[i] + d - 1) / d;\n  return sum <= threshold;\n}\n\nint main() {\n  int n, threshold; cin >> n;\n  int arr[n];\n  int hi = 0;\n  for (int i = 0; i < n; i++) { cin >> arr[i]; if (arr[i] > hi) hi = arr[i]; }\n  cin >> threshold;\n\n  int lo = 1, ans = hi;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (check(arr, n, threshold, mid)) { ans = mid; hi = mid - 1; }\n    else lo = mid + 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: `Binary search on divisor value.

Diagram:

  arr = [1, 2, 5, 9], threshold = 6
  Range: lo=1, hi=9

  Step 1: mid = 5
           sum = ceil(1/5)+ceil(2/5)+ceil(5/5)+ceil(9/5)
               = 1+1+1+2 = 5 <= 6 -> feasible, ans=5, hi=4

  Step 2: mid = 2
           sum = 1+1+3+5 = 10 > 6 -> infeasible, lo=3

  Step 3: mid = 3
           sum = 1+1+2+3 = 7 > 6 -> infeasible, lo=4

  Step 4: mid = 4
           sum = 1+1+2+3 = 7 > 6 -> infeasible, lo=5

  Step 5: lo=5 > hi=4, exit -> ans=5

Monotonic: larger divisors always reduce sum. Find smallest divisor where sum <= threshold.`,
    complexity: {"time":"O(n log max)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Find the Smallest Divisor Given a Threshold\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=1,hi=*max_element(arr,arr+n),ans=hi; while(lo<=hi){int m=lo+(hi-lo)/2;long long sum=0;for(int i=0;i<n;i++)sum+=(arr[i]+m-1)/m;if(sum<=threshold){ans=m;hi=m-1;}else lo=m+1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "painter-partition",
    title: "Painter's Partition Problem",
    category: "binary-search",
    difficulty: "hard",
    description: "Partition boards among k painters minimizing max time (each unit length = 1 unit time).",
    constraints: "1 <= k <= n <= 10^5",
    examples: [
      {"input":"4 2\n10 20 30 40","output":"60","explanation":"Painter1: [10,20,30]=60, Painter2: [40]=40, max=60"}
    ],
    test_cases: [
      {"input":"4 2\n10 20 30 40","expected":"60"},
      {"input":"2 2\n5 5","expected":"5"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nbool canPaint(int boards[], int n, int k, long long maxTime) {\n  int cnt = 1;\n  long long sum = 0;\n  for (int i = 0; i < n; i++) {\n    if (boards[i] > maxTime) return false;\n    if (sum + boards[i] > maxTime) { cnt++; sum = boards[i]; }\n    else sum += boards[i];\n  }\n  return cnt <= k;\n}\n\nint main() {\n  int n, k; cin >> n >> k;\n  int boards[n];\n  long long lo = 0, hi = 0;\n  for (int i = 0; i < n; i++) { cin >> boards[i]; hi += boards[i]; lo = max(lo, (long long)boards[i]); }\n\n  long long ans = hi;\n  while (lo <= hi) {\n    long long mid = lo + (hi-lo)/2;\n    if (canPaint(boards, n, k, mid)) { ans = mid; hi = mid - 1; }\n    else lo = mid + 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: `Binary search on maximum painting time.

Diagram:

  boards = [10, 20, 30, 40], k = 2 painters
  lo = max = 40, hi = sum = 100

  Step 1: mid = 70
           P1: 10+20+30=60 <=70, P2: 40 <=70
           2 painters -> feasible, ans=70, hi=69

  Step 2: mid = 55
           P1: 10+20+30=60 >55 -> P1:10+20=30, P2:30+40=70>55 -> P2:30, P3:40
           3 > 2 -> infeasible, lo=56

  Step 3: mid = 62
           P1: 10+20+30=60 <=62, P2: 40 <=62
           2 -> feasible, ans=62, hi=61

  Step 4: mid = 58
           P1: 10+20+30=60 >58 -> P1:10+20=30, P2:30+40=70>58 -> P2:30, P3:40
           3 > 2 -> infeasible, lo=59

  Step 5: mid = 60
           P1: 10+20+30=60 <=60, P2: 40 <=60
           2 -> feasible, ans=60, hi=59

  Step 6: lo=60 > hi=59 -> ans=60

Identical to book allocation. Binary search on max time, greedy allocate to painters.`,
    complexity: {"time":"O(n log sum)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Painter's Partition Problem\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "GeeksforGeeks",
    solution_code: "long long lo=*max_element(boards,boards+n),hi=accumulate(boards,boards+n,0LL),ans=hi; while(lo<=hi){long long m=lo+(hi-lo)/2;if(canPaint(boards,n,k,m)){ans=m;hi=m-1;}else lo=m+1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "time-based-kv",
    title: "Time Based Key-Value Store",
    category: "binary-search",
    difficulty: "medium",
    description: "Design a store that stores multiple values per key at different timestamps and retrieves the value at a given timestamp.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"set foo bar 1\nget foo 1\nget foo 3\nset foo bar2 4\nget foo 4\nget foo 5","output":"null bar bar bar2 bar2"}
    ],
    test_cases: [
      {"input":"set foo bar 1\nget foo 1\nset foo bar2 4\nget foo 4\nget foo 5","expected":"null bar bar2 bar2"}
    ],
    solution_template: "#include <iostream>\n#include <unordered_map>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass TimeMap {\n  unordered_map<string, vector<pair<int, string>>> mp;\npublic:\n  void set(string key, string value, int timestamp) {\n    mp[key].push_back({timestamp, value});\n  }\n\n  string get(string key, int timestamp) {\n    auto& v = mp[key];\n    int lo = 0, hi = v.size()-1;\n    string ans = \"\";\n    while (lo <= hi) {\n      int mid = lo + (hi-lo)/2;\n      if (v[mid].first <= timestamp) { ans = v[mid].second; lo = mid + 1; }\n      else hi = mid - 1;\n    }\n    return ans.empty() ? \"null\" : ans;\n  }\n};\n\nint main() {\n  TimeMap tm;\n  string op, key, val; int ts;\n  while (cin >> op) {\n    if (op == \"set\") { cin >> key >> val >> ts; tm.set(key, val, ts); }\n    else if (op == \"get\") { cin >> key >> ts; cout << tm.get(key, ts) << \" \"; }\n  }\n  return 0;\n}",
    approach: `Binary search on timestamp array per key.

Diagram:

  Operations:
    set("foo", "bar", 1)   -> foo: [(1, bar)]
    get("foo", 1)          -> search timestamps <=1, ans="bar"
    get("foo", 3)          -> search timestamps <=3, ans="bar" (last <=3)
    set("foo", "bar2", 4)  -> foo: [(1, bar), (4, bar2)]
    get("foo", 4)          -> search timestamps <=4, ans="bar2"
    get("foo", 5)          -> search timestamps <=5, ans="bar2"

  Timeline for key "foo":
    timestamp:    1          4
                  bar       bar2

  get("foo", 3):
    Search [(1,bar), (4,bar2)]
    Step 1: lo=0, hi=1, mid=0, v[0].first=1 <= 3 -> ans=bar, lo=1
    Step 2: lo=1, hi=1, mid=1, v[1].first=4 <= 3? No -> hi=0
    Exit, ans="bar"

  get("foo", 4):
    Step 1: mid=0, 1 <= 4 -> ans=bar, lo=1
    Step 2: mid=1, 4 <= 4 -> ans=bar2, lo=2
    Exit, ans="bar2"

Timestamps are strictly increasing per key (guaranteed by set order). Upper bound binary search finds last timestamp <= given timestamp.`,
    complexity: {"time":"O(log n) per get","space":"O(n)"},
    mermaid: "flowchart TD\n  A[\"Time Based Key-Value Store\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "auto& v=mp[key];int lo=0,hi=v.size()-1;string ans=\"\";while(lo<=hi){int m=lo+(hi-lo)/2;if(v[m].first<=ts){ans=v[m].second;lo=m+1;}else hi=m-1;}return ans.empty()?\"null\":ans;",
    techniques: ["binary-search"],
  },
  {
    id: "random-pick-weight",
    title: "Random Pick with Weight",
    category: "binary-search",
    difficulty: "medium",
    description: "Pick an index proportional to its weight using prefix sums and binary search.",
    constraints: "1 <= n <= 10^4, 1 <= weight[i] <= 10^5",
    examples: [
      {"input":"3\n1 3\n","output":"Explanation: pick index 1 with 3/4 probability"}
    ],
    test_cases: [
      {"input":"2\n1 3","expected":"1"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <cstdlib>\nusing namespace std;\n\nclass Solution {\n  vector<int> pref;\n  int total;\npublic:\n  Solution(vector<int>& w) {\n    total = 0;\n    for (int wt : w) { total += wt; pref.push_back(total); }\n  }\n\n  int pickIndex() {\n    int r = rand() % total + 1;\n    int lo = 0, hi = pref.size()-1;\n    while (lo < hi) {\n      int mid = lo + (hi-lo)/2;\n      if (pref[mid] < r) lo = mid + 1;\n      else hi = mid;\n    }\n    return lo;\n  }\n};\n\nint main() {\n  int n; cin >> n;\n  vector<int> w(n);\n  for (int i = 0; i < n; i++) cin >> w[i];\n  Solution s(w);\n  cout << s.pickIndex() << endl;\n  return 0;\n}",
    approach: `Prefix sums + binary search for weighted random selection.

Diagram:

  weights = [1, 3]
  pref = [1, 4], total = 4

  Visual representation of ranges:
    Index 0: [1, 1]   (weight 1)
    Index 1: [2, 4]   (weight 3)

  r = random(1..4)

  If r=1: search pref=[1,4]
    lo=0, hi=1, mid=0, pref[0]=1 < r=1? No -> hi=0
    return 0 (weight 1 range)

  If r=3: search pref=[1,4]
    lo=0, hi=1, mid=0, pref[0]=1 < r=3? Yes -> lo=1
    lo=1, hi=1, exit -> return 1 (weight 3 range)

  r=1 -> index 0 (25%), r=2,3,4 -> index 1 (75%)

lower_bound on prefix sums: find first pref[mid] >= r.`,
    complexity: {"time":"O(log n) per pick, O(n) init","space":"O(n)"},
    mermaid: "flowchart TD\n  A[\"Random Pick with Weight\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int r=rand()%total+1,lo=0,hi=pref.size()-1;while(lo<hi){int m=lo+(hi-lo)/2;if(pref[m]<r)lo=m+1;else hi=m;}return lo;",
    techniques: ["binary-search"],
  },
  {
    id: "find-right-interval",
    title: "Find Right Interval",
    category: "binary-search",
    difficulty: "medium",
    description: "For each interval, find the interval with smallest start >= its end.",
    constraints: "1 <= n <= 2*10^4",
    examples: [
      {"input":"3\n1 2\n3 5\n6 7","output":"1 2 -1"}
    ],
    test_cases: [
      {"input":"3\n1 2\n3 5\n6 7","expected":"1 2 -1"},
      {"input":"1\n2 3","expected":"-1"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  vector<pair<int,int>> intervals(n);\n  vector<pair<int,int>> starts(n);\n  for (int i = 0; i < n; i++) {\n    cin >> intervals[i].first >> intervals[i].second;\n    starts[i] = {intervals[i].first, i};\n  }\n  sort(starts.begin(), starts.end());\n\n  vector<int> ans(n);\n  for (int i = 0; i < n; i++) {\n    int target = intervals[i].second;\n    int lo = 0, hi = n-1, idx = -1;\n    while (lo <= hi) {\n      int mid = lo + (hi-lo)/2;\n      if (starts[mid].first >= target) { idx = starts[mid].second; hi = mid - 1; }\n      else lo = mid + 1;\n    }\n    ans[i] = idx;\n  }\n\n  for (int x : ans) cout << x << \" \";\n  cout << endl;\n  return 0;\n}",
    approach: `Binary search on sorted start points for each end point.

Diagram:

  intervals = [[1,2], [3,5], [6,7]]
  sorted starts: index 0 at 1, index 1 at 3, index 2 at 6

  For interval [1,2]: target end=2
    starts: [(1,0), (3,1), (6,2)]
    lo=0, hi=2, mid=1, starts[1]=3 >= 2? Yes -> ans=idx=1, hi=0
    lo=0, hi=0, mid=0, starts[0]=1 >= 2? No -> lo=1
    Exit, ans=1

  For interval [3,5]: target end=5
    lo=0, hi=2, mid=1, starts[1]=3 >= 5? No -> lo=2
    lo=2, hi=2, mid=2, starts[2]=6 >= 5? Yes -> ans=idx=2, hi=1
    Exit, ans=2

  For interval [6,7]: target end=7
    lo=0, hi=2, mid=1, starts[1]=3 >= 7? No -> lo=2
    lo=2, hi=2, mid=2, starts[2]=6 >= 7? No -> lo=3
    Exit, ans=-1

Collect all start points with original indices, sort, then for each interval binary search first start >= end.`,
    complexity: {"time":"O(n log n)","space":"O(n)"},
    mermaid: "flowchart TD\n  A[\"Find Right Interval\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "sort(starts,starts+n); for(int i=0;i<n;i++){int t=intervals[i].second,lo=0,hi=n-1,idx=-1;while(lo<=hi){int m=lo+(hi-lo)/2;if(starts[m].first>=t){idx=starts[m].second;hi=m-1;}else lo=m+1;}cout<<idx<<\" \";}",
    techniques: ["binary-search"],
  },
  {
    id: "kth-smallest-matrix",
    title: "Kth Smallest Element in a Sorted Matrix",
    category: "binary-search",
    difficulty: "medium",
    description: "Find kth smallest element in a row-wise and column-wise sorted matrix.",
    constraints: "1 <= n <= 300, 1 <= k <= n^2",
    examples: [
      {"input":"3\n1 5 9\n10 11 13\n12 13 15\n8","output":"13"}
    ],
    test_cases: [
      {"input":"3\n1 5 9\n10 11 13\n12 13 15\n8","expected":"13"},
      {"input":"2\n1 2\n1 3\n3","expected":"2"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint countLeq(int matrix[][300], int n, int x) {\n  int cnt = 0, row = n-1, col = 0;\n  while (row >= 0 && col < n) {\n    if (matrix[row][col] <= x) { cnt += row + 1; col++; }\n    else row--;\n  }\n  return cnt;\n}\n\nint main() {\n  int n, k; cin >> n;\n  int matrix[300][300];\n  int lo = 1000000000, hi = -1000000000;\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++) {\n      cin >> matrix[i][j];\n      lo = min(lo, matrix[i][j]);\n      hi = max(hi, matrix[i][j]);\n    }\n  cin >> k;\n\n  int ans = lo;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (countLeq(matrix, n, mid) >= k) { ans = mid; hi = mid - 1; }\n    else lo = mid + 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: `Binary search on value range, counting elements <= mid.

Diagram:

  matrix = [[1, 5, 9],
            [10, 11, 13],
            [12, 13, 15]]
  k = 8

  Range: lo=1, hi=15

  Step 1: mid = 8
           Count <=8 using stair-step from bottom-left:
           Start row=2, col=0: 12 > 8 -> row=1
           row=1, col=0: 10 > 8 -> row=0
           row=0, col=0: 1 <= 8 -> cnt+=1, col=1
           row=0, col=1: 5 <= 8 -> cnt+=1, col=2
           row=0, col=2: 9 > 8 -> row=-1
           cnt=2 < 8 -> lo=9

  Step 2: mid = 12
           Count <=12: 1,5,9,10,11,12 (col0 row2=12) = 6 < 8 -> lo=13

  Step 3: mid = 14
           Count <=14: 1,5,9,10,11,13,12,13 = 8 >= 8 -> ans=14, hi=13

  Step 4: mid = 13
           Count <=13: 1,5,9,10,11,13,12,13 = 8 >= 8 -> ans=13, hi=12
           Exit, ans=13

Stair-step counting (O(n)) leverages row/col sorted property: start bottom-left, move right if value <= mid, up otherwise.`,
    complexity: {"time":"O(n log range)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Kth Smallest Element in a Sorted Matrix\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=matrix[0][0],hi=matrix[n-1][n-1],ans=lo; while(lo<=hi){int m=lo+(hi-lo)/2,cnt=0,row=n-1,col=0;while(row>=0&&col<n){if(matrix[row][col]<=m){cnt+=row+1;col++;}else row--;}if(cnt>=k){ans=m;hi=m-1;}else lo=m+1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "kth-smallest-distance",
    title: "Find Kth Smallest Pair Distance",
    category: "binary-search",
    difficulty: "hard",
    description: "Find kth smallest absolute difference between any two elements in an array.",
    constraints: "2 <= n <= 10^4, 1 <= k <= n*(n-1)/2",
    examples: [
      {"input":"4\n1 3 1\n1","output":"0","explanation":"Pairs: (1,1)=0, (1,3)=2, (1,3)=2, (3,1)=2, distances sorted: {0,2,2,2,2,2}, k=1 -> 0"}
    ],
    test_cases: [
      {"input":"4\n1 3 1\n1","expected":"0"},
      {"input":"3\n1 6 1\n3","expected":"5"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint countPairs(int arr[], int n, int d) {\n  int cnt = 0, j = 0;\n  for (int i = 0; i < n; i++) {\n    while (j < n && arr[j] - arr[i] <= d) j++;\n    cnt += j - i - 1;\n  }\n  return cnt;\n}\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n\n  sort(arr, arr + n);\n  int lo = 0, hi = arr[n-1] - arr[0], ans = 0;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    if (countPairs(arr, n, mid) >= k) { ans = mid; hi = mid - 1; }\n    else lo = mid + 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: `Binary search on distance value, counting pairs with distance <= mid.

Diagram:

  arr = [1, 1, 3] (sorted), k = 1
  Sorted: [1, 1, 3], range: lo=0, hi=2

  Step 1: mid = 1
           Count pairs with diff <= 1:
           i=0: j starts at 0, while arr[j]-1 <= 1: j=0(0<=1),j=1(0<=1),j=2(2>1) stop, cnt+=2-0-1=1
           i=1: j=2, arr[2]-1=2>1? No, j stays 2, cnt+=2-1-1=0
           Total: 1 >= 1 -> ans=1, hi=0

  Step 2: mid = 0
           Count pairs with diff <= 0:
           i=0: j=0(0<=0),j=1(0<=0),j=2(2>0) stop, cnt+=1
           i=1: j=2(2>0) no move, cnt+=0
           Total: 1 >= 1 -> ans=0, hi=-1
           Exit, ans=0

Two-pointer counting: for each i, find first j where arr[j]-arr[i] > mid, add (j-i-1) pairs.`,
    complexity: {"time":"O(n log range + n log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Find Kth Smallest Pair Distance\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "sort(arr,arr+n); int lo=0,hi=arr[n-1]-arr[0],ans=0; while(lo<=hi){int m=lo+(hi-lo)/2,cnt=0,j=0;for(int i=0;i<n;i++){while(j<n&&arr[j]-arr[i]<=m)j++;cnt+=j-i-1;}if(cnt>=k){ans=m;hi=m-1;}else lo=m+1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "find-peak-element-ii",
    title: "Find Peak Element II (2D Matrix)",
    category: "binary-search",
    difficulty: "medium",
    description: "Find a peak element in a 2D matrix where element is greater than all adjacent neighbors (up/down/left/right).",
    constraints: "1 <= n,m <= 300",
    examples: [
      {"input":"3 4\n10 20 15\n21 30 14\n7 16 32","output":"1 1","explanation":"arr[1][1]=30 is a peak (all neighbors smaller)"}
    ],
    test_cases: [
      {"input":"3 4\n10 20 15\n21 30 14\n7 16 32","expected":"1 1"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[300][300];\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < m; j++)\n      cin >> mat[i][j];\n\n  int lo = 0, hi = n-1;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    int maxCol = 0;\n    for (int j = 0; j < m; j++)\n      if (mat[mid][j] > mat[mid][maxCol]) maxCol = j;\n\n    if (mid == 0 || mat[mid][maxCol] > mat[mid-1][maxCol]) {\n      if (mid == n-1 || mat[mid][maxCol] > mat[mid+1][maxCol]) {\n        cout << mid << \" \" << maxCol << endl; return 0;\n      }\n      lo = mid + 1;\n    } else {\n      hi = mid - 1;\n    }\n  }\n  return 0;\n}",
    approach: `Binary search on rows to find 2D peak.

Diagram:

  matrix = [[10, 20, 15],
            [21, 30, 14],
            [7, 16, 32]]

  Step 1: lo=0, hi=2, mid=1
           Row 1: [21, 30, 14], maxCol=1 (value 30)
           Check up: mat[0][1]=20 < 30, Check down: mat[2][1]=16 < 30
           30 > both neighbors -> peak at (1,1)

  Another example with peak at bottom:
  matrix = [[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]]

  Step 1: mid=1, row 1 max at col=2 (value 6)
           mat[1][2]=6 > mat[0][2]=3? Yes
           mat[1][2]=6 > mat[2][2]=9? No -> lo=2

  Step 2: mid=2, row 2 max at col=2 (value 9)
           mat[2][2]=9 > mat[1][2]=6? Yes
           Row 2 is last row -> peak at (2,2)

Find max in middle row. If it's greater than both vertical neighbors, return. Otherwise move toward the larger neighbor.`,
    complexity: {"time":"O(n log m)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Find Peak Element II (2D Matrix)\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=0,hi=n-1; while(lo<=hi){int m=lo+(hi-lo)/2,mc=0;for(int j=0;j<m;j++)if(mat[m][j]>mat[m][mc])mc=j;if((m==0||mat[m][mc]>mat[m-1][mc])&&(m==n-1||mat[m][mc]>mat[m+1][mc])){cout<<m<<\" \"<<mc;return 0;}if(m>0&&mat[m][mc]<mat[m-1][mc])hi=m-1;else lo=m+1;}",
    techniques: ["binary-search"],
  },
  {
    id: "missing-number-bs",
    title: "Missing Number (Binary Search)",
    category: "binary-search",
    difficulty: "easy",
    description: "Find the missing number in array containing numbers [0, n] with one missing.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"3\n3 0 1","output":"2"}
    ],
    test_cases: [
      {"input":"3\n3 0 1","expected":"2"},
      {"input":"2\n0 1","expected":"2"},
      {"input":"1\n1","expected":"0"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  sort(arr, arr + n);\n\n  int lo = 0, hi = n;\n  while (lo < hi) {\n    int mid = lo + (hi-lo)/2;\n    if (arr[mid] > mid) hi = mid;\n    else lo = mid + 1;\n  }\n  cout << lo << endl;\n  return 0;\n}",
    approach: `Binary search on sorted array to find first index where arr[i] != i.

Diagram:

  arr = [3, 0, 1] -> sort -> [0, 1, 3], n=3

  Step 1: [0, 1, 3]
            ^     ^  ^
           lo   mid hi
           mid=1, arr[1]=1 == 1 -> lo=2

  Step 2: [0, 1, 3]
                  ^  ^
                 lo hi (mid=2)
           mid=2, arr[2]=3 > 2 -> hi=2
           lo=2 == hi=2 -> return 2

  arr = [0, 1] -> already sorted, n=2

  Step 1: mid=1, arr[1]=1 == 1 -> lo=2
  Step 2: lo=2 == hi=2 -> return 2

If array is [0..n] missing one, after sorting arr[i] should equal i for all i < missing number. First arr[i] > i gives the missing number.`,
    complexity: {"time":"O(n log n) dominant sort","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Missing Number (Binary Search)\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "sort(arr,arr+n); int lo=0,hi=n; while(lo<hi){int m=lo+(hi-lo)/2;if(arr[m]>m)hi=m;else lo=m+1;}cout<<lo;",
    techniques: ["binary-search"],
  },
  {
    id: "find-duplicate-bs",
    title: "Find the Duplicate Number (Binary Search)",
    category: "binary-search",
    difficulty: "medium",
    description: "Find the duplicate number in array of size n+1 containing numbers 1..n.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n1 3 4 2 2","output":"2"}
    ],
    test_cases: [
      {"input":"5\n1 3 4 2 2","expected":"2"},
      {"input":"5\n3 1 3 4 2","expected":"3"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n+1];\n  for (int i = 0; i < n+1; i++) cin >> arr[i];\n\n  int lo = 1, hi = n, ans = -1;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    int cnt = 0;\n    for (int i = 0; i < n+1; i++)\n      if (arr[i] <= mid) cnt++;\n    if (cnt > mid) { ans = mid; hi = mid - 1; }\n    else lo = mid + 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: `Binary search on value range, counting elements <= mid.

Diagram:

  arr = [1, 3, 4, 2, 2], n=4
  Range: lo=1, hi=4

  Step 1: mid = 2
           Count elements <= 2: {1, 2, 2} = 3
           cnt=3 > mid=2 -> duplicate <= 2, ans=2, hi=1

  Step 2: mid = 1
           Count elements <= 1: {1} = 1
           cnt=1 > mid=1? No (equal) -> lo=2

  Step 3: lo=2 > hi=1, exit, ans=2

  arr = [3, 1, 3, 4, 2], n=4

  Step 1: mid=2, cnt<=2 = {1,2}=2, cnt=2 > mid=2? No -> lo=3
  Step 2: mid=3, cnt<=3 = {3,1,3,2}=4, cnt=4 > mid=3? Yes -> ans=3, hi=2
  Step 3: lo=3 > hi=2, exit, ans=3

Pigeonhole principle: if numbers are 1..n and array has n+1 elements, count of numbers <= mid being > mid indicates duplicate in [1..mid].`,
    complexity: {"time":"O(n log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Find the Duplicate Number (Binary Search)\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=1,hi=n,ans=-1; while(lo<=hi){int m=lo+(hi-lo)/2,c=0;for(int i=0;i<n+1;i++)if(arr[i]<=m)c++;if(c>m){ans=m;hi=m-1;}else lo=m+1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "find-closest-elements",
    title: "Find K Closest Elements",
    category: "binary-search",
    difficulty: "medium",
    description: "Find k closest elements to target in sorted array.",
    constraints: "1 <= n <= 10^4, 1 <= k <= n",
    examples: [
      {"input":"6\n1 2 3 4 5\n4 3","output":"1 2 3 4"}
    ],
    test_cases: [
      {"input":"6\n1 2 3 4 5\n4 3","expected":"1 2 3 4"},
      {"input":"5\n1 2 3 4 5\n4 -1","expected":"1 2 3 4"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, k, x; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k >> x;\n\n  int lo = 0, hi = n - k;\n  while (lo < hi) {\n    int mid = lo + (hi-lo)/2;\n    if (x - arr[mid] > arr[mid+k] - x) lo = mid + 1;\n    else hi = mid;\n  }\n\n  for (int i = lo; i < lo+k; i++) cout << arr[i] << \" \";\n  cout << endl;\n  return 0;\n}",
    approach: `Binary search for best left bound of k-element window.

Diagram:

  arr = [1, 2, 3, 4, 5], k = 4, x = 3
  lo=0, hi=n-k=1

  Step 1: mid = 0
           Compare: x - arr[0] = 3-1=2 vs arr[0+4]-x = 5-3=2
           2 > 2? No -> hi=0
           lo=0 == hi=0 -> window starts at 0

  Output: [1, 2, 3, 4]

  arr = [1, 2, 3, 4, 5], k = 4, x = -1
  lo=0, hi=1

  Step 1: mid = 0
           x - arr[0] = -1-1 = -2 vs arr[4]-x = 5-(-1)=6
           -2 > 6? No -> hi=0
           lo=0, window [1,2,3,4]

For each mid (start candidate), compare distance to arr[mid] and arr[mid+k]. If left element further away than right, shift window right.`,
    complexity: {"time":"O(log(n-k) + k)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Find K Closest Elements\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=0,hi=n-k; while(lo<hi){int m=lo+(hi-lo)/2;if(x-arr[m]>arr[m+k]-x)lo=m+1;else hi=m;}for(int i=lo;i<lo+k;i++)cout<<arr[i]<<\" \";",
    techniques: ["binary-search"],
  },
  {
    id: "h-index-ii",
    title: "H-Index II (Binary Search)",
    category: "binary-search",
    difficulty: "medium",
    description: "Calculate h-index from sorted citations array.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n0 1 3 5 6","output":"3","explanation":"3 papers have >=3 citations"}
    ],
    test_cases: [
      {"input":"5\n0 1 3 5 6","expected":"3"},
      {"input":"3\n1 4 7","expected":"2"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  int lo = 0, hi = n-1, ans = 0;\n  while (lo <= hi) {\n    int mid = lo + (hi-lo)/2;\n    int papers = n - mid;\n    if (arr[mid] >= papers) { ans = papers; hi = mid - 1; }\n    else lo = mid + 1;\n  }\n  cout << ans << endl;\n  return 0;\n}",
    approach: `Binary search for first index where citations[i] >= n-i.

Diagram:

  arr = [0, 1, 3, 5, 6], n = 5

  Step 1: lo=0, hi=4, mid=2
           arr[2]=3, papers remaining = 5-2 = 3
           3 >= 3? Yes -> ans=3, hi=1

  Step 2: mid=0, arr[0]=0, papers=5, 0>=5? No -> lo=1
  Step 3: mid=1, arr[1]=1, papers=4, 1>=4? No -> lo=2
           lo=2 > hi=1, exit, ans=3

  arr = [1, 4, 7], n = 3

  Step 1: mid=1, arr[1]=4, papers=2, 4>=2 -> ans=2, hi=0
  Step 2: mid=0, arr[0]=1, papers=3, 1>=3? No -> lo=1
           lo=1 > hi=0, exit, ans=2

h-index is max h such that at least h papers have >= h citations. In sorted ascending order, find first arr[i] >= n-i, then h = n-i.`,
    complexity: {"time":"O(log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"H-Index II (Binary Search)\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=0,hi=n-1,ans=0; while(lo<=hi){int m=lo+(hi-lo)/2,p=n-m;if(arr[m]>=p){ans=p;hi=m-1;}else lo=m+1;}cout<<ans;",
    techniques: ["binary-search"],
  },
  {
    id: "intersection-sorted",
    title: "Intersection of Two Sorted Arrays",
    category: "binary-search",
    difficulty: "easy",
    description: "Find intersection (unique common elements) of two sorted arrays.",
    constraints: "1 <= n,m <= 10^5",
    examples: [
      {"input":"4\n1 2 2 1\n2\n2 2","output":"2"}
    ],
    test_cases: [
      {"input":"4\n1 2 2 1\n2\n2 2","expected":"2"},
      {"input":"5\n4 9 5\n4\n9 4 9 8 4","expected":"4 9"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n;\n  int a[n]; for(int i=0;i<n;i++) cin>>a[i];\n  cin>>m;\n  int b[m]; for(int i=0;i<m;i++) cin>>b[i];\n  sort(a,a+n); sort(b,b+m);\n\n  vector<int> ans;\n  for (int i = 0; i < n; i++) {\n    if (i > 0 && a[i] == a[i-1]) continue;\n    int lo = 0, hi = m-1;\n    bool found = false;\n    while (lo <= hi) {\n      int mid = lo + (hi-lo)/2;\n      if (b[mid] == a[i]) { found = true; break; }\n      if (b[mid] < a[i]) lo = mid + 1;\n      else hi = mid - 1;\n    }\n    if (found) ans.push_back(a[i]);\n  }\n\n  for (int x : ans) cout << x << \" \";\n  cout << endl;\n  return 0;\n}",
    approach: `Binary search each unique element from first array in second.

Diagram:

  a = [1, 2, 2, 1] -> unique sorted: [1, 2]
  b = [2, 2] -> sorted: [2, 2]

  Check 1 in b:
    lo=0, hi=1, mid=0, b[0]=2 > 1 -> hi=-1
    not found

  Check 2 in b:
    lo=0, hi=1, mid=0, b[0]=2 == 2 -> found
    ans = [2]

  Alternative: two-pointer merge is O(n+m). Binary search per unique element is O(n log m).`,
    complexity: {"time":"O(n log m)","space":"O(n)"},
    mermaid: "flowchart TD\n  A[\"Intersection of Two Sorted Arrays\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "sort(a,a+n);sort(b,b+m); vector<int>ans; for(int i=0;i<n;i++){if(i&&a[i]==a[i-1])continue;int lo=0,hi=m-1;while(lo<=hi){int m=lo+(hi-lo)/2;if(b[m]==a[i]){ans.push_back(a[i]);break;}if(b[m]<a[i])lo=m+1;else hi=m-1;}} for(int x:ans)cout<<x<<\" \";",
    techniques: ["binary-search"],
  },
  {
    id: "count-negatives-sorted",
    title: "Count Negative Numbers in a Sorted Matrix",
    category: "binary-search",
    difficulty: "easy",
    description: "Count negative numbers in a row-wise and column-wise sorted matrix.",
    constraints: "1 <= n,m <= 100",
    examples: [
      {"input":"3 4\n4 3 2 -1\n3 2 1 -1\n1 1 -1 -2\n","output":"5"}
    ],
    test_cases: [
      {"input":"3 4\n4 3 2 -1\n3 2 1 -1\n1 1 -1 -2","expected":"5"},
      {"input":"2 2\n3 2\n1 0","expected":"0"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, m; cin >> n >> m;\n  int mat[100][100];\n  for (int i = 0; i < n; i++)\n    for (int j = 0; j < m; j++)\n      cin >> mat[i][j];\n\n  int cnt = 0;\n  for (int i = 0; i < n; i++) {\n    int lo = 0, hi = m-1, pos = -1;\n    while (lo <= hi) {\n      int mid = lo + (hi-lo)/2;\n      if (mat[i][mid] < 0) { pos = mid; hi = mid - 1; }\n      else lo = mid + 1;\n    }\n    if (pos != -1) cnt += m - pos;\n  }\n  cout << cnt << endl;\n  return 0;\n}",
    approach: `Binary search per row to find first negative index.

Diagram:

  matrix = [[4, 3, 2, -1],
            [3, 2, 1, -1],
            [1, 1, -1, -2]]

  Row 0: [4, 3, 2, -1]
    lo=0, hi=3, mid=1, mat[0][1]=3 >=0 -> lo=2
    mid=2, mat[0][2]=2 >=0 -> lo=3
    mid=3, mat[0][3]=-1 < 0 -> pos=3, hi=2
    cnt += 4-3 = 1

  Row 1: [3, 2, 1, -1]
    mid=1 -> lo=2, mid=2 -> lo=3, mid=3 pos=3
    cnt += 4-3 = 1

  Row 2: [1, 1, -1, -2]
    mid=1 -> lo=2, mid=2 pos=2
    cnt += 4-2 = 2

  Total: 1+1+2 = 5

For each sorted row, binary search first negative index, then all elements to its right are also negative.`,
    complexity: {"time":"O(n log m)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Count Negative Numbers in a Sorted Matrix\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int cnt=0; for(int i=0;i<n;i++){int lo=0,hi=m-1,pos=-1;while(lo<=hi){int m=lo+(hi-lo)/2;if(mat[i][m]<0){pos=m;hi=m-1;}else lo=m+1;}if(pos!=-1)cnt+=m-pos;}cout<<cnt;",
    techniques: ["binary-search"],
  },
  {
    id: "smallest-greater-letter",
    title: "Find Smallest Letter Greater Than Target",
    category: "binary-search",
    difficulty: "easy",
    description: "Find smallest character in sorted array that is greater than target. Letters wrap around.",
    constraints: "2 <= n <= 10^4",
    examples: [
      {"input":"3\na c f\nb","output":"c"}
    ],
    test_cases: [
      {"input":"3\na c f\nb","expected":"c"},
      {"input":"3\na c f\nz","expected":"a"},
      {"input":"3\na c f\nc","expected":"f"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  char letters[n];\n  for (int i = 0; i < n; i++) cin >> letters[i];\n  char target; cin >> target;\n\n  int lo = 0, hi = n;\n  while (lo < hi) {\n    int mid = lo + (hi-lo)/2;\n    if (letters[mid] <= target) lo = mid + 1;\n    else hi = mid;\n  }\n  cout << (lo == n ? letters[0] : letters[lo]) << endl;\n  return 0;\n}",
    approach: `Binary search for upper_bound (first character > target), wrap around if none.

Diagram:

  letters = ['a', 'c', 'f'], target = 'c'

  Step 1: ['a', 'c', 'f']
            ^     ^     ^
           lo   mid    hi (n=3)
           letters[1]='c' <= 'c'? Yes -> lo=2

  Step 2: ['a', 'c', 'f']
                       ^  ^
                      lo hi (mid=2)
           letters[2]='f' <= 'c'? No -> hi=2
           lo=2 == hi=2 -> return letters[2]='f'

  target = 'z'
  Step 1: mid=1, 'c' <= 'z' -> lo=2
  Step 2: mid=2, 'f' <= 'z' -> lo=3
           lo=3 == n -> wrap: return letters[0]='a'

Standard upper_bound: find first character strictly greater than target. If none (lo==n), return first due to wrap-around.`,
    complexity: {"time":"O(log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Find Smallest Letter Greater Than Target\"] --> B[\"low=0, high=n-1\"]\n  B --> C{\"low <= high?\"}\n  C -->|Yes| D[\"mid = (low+high)/2\"]\n  D --> E{\"arr[mid] == target?\"}\n  E -->|Yes| F[\"Return mid\"]\n  E -->|\"< target\"| G[\"low = mid+1\"]\n  E -->|\"> target\"| H[\"high = mid-1\"]\n  G --> C\n  H --> C\n  C -->|No| I[\"Return -1\"]",
    sheet: "LeetCode",
    solution_code: "int lo=0,hi=n; while(lo<hi){int m=lo+(hi-lo)/2;if(letters[m]<=target)lo=m+1;else hi=m;}cout<<(lo==n?letters[0]:letters[lo]);",
    techniques: ["binary-search"],
  },
];
