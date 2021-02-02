function randomAlgorithm(){
  let available = [];
  
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          available.push({ i,j });
        }
      }
  }
  let move = random(available);
  let result = checkWinner();
  if (result == null && available.length>0) {
       board[move.i][move.j] = players[currentPlayer];
  }
}