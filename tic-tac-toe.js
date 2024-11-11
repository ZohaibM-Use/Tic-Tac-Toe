const PLAYER_X_CLASS ='x';
const PLAYER_O_CLASS ='circle';
const WINNING_COMBINATIONS = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],

    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],

    [0,6,18,24],
    [4,8,16,20],
    
];
const player1 = prompt('Enter Player 1 (X) Name')
const player2 = prompt('Enter Player 2 (O) Name')
const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById("board");
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
let round = document.getElementById('round');
let roundNum = 1;
let isPlayer_O_Turn = false;
startGame();

restartButton.addEventListener('click',startGame);

function startGame(){
    round.innerHTML = 'Round ' + roundNum++
    isPlayer_O_Turn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(PLAYER_X_CLASS);
        cell.classList.remove(PLAYER_O_CLASS);
        cell.removeEventListener('click',handleCellClick);
        cell.addEventListener('click', handleCellClick, {once: true})
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show')
}

function handleCellClick(e){
    const cell = e.target;

    const cellIndex = [...cellElements].indexOf(cell);
    if (cellIndex === 12) {
        return; 
    }

    const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }
    else if (isDraw()){
        endGame(true);
    }
    else{
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerHTML = "It's a draw!"
    }
    else{
        winningMessageTextElement.innerHTML = `${isPlayer_O_Turn ? player2 : player1} wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every((cell, index) =>{
        if (index === 12) {
            return true; 
        }
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
    });
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    isPlayer_O_Turn = !isPlayer_O_Turn;
}

function setBoardHoverClass(){
    boardElement.classList.remove(PLAYER_X_CLASS);
    boardElement.classList.remove(PLAYER_O_CLASS);
    if (isPlayer_O_Turn){
        boardElement.classList.add(PLAYER_O_CLASS);
    }
    else{
        boardElement.classList.add(PLAYER_X_CLASS);
    }
    cellElements.forEach((cell, index) => {
        if (index === 12) {
            cell.style.pointerEvents = 'none'; 
            return;
        } 
    });
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        });
    });
}