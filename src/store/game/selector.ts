import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const gameMineMapSelector = (state: RootState) => state.game.mineMap.map;

export const gameSizeSelector = (state: RootState) => state.game.mineMap.size;

export const gameStateSelector = (state: RootState) => state.game.state;

export const numberOfMineSelector = (state: RootState) =>
  state.game.mineMap.numberOfMine;

export const numberOfFlagSelector = (state: RootState) =>
  state.game.mineMap.numberOfFlag;

export const selectViewNumberOfMine = createSelector(
  [numberOfMineSelector, numberOfFlagSelector],
  (numberOfMine, numberOfFlag) => numberOfMine - numberOfFlag
);
