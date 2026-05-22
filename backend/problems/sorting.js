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
    approach: "Repeatedly swap adjacent elements if out of order. Largest element bubbles to end each pass.",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "for(int i=0;i<n-1;i++){bool swapped=0;for(int j=0;j<n-1-i;j++)if(arr[j]>arr[j+1]){swap(arr[j],arr[j+1]);swapped=1;}if(!swapped)break;}",
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
    approach: "Find minimum in unsorted portion, swap with first element of unsorted portion.",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "for(int i=0;i<n-1;i++){int minIdx=i;for(int j=i+1;j<n;j++)if(arr[j]<arr[minIdx])minIdx=j;swap(arr[i],arr[minIdx]);}",
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
    approach: "Pick element and insert into correct position in sorted portion by shifting elements right.",
    complexity: {"time":"O(n²)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "for(int i=1;i<n;i++){int key=arr[i],j=i-1;while(j>=0&&arr[j]>key){arr[j+1]=arr[j];j--;}arr[j+1]=key;}",
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
    approach: "Divide array into halves, recursively sort each half, merge sorted halves.",
    complexity: {"time":"O(n log n)","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "void merge(int arr[],int l,int m,int r){int n1=m-l+1,n2=r-m;int L[n1],R[n2];for(int i=0;i<n1;i++)L[i]=arr[l+i];for(int j=0;j<n2;j++)R[j]=arr[m+1+j];int i=0,j=0,k=l;while(i<n1&&j<n2)arr[k++]=(L[i]<=R[j])?L[i++]:R[j++];while(i<n1)arr[k++]=L[i++];while(j<n2)arr[k++]=R[j++];}",
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
    approach: "Choose pivot (e.g., last element). Partition: smaller elements left, larger right. Recurse.",
    complexity: {"time":"O(n log n) avg, O(n²) worst","space":"O(log n)"},
    sheet: "Striver A2Z",
    solution_code: "int partition(int arr[],int lo,int hi){int p=arr[hi],i=lo;for(int j=lo;j<hi;j++)if(arr[j]<=p)swap(arr[i++],arr[j]);swap(arr[i],arr[hi]);return i;}",
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
    approach: "Count frequency of each value. Compute prefix sum. Place elements in correct positions.",
    complexity: {"time":"O(n+k)","space":"O(k)"},
    sheet: "Striver A2Z",
    solution_code: "int count[100001]={0},out[n]; for(int i=0;i<n;i++)count[arr[i]]++; for(int i=1;i<=100000;i++)count[i]+=count[i-1]; for(int i=n-1;i>=0;i--)out[--count[arr[i]]]=arr[i];",
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
    approach: "Build max-heap from array. Repeatedly extract max (swap root with last, heapify reduced heap).",
    complexity: {"time":"O(n log n)","space":"O(1)"},
    sheet: "Striver A2Z",
    solution_code: "void heapify(int arr[],int n,int i){int l=2*i+1,r=2*i+2,largest=i;if(l<n&&arr[l]>arr[largest])largest=l;if(r<n&&arr[r]>arr[largest])largest=r;if(largest!=i){swap(arr[i],arr[largest]);heapify(arr,n,largest);}} for(int i=n/2-1;i>=0;i--)heapify(arr,n,i); for(int i=n-1;i>0;i--){swap(arr[0],arr[i]);heapify(arr,i,0);}",
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
    approach: "Distribute elements into buckets, sort each bucket (insertion sort), concatenate.",
    complexity: {"time":"O(n+k) avg, O(n²) worst","space":"O(n)"},
    sheet: "Striver A2Z",
    solution_code: "int id=bucketCnt*arr[i]/maxVal; // assign to bucket, then sort each bucket with insertion sort",
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
    approach: "Sort digit by digit using counting sort as subroutine (LSD first).",
    complexity: {"time":"O(d×(n+k))","space":"O(n+k)"},
    sheet: "Striver A2Z",
    solution_code: "int getMax(int arr[],int n){int mx=arr[0];for(int i=1;i<n;i++)if(arr[i]>mx)mx=arr[i];return mx;} // then countSort for each digit (exp = 1, 10, 100...)",
  }
]
