'use strict'

const arr = [3, 5, 7, 9, 4.7, 11, 23, 5.64, 6, 5, 7, 8, 1, 29.13, 70, 43, 23, 54];

function cloneArr() {
    return [...arr];
}


//BUBBLE SORT
console.log('BUBBLE SORT');
function bubbleSort(arr) {
    let max = arr.length,
        swaps = 0;

    for (let i = 0; i < max; i++) {
        let swapped = false;
        for (let j = 0; j < max - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swaps++;
                swapped = true;
            }
        }
        if (!swapped) break;
    }

    console.log(arr);
    console.log(swaps);
}

bubbleSort(cloneArr());


//INSERTION SORT
console.log('INSERTION SORT');
function insertionSort(arr) {
    let max = arr.length,
        pos,
        newVal,
        swaps = 0;

    for (let i = 0; i < max; i++) {
        newVal = arr[i];
        pos = i;

        while (pos > 0 && arr[pos - 1] > newVal) {  //shift to insert condition
            arr[pos] = arr[pos - 1];
            pos--;
            swaps++;
        }

        if (pos != i) arr[pos] = newVal;        //avoid repetition
    }

    console.log(arr);
    console.log(swaps);
}

insertionSort(cloneArr());


//SELECTION SORT
console.log('SELECTION SORT');
function selectionSort(arr) {
    let max = arr.length,
        swaps = 0,
        minIndex;

    for (let i = 0; i < max - 1; i++) {     //loop through all numbers
        minIndex = i;                       //set current index as min

        for (let j = i + 1; j < max; j++) {      //check for minimum element
            if (arr[j] < arr[minIndex]) minIndex = j;
        }

        if (minIndex != i) {            //to avoid repetition
            [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
            swaps++;
        }
    }

    console.log(arr);
    console.log(swaps);
}

selectionSort(cloneArr());


//SHELL SORT
console.log('SHELL SORT');
function shellSort(arr) {
    let max = arr.length, interval = 1, swaps = 0, inner, outer, newVal;

    while (interval <= max / 3) interval = interval * 3 + 1;     

    while (interval > 0) {
        for (outer = interval; outer < max; outer++) {
            newVal = arr[outer];
            inner = outer;
            while (inner >= interval && arr[inner - interval] >= newVal) {
                arr[inner] = arr[inner - interval];
                inner -= interval;
                swaps++;
            }
            arr[inner] = newVal;
        }
        interval = (interval - 1) / 3;
    }

    console.log(arr);
    console.log(swaps);
}

shellSort(cloneArr());


//QUICK SORT, Hoare and Lamuto partition scheme
console.log('QUICK SORT');
function quicksort(array, left = 0, right = array.length - 1) {
    var pivot = partitionLomuto(array, left, right); // you can play with both partition schemes
    //var pivot = partitionHoare(array, left, right); // you can play with both partition schemes

    if (left < pivot - 1) {
        quicksort(array, left, pivot - 1);
    }
    if (right > pivot) {
        quicksort(array, pivot, right);
    }

    return array;
}

// swap function helper
function swap(array, i, j) {
    //var temp = array[i];
    //array[i] = array[j];
    //array[j] = temp;
    [array[i], array[j]] = [array[j], array[i]];
}

// Lomuto partition scheme, it is less efficient than the Hoare partition scheme
function partitionLomuto(array, left, right) {
    //var pivot = right;
    var i = left;

    for (var j = left; j < right; j++) {
        if (array[j] <= array[right]) {
            swap(array, i, j);
            i = i + 1;
        }
    }
    swap(array, i, j);
    return i;
}
// Hoare partition scheme, it is more efficient than the Lomuto partition scheme because it does three times fewer swaps on average
function partitionHoare(array, left, right) {
    var pivot = Math.floor((left + right) / 2);

    while (left <= right) {
        while (array[left] < array[pivot]) {
            left++;
        }
        while (array[right] > array[pivot]) {
            right--;
        }
        if (left <= right) {
            swap(array, left, right);
            left++;
            right--;
        }
    }
    return left;
}

console.log(quicksort(cloneArr()));

//BASIC QUICK SORT
console.log('BASIC QUICK SORT');
let arrBasicQuick = cloneArr();
//let arrBasicQuick = arr.slice();      //same as above

function quickSortBasic(arr) {
    if (arr.length <= 1) return arr;

    const pivot = arr[0];
    let lesser = [];
    let greater = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            lesser.push(arr[i]);
        }
        else {
            greater.push(arr[i]);
        }
    }

    let smallValues = quickSortBasic(lesser);
    let bigValues = quickSortBasic(greater);

    return smallValues.concat(pivot, bigValues);
}

console.log(quickSortBasic(arrBasicQuick));


//MERGE SORT//
console.log('MERGE SORT');

// top-down implementation
function mergeSortTopDown(array) {
    if (array.length < 2) {
        return array;
    }

    var middle = Math.floor(array.length / 2);
    var left = array.slice(0, middle);
    var right = array.slice(middle);

    return mergeTopDown(mergeSortTopDown(left), mergeSortTopDown(right));
}
function mergeTopDown(left, right) {
    var array = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            array.push(left.shift());
        } else {
            array.push(right.shift());
        }
    }

    //return array.concat(left.slice()).concat(right.slice());
    return array.concat(left, right);
}

console.log(mergeSortTopDown(cloneArr())); // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

// bottom-up implementation
function mergeSortBottomUp(array) {
    var step = 1;
    while (step < array.length) {
        var left = 0;
        while (left + step < array.length) {
            mergeBottomUp(array, left, step);
            left += step * 2;
        }
        step *= 2;
    }
    return array;
}
function mergeBottomUp(array, left, step) {
    var right = left + step;
    var end = Math.min(left + step * 2 - 1, array.length - 1);
    var leftMoving = left;
    var rightMoving = right;
    var temp = [];

    for (var i = left; i <= end; i++) {
        if ((array[leftMoving] <= array[rightMoving] || rightMoving > end) &&
            leftMoving < right) {
            temp[i] = array[leftMoving];
            leftMoving++;
        } else {
            temp[i] = array[rightMoving];
            rightMoving++;
        }
    }

    for (var j = left; j <= end; j++) {
        array[j] = temp[j];
    }
}

console.log(mergeSortBottomUp(cloneArr())); // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
