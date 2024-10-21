// arrow functions 
// anonymous functions

// es5 (versao antiga)
var multi = function(x, y) {
  return x * y;
}

//es6 (versao atual)
const multi = (x, y) => {
  return x * y;
}

// é possível omitir as chaves e a palavra-chave return caso a função tenha apenas uma única instrução (linha).
const multi = (x, y) => x * y;