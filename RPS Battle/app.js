let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// Generate computer choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * options.length);

  return options[randIdx];
};

// Draw game
const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

// Show winner
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;

    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
  compScore++;
  compScorePara.innerText = compScore;

  msg.innerText = `Oops! You lose! ${compChoice} beats your ${userChoice}.`;
  msg.style.backgroundColor = "red";
}
};

// Play game
const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  // Draw
  if (userChoice === compChoice) {
    drawGame();
    return;
  }

  // Check winner
  let userWin = true;

  if (userChoice === "rock") {
    userWin = compChoice === "paper" ? false : true;
  } else if (userChoice === "paper") {
    userWin = compChoice === "scissors" ? false : true;
  } else {
    userWin = compChoice === "rock" ? false : true;
  }

  showWinner(userWin, userChoice, compChoice);
};

// Add click event to each choice
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");

    playGame(userChoice);
  });
});