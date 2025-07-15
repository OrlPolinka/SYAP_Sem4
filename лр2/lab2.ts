//1
interface IArray {
    id: number,
    name: string,
    group: number
}

const array : IArray[] = [
    {id: 1, name: 'Vasya', group: 10}, 
    {id: 2, name: 'Ivan', group: 11},
    {id: 3, name: 'Masha', group: 12},
    {id: 4, name: 'Petya', group: 10},
    {id: 5, name: 'Kira', group: 11},
]

//2
type CarsType = {
    manufacturer?: string;
    model?: string;
}

let car: CarsType = {}; //объект создан!
car.manufacturer = "manufacturer";
car.model = 'model';

//3
const car1: CarsType = {}; //объект создан!
car1.manufacturer = "manufacturer";
car1.model = 'model';

const car2: CarsType = {}; //объект создан!
car2.manufacturer = "manufacturer";
car2.model = 'model';

type ArrayCarsType = {
    cars: CarsType[];
}

const arrayCars: Array<ArrayCarsType> = [{
    cars: [car1, car2]
}];

//4
type MarkFilterType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type DoneType = boolean;

type GroupFilterType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type MarkType = {
    subject: string;
    mark: MarkFilterType; // может принимать значения от 1 до 10
    done: DoneType;
}

type StudentType = {
    id: number;
    name: string;
    group: GroupFilterType; // может принимать значения от 1 до 12
    marks: Array<MarkType>;
}

type GroupType = {
    students: Array<StudentType>; // массив студентов типа StudentType
    studentsFilter: (group: number) => Array<StudentType>; // фильтр по группе
    marksFilter: (mark: number) => Array<StudentType>; // фильтр по  оценке
    deleteStudent: (id: number) => void; // удалить студента по id из исходного массива
    mark: MarkFilterType;
    group: GroupFilterType;
}

let mark11: MarkType = { subject: "Math", mark: 8, done: true };
let mark12: MarkType = { subject: "Phisics", mark: 6, done: true };
let mark13: MarkType = { subject: "History", mark: 3, done: false };
let mark14: MarkType = { subject: "ISO", mark: 5, done: true };

let student1: StudentType = { id: 1, name: "Max", group: 11, marks: [mark11, mark12, mark13, mark14] };

let mark21: MarkType = { subject: "Math", mark: 2, done: false };
let mark22: MarkType = { subject: "Phisics", mark: 3, done: false };
let mark23: MarkType = { subject: "History", mark: 10, done: true };
let mark24: MarkType = { subject: "ISO", mark: 7, done: true };

let student2: StudentType = { id: 2, name: "Ira", group: 2, marks: [mark21, mark22, mark23, mark24] };

let mark31: MarkType = { subject: "Math", mark: 5, done: true };
let mark32: MarkType = { subject: "Phisics", mark: 3, done: false };
let mark33: MarkType = { subject: "History", mark: 6, done: true };
let mark34: MarkType = { subject: "ISO", mark: 5, done: true };

let student3: StudentType = { id: 3, name: "Andrey", group: 7, marks: [mark31, mark32, mark33, mark34] };

let mark41: MarkType = { subject: "Math", mark: 9, done: true };
let mark42: MarkType = { subject: "Phisics", mark: 8, done: true };
let mark43: MarkType = { subject: "History", mark: 8, done: true };
let mark44: MarkType = { subject: "ISO", mark: 7, done: true };

let student4: StudentType = { id: 4, name: "Liza", group: 11, marks: [mark41, mark42, mark43, mark44] };

let group1: GroupType = {
    students: [student1, student2, student3, student4],
    mark: 8,
    group: 7,
    studentsFilter: (group: number) => {
        return group1.students.filter(student => student.group === group);
    },
    marksFilter: (mark: number) => {
        return group1.students.filter(student => student.marks.some(m => m.mark === mark));
    },
    deleteStudent: (id: number) => {
        group1.students = group1.students.filter(student => student.id !== id);
    }
};

console.log(JSON.stringify(group1.marksFilter(8), null, 2)); 
console.log(JSON.stringify(group1.studentsFilter(11), null, 2)); 
group1.deleteStudent(4); 
console.log(JSON.stringify(group1.students, null, 2)); 
