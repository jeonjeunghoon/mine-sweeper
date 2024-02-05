import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GameState, initialState } from "./state";
import { generateMineMap } from "../../utils/map";

export type Position = {
  row: number;
  col: number;
};

export const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initialGameMapByClick: (
      state,
      action: PayloadAction<{ position: Position }>
    ) => {
      state.mineMap.map = generateMineMap(
        state.mineMap.size,
        state.mineMap.numberOfMine,
        action.payload.position
      );
    },

    openBlank: (state, action: PayloadAction<{ position: Position }>) => {
      const { row, col } = action.payload.position;
      state.mineMap.map[row][col].isOpen = true;
    },

    changeGameState: (state, action: PayloadAction<{ state: GameState }>) => {
      state.state = action.payload.state;
    },

    setIsMine: (state, action: PayloadAction<{ position: Position }>) => {
      const { row, col } = action.payload.position;
      state.mineMap.map[row][col].isMine = true;
    },

    updateMineMapByClickTile: (
      state,
      action: PayloadAction<{ position: Position }>
    ) => {
      const { row: clickedRow, col: clickedCol } = action.payload.position;

      if (state.mineMap.map[clickedRow][clickedCol].numberOfNearMine) {
        state.mineMap.map[clickedRow][clickedCol].isOpen = true;
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
      state.mineMap.map[row][col].isFlag = !state.mineMap.map[row][col].isFlag;
    },
  },
});

export const {
  initialGameMapByClick,
  openBlank,
  changeGameState,
  setIsMine,
  updateMineMapByClickTile,
  toggleIsFlag,
} = slice.actions;

export default slice.reducer;
