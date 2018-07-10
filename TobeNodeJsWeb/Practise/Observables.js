//unicastt vs multicast (done), synchronous vs asynchronous
function observablesTest() {
    let Observable = require('rxjs').Observable;

    let obs = Observable.create(observer => {
        const stopper = setInterval(() => {
            const i = Math.random() * 12000;
            observer.next({ greeting: 'hi', time: i });
            if (i <= 4000) observer.error('An error has occured');
            if (i <= 8000) observer.complete();
        }, 1000);
        return () => clearInterval(stopper);
    });

    for (i = 0; i < 3; i++) {
        const sub = obs.subscribe(
            {
                next(val) {
                    console.log(val);
                    if (val.time > 8000 && val.time < 12000) {
                        console.log('Observable will be unsubscribed');
                        console.log();
                        sub.unsubscribe();
                    }
                },
                error(err) {
                    console.log('Observable Error: ' + err);
                    console.log();
                },
                complete() {
                    console.log('Observable Completed ');
                    console.log();
                }
            }
        );

        const sub2 = obs.subscribe(
            val => {
                console.log(val);
                if (val.time > 8000 && val.time <= 12000) {
                    console.log('Observable will be unsubscribed');
                    console.log();
                    sub.unsubscribe();
                }
            },
            err => {
                console.log('Observable Error: ' + err);
                console.log();
            },
            () => {
                console.log('Observable Completed ');
                console.log();
            }
        );
    }
}

//observablesTest();      //different results (multicast)


function promiseTest() {
    let promise = new Promise((resolve, reject) => {
        setInterval(() => {
            const i = Math.random() * 12000;
            const obj = { greeting: 'hi', time: i };
            if (i <= 6000) resolve(obj);
            else reject(obj);
        }, 1000);
    });

    for (i = 0; i < 3; i++) {
        const prm = promise.then(val => {
            console.log(val);
            console.log('Promise Completed ');
            console.log();
        }).catch(err => {
            console.log(err);
            console.log('Promise Error: An error has occured')
            console.log();
            });

        const prm2 = promise.then(val => {
            console.log(val);
            console.log('Promise Completed ');
            console.log();
        }).catch(err => {
            console.log(err);
            console.log('Promise Error: An error has occured')
            console.log();
        });
    }

    setTimeout(() => { throw 'Promise Cancelled' }, 2000);
}

//promiseTest();      //same result (unicast)
