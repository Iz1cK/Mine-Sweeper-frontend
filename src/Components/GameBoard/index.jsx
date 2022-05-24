import React, { useState, useEffect, useId } from "react";
import styles from "./styles.module.css";
import styled from "styled-components";

function GameBoard(props) {
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState({ width: 9, height: 9 });
  const [minesAmount, setMinesAmount] = useState(10);
  const [data, setData] = useState({ width: 9, height: 9, minesAmount: 10 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    setBoard(generateBoard(9, 9, 10));
    return () => console.log("unmount");
  }, []);

  //   useEffect(() => {
  //     console.log(board);
  //   }, [board]);

  const generateBoard = (width, height, mines) => {
    let tempBoard = [];
    let tempRow = [];
    for (let i = 0; i < width; i++) {
      tempRow = [];
      for (let j = 0; j < height; j++) {
        tempRow.push(0);
      }
      tempBoard.push(tempRow);
    }
    console.log(tempBoard);
    for (let i = 0; i < mines; i++) {
      let [x, y] = getRandomPosition();
      while (tempBoard[x][y]) {
        [x, y] = getRandomPosition();
      }
      tempBoard[x][y] = 1;
    }
    return tempBoard;
  };

  const getRandomPosition = () => {
    let x = Math.floor(Math.random() * boardSize.width);
    let y = Math.floor(Math.random() * boardSize.height);
    return [x, y];
  };

  const revealCell = (type, row, column) => (e) => {
    console.log("type: " + type);
    console.log("row: " + row);
    console.log("column: " + column);
    console.log("board[row][column]:" + board[row][column]);
    if (board[row][column]) {
      alert("Game Over");
    }

    //a[row][column]
  };

  const flagCell = (e) => {
    e.preventDefault();
    console.log("Left click");
  };

  const Block = styled.div`
    margin: auto;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(${boardSize.width}, 1fr);
    grid-template-rows: repeat(${boardSize.height}, 1fr);
    width: 400px;
    cursor: pointer;
    user-select: none;
  `;

  const Bomb = styled.div`
    background-color: red;
    border: 2px solid black;
  `;
  const Blank = styled.div`
    background-color: grey;
    border: 2px solid black;
  `;

  return (
    <>
      <div>
        <div>
          <label for="width">Width: </label>
          <input
            type="text"
            value={data.width}
            id="width"
            onChange={(e) => {
              setData({ ...data, width: e.target.value });
            }}
          ></input>
          <label for="height">Height: </label>
          <input
            type="text"
            value={data.height}
            id="height"
            onChange={(e) => {
              setData({ ...data, height: e.target.value });
            }}
          ></input>
          <label for="mines">Mines: </label>
          <input
            type="text"
            value={data.minesAmount}
            id="mines"
            onChange={(e) => {
              setData({ ...data, minesAmount: e.target.value });
            }}
          ></input>
          <button
            onClick={(e) => {
              setGameOver(false);
              setBoardSize({ height: data.height, width: data.width });
              setMinesAmount(data.minesAmount);
              setBoard(
                generateBoard(data.height, data.width, data.minesAmount)
              );
            }}
          >
            Change
          </button>
        </div>
      </div>
      <Block>
        {board.map((row, rowIndex) => {
          return row.map((block, blockIndex) => {
            return block == 1 ? (
              <div
                className={`${styles.cell} ${
                  gameOver ? styles.bomb : styles.noBomb
                }`}
                onClick={revealCell(1, rowIndex, blockIndex)}
                onContextMenu={flagCell}
                key={rowIndex * 2 + blockIndex}
              ></div>
            ) : (
              <div
                className={`${styles.noBomb} ${styles.cell}`}
                onClick={revealCell(0, rowIndex, blockIndex)}
                onContextMenu={flagCell}
                key={rowIndex * 2 + blockIndex}
              ></div>
            );
          });
        })}
      </Block>
    </>
  );
}

export default GameBoard;
