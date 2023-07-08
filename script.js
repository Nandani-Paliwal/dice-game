"use strict";

const btnRollDice = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnnewGame = document.querySelector(".btn-new");
const diceImage = document.querySelector(".dice");

const score0 = document.getElementById("score-0");
const score1 = document.getElementById("score-1");
const currentScore0 = document.getElementById("currentscore-0");
const currentScore1 = document.getElementById("currentscore-1");
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");

let playing = true;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

btnRollDice.addEventListener("click", diceRolled);
btnHold.addEventListener("click", holdScore);
btnnewGame.addEventListener("click", initialCondition);

// switch player
function switchPlayer() {
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
}

//hold button is clicked
function holdScore() {
  if (playing == true) {
    switchPlayer();

    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`currentscore-${activePlayer}`).textContent = 0;
    currentScore = 0;

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      playing = false;
      diceImage.classList.add("hidden");
    }

    activePlayer = activePlayer === 0 ? 1 : 0;
  }
}

// when dice is rolled
function diceRolled() {
  if (playing == true) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceImage.classList.remove("hidden");
    diceImage.src = `./assets/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore = document.getElementById(
        `currentscore-${activePlayer}`
      ).textContent = currentScore + dice;
    } 
    else {
      document.getElementById(`currentscore-${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      switchPlayer();
    }
  }
}

function initialCondition() {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  diceImage.classList.add("hidden");

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  player0.classList.add("player-active");
  player1.classList.remove("player-active");
  player0.classList.remove("player-winner");
  player1.classList.remove("player-winner");
}