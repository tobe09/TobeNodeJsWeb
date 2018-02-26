'use strict'

let a = [6, '23', '45', '45m', 'r'].map(Number);
console.log(a);

let b = [1, 2, 3, 4, 5].reduce((prev, curr) => !prev ? curr : curr + prev);
console.log(b);

let c = Math.max(2, 3, 4, 5);
console.log(c);