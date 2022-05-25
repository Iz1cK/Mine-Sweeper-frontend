const countBombsNearCell = (tempBoard, row, column) => {
  let bombCount = 0;
  if (row === tempBoard.length - 1) {
    if (column === 0) {
      bombCount += tempBoard[row - 1][column].type === 1 ? 1 : 0;
      bombCount += tempBoard[row - 1][column + 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row][column + 1].type === 1 ? 1 : 0;
    } else if (column === tempBoard[0].length - 1) {
      bombCount += tempBoard[row - 1][column].type === 1 ? 1 : 0;
      bombCount += tempBoard[row - 1][column - 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row][column - 1].type === 1 ? 1 : 0;
    } else {
      bombCount += tempBoard[row - 1][column].type === 1 ? 1 : 0;
      bombCount += tempBoard[row - 1][column - 1].type === 1 ? 1 : 0;
      bombCount += tempBoard[row - 1][column + 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row][column + 1].type === 1 ? 1 : 0;
      bombCount += tempBoard[row][column - 1].type === 1 ? 1 : 0;
    }
  } else if (row === 0) {
    if (column === 0) {
      bombCount += tempBoard[row][column + 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row + 1][column + 1].type === 1 ? 1 : 0;
      bombCount += tempBoard[row + 1][column].type === 1 ? 1 : 0;
    } else if (column === tempBoard[0].length - 1) {
      bombCount += tempBoard[row + 1][column - 1].type === 1 ? 1 : 0;
      bombCount += tempBoard[row + 1][column].type === 1 ? 1 : 0;

      bombCount += tempBoard[row][column - 1].type === 1 ? 1 : 0;
    } else {
      bombCount += tempBoard[row + 1][column].type === 1 ? 1 : 0;
      bombCount += tempBoard[row + 1][column - 1].type === 1 ? 1 : 0;
      bombCount += tempBoard[row + 1][column + 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row][column + 1].type === 1 ? 1 : 0;
      bombCount += tempBoard[row][column - 1].type === 1 ? 1 : 0;
    }
  } else {
    if (column === 0) {
      bombCount += tempBoard[row - 1][column].type === 1 ? 1 : 0;
      bombCount += tempBoard[row - 1][column + 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row][column + 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row + 1][column].type === 1 ? 1 : 0;
      bombCount += tempBoard[row + 1][column + 1].type === 1 ? 1 : 0;
    } else if (column === tempBoard[0].length - 1) {
      bombCount += tempBoard[row - 1][column].type === 1 ? 1 : 0;
      bombCount += tempBoard[row - 1][column - 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row][column - 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row + 1][column - 1].type === 1 ? 1 : 0;
      bombCount += tempBoard[row + 1][column].type === 1 ? 1 : 0;
    } else {
      bombCount += tempBoard[row - 1][column - 1].type === 1 ? 1 : 0;
      bombCount += tempBoard[row - 1][column].type === 1 ? 1 : 0;
      bombCount += tempBoard[row - 1][column + 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row][column + 1].type === 1 ? 1 : 0;
      bombCount += tempBoard[row][column - 1].type === 1 ? 1 : 0;

      bombCount += tempBoard[row + 1][column - 1].type === 1 ? 1 : 0;
      bombCount += tempBoard[row + 1][column].type === 1 ? 1 : 0;
      bombCount += tempBoard[row + 1][column + 1].type === 1 ? 1 : 0;
    }
  }
  return bombCount;
};

module.exports = {
  countBombsNearCell,
};
