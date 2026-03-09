1️⃣ Difference between `var`, `let`, and `const`

var → Old way to declare variables. It can be re-declared and updated.
let → Can be updated, but cannot be re-declared in the same scope.
const → Cannot be updated or re-declared (used for constant values).

Example:

var a = 10;
let b = 20;
const c = 30;


2️⃣ What is the spread operator (`...`)?

The spread operator is used to **expand or copy elements of an array or object.

Example:

const arr1 = [1,2];
const arr2 = [...arr1, 3,4];

Result → `[1,2,3,4]`

3️⃣ Difference between `map()`, `filter()`, and `forEach()`

map() → Creates a new array by transforming each element.
filter() → Creates a new array with elements that match a condition.
forEach() → Just loops through the array, does not return a new array.


4️⃣ What is an arrow function?

An arrow function is a shorter way to write a function in JavaScript.

Example:

const add = (a, b) => a + b;


5️⃣ What are template literals?

Template literals allow you to insert variables inside a string using backticks `` ` ` ``.

Example:

const name = "Saki";
console.log(`Hello ${name}`);


Tailwind CSS Run - npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
