//2 cenarios possiveis
let n = 7;
let result = n % 2 === 0 ? "é par" : "é impar";

console.log(result);

//3 cenarios possiveis
const randomNumber = Math.floor(Math.random() * 3);
result = 
  randomNumber === 0 ? "Rock" : randomNumber === 1 ? "Paper" : "Scissors";

console.log(result);