// get the one cup that's in html
const cupHead = document.getElementById('cup-0');
const addCupButton = document.getElementById('add-cup');
const resetButton = document.getElementById('reset-button');
const winText = document.getElementById('wins');
const lossText = document.getElementById('losses');
const totalText = document.getElementById('total');

// set the number of cups to one
let totalCups = 1;
// track last win to mark what to undo instead of looping over everything bc '''performance'''
let lastLocation = 0;
// counts
let wins = 0;
let tries = 0;

// set up first cup listener
cupHead.addEventListener('click', () => {
    handleGuess('cup-0');
});

function addCup() {
    // clone the existing cup div
    const newCup = cupHead.cloneNode(true);
    // generate unique id for the cup
    newCup.setAttribute('id', `cup-${totalCups}`);
    // add the cup to the list
    document.getElementById('cup-box').appendChild(newCup);
    // add event listener to the new cup
    newCup.addEventListener('click', () => {
        handleGuess(newCup.getAttribute('id'));
    });
    totalCups++;
}

function handleGuess(guessId) {
    // get random number and the index of the guess
    const ballLocation = Math.floor(Math.random() * totalCups);
    // set the correct location so it can be unset by the reset button
    lastLocation = ballLocation;
    // then grab the appropriate container element for the correct guess from the DOM
    const correctLocation = document.getElementById(`cup-${ballLocation}`);

    // hide the correct cup and show the correct ball
    const cupImg = correctLocation.firstElementChild;
    const ballImg = correctLocation.lastElementChild;
    cupImg.classList.add('hidden');
    ballImg.classList.remove('hidden');

    // then if the user guess is correct, increment the correct guesses
    if (guessId === `cup-${ballLocation}`) {
        wins++;
    }
    // increment tries
    tries++;

    // update the DOM to show this change to the user (including the losses, not tracked directly in state)
    winText.textContent = wins;
    lossText.textContent = tries - wins;
    totalText.textContent = tries;
}

// reset button
resetButton.addEventListener('click', () => {
    const target = document.getElementById(`cup-${lastLocation}`);
    const targetCup = target.firstElementChild;
    const targetBall = target.lastElementChild;
    targetCup.classList.remove('hidden');
    targetBall.classList.add('hidden');
});

// add new cup
addCupButton.addEventListener('click', () => {
    addCup();
});
