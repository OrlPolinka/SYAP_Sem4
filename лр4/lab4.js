//2
let myPromise = new Promise(function(resolve, reject) {
   setTimeout(() => resolve(Math.floor(Math.random() * 100)), 3000); 
});

myPromise.then(console.log);


//3
function generateNumber(delay) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(Math.floor(Math.random() * 100)), delay);
    });
}

let promise1 = generateNumber(2000);
let promise2 = generateNumber(3000);
let promise3 = generateNumber(4000);

Promise.all([promise1, promise2, promise3])
    .then(numbers => console.log("Случайные числа:", numbers))
    .catch(error => console.error("Ошибка:", error));


//4
let pr = new Promise((res,rej) => {
    rej('ku')
})

pr
    .then(() => console.log(1))     //игнорируется, так как вызывается rej(ошибка)
    .catch(() => console.log(2))    //выполняется, выводится 2
    .catch(() => console.log(3))    //игнорируется, так как ошибка уже обработана выше
    .then(() => console.log(4))     //выполняется, выводит 4
    .then(() => console.log(5))     //выполняется, выводит 5


//5
let prom = new Promise((res, rej) => {
    res(21)
});

prom
    .then((result) => {
        console.log(result); 
        return result * 2;
    })
    .then((result) => {
        console.log(result);
    })


//6
async function p() {
    let Prom = new Promise((res, rej) => {
        res(21)
    });
    let result = await Prom;
    console.log(result);
    return result * 2;
}

p().then(console.log);


//7
let promise = new Promise((res, rej) => {
    res('Resolved promise - 1')
})

promise
    .then((res) => {
        console.log("Resolved promise - 2") //Resolved promise - 2
        return "OK"                         
    })
    .then((res) => {
        console.log(res)    //OK
    })


//8
promise
    .then((res) => {
        console.log(res)    //Resolved promise - 1
        return "OK"
    })
    .then((res1) => {
        console.log(res1)   //OK
    })


//9

promise
    .then((res) => {
        console.log(res)    //Resolved promise - 1
        return res
    })
    .then((res1) => {
        console.log("Resolved promise - 2") //Resolved promise - 2
    })


//10

promise
    .then((res) => {
        console.log(res)    //Resolved promise - 1
        return res
    })
    .then((res1) => {
        console.log(res1)   //Resolved promise - 1
    })

//11
promise
    .then((res) => {
        console.log(res)    //Resolved promise - 1
    })
    .then((res1) => {
        console.log(res1)   //undefined
    })

