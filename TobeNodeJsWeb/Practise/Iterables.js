function iterables() {
    function entries(obj) {
        let i = 0;
        const keys = Reflect.ownKeys(obj);  //gets assigned values, constants and then symbols

        return {
            [Symbol.iterator]() {
                const next = function () {
                    if (i === keys.length) return { done: true };

                    const k = keys[i++];
                    const v = obj[k];
                    return { value: [k, v] };
                }

                return { next };
            }
        };
    }

    const c = Symbol('c');
    const d = 4;
    const obj = { a: 1, b: 2, [c]: 33, [d]: 44 };
    for (const value of entries(obj)) {
        console.log(value);
    }
    console.log();

    const [, a, b, e] = entries(obj);
    console.log(a);
    console.log(b);
    console.log(e);
}
//iterables();

function iterClass() {
    class Iter {
        constructor(arr) {
            this.arr = arr;

            return {
                [Symbol.iterator]: () => {
                    let i = 0;
                    const next = () => {
                        if (i === this.arr.length) return { done: true };

                        const value = this.arr[i++];
                        return { value };
                    }

                    return { next };
                }
            }
        }
    }

    const arr = [2, 6, 2, 4, 6, 8];
    const iter = new Iter(arr);
    for (const val of iter) {
        console.log(val);
    }
    console.log();

    (function (...arr) {
        for (val of arr) {
            console.log(val);
        }
    })(...iter)
    console.log();

    const set = new Set([...iter]);  //or new Set(iter);
    set.forEach(val => console.log(val));
    console.log();

    const map = new Map([['m', 1], [2, 'n']]);
    map.forEach((val, key) => console.log(`key: ${key}, value: ${val}`));
}
//iterClass();

function yielder() {
    function* fibonacci(max = 100) {
        let prev = 0, curr = 1;
        while (prev < max) {
            yield prev;
            [prev, curr] = [curr, prev + curr];
        }
    }

    for (const val of fibonacci()) {
        console.log(val);
    }
    console.log();

    function* gen2(val) {
        try {
            val = yield 'foo' + val;
            val = yield 'bar' + val;
            yield 'baz' + val;
            const err = new Error('chai');
            //console.log(err.stack);
            throw err.message;
        }
        catch (e) {
            console.error('Caught: ', e);
        }
    }

    for (const val of gen2('Hello')) {
        console.log(val);
    }
    console.log();

    const iter = gen2('Hello');
    let val = iter.next('Hi');
    console.log(`Key: ${val.done}, Value: ${val.value}`);
    val = iter.next('Hi1');
    console.log(`Key: ${val.done}, Value: ${val.value}`);
    iter.throw('shoot');
    console.log(`Key: ${val.done}, Value: ${val.value}`);
    val = iter.next('Hi2');
    console.log(`Key: ${val.done}, Value: ${val.value}`);
    iter.next();
    console.log(`Key: ${val.done}, Value: ${val.value}`);
}
//yielder();

