const { solutions } = require('./const');

const isPlayerWon = (caseGameIndex, gameboard, playerSign) => {
  const solutionsToWin = solutions.filter(solution =>
    solution.includes(caseGameIndex)
  );
  const isPlayerHasASolution = solutionsToWin.map(solution =>
    solution.every(value => gameboard[value] === playerSign)
  );
  return isPlayerHasASolution.find(caseGame => caseGame === true);
};

module.exports = { isPlayerWon };
