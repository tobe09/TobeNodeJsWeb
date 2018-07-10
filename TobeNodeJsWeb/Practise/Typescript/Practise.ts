class First {
    private age: number;
    name: string;
    job: number;

    constructor() {
        this.name = "Ade";
        this.job = 5;
        this.age = 18;
    }

    sayName() : boolean {
        console.log(this.name);
        return true;
    }
}

const firstValue: string = JSON.stringify(new First());
const first: First = JSON.parse(firstValue);
console.log(firstValue);
console.log(first);
//console.log(first.age);   //ts warning, still compiles though
console.log(new First().sayName());