import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GameState, initialState, Level, MINE_MAP } from "./state";
import { generateMineMap, initialMineMap } from "../../utils/map";

export type CustomMap = {
  width: string;
  height: string;
  numberOfMine: string;
};

export type Position = {
  row: number;
  col: number;
};

export const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetMap: (state) => {
      state.mineMap.map = initialMineMap(
        state.mineMap.size.width,
        state.mineMap.size.height
      );
    },

    resetNumberOfFlag: (state) => {
      state.mineMap.numberOfFlag = 0;
    },

    resetNumberOfOpenedBlank: (state) => {
      state.mineMap.numberOfOpenedBlank = 0;
    },

    initialMineMapByClick: (
      state,
      action: PayloadAction<{ position: Position }>
    ) => {
      state.mineMap.map = generateMineMap(
        state.mineMap.size,
        state.mineMap.numberOfMine,
        action.payload.position
      );

      console.log(state.mineMap.numberOfMine);
    },

    openBlank: (state, action: PayloadAction<{ position: Position }>) => {
      const { row, col } = action.payload.position;
      state.mineMap.map[row][col].isOpen = true;
      state.mineMap.numberOfOpenedBlank += 1;
    },

    changeGameState: (state, action: PayloadAction<{ state: GameState }>) => {
      state.state = action.payload.state;
    },

    updateMineMapByClickTile: (
      state,
      action: PayloadAction<{ position: Position }>
    ) => {
      const position = action.payload.position;
      const { row: clickedRow, col: clickedCol } = position;

      if (state.mineMap.map[clickedRow][clickedCol].numberOfNearMine) {
        state.mineMap.map[clickedRow][clickedCol].isOpen = true;
        state.mineMap.numberOfOpenedBlank++;
        return;
      }

      const openBlankTilesRecursively = (row: number, col: number) => {
        if (
          row < 0 ||
          col < 0 ||
          row >= state.mineMap.size.height ||
          col >= state.mineMap.size.width ||
          state.mineMap.map[row][col].isOpen ||
          state.mineMap.map[row][col].isMine
        ) {
          return;
        }

        state.mineMap.map[row][col].isOpen = true;
        state.mineMap.numberOfOpenedBlank++;

        if (state.mineMap.map[row][col].numberOfNearMine) return;

        for (let r = -1; r < 2; r++) {
          for (let c = -1; c < 2; c++) {
            openBlankTilesRecursively(row + r, col + c);
          }
        }
      };

      openBlankTilesRecursively(clickedRow, clickedCol);
    },

    toggleIsFlag: (state, action: PayloadAction<{ position: Position }>) => {
      const { row, col } = action.payload.position;
      const flag = !state.mineMap.map[row][col].isFlag;
      state.mineMap.map[row][col].isFlag = flag;

      if (flag) state.mineMap.numberOfFlag++;
      else state.mineMap.numberOfFlag--;
    },

    checkSuccessCondition: (state) => {
      const { height, width } = state.mineMap.size;
      const numberOfMine = state.mineMap.numberOfMine;
      const numberOfOpenedBlank = state.mineMap.numberOfOpenedBlank;

      if (height * width - numberOfMine - numberOfOpenedBlank === 0)
        state.state = "success";
    },

    changeLevel: (state, action: PayloadAction<{ level: Level }>) => {
      state.level = action.payload.level;
      state.mineMap = MINE_MAP[action.payload.level];
    },

    setCustomMap: (
      state,
      action: PayloadAction<{
        customMap: CustomMap;
      }>
    ) => {
      state.level = "Custom";
      state.mineMap.size.width = Number(action.payload.customMap.width);
      state.mineMap.size.height = Number(action.payload.customMap.height);
      state.mineMap.numberOfMine = Number(
        action.payload.customMap.numberOfMine
      );
    },
  },
});

export const {
  resetMap,
  resetNumberOfFlag,
  resetNumberOfOpenedBlank,
  initialMineMapByClick,
  openBlank,
  changeGameState,
  updateMineMapByClickTile,
  toggleIsFlag,
  checkSuccessCondition,
  changeLevel,
  setCustomMap,
} = slice.actions;

export default slice.reducer;
