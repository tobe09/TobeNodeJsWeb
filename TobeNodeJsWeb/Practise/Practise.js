function one() {
    const count = 10000000000000;
    const max = 10000000000000;

    (function (count) {
        let total = 0;
        return new Promise((resolve, reject) => {
            if (count > max) reject(new error("number is too large"));

            const start = new Date().getTime();
            for (let i = 0; i < count; i++) {
                total += i;
            }
            const time = new Date().getTime() - start;

            resolve({ total, time });
        })
    })(count).then(val => {
        console.log("aynchronous value: " + val.total);
        console.log("time taken: " + val.time);
    }).catch(err => {
        console.log(err);
    })

    let total = 0;
    const start = new Date().getTime();
    for (let i = 0; i < count; i++) {
        total += i;
    }
    const time = new Date().getTime() - start;
    console.log("synchornous value: " + total);
    console.log("time taken: " + time);
    console.log("");
}

one();