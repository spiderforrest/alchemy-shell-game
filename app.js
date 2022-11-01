// get the one cup that's in html
const cupHead = document.getElementById('cup-0');
const addCupButton = document.getElementById('add-cup');
const removeCupButton = document.getElementById('remove-cup');
const resetButton = document.getElementById('reset-button');
const tryAgainButton = document.getElementById('try-again-button');
const winText = document.getElementById('wins');
const lossText = document.getElementById('losses');
const totalText = document.getElementById('total');

// keep track of how many cups
let lastCupIndex = 0;
// track last win to mark what to undo instead of looping over everything bc '''performance'''
let lastLocation = 0;
// and to not desync that here's a bool that blocks clicking twice
let pickAllowed = true;
// counts
let wins = 0;
let tries = 0;

// set up first cup listener
cupHead.addEventListener('click', () => {
    if (pickAllowed === true) handleGuess('cup-0');
});

function addCup() {
    // clone the existing cup div
    const newCup = cupHead.cloneNode(true);
    // generate unique id for the cup
    newCup.setAttribute('id', `cup-${lastCupIndex}`);
    // add the cup to the list
    document.getElementById('cup-box').appendChild(newCup);
    // add event listener to the new cup
    newCup.addEventListener('click', () => {
        if (pickAllowed === true) handleGuess(newCup.getAttribute('id'));
    });
    lastCupIndex++;
}

function handleGuess(guessId) {
    // get random number and the index of the guess
    const ballLocation = Math.floor(Math.random() * lastCupIndex);
    // set the correct location so it can be unset by the reset button and block user from trying again
    lastLocation = ballLocation;
    pickAllowed = false;
    // then grab the appropriate container element for the correct guess from the DOM
    const correctLocation = document.getElementById(`cup-${ballLocation}`);

    // hide the correct cup and show the correct ball and try again button
    const cupImg = correctLocation.firstElementChild;
    const ballImg = correctLocation.lastElementChild;
    cupImg.classList.add('hidden');
    ballImg.classList.remove('hidden');
    tryAgainButton.classList.remove('hidden');

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

// reset to try again, preserve counts/status
function softReset() {
    const target = document.getElementById(`cup-${lastLocation}`);
    const targetCup = target.firstElementChild;
    const targetBall = target.lastElementChild;
    tryAgainButton.classList.add('hidden');
    targetCup.classList.remove('hidden');
    targetBall.classList.add('hidden');
    pickAllowed = true;
}

// hard reset
resetButton.addEventListener('click', () => {
    // delete the extra cups
    for (let i = lastCupIndex; i > 0; i--) {
        const target = document.getElementById(`cup-${i - 1}`);
        target.remove();
    }
    // reset vars / dom
    lastCupIndex = 0;
    lastLocation = 0;
    pickAllowed = true;
    wins = 0;
    tries = 0;
    winText.textContent = 0;
    lossText.textContent = 0;
    totalText.textContent = 0;
});

// try again button
tryAgainButton.addEventListener('click', () => {
    softReset();
});

// remove cup
removeCupButton.addEventListener('click', () => {
    softReset();
    if (lastCupIndex === 0) return;
    const target = document.getElementById(`cup-${lastCupIndex - 1}`);
    lastCupIndex--;
    target.remove();
});

// add new cup
addCupButton.addEventListener('click', () => {
    softReset();
    addCup();
});
