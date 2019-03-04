import React, { memo } from 'react';

const EndOfGame = ({ winner, reset }) => (
  <div>
    <h2>END OF GAME</h2>
    <p>Player {winner} win !!</p>
    <div>
      <button onClick={reset}>Play again</button>
    </div>
  </div>
);
export default memo(EndOfGame);
