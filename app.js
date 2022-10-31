// get the one cup that's in html
const cupHead = document.getElementById('cup-0');

// set the number of cups to one
let totalCups = 1;

function addCup() {
    // clone the existing cup div
    const newCup = cupHead.cloneNode(true);
    // generate unique id for the cup and increment var
    newCup.setAttribute('id', 'cup-' + totalCups);
    totalCups++;
    // add the cup to the list
    document.getElementById('cup-box').appendChild(newCup);
}

// tmp testing button
const tmpbutt = document.getElementById('tmpbutt');
tmpbutt.addEventListener('click', () => {
    addCup();
});
