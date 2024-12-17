//logic for player creation
function player (name, symbol) {
    return {name, symbol}
}

//logic for gameboard
const gameboard = (function () {
    const board = new Array(9).fill(null);
    let Player1 = ''
    let Player2 = ''
    const move = function (position, symbol) {
        board[position] = symbol;
    };

    const clear_board = () => board = new Array(9).fill(null);

    return {board, move, clear_board};
})();

// logic for display of board
const display = (function () {
    

    const display_board = () => {

    };

})();

//logic for flow of game
const game = (function () {


    const firstPlayersTurn = true;

    const changePlayer = () => {
        if (firstPlayersTurn === true) {
            firstPlayersTurn = false;
        } else {
            firstPlayersTurn = true;
        }
    };

    const checkwinner = function () {
        if (!(null in gameboard.board.slice(0,3)) && (gameboard.board[0] === gameboard.board[1]) && (gameboard.board[1]=== gameboard.board[2])) {
            return true;
        } else if (!(null in gameboard.board.slice(3,6)) && (gameboard.board[3] === gameboard.board[4]) && (gameboard.board[4]=== gameboard.board[5])) {
            return true;
        } else if (!(null in gameboard.board.slice(6,9)) && (gameboard.board[6] === gameboard.board[7]) && (gameboard.board[7]=== gameboard.board[8])) {
            return true;
        } else if (!(null in gameboard.board.slice(0,4)) && (gameboard.board[0] === gameboard.board[3]) && (gameboard.board[3]=== gameboard.board[6])) {
            return true;
        } else if (!(null in gameboard.board.slice(0,4)) && (gameboard.board[1] === gameboard.board[4]) && (gameboard.board[4]=== gameboard.board[7])) {
            return true;
        } else if (!(null in gameboard.board.slice(0,4)) && (gameboard.board[2] === gameboard.board[5]) && (gameboard.board[5]=== gameboard.board[8])) {
            return true;               
        } else if (!(null in gameboard.board.slice(0,4)) && (gameboard.board[0] === gameboard.board[4]) && (gameboard.board[4]=== gameboard.board[8])) {  
            return true;
        } else if (!(null in gameboard.board.slice(0,4)) && (gameboard.board[6] === gameboard.board[4]) && (gameboard.board[4]=== gameboard.board[2])) {
            return true;
        } else {
            return false;
        }
    };



    return {firstPlayersTurn, changePlayer, checkwinner};

})();

const form = document.querySelector('form');
const boardDisplay = document.querySelector('#board_display');
const gameStart = document.querySelector("#game_start");
const dialog = document.querySelector("dialog");


//form values
const player1Name = document.querySelector('#Player_1_Name');
const player1Symbol = document.querySelector('#Player_1_Symbol');
const player2Name = document.querySelector('#Player_2_Name');
const player2Symbol = document.querySelector('#Player_2_Symbol');

//activate board function upon game start
function activateBoard() {
    boardDisplay.addEventListener('click', (e) => {
        let square = e.currentTarget.dataset.position;
        if (!(gameboard.board[Number(square)] === null)) {
            let currentPlayer = '';
            if (game.firstPlayersTurn) {
                currentPlayer = Player1;
            } else {
                currentPlayer = Player2;
            }
            gameboard.board[Number(square)] = currentPlayer.symbol;
            e.currentTarget.textContent = gameboard.board[Number(square)];
            if (game.checkwinner()) {
                console.log(`${currentPlayer.name} wins!`);
                gameboard.clear_board();
            };
            game.changePlayer();
        }
    });
}



gameStart.addEventListener("click", ()=>{dialog.showModal();});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    gameboard.Player1 = {'name':player1Name.value, 'symbol':player1Symbol.value}
    gameboard.Player2 = player(player2Name.value, player2Symbol.value)
    activateBoard();
    form.reset();
    dialog.close();
});


