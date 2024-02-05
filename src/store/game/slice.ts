import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./state";
import { generateGameMap } from "../../utils/map";

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
      state.map = generateGameMap(
        state.size,
        state.mine,
        action.payload.position
      );
    },
  },
});

export const { initialGameMapByClick } = slice.actions;

export default slice.reducer;
