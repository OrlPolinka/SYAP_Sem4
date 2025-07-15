//1
abstract class BaseUser {
    id: number
    name: string
    constructor(id: number, name: string){
        this.id = id,
        this.name = name
    };
    getRole(): string {return "";}
}

class Guest extends BaseUser {
    getRole(){return "Guest";}
    getPermissions(){return "1. Просмотр контента";}
}

class User extends BaseUser {
    getRole(){return "User";}
    getPermissions(){return "1. Просмотр контента\n2. Добавление комментариев";}
}

class Admin extends BaseUser {
    getRole(){return "Admin";}
    getPermissions(){return "1. Просмотр контента\n2. Добавление комментариев\n3. Удаление комментариев\n4. Управление пользователями";}
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

//2
interface IReport{
    title: string,
    content: string,
    generate(): string
}

class HTMLReport implements IReport{
    title: string
    content: string
    constructor(title: string, content: string){
        this.title = title,
        this.content = content
    }
    generate(): string{
        return `"<h1>${this.title}</h1><p>${this.content}</p>"`;
    }
}

class JSONReport implements IReport{
    title: string
    content: string
    constructor(title: string, content: string){
        this.title = title,
        this.content = content
    }
    generate(): string{
        return `{ title: "${this.title}", content: "${this.content}" }`;
    }
}

const report1 = new HTMLReport("Отчет 1", "Содержание отчета");
console.log(report1.generate());

const report2 = new JSONReport("Отчет 2", "Содержание отчета");
console.log(report2.generate());

//3
class MyCache<T>{
    storage: Map<string, {value: T, ttl : number}> = new Map();

    add(key: string, value: T, ttl: number) {
        let newttl = Date.now() + ttl;
        this.storage.set(key, {value, ttl: newttl});
    }
    get(key: string): T | null {
        let time = this.storage.get(key);
        if(!time)
            return null;
        if(Date.now() > time.ttl){
            //this.storage.delete(key);
            return null;
        }
        else return time.value;
    }
    clearExpired(){
        let now = Date.now();
        for(let [key, item] of this.storage.entries()){
            if(item.ttl <= now){
                this.storage.delete(key);
            }
        }
    }
}

let cache = new MyCache<number>();
cache.add("price", 100, 5000);
console.log(cache.get("price"));
setTimeout(() => console.log(cache.get("price")), 6000);
setTimeout(() => cache.clearExpired(), 7000);



//4
function createInstance<T>(cls: new (...args: any[]) => T, ...args: any[]): T {
    return new cls(...args);
}

class Product{
    constructor(public name: string, public price: number){}
}

const p = createInstance(Product, "Телефон", 50000);
console.log(p);

//5
type LogEntry = [Date, LogLevel, string];
enum LogLevel {
    INFO = "INFO", 
    WARNING = "WARNING", 
    ERROR = "ERROR"
};

function logEvent(event: LogEntry){
    console.log(JSON.stringify(event, null, 2));
}

logEvent([new Date(), LogLevel.INFO, "Система запущена"]);


//6
enum HttpStatus {
    NOT_FOUND = 404,
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 500
};
type ApiResponse<T> = [status: HttpStatus, data: T | null, error?: string];

function success<T>(data: T): ApiResponse<T> {
    return [HttpStatus.OK , data];
}
function error(message: string, status: HttpStatus): ApiResponse<null>{
    return [status, null, message];
}

const res1 = success({user: "Андрей"});
console.log(res1);
const res2 = error("Не найдено", HttpStatus.NOT_FOUND);
console.log(res2);