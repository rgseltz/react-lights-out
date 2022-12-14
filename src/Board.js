import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=6, ncols=6, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  const reset = () => {
    setBoard(createBoard())
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      initialBoard[y] = new Array();
      for (let x = 0; x < ncols; x++) {
        initialBoard[y][x] = Math.random() < .5
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // board.map(ar => ar.every(val => val === true ? true : false) === true ? true : false).every(val => val);  

    for(let y = 0; y < board.length; y++){
      for (let x = 0; x < board[y].length; x++){
        if (!board[y][x]) {
          return false;
        } 
      }
    }
    return true;
  }

  function flipCellsAroundMe(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let deepCopy = JSON.parse(JSON.stringify(oldBoard))
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, deepCopy)
      return deepCopy;
      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  
  // TODO
  // make table board
return (
<div className="Board">
<button onClick={reset}>Reset Game</button>
  <h1 className="Board-header">Lights Out!</h1>
  {hasWon() ? <h2>You Won!!</h2> : null}
 <table className="Board-container"> {board.map((ar, y) => <tr data-y={y}>{ar.map((e, x) => <Cell y={y} x={x} isLit={e} flipCellsAroundMe={flipCellsAroundMe}/>)}</tr>)}</table>
</div>)
  // TODO
}

export default Board;
