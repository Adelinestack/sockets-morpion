const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 5000;
const { isPlayerWon } = require('./utils/functions');

const sockets = [];
const socketsId = [];
let turn = 1;
let currentGameboard = ['', '', '', '', '', '', '', '', ''];
let gameplay = { currentGameboard, turn };
let winner = 0;

const broadcast = (messageType, message) => {
  sockets.forEach(player => {
    player.emit(messageType, message);
  });
};

const updateGameDatas = (caseGameIndex, turn) => {
  if (currentGameboard[caseGameIndex] === '') {
    if (turn === 1) {
      currentGameboard[caseGameIndex] = 'X';
      if (isPlayerWon(caseGameIndex, currentGameboard, 'X')) {
        winner = 1;
      } else {
        turn = 2;
        gameplay = { currentGameboard, turn };
      }
    } else {
      currentGameboard[caseGameIndex] = 'O';
      if (isPlayerWon(caseGameIndex, currentGameboard, 'O')) {
        winner = 2;
      } else {
        turn = 1;
        gameplay = { currentGameboard, turn };
      }
    }
  }
};

const reset = () => {
  turn = 1;
  currentGameboard = ['', '', '', '', '', '', '', '', ''];
  winner = 0;
  gameplay = { currentGameboard, turn };
};

io.on('connection', socket => {
  sockets.push(socket);
  socketsId.push(socket.id);
  if (sockets.length > 2) {
    socket.emit('changeGameState', 'ENOUGHPLAYERS');
  } else {
    socket.on('whoAmI', () => {
      const player = socketsId.indexOf(socket.id) + 1;
      socket.emit('givePlayerName', player);
    });

    if (sockets.length === 2) {
      sockets.forEach(player => {
        player.on('caseGameChosen', ({ caseGameIndex, turn }) => {
          updateGameDatas(caseGameIndex, turn);
          if (winner != 0) {
            broadcast('winner', winner);
            broadcast('changeGameState', 'END');
            player.on('resetGame', () => {
              reset();
              broadcast('play', gameplay);
            });
          }
          broadcast('play', gameplay);
        });
      });
      broadcast('changeGameState', 'PLAY');
      broadcast('play', gameplay);
    }
  }
});

server.listen(port, () => console.log(`Listening on port ${port}`));
