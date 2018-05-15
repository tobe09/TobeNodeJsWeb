function* generate() {
    console.log(1);
    yield 1;
    yield 2;
    yield 'a';
    return 'b';
}

let gen = generate();

console.log(gen);
console.log(gen.next());        //1
console.log(gen.next());        //2
console.log(gen);
console.log(gen.next());        //a
console.log(gen);
console.log(gen.next());        //b
console.log(gen);
console.log(gen.next());
console.log(gen);

function* anotherGenerator(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
}

function* generator(i) {
    yield i;
    yield* anotherGenerator(i);
    yield i + 10;
}

var gen1 = generator(10);

console.log(gen1.next().value); // 10
console.log(gen1.next().value); // 11
console.log(gen1.next().value); // 12
console.log(gen1.next().value); // 13
console.log(gen1.next().value); // 20


function* logGenerator() {
    console.log(0);
    console.log(1, yield 'a');
    console.log(2, yield);
    console.log(3, yield);
}

var gen2 = logGenerator();

// the first call of next executes from the start of the function
// until the first yield statement
gen2.next();             // 0
let a = gen2.next('pretzel');    // 1 pretzel
console.log(a);         //{ value: undefined, done: false }
gen2.next('california'); // 2 california
gen2.next('mayonnaise'); // 3 mayonnaise

console.log()

function* foo() {
    var x = 1 + (yield "foo");
    console.log(x);
}

var f = foo();
let f1 = f.next();
console.log(f1);
console.log(f.next(2));