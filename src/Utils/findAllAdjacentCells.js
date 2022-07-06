const findAdjacentCells = (board, row, column, array) => {
  if (row < 0 || row >= board.length || column < 0 || column >= board[0].length)
    return [];
  if (board[row][column].visited || board[row][column].type != 0) return [];

  let newBoard = board.slice();
  newBoard[row][column] = { ...newBoard[row][column], visited: true };
  findAdjacentCells(newBoard, row + 1, column, array);
  findAdjacentCells(newBoard, row, column + 1, array);
  findAdjacentCells(newBoard, row - 1, column, array);
  findAdjacentCells(newBoard, row, column - 1, array);
  array.push({ row, column });
  return array;
};

module.exports = {
  findAdjacentCells,
};
