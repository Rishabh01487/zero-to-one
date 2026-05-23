export default [
  {
    id: "two-sum-sorted",
    title: "Two Sum II - Input Array Sorted",
    category: "two-pointers",
    difficulty: "medium",
    description: "Find two numbers in sorted array that sum to target.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n2 7 11 15\n9","output":"1 2"}
    ],
    test_cases: [
      {"input":"4\n2 7 11 15\n9","expected":"1 2"}
    ],
    approach: `Two-pointer on sorted array. Initialize left=0, right=n-1. Compute sum = arr[left]+arr[right]. If sum == target, return indices. If sum < target, left++ (need larger sum). If sum > target, right-- (need smaller sum). Repeat until left >= right.

Diagram:
arr = [2, 7, 11, 15], target = 9

Step 1: left=0 right=3
  [2, 7, 11, 15]
   ↑           ↑
  sum = 2+15 = 17 > 9 → right--

Step 2: left=0 right=2
  [2, 7, 11, 15]
   ↑        ↑
  sum = 2+11 = 13 > 9 → right--

Step 3: left=0 right=1
  [2, 7, 11, 15]
   ↑     ↑
  sum = 2+7 = 9 == target → return [1,2] (1-based)

Edge cases: no valid pair (loop exits without return), duplicates in array, target as sum of first+last.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Two Sum II - Input Array Sorted\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "int i = 0, j = n-1;\nwhile (i < j) {\n  int sum = arr[i] + arr[j];\n  if (sum == target) { cout << i+1 << \" \" << j+1; return 0; }\n  else if (sum < target) i++;\n  else j--;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> target;\n  // two pointers\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "three-sum",
    title: "3Sum",
    category: "two-pointers",
    difficulty: "medium",
    description: "Find all unique triplets that sum to zero.",
    constraints: "1 <= n <= 3000",
    examples: [
      {"input":"6\n-1 0 1 2 -1 -4","output":"-1 -1 2\n-1 0 1"}
    ],
    test_cases: [
      {"input":"6\n-1 0 1 2 -1 -4","expected":"-1 -1 2\n-1 0 1"}
    ],
    approach: `Sort the array. Fix i from 0 to n-3. Use left=i+1, right=n-1 to find pairs summing to -arr[i]. Skip duplicates at i, left, and right levels. Move left++ when sum < 0, right-- when sum > 0.

Diagram:
arr = [-1,0,1,2,-1,-4], target = 0
sorted = [-4,-1,-1,0,1,2]

i=0 (-4), need sum=4:
  [-4, -1, -1, 0, 1, 2]
   i   ↑              ↑
      left=-1       right=2
  sum = -1+2 = 1 < 4 → left++
  → left=-1 sum=1 <4 → left=0 sum=2 <4 → left=1 sum=3 <4 → left=2 stop

i=1 (-1), need sum=1:
  [-4, -1, -1, 0, 1, 2]
       i   ↑         ↑
         left=-1  right=2
  sum = -1+2 = 1 → record [-1,-1,2]

i=1 (-1), continue:
  [-4, -1, -1, 0, 1, 2]
       i      ↑   ↑
          left=0 right=1
  sum = 0+1 = 1 → record [-1,0,1]; skip duplicates

Edge cases: no triplets, all zeros, large negatives, all same element.`,
    complexity: {"time":"O(n²)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"3Sum\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "sort(nums, nums+n);\nfor (int i = 0; i < n-2; i++) {\n  if (i > 0 && nums[i] == nums[i-1]) continue;\n  int j = i+1, k = n-1;\n  while (j < k) {\n    int sum = nums[i] + nums[j] + nums[k];\n    if (sum == 0) { /* record triplet */ j++; k--; while (j < k && nums[j]==nums[j-1]) j++; while (j < k && nums[k]==nums[k+1]) k--; }\n    else if (sum < 0) j++;\n    else k--;\n  }\n}",
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // sort + two pointers\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "container-water",
    title: "Container With Most Water",
    category: "two-pointers",
    difficulty: "medium",
    description: "Find max water container formed by two vertical lines.",
    constraints: "2 <= n <= 10^5",
    examples: [
      {"input":"9\n1 8 6 2 5 4 8 3 7","output":"49"}
    ],
    test_cases: [
      {"input":"9\n1 8 6 2 5 4 8 3 7","expected":"49"}
    ],
    approach: `Area = min(height[i], height[j]) * (j-i). Start left=0, right=n-1. Always move the pointer with smaller height inward because the shorter line limits the area. Update max area each step. Width shrinks, so only way to increase area is taller min-height.

Diagram:
heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]

Step 1: left=0(1)  right=8(7)  width=8  area=min(1,7)*8=8    max=8
  [1, 8, 6, 2, 5, 4, 8, 3, 7]
   ↑                          ↑
  1 < 7 → move left++

Step 2: left=1(8)  right=8(7)  width=7  area=min(8,7)*7=49   max=49
  [1, 8, 6, 2, 5, 4, 8, 3, 7]
       ↑                    ↑
  7 < 8 → move right--

Step 3: left=1(8)  right=7(3)  width=6  area=min(8,3)*6=18
  [1, 8, 6, 2, 5, 4, 8, 3, 7]
       ↑                 ↑
  3 < 8 → move right--

(Move smaller pointer each step, track global max)
Continue until pointers cross. Final max = 49.

