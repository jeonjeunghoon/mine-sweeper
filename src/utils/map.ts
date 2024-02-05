import { Position } from "../store/game/slice";

export const generateRandomBinary = () => {
  return Math.floor(Math.random() * 2);
};

export const generateInitialGameMap = (size: Position) =>
  Array.from({ length: size.col }, () => Array(size.row).fill(0));

export const generateGameMap = (
  size: Position,
  mine: number,
  position: Position
) => {
  const map = generateInitialGameMap(size);

  const { row: clickedRow, col: clickedCol } = position;

  let i = 0;
  while (i < mine) {
    const randomRow = Math.floor(Math.random() * size.row);
    const randomCol = Math.floor(Math.random() * size.col);
    const isMine = map[randomCol][randomRow] === 1;
    const clicked = randomRow === clickedRow && randomCol === clickedCol;

    if (isMine || clicked) continue;

    map[randomCol][randomRow] = 1;
    i++;
  }

  return map;
};
