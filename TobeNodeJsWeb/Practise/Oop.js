function Rectangle(a, b) {
    this.length = a;
    this.width = b;
    this.perimeter = 2 * (a + b);
    this.area = a * b;
}

function processData(input) {
    var q = [3, 1, 2];
    var r = [4, 2, 3];
    var q2 = q.sort();
    var r2 = r.sort((a, b) => b - a);
    console.log(q2);
    console.log(r2);

    input.sort((a, b) => a - b);
    console.log('\r\n' + input);

    let median;
    let posX = (input.length + 1) / 2;

    if (posX == Math.round(posX))
        median = input[posX - 1];
    else
        median = (input[posX - 0.5] + input[posX - 1.5]) / 2;


    let lowerQuartile;
    let posL = Math.round(posX) / 2;

    if (posL == Math.round(posL))
        lowerQuartile = input[posL - 1];
    else
        lowerQuartile = (input[posL - 0.5] + input[posL - 1.5]) / 2;


    let upperQuartile;
    let posU = Math.floor(posX) + Math.round(posX) / 2;

    if (posU == Math.round(posU))
        upperQuartile = input[posU- 1];
    else
        upperQuartile = (input[posU - 0.5] + input[posU - 1.5]) / 2;

    console.log(lowerQuartile);
    console.log(median);
    console.log(upperQuartile);
}

var input = [3, 7, 8, 5, 12, 14, 21, 13, 18];
processData(input);

function greetings() {
    console.log("Hello world");
}

function testReturn(val) {
    if (val == 0) return 0;
    else if (val == 1) return "one";
    else return true;
}

greetings();
console.log(testReturn(2));

let num = [2, 3, 6, 6, 5];
console.log(getSecondLargest(num));
reverseString('abc');

function getSecondLargest(num) {
    let largest = num[0], secLargest = num[0];

    for (let i = 1; i < num.length; i++) {
        let value = num[i];

        if (value > largest) {
            secLargest = largest;
            largest = num[i];
            continue;
        }

        if ((value > secLargest) && (value < largest)) {
            secLargest = value;
        }
    }

    return secLargest;
}

function reverseString(s) {
    try {
        let arrS = s.split('');
        let arrRev = arrS.reverse();
        s = arrRev.join('');
    }
    catch (err) {
        console.log(err.message);
    }
    finally {
        console.log(s);
    }
}

function isPositive(a) {
    if (a > 0) return "YES";
    else if (a == 0) throw new Error("Zero Error");
    else throw new Error("Negative Error");
}