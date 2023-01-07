//////////////////              SLICE

let arr = ["a", "b", "c", "d", "e"];
console.log(arr.slice(2)); // slice returns a new array consisting of the remaining elements.
//with only 1 parameter, it would start at that index, keeping it, and the rest forward.  'c' is index 2, and the rest are returned in a new array
console.log(arr.slice(2, 4));
//with 2 parameters, the first is included, the last is not. Index 2 = 'c' and index 4 = 'e'
console.log(arr.slice(-1)); // with only 1 negative argument, it starts at the end. If the negative integer is higher than 1, it will return as many elements as the number and the returned array will be the same order
console.log(arr.slice(-3));
console.log(arr.slice(0, -2)); // this will start by keeping the first index, and cut off what the negative integer is asking for, starting at the end



//////////////////              SPLICE

// console.log(arr.splice()) // splice without any arguments mutates and removes elements from an array
// console.log(arr.splice(3))// with one argument, the starting index REMOVES the element at its position and everything forward, but mutates the array
const newish = arr.splice(3) // look to previous tip
console.log(newish)