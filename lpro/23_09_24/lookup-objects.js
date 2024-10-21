const randomNumber = Math.floor(Math.random() * 3);

const lookupObjects = {
  0: "Rock",
  1: "Paper",
  2: "Scissors",
};

const result = lookupObjects[randomNumber];

console.log(randomNumber);
console.log(result);