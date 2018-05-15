function callOrApply() {
    const arr = [0, 2, 4, 6, 8, 9];

    let a = Array.prototype.slice.call(arr, 2, 5);
    console.log(a);

    a = Array.prototype.slice.apply(arr, [2, 5]);
    console.log(a);

    console.log();
}
callOrApply();

function basicCurry() {
    var greetDeeplyCurried = function (greeting) {
        return function (separator) {
            return function (emphasis) {
                return function (name) {
                    console.log(greeting + separator + name + emphasis);
                };
            };
        };
    };

    var greetAwkwardly = greetDeeplyCurried("Hello")("...")("?");
    greetAwkwardly("Heidi"); //"Hello...Heidi?"
    greetAwkwardly("Eddie"); //"Hello...Eddie?"

    var sayHello = greetDeeplyCurried("Hello")(", ");
    sayHello(".")("Heidi"); //"Hello, Heidi."
    sayHello(".")("Eddie"); //"Hello, Eddie."

    console.log();
}
basicCurry();

function functionalCurry1() {
    var curryIt = function (uncurried) {
        var parameters = Array.prototype.slice.call(arguments, 1);
        return function () {
            return uncurried.apply(this, parameters.concat(
                Array.prototype.slice.call(arguments, 0)
            ));
        };
    };

    //much better
    curryIt = function (uncurried, ...args) {
        return function (...args2) {
            return uncurried(...args,...args2);
        };
    };

    var greeter = function (greeting, separator, emphasis, name) {
        console.log(greeting + separator + name + emphasis);
    };
    var greetHello = curryIt(greeter, "Hello", ", ", ".");
    greetHello("Heidi"); //"Hello, Heidi."
    greetHello("Eddie"); //"Hello, Eddie."

    var greetGoodbye = curryIt(greeter, "Goodbye", ", ");
    greetGoodbye(".", "Joe"); //"Goodbye, Joe."

    console.log();
}
functionalCurry1();