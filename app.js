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

// check win
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
    }
    
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
            console.log('Draw!');
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
            console.log(winningPlayer + ' won');
            console.log('Player X: ' + playerXWins + ' wins');
            console.log('Player O: ' + playerOWins + ' wins');
            resetBoard();
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

