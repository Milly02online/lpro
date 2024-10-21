const randomNumber = Math.floor(Math.random() * 3);

let result =
  (randomNumber === 0 && "Rock") ||
  (randomNumber === 1 && "Paper") ||
  "Scissors";

console.log(result);