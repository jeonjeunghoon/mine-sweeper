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
  toggleIsFlag,
} = slice.actions;

export default slice.reducer;