Edge cases: increasing heights, decreasing heights, only 2 lines, equal heights.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Container With Most Water\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "int i = 0, j = n-1, maxArea = 0;\nwhile (i < j) {\n  int area = min(height[i], height[j]) * (j - i);\n  maxArea = max(maxArea, area);\n  if (height[i] < height[j]) i++;\n  else j--;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int h[n]; for (int i = 0; i < n; i++) cin >> h[i];\n  // two pointers\n  cout << maxArea << endl;\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "remove-duplicates",
    title: "Remove Duplicates from Sorted Array",
    category: "two-pointers",
    difficulty: "easy",
    description: "Remove duplicates in-place from sorted array, return new length.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n1 1 2 2 3","output":"3"}
    ],
    test_cases: [
      {"input":"5\n1 1 2 2 3","expected":"3"}
    ],
    approach: `Slow-fast pointer technique. slow=0 (last unique position). fast iterates 1..n-1. When arr[fast] != arr[slow], increment slow and copy arr[fast] to arr[slow]. Result: first slow+1 elements are unique.

Diagram:
arr = [1, 1, 2, 2, 3]
slow=0, fast=1

Step 1: fast=1, arr[1]=1 == arr[0]=1 → skip (no change)
  [1, 1, 2, 2, 3]
   s  f

Step 2: fast=2, arr[2]=2 != arr[0]=1 → slow=1, arr[1]=2
  [1, 2, 2, 2, 3]
   s  f

Step 3: fast=3, arr[3]=2 == arr[1]=2 → skip
  [1, 2, 2, 2, 3]
      s     f

Step 4: fast=4, arr[4]=3 != arr[1]=2 → slow=2, arr[2]=3
  [1, 2, 3, 2, 3]
         s     f

Return slow+1 = 3. Array = [1,2,3,...].

Edge cases: n=0 (return 0), n=1 (return 1), all same, all unique.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Remove Duplicates from Sorted Array\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "if (n == 0) return 0;\nint slow = 0;\nfor (int fast = 1; fast < n; fast++)\n  if (arr[fast] != arr[slow]) arr[++slow] = arr[fast];",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // two pointer removal\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "four-sum",
    title: "4Sum",
    category: "two-pointers",
    difficulty: "medium",
    description: "Find all unique quadruplets summing to target.",
    constraints: "1 <= n <= 200",
    examples: [
      {"input":"6\n1 0 -1 0 -2 2\n0","output":"-2 -1 1 2\n-2 0 0 2\n-1 0 0 1"}
    ],
    test_cases: [
      {"input":"6\n1 0 -1 0 -2 2\n0","expected":"-2 -1 1 2\n-2 0 0 2\n-1 0 0 1"}
    ],
    approach: `Extension of 3Sum. Sort array. Fix i (0..n-4) and j (i+1..n-3). Use k=j+1, l=n-1 as two pointers to find pairs summing to target - (arr[i]+arr[j]). Skip duplicates at all 4 levels.

Diagram:
arr = [1,0,-1,0,-2,2], target=0
sorted = [-2,-1,0,0,1,2]

i=0(-2) j=1(-1), need sum=3:
  [-2, -1, 0, 0, 1, 2]
   i   j   ↑        ↑
          k=0      l=2
  sum=0+2=2 < 3 → k++
  k=0 sum=2 <3 → k=1 sum=3 → record [-2,-1,1,2]; k++,l--

i=0 j=2(0), need sum=2:
  [-2, -1, 0, 0, 1, 2]
   i       j  ↑     ↑
             k=0   l=2
  sum=0+2=2 → record [-2,0,0,2]; skip duplicates

Continue for all (i,j) pairs. Skip duplicate i and j values.

Edge cases: large target overflow (use long long), no quadruplets, all same.`,
    complexity: {"time":"O(n³)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"4Sum\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "sort(nums, nums+n);\nfor (int i = 0; i < n-3; i++) {\n  if (i > 0 && nums[i] == nums[i-1]) continue;\n  for (int j = i+1; j < n-2; j++) {\n    if (j > i+1 && nums[j] == nums[j-1]) continue;\n    int k = j+1, l = n-1;\n    while (k < l) {\n      long long sum = (long long)nums[i]+nums[j]+nums[k]+nums[l];\n      if (sum == target) { /* record */ k++; l--; while (k<l && nums[k]==nums[k-1]) k++; while (k<l && nums[l]==nums[l+1]) l--; }\n      else if (sum < target) k++;\n      else l--;\n    }\n  }\n}",
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> target;\n  // sort + 2 nested loops + 2 pointers\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "four-sum-ii",
    title: "4Sum II",
    category: "two-pointers",
    difficulty: "medium",
    description: "Count tuples (i,j,k,l) from four arrays where sum is zero.",
    constraints: "1 <= n <= 500",
    examples: [
      {"input":"2\n1 2\n-2 -1\n-1 2\n0 2","output":"2"}
    ],
    test_cases: [
      {"input":"2\n1 2\n-2 -1\n-1 2\n0 2","expected":"2"}
    ],
    approach: `Given 4 arrays A, B, C, D, count (i,j,k,l) such that A[i]+B[j]+C[k]+D[l]=0. Use hashmap to store sums of all pairs from A and B (key=sum, value=count). Then iterate all pairs from C and D, check if -(C[k]+D[l]) exists in map, add count to result. O(n^2) time, O(n^2) space.

Diagram:
A=[1,2], B=[-2,-1], C=[-1,2], D=[0,2]

Compute AB sums:
  A[0]+B[0]=1+(-2)=-1 → map{-1:1}
  A[0]+B[1]=1+(-1)=0  → map{-1:1, 0:1}
  A[1]+B[0]=2+(-2)=0  → map{-1:1, 0:2}
  A[1]+B[1]=2+(-1)=1  → map{-1:1, 0:2, 1:1}

Check CD pairs:
  C[0]+D[0]=-1+0=-1  → need 1  → count+=map[1]=1
  C[0]+D[1]=-1+2=1   → need -1 → count+=map[-1]=1
  C[1]+D[0]=2+0=2    → need -2 → none
  C[1]+D[1]=2+2=4    → need -4 → none

Total = 2

