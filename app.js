// get the one cup that's in html
const cupHead = document.getElementById('cup-0');
const addCupButton = document.getElementById('add-cup');

// set the number of cups to one
let totalCups = 1;

function addCup() {
    // clone the existing cup div
    const newCup = cupHead.cloneNode(true);
    // generate unique id for the cup
    newCup.setAttribute('id', 'cup-' + totalCups);
    // add the cup to the list
    document.getElementById('cup-box').appendChild(newCup);
    // add event listener to the new cup
    newCup.addEventListener('click', () => {
        handleGuess(newCup.getAttribute('id'));
    });
    totalCups++;
}

function handleGuess(guess) {
    const ballLocation = Math.floor(Math.random() * totalCups);
    console.log('clicked on: ' + guess);
    console.log('right answer: ' + ballLocation);
}

// tmp testing button
addCupButton.addEventListener('click', () => {
    addCup();
});
