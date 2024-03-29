import { Position } from "../store/game/slice";
import { Blank, Size } from "../store/game/state";

export const initialMineMap = (width: number, height: number): Blank[][] => {
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
  const { width, height } = size;
  const { row: clickedRow, col: clickedCol } = clickedPosition;

  const mineMap = initialMineMap(width, height);

  let mine = 0;
  while (mine < numberOfMine) {
    const randomRow = Math.floor(Math.random() * height);
    const randomCol = Math.floor(Math.random() * width);
    const isClicked = randomRow === clickedRow && randomCol === clickedCol;

    if (mineMap[randomRow][randomCol].isMine || isClicked) continue;

    mineMap[randomRow][randomCol].isMine = true;
    mine++;
  }

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (mineMap[row][col].isMine) continue;

      let nearMineCount = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const newRow = row + dy;
          const newCol = col + dx;

          if (
            newRow >= 0 &&
            newCol >= 0 &&
            newRow < height &&
            newCol < width &&
            mineMap[newRow][newCol].isMine
          ) {
            nearMineCount++;
          }
        }
      }

      mineMap[row][col].numberOfNearMine = nearMineCount;
    }
  }

  return mineMap;
};
