"use strict";
//1
class BaseUser {
    constructor(id, name) {
        this.id = id,
            this.name = name;
    }
    ;
    getRole() { return ""; }
}
class Guest extends BaseUser {
    getRole() { return "Guest"; }
    getPermissions() { return "1. Просмотр контента"; }
}
class User extends BaseUser {
    getRole() { return "User"; }
    getPermissions() { return "1. Просмотр контента\n2. Добавление комментариев"; }
}
class Admin extends BaseUser {
    getRole() { return "Admin"; }
    getPermissions() { return "1. Просмотр контента\n2. Добавление комментариев\n3. Удаление комментариев\n4. Управление пользователями"; }
}
const guest = new Guest(1, "Аноним");
console.log(guest.getRole());
console.log(guest.getPermissions());
const admin = new Admin(2, "Мария");
console.log(admin.getRole());
console.log(admin.getPermissions());
const user = new User(3, "Паша");
console.log(user.getRole());
console.log(user.getPermissions());
class HTMLReport {
    constructor(title, content) {
        this.title = title,
            this.content = content;
    }
    generate() {
        return `"<h1>${this.title}</h1><p>${this.content}</p>"`;
    }
}
class JSONReport {
    constructor(title, content) {
        this.title = title,
            this.content = content;
    }
    generate() {
        return `{ title: "${this.title}", content: "${this.content}" }`;
    }
}
const report1 = new HTMLReport("Отчет 1", "Содержание отчета");
console.log(report1.generate());
const report2 = new JSONReport("Отчет 2", "Содержание отчета");
console.log(report2.generate());
//3
class MyCache {
    constructor() {
        this.storage = new Map();
    }
    add(key, value, ttl) {
        let newttl = Date.now() + ttl;
        this.storage.set(key, { value, ttl: newttl });
    }
    get(key) {
        let time = this.storage.get(key);
        if (!time)
            return null;
        if (Date.now() > time.ttl) {
            //this.storage.delete(key);
            return null;
        }
        else
            return time.value;
    }
    clearExpired() {
        let now = Date.now();
        for (let [key, item] of this.storage.entries()) {
            if (item.ttl <= now) {
                this.storage.delete(key);
            }
        }
    }
}
let cache = new MyCache();
cache.add("price", 100, 5000);
console.log(cache.get("price"));
setTimeout(() => console.log(cache.get("price")), 6000);
setTimeout(() => cache.clearExpired(), 7000);
//clearExpired();
//console.log(cache);
//4
function createInstance(cls, ...args) {
    return new cls(...args);
}
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
const p = createInstance(Product, "Телефон", 50000);
console.log(p);
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (LogLevel = {}));
;
function logEvent(event) {
    console.log(JSON.stringify(event, null, 2));
}
logEvent([new Date(), LogLevel.INFO, "Система запущена"]);
//6
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus || (HttpStatus = {}));
;
function success(data) {
    return [HttpStatus.OK, data];
}
function error(message, status) {
    return [status, null, message];
}
const res1 = success({ user: "Андрей" });
console.log(res1);
const res2 = error("Не найдено", HttpStatus.NOT_FOUND);
console.log(res2);
