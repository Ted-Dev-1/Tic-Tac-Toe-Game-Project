const pvpBtn = document.querySelector('#pvp');
const pvcBtn = document.querySelector('#pvc');
const modeTitle = document.querySelector('#mode');
const settings = document.querySelector('.settings');
const chooseModeBox = document.querySelector('.game-mode');
const game = document.querySelector('.game');
const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const playAgain = document.querySelector('#play-again');
const bg = document.querySelector('.bg');
const settingOption = document.querySelector('.difficulty');
const pvcPlay = document.querySelector('#playPvc');


let gameMode = '';
let gameDifficulty ='';

pvpBtn.addEventListener('click', () => {loadGame('pvp')});

pvcBtn.addEventListener('click', ()=> {loadGame('pvc')});

let currentplayer = 'X';
let isGameOver = false;


settingOption.addEventListener('change', () =>{
    gameDifficulty = settingOption.value;
});

pvcPlay.addEventListener('click', () =>{
    if(gameDifficulty !== 'Choose' && settingOption.value !== 'Choose'){
        settings.style.display = 'none';
        game.style.display = 'flex';
    }

    else{
        alert('pick a game difficulty');
    }
});


function loadGame(selectedMode){
    gameMode = selectedMode;
    modeTitle.innerText = gameMode === 'pvp' ? 'Player Vs Player' : 'Player Vs Computer';
    chooseModeBox.style.display = 'none';
    if(gameMode !== 'pvc'){
        game.style.display = 'flex';
    }
    else{
        settings.style.display = 'block';
    }
    

    cells.forEach(function (cell){
        cell.innerHTML = '';
        
        cell.addEventListener('click', () =>{
            if(!isGameOver && cell.innerHTML === ''){
                cell.innerHTML = currentplayer;
                checkWin();
                checkDraw();

                if(isGameOver) return;

                if(gameMode === 'pvc'){
                    changeCurrentplayer();
                    
                    setTimeout(()=>{
                        computerMove();
                        checkWin();
                        checkDraw();
                        changeCurrentplayer();
                    }, 500);

                }

                else{
                    changeCurrentplayer();
                }
            }
        });
        
    });
}

function checkWin(){
    const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for(let i = 0; i < wins.length; i++){
        let box1 = cells[wins[i][0]].innerHTML;
        let box2 = cells[wins[i][1]].innerHTML;
        let box3 = cells[wins[i][2]].innerHTML;

        if(box1 !== '' && box1 === box2 && box1 === box3){
            isGameOver = true;
            alert(`Player ${currentplayer} wins`);
            playAgain.style.display = 'inline';
        }
    }
}

function checkDraw(){
    if(!isGameOver){
        let isDraw = true;
        cells.forEach((cell) =>{
            if(cell.innerHTML === ''){
                isDraw =false;
            }
        });

        if(isDraw){
            isGameOver = true;
            alert('Draw');
            playAgain.style.display = 'inline';
        }
    }
}


function changeCurrentplayer(){
    currentplayer = currentplayer === 'X'? 'O' : 'X';
    bg.style.left = currentplayer === 'O' ? '85px' : '0';
}

function evaluateBoardState(board){

    const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for(let [a, b, c] of wins){
        if(board[a] && board[a] === board[b] && board[a] === board[c]){

            if(board[a] === 'O'){
                return 10;
            }

            else if(board[a] === 'X'){
                return -10;
            }
        }
    }

    return 0;
}

function minimax(board, isComputersTurn){
    const s = evaluateBoardState(board);

    if(s !== 0){return s;}
    if(board.every((cell) => { return cell !== '';})){
        return 0;
    }

    if(isComputersTurn){
        let bestScr = -Infinity;

        for(let i =0; i< 9; i++){

            if(board[i] === ''){

                board[i] = 'O';
                let scr = minimax(board, false);
                board[i] = '';
                bestScr = Math.max(bestScr, scr);
            }
        }

        return bestScr;
    }

    else{
        let bestScr = Infinity;
        for(let i = 0; i < 9; i++){

            if(board[i] === ''){
                board[i] = 'X';
                let scr = minimax(board, true);
                board[i] = '';
                bestScr = Math.min(bestScr, scr);
            }
        }

        return bestScr;
    }

}

function computerMove(){

    if(gameDifficulty === 'Easy'){
    
    const empty = Array.from(cells).map((currentCell, index) =>{
        return currentCell.innerHTML === '' ? index : null
    }).filter((index)=>{
        return index !== null;
    });

    const pickCell = empty[Math.floor(Math.random() * empty.length)];
    cells[pickCell].innerHTML = currentplayer;

   }

    else if(gameDifficulty === 'Hard'){
        let board = Array.from(cells).map((cell)=>{ return cell.innerHTML;});
        let bestScore = -Infinity;
        let index = -1;

        for(let i = 0; i < 9; i++){
            if(board[i] === ''){
                board[i] = 'O';
                const score = minimax(board, false);
                board[i] = '';

                if(score > bestScore){
                    bestScore = score;
                    index = i;
                }
            }
        }

        if(index >= 0){
            cells[index].innerHTML = currentplayer;
        }
    }
}

playAgain.addEventListener('click', ()=>{
    isGameOver = false;
    currentplayer = 'X';
    cells.forEach((cell)=>{
        cell.innerHTML = '';
    });
    
    playAgain.style.display = 'none';
    bg.style.left ='0';
})


