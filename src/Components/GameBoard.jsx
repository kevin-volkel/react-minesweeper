import React, { useState, useEffect } from "react";
import { BsFlagFill } from "react-icons/bs";

const GameBoard = ({ finalHeight, finalWidth, finalBombs }) => {
  const [numClicks, setNumClicks] = useState(0);
  const [board, setBoard] = useState([]);

  const createBoard = () => {
    //creates the board
    let board = [];
    for (let i = 0; i < finalHeight; i++) {
      board.push([]);
      for (let j = 0; j < finalWidth; j++) {
        board[i].push({
          isBomb: false,
          isFlagged: false,
          isRevealed: false,
          isEmpty: false,
          value: 0,
        });
      }
    }

    //add the bombs to the board
    for (let i = 0; i < finalBombs; i++) {
      let col = Math.floor(Math.random() * finalWidth);
      let row = Math.floor(Math.random() * finalHeight);
      console.log(`X: ${col} Y: ${row}`);
      if (!board[row][col].isBomb) {
        board[row][col].isBomb = true;
        let [left, right, top, bottom] = [false, false, false, false];

        if (col === 0) left = true;
        if (col === finalWidth - 1) right = true;
        if (row === 0) top = true;
        if (row === finalHeight - 1) bottom = true;

        if (!top) board[row - 1][col].value++;
        if (!top & !right) board[row - 1][col + 1].value++;
        if (!top & !left) board[row - 1][col - 1].value++;
        if (!bottom) board[row + 1][col].value++;
        if (!bottom && !right) board[row + 1][col + 1].value++;
        if (!bottom && !left) board[row + 1][col - 1].value++;
        if (!left) board[row][col - 1].value++;
        if (!right) board[row][col + 1].value++;
      } else {
        i--;
      }
    }

    //mark the ones with no value as 'empty'
    for (let i = 0; i < finalHeight; i++) {
      for (let j = 0; j < finalWidth; j++) {
        if (board[i][j].value === 0 && !board[i][j].isBomb) {
          board[i][j].isEmpty = true;
        }
      }
    }

    console.log(`Board Generated`);
    setBoard(board);
    return board;
  };

  const revealSurrounding = (row, col) => {
    let [left, right, top, bottom] = [false, false, false, false];
    if (col === 0) left = true;
    if (col === finalWidth - 1) right = true;
    if (row === 0) top = true;
    if (row === finalHeight - 1) bottom = true;

    if (!top) board[row - 1][col].isRevealed = !board[row - 1][col].isFlagged;
    if (!top & !right)
      board[row - 1][col + 1].isRevealed = !board[row - 1][col + 1].isFlagged;
    if (!top & !left)
      board[row - 1][col - 1].isRevealed = !board[row - 1][col - 1].isFlagged;
    if (!bottom)
      board[row + 1][col].isRevealed = !board[row + 1][col].isFlagged;
    if (!bottom && !right)
      board[row + 1][col + 1].isRevealed = !board[row + 1][col + 1].isFlagged;
    if (!bottom && !left)
      board[row + 1][col - 1].isRevealed = !board[row + 1][col - 1].isFlagged;
    if (!left) board[row][col - 1].isRevealed = !board[row][col - 1].isFlagged;
    if (!right) board[row][col + 1].isRevealed = !board[row][col + 1].isFlagged;
  };

  const checkForEmptyFields = () => {
    for (let i = 0; i <= finalWidth * finalHeight; i++) {
      for (let row = 0; row < finalHeight; row++) {
        for (let col = 0; col < finalWidth; col++) {
          if (board[row][col].isEmpty) {
            revealSurrounding(row, col);
          }
        }
      }
    }
  };

  const handleClick = (e) => {
    const { id } = e.target;
    const row = Number(id.substring(0, 2));
    const col = Number(id.substring(2, 4));
    const cell = board[row][col];
    if (cell.isFlagged || cell.isRevealed) return;
    setNumClicks(numClicks + 1);
    console.log(`Row: ${row} Col: ${col} Click: ${numClicks}`);
    if (!cell.isEmpty && numClicks === 0) {
      for (let i = 1; ; i++) {
        console.log(i);
        let newBoard = createBoard();
        console.log(newBoard);
        if (newBoard[row][col].isEmpty) break;
      }
    } else if (cell.isBomb) {
      console.log("Game Over");
      // gameOver()
    }
    if (cell.value > 0) cell.isRevealed = true;
    if (cell.isEmpty) {
      cell.isRevealed = true;
      checkForEmptyFields();
    }
  };

  const flagCell = (e) => {
    e.preventDefault();
    console.log(e.target);
    let id = 0;
    if (e.target.classList.contains("cell")) {
      id = e.target.id;
    } else if (e.target.classList.contains("svg")) {
      id = e.target.parentElement.id;
    } else {
      id = e.target.parentElement.parentElement.id;
    }
    const row = Number(id.substring(0, 2));
    const col = Number(id.substring(2, 4));
    if (!board[row][col].isRevealed) {
      let copy = [...board];
      copy[row][col].isFlagged = !copy[row][col].isFlagged;
      console.log(
        copy[row][col].isFlagged
          ? `flagged ${row} ${col}`
          : `unflagged ${row} ${col}`
      );
      setBoard(copy);
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  const fillCell = (cell, mode = "normal") => {
    if (cell.isFlagged) return <BsFlagFill className="svg" />;
    if (mode === "dev") {
      if (cell.isBomb) return "B";
      if (cell.isEmpty) return "";
      return cell.value;
    }
    if (mode === "normal" && cell.isRevealed) {
      if (cell.isEmpty) return "";
      if (cell.isBomb) return "B";
      return cell.value;
    }
  };

  return (
    <div className="game-board">
      <div className="game-grid">
        {board.map((row, rowNum) => {
          return (
            <div className="row" key={rowNum}>
              {row.map((cell, colNum) => {
                return (
                  <div
                    key={colNum}
                    className={`cell ${cell.isRevealed && "revealed"}`}
                    id={`${rowNum < 10 ? `0${rowNum}` : rowNum}${
                      colNum < 10 ? `0${colNum}` : colNum
                    }`}
                    onClick={handleClick}
                    onContextMenu={flagCell}
                  >
                    {fillCell(cell, "normal")}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
