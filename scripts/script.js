const ticTacToeGame = (function () {
    var gameBoard = (function () {
    var moves = ['', '', '', '', '', '', '', '', ''];
    
    const setBoard = function () {
       moves = gameBoard.moves;
       let i = 0;
        for (i; i < 9; i++) {
            gameInteract.gridButton[i].innerHTML = moves[i];
        }
    }
       return {
       setBoard, 
       moves
    }    
    })();

    var player = (function () {
        var playerSign = 'X';
        return {
        playerSign
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
        var gameOver = false;
        var checkmate = false;
        var checkmateLocation;
        var compWillWin = false;
        var compWinLocation;
        
        const playerPlay = function (e) {
            markBoard(e.target, player.playerSign);
        }

        const markBoard = function (location, sign) {
            location.innerHTML = sign;
            location.disabled = true;
            if (sign == 'O'){
                location.classList.add('blueO');
            }
            gameBoard.moves[location.dataset.index] = sign;
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
                    winGameMessage(gameBoard.moves[0]);
                    gameOver = true;
                break;
                case (gameBoard.moves[3] === gameBoard.moves[4] 
                        && gameBoard.moves[3] === gameBoard.moves[5]
                        && gameBoard.moves[3] != ''):
                    winGameMessage(gameBoard.moves[3]);
                    gameOver = true;
                break;
                case (gameBoard.moves[6] === gameBoard.moves[7] 
                        && gameBoard.moves[6] === gameBoard.moves[8]
                        && gameBoard.moves[6] != ''):
                    winGameMessage(gameBoard.moves[6]);
                    gameOver = true;

                break;
                case (gameBoard.moves[0] === gameBoard.moves[3] 
                        && gameBoard.moves[0] === gameBoard.moves[6]
                        && gameBoard.moves[0] != ''):
                    winGameMessage(gameBoard.moves[0]);
                    gameOver = true;
                break;
                case (gameBoard.moves[1] === gameBoard.moves[4] 
                        && gameBoard.moves[1] === gameBoard.moves[7]
                        && gameBoard.moves[1] != ''):
                    winGameMessage(gameBoard.moves[1]);
                    gameOver = true;
                break;
                case (gameBoard.moves[2] === gameBoard.moves[5] 
                        && gameBoard.moves[2] === gameBoard.moves[8]
                        && gameBoard.moves[2] != ''):
                    winGameMessage(gameBoard.moves[2]);
                    gameOver = true;
                break;
                case (gameBoard.moves[0] === gameBoard.moves[4] 
                        && gameBoard.moves[0] === gameBoard.moves[8]
                        && gameBoard.moves[0] != ''):
                    winGameMessage(gameBoard.moves[0]);
                    gameOver = true;
                break;
                case (gameBoard.moves[2] === gameBoard.moves[4] 
                        && gameBoard.moves[2] === gameBoard.moves[6]
                        && gameBoard.moves[2] != ''):
                    winGameMessage(gameBoard.moves[2]);
                    gameOver = true;
                break;
                default:
                if(gameBoard.moves.includes('')) {
                    setTimeout(() => {computerPlay();}, 1000);
                }else {
                    tieGameMessage(); 
                }
            }
        }
        const computerPlay = function () {
            if (playerTurn) return;
            if (gameOver) return;
            checkForCompWin(gameBoard.moves);
            checkForCheckMate(gameBoard.moves);
            if (compWillWin){
                markBoard(gridButton[compWinLocation], computerPlayer.computerSign);
            }else if (checkmate) {
                markBoard(gridButton[checkmateLocation], computerPlayer.computerSign);
            } else {
                let computerNotPlayed = true;
                while (computerNotPlayed) {
                    var randomNumber = Math.floor(Math.random() * 9);
                    var compLocation = gridButton[randomNumber];
                    if (gameBoard.moves[randomNumber] === '') {
                        computerNotPlayed = false;
                        markBoard(compLocation, computerPlayer.computerSign);
                    }
                }
            }
        }
        const checkForCheckMate = function (data) {
            checkmate = false;
            let i = 0;
            while (checkmate === false && i < 9) {    
                if (data[i] === '') {
                    var futureMoves = gameBoard.moves.slice();
                    futureMoves[i] = player.playerSign;
                    switch(true) {
                        case (futureMoves[0] === futureMoves[1] 
                                && futureMoves[0] === futureMoves[2]
                                && futureMoves[0] != ''):
                            checkmate = true;
                            checkmateLocation = i;
                        break;
                        case (futureMoves[3] === futureMoves[4] 
                                && futureMoves[3] === futureMoves[5]
                                && futureMoves[3] != ''):
                            checkmate = true;
                            checkmateLocation = i;
                        break;
                        case (futureMoves[6] === futureMoves[7] 
                                && futureMoves[6] === futureMoves[8]
                                && futureMoves[6] != ''):
                            checkmate = true;
                            checkmateLocation = i;
                        break;
                        case (futureMoves[0] === futureMoves[3] 
                                && futureMoves[0] === futureMoves[6]
                                && futureMoves[0] != ''):
                            checkmate = true;
                            checkmateLocation = i;
                        break;
                        case (futureMoves[1] === futureMoves[4] 
                                && futureMoves[1] === futureMoves[7]
                                && futureMoves[1] != ''):
                            checkmate = true;
                            checkmateLocation = i;
                        break;
                        case (futureMoves[2] === futureMoves[5] 
                                && futureMoves[2] === futureMoves[8]
                                && futureMoves[2] != ''):
                            checkmate = true;
                            checkmateLocation = i;
                        break;
                        case (futureMoves[0] === futureMoves[4] 
                                && futureMoves[0] === futureMoves[8]
                                && futureMoves[0] != ''):
                            checkmate = true;
                            checkmateLocation = i;
                        break;
                        case (futureMoves[2] === futureMoves[4] 
                                && futureMoves[2] === futureMoves[6]
                                && futureMoves[2] != ''):
                            checkmate = true;
                            checkmateLocation = i;
                        break;
                        default: 
                        i++;
                    }
                }else {
                    i++;
                }
            }
        }
        const checkForCompWin = function (data) {
            compWillWin = false;
            let i = 0;
            while (compWillWin === false && i < 9) {    
                if (data[i] === '') {
                    var futureMoves = gameBoard.moves.slice();
                    futureMoves[i] = computerPlayer.computerSign;
                    switch(true) {
                        case (futureMoves[0] === futureMoves[1] 
                                && futureMoves[0] === futureMoves[2]
                                && futureMoves[0] != ''):
                            compWillWin = true;
                            compWinLocation = i;
                        break;
                        case (futureMoves[3] === futureMoves[4] 
                                && futureMoves[3] === futureMoves[5]
                                && futureMoves[3] != ''):
                            compWillWin = true;
                            compWinLocation = i;
                        break;
                        case (futureMoves[6] === futureMoves[7] 
                                && futureMoves[6] === futureMoves[8]
                                && futureMoves[6] != ''):
                            compWillWin = true;
                            compWinLocation = i;
                        break;
                        case (futureMoves[0] === futureMoves[3] 
                                && futureMoves[0] === futureMoves[6]
                                && futureMoves[0] != ''):
                            compWillWin = true;
                            compWinLocation = i;
                        break;
                        case (futureMoves[1] === futureMoves[4] 
                                && futureMoves[1] === futureMoves[7]
                                && futureMoves[1] != ''):
                            compWillWin = true;
                            compWinLocation = i;
                        break;
                        case (futureMoves[2] === futureMoves[5] 
                                && futureMoves[2] === futureMoves[8]
                                && futureMoves[2] != ''):
                            compWillWin = true;
                            compWinLocation = i;
                        break;
                        case (futureMoves[0] === futureMoves[4] 
                                && futureMoves[0] === futureMoves[8]
                                && futureMoves[0] != ''):
                            compWillWin = true;
                            compWinLocation = i;
                        break;
                        case (futureMoves[2] === futureMoves[4] 
                                && futureMoves[2] === futureMoves[6]
                                && futureMoves[2] != ''):
                            compWillWin = true;
                            compWinLocation = i;
                        break;
                        default: 
                        i++;
                    }
                }else {
                    i++;
                }
            }
        }
        const winGameMessage = function (sign) {
            winPopup.style.display = 'block';
            if (sign == 'X') {
                winMessageArea.innerHTML = `<span style='color: rgb(252, 70, 70)'>X</span> Wins!`;
            } else {
                winMessageArea.innerHTML = `<span style='color: rgb(113, 111, 243)'>O</span> Wins!`;
            }
        }
        const tieGameMessage = function () {
            winPopup.style.display = 'block';
            winMessageArea.innerHTML = "It's a tie!";
        } 
        const restart = function () {
            gameBoard.moves = ['', '', '', '', '', '', '', '', '']; 
            gameBoard.setBoard();
            gridButton.forEach(button => {
                button.disabled = false;
                button.classList.remove('blueO');
            });
            chooseOButon.disabled = false;
            chooseXButon.disabled = false;
            playerTurn = true;
            gameOver = false;
            winPopup.style.display = 'none';
        }
        const gridHover = function (e) {
            if (e.target.innerHTML !== '') return;
            if (player.playerSign == 'X'){
                e.target.innerHTML = 'X';
            }else {
                e.target.classList.add('blueO');
                e.target.innerHTML = 'O';
            }
        }
        const gridHoverOut = function (e) {
            e.target.innerHTML = '';
            e.target.classList.remove('blueO');
        } 

        gridButton.forEach(button => button.addEventListener('click', playerPlay));
        gridButton.forEach(button => button.addEventListener('mouseover', gridHover));
        gridButton.forEach(button => button.addEventListener('mouseout', gridHoverOut));
        restartButton.forEach(button => button.addEventListener('click', restart));
        chooseXButon.addEventListener('click', () => {
            player.playerSign = 'X';
            computerPlayer.computerSign = 'O';
            chooseXButon.classList.add('markerButtonSelX');
            chooseOButon.classList.remove('markerButtonSelO');
        });
        chooseOButon.addEventListener('click', () => {
            player.playerSign = 'O';
            computerPlayer.computerSign = 'X';
            chooseOButon.classList.add('markerButtonSelO');
            chooseXButon.classList.remove('markerButtonSelX');
        });
        return {
            gridButton
        }
    })();   
})();