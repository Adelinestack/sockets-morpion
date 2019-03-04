import React, { PureComponent } from 'react';
import './App.css';
import {
  changeGameState,
  onPlayerConnection,
  isWinner,
  resetGame,
} from '../services/sockets';
import EnoughPlayers from './EnoughPlayers';
import Begin from './Begin';
import Game from './Game';
import EndOfGame from './EndOfGame';

class App extends PureComponent {
  state = {
    gameState: 'BEGIN',
    playerName: 0,
    winner: '',
  };

  componentDidMount() {
    changeGameState(gameState => this.setState({ gameState }));
    onPlayerConnection(playerName => {
      this.setState({ playerName });
    });
    isWinner(winner => this.setState({ winner }));
  }

  reset() {
    this.setState({ gameState: 'PLAY', winner: '' });
    resetGame();
  }

  render() {
    const { gameState, playerName, winner } = this.state;
    const gameStateComponents = {
      BEGIN: <Begin />,
      PLAY: <Game playerName={playerName} />,
      END: <EndOfGame winner={winner} reset={this.reset.bind(this)} />,
      ENOUGHPLAYERS: <EnoughPlayers />,
    };
    const color = playerName === 1 ? 'blue' : 'red';
    return (
      <div className="App">
        <header className={`App-header ${color}`}>
          <h1>Morpion</h1>
          <div>{gameStateComponents[gameState]}</div>
        </header>
      </div>
    );
  }
}

export default App;
