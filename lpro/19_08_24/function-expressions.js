// function-expressions.js
// anonymous functions

//v1
const multi = function(a, b) {
  return a * b;
}

//v2
const somar = function(a, b) { return a + b }

// chamada das funções
somar(1, 2)

let n1 = 5;
let n2 = 10;
let res = multi(n1, n2);
console.log(res);