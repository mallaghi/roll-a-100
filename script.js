'use strict';

// Selecting elements
const btnGameInstructions = document.querySelector('.btn--instructions');
const btnCloseInstructions = document.querySelector('.btn--closeInstructions');

const instructions = document.querySelector('.instructions');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const closeInstructions = function () {
  document.querySelector('.instructions').classList.add('hidden');
};

btnGameInstructions.addEventListener('click', function () {
  instructions.classList.remove('hidden');
});

btnCloseInstructions.addEventListener('click', function () {
  closeInstructions();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !instructions.classList.contains('hidden')) {
    closeInstructions();
  }
});

//Starting conditons
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll:
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // Add current score to active player's score
  if (playing) {
    console.log((scores[activePlayer] += currentScore));
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if score >= 100 ? finishe the game :
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});
// New Game

//  an option but not that great for huge projects
// btnNew.addEventListener('click', function () {
//   location.reload();
// });

btnNew.addEventListener('click', init);
