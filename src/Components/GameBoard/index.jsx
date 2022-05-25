import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import styled from "styled-components";
import { countBombsNearCell } from "../../Utils/bombCounter.js";

function GameBoard(props) {
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState({ width: 9, height: 9 });
  const [minesAmount, setMinesAmount] = useState(10);
  const [data, setData] = useState({
    width: 9,
    height: 9,
    minesAmount: 10,
    board: [],
  });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let startingBoard = generateBoard(9, 9, 10);
    console.table(startingBoard.map((cell) => cell.map((one) => one.type)));
    setBoard(startingBoard);
    return () => console.log("unmount");
  }, []);

  useEffect(() => {
    console.table(board.map((cell) => cell.map((one) => one.type)));
  }, [board]);

  const generateBoard = (width, height, mines) => {
    let tempBoard = [];
    let tempRow = [];
    for (let i = 0; i < width; i++) {
      tempRow = [];
      for (let j = 0; j < height; j++) {
        tempRow.push({
          type: 0,
          flagged: false,
          shown: false,
          img: "https://minesweeper.online/img/skins/hd/closed.svg?v=2",
        });
      }
      tempBoard.push(tempRow);
    }

    for (let i = 0; i < mines; i++) {
      let [x, y] = getRandomPosition();
      while (tempBoard[x][y].type) {
        [x, y] = getRandomPosition();
      }
      tempBoard[x][y] = {
        type: 1,
        flagged: false,
        shown: false,
        img: "https://minesweeper.online/img/skins/hd/closed.svg?v=2",
      };
    }
    return tempBoard;
  };

  const getRandomPosition = () => {
    let x = Math.floor(Math.random() * boardSize.width);
    let y = Math.floor(Math.random() * boardSize.height);
    return [x, y];
  };

  const revealCell = (type, row, column) => (e) => {
    let tempBoard = board.slice(); // returns a copy of the board array
    if (tempBoard[row][column].flagged) return;
    if (type) {
      alert("Game Over");
      return;
    }
    let bombCount = countBombsNearCell(tempBoard, row, column);
    console.log(bombCount);
    tempBoard[row][column] = {
      ...tempBoard[row][column],
      shown: true,
      img: `https://minesweeper.online/img/skins/hd/type${bombCount}.svg`,
    };
    setBoard(tempBoard);
  };

  const flagCell = (type, row, column) => (e) => {
    e.preventDefault();
    let tempBoard = board.slice(); // returns a copy of the board array
    tempBoard[row][column] = {
      ...tempBoard[row][column],
      flagged: !tempBoard[row][column].flagged,
      img: !tempBoard[row][column].flagged
        ? "https://minesweeper.online/img/skins/hd/flag.svg?v=2"
        : "https://minesweeper.online/img/skins/hd/closed.svg?v=2",
    };
    setBoard(tempBoard);
  };

  const Block = styled.div`
    margin: auto;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(${boardSize.width}, 1fr);
    grid-template-rows: repeat(${boardSize.height}, 1fr);
    width: 200px;
    height: 200px;
    cursor: pointer;
    user-select: none;
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
            return block.type === 1 ? (
              <div
                className={`${gameOver ? styles.bomb : styles.noBomb} ${
                  !block.shown && block.flagged && styles.flag
                }`}
                onClick={revealCell(1, rowIndex, blockIndex)}
                onContextMenu={flagCell(1, rowIndex, blockIndex)}
                style={{
                  background: `url(${block.img}) center center / cover no-repeat`,
                }}
                key={rowIndex * 2 + blockIndex}
              ></div>
            ) : (
              <div
                className={`${styles.noBomb} ${
                  !block.shown && block.flagged && styles.flag
                }`}
                onClick={revealCell(0, rowIndex, blockIndex)}
                onContextMenu={flagCell(0, rowIndex, blockIndex)}
                style={{
                  background: `url(${block.img}) center center / cover no-repeat`,
                }}
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
