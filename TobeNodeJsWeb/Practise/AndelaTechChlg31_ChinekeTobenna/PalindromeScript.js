const pld = (function () {
    //return an object denoting the result of a palindrome operation
    function getPalindromeResult(str) {
        const status = isPalindrome(str);
        return {
            value: str,
            status,
            result: status ? "Correct Palindrome" : "Not a Palindrome",
            cssClass: status ? "bg-success" : "bg-danger",
        };
    }

    //check if an object is a palindrome
    function isPalindrome(str) {
        let alphChars = getValidChars(str);

        let front = 0, back = alphChars.length - 1;
        while (front < back) {
            if (alphChars[front] !== alphChars[back]) {
                return false
            }
            front++;
            back--;
        }

        return true;
    }

    //filter a string and return only alphabets in lowercase
    function getValidChars(chars) {
        let validChars = "";

        chars = chars.toLowerCase();
        for (const char of chars) {
            if ((char >= 'a' && char <= 'z') || (char >= '0' && char <= '9')) {
                validChars += char;
            }
        }

        return validChars;
    }


    //generate html for history information
    function getHistoryHtml(pldHistory) {
        let htmlStr = "";

        for (const pldValue of pldHistory) {
            htmlStr += getHistoryRowHtml(pldValue);
        }

        return htmlStr;
    }

    //generate the html text for a single row of results
    function getHistoryRowHtml(pldValue) {
        let htmlStr = "<div class=\"row result-info\"> <span class=\"result-shape " + pldValue.cssClass + "\" ></span > <div class=\"col result-value\">";
        htmlStr += pldValue.value + "</div > <div class=\"col result-statement\">" + pldValue.result + "</div> </div >";

        return htmlStr;
    }


    //symbols to ensure that the fields to which they are assigned to, are not directly accessible
    const backingArray = Symbol("backingArray");
    const max = Symbol("max");

    //palindrome class to hold the history value
    const PalindromeHistory = class {
        constructor(histDirection = "desc", maxLength = 5) {
            this[backingArray] = [];
            this[max] = maxLength;
            this.historyDirection = histDirection.toLowerCase();
        }
        add(pldResult) {
            const length = this[backingArray].length;

            this[backingArray].unshift(pldResult);      //inserts the new value at the front of the array

            //to ensure that only the last five records are held
            if (length >= this[max]) {
                this[backingArray] = this[backingArray].slice(0, this[max]);
            }
        }
        get history() {
            //to return the values in the proper order
            if (this.historyDirection === "asc" || this.historyDirection === "ascending") {
                const arrClone = Object.create(this[backingArray]);
                return arrClone.reverse();
            }

            return this[backingArray];
        }
    }

    return {
        PalindromeHistory,
        getPalindromeResult,
        getHistoryHtml
    };
})();



let pldHistory = new pld.PalindromeHistory();         //an object to hold previous palindromes

//handle onclick event of the button to validate text as palindrome
var btnSubmit = document.getElementById("btnPalindrome");

btnSubmit.addEventListener("click", function () {
    const txtBoxPld = document.getElementById("txtPalindrome");
    const txtValue = txtBoxPld.value.trim();      //text entered by user

    let txtBoxMsg = document.getElementById("spanMsg");
    if (txtValue == null || txtValue.length === 0) {
        txtBoxMsg.classList.remove("success");
        txtBoxMsg.classList.remove("danger");
        txtBoxMsg.innerText = "No value entered";
        return
    }

    const pldResult = pld.getPalindromeResult(txtValue);    //get result of the text
    pldHistory.add(pldResult);      //add the result to the history
    const historyHtml = pld.getHistoryHtml(pldHistory.history);     //get the html value for the history

    if (pldResult.status) {
        txtBoxMsg.classList.remove("danger");
        txtBoxMsg.classList.add("success");
        txtBoxMsg.innerText = "Valid Palindrome";
    }
    else {
        txtBoxMsg.classList.remove("success");
        txtBoxMsg.classList.add("danger");
        txtBoxMsg.innerText = "Invalid Palindrome";
    }

    const historyDiv = document.getElementById("divHistory");
    historyDiv.innerHTML = historyHtml;         //write the html to the DOM

    const hiddenHistVals = document.getElementsByClassName("hidden");
    while (hiddenHistVals.length > 0) {
        hiddenHistVals[0].classList.remove("hidden");
    }
});

//handle onclick event to clear all entries
var btnClear = document.getElementById("btnClear");

btnClear.addEventListener("click", function () {
    pldHistory = new pld.PalindromeHistory();       //reset the palindrome history

    //hide history information
    document.getElementsByClassName("row result-heading input-heading")[0].classList.add("hidden");
    document.getElementsByClassName("row result-info result-header")[0].classList.add("hidden");

    document.getElementById("divHistory").innerHTML = "";       //clear history
    document.getElementById("txtPalindrome").value = "";        //cleat text box
    document.getElementById("spanMsg").innerText = "";          //clear messages
});