'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let playing = true;
const playerName = function () {
  const players = prompt('Enter the First Names of player seperated by space');
  const arr = players.split(' ');
  const player0 = document.getElementById('name--0');
  const player1 = document.getElementById('name--1');
  player0.textContent = arr[0];
  player1.textContent = arr[1];
};
playerName();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];

btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  playing = true;
  document
    .querySelector(`.player--${activePlayer === 0 ? 1 : 0}`)
    .classList.remove('player--winner');
  activePlayer = 0;
});

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generation of Random Dice Number
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //Display Dice
    diceEl.src = `dice-${diceNumber}.png`;
    diceEl.classList.remove('hidden');

    if (diceNumber !== 1) {
      currentScore += diceNumber;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    switchPlayer();
  }
});
