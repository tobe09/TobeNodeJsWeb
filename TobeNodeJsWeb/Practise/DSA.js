'use strict'
function Queue() {
    this.arr = [];
    return 5;
}
Queue.prototype.enqueue = function (val) {
    var arr = this.arr;
    arr.push(val);
    for (var i = arr.length - 1; i > 0; i--) {
        arr[i] = arr[i - 1];
    }
    arr[0] = val;
}
Queue.prototype.dequeue = function () { 
    this.arr.pop();
}
Queue.prototype.print = function () {
    var arr = this.arr;
    arr.forEach(function (val) { 
        console.log(val);
    });
}

var queue = new Queue();
queue.enqueue("ee");
queue.enqueue(3);
queue.enqueue("ff");
queue.dequeue();
queue.enqueue("gg");
queue.print();
var cons = queue.constructor();
console.log(cons);
console.log(queue.constructor.prototype);
