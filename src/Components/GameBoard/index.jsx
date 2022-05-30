import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import styled from "styled-components";
import { countBombsNearCell } from "../../Utils/bombCounter.js";
import { findAdjacentCells } from "../../Utils/findAllAdjacentCells.js";
import Cell from "../Cell";

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
          <button
            onClick={(e) => {
              let arr = [
                [1, 1, 1, 1, 1],
                [0, 0, 1, 1, 1],
                [0, 0, 0, 1, 1],
                [0, 0, 1, 0, 0],
                [1, 1, 1, 0, 0],
              ];
              console.table(arr);
              let temp = [];
              let array = findAdjacentCells(arr, 3, 3, temp);
              //intialize and fill 2d array with zeroes
              let tempBoard = [];
              for (let i = 0; i < arr.length; i++) {
                let tempRow = [];
                for (let j = 0; j < arr[i].length; j++) {
                  tempRow.push(0);
                }
                tempBoard.push(tempRow);
              }
              console.log(array);
              for (let i = 0; i < array.length; i++) {
                tempBoard[array[i].row][array[i].column] = "*";
              }
              console.table(tempBoard);
            }}
          >
            says
          </button>
        </div>
      </div>
      <Block>
        {board.map((row, rowIndex) => {
          return row.map((block, blockIndex) => {
            return (
              <Cell
                block={block}
                gameOver={gameOver}
                indeces={{ rowIndex, blockIndex }}
                board={board}
                setBoard={setBoard}
              ></Cell>
            );
          });
        })}
      </Block>
    </>
  );
}

export default GameBoard;
