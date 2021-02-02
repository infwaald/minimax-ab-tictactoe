/////////////////minimax for winner X
let scoresMX = {
    X: 10,
    O: -10,
    tie: 0
  };
/////////////////

function bestMoveX() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check spot availability
        if (board[i][j] == '') {
          board[i][j] = players[currentPlayer];
          let score = minimaxX(board, 0, false);
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

  function minimaxX(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
      return scoresMX[result];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = players[currentPlayer];
            let score = minimaxX(board, depth + 1, false);
            board[i][j] = '';
            bestScore = max(score, bestScore);
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
            let score = minimaxX(board, depth + 1, true);
            board[i][j] = '';
            bestScore = min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }