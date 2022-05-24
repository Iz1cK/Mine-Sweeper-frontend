import React, { useState, useEffect, useId } from "react";
import styles from "./styles.module.css";
import styled from "styled-components";

function GameBoard(props) {
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState({ width: 9, height: 9 });
  const [minesAmount, setMinesAmount] = useState(10);
  const [data, setData] = useState({ width: 9, height: 9, minesAmount: 10 });

  useEffect(() => {
    console.log("useEffect");
    setBoard(generateBoard(10));
    return () => console.log("unmount");
  }, []);

  //   useEffect(() => {
  //     console.log(board);
  //   }, [board]);

  const generateBoard = () => {
    let tempBoard = [];
    let tempRow = [];
    for (let i = 0; i < boardSize.height; i++) {
      tempRow = [];
      for (let j = 0; j < boardSize.width; j++) {
        tempRow.push(0);
      }
      tempBoard.push(tempRow);
    }
    for (let i = 0; i < minesAmount; i++) {
      let [x, y] = getRandomPosition();
      while (tempBoard[x][y]) {
        console.log(1);
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

  const revealCell = (type) => (e) => {
    console.log(type);
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
    width: 50vw;
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
              setBoardSize({ height: data.height, width: data.width });
              setMinesAmount(data.minesAmount);
              setTimeout(() => setBoard(generateBoard()), 100);
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
                className={`${styles.bomb} ${styles.cell}`}
                onClick={revealCell(1)}
                onContextMenu={flagCell}
                key={rowIndex * 2 + blockIndex}
              >
                B
              </div>
            ) : (
              <div
                className={`${styles.noBomb} ${styles.cell}`}
                onClick={revealCell(0)}
                onContextMenu={flagCell}
                key={rowIndex * 2 + blockIndex}
              >
                N
              </div>
            );
          });
        })}
      </Block>
    </>
  );
}

export default GameBoard;
