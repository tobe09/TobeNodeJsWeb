function setValue(e) {
    var btn = e.target || e.srcElement;
    var res = document.getElementById("res");
    res.innerText += document.getElementById(btn.id).innerHTML;
}

let buttonsId = ["btn0", "btn1", "btnSum", "btnSub", "btnMul", "btnDiv"];
for (const btn of buttonsId) {
    document.getElementById(btn).addEventListener('click', setValue);
}

document.getElementById("btnClr").addEventListener('click', function () {
    document.getElementById("res").innerText = "";
});

document.getElementById("btnEql").addEventListener('click', function () {
    const expr = document.getElementById("res").innerText;

    let values = "", value = "";
    for (const i in expr) {     
        debugger
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

    const ans = eval(values);

    document.getElementById("res").innerText = ans.toString(2).split('.')[0];
});