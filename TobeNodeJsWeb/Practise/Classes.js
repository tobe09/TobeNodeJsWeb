'use strict';

let Polygon = class Poly {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        Poly.prototype.second = function () { return 'second' }   //not part of properties of 'this' object
        this.third = function () { return 'third' }  
    }
    fourth() { return 'fourth' }   //not part of properties of 'this' object
};
Polygon.prototype.First = function () {
    return 'first';
}

//console.log('Polygon:', Polygon);
let p = new Polygon(1, 2);
console.log('p:', p);
console.log(p.second());

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

// The correct way to call a static method
console.log(Point.distance(p1, p2));

// Attempt to call a static method on an instance of the class
try {
    console.log(p1.distance(p1, p2));
}
catch (exception) {
    console.log(exception.name + ': ' + exception.message);
}

class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(this.name, 'speaks.');
    }
}
Animal.prototype.shout = function () { console.log("shouting"); }
new Array().so
class Dog extends Animal {
    constructor(name, age) {
        super(name); 
        this.age = age;
    }
    speak() {
        this.age = 5;
        super.speak();
        console.log(this.age, 'barks.');
    }
}

let spot = new Animal('Spot');
spot.speak();
spot = new Dog('Spot');
spot.speak();
spot.shout();

console.log(Object.getOwnPropertyNames(Animal.prototype));
console.log(JSON.stringify(Object.getOwnPropertyNames(Dog.prototype)))
let arr = ['constructor'];
let obj = {
    a: 'a',
    b: 'b',
    c: [{
        d: 'd',
        e: 'e'
    },
        {
            f: 'f',
            g: 7
        }]
};
console.log(JSON.stringify('constructor'));
console.log(arr);
console.log(JSON.stringify(arr));
console.log(obj);
console.log(JSON.stringify(obj));
obj = JSON.parse(JSON.stringify(obj));
console.log(obj);

//string literals: for multiline and string interpolation using backticks `
var a = 2;
var b = 3;
console.log(`The sum of a and b is ${a + b}. 
The product of a and b is ${a * b}.`);

//tagged  template literal
a = 5;
b = 10;

function foo(strings, ...values) {          //... signifies a list of values not unlike an array
    console.log("." + strings[0] + ".");
    console.log("." + strings[1] + ".");
    console.log("." + strings[2] + ".");
    console.log("." + strings[3] + ".");
    console.log("." + strings[4] + ".");
    console.log(values[0]);
    console.log(values[1]);
    console.log(values[2]);
    console.log(values[3]);
    console.log(values[4]);
}

foo`Sum ${a + b}
Product ${a * b}
Division ${b / a}wH a  =t \nDifference ${b-a}`;

function bar(strings, ...values) {
    let a = values[0];
    let b = values[1];

    return `Sum ${a + b}
Product ${a * b} 
Division ${b / a}`;
}

console.log(bar`Num1 ${a + 10}
Num2 ${b * 2} 
Num3 ${b / a}`);

const [x, y, z] = [1, 2, 3];
console.log(z);

//let pow=Math.pow(5,2);
//console.log(pow);

let xor=7^2;
console.log(xor);

//& 	AND 	Sets each bit to 1 if both bits are 1
//| 	OR 	Sets each bit to 1 if one of two bits is 1
//^ 	XOR 	Sets each bit to 1 if only one of two bits is 1
//~ 	NOT 	Inverts all the bits
//<< 	Zero fill left shift 	Shifts left by pushing zeros in from the right and let the leftmost bits fall off
//>> 	Signed right shift 	Shifts right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off
//>>> 	Zero fill right shift 	Shifts right by pushing zeros in from the left, and let the rightmost bits fall off


const arr2 = [1, 2, 3, 4, 5];

const sum = arr2.reduce((a, b) => a + b, 0);
const len = arr2.map(s => s * 2);
const greaterThan3 = arr2.filter(a => a > 3);

//console.log(sum);
//console.log(len);
//console.log(greaterThan3);

const makeArray = (values) => { return values };
//console.log('Array:', makeArray([1, 2, 3, 4]));

const makeArray2 = (...values) => { return values };
console.log('Array:', makeArray2([1, 2, 3, 4]));
console.log('Array:', makeArray2(1, 2, 3, 4));

console.log(eval("[1,2,3]"));
console.log(eval('({"a":1,"b":2})'));