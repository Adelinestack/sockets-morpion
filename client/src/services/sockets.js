import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

const changeGameState = cb =>
  socket.on('changeGameState', gameState => cb(gameState));

const gameDatas = cb => socket.on('play', gameplay => cb(gameplay));

const caseGameIsChosen = (caseGameIndex, turn, playerName) => {
  if (turn === playerName) {
    socket.emit('caseGameChosen', { caseGameIndex, turn });
  }
};

const onPlayerConnection = cb => {
  socket.emit('whoAmI');
  socket.on('givePlayerName', playerName => cb(playerName));
};

const isWinner = cb => {
  socket.on('winner', player => cb(player));
};

const resetGame = () => socket.emit('resetGame');

export {
  changeGameState,
  gameDatas,
  caseGameIsChosen,
  onPlayerConnection,
  isWinner,
  resetGame,
};
