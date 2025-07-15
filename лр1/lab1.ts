//1
function createNumberPhone(array: number[]): string {
    if(array.length != 10){
        return `Error!`;
    }

    let firstpart = array.slice(0,3).join("");
    let secondpart = array.slice(3,6).join("");
    let thirdpart = array.slice(6,10).join("");
    return `(${firstpart}) ${secondpart}-${thirdpart}`;
}
let phoneNumber: string = createNumberPhone([1,2,3,4,5,6,7,8,9,0]);
console.log(phoneNumber + '\n');

//2
class Challenge {
    static solution(number: number) {
       if (number < 0) return 0;
       let sum: number = 0;
       while(number > 0){
        number--;
        if(number % 3 == 0 || number % 5 == 0){
            sum += number;
        }
       } 
       return sum;
    }
    
}
console.log(Challenge.solution(10));
console.log(Challenge.solution(-10) + "\n");

//3
function getNewArray(array:number[], k: number):number[] {
    k = k % array.length;   //если k больше длины массива, чтобы не делать лишних поворотов
    let newArray = array.slice(-k).concat(array.slice(0, -k));
    return newArray;
}
console.log(getNewArray([1,2,3,4,5,6,7], 3) + '\n');

//4
function getResults(nums1:number[], nums2:number[]): number{
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    let finalNums = nums1.concat(nums2);
    finalNums.sort((a, b) => a - b);
    let result: number;
    result = Math.floor(finalNums.length / 2);
    if(finalNums.length % 2 == 0){
        result = (finalNums[result - 1] + finalNums[result]) / 2;
        return result;
    }
    return finalNums[result];
}
let n1: number[] = [6, 2, 5];
let n2: number[] = [1, 4, 3];
let n3: number[] = [5, 2];
console.log(getResults(n1, n2));
console.log(getResults(n3, n2));