//1
function createNumberPhone(array) {
    if (array.length != 10) {
        return "Error!";
    }
    var firstpart = array.slice(0, 3).join("");
    var secondpart = array.slice(3, 6).join("");
    var thirdpart = array.slice(6, 10).join("");
    return "(".concat(firstpart, ") ").concat(secondpart, "-").concat(thirdpart);
}
var phoneNumber = createNumberPhone([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
console.log(phoneNumber + '\n');
//2
var Challenge = /** @class */ (function () {
    function Challenge() {
    }
    Challenge.solution = function (number) {
        if (number < 0)
            return 0;
        var sum = 0;
        while (number > 0) {
            number--;
            if (number % 3 == 0 || number % 5 == 0) {
                sum += number;
            }
        }
        return sum;
    };
    return Challenge;
}());
console.log(Challenge.solution(10));
console.log(Challenge.solution(-10) + "\n");
//3
function getNewArray(array, k) {
    k = k % array.length; //если k больше длины массива, чтобы не делать лишних поворотов
    var newArray = array.slice(-k).concat(array.slice(0, -k));
    return newArray;
}
console.log(getNewArray([1, 2, 3, 4, 5, 6, 7], 3) + '\n');
//4
function getResults(nums1, nums2) {
    nums1.sort(function (a, b) { return a - b; });
    nums2.sort(function (a, b) { return a - b; });
    var finalNums = nums1.concat(nums2);
    finalNums.sort(function (a, b) { return a - b; });
    var result;
    result = Math.floor(finalNums.length / 2);
    if (finalNums.length % 2 == 0) {
        result = (finalNums[result - 1] + finalNums[result]) / 2;
        return result;
    }
    return finalNums[result];
}
var n1 = [6, 2, 5];
var n2 = [1, 4, 3];
var n3 = [5, 2];
console.log(getResults(n1, n2));
console.log(getResults(n3, n2));
