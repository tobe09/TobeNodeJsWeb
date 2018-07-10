class First {
    constructor() {
        this.name = "Ade";
        this.job = 5;
        this.age = 18;
    }
    sayName() {
        console.log(this.name);
        return true;
    }
}
const firstValue = JSON.stringify(new First());
const first = JSON.parse(firstValue);
console.log(firstValue);
console.log(first);
//console.log(first.age);   //ts warning, still compiles though
console.log(new First().sayName());
//# sourceMappingURL=Practise.js.map