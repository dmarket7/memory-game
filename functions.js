var startBtn = document.getElementById('start-btn');
var resetBtn = document.getElementById('reset-btn');
var gameBoard = document.getElementById('card-deck');
var pairsLeft = document.getElementById('pairs-left');
var clickScore = document.getElementById('click-score');
var headline = document.getElementById('headline');

var firstCardSelected = '';
var itemsClicked = 0;
var setTimeoutClear = true;

var pairsRemaining = 12;
pairsLeft.innerHTML = 'Pairs Left:<br>' + pairsRemaining;

startBtn.addEventListener('click', startNewGame);

resetBtn.addEventListener('click', function(){
    startBtn.style.display = 'block';
    resetBtn.style.display = 'none';
    resetGame();
});

function startNewGame(){
    startBtn.style.display = 'none';
    resetBtn.style.display = 'block';

    itemsClicked = 0;
    pairsRemaining = 12;
    dealCards();
    gameBoard.style.display = 'grid';

    var cards = document.getElementsByClassName("card");
    addGameLogic(cards);
}

function dealCards(){
    var shuffledArr = shuffle(simpsons);
    for(var i = 0; i < shuffledArr.length / 2; i++) {
        var image = document.createElement('IMG');
        image.src=shuffledArr[i];
        image.style.display = 'none';
        if(gameBoard.childNodes[i*2 + 1].firstChild) {
            gameBoard.childNodes[i*2 + 1].removeChild(gameBoard.childNodes[i*2 + 1].firstChild);
        }
        gameBoard.childNodes[i*2 + 1].appendChild(image);
    }
    for(var i = 12; i < shuffledArr.length; i++) {
        var image = document.createElement('IMG');
        image.src=shuffledArr[i];
        image.style.display = 'none';
        if(gameBoard.childNodes[(i+2)*2-1].firstChild){
            gameBoard.childNodes[(i+2)*2-1].removeChild(gameBoard.childNodes[(i+2)*2-1].firstChild);
        }
        gameBoard.childNodes[(i+2)*2-1].appendChild(image);
    }
}

function addGameLogic(cards){
    for(var i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', checkClickFunction)
    }
}

function checkClickFunction(event) {
    // CHECK IF USER CLICKED ON COVERED CARD // IF NOT, IGNORE
    if(event.target.tagName !== 'IMG' && setTimeoutClear) {
        if(event.target.childNodes[0].tagName === 'IMG'){
            event.target.childNodes[0].style.display = 'block';
            itemsClicked++;
            clickScore.innerText = itemsClicked;
            // CHECK IF A PREVIOUS CARD HAS BEEN FLIPPED // IF NOT IGNORE
            if(firstCardSelected) {
                if(event.target.childNodes[0].src === firstCardSelected.src) {
                // IS SUCCESSFUL
                    setTimeoutClear = false;
                    pairsRemaining--;
                    pairsLeft.innerHTML = 'Pairs Left:<br>' + pairsRemaining;
                    headline.innerText = 'Woo Hoo!';
                    headline.style.color = '#38A700';
                    if(pairsRemaining === 0) {
                        headline.innerText = 'You Win!!!';
                        setTimeoutClear = true;
                    } else {
                        setTimeout(function(){
                            headline.innerText = 'Memory Game!';
                            headline.style.color = '#fff';
                            setTimeoutClear = true;
                            firstCardSelected = '';
                        }, 1500);
                    }
                } else {
                // IS NOT SUCCESSFUL
                    setTimeoutClear = false;
                    headline.innerText = 'D\'oh!!!';
                    headline.style.color = '#A93F55';
                    setTimeout(function(){
                        firstCardSelected.style.display = 'none';
                        firstCardSelected = '';
                        event.target.childNodes[0].style.display = 'none';
                        headline.innerText = 'Memory Game!';
                        headline.style.color = '#fff';
                        setTimeoutClear = true;
                    }, 1500);
                }
            } else {
                firstCardSelected = event.target.childNodes[0];
            }
        }
    }
}

