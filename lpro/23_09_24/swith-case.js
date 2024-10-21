const drawPlay = () => {
  const randomNumber = Math.floor(Math.random() * 3);

  //let result = "";

  switch (randomNumber) {
    case 0:
      //result = "Rock";
      return "Rock";
      //break;
    case 1:
      //result = "Paper";
      return "Paper";
    case 2:
      //result = "Scissors";
      return "Scissors"
      //break;
  }

  //consople.log(randomNumber);
  //console.log(result);
}

let result = drawPlay();
console.log(result);