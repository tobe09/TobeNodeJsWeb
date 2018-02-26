const willBuyPhone = function (isHappy) {
    return new Promise((resolve, reject) => {
        if (isHappy === true) {
            const phone = { name: 'Samsung', color: 'black', cost: 100000 };
            resolve(phone);
        }
        else {
            const err = new Error('You are a broke nigga');
            reject(err);
        }
    });
}

const tellFriendPositive = function (phone) {
    return new Promise(function (resolve, reject) {
        const msg = `I have a new ${phone.name} phone, ${phone.color} color and it cost ${phone.cost}`;
        resolve(msg);
    })
}

const tellFriendPromise = function (phone) {            //same as above
    const msg = `I have a new ${phone.name} phone, ${phone.color} color and it cost ${phone.cost}`;
    return Promise.resolve(msg);
}

const tellFriendStatus = function (phone) {
    return new Promise(function (resolve, reject) {
        if (phone.color === 'black') {      //phone.constructor gets the constructor name
            const msg = `I have a new ${phone.name} phone, ${phone.color} color and it cost ${phone.cost} \nConstructor name: ${phone.constructor.name}`;
            resolve(msg);
        }
        else {
            reject(new Error('Guy, get a black phone'));
        }
    })
}

function askForPhone() {
    const hasCash = true;

    willBuyPhone(hasCash)
        .then(tellFriendStatus)
        .then(msg => {
            console.log(msg);
        })
        .catch(err => {
            console.log(err.message);
            console.log(err.stack);
    });
}

//askForPhone.Namesake = "john";                    //can attach properties to functions
//console.log(askForPhone.Namesake);
//askForPhone();

//promises are inherently chainable.
willBuyPhone(true).then(phone => {
    console.log(phone);
    if (!phone) return willBuyPhone(true);
}).then(val => {
    console.log(val);
    });

//Promise.reject().then(val => { console.log(val); }).catch(val => { console.log(val); });