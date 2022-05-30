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
  const [bombCount, setBombCount] = useState(0);
  const [flagged, setFlagged] = useState(false);

  const revealCell = (e) => {
    let tempBoard = board.slice(); // returns a copy of the board array
    if (flagged) return;
    if (block.type) {
      alert("Game Over");
      return;
    }
    let bombCount = countBombsNearCell(tempBoard, rowIndex, blockIndex);
    if (bombCount == 0) {
      let array = [];
      array = findAdjacentCells(tempBoard, rowIndex, blockIndex, array);

      for (let i = 0; i < array.length; i++) {
        let { row: r, column: c } = array[i];
        if (countBombsNearCell(tempBoard, r, c) == 0) {
          tempBoard[r][c] = {
            ...tempBoard[r][c],
            shown: true,
          };
        }
      }
    } else {
      tempBoard[rowIndex][blockIndex] = {
        ...tempBoard[rowIndex][blockIndex],
        shown: true,
      };
    }
    setBoard(tempBoard);
  };

  useEffect(() => {
    if (block.type !== 1) {
      setBombCount(countBombsNearCell(board, rowIndex, blockIndex));
    }
  }, []);
  return (
    <div
      className={`${gameOver ? styles.bomb : styles.noBomb} ${
        !block.shown && flagged && styles.flag
      }
      ${
        block.shown ? styles[bombCount] : flagged ? styles.flag : styles.noBomb
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
