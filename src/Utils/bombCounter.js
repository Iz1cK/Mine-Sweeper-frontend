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
  // let bombCount = { count: 0, cells: [] };
  // //Position of cells around tempBoard[i][a] relative to tempBoard[i][a]
  // for (let y = -1; y < 2; y++) {
  //   for (let x = -1; x < 2; x++) {
  //     //Storing x and y test polets
  //     let testX = column + x; //testX = i-1, i, and i+1
  //     let testY = column + y; //testY = i-1, y, and y+1

  //     //If the testX and testY values are within the range of the array
  //     if (
  //       testX >= 0 &&
  //       testX < tempBoard[0].length &&
  //       testY >= 0 &&
  //       testY < tempBoard.length
  //     ) {
  //       //If there is a mine
  //       if (tempBoard[testX][testY].type == 1) {
  //         bombCount.count += 1;
  //         bombCount.cells.push(tempBoard[testX][testY]);
  //       }
  //     }
  //   }
  // }
  return bombCount;
};

module.exports = {
  countBombsNearCell,
};
