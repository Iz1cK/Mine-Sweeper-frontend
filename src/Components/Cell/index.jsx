import { useEffect, useState } from "react";
import { countBombsNearCell } from "../../Utils/bombCounter.js";
import { findAdjacentCells } from "../../Utils/findAllAdjacentCells.js";
import styles from "../GameBoard/styles.module.css";

function Cell({
  gameOver,
  indeces: { rowIndex, blockIndex },
  block,
  board,
  setBoard,
}) {
  // const [bombCount, setBombCount] = useState(0);
  const [flagged, setFlagged] = useState(false);

  const revealCell = (e) => {
    console.log("hi");
    if (flagged) return;
    if (block.type == 1) {
      alert("Game Over");
      return;
    }
    let tempBoard = board.slice(); // returns a copy of the board array
    let bombCount = countBombsNearCell(tempBoard, rowIndex, blockIndex);
    console.log(bombCount);
    if (bombCount == 0) {
      console.log("hi2");
      let array = [];
      array = findAdjacentCells(tempBoard, rowIndex, blockIndex, array);
      console.log(array);
      for (let i = 0; i < array.length; i++) {
        let { row: r, column: c } = array[i];
        let bomb = countBombsNearCell(tempBoard, r, c);
        tempBoard[r][c] = {
          ...tempBoard[r][c],
          shown: true,
          count: bomb,
        };
      }
    } else {
      tempBoard[rowIndex][blockIndex] = {
        ...tempBoard[rowIndex][blockIndex],
        shown: true,
        count: bombCount,
      };
    }
    setBoard(tempBoard);
  };

  // useEffect(() => {
  //   if (block.type !== 1) {
  //     setBombCount(countBombsNearCell(board, rowIndex, blockIndex));
  //   }
  // }, []);
  return (
    <div
      className={`${gameOver ? styles.bomb : styles.noBomb} ${
        !board[rowIndex][blockIndex].shown && flagged && styles.flag
      }
      ${
        block.shown
          ? styles[board[rowIndex][blockIndex].count]
          : flagged
          ? styles.flag
          : styles.noBomb
      }`}
      onClick={revealCell}
      onContextMenu={(e) => {
        e.preventDefault();
        if (!block.shown) setFlagged(!flagged);
      }}
      key={rowIndex * 2 + blockIndex}
    ></div>
  );
}

export default Cell;
