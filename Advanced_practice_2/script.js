//logic for player creation
function player (name, symbol, score) {
    return {name, symbol, score}
}

//logic for gameboard
const gameboard = (function () {
    let board = new Array(9).fill(null);
    
    const clearBoard = () => {
        for (square in board) {
            board[square] = null;
        }
    }

    return {board, clearBoard};
})();

//logic for flow of game
const game = (function () {

    const firstPlayersTurn = [true];

    const changePlayer = () => {
        if (firstPlayersTurn[0] === true) {
            firstPlayersTurn[0] = false;
        } else {
            firstPlayersTurn[0] = true;
        }
    };

    const checkwinner = function () {
        if (!(gameboard.board.slice(0,3).includes(null)) && (gameboard.board[0] === gameboard.board[1]) && (gameboard.board[1] === gameboard.board[2])) {
            return true;
        } else if (!(gameboard.board.slice(3,6).includes(null)) && (gameboard.board[3] === gameboard.board[4]) && (gameboard.board[4]=== gameboard.board[5])) {
            return true;
        } else if (!(gameboard.board.slice(6,9).includes(null)) && (gameboard.board[6] === gameboard.board[7]) && (gameboard.board[7]=== gameboard.board[8])) {
            return true;
        } else if (!((gameboard.board[0] === null) || (gameboard.board[3] === null) || (gameboard.board[6] === null)) && (gameboard.board[0] === gameboard.board[3]) && (gameboard.board[3]=== gameboard.board[6])) {
            return true;
        } else if (!((gameboard.board[1] === null) || (gameboard.board[4] === null) || (gameboard.board[7] === null)) && (gameboard.board[1] === gameboard.board[4]) && (gameboard.board[4]=== gameboard.board[7])) {
            return true;
        } else if (!((gameboard.board[2] === null) || (gameboard.board[5] === null) || (gameboard.board[8] === null)) && (gameboard.board[2] === gameboard.board[5]) && (gameboard.board[5]=== gameboard.board[8])) {
            return true;               
        } else if (!((gameboard.board[0] === null) || (gameboard.board[4] === null) || (gameboard.board[8] === null)) && (gameboard.board[0] === gameboard.board[4]) && (gameboard.board[4]=== gameboard.board[8])) {
            return true;
        } else if (!((gameboard.board[2] === null) || (gameboard.board[4] === null) || (gameboard.board[6] === null)) && (gameboard.board[6] === gameboard.board[4]) && (gameboard.board[4]=== gameboard.board[2])) {
            return true;
        } else {
            return false;
        }
    };

    const checkTie = function () {
        if (gameboard.board.includes(null)) {
            return false;
        } else {
            return true;
        }
    };

    return {firstPlayersTurn, changePlayer, checkwinner, checkTie};

})();

function screenController () {
//buttons forms and modals
    const form = document.querySelector('form');
    const boardDisplay = document.querySelector('#boardDisplay');
    const squares = boardDisplay.querySelectorAll('div');
    const gameStart = document.querySelector("#gameStart");
    const matchRestart = document.querySelector('#restartMatch');
    const dialog = document.querySelector("dialog");
    const gameState = document.querySelector('#gameState');
    const scoreBoard = document.querySelector('#scoreBoard');
    const scores = document.querySelectorAll('span');
    const endGame = document.querySelector('#endGame');

//form values
    const player1Name = document.querySelector('#Player_1_Name');
    const player1Symbol = document.querySelector('#Player_1_Symbol');
    const player2Name = document.querySelector('#Player_2_Name');
    const player2Symbol = document.querySelector('#Player_2_Symbol');


//functions and eventListeners
    const renderBoard = function () {
        squares.forEach((square, i) => {
            square.textContent = gameboard.board[i];
        });
    };

    const renderScores = function() {
        scores[2].textContent = game.Player1.score;
        scores[5].textContent = game.Player2.score;
    }

    const activate = function (e) {
        let square = e.target.dataset.position;
        if (gameboard.board[Number(square)] === null) {
            let currentPlayer = '';
            if (game.firstPlayersTurn[0]) {
                currentPlayer = game.Player1;
            } else {
                currentPlayer = game.Player2;
            }
            gameboard.board[Number(square)] = currentPlayer.symbol;
            renderBoard();
            if (game.checkwinner()) {
                gameState.textContent = `${currentPlayer.name} wins!`;
                currentPlayer.score = ++currentPlayer.score;
                renderScores();
                restart();
            } else if (game.checkTie()) {
                gameState.textContent = 'Tie!';
                restart();
            } else {
            game.changePlayer();
            }
        }
    };

    const restart = function () {
        gameboard.clearBoard();
        renderBoard();
        game.firstPlayersTurn[0] = true;
    };

    const end = function () {
        restart();
        delete game.Player1;
        delete game.Player2;
        scoreBoard.setAttribute('hidden', '');
        boardDisplay.removeEventListener('click', activate);
        endGame.removeEventListener('click', end);
    };

//activate board function upon game start
    function activateBoard() {
        boardDisplay.addEventListener('click', activate);
    }

    gameStart.addEventListener("click", ()=>{dialog.showModal();});

    matchRestart.addEventListener("click", restart);




    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        game.Player1 = player(player1Name.value, player1Symbol.value, 0);
        game.Player2 = player(player2Name.value, player2Symbol.value, 0);
        scoreBoard.removeAttribute('hidden');
        scores[0].textContent = game.Player1.name;
        scores[2].textContent = game.Player1.score;
        scores[3].textContent = game.Player2.name;
        scores[5].textContent = game.Player2.score;
        activateBoard();
        endGame.addEventListener('click', end);
        form.reset();
        dialog.close();
    });
}

screenController();