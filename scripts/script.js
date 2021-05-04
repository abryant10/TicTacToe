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

var computerPlayer = (function () {
    var computerSign = 'O';
    return {
        computerSign
    }
})();

var gameInteract = (function () {
    const gridButton = document.querySelectorAll('.tttButton');
    const chooseXButon = document.querySelector('.markerButton.X');
    const chooseOButon = document.querySelector('.markerButton.O');
    const restartButton = document.querySelectorAll('.restartButton');
    const winPopup = document.querySelector('.win-popup');
    const winMessageArea = document.querySelector('.win-message');
    var playerTurn = true;
    
    const playerPlay = function (e) {

    }
    const markBoard = function (location, sign) {
        if (player.playerSignX) {
            gameBoard.moves[e.target.dataset.index] = 'X';
            //add red class            
        } else {
            gameBoard.moves[e.target.dataset.index] = 'O';
            //add blue class            
        }
        e.target.disabled = true;
        gameBoard.setBoard();
        playerTurn = !playerTurn;
        chooseOButon.disabled = true;
        chooseXButon.disabled = true;
        checkForWin();
    }
    // const markBoard = function (e) {
    //     if (player.playerSignX) {
    //         gameBoard.moves[e.target.dataset.index] = 'X';
    //         //add red class            
    //     } else {
    //         gameBoard.moves[e.target.dataset.index] = 'O';
    //         //add blue class            
    //     }
    //     e.target.disabled = true;
    //     gameBoard.setBoard();
    //     playerTurn = !playerTurn;
    //     chooseOButon.disabled = true;
    //     chooseXButon.disabled = true;
    //     checkForWin();
    // }
   
    const checkForWin = function () {
        switch(true) {
            case (gameBoard.moves[0] === gameBoard.moves[1] 
                    && gameBoard.moves[0] === gameBoard.moves[2]
                    && gameBoard.moves[0] != ''):
                winGameMessage(gameBoard.moves[0]);
            break;
            case (gameBoard.moves[3] === gameBoard.moves[4] 
                    && gameBoard.moves[3] === gameBoard.moves[5]
                    && gameBoard.moves[3] != ''):
                winGameMessage(gameBoard.moves[3]);
            break;
            case (gameBoard.moves[6] === gameBoard.moves[7] 
                    && gameBoard.moves[6] === gameBoard.moves[8]
                    && gameBoard.moves[6] != ''):
                winGameMessage(gameBoard.moves[6]);
            break;
            case (gameBoard.moves[0] === gameBoard.moves[3] 
                    && gameBoard.moves[0] === gameBoard.moves[6]
                    && gameBoard.moves[0] != ''):
                winGameMessage(gameBoard.moves[0]);
            break;
            case (gameBoard.moves[1] === gameBoard.moves[4] 
                    && gameBoard.moves[1] === gameBoard.moves[7]
                    && gameBoard.moves[1] != ''):
                winGameMessage(gameBoard.moves[1]);
            break;
            case (gameBoard.moves[2] === gameBoard.moves[5] 
                    && gameBoard.moves[2] === gameBoard.moves[8]
                    && gameBoard.moves[2] != ''):
                winGameMessage(gameBoard.moves[2]);
            break;
            case (gameBoard.moves[0] === gameBoard.moves[4] 
                    && gameBoard.moves[0] === gameBoard.moves[8]
                    && gameBoard.moves[0] != ''):
                winGameMessage(gameBoard.moves[0]);
            break;
            case (gameBoard.moves[2] === gameBoard.moves[4] 
                    && gameBoard.moves[2] === gameBoard.moves[6]
                    && gameBoard.moves[2] != ''):
                winGameMessage(gameBoard.moves[2]);
            break;
            default:
            if(gameBoard.moves.includes('')) {
                setTimeout(() => {computerPlay();}, 1000);
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
                    gameBoard.moves[randomNumber] = 'O';
                    gridButton[randomNumber].disabled = true;
                    //add red class
                    gameBoard.setBoard();
                    computerNotPlayed = false;
                }else {
                    gameBoard.moves[randomNumber] = 'X';
                    gridButton[randomNumber].disabled = true;
                    //add blue class
                    gameBoard.setBoard();
                    computerNotPlayed = false;
                }
            }
        }
        playerTurn = !playerTurn;
        checkForWin();
    }
    const winGameMessage = function (sign) {
        winPopup.style.display = 'block';
        winMessageArea.innerHTML = `${sign} Wins!`;
    } 
    const restart = function () {
        gameBoard.moves = ['', '', '', '', '', '', '', '', '']; 
        gameBoard.setBoard();
        gridButton.forEach(button => button.disabled = false);
        chooseOButon.disabled = false;
        chooseXButon.disabled = false;
        playerTurn = true;
        winPopup.style.display = 'none';
    }
    const gridHover = function (e) {
        if (e.target.innerHTML != '') return;
        if (player.playerSignX){
            e.target.innerHTML = 'X';
            //add red transparent class
        }else {
            e.target.innerHTML = 'O';
            // add blue transpartnet class
        }
    }
    const gridHoverOut = function (e) {
        e.target.innerHTML = '';
       // e.target.remove red tans and blue trans classes
    } 

    gridButton.forEach(button => button.addEventListener('click', markBoard));
    gridButton.forEach(button => button.addEventListener('mouseover', gridHover));
    gridButton.forEach(button => button.addEventListener('mouseout', gridHoverOut));
    restartButton.forEach(button => button.addEventListener('click', restart));
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

// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
// If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!

//optional hover of marker that was selected on gamebord
// add a class so Xs are red and Os are blue

//bug where computer plays after first win...

//make tick tack toe red black blue

//make computer play use player play function

//make red class standard for tttbutton, just add blue class to Os 