export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = [...array];
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  start,
  end,
  auxiliaryArray,
  animations,
) {
  if (start === end) return;
  const mid = Math.floor((start + end) / 2);
  mergeSortHelper(auxiliaryArray, start, mid, mainArray, animations);
  mergeSortHelper(auxiliaryArray, mid + 1, end, mainArray, animations);
  doMerge(mainArray, start, mid, end, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  start,
  mid,
  end,
  auxiliaryArray,
  animations,
) {
  let k = start;
  let i = start;
  let j = mid + 1;
  while (i <= mid && j <= end) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= mid) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= end) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, start, end, animations) {
  if (start < end) {
    // pi is the partitioning index, arr[pi] is now at the right place
    let pi = partition(array, start, end, animations);

    // Separately sort elements before partition and after partition
    quickSortHelper(array, start, pi - 1, animations);
    quickSortHelper(array, pi + 1, end, animations);
  }
}

function partition(arr, low, high, animations) {
  // Choosing the pivot
  let pivot = arr[high];

  // Index of smaller element and indicates the right position of pivot found so far
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      // Increment index of smaller element
      i++;
      animations.push([i, j, true]);
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
      animations.push([i, j, true]);
    }
    else {
      animations.push([j, j, false]);
      animations.push([j, j, false]);
    }
  }
  animations.push([i + 1, high, true]);
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to its correct position
  animations.push([i + 1, high, true]);
  return i + 1; // Return the partition index
}

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array, animations);
  return animations;
}

function heapSortHelper(arr, animations) {
  let N = arr.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(N / 2) - 1; i >= 0; i--)
    heapify(arr, N, i, animations);

  // One by one extract an element from heap
  for (let i = N - 1; i > 0; i--) {
    // Move current root to end
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    animations.push([i, 0, true]);
    animations.push([i, 0, true]);

    // call max heapify on the reduced heap
    heapify(arr, i, 0, animations);
  }
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, N, i, animations) {
  let largest = i; // Initialize largest as root
  let l = 2 * i + 1; // left = 2*i + 1
  let r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < N && arr[l] > arr[largest])
    largest = l;

  // If right child is larger than largest so far
  if (r < N && arr[r] > arr[largest])
    largest = r;

  // If largest is not root
  if (largest !== i) {
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    animations.push([i, largest, true]);
    animations.push([i, largest, true]);
    // Recursively heapify the affected sub-tree
    heapify(arr, N, largest, animations);
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, animations);
  return animations;
}

function bubbleSortHelper(arr, animations) {
  let i, j, temp;
  let swapped;
  let n = arr.length;
  for (i = 0; i < n - 1; i++) {
    swapped = false;
    for (j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        animations.push([j, j + 1, true]);
        animations.push([j, j + 1, true]);
        swapped = true;
      }
      else {
        animations.push([j, j + 1, false]);
        animations.push([j, j + 1, false]);
      }
    }

    // IF no two elements were 
    // swapped by inner loop, then break
    if (swapped === false)
      break;
  }
}

export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  insertionSortHelper(array, animations);
  return animations;
}

function insertionSortHelper(arr, animations) {
  let n = arr.length;
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;
    animations.push([i, j, false]);
    animations.push([i, j, false]);
    /* Move elements of arr[0..i-1], that are  
    greater than key, to one position ahead  
    of their current position */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      animations.push([j, j + 1, true]);
      animations.push([j, j + 1, true]);
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}

export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  selectionSortHelper(array, animations);
  return animations;
}

function selectionSortHelper(arr, animations) {
  let i, j, min_idx;
  let n = arr.length;
  // One by one move boundary of unsorted subarray 
  for (i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array 
    min_idx = i;
    for (j = i + 1; j < n; j++) {
      animations.push([j, min_idx, false]);
      animations.push([j, min_idx, false]);
      if (arr[j] < arr[min_idx])
        min_idx = j;
    }

    // Swap the found minimum element with the first element 
    let temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
    animations.push([min_idx, i, true]);
    animations.push([min_idx, i, true]);
  }
}