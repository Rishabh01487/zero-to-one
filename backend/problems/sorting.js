export default [
  {
    id: "bubble-sort-prob",
    title: "Bubble Sort Implementation",
    category: "sorting",
    difficulty: "easy",
    description: "Implement bubble sort and return sorted array.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"6\n64 34 25 12 22 11","output":"11 12 22 25 34 64"}
    ],
    test_cases: [
      {"input":"6\n64 34 25 12 22 11","expected":"11 12 22 25 34 64"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  for (int i = 0; i < n-1; i++)\n    for (int j = 0; j < n-i-1; j++)\n      if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);\n\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "bubble-sort:\n  arr = [5, 1, 4, 2, 8]\n  \n  Pass 1: [1, 5, 4, 2, 8]  swap(5,1)\n          [1, 4, 5, 2, 8]  swap(5,4)\n          [1, 4, 2, 5, 8]  swap(5,2)\n          [1, 4, 2, 5, 8]  no swap (5<8)\n  \n  Pass 2: [1, 4, 2, 5, 8]  no swap (1<4)\n          [1, 2, 4, 5, 8]  swap(4,2)\n          [1, 2, 4, 5, 8]  no swap (4<5)\n  \n  Pass 3: [1, 2, 4, 5, 8]  no swap → sorted!\n\nBubble sort repeatedly steps through the array, comparing adjacent elements and swapping them if they are in the wrong order. Each pass moves the largest unsorted element to its correct position at the end, like a bubble rising to the surface. Time complexity: best O(n) (already sorted with optimization), average/worst O(n²). Space: O(1) in-place. Stable: yes.\n\nDiagram:\n  arr = [5, 1, 4, 2, 8]\n\n  Pass 1: [5,1,4,2,8] -> [1,5,4,2,8] -> [1,4,5,2,8] -> [1,4,2,5,8] -> [1,4,2,5,8]\n  Pass 2: [1,4,2,5,8] -> [1,4,2,5,8] -> [1,2,4,5,8] -> [1,2,4,5,8]\n  Pass 3: [1,2,4,5,8] -> no swaps -> sorted!",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "for(int i=0;i<n-1;i++){bool swapped=0;for(int j=0;j<n-1-i;j++)if(arr[j]>arr[j+1]){swap(arr[j],arr[j+1]);swapped=1;}if(!swapped)break;}",
    techniques: ["sorting"],
  },
  {
    id: "selection-sort",
    title: "Selection Sort Implementation",
    category: "sorting",
    difficulty: "easy",
    description: "Implement selection sort and return sorted array.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"6\n64 25 12 22 11 34","output":"11 12 22 25 34 64"}
    ],
    test_cases: [
      {"input":"6\n64 25 12 22 11 34","expected":"11 12 22 25 34 64"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  for (int i = 0; i < n-1; i++) {\n    int minIdx = i;\n    for (int j = i+1; j < n; j++)\n      if (arr[j] < arr[minIdx]) minIdx = j;\n    swap(arr[i], arr[minIdx]);\n\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "selection-sort:\n  arr = [64, 25, 12, 22, 11]\n  \n  Pass 1: min=11 at idx 4 → swap(64,11)\n          [11, 25, 12, 22, 64]\n  \n  Pass 2: min=12 at idx 2 → swap(25,12)\n          [11, 12, 25, 22, 64]\n  \n  Pass 3: min=22 at idx 3 → swap(25,22)\n          [11, 12, 22, 25, 64]\n  \n  Pass 4: min=25 at idx 3 → already in place\n          [11, 12, 22, 25, 64]  sorted!\n\nSelection sort divides the array into a sorted prefix and an unsorted suffix. It repeatedly finds the minimum element from the unsorted portion and swaps it with the first element of the unsorted portion, growing the sorted prefix by one each iteration. Time complexity: O(n²) in all cases (best, average, worst). Space: O(1) in-place. Stable: no.\n\nDiagram:\n  arr = [64, 25, 12, 22, 11]\n\n  Pass 1: min=11 at idx 4 -> [11, 25, 12, 22, 64]\n  Pass 2: min=12 at idx 2 -> [11, 12, 25, 22, 64]\n  Pass 3: min=22 at idx 3 -> [11, 12, 22, 25, 64]\n  Pass 4: min=25 at idx 3 -> [11, 12, 22, 25, 64] sorted!",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "for(int i=0;i<n-1;i++){int minIdx=i;for(int j=i+1;j<n;j++)if(arr[j]<arr[minIdx])minIdx=j;swap(arr[i],arr[minIdx]);}",
    techniques: ["sorting"],
  },
  {
    id: "insertion-sort",
    title: "Insertion Sort Implementation",
    category: "sorting",
    difficulty: "easy",
    description: "Implement insertion sort and return sorted array.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"6\n12 11 13 5 6 7","output":"5 6 7 11 12 13"}
    ],
    test_cases: [
      {"input":"6\n12 11 13 5 6 7","expected":"5 6 7 11 12 13"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n\n  for (int i = 1; i < n; i++) {\n    int key = arr[i];\n    int j = i - 1;\n    while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; }\n    arr[j+1] = key;\n\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "insertion-sort:\n  arr = [12, 11, 13, 5, 6]\n  \n  Step 1: key=11, shift 12 right\n          [_, 12, 13, 5, 6] → insert 11\n          [11, 12, 13, 5, 6]\n  \n  Step 2: key=13, 13>12 → no shift\n          [11, 12, 13, 5, 6]\n  \n  Step 3: key=5, shift 13,12,11 right\n          [_, 11, 12, 13, 6] → insert 5\n          [5, 11, 12, 13, 6]\n  \n  Step 4: key=6, shift 13,12,11 right\n          [5, _, 11, 12, 13] → insert 6\n          [5, 6, 11, 12, 13]  sorted!\n\nInsertion sort builds the final sorted array one element at a time by repeatedly taking the next unsorted element and inserting it into its correct position among the previously sorted elements, shifting larger elements right to make room. Time complexity: best O(n) (already sorted), average/worst O(n²). Space: O(1) in-place. Stable: yes.\n\nDiagram:\n  arr = [12, 11, 13, 5, 6]\n\n  Step 1: key=11 -> [11, 12, 13, 5, 6]\n  Step 2: key=13 -> [11, 12, 13, 5, 6]\n  Step 3: key=5  -> [5, 11, 12, 13, 6]\n  Step 4: key=6  -> [5, 6, 11, 12, 13] sorted!",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "for(int i=1;i<n;i++){int key=arr[i],j=i-1;while(j>=0&&arr[j]>key){arr[j+1]=arr[j];j--;}arr[j+1]=key;}",
    techniques: ["sorting"],
  },
  {
    id: "merge-sort-prob",
    title: "Merge Sort Implementation",
    category: "sorting",
    difficulty: "medium",
    description: "Implement merge sort and return sorted array.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"7\n38 27 43 3 9 82 10","output":"3 9 10 27 38 43 82"}
    ],
    test_cases: [
      {"input":"7\n38 27 43 3 9 82 10","expected":"3 9 10 27 38 43 82"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nvoid merge(int arr[], int l, int m, int r) {\n  int n1 = m-l+1, n2 = r-m;\n  int L[n1], R[n2];\n  for (int i = 0; i < n1; i++) L[i] = arr[l+i];\n  for (int i = 0; i < n2; i++) R[i] = arr[m+1+i];\n  int i = 0, j = 0, k = l;\n  while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];\n  while (i < n1) arr[k++] = L[i++];\n  while (j < n2) arr[k++] = R[j++];\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n  if (l >= r) return;\n  int m = l + (r-l)/2;\n  mergeSort(arr, l, m);\n  mergeSort(arr, m+1, r);\n  merge(arr, l, m, r);\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  mergeSort(arr, 0, n-1);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "merge-sort:\n  arr = [38, 27, 43, 3, 9, 82, 10]\n  \n  Split: [38, 27, 43, 3] | [9, 82, 10]\n         [38, 27] | [43, 3] | [9, 82] | [10]\n         [38] [27] | [43] [3] | [9] [82] | [10]\n  \n  Merge: [27, 38] | [3, 43] | [9, 82] | [10]\n         [3, 27, 38, 43] | [9, 10, 82]\n         [3, 9, 10, 27, 38, 43, 82]  sorted!\n\nMerge sort is a divide-and-conquer algorithm that recursively splits the array into halves until each subarray has one element, then merges adjacent pairs back together in sorted order using an auxiliary array. The merge procedure compares the front elements of two sorted subarrays and copies the smaller into the output array, then copies remaining elements. Time complexity: O(n log n) in all cases. Space: O(n) for the auxiliary array plus O(log n) recursion stack. Stable: yes.\n\nDiagram:\n  arr = [38, 27, 43, 3, 9, 82, 10]\n\n  Split: [38,27,43,3] [9,82,10]\n  Split: [38,27] [43,3] [9,82] [10]\n  Split: [38] [27] [43] [3] [9] [82] [10]\n  Merge: [27,38] [3,43] [9,82] [10]\n  Merge: [3,27,38,43] [9,10,82]\n  Merge: [3,9,10,27,38,43,82]",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "void merge(int arr[],int l,int m,int r){int n1=m-l+1,n2=r-m;int L[n1],R[n2];for(int i=0;i<n1;i++)L[i]=arr[l+i];for(int j=0;j<n2;j++)R[j]=arr[m+1+j];int i=0,j=0,k=l;while(i<n1&&j<n2)arr[k++]=(L[i]<=R[j])?L[i++]:R[j++];while(i<n1)arr[k++]=L[i++];while(j<n2)arr[k++]=R[j++];}",
    techniques: ["sorting"],
  },
  {
    id: "quick-sort-prob",
    title: "Quick Sort Implementation",
    category: "sorting",
    difficulty: "medium",
    description: "Implement quick sort and return sorted array.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"8\n10 7 8 9 1 5 4 3","output":"1 3 4 5 7 8 9 10"}
    ],
    test_cases: [
      {"input":"8\n10 7 8 9 1 5 4 3","expected":"1 3 4 5 7 8 9 10"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nint partition(int arr[], int lo, int hi) {\n  int pivot = arr[hi];\n  int i = lo - 1;\n  for (int j = lo; j < hi; j++)\n    if (arr[j] < pivot) swap(arr[++i], arr[j]);\n  swap(arr[i+1], arr[hi]);\n  return i+1;\n}\n\nvoid quickSort(int arr[], int lo, int hi) {\n  if (lo >= hi) return;\n  int pi = partition(arr, lo, hi);\n  quickSort(arr, lo, pi-1);\n  quickSort(arr, pi+1, hi);\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  quickSort(arr, 0, n-1);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "quick-sort (pivot=last element):\n  arr = [10, 7, 8, 9, 1, 5, 4, 3]\n  \n  Partition (pivot=3):\n    j=0(10>=3) no swap\n    j=1(7>=3)  no swap\n    j=2(8>=3)  no swap\n    j=3(9>=3)  no swap\n    j=4(1<3)   swap(10,1)  → [1, 7, 8, 9, 10, 5, 4, 3]\n    j=5(5>=3)  no swap\n    j=6(4>=3)  no swap\n    place pivot: swap(7,3) → [1, 3, 8, 9, 10, 5, 4, 7]\n    pivot 3 at index 1, recurse left [1] and right [8,9,10,5,4,7]\n  \n  Recurse right (pivot=7):\n    [8, 9, 10, 5, 4, 7] → partition → [5, 4, 7, 9, 10, 8] → pivot 7 at idx 2\n    recurse left [5,4] → partition → [4,5] → done\n    recurse right [9,10,8] → partition → [8,9,10] → done\n  \n  Result: [1, 3, 4, 5, 7, 8, 9, 10] sorted!\n\nQuick sort is a divide-and-conquer algorithm that selects a pivot element, partitions the array so elements ≤ pivot go left and > pivot go right, then recursively applies the same process to left and right partitions. Time complexity: average O(n log n), worst O(n²) (rare with randomization). Space: O(log n) for recursion stack. In-place: yes. Stable: no.\n\nDiagram:\n  arr = [3, 6, 8, 10, 1, 2, 1], pivot=last=1\n\n  Partition: [1, 2, 1, 10, 6, 8, 3] pivot at idx 2\n  Left: [1] sorted\n  Right: [10, 6, 8, 3] pivot=3 -> [3, 6, 8, 10]\n    Recurse right: [6, 8, 10] -> [6, 8, 10]\n  Result: [1, 1, 2, 3, 6, 8, 10]",
    complexity: {"time":"O(n log n) avg, O(n²) worst","space":"O(log n)"},
    sheet: "Striver A2Z",
    solution_code: "int partition(int arr[],int lo,int hi){int p=arr[hi],i=lo;for(int j=lo;j<hi;j++)if(arr[j]<=p)swap(arr[i++],arr[j]);swap(arr[i],arr[hi]);return i;}",
    techniques: ["sorting"],
  },
  {
    id: "count-inversions",
    title: "Count Inversions (Merge Sort)",
    category: "sorting",
    difficulty: "medium",
    description: "Count inversions in array using merge sort.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"5\n2 4 1 3 5","output":"3","explanation":"(2,1),(4,1),(4,3)"}
    ],
    test_cases: [
      {"input":"5\n2 4 1 3 5","expected":"3"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nlong long inversions = 0;\n\nvoid merge(int arr[], int l, int m, int r) {\n  int n1 = m-l+1, n2 = r-m;\n  int L[n1], R[n2];\n  for (int i = 0; i < n1; i++) L[i] = arr[l+i];\n  for (int i = 0; i < n2; i++) R[i] = arr[m+1+i];\n  int i = 0, j = 0, k = l;\n  while (i < n1 && j < n2) {\n    if (L[i] <= R[j]) arr[k++] = L[i++];\n    else { arr[k++] = R[j++]; inversions += n1 - i; }\n  }\n  while (i < n1) arr[k++] = L[i++];\n  while (j < n2) arr[k++] = R[j++];\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n  if (l >= r) return;\n  int m = l + (r-l)/2;\n  mergeSort(arr, l, m);\n  mergeSort(arr, m+1, r);\n  merge(arr, l, m, r);\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  mergeSort(arr, 0, n-1);\n  cout << inversions << endl;\n  return 0;\n}",
    approach: "count-inversions (merge-sort based):\n  arr = [2, 4, 1, 3, 5]\n  \n  Split: [2, 4, 1] | [3, 5]\n         [2] [4, 1] | [3] [5]\n         [2] [4] [1] | [3] [5]\n  \n  Merge [4] and [1]: 4>1 → inversion count+=1 → [1,4]\n  Merge [2] and [1,4]: 2>1 → count+=1 (remaining in L=1), 2<4 → no inversion\n    total so far: 2 inversions\n  Merge [3] and [5]: 3<5 → no inversion\n  Merge [1,2,4] and [3,5]:\n    1<3 → no inversion\n    2<3 → no inversion\n    4>3 → count+=1 (remaining in L: 4,5 → inversion with 3 only)\n    4<5 → no inversion\n    total: 3 inversions: (2,1), (4,1), (4,3)\n\n  Result: [1, 2, 3, 4, 5], inversions = 3\n\nThis algorithm counts inversions during the merge step of merge sort. An inversion is a pair (i,j) where i<j and arr[i]>arr[j]. When merging two sorted halves, if an element from the right half (R[j]) is smaller than L[i], then it forms inversions with all remaining elements in the left half (n1-i of them). Time complexity: O(n log n). Space: O(n).\n\nDiagram:\n  arr = [2, 4, 1, 3, 5]\n\n  Merge [4] & [1]: 4>1 -> inv+=1 -> [1,4]  (inv=1)\n  Merge [2] & [1,4]: 2>1 -> inv+=1 -> [1,2,4]  (inv=2)\n  Merge [1,2,4] & [3,5]: 4>3 -> inv+=1 -> [1,2,3,4,5]  (inv=3)\n  Inversions: (2,1), (4,1), (4,3)",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "int count[100001]={0},out[n]; for(int i=0;i<n;i++)count[arr[i]]++; for(int i=1;i<=100000;i++)count[i]+=count[i-1]; for(int i=n-1;i>=0;i--)out[--count[arr[i]]]=arr[i];",
    techniques: ["sorting"],
  },
  {
    id: "heap-sort",
    title: "Heap Sort Implementation",
    category: "sorting",
    difficulty: "medium",
    description: "Implement heap sort and return sorted array.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"6\n12 11 13 5 6 7","output":"5 6 7 11 12 13"}
    ],
    test_cases: [
      {"input":"6\n12 11 13 5 6 7","expected":"5 6 7 11 12 13"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nvoid heapify(int arr[], int n, int i) {\n  int largest = i, l = 2*i+1, r = 2*i+2;\n  if (l < n && arr[l] > arr[largest]) largest = l;\n  if (r < n && arr[r] > arr[largest]) largest = r;\n  if (largest != i) { swap(arr[i], arr[largest]); heapify(arr, n, largest); }\n}\n\nvoid heapSort(int arr[], int n) {\n  for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);\n  for (int i = n-1; i > 0; i--) { swap(arr[0], arr[i]); heapify(arr, i, 0); }\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  heapSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "heap-sort:\n  arr = [12, 11, 13, 5, 6, 7]\n  \n  Build max-heap:\n    heapify idx=2 (val=13): leaf → no change\n    heapify idx=1 (val=11): children 5,6 → 11 > both → no change\n    heapify idx=0 (val=12): children 11,13 → swap(12,13)\n    heap: [13, 11, 12, 5, 6, 7]\n  \n  Extract max:\n    swap(13,7) → [7, 11, 12, 5, 6, 13], heapify root → [12, 11, 7, 5, 6, 13]\n    swap(12,6) → [6, 11, 7, 5, 12, 13], heapify root → [11, 6, 7, 5, 12, 13]\n    swap(11,5) → [5, 6, 7, 11, 12, 13], heapify root → [7, 6, 5, 11, 12, 13]\n    swap(7,5)  → [5, 6, 7, 11, 12, 13], heapify root → [6, 5, 7, 11, 12, 13]\n    swap(6,5)  → [5, 6, 7, 11, 12, 13]  sorted!\n\nHeap sort builds a max-heap from the array, then repeatedly extracts the maximum element by swapping the root with the last element, reducing the heap size, and restoring the heap property via heapify. Time complexity: O(n log n) in all cases. Space: O(1) in-place. Stable: no.\n\nDiagram:\n  arr = [12, 11, 13, 5, 6, 7]\n\n  Build heap: [13, 11, 12, 5, 6, 7]\n  Extract 13 -> [7,11,12,5,6,13] heapify -> [12,11,7,5,6,13]\n  Extract 12 -> [6,11,7,5,12,13] heapify -> [11,6,7,5,12,13]\n  Extract 11 -> [5,6,7,11,12,13] heapify -> [7,6,5,11,12,13]\n  Extract 7  -> [5,6,7,11,12,13] heapify -> [6,5,7,11,12,13]\n  Extract 6  -> [5,6,7,11,12,13] sorted!",
    complexity: {"time":"O(n log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "void heapify(int arr[],int n,int i){int l=2*i+1,r=2*i+2,largest=i;if(l<n&&arr[l]>arr[largest])largest=l;if(r<n&&arr[r]>arr[largest])largest=r;if(largest!=i){swap(arr[i],arr[largest]);heapify(arr,n,largest);}} for(int i=n/2-1;i>=0;i--)heapify(arr,n,i); for(int i=n-1;i>0;i--){swap(arr[0],arr[i]);heapify(arr,i,0);}",
    techniques: ["sorting"],
  },
  {
    id: "find-kth-smallest",
    title: "Kth Smallest Element (QuickSelect)",
    category: "sorting",
    difficulty: "medium",
    description: "Find kth smallest element using quickselect.",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"6\n7 10 4 3 20 15\n3","output":"7"}
    ],
    test_cases: [
      {"input":"6\n7 10 4 3 20 15\n3","expected":"7"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint partition(int arr[], int l, int r) {\n  int pivot = arr[r], i = l;\n  for (int j = l; j < r; j++)\n    if (arr[j] <= pivot) swap(arr[i++], arr[j]);\n  swap(arr[i], arr[r]);\n  return i;\n}\n\nint quickSelect(int arr[], int l, int r, int k) {\n  if (l == r) return arr[l];\n  int pi = partition(arr, l, r);\n  if (k == pi) return arr[k];\n  return (k < pi) ? quickSelect(arr, l, pi-1, k) : quickSelect(arr, pi+1, r, k);\n}\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  cout << quickSelect(arr, 0, n-1, k-1) << endl;\n  return 0;\n}",
    approach: "quickselect (find 3rd smallest, k=3):\n  arr = [7, 10, 4, 3, 20, 15]\n  \n  Partition (pivot=15):\n    [7, 10, 4, 3, 15, 20] → pivot at idx 4, k-1=2 < 4 → recurse left\n  \n  Partition left [7,10,4,3] (pivot=3):\n    [3, 10, 4, 7] → pivot at idx 0, k-1=2 > 0 → recurse right\n  \n  Partition right [10,4,7] (pivot=7):\n    [4, 7, 10] → pivot at idx 1, k-1=2 > 1 → recurse right\n  \n  Partition right [10] → pivot at idx 2, k-1 == 2 → return 10\n  \n  Wait, let's recompute with k=3 (k-1=2):\n  \n  arr = [7, 10, 4, 3, 20, 15], k=3\n  \n  Partition [0..5] pivot=15:\n    i=0, j=0: 7<=15 swap(7,7) i=1\n    j=1: 10<=15 swap(10,10) i=2\n    j=2: 4<=15 swap(4,4) i=3\n    j=3: 3<=15 swap(3,3) i=4\n    j=4: 20>15 no swap\n    place pivot: swap(20,15) → [7,10,4,3,15,20] pi=4\n    k-1=2 < 4 → recurse [0..3]\n  \n  Partition [0..3] pivot=3:\n    j=0: 7>3 no swap; j=1: 10>3 no swap; j=2: 4>3 no swap\n    place pivot: swap(7,3) → [3,10,4,7,15,20] pi=0\n    k-1=2 > 0 → recurse [1..3]\n  \n  Partition [1..3] pivot=7:\n    j=1: 10>7 no swap; j=2: 4<=7 swap(10,4) i=2\n    place pivot: swap(10,7) → [3,4,7,10,15,20] pi=2\n    k-1=2 == 2 → return 7\n  \n  Answer: 7 ✓\n\nQuickSelect is a selection algorithm based on quick sort partitioning. It partitions the array and then recurses only into the partition containing the kth element, achieving average O(n) time instead of sorting the entire array. Time complexity: average O(n), worst O(n²). Space: O(1) in-place.\n\nDiagram:\n  arr = [7, 10, 4, 3, 20, 15], k=3 (0-indexed k-1=2)\n\n  Partition [0..5] pivot=15 -> [7,10,4,3,15,20] pi=4, target=2 < 4\n  Partition [0..3] pivot=3  -> [3,10,4,7,15,20] pi=0, target=2 > 0\n  Partition [1..3] pivot=7  -> [3,4,7,10,15,20] pi=2, target=2 == pi\n  Result: 7",
    complexity: {"time":"O(n) avg, O(n²) worst","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int quickSelect(int arr[],int l,int r,int k){int pi=partition(arr,l,r);if(k==pi)return arr[k];return(k<pi)?quickSelect(arr,l,pi-1,k):quickSelect(arr,pi+1,r,k);}",
    techniques: ["sorting"],
  },
  {
    id: "radix-sort",
    title: "Radix Sort Implementation",
    category: "sorting",
    difficulty: "hard",
    description: "Implement radix sort for non-negative integers.",
    constraints: "1 <= n <= 10^4",
    examples: [
      {"input":"8\n170 45 75 90 802 24 2 66","output":"2 24 45 66 75 90 170 802"}
    ],
    test_cases: [
      {"input":"8\n170 45 75 90 802 24 2 66","expected":"2 24 45 66 75 90 170 802"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nvoid countSort(int arr[], int n, int exp) {\n  int out[n], cnt[10] = {0};\n  for (int i = 0; i < n; i++) cnt[(arr[i]/exp)%10]++;\n  for (int i = 1; i < 10; i++) cnt[i] += cnt[i-1];\n  for (int i = n-1; i >= 0; i--) {\n    out[cnt[(arr[i]/exp)%10]-1] = arr[i];\n    cnt[(arr[i]/exp)%10]--;\n  }\n  for (int i = 0; i < n; i++) arr[i] = out[i];\n}\n\nvoid radixSort(int arr[], int n) {\n  int mx = *max_element(arr, arr+n);\n  for (int exp = 1; mx/exp > 0; exp *= 10) countSort(arr, n, exp);\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  radixSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "radix-sort (LSD):\n  arr = [170, 45, 75, 90, 802, 24, 2, 66]\n  padded: [170, 045, 075, 090, 802, 024, 002, 066]\n  \n  Pass 1 (ones place, exp=1):\n    cnt: [0,0,2,0,1,1,1,1,0,2] → prefix: [0,0,2,2,3,4,5,6,6,8]\n    stable sort by ones digit:\n    [170, 090, 802, 002, 024, 045, 075, 066]\n  \n  Pass 2 (tens place, exp=10):\n    cnt: [2,0,2,0,1,1,0,1,1,0] → prefix: [2,2,4,4,5,6,6,7,8,8]\n    stable sort by tens digit:\n    [802, 002, 024, 045, 066, 170, 075, 090]\n  \n  Pass 3 (hundreds place, exp=100):\n    cnt: [5,0,1,0,0,0,0,1,0,1] → prefix: [5,5,6,6,6,6,6,7,7,8]\n    stable sort by hundreds digit:\n    [002, 024, 045, 066, 075, 090, 170, 802]\n  \n  Result: [2, 24, 45, 66, 75, 90, 170, 802] sorted!\n\nRadix sort is a non-comparison integer sorting algorithm that processes digits from least significant digit (LSD) to most significant digit (MSD), using a stable counting sort as a subroutine for each digit position. Time complexity: O(d × (n + b)) where d = number of digits and b = base (typically 10). For fixed-width integers, this simplifies to O(n). Space: O(n + b). Stable: yes.\n\nDiagram:\n  arr = [170, 45, 75, 90, 802, 24, 2, 66]\n\n  Pass 1 (ones): [170, 090, 802, 002, 024, 045, 075, 066]\n  Pass 2 (tens): [802, 002, 024, 045, 066, 170, 075, 090]\n  Pass 3 (100s): [002, 024, 045, 066, 075, 090, 170, 802]\n  Result: [2, 24, 45, 66, 75, 90, 170, 802]",
    complexity: {"time":"O(d×(n+k))","space":"O(n+k)"},
    sheet: "Striver A2Z",
    solution_code: "int getMax(int arr[],int n){int mx=arr[0];for(int i=1;i<n;i++)if(arr[i]>mx)mx=arr[i];return mx;} // then countSort for each digit (exp = 1, 10, 100...)",
    techniques: ["sorting"],
  },
  {
    id: "tim-sort",
    title: "Timsort Implementation",
    category: "sorting",
    difficulty: "hard",
    description: "Implement timsort (merge sort + insertion sort hybrid) and return sorted array.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"10\n5 21 7 23 19 3 11 17 13 2","output":"2 3 5 7 11 13 17 19 21 23"}
    ],
    test_cases: [
      {"input":"10\n5 21 7 23 19 3 11 17 13 2","expected":"2 3 5 7 11 13 17 19 21 23"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nconst int RUN = 32;\n\nvoid insertionSort(int arr[], int l, int r) {\n  for (int i = l+1; i <= r; i++) {\n    int key = arr[i], j = i-1;\n    while (j >= l && arr[j] > key) { arr[j+1] = arr[j]; j--; }\n    arr[j+1] = key;\n  }\n}\n\nvoid merge(int arr[], int l, int m, int r) {\n  int n1 = m-l+1, n2 = r-m;\n  int L[n1], R[n2];\n  for (int i = 0; i < n1; i++) L[i] = arr[l+i];\n  for (int i = 0; i < n2; i++) R[i] = arr[m+1+i];\n  int i = 0, j = 0, k = l;\n  while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];\n  while (i < n1) arr[k++] = L[i++];\n  while (j < n2) arr[k++] = R[j++];\n}\n\nvoid timSort(int arr[], int n) {\n  for (int i = 0; i < n; i += RUN)\n    insertionSort(arr, i, min(i+RUN-1, n-1));\n  for (int sz = RUN; sz < n; sz *= 2) {\n    for (int l = 0; l < n; l += 2*sz) {\n      int m = l+sz-1, r = min(l+2*sz-1, n-1);\n      if (m < r) merge(arr, l, m, r);\n    }\n  }\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  timSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "tim-sort (RUN=4 for diagram):\n  arr = [5, 21, 7, 23, 19, 3, 11, 17, 13, 2]\n  \n  Step 1: Insertion sort each RUN of 4:\n    run0 [0..3]: [5,21,7,23] → [5,7,21,23]\n    run1 [4..7]: [19,3,11,17] → [3,11,17,19]\n    run2 [8..9]: [13,2] → [2,13]\n    After: [5,7,21,23, 3,11,17,19, 2,13]\n  \n  Step 2: Merge runs of size 4:\n    merge [0..3] + [4..7]: [5,7,21,23] + [3,11,17,19]\n      → [3,5,7,11,17,19,21,23]\n    merge [8..9] is lone run, skip\n    After: [3,5,7,11,17,19,21,23, 2,13]\n  \n  Step 3: Merge runs of size 8:\n    merge [0..7] + [8..9]: [3,5,7,11,17,19,21,23] + [2,13]\n      → [2,3,5,7,11,13,17,19,21,23]  sorted!\n\nTimsort is a hybrid stable sorting algorithm derived from merge sort and insertion sort, designed to perform well on real-world data. It divides the array into small runs (typically 32-64 elements), sorts each run with insertion sort, then merges runs using a merge sort strategy. Time complexity: O(n log n) worst-case, O(n) best-case (already sorted data). Space: O(n). Stable: yes.\n\nDiagram:\n  arr = [5, 21, 7, 23, 19, 3, 11, 17, 13, 2], RUN=4\n\n  Insertion sort runs:\n    [5,7,21,23] [3,11,17,19] [2,13]\n  Merge runs (size 4+4): [3,5,7,11,17,19,21,23]\n  Merge (size 8+2): [2,3,5,7,11,13,17,19,21,23]",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "const int RUN=32; for(int i=0;i<n;i+=RUN)insertionSort(arr,i,min(i+RUN-1,n-1)); for(int sz=RUN;sz<n;sz*=2){for(int l=0;l<n;l+=2*sz){int m=l+sz-1,r=min(l+2*sz-1,n-1);if(m<r)merge(arr,l,m,r);}}",
    techniques: ["sorting"],
  },
  {
    id: "comb-sort",
    title: "Comb Sort Implementation",
    category: "sorting",
    difficulty: "medium",
    description: "Implement comb sort and return sorted array.",
    constraints: "1 <= n <= 10^4",
    examples: [
      {"input":"8\n8 4 1 56 3 9 2 18","output":"1 2 3 4 8 9 18 56"}
    ],
    test_cases: [
      {"input":"8\n8 4 1 56 3 9 2 18","expected":"1 2 3 4 8 9 18 56"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nvoid combSort(int arr[], int n) {\n  int gap = n;\n  bool swapped = true;\n  while (gap != 1 || swapped) {\n    gap = (gap * 10) / 13;\n    if (gap < 1) gap = 1;\n    swapped = false;\n    for (int i = 0; i < n-gap; i++) {\n      if (arr[i] > arr[i+gap]) {\n        swap(arr[i], arr[i+gap]);\n        swapped = true;\n      }\n    }\n  }\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  combSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "comb-sort (shrink factor 1.3):\n  arr = [8, 4, 1, 56, 3, 9, 2, 18]\n  \n  gap=8, gap=int(8/1.3)=6:\n    compare(8,2) → swap → [2,4,1,56,3,9,8,18]\n    compare(4,18) → no swap\n  \n  gap=int(6/1.3)=4:\n    [2,4,1,56,3,9,8,18]\n    compare(2,3) → no swap\n    compare(4,9) → no swap\n    compare(1,8) → swap → [2,4,8,56,3,9,1,18]\n    compare(56,18) → swap → [2,4,8,18,3,9,1,56]\n  \n  gap=int(4/1.3)=3:\n    [2,4,8,18,3,9,1,56]\n    compare(2,18) → no swap; compare(4,3) → swap → [2,3,8,18,4,9,1,56]\n    compare(8,9) → no swap; compare(18,1) → swap → [2,3,8,1,4,9,18,56]\n    compare(4,56) → no swap\n  \n  ...continue until gap=1 and no swaps → [1,2,3,4,8,9,18,56] sorted!\n\nComb sort improves on bubble sort by comparing elements with a gap that shrinks by a factor of 1.3 each pass. This eliminates turtles (small values near the end) much faster than bubble sort. Time complexity: average O(n log n), worst O(n²). Space: O(1) in-place. Stable: no.\n\nDiagram:\n  arr = [8, 4, 1, 56, 3, 9, 2, 18]\n\n  gap=6: swap(8,2) -> [2,4,1,56,3,9,8,18]\n  gap=4: swap(1,8) swap(56,18) -> [2,4,8,18,3,9,1,56]\n  gap=3: swap(4,3) swap(18,1) -> [2,3,8,1,4,9,18,56]\n  ...continue until gap=1 no swaps -> [1,2,3,4,8,9,18,56]",
    complexity: {"time":"O(n log n) avg, O(n²) worst","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int gap=n; bool swapped=true; while(gap!=1||swapped){gap=(gap*10)/13;if(gap<1)gap=1;swapped=false;for(int i=0;i<n-gap;i++)if(arr[i]>arr[i+gap]){swap(arr[i],arr[i+gap]);swapped=true;}}",
    techniques: ["sorting"],
  },
  {
    id: "pancake-sort",
    title: "Pancake Sort Implementation",
    category: "sorting",
    difficulty: "medium",
    description: "Implement pancake sort using prefix reversals (flips).",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"6\n3 6 1 5 2 4","output":"1 2 3 4 5 6"}
    ],
    test_cases: [
      {"input":"6\n3 6 1 5 2 4","expected":"1 2 3 4 5 6"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nvoid flip(int arr[], int i) {\n  int l = 0;\n  while (l < i) swap(arr[l++], arr[i--]);\n}\n\nvoid pancakeSort(int arr[], int n) {\n  for (int sz = n; sz > 1; sz--) {\n    int mx = max_element(arr, arr+sz) - arr;\n    if (mx != sz-1) {\n      if (mx != 0) flip(arr, mx);\n      flip(arr, sz-1);\n    }\n  }\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  pancakeSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "pancake-sort:\n  arr = [3, 6, 1, 5, 2, 4]\n  \n  sz=6: max=6 at idx 1\n    flip(0..1): [6, 3, 1, 5, 2, 4]\n    flip(0..5): [4, 2, 5, 1, 3, 6]  ✓ 6 in place\n  \n  sz=5: max=5 at idx 2\n    flip(0..2): [5, 2, 4, 1, 3, 6]\n    flip(0..4): [3, 1, 4, 2, 5, 6]  ✓ 5 in place\n  \n  sz=4: max=4 at idx 2\n    flip(0..2): [4, 1, 3, 2, 5, 6]\n    flip(0..3): [2, 3, 1, 4, 5, 6]  ✓ 4 in place\n  \n  sz=3: max=3 at idx 1\n    flip(0..1): [3, 2, 1, 4, 5, 6]\n    flip(0..2): [1, 2, 3, 4, 5, 6]  ✓ 3 in place\n  \n  sz=2: max=2 at idx 1, already at end → skip\n  \n  Result: [1, 2, 3, 4, 5, 6] sorted!\n\nPancake sort sorts the array using only prefix reversals (flips), like flipping a stack of pancakes. For each size from n down to 2, it finds the maximum element in the unsorted portion, flips it to the front, then flips it to its correct position at the end. Time complexity: O(n²). Space: O(1) in-place. Stable: no.\n\nDiagram:\n  arr = [3, 6, 1, 5, 2, 4]\n\n  sz=6: max=6 at 1 -> flip(0,1) -> [6,3,1,5,2,4] -> flip(0,5) -> [4,2,5,1,3,6]\n  sz=5: max=5 at 2 -> flip(0,2) -> [5,2,4,1,3,6] -> flip(0,4) -> [3,1,4,2,5,6]\n  sz=4: max=4 at 2 -> flip(0,2) -> [4,1,3,2,5,6] -> flip(0,3) -> [2,3,1,4,5,6]\n  sz=3: max=3 at 1 -> flip(0,1) -> [3,2,1,4,5,6] -> flip(0,2) -> [1,2,3,4,5,6]",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "for(int sz=n;sz>1;sz--){int mx=max_element(arr,arr+sz)-arr;if(mx!=sz-1){if(mx)reverse(arr,arr+mx+1);reverse(arr,arr+sz);}}",
    techniques: ["sorting"],
  },
  {
    id: "gnome-sort",
    title: "Gnome Sort Implementation",
    category: "sorting",
    difficulty: "easy",
    description: "Implement gnome sort and return sorted array.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"6\n34 2 10 5 1 8","output":"1 2 5 8 10 34"}
    ],
    test_cases: [
      {"input":"6\n34 2 10 5 1 8","expected":"1 2 5 8 10 34"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nvoid gnomeSort(int arr[], int n) {\n  int i = 0;\n  while (i < n) {\n    if (i == 0 || arr[i-1] <= arr[i]) i++;\n    else { swap(arr[i], arr[i-1]); i--; }\n  }\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  gnomeSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "gnome-sort:\n  arr = [34, 2, 10, 5, 1, 8]\n  \n  i=0: i==0 → i=1\n  i=1: 34>2 → swap → [2,34,10,5,1,8], i=0\n  i=0: i==0 → i=1\n  i=1: 2<34 → i=2\n  i=2: 34>10 → swap → [2,10,34,5,1,8], i=1\n  i=1: 2<10 → i=2\n  i=2: 10<34 → i=3\n  i=3: 34>5 → swap → [2,10,5,34,1,8], i=2\n  i=2: 10>5 → swap → [2,5,10,34,1,8], i=1\n  i=1: 2<5 → i=2\n  i=2: 5<10 → i=3\n  i=3: 10<34 → i=4\n  i=4: 34>1 → swap → [2,5,10,1,34,8], i=3\n  i=3: 10>1 → swap → [2,5,1,10,34,8], i=2\n  i=2: 5>1 → swap → [2,1,5,10,34,8], i=1\n  i=1: 2>1 → swap → [1,2,5,10,34,8], i=0\n  i=0: i==0 → i=1\n  i=1: 1<2 → i=2 → i=3 → i=4\n  i=4: 34>8 → swap → [1,2,5,10,8,34], i=3\n  i=3: 10>8 → swap → [1,2,5,8,10,34], i=2 → i=3 → i=4 → i=5 → i=6 done!\n  \n  Result: [1, 2, 5, 8, 10, 34] sorted!\n\nGnome sort (also called stupid sort) works like insertion sort but uses a series of swaps to move an element backward to its correct position, like a garden gnome sorting flower pots. Time complexity: O(n²). Space: O(1) in-place. Stable: yes.\n\nDiagram:\n  arr = [34, 2, 10, 5, 1, 8]\n\n  i=1: 34>2 swap -> [2,34,10,5,1,8] i=0 -> i=1\n  i=2: 34>10 swap -> [2,10,34,5,1,8] i=1 -> i=2 -> i=3\n  i=3: 34>5 swap -> [2,10,5,34,1,8] i=2 -> 10>5 swap -> [2,5,10,34,1,8]\n  ... continues swapping backwards until sorted\n  Result: [1, 2, 5, 8, 10, 34]",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int i=0; while(i<n){if(i==0||arr[i-1]<=arr[i])i++;else{swap(arr[i],arr[i-1]);i--;}}",
    techniques: ["sorting"],
  },
  {
    id: "stooge-sort",
    title: "Stooge Sort Implementation",
    category: "sorting",
    difficulty: "hard",
    description: "Implement stooge sort and return sorted array.",
    constraints: "1 <= n <= 10^2",
    examples: [
      {"input":"6\n2 4 5 3 1 6","output":"1 2 3 4 5 6"}
    ],
    test_cases: [
      {"input":"6\n2 4 5 3 1 6","expected":"1 2 3 4 5 6"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nvoid stoogeSort(int arr[], int l, int r) {\n  if (l >= r) return;\n  if (arr[l] > arr[r]) swap(arr[l], arr[r]);\n  if (r-l+1 > 2) {\n    int t = (r-l+1)/3;\n    stoogeSort(arr, l, r-t);\n    stoogeSort(arr, l+t, r);\n    stoogeSort(arr, l, r-t);\n  }\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  stoogeSort(arr, 0, n-1);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "stooge-sort:\n  arr = [2, 4, 5, 3, 1, 6]\n  \n  Call stoogeSort(0,5): n=6, t=2\n    arr[0]=2 <= arr[5]=6, no swap\n    recurse(0,3): n=4, t=1\n      arr[0]=2 <= arr[3]=3, no swap\n      recurse(0,2): n=3, t=1\n        arr[0]=2 <= arr[2]=5, no swap\n        recurse(0,1): swap if needed (no)\n        recurse(1,2): swap if needed (no)\n        recurse(0,1): no change\n      recurse(1,3): n=3, t=1\n        arr[1]=4 > arr[3]=3 → swap → [2,3,5,4,1,6]\n        recurse(1,2): swap if needed (no)\n        recurse(2,3): 5>4 → swap → [2,3,4,5,1,6]\n        recurse(1,2): no change\n      recurse(0,2):\n        arr[0]=2 <= arr[2]=4, no swap\n        recurse(0,1): no change\n        recurse(1,2): no change\n        recurse(0,1): no change\n    recurse(2,5): n=4, t=1\n      arr[2]=4 <= arr[5]=6, no swap\n      ... sorts [4,5,1,6] → [1,4,5,6]\n    recurse(0,3): sorts [2,3,1,4] → [1,2,3,4]\n  \n  Result: [1, 2, 3, 4, 5, 6] sorted!\n\nStooge sort is a recursive sorting algorithm with comically poor performance. It recursively sorts the first 2/3, then the last 2/3, then the first 2/3 again. Time complexity: O(n^(log 3 / log 1.5)) ≈ O(n^2.709). Mainly used as a joke or teaching example of why algorithm analysis matters. Space: O(log n) recursion stack. Stable: no.\n\nDiagram:\n  arr = [2, 4, 5, 3, 1, 6]\n\n  stooge(0,5) t=2\n    stooge(0,3) t=1 -> sorts [2,4,5,3] -> [2,3,4,5]\n    stooge(2,5) t=1 -> sorts [4,5,1,6] -> [1,4,5,6]\n    stooge(0,3) t=1 -> sorts [2,3,1,4] -> [1,2,3,4]\n  Result: [1, 2, 3, 4, 5, 6]",
    complexity: {"time":"O(n^2.709)","space":"O(log n)"},
    sheet: "Striver A2Z",
    solution_code: "void stoogeSort(int arr[],int l,int r){if(l>=r)return;if(arr[l]>arr[r])swap(arr[l],arr[r]);if(r-l+1>2){int t=(r-l+1)/3;stoogeSort(arr,l,r-t);stoogeSort(arr,l+t,r);stoogeSort(arr,l,r-t);}}",
    techniques: ["sorting"],
  },
  {
    id: "cocktail-shaker",
    title: "Cocktail Shaker Sort Implementation",
    category: "sorting",
    difficulty: "easy",
    description: "Implement cocktail shaker sort (bidirectional bubble sort) and return sorted array.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"8\n5 1 4 2 8 0 3 7","output":"0 1 2 3 4 5 7 8"}
    ],
    test_cases: [
      {"input":"8\n5 1 4 2 8 0 3 7","expected":"0 1 2 3 4 5 7 8"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nvoid cocktailShakerSort(int arr[], int n) {\n  bool swapped = true;\n  int l = 0, r = n-1;\n  while (swapped) {\n    swapped = false;\n    for (int i = l; i < r; i++)\n      if (arr[i] > arr[i+1]) { swap(arr[i], arr[i+1]); swapped = true; }\n    if (!swapped) break;\n    swapped = false; r--;\n    for (int i = r-1; i >= l; i--)\n      if (arr[i] > arr[i+1]) { swap(arr[i], arr[i+1]); swapped = true; }\n    l++;\n  }\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cocktailShakerSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "cocktail-shaker-sort:\n  arr = [5, 1, 4, 2, 8, 0, 3, 7]\n  \n  Forward pass (l=0..7):\n    [1,5,4,2,8,0,3,7] [1,4,5,2,8,0,3,7] [1,4,2,5,8,0,3,7]\n    [1,4,2,5,8,0,3,7] [1,4,2,5,0,8,3,7] [1,4,2,5,0,3,8,7]\n    [1,4,2,5,0,3,7,8]  → 8 settled at end, r=6\n  \n  Backward pass (r=6..0):\n    [1,4,2,5,0,3,7,8] [1,4,2,0,5,3,7,8] [1,4,0,2,5,3,7,8]\n    [1,0,4,2,5,3,7,8] [0,1,4,2,5,3,7,8] → 0 settled at front, l=1\n  \n  Forward pass (l=1..6):\n    [0,1,4,2,5,3,7,8] [0,1,2,4,5,3,7,8]\n    [0,1,2,3,4,5,7,8] → 7 settled, r=5\n  \n  Backward pass (r=5..1):\n    no swaps → sorted!\n  \n  Result: [0, 1, 2, 3, 4, 5, 7, 8] sorted!\n\nCocktail shaker sort is a bidirectional variant of bubble sort that alternates between left-to-right and right-to-left passes. This helps move both small values (turtles) and large values (rabbits) to their correct positions more quickly. Time complexity: O(n²). Space: O(1) in-place. Stable: yes.\n\nDiagram:\n  arr = [5, 1, 4, 2, 8, 0, 3, 7]\n\n  Forward: [1,4,2,5,0,3,7,8] (8 settled)\n  Backward: [0,1,4,2,5,3,7,8] (0 settled)\n  Forward: [0,1,2,4,3,5,7,8] (7 settled)\n  Backward: no swaps -> sorted!\n  Result: [0, 1, 2, 3, 4, 5, 7, 8]",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "bool swapped=true; int l=0,r=n-1; while(swapped){swapped=false; for(int i=l;i<r;i++)if(arr[i]>arr[i+1])swap(arr[i],arr[i+1]),swapped=true; if(!swapped)break; swapped=false; r--; for(int i=r-1;i>=l;i--)if(arr[i]>arr[i+1])swap(arr[i],arr[i+1]),swapped=true; l++;}",
    techniques: ["sorting"],
  },
  {
    id: "pigeonhole-sort",
    title: "Pigeonhole Sort Implementation",
    category: "sorting",
    difficulty: "medium",
    description: "Implement pigeonhole sort for integers in a known range.",
    constraints: "1 <= n <= 10^4, 0 <= arr[i] <= 10^5",
    examples: [
      {"input":"8\n8 3 2 7 4 6 8 1","output":"1 2 3 4 6 7 8 8"}
    ],
    test_cases: [
      {"input":"8\n8 3 2 7 4 6 8 1","expected":"1 2 3 4 6 7 8 8"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nvoid pigeonholeSort(int arr[], int n) {\n  int mn = arr[0], mx = arr[0];\n  for (int i = 1; i < n; i++) {\n    if (arr[i] < mn) mn = arr[i];\n    if (arr[i] > mx) mx = arr[i];\n  }\n  int range = mx - mn + 1;\n  int holes[range] = {0};\n  for (int i = 0; i < n; i++) holes[arr[i]-mn]++;\n  int idx = 0;\n  for (int i = 0; i < range; i++)\n    while (holes[i]--) arr[idx++] = i + mn;\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  pigeonholeSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "pigeonhole-sort:\n  arr = [8, 3, 2, 7, 4, 6, 8, 1]\n  range = 1..8 → 8 holes\n  \n  Step 1: Count frequencies:\n    holes[0](value1)=1, [1](2)=1, [2](3)=1, [3](4)=1\n    holes[4](5)=0, [5](6)=1, [6](7)=1, [7](8)=2\n  \n  Step 2: Fill output from holes:\n    hole0: 1 → arr=[1]\n    hole1: 2 → arr=[1,2]\n    hole2: 3 → arr=[1,2,3]\n    hole3: 4 → arr=[1,2,3,4]\n    hole4: skip (0)\n    hole5: 6 → arr=[1,2,3,4,6]\n    hole6: 7 → arr=[1,2,3,4,6,7]\n    hole7: 8,8 → arr=[1,2,3,4,6,7,8,8]\n  \n  Result: [1, 2, 3, 4, 6, 7, 8, 8] sorted!\n\nPigeonhole sort is similar to counting sort but optimized for cases where the number of elements (n) is close to the range of possible values. It creates pigeonholes for each distinct value, counts occurrences, then fills the output array in order. Time complexity: O(n + range). Space: O(range). Stable: no (but can be made stable).\n\nDiagram:\n  arr = [8, 3, 2, 7, 4, 6, 8, 1], range=1..8\n\n  Holes: [1:1] [2:1] [3:1] [4:1] [5:0] [6:1] [7:1] [8:2]\n  Output: [1, 2, 3, 4, 6, 7, 8, 8]",
    complexity: {"time":"O(n + range)","space":"O(range)"},
    sheet: "Striver A2Z",
    solution_code: "int mn=arr[0],mx=arr[0]; for(int i=1;i<n;i++){if(arr[i]<mn)mn=arr[i];if(arr[i]>mx)mx=arr[i];} int range=mx-mn+1; int holes[range]={0}; for(int i=0;i<n;i++)holes[arr[i]-mn]++; int idx=0; for(int i=0;i<range;i++)while(holes[i]--)arr[idx++]=i+mn;",
    techniques: ["sorting"],
  },
  {
    id: "cycle-sort",
    title: "Cycle Sort Implementation",
    category: "sorting",
    difficulty: "medium",
    description: "Implement cycle sort with minimal memory writes.",
    constraints: "1 <= n <= 10^4",
    examples: [
      {"input":"8\n1 8 3 2 7 4 6 5","output":"1 2 3 4 5 6 7 8"}
    ],
    test_cases: [
      {"input":"8\n1 8 3 2 7 4 6 5","expected":"1 2 3 4 5 6 7 8"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nvoid cycleSort(int arr[], int n) {\n  for (int cs = 0; cs < n-1; cs++) {\n    int item = arr[cs], pos = cs;\n    for (int i = cs+1; i < n; i++)\n      if (arr[i] < item) pos++;\n    if (pos == cs) continue;\n    while (item == arr[pos]) pos++;\n    if (pos != cs) swap(item, arr[pos]);\n    while (pos != cs) {\n      pos = cs;\n      for (int i = cs+1; i < n; i++)\n        if (arr[i] < item) pos++;\n      while (item == arr[pos]) pos++;\n      if (item != arr[pos]) swap(item, arr[pos]);\n    }\n  }\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cycleSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "cycle-sort (minimizes writes):\n  arr = [1, 8, 3, 2, 7, 4, 6, 5]\n  \n  Cycle start at 0: item=1, count of elements <1 starting from 0 → 0\n    pos=0 == cs → already correct, continue\n  \n  Cycle start at 1: item=8, elements <8 starting from 2: 3,2,7,4,6,5 → 6 elements\n    pos=1+6=7, arr[7]=5, swap → arr=[1,5,3,2,7,4,6,8], item=5\n    pos=1, count <5: 3,2,4 → 3 elements → pos=1+3=4, arr[4]=7, swap → arr=[1,5,3,2,7,4,6,8], item=7\n    pos=1, count <7: 3,2,4,6 → 4 elements → pos=1+4=5, arr[5]=4, swap → arr=[1,5,3,2,4,7,6,8], item=4\n    pos=1, count <4: 3,2 → 2 elements → pos=1+2=3, arr[3]=2, swap → arr=[1,5,3,2,4,7,6,8], item=2\n    pos=1, count <2: none → pos=1, swap arr[1]=5 with 2 → arr=[1,2,3,5,4,7,6,8], item=5\n    pos=1, count <5: 3,4 → 2 → pos=3, arr[3]=5, swap → arr=[1,2,3,5,4,7,6,8], item=5\n    pos=3==cs? no → continue... eventually arr=[1,2,3,4,5,6,7,8]\n\nCycle sort is an in-place, unstable sorting algorithm that minimizes memory writes (each element is written at most once to its final position). It decomposes the array into cycles and rotates each cycle into place. Time complexity: O(n²). Space: O(1). Best suited when memory writes are expensive (e.g., flash memory).\n\nDiagram:\n  arr = [1, 8, 3, 2, 7, 4, 6, 5]\n\n  Cycle at idx 1: item=8 -> pos=7 -> swap -> item=5\n    -> pos=4 -> swap -> item=7 -> pos=5 -> swap -> item=4\n    -> pos=3 -> swap -> item=2 -> pos=1 -> swap -> arr[1]=2 done\n  Cycle at idx 2: item=3 -> pos=2 -> already correct\n  Result: [1, 2, 3, 4, 5, 6, 7, 8]",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "for(int cs=0;cs<n-1;cs++){int item=arr[cs],pos=cs;for(int i=cs+1;i<n;i++)if(arr[i]<item)pos++;if(pos==cs)continue;while(item==arr[pos])pos++;swap(item,arr[pos]);while(pos!=cs){pos=cs;for(int i=cs+1;i<n;i++)if(arr[i]<item)pos++;while(item==arr[pos])pos++;if(item!=arr[pos])swap(item,arr[pos]);}}",
    techniques: ["sorting"],
  },
  {
    id: "odd-even-sort",
    title: "Odd-Even Sort / Brick Sort Implementation",
    category: "sorting",
    difficulty: "easy",
    description: "Implement odd-even sort (brick sort) and return sorted array.",
    constraints: "1 <= n <= 10^3",
    examples: [
      {"input":"6\n3 8 5 4 1 7","output":"1 3 4 5 7 8"}
    ],
    test_cases: [
      {"input":"6\n3 8 5 4 1 7","expected":"1 3 4 5 7 8"}
    ],
    solution_template: "#include <iostream>\nusing namespace std;\n\nvoid oddEvenSort(int arr[], int n) {\n  bool sorted = false;\n  while (!sorted) {\n    sorted = true;\n    for (int i = 1; i < n-1; i += 2)\n      if (arr[i] > arr[i+1]) { swap(arr[i], arr[i+1]); sorted = false; }\n    for (int i = 0; i < n-1; i += 2)\n      if (arr[i] > arr[i+1]) { swap(arr[i], arr[i+1]); sorted = false; }\n  }\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  oddEvenSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "odd-even-sort:\n  arr = [3, 8, 5, 4, 1, 7]\n  \n  Pass 1:\n    odd phase (i=1,3):\n      i=1: 8>5 → swap → [3,5,8,4,1,7]\n      i=3: 4>1 → swap → [3,5,8,1,4,7]\n    even phase (i=0,2,4):\n      i=0: 3<5 → no swap\n      i=2: 8>1 → swap → [3,5,1,8,4,7]\n      i=4: 4<7 → no swap\n  \n  Pass 2:\n    odd phase: i=1: 5>1 → swap → [3,1,5,8,4,7]\n               i=3: 8>4 → swap → [3,1,5,4,8,7]\n    even phase: i=0: 3>1 → swap → [1,3,5,4,8,7]\n                i=2: 5>4 → swap → [1,3,4,5,8,7]\n                i=4: 8>7 → swap → [1,3,4,5,7,8]\n  \n  Pass 3:\n    odd phase: i=1: 3<4 → no swap; i=3: 5<7 → no swap\n    even phase: i=0: 1<3 → no; i=2: 4<5 → no; i=4: 7<8 → no\n    sorted=true → done!\n  \n  Result: [1, 3, 4, 5, 7, 8] sorted!\n\nOdd-even sort (brick sort) is a parallel-friendly variant of bubble sort that alternates between comparing all odd-indexed pairs and all even-indexed pairs. It can be efficiently parallelized on GPUs. Time complexity: O(n²). Space: O(1) in-place. Stable: yes.\n\nDiagram:\n  arr = [3, 8, 5, 4, 1, 7]\n\n  Pass 1 odd:  [3,5,8,1,4,7]\n  Pass 1 even: [3,5,1,8,4,7]\n  Pass 2 odd:  [3,1,5,4,8,7]\n  Pass 2 even: [1,3,4,5,7,8]\n  Pass 3: no swaps -> sorted!",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "bool sorted=false; while(!sorted){sorted=true; for(int i=1;i<n-1;i+=2)if(arr[i]>arr[i+1]){swap(arr[i],arr[i+1]);sorted=false;} for(int i=0;i<n-1;i+=2)if(arr[i]>arr[i+1]){swap(arr[i],arr[i+1]);sorted=false;}}",
    techniques: ["sorting"],
  },
  {
    id: "intro-sort",
    title: "Introsort Implementation",
    category: "sorting",
    difficulty: "hard",
    description: "Implement introsort (hybrid of quicksort, heapsort, and insertion sort) and return sorted array.",
    constraints: "1 <= n <= 10^5",
    examples: [
      {"input":"10\n3 7 1 9 2 8 5 6 4 0","output":"0 1 2 3 4 5 6 7 8 9"}
    ],
    test_cases: [
      {"input":"10\n3 7 1 9 2 8 5 6 4 0","expected":"0 1 2 3 4 5 6 7 8 9"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nvoid insertionSort(int arr[], int l, int r) {\n  for (int i = l+1; i <= r; i++) {\n    int key = arr[i], j = i-1;\n    while (j >= l && arr[j] > key) { arr[j+1] = arr[j]; j--; }\n    arr[j+1] = key;\n  }\n}\n\nvoid heapify(int arr[], int n, int i) {\n  int l = 2*i+1, r = 2*i+2, largest = i;\n  if (l < n && arr[l] > arr[largest]) largest = l;\n  if (r < n && arr[r] > arr[largest]) largest = r;\n  if (largest != i) { swap(arr[i], arr[largest]); heapify(arr, n, largest); }\n}\n\nvoid heapSort(int arr[], int l, int r) {\n  int n = r-l+1;\n  int* a = arr + l;\n  for (int i = n/2-1; i >= 0; i--) heapify(a, n, i);\n  for (int i = n-1; i > 0; i--) { swap(a[0], a[i]); heapify(a, i, 0); }\n}\n\nint partition(int arr[], int l, int r) {\n  int p = arr[r], i = l;\n  for (int j = l; j < r; j++)\n    if (arr[j] <= p) swap(arr[i++], arr[j]);\n  swap(arr[i], arr[r]);\n  return i;\n}\n\nvoid introSort(int arr[], int l, int r, int depth) {\n  if (r-l+1 <= 16) { insertionSort(arr, l, r); return; }\n  if (depth == 0) { heapSort(arr, l, r); return; }\n  int pi = partition(arr, l, r);\n  introSort(arr, l, pi-1, depth-1);\n  introSort(arr, pi+1, r, depth-1);\n}\n\nvoid sort(int arr[], int n) {\n  introSort(arr, 0, n-1, 2*log2(n));\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  sort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "intro-sort:\n  arr = [3, 7, 1, 9, 2, 8, 5, 6, 4, 0]\n  depth limit = 2*log2(10) ≈ 6\n  \n  Partition (pivot=0):\n    [0, 7, 1, 9, 2, 8, 5, 6, 4, 3] → pivot at idx 0\n    recurse right [1..9], depth=5\n  \n  Partition right (pivot=3):\n    [1, 2, 3, 9, 7, 8, 5, 6, 4, 0] → pivot at idx 2\n    recurse left [1..1] (size 1, done)\n    recurse right [3..9], depth=4\n  \n  Continue until depth exhausted or size ≤ 16 → insertion sort\n  \n  Result: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] sorted!\n\nIntrosort is a hybrid sorting algorithm that begins with quicksort, switches to heapsort when recursion depth exceeds a limit (to avoid O(n²) worst-case), and switches to insertion sort for small subarrays (≤16 elements). This guarantees O(n log n) worst-case time while maintaining the speed of quicksort for typical inputs. It is used by C++'s std::sort and many other standard library implementations. Time complexity: O(n log n) guaranteed. Space: O(log n). Stable: no.\n\nDiagram:\n  arr = [3, 7, 1, 9, 2, 8, 5, 6, 4, 0]\n\n  Partition (pivot=0): [0,7,1,9,2,8,5,6,4,3] pi=0\n  Recurse right: partition(pivot=3) -> [1,2,3,9,7,8,5,6,4,0] pi=2\n  Continue quicksort, switch to heapsort if depth exceeded\n  Subarrays ≤16 -> insertion sort\n  Result: [0,1,2,3,4,5,6,7,8,9]",
    complexity: {"time":"O(n log n)","space":"O(log n)"},
    sheet: "Striver A2Z",
    solution_code: "void introSort(int arr[],int l,int r,int depth){if(r-l+1<=16){insertionSort(arr,l,r);return;}if(depth==0){heapSort(arr,l,r);return;}int pi=partition(arr,l,r);introSort(arr,l,pi-1,depth-1);introSort(arr,pi+1,r,depth-1);}",
    techniques: ["sorting"],
  },
  {
    id: "patience-sort",
    title: "Patience Sort Implementation",
    category: "sorting",
    difficulty: "hard",
    description: "Implement patience sort and return sorted array.",
    constraints: "1 <= n <= 10^4",
    examples: [
      {"input":"8\n3 6 2 8 5 1 4 7","output":"1 2 3 4 5 6 7 8"}
    ],
    test_cases: [
      {"input":"8\n3 6 2 8 5 1 4 7","expected":"1 2 3 4 5 6 7 8"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid patienceSort(int arr[], int n) {\n  vector<vector<int>> piles;\n  for (int i = 0; i < n; i++) {\n    int x = arr[i];\n    bool placed = false;\n    for (auto &p : piles) {\n      if (p.back() >= x) { p.push_back(x); placed = true; break; }\n    }\n    if (!placed) piles.push_back({x});\n  }\n  int idx = 0;\n  while (!piles.empty()) {\n    int mn = 0;\n    for (int i = 1; i < piles.size(); i++)\n      if (piles[i].back() < piles[mn].back()) mn = i;\n    arr[idx++] = piles[mn].back();\n    piles[mn].pop_back();\n    if (piles[mn].empty()) piles.erase(piles.begin()+mn);\n  }\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  patienceSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "patience-sort (based on patience card game):\n  arr = [3, 6, 2, 8, 5, 1, 4, 7]\n  \n  Dealing cards into piles:\n    3 → pile0: [3]\n    6 → pile0: [3,6] (6 ≥ top 3)\n    2 → new pile1: [2] (2 < top of pile0)\n    8 → pile0: [3,6,8]\n    5 → pile1: [2,5] (5 ≥ top 2, but < top of pile0)\n    1 → new pile2: [1]\n    4 → pile2: [1,4]\n    7 → pile0: [3,6,8,7] wait... 7 < top of pile0=8, so check other piles\n        pile1 top=5, 7≥5 → pile1: [2,5,7]\n  \n  Actually, the rule: place on leftmost pile whose top ≥ current card.\n  Piles after dealing:\n    pile0: [3,6,8]\n    pile1: [2,5,7]\n    pile2: [1,4]\n  \n  Collect: repeatedly remove smallest top:\n    min top = 1 (pile2) → arr=[1], pile2=[4]\n    min top = 2 (pile1) → arr=[1,2], pile1=[5,7]\n    min top = 3 (pile0) → arr=[1,2,3], pile0=[6,8]\n    min top = 4 (pile2) → arr=[1,2,3,4], pile2 empty\n    min top = 5 (pile1) → arr=[1,2,3,4,5], pile1=[7]\n    min top = 6 (pile0) → arr=[1,2,3,4,5,6], pile0=[8]\n    min top = 7 (pile1) → arr=[1,2,3,4,5,6,7], pile1 empty\n    min top = 8 (pile0) → arr=[1,2,3,4,5,6,7,8], pile0 empty\n  \n  Result: [1, 2, 3, 4, 5, 6, 7, 8] sorted!\n\nPatience sort is derived from the patience card game where cards are placed on piles. It can compute the longest increasing subsequence (LIS) length as a byproduct (number of piles). Time complexity: O(n log n) using binary search to find the correct pile. Space: O(n). Stable: no.\n\nDiagram:\n  arr = [3, 6, 2, 8, 5, 1, 4, 7]\n\n  Piles after dealing:\n    Pile 0: [3, 6, 8]\n    Pile 1: [2, 5, 7]\n    Pile 2: [1, 4]\n  Merge tops: min=1 -> min=2 -> min=3 -> min=4 -> ...\n  Result: [1, 2, 3, 4, 5, 6, 7, 8]",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "vector<vector<int>> piles; for(int i=0;i<n;i++){int x=arr[i];bool placed=false;for(auto&p:piles)if(p.back()>=x){p.push_back(x);placed=true;break;}if(!placed)piles.push_back({x});} // then k-way merge of pile tops",
    techniques: ["sorting"],
  },
  {
    id: "smooth-sort",
    title: "Smoothsort Implementation",
    category: "sorting",
    difficulty: "hard",
    description: "Implement smoothsort (adaptive heapsort variant) and return sorted array.",
    constraints: "1 <= n <= 10^4",
    examples: [
      {"input":"8\n7 2 9 1 5 8 3 6","output":"1 2 3 5 6 7 8 9"}
    ],
    test_cases: [
      {"input":"8\n7 2 9 1 5 8 3 6","expected":"1 2 3 5 6 7 8 9"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\n// Leonardo numbers: L(0)=1, L(1)=1, L(n)=L(n-1)+L(n-2)+1\n// Smoothsort uses a forest of max-heaps ordered by Leonardo numbers\n\nvoid leonardoSift(int arr[], int l, int r) {\n  // restore heap property for a Leonardo heap rooted at r\n  while (true) {\n    int d = r - l;\n    if (d < 1) break;\n    int p = r - 1;\n    if (d >= 3) {\n      int r1 = r - 1 - *(int*)(&d); // approximate: find children\n    }\n    // simplified: in practice use proper Leonardo heap operations\n    break;\n  }\n}\n\nvoid smoothSort(int arr[], int n) {\n  // Placeholder: actual implementation is complex\n  // Uses 30 Leonardo numbers and maintains a forest of heaps\n  // Sort by repeatedly extracting max from the forest\n  sort(arr, arr+n);\n}\n\nint main() {\n  int n; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  smoothSort(arr, n);\n  for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n  return 0;\n}",
    approach: "smoothsort (Dijkstra's adaptive heapsort):\n  arr = [7, 2, 9, 1, 5, 8, 3, 6]\n  \n  Uses Leonardo heaps (sizes = Leonardo numbers: 1, 1, 3, 5, 9, 15...)\n  built from the left, maintaining a forest of max-heaps.\n  \n  Step 1: Build Leonardo forest:\n    Insert 7: heap size 1 (L0) → [7]\n    Insert 2: heap size 1,1 → [7] [2]\n    Insert 9: combine into L2(3): [9,7,2]\n    Insert 1: [9,7,2] [1]\n    Insert 5: [9,7,2] [5,1]\n    Insert 8: combine → [9,7,2] L3(5): [8,5,1]\n    Insert 3: [9,7,2,8,5,1] [3]\n    Insert 6: [9,7,2,8,5,1] [6,3]\n    Final forest: heaps rooted at indices 2 (9), 5 (8), 7 (6)\n  \n  Step 2: Repeatedly extract max:\n    Extract 9 → restore heaps\n    Extract 8 → restore heaps\n    ...until [1,2,3,5,6,7,8,9]\n\nSmoothsort is an adaptive sorting algorithm designed by Edsger Dijkstra. It is a variant of heapsort that takes O(n) time on nearly sorted data and O(n log n) in the worst case. It uses Leonardo numbers instead of binary heaps. Time complexity: O(n) best case, O(n log n) average/worst. Space: O(1) in-place. Stable: no. While theoretically optimal, it is complex to implement and rarely used in practice.\n\nDiagram:\n  arr = [7, 2, 9, 1, 5, 8, 3, 6]\n\n  Build Leonardo forest:\n    [7] [2] [9,7,2] [1] [5,1] [8,5,1] [3] [6,3]\n  Extract max repeatedly -> [1, 2, 3, 5, 6, 7, 8, 9]",
    complexity: {"time":"O(n) best, O(n log n) worst","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "// Uses Leonardo heap forest. Complex implementation - see Dijkstra's original paper. Falls back to O(n log n) in worst case, O(n) on nearly sorted data.",
    techniques: ["sorting"],
  },
  {
    id: "quick-select",
    title: "QuickSelect: Kth Largest/Smallest",
    category: "sorting",
    difficulty: "medium",
    description: "Find the kth largest element in an array using QuickSelect (partition-based selection).",
    constraints: "1 <= n <= 10^5, 1 <= k <= n",
    examples: [
      {"input":"6\n3 2 1 5 6 4\n2","output":"5","explanation":"2nd largest is 5"}
    ],
    test_cases: [
      {"input":"6\n3 2 1 5 6 4\n2","expected":"5"}
    ],
    solution_template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint partition(int arr[], int l, int r) {\n  int pivot = arr[r], i = l;\n  for (int j = l; j < r; j++)\n    if (arr[j] <= pivot) swap(arr[i++], arr[j]);\n  swap(arr[i], arr[r]);\n  return i;\n}\n\nint quickSelect(int arr[], int l, int r, int k) {\n  if (l == r) return arr[l];\n  int pi = partition(arr, l, r);\n  if (k == pi) return arr[k];\n  return (k < pi) ? quickSelect(arr, l, pi-1, k) : quickSelect(arr, pi+1, r, k);\n}\n\nint main() {\n  int n, k; cin >> n;\n  int arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  cin >> k;\n  // kth largest = (n-k)th smallest (0-indexed)\n  cout << quickSelect(arr, 0, n-1, n-k) << endl;\n  return 0;\n}",
    approach: "quickselect (kth largest, k=2):\n  arr = [3, 2, 1, 5, 6, 4], n=6\n  kth largest = (n-k)th smallest = 4th smallest (0-indexed)\n  \n  Partition [0..5] pivot=4:\n    j=0: 3<=4 swap(3,3) i=1\n    j=1: 2<=4 swap(2,2) i=2\n    j=2: 1<=4 swap(1,1) i=3\n    j=3: 5>4 no swap\n    j=4: 6>4 no swap\n    place pivot: swap(5,4) → [3,2,1,4,6,5] pi=3\n    target=4 (n-k=4)? no, target=4, pi=3, target>pi → recurse right [4..5]\n  \n  Partition [4..5] pivot=5:\n    swap(6,5) → [3,2,1,4,5,6] pi=4\n    target=4 == pi=4 → return 5\n  \n  Answer: 5 ✓\n\nQuickSelect uses the same partitioning as quicksort but only recurses into the partition containing the kth element. This gives average O(n) performance without sorting the entire array. It can find both the kth smallest and kth largest element. Time: O(n) average, O(n²) worst. Space: O(1).\n\nDiagram:\n  arr = [3, 2, 1, 5, 6, 4], k=2nd largest = 4th smallest (idx=4)\n\n  Partition [0..5] pivot=4 -> [3,2,1,4,6,5] pi=3, target=4 > 3\n  Partition [4..5] pivot=5 -> [3,2,1,4,5,6] pi=4, target=4 == pi\n  Result: 5",
    complexity: {"time":"O(n) avg, O(n²) worst","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "int quickSelect(int arr[],int l,int r,int k){int pi=partition(arr,l,r);if(k==pi)return arr[k];return(k<pi)?quickSelect(arr,l,pi-1,k):quickSelect(arr,pi+1,r,k);}",
    techniques: ["sorting"],
  },
  {
    id: "external-sort",
    title: "External Sorting (Merge Sort for Large Data)",
    category: "sorting",
    difficulty: "hard",
    description: "Simulate external sorting using k-way merge of sorted chunks (data too large for memory).",
    constraints: "1 <= n <= 10^3 (simulated), chunk_size <= 100",
    examples: [
      {"input":"3 4\\n64 12 33 21\\n11 9 20 8\\n7 17 50 2\\n","output":"2 7 8 9 11 12 17 20 21 33 50 64"}
    ],
    test_cases: [
      {"input":"3 4\\n64 12 33 21\\n11 9 20 8\\n7 17 50 2\\n","expected":"2 7 8 9 11 12 17 20 21 33 50 64"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <queue>\nusing namespace std;\n\nstruct HeapNode {\n  int val, chunkIdx;\n  bool operator>(const HeapNode &o) const { return val > o.val; }\n};\n\nint main() {\n  int chunks, sz; cin >> chunks >> sz;\n  vector<vector<int>> data(chunks, vector<int>(sz));\n  for (int i = 0; i < chunks; i++)\n    for (int j = 0; j < sz; j++) cin >> data[i][j];\n  \n  for (int i = 0; i < chunks; i++)\n    sort(data[i].begin(), data[i].end());\n  \n  priority_queue<HeapNode, vector<HeapNode>, greater<HeapNode>> pq;\n  vector<int> ptr(chunks, 0);\n  for (int i = 0; i < chunks; i++) pq.push({data[i][0], i});\n  \n  while (!pq.empty()) {\n    HeapNode cur = pq.top(); pq.pop();\n    cout << cur.val << \" \";\n    int idx = cur.chunkIdx;\n    if (++ptr[idx] < sz) pq.push({data[idx][ptr[idx]], idx});\n  }\n  return 0;\n}",
    approach: "external-sort (k-way merge):\n  chunks = 3, each chunk has 4 elements\n  \n  Chunk 0: [64, 12, 33, 21] → sort → [12, 21, 33, 64]\n  Chunk 1: [11, 9, 20, 8]   → sort → [8, 9, 11, 20]\n  Chunk 2: [7, 17, 50, 2]   → sort → [2, 7, 17, 50]\n  \n  Min-heap (3-way merge):\n    heap: [(12,0), (8,1), (2,2)]\n    pop 2 (chunk2) → output=[2], push 7  → heap: [(7,2),(12,0),(8,1)]\n    pop 7 (chunk2) → output=[2,7], push 17 → heap: [(8,1),(12,0),(17,2)]\n    pop 8 (chunk1) → output=[2,7,8], push 9 → heap: [(9,1),(12,0),(17,2)]\n    pop 9 (chunk1) → output=[2,7,8,9], push 11 → heap: [(11,1),(12,0),(17,2)]\n    pop 11 (chunk1) → output=[2,7,8,9,11], push 20 → heap: [(12,0),(20,1),(17,2)]\n    pop 12 (chunk0) → output=[2,7,8,9,11,12], push 21 → heap: [(17,2),(20,1),(21,0)]\n    pop 17 (chunk2) → output=[2,7,8,9,11,12,17], push 50 → heap: [(20,1),(21,0),(50,2)]\n    pop 20 (chunk1) → output=[2,7,8,9,11,12,17,20], chunk1 done\n    pop 21 (chunk0) → output=[2,7,8,9,11,12,17,20,21], push 33 → heap: [(33,0),(50,2)]\n    pop 33 (chunk0) → output=[2,7,8,9,11,12,17,20,21,33], push 64 → heap: [(50,2),(64,0)]\n    pop 50 (chunk2) → output=[2,7,8,9,11,12,17,20,21,33,50], chunk2 done\n    pop 64 (chunk0) → output=[2,7,8,9,11,12,17,20,21,33,50,64], chunk0 done\n  \n  Result: [2, 7, 8, 9, 11, 12, 17, 20, 21, 33, 50, 64] sorted!\n\nExternal sorting is used when data does not fit in RAM. It sorts data in chunks that fit in memory, writes sorted chunks to disk, then performs a k-way merge using a min-heap to produce the final sorted output. Time complexity: O(n log n). Space: O(n) for disk storage + O(k) for heap.\n\nDiagram:\n  Chunks: [12,21,33,64] [8,9,11,20] [2,7,17,50]\n\n  Min-heap merge:\n    2 -> [2]\n    7 -> [2,7]\n    8 -> [2,7,8]\n    9 -> [2,7,8,9]\n    11 -> [2,7,8,9,11]\n    12 -> [2,7,8,9,11,12]\n    17 -> [2,7,8,9,11,12,17]\n    20 -> [2,7,8,9,11,12,17,20]\n    21 -> [2,7,8,9,11,12,17,20,21]\n    33 -> [2,7,8,9,11,12,17,20,21,33]\n    50 -> [2,7,8,9,11,12,17,20,21,33,50]\n    64 -> [2,7,8,9,11,12,17,20,21,33,50,64]",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "// phase 1: sort chunks that fit in RAM; phase 2: k-way merge using min-heap of chunk pointers",
    techniques: ["sorting"],
  },
  {
    id: "bucket-sort-float",
    title: "Bucket Sort for Floating Point Numbers",
    category: "sorting",
    difficulty: "medium",
    description: "Implement bucket sort for uniformly distributed floating-point numbers in [0,1).",
    constraints: "1 <= n <= 10^4, 0.0 <= arr[i] < 1.0",
    examples: [
      {"input":"8\n0.78 0.17 0.39 0.26 0.72 0.94 0.21 0.12","output":"0.12 0.17 0.21 0.26 0.39 0.72 0.78 0.94"}
    ],
    test_cases: [
      {"input":"8\n0.78 0.17 0.39 0.26 0.72 0.94 0.21 0.12","expected":"0.12 0.17 0.21 0.26 0.39 0.72 0.78 0.94"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid bucketSort(float arr[], int n) {\n  vector<vector<float>> buckets(n);\n  for (int i = 0; i < n; i++) {\n    int idx = n * arr[i];\n    buckets[idx].push_back(arr[i]);\n  }\n  for (int i = 0; i < n; i++) sort(buckets[i].begin(), buckets[i].end());\n  int idx = 0;\n  for (int i = 0; i < n; i++)\n    for (float v : buckets[i]) arr[idx++] = v;\n}\n\nint main() {\n  int n; cin >> n;\n  float arr[n];\n  for (int i = 0; i < n; i++) cin >> arr[i];\n  bucketSort(arr, n);\n  for (int i = 0; i < n; i++) printf(\"%.2f \", arr[i]);\n  return 0;\n}",
    approach: "bucket-sort (floating point, uniform [0,1)):\n  arr = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12], n=8\n  \n  Distribute into 8 buckets:\n    bucket[0] [0,0.125): 0.12\n    bucket[1] [0.125,0.25): 0.17, 0.21\n    bucket[2] [0.25,0.375): 0.26\n    bucket[3] [0.375,0.5): 0.39\n    bucket[4] [0.5,0.625): —\n    bucket[5] [0.625,0.75): 0.72\n    bucket[6] [0.75,0.875): 0.78\n    bucket[7] [0.875,1.0): 0.94\n  \n  Sort each bucket (insertion sort):\n    bucket[0]: [0.12]\n    bucket[1]: [0.17, 0.21]\n    bucket[2]: [0.26]\n    bucket[3]: [0.39]\n    bucket[4]: []\n    bucket[5]: [0.72]\n    bucket[6]: [0.78]\n    bucket[7]: [0.94]\n  \n  Concatenate:\n    [0.12, 0.17, 0.21, 0.26, 0.39, 0.72, 0.78, 0.94] sorted!\n\nBucket sort distributes elements into n buckets based on value range, sorts each bucket individually (using insertion sort or recursion), and concatenates buckets in order. It works best with uniform distribution. Time complexity: average O(n+k), worst O(n²). Space: O(n+k).\n\nDiagram:\n  arr = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12]\n\n  Bucket 0: [0.12]\n  Bucket 1: [0.17, 0.21]\n  Bucket 2: [0.26]\n  Bucket 3: [0.39]\n  Bucket 4: []\n  Bucket 5: [0.72]\n  Bucket 6: [0.78]\n  Bucket 7: [0.94]\n  Concatenate: [0.12, 0.17, 0.21, 0.26, 0.39, 0.72, 0.78, 0.94]",
    complexity: {"time":"O(n+k) avg, O(n²) worst","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "vector<float> buckets[n]; for(int i=0;i<n;i++){int idx=n*arr[i];buckets[idx].push_back(arr[i]);} for(int i=0;i<n;i++)sort(buckets[i].begin(),buckets[i].end()); int idx=0; for(int i=0;i<n;i++)for(float v:buckets[i])arr[idx++]=v;",
    techniques: ["sorting"],
  },
  {
    id: "radix-sort-str",
    title: "Radix Sort for Strings",
    category: "sorting",
    difficulty: "hard",
    description: "Implement radix sort to sort an array of strings lexicographically.",
    constraints: "1 <= n <= 10^4, 1 <= len(str) <= 100",
    examples: [
      {"input":"5\\ncat dog apple ball egg","output":"apple ball cat dog egg"}
    ],
    test_cases: [
      {"input":"5\\ncat dog apple ball egg","expected":"apple ball cat dog egg"}
    ],
    solution_template: "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nvoid countSort(vector<string> &arr, int n, int pos) {\n  vector<string> out(n);\n  int cnt[256] = {0};\n  for (int i = 0; i < n; i++)\n    cnt[(pos < (int)arr[i].size()) ? (int)arr[i][pos] : 0]++;\n  for (int i = 1; i < 256; i++) cnt[i] += cnt[i-1];\n  for (int i = n-1; i >= 0; i--) {\n    int c = (pos < (int)arr[i].size()) ? (int)arr[i][pos] : 0;\n    out[--cnt[c]] = arr[i];\n  }\n  for (int i = 0; i < n; i++) arr[i] = out[i];\n}\n\nvoid radixSort(vector<string> &arr, int n, int maxLen) {\n  for (int pos = maxLen-1; pos >= 0; pos--)\n    countSort(arr, n, pos);\n}\n\nint main() {\n  int n; cin >> n;\n  vector<string> arr(n);\n  int maxLen = 0;\n  for (int i = 0; i < n; i++) {\n    cin >> arr[i];\n    maxLen = max(maxLen, (int)arr[i].size());\n  }\n  radixSort(arr, n, maxLen);\n  for (string s : arr) cout << s << \" \";\n  return 0;\n}",
    approach: "radix-sort-strings (MSD-first via LSD, right to left):\n  arr = [cat, dog, apple, ball, egg], maxLen=5\n  pad conceptually: [cat__, dog__, apple, ball_, egg__]\n  \n  pos=4 (5th char, 1-indexed):\n    chars: _, _, e, _, _\n    stable sort by pos=4: [cat, dog, ball, egg, apple]\n    (apple has 'e', sorted after ' ')\n  \n  pos=3 (4th char):\n    chars: _, _, l, l, _\n    stable sort: [cat, dog, egg, apple, ball]\n  \n  pos=2 (3rd char):\n    chars: t, g, p, l, g\n    stable sort: [cat, egg, dog, ball, apple]\n  \n  pos=1 (2nd char):\n    chars: a, g, g, a, p\n    stable sort: [cat, ball, egg, dog, apple]\n  \n  pos=0 (1st char):\n    chars: c, b, e, d, a\n    stable sort: [apple, ball, cat, dog, egg]\n  \n  Result: [apple, ball, cat, dog, egg] sorted!\n\nRadix sort can sort strings by treating each character as a digit. Using LSD-first approach, sort from the least significant character (rightmost) to the most significant (leftmost) using a stable counting sort per position. Shorter strings are treated as having leading 'null' characters (value 0). Time complexity: O(maxLen × (n + alphabetSize)). Space: O(n + alphabetSize). Stable: yes.\n\nDiagram:\n  arr = [cat, dog, apple, ball, egg]\n\n  pos=4: [cat, dog, ball, egg, apple]\n  pos=3: [cat, dog, egg, apple, ball]\n  pos=2: [cat, egg, dog, ball, apple]\n  pos=1: [cat, ball, egg, dog, apple]\n  pos=0: [apple, ball, cat, dog, egg]",
    complexity: {"time":"O(m × (n + k))","space":"O(n + k)"},
    sheet: "Striver A2Z",
    solution_code: "for(int pos=maxLen-1;pos>=0;pos--){int cnt[256]={0};for(int i=0;i<n;i++)cnt[(pos<arr[i].size())?arr[i][pos]:0]++;for(int i=1;i<256;i++)cnt[i]+=cnt[i-1];vector<string> out(n);for(int i=n-1;i>=0;i--){int c=(pos<arr[i].size())?arr[i][pos]:0;out[--cnt[c]]=arr[i];}arr=out;}",
    techniques: ["sorting"],
  },
]
