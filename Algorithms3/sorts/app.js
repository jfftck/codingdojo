"use strict";

// Sorts using ES6 classes

class Sort {
    constructor() {
        this._tools = class {
            static partition(arr, start, end) {
                // This only places values that are lower than the pivot value
                // to the left and higher values to the right.
                // Using this function multiple times will result in sorted data.

                var swap = start;

                for (var runner = start + 1; runner < end; runner++) {
                    if (arr[start] > arr[runner]) {
                        swap++;
                        this.swap(arr, runner, swap);
                    }
                }

                this.swap(arr, start, swap);

                return swap;
            }

            static partition3(arr, start, end) {
                // Code here
            }

            static swap(arr, a, b) {
                // Preform a swap of two array values based on the two indexes.

                var temp = arr[a];
                arr[a] = arr[b];
                arr[b] = temp;
            }
        }
    }

    bubble(arr) {
        // This sort will solve the lowest values first.
        // It loops through the data at least once and will swap neighbors along
        // the way when the higher value is before it in the sequence.
        // If no swap is preformed the sort will end.

        var swapped = true;
        for (var i = 0, len = arr.length; i < len && swapped; i++) {
            swapped = false;

            for (var j = len - 1; j > i; j--) {
                if (arr[j - 1] > arr[j]) {
                    this._tools.swap(arr, j - 1, j);
                    swapped = true;
                }
            }
        }
    }

    heap(arr) {
        // Code here
    }

    insertion(arr) {
        // This sort will find the lowest value and then shift the other values
        // and insert it at the beginning.

        for (var i = 1, len = arr.length; i < len; i++) {
            var pulled = arr[i];

            for (var j = i; j && arr[j] < arr[j - 1]; j--) {
                this._tools.swap(arr, j, j - 1);
            }

            arr[j] = pulled;
        }
    }

    merge(arr) {
        // Code here
    }

    quick(arr) {
        // This sort will partition the data multiple times until it is sorted.
        // Once it has gone through the data it will give the previous partition
        // ending position and start patritioning the values to the left, then
        // to the right.

        var self = this;

        function inner(arr, start, end) {
            var pivot = self._tools.partition(arr, start, end);

            if (pivot - start > 1) {
                inner(arr, start, pivot);
            }

            if (end - (pivot + 1) > 1) { // move pivot up by one since index starts at 0
                inner(arr, pivot + 1, end);
            }
        }

        if (arr.length > 1) {
            inner(arr, 0, arr.length);
        }
    }

    quick3(arr) {
        // Code here
    }

    selection(arr) {
        // This is more than likely the worst sort to ever use.
        // It loops through the data to find the minimum value then swaps with
        // the first element of each loop.

        for (var i = 0, len = arr.length; i < len; i++) {
            var min = i;
            for (var j = i + 1; j < len; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            this._tools.swap(arr, i, min);
        }
    }

    shell(arr) {
        // Code here
    }
}

// ***** Build the Tests *****

function testSetup(testNum) {
    var testArr = [];

    switch (testNum) {
        case 1:
        default:
            testArr = [5, 42, 22, 10, 64, 32, 'b', 'a', 'Jeff', 'test'];
            break;
        case 2:
            for (var i = 0; i < 100; i++) {
                testArr.push(i);
            }
            for (var i = 99; i + 1; i--) {
                new Sort()._tools.swap(testArr, i, Math.floor(Math.random() * i));
            }
    }

    return testArr;
}

// ***** Run the Tests *****

for (let sort of ['bubble', 'insertion', 'quick', 'selection']) {
    console.log('**** ' + sort + ' *****');
    var testArr = testSetup();
    new Sort()[sort](testArr);
    console.log(testArr);

    var testArr = testSetup(2);
    console.log(testArr);
    new Sort()[sort](testArr);
    console.log(testArr);
}
