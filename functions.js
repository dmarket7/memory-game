var startBtn = document.getElementById('start-btn');
var resetBtn = document.getElementById('reset-btn');
var gameBoard = document.getElementById('card-deck');
var bestGame = document.getElementById('best-score');
var pairsLeft = document.getElementById('pairs-left');
var clickScore = document.getElementById('click-score');
var headline = document.getElementById('headline');

var firstCardSelected = '';
var itemsClicked = 0;
var setTimeoutClear = true;

if(localStorage.getItem('lowScore')) {
    bestGame.innerHTML = 'Low Score: <br>' + localStorage.getItem('lowScore');
} else {
    bestGame.innerHTML = 'Low Score: <br>--';
}

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

    setTimeoutClear = true;
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
        var cardCover = document.createElement('DIV');
        cardCover.classList.add('cover');
        cardCover.style.visibility = 'visible';
        image.src=shuffledArr[i];
        while(gameBoard.childNodes[i*2 + 1].firstChild) {
            gameBoard.childNodes[i*2 + 1].removeChild(gameBoard.childNodes[i*2 + 1].firstChild);
        }
        gameBoard.childNodes[i*2 + 1].appendChild(image);
        gameBoard.childNodes[i*2 + 1].appendChild(cardCover);
    }
    for(var i = 12; i < shuffledArr.length; i++) {
        var image = document.createElement('IMG');
        var cardCover = document.createElement('DIV');
        cardCover.classList.add('cover');
        cardCover.style.visibility = 'visible';
        image.src=shuffledArr[i];
        while(gameBoard.childNodes[(i+2)*2-1].firstChild){
            gameBoard.childNodes[(i+2)*2-1].removeChild(gameBoard.childNodes[(i+2)*2-1].firstChild);
        }
        gameBoard.childNodes[(i+2)*2-1].appendChild(image);
        gameBoard.childNodes[(i+2)*2-1].appendChild(cardCover);
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
        if(event.target.style.visibility === 'visible'){
            event.target.style.visibility = 'hidden';
            itemsClicked++;
            clickScore.innerText = itemsClicked;
            // CHECK IF A PREVIOUS CARD HAS BEEN FLIPPED // IF NOT IGNORE
            if(firstCardSelected) {
                if(event.target.previousSibling.src === firstCardSelected.src) {
                // IS SUCCESSFUL
                    setTimeoutClear = false;
                    pairsRemaining--;
                    pairsLeft.innerHTML = 'Pairs Left:<br>' + pairsRemaining;
                    headline.innerText = 'Woo Hoo!';
                    headline.style.color = '#38A700';
                    if(pairsRemaining === 0) {
                        headline.innerText = 'You Win!!!';
                        if(localStorage.getItem('lowScore')){
                            if(itemsClicked < localStorage.getItem('lowScore')) {
                                localStorage.setItem('lowScore', itemsClicked);
                            } 
                        } else {
                            localStorage.setItem('lowScore', itemsClicked);
                        }
                        bestGame.innerHTML = 'Low Score: <br>' + localStorage.getItem('lowScore');
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
                        firstCardSelected.nextSibling.style.visibility = 'visible';
                        firstCardSelected = '';
                        event.target.style.visibility = 'visible';
                        headline.innerText = 'Memory Game!';
                        headline.style.color = '#fff';
                        setTimeoutClear = true;
                    }, 1500);
                }
            } else {
                firstCardSelected = event.target.previousSibling;
            }
        }
    }
}

function resetGame(){
    gameBoard.style.display = 'none';
    pairsRemaining = 12;
    pairsLeft.innerHTML = 'Pairs Left:<br>' + pairsRemaining;
    itemsClicked = 0;
    clickScore.innerText = itemsClicked;
    headline.innerText = 'Memory Game!';
    headline.style.color = '#fff';
    firstCardSelected = '';
    setTimeoutClear = false;
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
    'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif',
    'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif',
    'https://media.giphy.com/media/jUwpNzg9IcyrK/giphy.gif',
    'https://media.giphy.com/media/jUwpNzg9IcyrK/giphy.gif',
    'https://media.giphy.com/media/RG3lm5VlrbDV7YNana/giphy.gif',
    'https://media.giphy.com/media/RG3lm5VlrbDV7YNana/giphy.gif',
    'https://media.giphy.com/media/bYpgM8bi7QV3i/giphy.gif',
    'https://media.giphy.com/media/bYpgM8bi7QV3i/giphy.gif',
    'https://i.imgur.com/c8xPBcg.gif',
    'https://i.imgur.com/c8xPBcg.gif',
    'https://media.giphy.com/media/VOKtv2wKlK8w0/giphy.gif',
    'https://media.giphy.com/media/VOKtv2wKlK8w0/giphy.gif',
    'https://66.media.tumblr.com/04fa67b161278c1c90457a494e9f19a6/tumblr_inline_mw8lueburJ1ru1szg.gif',
    'https://66.media.tumblr.com/04fa67b161278c1c90457a494e9f19a6/tumblr_inline_mw8lueburJ1ru1szg.gif',
    'https://media.giphy.com/media/3o6Mbbd48zhH43XSBq/giphy.gif',
    'https://media.giphy.com/media/3o6Mbbd48zhH43XSBq/giphy.gif',
    'https://media3.giphy.com/media/3orieKiQ8CBu0MuPK0/giphy.gif',
    'https://media3.giphy.com/media/3orieKiQ8CBu0MuPK0/giphy.gif',
    'https://media.giphy.com/media/p7UAjPDEglWes/giphy.gif',
    'https://media.giphy.com/media/p7UAjPDEglWes/giphy.gif',
    'https://media0.giphy.com/media/UMRb3OBnZelAQ/giphy.gif',
    'https://media0.giphy.com/media/UMRb3OBnZelAQ/giphy.gif',
    'https://media.giphy.com/media/erg72ZtkHfayA/giphy.gif',
    'https://media.giphy.com/media/erg72ZtkHfayA/giphy.gif'
];
