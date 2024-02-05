import { RootState } from "..";

export const gameMineMapSelector = (state: RootState) => state.game.mineMap.map;

export const gameSizeSelector = (state: RootState) => state.game.mineMap.size;

export const gameStateSelector = (state: RootState) => state.game.state;
