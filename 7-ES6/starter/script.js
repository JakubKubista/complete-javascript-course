// Lecture: let and const

// // 1. Assign variables
// // ES5
// var name5 = 'Jane Smith';
// var age5 = 25;
// name5 = 'Jane Miller';
// console.log(name5);

// // ES6
// const name6 = 'Jane Smith';
// let age6 = 23;
// name6 = 'Jane Miller';
// console.log(name6);

// // 2. Function scope (var) vs. Block scope (let)
// ES5
// function driversLinence5(passedTest) {
//   console.log(firstName);  // undefined

//   if (passedTest) {
//     var firstName = 'John';
//     var yearOfBirth = 1990;
//   }
//   console.log(firstName + ', born in ' + yearOfBirth + ' - allowed5');
// }
// driversLinence5(true);

// // ES6
// function driversLinence6(passedTest) {
//   console.log(firstName);  // throws error
//   let firstName;
//   const yearOfBirth = 1990;

//   if (passedTest) {
//     firstName = 'John';
//   }
//   console.log(firstName + ', born in ' + yearOfBirth + ' - allowed6');
// }
// driversLinence6(true);

// let i = 23; // try to change with var
// for (let i = 0; i < 5; i++) { // try to change with var
//   console.log(i);
// }
// console.log(i);

// // Best practices: Do not use var at all - avoid issues