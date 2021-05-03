var gameBoard = (function () {
    var moves = ['', '', '', '', '', '', '', '', ''];
    
    const setBoard = function () {
       moves = gameBoard.moves;
       let i = 0;
        for (i; i < 9; i++) {
            gameInteract.gridButton[i].textContent = moves[i];
        }
    }
   
    return {
       setBoard, moves
    }    
})();



var player = (function () {
    var playerSignX = true;
    return {
       playerSignX
    }
})();


var gameInteract = (function () {
    const gridButton = document.querySelectorAll('.tttButton');
    const chooseXButon = document.querySelector('.markerButton.X');
    const chooseOButon = document.querySelector('.markerButton.O');
    const restartButton = document.querySelector('.restartButton');
    var playerTurn = true;
    
    const markBoard = function (e) {
        if (player.playerSignX) {
            gameBoard.moves[e.target.dataset.index] = 'x';            
        } else {
            gameBoard.moves[e.target.dataset.index] = 'o';            
        }
        e.target.disabled = true;
        gameBoard.setBoard();
        playerTurn = !playerTurn;
        chooseOButon.disabled = true;
        chooseXButon.disabled = true;
        checkForWin();
    }
   
    const checkForWin = function () {
        switch(true) {
            case (gameBoard.moves[0] === gameBoard.moves[1] 
                    && gameBoard.moves[0] === gameBoard.moves[2]
                    && gameBoard.moves[0] != ''):
                alert(gameBoard.moves[0] + ' has won!');
                restart();
            break;
            case (gameBoard.moves[3] === gameBoard.moves[4] 
                    && gameBoard.moves[3] === gameBoard.moves[5]
                    && gameBoard.moves[3] != ''):
                alert(gameBoard.moves[3] + ' has won!');
                restart();
            break;
            case (gameBoard.moves[6] === gameBoard.moves[7] 
                    && gameBoard.moves[6] === gameBoard.moves[8]
                    && gameBoard.moves[6] != ''):
                alert(gameBoard.moves[6] + ' has won!');
                restart();
            break;
            case (gameBoard.moves[0] === gameBoard.moves[3] 
                    && gameBoard.moves[0] === gameBoard.moves[6]
                    && gameBoard.moves[0] != ''):
                alert(gameBoard.moves[0] + ' has won!');
                restart();
            break;
            case (gameBoard.moves[1] === gameBoard.moves[4] 
                    && gameBoard.moves[1] === gameBoard.moves[7]
                    && gameBoard.moves[1] != ''):
                alert(gameBoard.moves[1] + ' has won!');
                restart();
            break;
            case (gameBoard.moves[2] === gameBoard.moves[5] 
                    && gameBoard.moves[2] === gameBoard.moves[8]
                    && gameBoard.moves[2] != ''):
                alert(gameBoard.moves[2] + ' has won!');
                restart();
            break;
            case (gameBoard.moves[0] === gameBoard.moves[4] 
                    && gameBoard.moves[0] === gameBoard.moves[8]
                    && gameBoard.moves[0] != ''):
                alert(gameBoard.moves[0] + ' has won!');
                restart();
            break;
            case (gameBoard.moves[2] === gameBoard.moves[4] 
                    && gameBoard.moves[2] === gameBoard.moves[6]
                    && gameBoard.moves[2] != ''):
                alert(gameBoard.moves[2] + ' has won!');
                restart();
            break;
            default:
            if(gameBoard.moves.includes('')) {
                computerPlay();
            }else {
                alert('its a tie!');
            }
        }
    }
    const computerPlay = function () {
        if (playerTurn) return;
        let computerNotPlayed = true;
        while (computerNotPlayed) {
            var randomNumber = Math.floor(Math.random() * 9);
            if (gameBoard.moves[randomNumber] === '') {
                if(player.playerSignX) {
                    gameBoard.moves[randomNumber] = 'o';
                    gameBoard.setBoard();
                    computerNotPlayed = false;
                }else {gameBoard.moves[randomNumber] = 'x';
                    gameBoard.setBoard();
                    computerNotPlayed = false;
                }
            }
        }
        playerTurn = !playerTurn;
        checkForWin();
    }
    const restart = function () {
        gameBoard.moves = ['', '', '', '', '', '', '', '', '']; 
        gameBoard.setBoard();
        gridButton.forEach(button => button.disabled = false);
        chooseOButon.disabled = false;
        chooseXButon.disabled = false;
        playerTurn = true;
    }
    gridButton.forEach(button => button.addEventListener('click', markBoard));
    restartButton.addEventListener('click', restart);
    chooseXButon.addEventListener('click', () => {
        player.playerSignX = true
        chooseXButon.classList.add('markerButtonSel');
        chooseOButon.classList.remove('markerButtonSel');
    });
    chooseOButon.addEventListener('click', () => {
        player.playerSignX = false;
        chooseOButon.classList.add('markerButtonSel');
        chooseXButon.classList.remove('markerButtonSel');
    });
    return {
        gridButton
    }
})();   

// Clean up the interface to allow players to put in their names, 
// include a button to start/restart the game and add a display 
// element that congratulates the winning player!

// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
// If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!

//optional hover of marker that was selected
// add a class so Xs are red and Os are blue