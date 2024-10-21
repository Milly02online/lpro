function drawPlay() {
  const randomNumber = Math.floor(Math.random() * 3);

  //let result = "";

  if (randomNumber === 0) {
   // result = "Rock";
   return "Rock";
  }else if (randomNumber === 1) {
    //result = "Paper";
    return "Paper";
  }else {
    //result = "Scissors";
    return "Scissors";
  }

  //console.log(randomNumber);
  //console.log(result);

  //return result;
}

let pc = drawPlay();
console.log(pc);