function resetGame(){
    gameBoard.style.display = 'none';
    pairsLeft = 12;
    pairsLeft.innerHTML = 'Pairs Left:<br>' + pairsRemaining;
    itemsClicked = 0;
    clickScore.innerText = itemsClicked;
    headline.innerText = 'Memory Game!';
    headline.style.color = '#fff';
}


function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

// Links to Images Game Data

var simpsons = [
    'https://media1.giphy.com/media/ASd0Ukj0y3qMM/200.webp?cid=790b76115d1829f65447384373256b8b&rid=200.webp',
    'https://media1.giphy.com/media/ASd0Ukj0y3qMM/200.webp?cid=790b76115d1829f65447384373256b8b&rid=200.webp',
    'https://media3.giphy.com/media/jUwpNzg9IcyrK/200.webp?cid=790b76115d1829f65447384373256b8b&rid=200.webp',
    'https://media3.giphy.com/media/jUwpNzg9IcyrK/200.webp?cid=790b76115d1829f65447384373256b8b&rid=200.webp',
    'https://media0.giphy.com/media/RG3lm5VlrbDV7YNana/200.webp?cid=790b76115d1829f65447384373256b8b&rid=200.webp',
    'https://media0.giphy.com/media/RG3lm5VlrbDV7YNana/200.webp?cid=790b76115d1829f65447384373256b8b&rid=200.webp',
    'https://media2.giphy.com/media/bYpgM8bi7QV3i/200.webp?cid=790b76115d1829f65447384373256b8b&rid=200.webp',
    'https://media2.giphy.com/media/bYpgM8bi7QV3i/200.webp?cid=790b76115d1829f65447384373256b8b&rid=200.webp',
    'https://media1.giphy.com/media/lWZ77CqQbInm0/200.webp?cid=790b76115d182ae176523041458b6a31&rid=200.webp',
    'https://media1.giphy.com/media/lWZ77CqQbInm0/200.webp?cid=790b76115d182ae176523041458b6a31&rid=200.webp',
    'https://media2.giphy.com/media/VOKtv2wKlK8w0/giphy.webp?cid=790b76115d182ae176523041458b6a31&rid=giphy.webp',
    'https://media2.giphy.com/media/VOKtv2wKlK8w0/giphy.webp?cid=790b76115d182ae176523041458b6a31&rid=giphy.webp',
    'https://media0.giphy.com/media/4oMoIbIQrvCjm/200.webp?cid=790b76115d182ae176523041458b6a31&rid=200.webp',
    'https://media0.giphy.com/media/4oMoIbIQrvCjm/200.webp?cid=790b76115d182ae176523041458b6a31&rid=200.webp',
    'https://media0.giphy.com/media/3o6Mbbd48zhH43XSBq/200.webp?cid=790b76115d183a9e47706e6255edd65a&rid=200.webp',
    'https://media0.giphy.com/media/3o6Mbbd48zhH43XSBq/200.webp?cid=790b76115d183a9e47706e6255edd65a&rid=200.webp',
    'https://media1.giphy.com/media/3o8doT9BL7dgtolp7O/200w.webp?cid=790b76115d182b066c4b666d4116e276&rid=200w.webp',
    'https://media1.giphy.com/media/3o8doT9BL7dgtolp7O/200w.webp?cid=790b76115d182b066c4b666d4116e276&rid=200w.webp',
    'https://media1.giphy.com/media/p7UAjPDEglWes/giphy.webp?cid=790b76115d182b177555624c73e2423f&rid=giphy.webp',
    'https://media1.giphy.com/media/p7UAjPDEglWes/giphy.webp?cid=790b76115d182b177555624c73e2423f&rid=giphy.webp',
    'https://media2.giphy.com/media/8T16SKOf363KM/giphy.webp?cid=790b76115d182b177555624c73e2423f&rid=giphy.webp',
    'https://media2.giphy.com/media/8T16SKOf363KM/giphy.webp?cid=790b76115d182b177555624c73e2423f&rid=giphy.webp',
    'https://media1.giphy.com/media/erg72ZtkHfayA/200.webp?cid=790b76115d182b84337372426f233f67&rid=200.webp',
    'https://media1.giphy.com/media/erg72ZtkHfayA/200.webp?cid=790b76115d182b84337372426f233f67&rid=200.webp'
]
