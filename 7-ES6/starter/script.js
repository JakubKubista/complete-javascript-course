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


// // // // // // // // // // // // // // //
// Lecture: Blocks and IIEF

// // IIEF - ES5
// (function(){
//   const a = 1;
//   let b = 2;
//   console.log(a+b);
// })()

// // IIEF - ES6
// {
//   const a = 1;
//   let b = 2;
//   console.log(a+b);
// }



// // // // // // // // // // // // // // //
// Lecture: Strings

// let firstName = 'Jakub';
// let lastName = 'Kubista';
// const yearOfBirth = 1993;
// function calcAge(year) {
//   return 2019 - year;
// }

// // ES5
// console.log('This is ' + firstName + ' ' + lastName + ', born in ' + yearOfBirth + ' (' + calcAge(yearOfBirth) + ' years).');

// // ES6 - Template literarls
// console.log(`This is ${firstName} ${lastName}, born in ${yearOfBirth} (${calcAge(yearOfBirth)} years).`);

// const n = `${firstName} ${lastName}`;
// // If string literal starts/ends/includes some string
// console.log(n.startsWith('J')); // true
// console.log(n.endsWith('tA')); // false
// console.log(n.includes(' Kub')); // true

// console.log(`${firstName} `.repeat(5)); // repeat string


// // // // // // // // // // // // // // //
// Lecture: Arrow functions

// const years = [1990, 1965, 1982, 1937];

// // ES5
// var ages5 = years.map(function(el) {
//   return 2019 - el;
// });
// console.log(ages5);

// // ES6
// let ages6 = years.map(el => 2019 - el);
// console.log(ages6);

// ages6 = years.map((el, index) => `Age ${index + 1}: ${2019 - el}`);
// console.log(ages6);

// ages6 = years.map((el, index) => {
//   const now = new Date().getFullYear();
//   const age = now - el;
//   return `Age ${index + 1}: ${age}`;
// })
// console.log(ages6);


// // // // // // // // // // // // // // //
// Lecture: Arrow functions + this keyword

// ES5
// var box5 = {
//   color: 'green',
//   position: 1,
//   click: function () {
//     // In next case 'this' points on window (global) object, because event listener is a regular function call and not function of the object
//     var self = this; // add 'self' to use 'this' in nested block
//     document.querySelector('.green')
//       .addEventListener('click', function() {
//         var str = 'This is box number ' + self.position + ' and it is ' + self.color;
//         console.log(str);
//       })
//   }
// }
// box5.click();

// ES6
// const box6 = {
//   color: 'green',
//   position: 1,
//   // 'this'is SHARED with surroundings with global context and in inner function will be also 'this' keyword replaced by global context 'this'
//   // Don't use arrow func in this case.
//   click: function() {
//     // For arrow functions is 'this' keyword SHARED with surroundings (one level closest blocks).
//     document.querySelector('.green')
//       .addEventListener('click', () => {
//         let str = 'This is box number ' + this.position + ' and it is ' + this.color;
//         console.log(str);
//       })
//   }
// }
// box6.click();


// // Arrow function instead of bind 'this'

// function Person(name) {
//   this.name = name;
// }

// // ES5
// Person.prototype.myFriends5 = function(friends) {

//   var arr = friends.map(function(el){
//     return this.name + ' is friends with ' + el; // undefined this.name, because of anonymous function in map - not anymore prototype function
//   }.bind(this)); // create a copy of a variable 'this'

//   console.log(arr);
// }
// const friends = ['Bob', 'Jane', 'Mark'];
// new Person('John').myFriends5(friends);

// // ES6
// Person.prototype.myFriends6 = function(friends) {

//   let arr = friends.map((el) => `${this.name} is friends with ${el}`);

//   console.log(arr);
// }

// new Person('Mike').myFriends6(friends);


// // // // // // // // // // // // // // //
// Lecture: Destructuring

// // ES5
// var john = ['John', 26];
// var name5 = john[0];
// var age5 = john[1];
// console.log(name5, age5);

// // ES6 - array destructuring
// const [name, age] = ['John', 26];
// console.log(name, age);

// // ES6 - object destructuring
// const obj = { firstName: 'John', lastName: 'Smith'}
// const {firstName, lastName} = obj;
// console.log(firstName, lastName);

// // ES6 - object destructuring with param changes
// const {firstName: a, lastName: b} = obj;
// console.log(a, b);

// // ES6 - destructuring with functions
// function calcAgeRetirement(year) {
//   const age = new Date().getFullYear() - year;
//   return [age, 65 - age];
// }
// const [age2, retirement] = calcAgeRetirement(1993);
// console.log(age2, retirement);


// // // // // // // // // // // // // // //
// Lecture: Arrays

// const boxes = document.querySelectorAll('.box');
// console.log(boxes); // NodeList

// // ES5
// var boxesArr5 = Array.prototype.slice.call(boxes);
// console.log(boxesArr5); // Array of html nodes

// boxesArr5.forEach(function(element) {
//   element.style.backgroundColor = 'dodgerblue';
// }); // change color of all elements

