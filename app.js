// select elements with the class box
const boxes = document.querySelectorAll('.box');

//variable for current player
let currentPlayer = 'X';

//variable to track winning player
let winningPlayer = null;

//variable if game is a draw
let isDraw = false;

//variable to count wins for players
let playerXWins = 0;
let playerOWins = 0;
let draws = 0;

//variable to start game
let gameStarted = false;

//function to choose player and start game
function startGame() {
    const selectPlayer = document.getElementById('select-player')
    const chooseXBtn = document.getElementById('chooseX')
    const chooseOBtn = document.getElementById('chooseO')

    chooseXBtn.addEventListener('click', function () {
        if (!gameStarted) {
            currentPlayer = 'X'
            selectPlayer.style.display = 'none'
            gameStarted = true
        }
    })

    chooseOBtn.addEventListener('click', function () {
        if (!gameStarted) {
            currentPlayer = 'O'
            selectPlayer.style.display = 'none';
            gameStarted = true
        }
    })
}
//call the start game function
startGame();

// check win function
function checkWin() {
 if (
    (boxes[0].innerText === currentPlayer && boxes[1].innerText === currentPlayer && boxes[2].innerText === currentPlayer) ||
    (boxes[3].innerText === currentPlayer && boxes[4].innerText === currentPlayer && boxes[5].innerText === currentPlayer) ||
    (boxes[6].innerText === currentPlayer && boxes[7].innerText === currentPlayer && boxes[8].innerText === currentPlayer) ||
    (boxes[0].innerText === currentPlayer && boxes[3].innerText === currentPlayer && boxes[6].innerText === currentPlayer) ||
    (boxes[1].innerText === currentPlayer && boxes[4].innerText === currentPlayer && boxes[7].innerText === currentPlayer) ||
    (boxes[2].innerText === currentPlayer && boxes[5].innerText === currentPlayer && boxes[8].innerText === currentPlayer) ||
    (boxes[0].innerText === currentPlayer && boxes[4].innerText === currentPlayer && boxes[8].innerText === currentPlayer) ||
    (boxes[2].innerText === currentPlayer && boxes[4].innerText === currentPlayer && boxes[6].innerText === currentPlayer)
    ) {
        winningPlayer = currentPlayer;
        playWinSound();
    }
}

//function to play win sound
function playWinSound() {
    const winSound = document.getElementById('winSound');
    winSound.play();
}

//function to check for draw
function checkDraw() {
    if (!winningPlayer) {
        let isBoardFull = true;
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].innerText === '') {
                isBoardFull = false;
            }
        }
        if (isBoardFull) {
            isDraw = true;
            draws++
            updateScores();

            //draw sound
            const drawSound = document.getElementById('drawSound');
            drawSound.play();
        }
    }
}

//function to reset board
function resetBoard() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = '';
    }
    winningPlayer = null;
    isDraw = false;
    currentPlayer = 'X'
}

// handle click event
function handleClick(box) {
    if (winningPlayer) {
        return;
    }
    
    if (box.innerText === '') {
        box.innerText = currentPlayer
        
        // find the win
        checkWin()

        //find the draw
        checkDraw()
        
        //find who won
        if (winningPlayer) {
            if (winningPlayer === 'X') {
                playerXWins++;
            } else {
                playerOWins++;
            }
            updateScores();

        } else if (isDraw) {
            updateScores();
        }

     //change players
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X'
        }
        }
    }


// loop through boxes and add event listener to each
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', function(){
        handleClick(boxes[i])
    });
}

// reset the game when Play again is clicked
const playAgainBtn = document.getElementById('play-again-btn')
playAgainBtn.addEventListener('click', function () {
    resetBoard();
})

//update scores on screen
function updateScores() {
    document.getElementById('x-wins').innerText = 'X Won: ' + playerXWins;
    document.getElementById('draw').innerText = 'Draw: ' + draws;
    document.getElementById('o-wins').innerText = 'O Won: ' + playerOWins;
}