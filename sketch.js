let players = ['X', 'O']; //p0 p1
let currentPlayer;
let available = [];
let radio1;
let radio2;
let label1;
let label2;
let label3;


function setup() {
  createCanvas(400, 400);
  frameRate(20); 
  label3 = createP('');
  label3.style('color','#888').position(10, height-5);
  //creating options for AIs
  //AI1 (X)
  label1 = createP('');
  label1.style('color','#4CA1CC').position(width+30, 0);
  label1.html('Choose an algorithm for AI1 (X):');
  radio1 = createRadio('AI1').style('color','#000');
  radio1.option('Random');
  radio1.option('Minimax');
  radio1.option('AlphaBeta');
  radio1.style("width", "90px").style('checked','0'); 
  radio1.selected('Random');
  radio1.position(width+30, 35);  
  
  //AI1 (O)
  label2 = createP('');
  label2.style('color','#F2545B').position(width+30, 100);
  label2.html('Choose an algorithm for AI2 (O):');
  radio2 = createRadio('AI2').style('color','#000');
  radio2.option('Random');
  radio2.option('Minimax');
  radio2.option('AlphaBeta');
  radio2.style("width", "90px"); 
  radio2.selected('Random');
  radio2.position(width+30, 135);
  
  let btn = createButton('Next Turn');
    btn.position(width+50, 220).mousePressed(function(){
        nextTurn();
    });
  
  gameSetup();
}

// function mousePressed(){
//   nextTurn(); 
// }

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}
function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  if (winner == null && available.length == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function nextTurn() {
  if (currentPlayer == 0){ //x 
    switch(radio1.value()){
      case 'Random':
        randomAlgorithm();
        break;
      case 'Minimax':
        bestMoveX();
        break;
      case 'AlphaBeta':
        bestMoveABPX();
        break;
    }
  } else if (currentPlayer == 1){ //o
    switch(radio2.value()){
      case 'Random':
        randomAlgorithm();
        break;
      case 'Minimax':
        bestMoveO();
        break;
      case 'AlphaBeta':
        bestMoveABPO();
        break;
    }
  }
  
  //console.log(currentPlayer + ' ' + players[currentPlayer] +' -- '+ board);
  
  //choose player for next turn next turn
  
  currentPlayer = (currentPlayer + 1) % players.length;
}

function draw() {
  background(255);
  let w = width / 3;
  let h = height/ 3;
  strokeWeight(6);
  stroke(0);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == players[1]) { //o
        noFill();
        stroke(242, 84, 91);
        ellipse(x, y, r * 2);
      } else if (spot == players[0]) { //x
        stroke(76, 161, 204);
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  
  let btn = createButton('Play again');
    btn.position(width+50, 250).mousePressed(function() {
        gameSetup();
        loop();
    });
  
  
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('color','#000');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`); //+ print ai choises
    }
  } else {
    //nextTurn();
  }
}

function gameSetup() {
    available = [];
  
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            available.push([i, j]);
        }
    }
  
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    winner = null;
    currentPlayer = 0; //x
} //reset the game
