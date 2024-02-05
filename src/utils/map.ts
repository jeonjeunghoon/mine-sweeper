import { Position } from "../store/game/slice";
import { Blank, Size } from "../store/game/state";

export const initialMineMap = (height: number, width: number): Blank[][] => {
  return Array.from({ length: height }, (_, rowIndex) =>
    Array.from({ length: width }, (_, colIndex) => {
      return {
        isOpen: false,
        position: {
          row: rowIndex,
          col: colIndex,
        },
        isMine: false,
        isFlag: false,
        numberOfNearMine: 0,
      };
    })
  );
};

export const generateMineMap = (
  size: Size,
  numberOfMine: number,
  clickedPosition: Position
) => {
  const { height, width } = size;
  const { row: clickedRow, col: clickedCol } = clickedPosition;

  const mineMap = initialMineMap(height, width);

  let mine = 0;
  while (mine < numberOfMine) {
    const randomRow = Math.floor(Math.random() * height);
    const randomCol = Math.floor(Math.random() * width);
    const isClicked = randomRow === clickedRow && randomCol === clickedCol;

    if (mineMap[randomCol][randomRow].isMine || isClicked) continue;

    mineMap[randomCol][randomRow].isMine = true;
    mine++;
  }

  for (let col = 0; col < width; col++) {
    for (let row = 0; row < height; row++) {
      if (mineMap[col][row].isMine) continue;

      let nearMineCount = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const newRow = row + dx;
          const newCol = col + dy;

          if (
            newRow >= 0 &&
            newCol >= 0 &&
            newRow < height &&
            newCol < width &&
            mineMap[newCol][newRow].isMine
          ) {
            nearMineCount++;
          }
        }
      }

      mineMap[col][row].numberOfNearMine = nearMineCount;
    }
  }

  return mineMap;
};
