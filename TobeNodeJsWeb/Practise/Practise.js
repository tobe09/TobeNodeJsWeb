function one() {
    const count = 1000000;
    const max = 10000000000;

    (function (count) {
        let total = 0;
        return new Promise((resolve, reject) => {
            if (count > max) reject(new error("number is too large (async)."));

            const start = new Date().getTime();
            for (let i = 0; i < count; i++) {
                total += i;
            }
            const time = new Date().getTime() - start;

            resolve({ total, time });
        })
    })(count).then(val => {
        console.log("aynchronous value: " + val.total);
        console.log("time taken: " + val.time);
    }).catch(err => {
        console.log(err);
    })

    let total = 0;
    if (count > max) console.log(new error("number is too large (sync)."));

    const start = new Date().getTime();
    for (let i = 0; i < count; i++) {
        total += i;
    }
    const time = new Date().getTime() - start;
    console.log("synchornous value: " + total);
    console.log("time taken: " + time);
    console.log();
}

//one();

function two() {
    function linearConcat(value, repetition) {
        let result = '';
        for (let i = 0; i < repetition; i++) result += value;

        return result;
    }

    function linearCount(value, repetition) {
        return linearConcat(value, repetition).length;
    }

    function logSquareCount(value, repetition) {
        let result = '';
        let innerResult = value;

        const divisor = 2;
        let repetitionHold = repetition;
        let final = 0;

        while (repetitionHold > divisor) {
            let intermediate = 1;     //initial;
            while (repetitionHold / intermediate >= divisor) {
                innerResult += linearConcat(innerResult, divisor - 1);
                intermediate *= divisor;
            }

            final += intermediate;
            result += innerResult;
            innerResult = value;
            repetitionHold -= intermediate;
        }

        const remaining = repetition - final;
        result += linearConcat(value, remaining);

        return result.length;
    }

    const value = 'a';
    const repetition = 3 * Math.pow(10, 7);

    let startTime = new Date();
    let result = linearCount(value, repetition);
    let endTime = new Date();
    let timeDiff = endTime - startTime;
    console.log('After 1 cycle: ' + timeDiff + 'ms');
    console.log(result);

    startTime = new Date();
    const count = 10000;
    for (let i = 0; i < count; i++)
        result = logSquareCount(value, repetition);
    endTime = new Date();
    timeDiff = endTime - startTime;
    console.log('After ' + count + ' cycles: ' + timeDiff + 'ms');
    console.log(result);
    console.log();
}

//two();

function three() {
    function sortByNumType(arr) {
        let odd = [];
        let even = [];

        arr.forEach(val => {
            if (typeof val !== 'number') return;

            val = Math.floor(val);
            if (val % 2 == 0) {
                even.push(val);
            }
            else {
                odd.push(val);
            }
        })

        odd = quickSort(odd);
        even = quickSort(even);

        return odd.concat(even);
    }

    function quickSort(arr) {
        if (arr.length <= 1) return arr;

        let pivot = arr[0];
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

        lesser = quickSort(lesser);
        greater = quickSort(greater);

        return lesser.concat(pivot, greater);
    }

    const result = sortByNumType([5, 7, 4, 2, 6, 5, 9, 133, 26, 64, 57, 'eer', 5, '677', 5.67, 7.65]);
    console.log(result);
}

//three();

function jsonSerialize() {
    const obj = {
        name: 'John',
        age: 19,
        sayName() {
            return 'John';
        }
    }

    const aStr = JSON.stringify(obj, (key, val) => typeof val === 'function' ? val + '' : val);
    const newA = JSON.parse(aStr, (key, val) => (typeof val === 'string' && val.indexOf('()') !== -1) ? eval(`(function ${val})`) : val);
    console.log(obj);
    console.log(aStr);
    console.log(newA);
    console.log(newA.sayName());
}

//jsonSerialize();

function scoping() {
    const obj2 = { a: 1 }
    Object.freeze(obj2);

    function test2(aa) {
        console.log(aa);
        console.log(obj2);
        console.log(Object.isFrozen(aa));
        console.log(Object.isFrozen(obj2));
        aa = { b: 2 };
        console.log(aa);
        console.log(obj2);
        console.log(Object.isFrozen(aa));
        console.log(Object.isFrozen(obj2));

        return aa;
    }

    console.log(test2(obj2));
    console.log(obj2);
}

//scoping();
