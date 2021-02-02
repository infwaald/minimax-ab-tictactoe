/////////////////Alpha Beta Prunning for winner X
let scoresABX = {
    X: 10,
    O: -10,
    tie: 0
  }; 
/////////////////

function bestMoveABPX() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check spot availability
        if (board[i][j] == '') {
          board[i][j] = players[currentPlayer];
          let score = alphabetapX(board, 0, -Infinity, Infinity, false);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    //console.log(move.i + move.j + players[currentPlayer]);
    board[move.i][move.j] = players[currentPlayer];
}
  

  
  function alphabetapX(board, depth, alpha, beta, isMaximizing) {
    let result = checkWinner();
      if (result !== null) {
      return scoresABX[result];
    }
    
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = players[currentPlayer];
            let score = alphabetapX(board, depth + 1, alpha, beta, false);
            board[i][j] = '';
            bestScore = max(score, bestScore);
            alpha = max(alpha, score);
            if (beta <= alpha){
              break;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = players[(currentPlayer + 1) % players.length];
            let score = alphabetapX(board, depth + 1, alpha, beta, true);
            board[i][j] = '';
            bestScore = min(score, bestScore);
            beta = min(beta, score);
            if (beta<=alpha){
              break;
            }
          }
        }
      }
      return bestScore;
    }
  }