// // ES6
// Array.from(boxes).forEach(element => {
//   element.style.backgroundColor = 'dodgerblue';
// }); // Array.from(*) == Array.prototype.slice.call(*)


// // Change the content of boxes

// // ES5
// for (var i = 0; i < boxesArr5.length; i++) {
//   if (boxesArr5[i].className === 'box blue') continue;
//   boxesArr5[i].textContent = 'I changed to blue!';
// }

// //ES6
// for (const element of boxesArr5) {
//   if (element.className.includes('blue')) continue;
//   element.textContent = 'I changed to blue!';
// }

// ES5
// var ages = [12, 17, 8, 21, 14, 11];
// // var full = ages.map(function(element) {
// //   return element >= 18;
// // });
// // console.log(full.indexOf(true)); // 3
// // console.log(ages[full.indexOf(true)]); // 21

// // ES6
// console.log(ages.findIndex(element => element >= 18)); // 3
// console.log(ages.find(element => element >= 18)); //21


// // // // // // // // // // // // // // //
// Lecture: Spread operator

// // Use case 1: apply (for a whole array)

// const addFourAges = (a, b, c, d) => a + b + c + d;
// let sum1 = addFourAges(18, 30, 12, 21);
// console.log(sum1);

// // ES5
// var ages = [18, 30, 12, 21];
// var sum2 = addFourAges.apply(null, ages);
// console.log(sum2);

// // ES6
// const sum3 = addFourAges(...ages);
// console.log(sum3);

// // Use case 2: merge arrays

// const family1 = ['John', 'Jane', 'Mark'];
// const family2 = ['Mary', 'Tim', 'Jack'];
// const families = [...family1, family1[0], ...family2];
// console.log(families);

// // Use case 3: DOM elements

// const h = document.querySelector('h1');
// const boxes = document.querySelectorAll('.box');
// const all = [h, ...boxes];

// Array.from(all).forEach(element => element.style.color = 'navy');


// // // // // // // // // // // // // // //
// Lecture: Rest parameters

// // ES5
// function isFullAge5() {
//   console.log(arguments); // special variable in all functions to grab parameters as an object
//   var argsArr = Array.prototype.slice.call(arguments);
//   argsArr.forEach(function(element) {
//     console.log(2019 - element >= 25)
//   });
// }

// isFullAge5(1990, 1995, 1993);

// // ES6
// const isFullAge6 = (...years) => {
//   years.forEach(element => console.log(2019 - element >= 25));
// }
// isFullAge6(1990, 1995, 1993);

// Spread operator !== Rest parameter (both are ...)
// Spread operator = used in function call -> to work with array elements
// Rest parameter = used in function declaration -> to exact an arbitrary number of parameters


// // Example with another parameter (limit)

// // ES5
// function isFullAge5(limit) {
//   var argsArr = Array.prototype.slice.call(arguments, 1);
//   argsArr.forEach(function(element) {
//     console.log(2019 - element >= limit)
//   });
// }

// isFullAge5(25, 1990, 1995, 1993);

// // ES6
// const isFullAge6 = (limit, ...years) => {
//   years.forEach(element => console.log(2019 - element >= limit));
// }
// isFullAge6(25, 1990, 1995, 1993);


// // // // // // // // // // // // // // //
// Lecture: Default parameters

// // ES5
// function SmithPerson(firstName, lastName, yearOfBirth, nationality) {
//   this.firstName = firstName;
//   this.lastName = lastName === undefined ? 'Smith' : lastName;
//   this.yearOfBirth = yearOfBirth;
//   this.nationality = nationality === undefined ? 'Norwegian' : nationality;
// }

// // ES6
// function SmithPerson (firstName, lastName = 'Smith', yearOfBirth, nationality = 'Czech') {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.yearOfBirth = yearOfBirth;
//   this.nationality = nationality;
// }

// var john = new SmithPerson('John', undefined, 1990);
// var emily = new SmithPerson('Emily', 'Diaz', 1994, 'Spanish');


// // // // // // // // // // // // // // //
// Lecture: Maps

// const question = new Map();
// question.set('question', 'What is the latest Major JavaScript version?');
// question.set(1, 'ES2015');
// question.set(2, 'ES6');
// question.set(3, 'ES7');
// question.set(4, 'ES2018');
// question.set(5, 'ES9');
// question.set('correct', 4);
// question.set(true, 'Correct answer');
// question.set(false, 'Wrong answer, try again');

// console.log(question.get('question'));
// console.log(question.size);
// if(question.has(4)) question.delete(4); // delete item by key
// question.clear(); // delete everything

// question.forEach((element, key) => {
//   console.log(key, element);
// });

// for (let [key, value] of question.entries()) {
//   if (typeof(key) === 'number') console.log(key, value);
// }
// // console.log(question);

// const answer = parseInt(prompt(question.get('question')));
// const isCorrect = question.get(answer === question.get('correct'));
// console.log(isCorrect);

// A new data structure is also a set
// let set = new Set([2, 1, 5, 2]);
// console.log(...set);

