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
  }
]
