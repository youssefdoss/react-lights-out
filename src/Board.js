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

function Board({
  nrows = 5,
  ncols = 5,
  chanceLightStartsOn = .5,
}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // let initialBoard = [];
    return Array.from({ length: nrows })
      .map(r => Array.from({ length: ncols })
      .map(cell => Math.random() < chanceLightStartsOn))

    // return initialBoard;
  }

  /*iterate through the matrix with every. If it finds any true,
  it will return false.**/
  function hasWon() {
    return board.every(r => r.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = [...oldBoard];

      flipCell(y, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) return <div>You Win!</div>;

  // make table board
  const tableBoard = board.map((r, y) => r.map((cell, x) => {
    let coord = `${y}-${x}`;
    return (
    <Cell
      key={coord}
      flipCellsAroundMe={evt => flipCellsAround(coord)}
      isLit={cell}
    />);
  }));

  return (
    <table>
      <tbody>{tableBoard.map((r, i) => <tr key={i}>{r}</tr>)}</tbody>
    </table>
  );
}

export default Board;
