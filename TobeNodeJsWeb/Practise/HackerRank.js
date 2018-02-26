//code to generate maximum a & b < k where a & b <= n
const BitwiseOperators = {
    getMaxLessThanK: function (n, k) {
        let max = 0;

        for (let i = 1; i < n; i++) {
            for (let j = i + 1; j <= n; j++){
                let val = i & j;
                if (val < k && val > max) {
                    max = val;
                }
            }
        }

        return max;
    }
}

const JavaScriptDates = {
    getDayName: function (dateString) {
        let dayName;

        const date = new Date(dateString);
        const dateArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        dayName = dateArray[date.getDay()];

        return dayName;
    }
}

const RegularExpression = {
    regexVar: function () {
        const regExStr = "^a.*a$|^e.*e$|^i.*i$|^o.*o$|^u.*u$";      //starts and ends with the same vowel
        const re = new RegExp(regExStr);

        return re;
    },
    regexVar2: function () {
        const regExStr = "^(Mr|Mrs|Ms|Dr|Er)\\\\\\.([a-z]|[A-Z])+$";      //It must match a string that starts with 'Mr.', 'Mrs.', 'Ms.', 'Dr.', or 'Er.' and others
        const re = new RegExp(regExStr);

        //return /^(Mr|Mrs|Ms|Dr|Er)\\\.([a-z]|[A-Z])+$/;               // also correct
        return re;
    },
    regexVar3: function () {
        const re = new RegExp("\\d+", 'g');                           //returns all integers in string using global (g) flag

        //return /^(Mr|Mrs|Ms|Dr|Er)\.([a-z]|[A-Z])+$/;               // also correct
        return re;
    },
    validate: function (valStr) {
        const re = this.regexVar2();

        return re.test(valStr);
    },
    validate2: function () {
        console.log(/\\/.test('\\'));
        console.log(new RegExp("\\\\").test('\\'));
    },
    validate3: function (valStr) {
        const r = valStr.match(this.regexVar3());

        console.log(r);

        for (const e of r) 
            console.log(e);
    }
}
const DataStructures = {
    stacks: {
        equalStacks: function () {
            //hackerrank equal stacks (3 stacks)
            function equalStacks(h1, h2, h3) {
                h1 = [3, 2, 1, 1, 1];
                h2 = [4, 3, 2];
                h3 = [1, 1, 4, 1];

                //get array sum for comparison
                const sumH1 = newSumArray(h1);
                const sumH2 = newSumArray(h2);
                const sumH3 = newSumArray(h3);

                //get array with minimum length
                const minLength = Math.min(sumH1.length, sumH2.length, sumH3.length);

                //compare
                let val;
                if (minLength === sumH1.length) {
                    val = check(sumH1, sumH2, sumH3);
                }
                else if (minLength === sumH2.length) {
                    val = check(sumH2, sumH1, sumH3);
                }
                else {
                    val = check(sumH3, sumH1, sumH2);
                }

                const ans = val ? val : 0;
                console.log(ans);
            }

            function check(arrA, arrB, arrC) {
                //binary search
                const find = function (arr, val) {
                    let lower = 0, upper = arr.length - 1, mid = -1;

                    while (lower <= upper) {
                        mid = Math.ceil(lower + (upper - lower) / 2);

                        if (arr[mid] === val)        //data found
                            return true
                        else if (arr[mid] < val)    //value is upper half (note: array sorted in descending order)
                            upper = mid - 1;
                        else                       //data in lower half
                            lower = mid + 1;
                    }
                };

                //search for value in other arrays
                for (let i = 0; i < arrA.length; i++) {
                    let val = arrA[i];

                    const checkB = find(arrB, val);
                    const checkC = find(arrC, val);

                    if (checkB && checkC) return val;
                }
            }

            function newSumArray(arr) {
                let newArr = [];

                let prevSum = 0;
                for (let i = arr.length - 1; i >= 0; i--) {
                    prevSum += arr[i];
                    newArr.push(prevSum);
                }

                return newArr.reverse();
            }

            equalStacks();
        }
    }
}

const Others = {
    ofIn: function () {
        aa = {
            ac: 'a',
            bc: 'b'
        }
        for (let e in aa)           //objects do not support 'of' keyword
            console.log(aa[e]);

        bb = ['a', 'b'];
        for (let e in bb)           //similar for arrays
            console.log(bb[e]);
        for (let e of bb)           //arrays also support 'of' keyword (using Symbol.iterator)
            console.log(e);
    },
    parsing: function (val, base) {
        console.log(parseInt(val, base));
        console.log((parseInt(1001, 2) + parseInt(1101, 2)).toString(2));           //calculation based on number base
    },
    binCalc: function () {
        const expr = "111111111111*1001001";

        let values = "", value = "";
        for (const i in expr) {     //try foreach
            if (expr[i] == '0' || expr[i] == '1') {
                value += expr[i];
            }
            else {
                const valInt = parseInt(value, 2);
                values += valInt + expr[i];
                value = "";
            }
        }
        values += parseInt(value, 2);

        let ans = eval(values);
        ans = ans.toString(2);
        "".split('.')

        console.log(ans);
    },
    OrAssignment: function () {
        let a = 1 || 2;
        console.log(a);

        let b = 'e' || 2;
        console.log(b);

        let c = 2 || 'e';
        console.log(c);

        let d = 'e' || 'd';
        console.log(d);

        let e = 'd' || 'e';
        console.log(e);

        let f = null || 'e';
        console.log(f);
    },
    TestCalc: function () {
        const a = '111111111111';
        const b = '1001001';
        console.log(parseInt(a, 1));
        console.log(parseInt(a, 2));
        console.log(parseInt(b, 2));
        const c = eval(parseInt(a, 2) + "*" + parseInt(b, 2));
        console.log(c);
        console.log(c.toString(2));
    }
}

const HackerRank = {
    Run: function () {
        //console.log(BitwiseOperators.getMaxLessThanK(10, 5));
        //console.log(JavaScriptDates.getDayName("2016, 04, 22")); //or 10 / 11 / 2009
        //console.log(RegularExpression.validate('Mrs\\.f'));
        //RegularExpression.validate2();
        //RegularExpression.validate3("M2654,566m67n 78n898h7mn5,4");
        //Others.parsing('13', 4);
        //Others.binCalc();
        //Others.OrAssignment();
        //Others.TestCalc();
        DataStructures.stacks.equalStacks();
    }
}

HackerRank.Run();