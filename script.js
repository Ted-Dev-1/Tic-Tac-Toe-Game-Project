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

let gameMode = '';

pvpBtn.addEventListener('click', () => {
    loadGame('pvp');
    gameMode = 'pvp';
});

pvcBtn.addEventListener('click', ()=> {
    loadGame('pvc');
    gameMode = 'pvc';
});

let currentplayer = 'X';
let isGameOver = false;


function loadGame(selectedMode){
    let mode = selectedMode;
    modeTitle.innerText = mode === 'pvp' ? 'Player Vs Player' : 'Player Vs Computer';
    chooseModeBox.style.display = 'none';
    game.style.display = 'flex';



    if(modeTitle.innerText === 'Player Vs Computer'){
        /*settings.style.display = 'flex';*/
        //gameMode = 'pvc';
    }

    cells.forEach(function (cell){
        cell.innerHTML = '';
        
        cell.addEventListener('click', () =>{
            if(!isGameOver && cell.innerHTML === ''){
                cell.innerHTML = currentplayer;
                checkWin();
                checkDraw();
                changeCurrentplayer();
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
    if(gameMode !== 'pvc'){
        currentplayer = currentplayer === 'X'? 'O' : 'X';
        
        if(currentplayer !== 'X'){
            bg.style.left ='85px';
        }
        else{
            bg.style.left ='0';
        }


    }

    else if(gameMode === 'pvc'){
        console.log('Player Vs Computer');
    }
}




