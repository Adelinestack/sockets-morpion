import React, { PureComponent } from 'react';
import { gameDatas, caseGameIsChosen } from '../services/sockets';
import './game.css';

export default class Game extends PureComponent {
  state = {
    currentGameboard: [],
    turn: '',
  };

  componentDidMount() {
    gameDatas(({ currentGameboard, turn }) =>
      this.setState({ currentGameboard, turn })
    );
  }

  onCaseGameChosen(caseGameIndex) {
    caseGameIsChosen(caseGameIndex, this.state.turn, this.props.playerName);
  }

  render() {
    const { currentGameboard, turn } = this.state;
    const gameboard = currentGameboard.map((gameCase, index) => (
      <div
        className="game-case"
        onClick={this.onCaseGameChosen.bind(this, index)}
      >
        {currentGameboard[index]}
      </div>
    ));
    return (
      <div>
        <div>
          <p>Game</p>
          <p>Player {turn}, it's your turn !</p>
        </div>
        <div className="game-container">{gameboard}</div>
      </div>
    );
  }
}