Edge cases: all zeros, large numbers (use long long), no valid tuples.`,
    complexity: {"time":"O(n²)","space":"O(n²)"},
    mermaid: "flowchart TD\n  A[\"4Sum II\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "unordered_map<int,int> mp;\nfor (int a : A) for (int b : B) mp[a+b]++;\nint cnt = 0;\nfor (int c : C) for (int d : D) cnt += mp[-(c+d)];",
    solution_template: "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int A[n],B[n],C[n],D[n];\n  for (int i=0;i<n;i++) cin>>A[i];\n  for (int i=0;i<n;i++) cin>>B[i];\n  for (int i=0;i<n;i++) cin>>C[i];\n  for (int i=0;i<n;i++) cin>>D[i];\n  // hashmap of pair sums\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "sort-colors-tp",
    title: "Sort Colors (Dutch National Flag)",
    category: "two-pointers",
    difficulty: "medium",
    description: "Sort array of 0s, 1s, 2s in-place.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n2 0 2 1 1 0","output":"0 0 1 1 2 2"}
    ],
    test_cases: [
      {"input":"6\n2 0 2 1 1 0","expected":"0 0 1 1 2 2"}
    ],
    approach: `Dutch National Flag algorithm. Three pointers: low=0, mid=0, high=n-1. mid scans the array. If arr[mid]==0, swap with arr[low], both low++, mid++. If arr[mid]==1, mid++. If arr[mid]==2, swap with arr[high], high-- (don't advance mid). Invariant: [0..low-1]=0, [low..mid-1]=1, [high+1..n-1]=2.

Diagram:
arr = [2, 0, 2, 1, 1, 0]
low=0, mid=0, high=5

Step1: mid=0 val=2 → swap(0,5) → [0,0,2,1,1,2], high=4
  [0, 0, 2, 1, 1, 2]
  l,m                    h

Step2: mid=0 val=0 → swap(0,0) → [0,0,2,1,1,2], low=1, mid=1
     [0, 0, 2, 1, 1, 2]
        l,m              h

Step3: mid=1 val=0 → swap(1,1) → no change, low=2, mid=2
     [0, 0, 2, 1, 1, 2]
           l,m           h

Step4: mid=2 val=2 → swap(2,4) → [0,0,1,1,2,2], high=3
     [0, 0, 1, 1, 2, 2]
           l    m  h

Step5: mid=2 val=1 → mid=3
Step6: mid=3 val=1 → mid=4 (mid>high stop)
Result: [0,0,1,1,2,2]

Edge cases: all 0s, all 2s, n=1.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Sort Colors (Dutch National Flag)\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "int low=0, mid=0, high=n-1;\nwhile (mid <= high) {\n  if (arr[mid]==0) swap(arr[low++], arr[mid++]);\n  else if (arr[mid]==1) mid++;\n  else swap(arr[mid], arr[high--]);\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // DNF sort\n  for (int i=0;i<n;i++) cout << arr[i] << \" \";\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "remove-element",
    title: "Remove Element",
    category: "two-pointers",
    difficulty: "easy",
    description: "Remove all occurrences of a value in-place, return new length.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n3 2 2 3\n3","output":"2"}
    ],
    test_cases: [
      {"input":"4\n3 2 2 3\n3","expected":"2"}
    ],
    approach: `Slow-fast pointer. slow=0 (write position). fast iterates 0..n-1. When arr[fast] != val, copy arr[fast] to arr[slow] and increment slow. Elements not equal to val are packed at front. Return slow.

Diagram:
arr = [3, 2, 2, 3], val = 3
slow=0

Step1: fast=0 val=3 → skip (arr[0]==3)
  [3, 2, 2, 3]
  s,f

Step2: fast=1 val=2 != 3 → arr[0]=2, slow=1
  [2, 2, 2, 3]
  s   f

Step3: fast=2 val=2 != 3 → arr[1]=2, slow=2
  [2, 2, 2, 3]
     s    f

Step4: fast=3 val=3 → skip
  [2, 2, 2, 3]
        s    f

Return slow = 2. First 2 elements = [2,2].

Edge cases: all equal to val (return 0), none equal to val (return n), empty array.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Remove Element\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "int slow = 0;\nfor (int fast = 0; fast < n; fast++)\n  if (arr[fast] != val) arr[slow++] = arr[fast];\nreturn slow;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, val; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> val;\n  // two pointer remove\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "remove-dupes-sorted-ii",
    title: "Remove Duplicates from Sorted Array II",
    category: "two-pointers",
    difficulty: "medium",
    description: "Remove duplicates in-place, allow at most 2 occurrences.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n1 1 1 2 2 3","output":"5"}
    ],
    test_cases: [
      {"input":"6\n1 1 1 2 2 3","expected":"5"}
    ],
    approach: `Extension of remove-duplicates allowing up to 2 occurrences. slow=1 (write position), count=1. Fast iterates 1..n-1. If arr[fast]==arr[slow-1] and count<2, write and increment both count and slow. If different, reset count=1, write.

Diagram:
arr = [1, 1, 1, 2, 2, 3]
slow=1, count=1

Step1: fast=1 val=1 == arr[0]=1, count=1 < 2 → arr[1]=1, count=2, slow=2
  [1, 1, 1, 2, 2, 3]
     s   f

Step2: fast=2 val=1 == arr[1]=1, count=2 not < 2 → skip
  [1, 1, 1, 2, 2, 3]
        s    f

Step3: fast=3 val=2 != arr[1]=1 → arr[2]=2, count=1, slow=3
  [1, 1, 2, 2, 2, 3]
           s     f

Step4: fast=4 val=2 == arr[2]=2, count=1 < 2 → arr[3]=2, count=2, slow=4
  [1, 1, 2, 2, 2, 3]
              s    f

Step5: fast=5 val=3 != arr[3]=2 → arr[4]=3, count=1, slow=5
  [1, 1, 2, 2, 3, 3]
                 s    f

Return slow = 5.

Edge cases: array length < 3, all same, all unique.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Remove Duplicates from Sorted Array II\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "if (n <= 2) return n;\nint slow = 2;\nfor (int fast = 2; fast < n; fast++)\n  if (arr[fast] != arr[slow-2]) arr[slow++] = arr[fast];\nreturn slow;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // two pointer, keep at most 2\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "move-zeroes",
    title: "Move Zeroes",
    category: "two-pointers",
    difficulty: "easy",
    description: "Move all zeroes to end while maintaining relative order of non-zero elements.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n0 1 0 3 12","output":"1 3 12 0 0"}
    ],
    test_cases: [
      {"input":"5\n0 1 0 3 12","expected":"1 3 12 0 0"}
    ],
    approach: `Slow-fast pointer. slow=0 (position for next non-zero). fast iterates 0..n-1. When arr[fast] != 0, swap arr[slow] and arr[fast], increment slow. All non-zero elements shift left, zeros bubble right.

Diagram:
arr = [0, 1, 0, 3, 12]
slow=0

Step1: fast=0 val=0 → skip
  [0, 1, 0, 3, 12]
  s,f

Step2: fast=1 val=1 != 0 → swap(0,1) → [1, 0, 0, 3, 12], slow=1
  [1, 0, 0, 3, 12]
     s   f

Step3: fast=2 val=0 → skip
  [1, 0, 0, 3, 12]
     s    f

Step4: fast=3 val=3 != 0 → swap(1,3) → [1, 3, 0, 0, 12], slow=2
  [1, 3, 0, 0, 12]
        s      f

Step5: fast=4 val=12 != 0 → swap(2,4) → [1, 3, 12, 0, 0], slow=3
  [1, 3, 12, 0, 0]
           s      f

Result: [1, 3, 12, 0, 0]

Edge cases: no zeroes, all zeroes, n=1.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Move Zeroes\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "int slow = 0;\nfor (int fast = 0; fast < n; fast++)\n  if (arr[fast] != 0) swap(arr[slow++], arr[fast]);",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n]; for (int i = 0; i < n; i++) cin >> arr[i];\n  // move zeroes\n  for (int i=0;i<n;i++) cout << arr[i] << \" \";\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "backspace-compare",
    title: "Backspace String Compare",
    category: "two-pointers",
    difficulty: "easy",
    description: "Compare two strings after processing backspace (#) characters.",
    constraints: "1 <= |s|, |t| <= 10^5",
    examples: [
      {"input":"ab#c\nad#c","output":"true"}
    ],
    test_cases: [
      {"input":"ab#c\nad#c","expected":"true"}
    ],
    approach: `Two pointers traversing from end to start. Process each string: skip characters after each '#'. Build result or compare on-the-fly. Use pointers i=|s|-1, j=|t|-1, and skip variables to track backspaces.

