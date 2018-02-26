'use strict'

function ClassA() {
    this.generalName = "Class"
    this.otherName = "A1"
    this.otherName2 = "A2"
    ClassA.prototype.try = function () { console.log("try"); }
    //return {}     //disrupts function constructiveness
}
ClassA.prototype.fullName = function () { return this.generalName; }        //'prototype' for class' constructor
ClassA.prototype.fullName2 = () => this.generalName + this.otherName2;      //undefined, arrow functions have no 'this'

function ClassB() {
    this.otherName = "B1";
}
ClassB.prototype = new ClassA();
ClassB.prototype.fullName = function () { return this.otherName2; }

var a = new ClassA();
var b = new ClassB();
var c = Object.create(new ClassA());    //or as defined below
c = {};
c.__proto__ = new ClassA();     //old syntax, __proto__ for created object's prototype

const restParamArrow = (a, ...b) => { for (const i in b) console.log(b[i]); };   
function restParam(a, ...b) {
    for (const i of arguments) console.log([i]);
}    
//restParam(1, 2, 3, 4, 5);

class GetSet {
    constructor(name = "") {
        this.name = name;
        this.age = { a: 1, 3: 'b' };
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (value.length < 4) {
            console.log('name is too short');
        }
        else {
            this._name = value
        }
    }
}
GetSet.prototype.size = () => 5;

const getSet = new GetSet("Jamey");
const getSet2 = new GetSet("Jane");
console.log(Object.getOwnPropertyNames(getSet2));
getSet2.size = 'anna';               //moves the size property from the constructor's prototype to the actual object as its own property
console.log(Object.getOwnPropertyNames(getSet2));
Object.setPrototypeOf(GetSet, null);
console.log(getSet.name);
console.log(getSet2.size);
console.log(Reflect.ownKeys(getSet));

//Private, priviledged and public (WeakMap/Symbols not implemtnted yet)
class PriPub {
    constructor(name) {
        this.name = name;
        function privateFunc() {
            privateField = 'priv changed';
            return privateField;
        }
        let privateField = 'priv';
        let privateInstanceObj = this;
        this.privilegedFunc = () => {
            console.log(name);     //'this is attached to a different scope (inner)
            console.log(privateInstanceObj.name);
            return privateFunc();
        }    //expose the private function.
    }
    publicFunc() {
        console.log(this.privilegedFunc());      //error
    }
    static publicFuncStatic() {
        //console.log(privateField);      //error
    }
}
PriPub.staticName = 'staticname';

var priPub = new PriPub('priPubName');
priPub.privilegedFunc();
priPub.publicFunc();
PriPub.publicFuncStatic();