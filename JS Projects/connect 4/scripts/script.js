let playerRed = 'r';
let playerBlue = 'b';
let currPlayer = playerRed;
let gameOver = false;
let board;
let rows = 6;
let columns = 7;
let currColumns;

window.onload = () => {
    setGame();
    document.getElementById('resetBtn').addEventListener('click', resetGame);
};

function setGame() {
    board = [];
    currColumns = Array(columns).fill(rows - 1);

    let boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add('tile');
            tile.addEventListener('click', setPiece);
            boardDiv.append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;

    let tile = document.getElementById(r.toString() + '-' + c.toString());
    if (currPlayer === playerRed) {
        tile.classList.add('redPiece');
        currPlayer = playerBlue;
    } else {
        tile.classList.add('bluePiece');
        currPlayer = playerRed;
    }

    currColumns[c] = r - 1;

    checkWinner();
}

function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== " " &&
                board[r][c] === board[r][c + 1] &&
                board[r][c] === board[r][c + 2] &&
                board[r][c] === board[r][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] !== " " &&
                board[r][c] === board[r + 1][c] &&
                board[r][c] === board[r + 2][c] &&
                board[r][c] === board[r + 3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== " " &&
                board[r][c] === board[r + 1][c + 1] &&
                board[r][c] === board[r + 2][c + 2] &&
                board[r][c] === board[r + 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 3; c < columns; c++) {
            if (board[r][c] !== " " &&
                board[r][c] === board[r + 1][c - 1] &&
                board[r][c] === board[r + 2][c - 2] &&
                board[r][c] === board[r + 3][c - 3]) {
                setWinner(r, c);
                return;
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] === playerRed) {
        winner.innerText = 'Red wins';
    } else {
        winner.innerText = 'Blue wins';
    }

    gameOver = true;
}

function resetGame() {
    currPlayer = playerRed;
    gameOver = false;
    setGame();
    document.getElementById('winner').innerText = '';
}
