var array = [
    { id: 1, name: 'Vasya', group: 10 },
    { id: 2, name: 'Ivan', group: 11 },
    { id: 3, name: 'Masha', group: 12 },
    { id: 4, name: 'Petya', group: 10 },
    { id: 5, name: 'Kira', group: 11 },
];
var car = {}; //объект создан!
car.manufacturer = "manufacturer";
car.model = 'model';
//3
var car1 = {}; //объект создан!
car1.manufacturer = "manufacturer";
car1.model = 'model';
var car2 = {}; //объект создан!
car2.manufacturer = "manufacturer";
car2.model = 'model';
var arrayCars = [{
        cars: [car1, car2]
    }];
var mark11 = { subject: "Math", mark: 8, done: true };
var mark12 = { subject: "Phisics", mark: 6, done: true };
var mark13 = { subject: "History", mark: 3, done: false };
var mark14 = { subject: "ISO", mark: 5, done: true };
var student1 = { id: 1, name: "Max", group: 11, marks: [mark11, mark12, mark13, mark14] };
var mark21 = { subject: "Math", mark: 2, done: false };
var mark22 = { subject: "Phisics", mark: 3, done: false };
var mark23 = { subject: "History", mark: 10, done: true };
var mark24 = { subject: "ISO", mark: 7, done: true };
var student2 = { id: 2, name: "Ira", group: 2, marks: [mark21, mark22, mark23, mark24] };
var mark31 = { subject: "Math", mark: 5, done: true };
var mark32 = { subject: "Phisics", mark: 3, done: false };
var mark33 = { subject: "History", mark: 6, done: true };
var mark34 = { subject: "ISO", mark: 5, done: true };
var student3 = { id: 3, name: "Andrey", group: 7, marks: [mark31, mark32, mark33, mark34] };
var mark41 = { subject: "Math", mark: 9, done: true };
var mark42 = { subject: "Phisics", mark: 8, done: true };
var mark43 = { subject: "History", mark: 8, done: true };
var mark44 = { subject: "ISO", mark: 7, done: true };
var student4 = { id: 4, name: "Liza", group: 11, marks: [mark41, mark42, mark43, mark44] };
var group1 = {
    students: [student1, student2, student3, student4],
    mark: 8,
    group: 7,
    studentsFilter: function (group) {
        return group1.students.filter(function (student) { return student.group === group; });
    },
    marksFilter: function (mark) {
        return group1.students.filter(function (student) { return student.marks.some(function (m) { return m.mark === mark; }); });
    },
    deleteStudent: function (id) {
        group1.students = group1.students.filter(function (student) { return student.id !== id; });
    }
};
console.log(JSON.stringify(group1.marksFilter(8), null, 2));
console.log(JSON.stringify(group1.studentsFilter(11), null, 2));
group1.deleteStudent(4);
console.log(JSON.stringify(group1.students, null, 2));