Diagram:
s = "ab#c", t = "ad#c"

Process s from end:
  i=3 'c' → push
  i=2 '#' → skip=1, i-- → i=1 'b' skip>0 → skip--, i-- → i=0 'a' → push
  Result s: "ac"

Process t from end:
  j=3 'c' → push
  j=2 '#' → skip=1, j-- → j=1 'd' skip>0 → skip--, j-- → j=0 'a' → push
  Result t: "ac"

s == t → true

Edge cases: multiple consecutive #, leading #, empty string after backspaces.`,
    complexity: {"time":"O(n+m)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Backspace String Compare\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "int i = s.size()-1, j = t.size()-1, skipS = 0, skipT = 0;\nwhile (i >= 0 || j >= 0) {\n  while (i >= 0) { if (s[i]=='#') { skipS++; i--; } else if (skipS>0) { skipS--; i--; } else break; }\n  while (j >= 0) { if (t[j]=='#') { skipT++; j--; } else if (skipT>0) { skipT--; j--; } else break; }\n  if (i<0 && j<0) return true;\n  if (i<0 || j<0 || s[i]!=t[j]) return false;\n  i--; j--;\n}\nreturn true;",
    solution_template: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string s, t; getline(cin, s); getline(cin, t);\n  // two pointer backspace compare\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "valid-palindrome-ii",
    title: "Valid Palindrome II",
    category: "two-pointers",
    difficulty: "easy",
    description: "Check if string can be palindrome by deleting at most one character.",
    constraints: "1 <= |s| <= 10^5",
    examples: [
      {"input":"abca","output":"true"}
    ],
    test_cases: [
      {"input":"abca","expected":"true"}
    ],
    approach: `Two pointers from ends. When mismatch found, try two subproblems: delete left char (i+1..j) or delete right char (i..j-1). If either forms palindrome, return true.

Diagram:
s = "a b c a"
i=0, j=3

Step1: s[0]='a' == s[3]='a' → i=1, j=2
  [a, b, c, a]
   ↑        ↑

Step2: s[1]='b' != s[2]='c' → mismatch at i=1,j=2
  [a, b, c, a]
      ↑  ↑

Try delete i (skip 'b'): subproblem "ca" → i=2,j=2 → 'c'!='a' → false
Try delete j (skip 'c'): subproblem "bc" → i=1,j=1 → 'b'!='b' → single char = palindrome → true

Return true.

Edge cases: already palindrome, empty/1-char string, delete first or last char, mismatch at center.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Valid Palindrome II\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "int i = 0, j = s.size()-1;\nwhile (i < j) {\n  if (s[i] != s[j]) {\n    auto check = [&](int l, int r) { while (l<r) if (s[l++]!=s[r--]) return false; return true; };\n    return check(i+1,j) || check(i,j-1);\n  }\n  i++; j--;\n}\nreturn true;",
    solution_template: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // two pointers with one deletion\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "three-sum-closest",
    title: "3Sum Closest",
    category: "two-pointers",
    difficulty: "medium",
    description: "Find triplet sum closest to target.",
    constraints: "1 <= n <= 1000",
    examples: [
      {"input":"4\n-1 2 1 -4\n1","output":"2"}
    ],
    test_cases: [
      {"input":"4\n-1 2 1 -4\n1","expected":"2"}
    ],
    approach: `Sort array. Initialize closest with sum of first triplet. Fix i, use left=i+1, right=n-1. Track sum. If sum==target, return target. If abs(sum-target) < abs(closest-target), update closest. Adjust pointers: if sum < target, left++; else right--.

Diagram:
arr = [-1, 2, 1, -4], target=1
sorted = [-4, -1, 1, 2]

i=0 (-4): left=1(-1) right=3(2)
  [-4, -1, 1, 2]
   i   ↑        ↑
  sum = -4-1+2 = -3, closest = -3, diff=4
  sum < 1 → left++

i=0 (-4): left=2(1) right=3(2)
  [-4, -1, 1, 2]
   i       ↑   ↑
  sum = -4+1+2 = -1, diff=2 < 4 → closest=-1
  sum < 1 → left++ (left > right, move to i=1)

i=1 (-1): left=2(1) right=3(2)
  [-4, -1, 1, 2]
       i   ↑   ↑
  sum = -1+1+2 = 2, diff=1 < 2 → closest=2

Return 2.

Edge cases: exact match returns early, n=3, all same numbers.`,
    complexity: {"time":"O(n²)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"3Sum Closest\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "sort(nums, nums+n);\nint closest = nums[0]+nums[1]+nums[2];\nfor (int i=0; i<n-2; i++) {\n  int j=i+1, k=n-1;\n  while (j < k) {\n    int sum = nums[i]+nums[j]+nums[k];\n    if (sum == target) return target;\n    if (abs(sum-target) < abs(closest-target)) closest = sum;\n    if (sum < target) j++;\n    else k--;\n  }\n}\nreturn closest;",
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <cstdlib>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n]; for (int i=0;i<n;i++) cin>>arr[i];\n  cin >> target;\n  // sort + two pointers\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "three-sum-smaller",
    title: "3Sum Smaller",
    category: "two-pointers",
    difficulty: "medium",
    description: "Count triplets with sum less than target.",
    constraints: "1 <= n <= 3000",
    examples: [
      {"input":"5\n-2 0 1 3\n2","output":"2"}
    ],
    test_cases: [
      {"input":"5\n-2 0 1 3\n2","expected":"2"}
    ],
    approach: `Sort array. For each i, use left=i+1, right=n-1. If arr[i]+arr[left]+arr[right] < target, then all pairs (left, right-1), (left, right-2)... also satisfy since array sorted, so add (right-left) to count and left++. Else right--.

Diagram:
arr = [-2, 0, 1, 3], target=2
sorted = [-2, 0, 1, 3]

i=0(-2): left=1(0) right=3(3)
  [-2, 0, 1, 3]
   i   ↑      ↑
  sum = -2+0+3 = 1 < 2 → count += 3-1 = 2 (pairs [0,3],[0,1]), left++

i=0(-2): left=2(1) right=3(3)
  [-2, 0, 1, 3]
   i      ↑   ↑
  sum = -2+1+3 = 2 not < 2 → right--

i=0(-2): left=2(1) right=2 stop

i=1(0): left=2(1) right=3(3)
  sum = 0+1+3 = 4 not < 2 → right--

i=1(0): left=2(1) right=2 stop

Total count = 2 → triplets: [-2,0,1], [-2,0,3]

Edge cases: no triplets with sum < target, all triplets valid, n=3.`,
    complexity: {"time":"O(n²)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"3Sum Smaller\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "sort(nums, nums+n);\nint count = 0;\nfor (int i=0; i<n-2; i++) {\n  int j=i+1, k=n-1;\n  while (j < k) {\n    if (nums[i]+nums[j]+nums[k] < target) { count += k-j; j++; }\n    else k--;\n  }\n}\nreturn count;",
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, target; cin >> n;\n  int arr[n]; for (int i=0;i<n;i++) cin>>arr[i];\n  cin >> target;\n  // sort + two pointers\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "intersect-two-arrays",
    title: "Intersection of Two Arrays",
    category: "two-pointers",
    difficulty: "easy",
    description: "Find intersection of two arrays (unique elements).",
    constraints: "1 <= n, m <= 10^5",
    examples: [
      {"input":"4\n1 2 2 1\n2\n2 2","output":"2"}
    ],
    test_cases: [
      {"input":"4\n1 2 2 1\n2\n2 2","expected":"2"}
    ],
    approach: `Sort both arrays. Two pointers i=0, j=0. While both in bounds: if arr1[i]==arr2[j], add to result (skip duplicates) and increment both. If arr1[i] < arr2[j], i++. Else j++.

Diagram:
arr1 = [1,2,2,1], arr2 = [2,2]
sorted1 = [1,1,2,2], sorted2 = [2,2]
i=0, j=0, result=[]

Step1: arr1[0]=1 < arr2[0]=2 → i=1
  [1, 1, 2, 2]    [2, 2]
   ↑               ↑

Step2: arr1[1]=1 < arr2[0]=2 → i=2
  [1, 1, 2, 2]    [2, 2]
      ↑            ↑

Step3: arr1[2]=2 == arr2[0]=2 → add 2, i=3, j=1
  [1, 1, 2, 2]    [2, 2]
         ↑            ↑

Step4: arr1[3]=2 == arr2[1]=2 → skip duplicate (arr1[3]==arr1[2]), i=4 stop
Result = [2]

Edge cases: no intersection, one empty array, all elements intersect, duplicates.`,
    complexity: {"time":"O(n log n + m log m)","space":"O(min(n,m))"},
    mermaid: "flowchart TD\n  A[\"Intersection of Two Arrays\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "sort(n1,n1+n); sort(n2,n2+m);\nint i=0,j=0;\nwhile(i<n && j<m) {\n  if (n1[i]==n2[j]) { cout << n1[i] << \" \"; while(i<n && n1[i]==n2[j]) i++; j++; }\n  else if (n1[i] < n2[j]) i++;\n  else j++;\n}",
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin>>n; int a[n]; for(int i=0;i<n;i++) cin>>a[i];\n  int m; cin>>m; int b[m]; for(int i=0;i<m;i++) cin>>b[i];\n  // sort + two pointers\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "intersect-two-arrays-ii",
    title: "Intersection of Two Arrays II",
    category: "two-pointers",
    difficulty: "easy",
    description: "Find intersection including duplicates.",
    constraints: "1 <= n, m <= 10^5",
    examples: [
      {"input":"4\n1 2 2 1\n2\n2 2","output":"2 2"}
    ],
    test_cases: [
      {"input":"4\n1 2 2 1\n2\n2 2","expected":"2 2"}
    ],
    approach: `Same as intersection I but include duplicates. Sort both. Two pointers. When equal, add to result, increment both. Don't skip consecutive equal values.

Diagram:
arr1 = [1,2,2,1], arr2 = [2,2]
sorted1 = [1,1,2,2], sorted2 = [2,2]

i=0,j=0: 1<2 → i=1
i=1,j=0: 1<2 → i=2
i=2,j=0: 2==2 → add 2, i=3, j=1
  [1, 1, 2, 2]    [2, 2]
         ↑            ↑
i=3,j=1: 2==2 → add 2, i=4,j=2 (j out of bounds)
Result = [2,2]

Differs from Intersection I: consecutive equal values in arr1 are both included because arr2 has two 2s.

Edge cases: no intersection, one array subset of other, all elements match, empty arrays.`,
    complexity: {"time":"O(n log n + m log m)","space":"O(min(n,m))"},
    mermaid: "flowchart TD\n  A[\"Intersection of Two Arrays II\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "sort(n1,n1+n); sort(n2,n2+m);\nint i=0,j=0;\nwhile(i<n && j<m) {\n  if (n1[i]==n2[j]) { cout << n1[i] << \" \"; i++; j++; }\n  else if (n1[i] < n2[j]) i++;\n  else j++;\n}",
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin>>n; int a[n]; for(int i=0;i<n;i++) cin>>a[i];\n  int m; cin>>m; int b[m]; for(int i=0;i<m;i++) cin>>b[i];\n  // sort + two pointers\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "two-sum-ii",
    title: "Two Sum II - Pair with Target Sum",
    category: "two-pointers",
    difficulty: "easy",
    description: "Find two indices in sorted array summing to target (0-based).",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n2 3 5 8\n7","output":"1 2"}
    ],
    test_cases: [
      {"input":"4\n2 3 5 8\n7","expected":"1 2"}
    ],
    approach: `Same core algorithm as Two Sum II. left=0, right=n-1. Compare sum to target and adjust pointers. Returns 1-based indices. Alternative approach using binary search.

Diagram:
arr = [2, 3, 5, 8], target = 7

Step1: left=0(2) right=3(8) sum=10 > 7 → right--
  [2, 3, 5, 8]
   ↑        ↑

Step2: left=0(2) right=2(5) sum=7 == target → return [1,3] (0-based: [0,2])
  [2, 3, 5, 8]
   ↑     ↑

Edge cases: no pair exists, negative numbers, target smaller than all sums, target larger than all sums, duplicate values. Works because array is strictly sorted.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Two Sum II - Pair with Target Sum\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "int i=0, j=n-1;\nwhile(i<j) {\n  if(arr[i]+arr[j]==target) { cout<<i+1<<\" \"<<j+1; return 0; }\n  else if(arr[i]+arr[j]<target) i++;\n  else j--;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n, target; cin>>n;\n  int arr[n]; for(int i=0;i<n;i++) cin>>arr[i];\n  cin>>target;\n  // two pointers\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "three-sum-multiplicity",
    title: "3Sum With Multiplicity",
    category: "two-pointers",
    difficulty: "medium",
    description: "Count number of triplets summing to target with duplicates allowed.",
    constraints: "1 <= n <= 3000",
    examples: [
      {"input":"5\n1 1 2 2 3\n4","output":"4"}
    ],
    test_cases: [
      {"input":"5\n1 1 2 2 3\n4","expected":"4"}
    ],
    approach: `Sort array. For each i, use left=i+1, right=n-1. When sum==target, count combinations: if arr[left]==arr[right], add (right-left+1 choose 2). Else count left duplicates * right duplicates and advance both.

Diagram:
arr = [1, 1, 2, 2, 3], target=4
sorted = [1, 1, 2, 2, 3]

i=0(1): left=1(1) right=4(3) sum=5 > 4 → right--
  [1, 1, 2, 2, 3]
   i  ↑        ↑

i=0(1): left=1(1) right=3(2) sum=4 == target
  count: arr[1]=1, arr[2]=2, arr[3]=2
  Not all equal. Left side: 1 appears at index 1 (1 dup). Right side: 2 appears at indices 2,3 (2 dups).
  count += 1*2 = 2

i=0(1): left=2(2) right=3(2) sum=5 > 4 → right-- (left=right stop)

i=1(1): left=2(2) right=4(3) sum=6 > 4 → right-- ... continue
Total combinations = 4

Edge cases: large counts (mod 10^9+7), all same values, no triplets.`,
    complexity: {"time":"O(n²)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"3Sum With Multiplicity\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "sort(nums, nums+n);\nconst int MOD = 1e9+7;\nlong long ans = 0;\nfor (int i=0; i<n-2; i++) {\n  int j=i+1, k=n-1;\n  while (j < k) {\n    int sum = nums[i]+nums[j]+nums[k];\n    if (sum < target) j++;\n    else if (sum > target) k--;\n    else {\n      if (nums[j]==nums[k]) { int cnt = k-j+1; ans += cnt*(cnt-1)/2; ans %= MOD; break; }\n      int left=1, right=1;\n      while (j+1<k && nums[j]==nums[j+1]) { left++; j++; }\n      while (k-1>j && nums[k]==nums[k-1]) { right++; k--; }\n      ans += left*right; ans %= MOD; j++; k--;\n    }\n  }\n}\nreturn (int)ans;",
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n, target; cin>>n;\n  int arr[n]; for(int i=0;i<n;i++) cin>>arr[i];\n  cin>>target;\n  // sort + two pointers\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "longest-mountain",
    title: "Longest Mountain in Array",
    category: "two-pointers",
    difficulty: "medium",
    description: "Find length of longest mountain subarray.",
    constraints: "1 <= n <= 10^4",
    examples: [
      {"input":"7\n2 1 4 7 3 2 5","output":"5"}
    ],
    test_cases: [
      {"input":"7\n2 1 4 7 3 2 5","expected":"5"}
    ],
    approach: `Find peaks (arr[i]>arr[i-1] && arr[i]>arr[i+1]). From each peak, expand left and right pointers to count increasing then decreasing elements. Track max length.

Diagram:
arr = [2, 1, 4, 7, 3, 2, 5]
Peaks: i=3 (7)

Scan peaks:
i=1 (1): not peak (1 < 2, no) skip

i=3 (7): 7>4 && 7>3 → peak
  Expand left: left=2 (4>1 → left=1 (1) stop) → left_len = 3-1 = 2
  Expand right: right=4 (3>2 → right=5 (2) → right=6 (5) stop) → left_len = 6-3 = 2
  [2, 1, 4, 7, 3, 2, 5]
        ↑  ↑  ↑  ↑
        4  7  3  2
  length = right-left-1 = 5-1-1 = 5? Actually left=1, right=5? Wait let me recount.

  Actually expand left from 3: i=3 (7), check 4 > 1 (yes, i=2), check 1 > 2? no. So left=2.
  Expand right from 3: check 3 > 2 (yes, i=4), 2 > 5? no. So right=4.
  Mountain = indices 2..4 = [4,7,3,2] length = 5 (indices 1..5 = [1,4,7,3,2])
  
Actually let me reconsider. Mountain: arr[1]=1 < arr[2]=4 < arr[3]=7 > arr[4]=3 > arr[5]=2 → length = 5 indices: [1,4,7,3,2]

Continue scanning: i=5 (2) not peak (2<3) skip.
i=6 (5) end, no i+1.

Max length = 5.

Edge cases: no peak (return 0), plateau at peak, n < 3.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Longest Mountain in Array\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "int maxLen = 0;\nfor (int i=1; i<n-1; i++) {\n  if (arr[i]>arr[i-1] && arr[i]>arr[i+1]) {\n    int left=i-1, right=i+1;\n    while (left>0 && arr[left]>arr[left-1]) left--;\n    while (right<n-1 && arr[right]>arr[right+1]) right++;\n    maxLen = max(maxLen, right-left+1);\n    i = right;\n  }\n}\nreturn maxLen;",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin>>n;\n  int arr[n]; for(int i=0;i<n;i++) cin>>arr[i];\n  // find peaks, expand\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "valid-triangle-number",
    title: "Valid Triangle Number",
    category: "two-pointers",
    difficulty: "medium",
    description: "Count number of triplets that can form a triangle.",
    constraints: "1 <= n <= 1000",
    examples: [
      {"input":"4\n2 2 3 4","output":"3"}
    ],
    test_cases: [
      {"input":"4\n2 2 3 4","expected":"3"}
    ],
    approach: `Sort array. For largest side at index k (k>=2), use left=0, right=k-1. If arr[left]+arr[right] > arr[k], then all pairs between left and right-1 also work → add (right-left) to count, right--. Else left++.

Diagram:
arr = [2, 2, 3, 4]
sorted = [2, 2, 3, 4]

k=2 (side=3): left=0(2) right=1(2) → 2+2=4 > 3 → count += 1-0 = 1, right--
  [2, 2, 3, 4]
   ↑  ↑  ↑
  left right k
  right=0 < left=0 stop. count=1

k=3 (side=4): left=0(2) right=2(3) → 2+3=5 > 4 → count += 2-0 = 2, right=1
  [2, 2, 3, 4]
   ↑     ↑  ↑
   left right k
  left=0(2) right=1(2) → 2+2=4 == 4 not > 4 → left++
  [2, 2, 3, 4]
      ↑  ↑  ↑
   left right k
  left=1 == right=1 stop

Total = 1 + 2 = 3. Triplets: (2,3,3)... wait:
  k=2: (2,2,3)
  k=3: (2,3,4), (2,3,4) → actually (2,2,3) + (2,3,4) + (2,3,4) = 3
Wait let me recheck: for k=3 (side=4): left=0(2) right=2(3) → valid, count += 2-0 = 2 means (2,3,4) and (2,3,4)... hmm actually there's one 2 and one 2 and one 3. Let's list: positions (0,2,3) = (2,3,4) and (1,2,3) = (2,3,4). Yes, 2 valid triplets for k=3.

Edge cases: no valid triangle, all sides equal, n < 3 (return 0).`,
    complexity: {"time":"O(n²)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Valid Triangle Number\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "sort(nums, nums+n);\nint count = 0;\nfor (int k=n-1; k>=2; k--) {\n  int left=0, right=k-1;\n  while (left < right) {\n    if (nums[left] + nums[right] > nums[k]) { count += right-left; right--; }\n    else left++;\n  }\n}\nreturn count;",
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  int n; cin>>n;\n  int arr[n]; for(int i=0;i<n;i++) cin>>arr[i];\n  // sort + two pointers\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "squares-sorted-array",
    title: "Squares of a Sorted Array",
    category: "two-pointers",
    difficulty: "easy",
    description: "Return squares of sorted array in non-decreasing order.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n-4 -1 0 3 10","output":"0 1 9 16 100"}
    ],
    test_cases: [
      {"input":"5\n-4 -1 0 3 10","expected":"0 1 9 16 100"}
    ],
    approach: `Two pointers from ends. Since negatives become positive when squared, the largest square is either at left or right end. Compare abs(arr[left]) and abs(arr[right]), place larger square at result end, move pointer inward.

Diagram:
arr = [-4, -1, 0, 3, 10]
result = [_, _, _, _, _]
left=0(-4), right=4(10), pos=4

Step1: abs(10) > abs(-4) → result[4]=100, right=3
  [-4, -1, 0, 3, 10]              result=[_, _, _, _, 100]
   ↑                 ↑
  left             right(pos=4)

Step2: abs(3) < abs(-4) → result[3]=16, left=1
  [-4, -1, 0, 3, 10]              result=[_, _, _, 16, 100]
       ↑          ↑
      left     right(pos=3)

Step3: abs(3) > abs(-1) → result[2]=9, right=2
  [-4, -1, 0, 3, 10]              result=[_, _, 9, 16, 100]
       ↑     ↑
      left  right(pos=2)

Step4: abs(0) < abs(-1) → result[1]=1, left=2
  [-4, -1, 0, 3, 10]              result=[_, 1, 9, 16, 100]
            ↑
        left,right(pos=1)

Step5: abs(0) → result[0]=0, pos=0
Result = [0, 1, 9, 16, 100]

Edge cases: all non-negative, all non-positive, single element, zeros.`,
    complexity: {"time":"O(n)","space":"O(n)"},
    mermaid: "flowchart TD\n  A[\"Squares of a Sorted Array\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Striver A2Z",
    solution_code: "int result[n], pos=n-1, left=0, right=n-1;\nwhile (left <= right) {\n  if (abs(arr[left]) > abs(arr[right])) result[pos--] = arr[left]*arr[left++];\n  else result[pos--] = arr[right]*arr[right--];\n}",
    solution_template: "#include <iostream>\n#include <cstdlib>\nusing namespace std;\n\nint main() {\n  int n; cin>>n;\n  int arr[n]; for(int i=0;i<n;i++) cin>>arr[i];\n  // two pointers from ends\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "min-abs-difference",
    title: "Minimum Absolute Difference",
    category: "two-pointers",
    difficulty: "easy",
    description: "Find all pairs with minimum absolute difference.",
    constraints: "2 <= n <= 10^5",
    examples: [
      {"input":"4\n4 2 1 3","output":"1 2\n2 3\n3 4"}
    ],
    test_cases: [
      {"input":"4\n4 2 1 3","expected":"1 2\n2 3\n3 4"}
    ],
    approach: `Sort array. Use two pointers (i, i+1) to find min diff. Scan sorted array, track min diff. Second pass: output all adjacent pairs with diff == min diff.

Diagram:
arr = [4, 2, 1, 3]
sorted = [1, 2, 3, 4]

First pass - find min diff:
  i=0: |1-2| = 1 → minDiff=1
  i=1: |2-3| = 1 → minDiff=1
  i=2: |3-4| = 1 → minDiff=1

  [1, 2, 3, 4]
   ↑  ↑        diff=1
      ↑  ↑     diff=1
         ↑  ↑  diff=1

Second pass - output all pairs with diff==1:
  (1,2), (2,3), (3,4)

Edge cases: duplicates (diff=0), negative numbers, already sorted, n=2.`,
    complexity: {"time":"O(n log n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Minimum Absolute Difference\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "sort(arr, arr+n);\nint minDiff = INT_MAX;\nfor (int i=0; i<n-1; i++) minDiff = min(minDiff, arr[i+1]-arr[i]);\nfor (int i=0; i<n-1; i++) if (arr[i+1]-arr[i]==minDiff) cout << arr[i] << \" \" << arr[i+1] << endl;",
    solution_template: "#include <iostream>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint main() {\n  int n; cin>>n;\n  int arr[n]; for(int i=0;i<n;i++) cin>>arr[i];\n  // sort + find min diff\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "sort-by-parity",
    title: "Sort Array By Parity",
    category: "two-pointers",
    difficulty: "easy",
    description: "Move all even numbers to front, odds to back.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"4\n3 1 2 4","output":"2 4 3 1"}
    ],
    test_cases: [
      {"input":"4\n3 1 2 4","expected":"2 4 3 1"}
    ],
    approach: `Two pointers from ends. left=0, right=n-1. While left < right: if arr[left] is odd and arr[right] is even, swap. If arr[left] even, left++. If arr[right] odd, right--.

Diagram:
arr = [3, 1, 2, 4]
left=0, right=3

Step1: arr[0]=3 (odd) arr[3]=4 (even) → swap → [4, 1, 2, 3], left=1, right=2
  [3, 1, 2, 4]     [4, 1, 2, 3]
   ↑        ↑        ↑     ↑

Step2: arr[1]=1 (odd) arr[2]=2 (even) → swap → [4, 2, 1, 3], left=2, right=1
  [4, 1, 2, 3]     [4, 2, 1, 3]
       ↑  ↑              ↑  ↑
  (left > right, stop)

Result: [4, 2, 1, 3]

Edge cases: all even, all odd, single element, alternating parity. Order of evens/odds among themselves is not preserved (use stable partition if needed).`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Sort Array By Parity\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "int left=0, right=n-1;\nwhile (left < right) {\n  if (arr[left]%2==1 && arr[right]%2==0) swap(arr[left++], arr[right--]);\n  if (arr[left]%2==0) left++;\n  if (arr[right]%2==1) right--;\n}",
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin>>n;\n  int arr[n]; for(int i=0;i<n;i++) cin>>arr[i];\n  // two pointer parity sort\n  for(int i=0;i<n;i++) cout<<arr[i]<<\" \";\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "reverse-vowels",
    title: "Reverse Vowels of a String",
    category: "two-pointers",
    difficulty: "easy",
    description: "Reverse only the vowels in a string.",
    constraints: "1 <= |s| <= 10^5",
    examples: [
      {"input":"hello","output":"holle"}
    ],
    test_cases: [
      {"input":"hello","expected":"holle"}
    ],
    approach: `Two pointers from ends. left=0, right=n-1. Move left forward until it finds a vowel. Move right backward until it finds a vowel. Swap them. Repeat until pointers cross.

Diagram:
s = "h e l l o"
     l         r

Step1: s[0]='h' not vowel → left=1
Step2: s[4]='o' is vowel → right stays
Step3: s[1]='e' is vowel → swap(s[1],s[4]) → "h o l l e"
  [h, e, l, l, o]    [h, o, l, l, e]
      ↑        ↑          ↑     ↑
  [h, o, l, l, e]
         l  r

Step4: s[2]='l' not vowel → left=3
Step5: s[3]='l' not vowel → left=4 (crossover, stop)

Result: "holle"

Edge cases: no vowels, all vowels, single character, uppercase vowels (A,E,I,O,U), empty string.`,
    complexity: {"time":"O(n)","space":"O(1)"},
    mermaid: "flowchart TD\n  A[\"Reverse Vowels of a String\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "string vowels = \"aeiouAEIOU\";\nint l=0, r=s.size()-1;\nwhile (l < r) {\n  while (l<r && vowels.find(s[l])==string::npos) l++;\n  while (l<r && vowels.find(s[r])==string::npos) r--;\n  swap(s[l++], s[r--]);\n}",
    solution_template: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string s; cin >> s;\n  // two pointer reverse vowels\n  cout << s << endl;\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
  {
    id: "merge-alternately",
    title: "Merge Strings Alternately",
    category: "two-pointers",
    difficulty: "easy",
    description: "Merge two strings alternately, appending remaining characters.",
    constraints: "1 <= |word1|, |word2| <= 100",
    examples: [
      {"input":"abc\npqr","output":"apbqcr"}
    ],
    test_cases: [
      {"input":"abc\npqr","expected":"apbqcr"}
    ],
    approach: `Two pointers i=0, j=0. While i < len1 or j < len2: append word1[i] if i < len1, append word2[j] if j < len2, increment both as used.

Diagram:
word1 = "abc", word2 = "pqr"
i=0, j=0, result = ""

Step1: append w1[0]='a' → result="a", i=1
       append w2[0]='p' → result="ap", j=1
Step2: append w1[1]='b' → result="apb", i=2
       append w2[1]='q' → result="apbq", j=2
Step3: append w1[2]='c' → result="apbq c", i=3
       append w2[2]='r' → result="apbqcr", j=3

  w1=[a, b, c]  w2=[p, q, r]
      ↑               ↑        → a
         ↑            ↑        → ap
            ↑         ↑        → apb
               ↑      ↑        → apbq
                  ↑   ↑        → apbqc
                     ↑↑        → apbqcr

Result: "apbqcr"

Edge cases: one string longer than other, empty string, single character strings, very unequal lengths.`,
    complexity: {"time":"O(n+m)","space":"O(n+m)"},
    mermaid: "flowchart TD\n  A[\"Merge Strings Alternately\"] --> B[\"Sort array (if needed)\"]\n  B --> C[\"left=0, right=n-1\"]\n  C --> D{\"left < right?\"}\n  D -->|Yes| E[\"Compute sum\"]\n  E --> F{\"Match?\"}\n  F -->|Yes| G[\"Return indices\"]\n  F -->|No| H[\"Move pointer\"]\n  H --> D\n  D -->|No| I[\"Not found\"]",
    sheet: "Love Babbar 450",
    solution_code: "string result;\nint i=0, j=0;\nwhile (i < word1.size() || j < word2.size()) {\n  if (i < word1.size()) result += word1[i++];\n  if (j < word2.size()) result += word2[j++];\n}\nreturn result;",
    solution_template: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string w1, w2; cin >> w1 >> w2;\n  // two pointers merge alternately\n  return 0;\n}",
    techniques: ["two-pointers"],
  },
];
