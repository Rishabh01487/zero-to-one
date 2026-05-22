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
  }
]
