

const obj = {
    testProp: function () {
        let this1 = this;
        for (const a in this1) console.log(a);
        console.log('\n\n');
        (function () {
            let this2 = this;
            console.log(this1 === this2);
            for (const a in this2) console.log(a);
            console.log('\n\n');
        })();
        //same as above (IIFE- Immediately invoked Function Expression)
        //function namedInner() {
        //    let this3 = this;
        //    console.log(this1 === this3);
        //    for (const a in this3) console.log(a);
        //    console.log('\n\n');
        //};
        //namedInner();
        (() => {
            let this4 = this;
            console.log(this1 === this4);
            for (const a in this4) console.log(a);
            console.log('\n\n');
        })();
    },
    testFunc: function (innerLambda) {
        innerLambda();
    },
    testLambda: innerLambda => {
        innerLambda();
    }
}
//obj.testProp();
obj.testFunc(function () {
    let this1 = this;
    console.log(obj === this1);
    (function () {
        let this2 = this;
        console.log(this1 === this2);
        //for (const a in this2) console.log(a);
    })();
    (() => {
        let this4 = this;
        console.log(this1 === this4);
        //for (const a in this4) console.log(a);
        console.log('\n\n');
    })();
});
obj.testFunc(() => {
    let this1 = this;
    //for (const a in this1) console.log(a);
    console.log(obj === this1);
    (function () {
        let this2 = this;
        console.log(this1 === this2);
        //for (const a in this2) console.log(a);
    })();
    (() => {
        let this4 = this;
        console.log(this1 === this4);
        //for (const a in this4) console.log(a);
        console.log('\n\n');
    })();
})
obj.testLambda(function () {
    let this1 = this;
    //for (const a in this1) console.log(a);
    console.log(obj === this1);
    (function () {
        let this2 = this;
        console.log(this1 === this2);
       // for (const a in this2) console.log(a);
    })();
    (() => {
        let this4 = this;
        console.log(this1 === this4);
        //for (const a in this4) console.log(a);
        console.log('\n\n');
    })();
});
obj.testLambda(() => {
    let this1 = this;
    //for (const a in this1) console.log(a);
    console.log(obj === this1);
    (function () {
        let this2 = this;
        console.log(this1 === this2);
        //for (const a in this2) console.log(a);
    })();
    (() => {
        let this4 = this;
        console.log(this1 === this4);
       // for (const a in this4) console.log(a);
        console.log('\n\n');
    })();
})

class Tester {
    constructor() {
        this.prop1 = 5;
        this.prop2 = { a: 2 };
    }
    standAloneFunc() {
        let this1 = this;
       // for (const a in this1) console.log(a);
        (function () {
            let this2 = this;
            console.log(this1 === this2);
            //for (const a in this2) console.log(a);
            console.log(this2);
        })();
        (() => {
            let this4 = this;
            console.log(this1 === this4);
            //for (const a in this4) console.log(a);
            console.log('\n\n');
        })();
    };
}

new Tester().standAloneFunc();