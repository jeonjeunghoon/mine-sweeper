import { initialMineMap } from "../../utils/map";
import { Position } from "./slice";

export type Level = "Beginner" | "Intermediate" | "Expert" | "Custom";

export type GameState = "pause" | "start" | "success" | "fail";

export type Size = {
  width: number;
  height: number;
};

export type Blank = {
  isOpen: boolean;
  position: Position;
  isMine: boolean;
  isFlag: boolean;
  numberOfNearMine: number;
};

type MineMap = {
  size: Size;
  map: Blank[][];
  numberOfMine: number;
  numberOfFlag: number;
  numberOfOpenedBlank: number;
};

type State = {
  level: Level;
  state: GameState;
  mineMap: MineMap;
};

export const initialState: State = {
  level: "Beginner",
  state: "pause",
  mineMap: {
    size: {
      width: 8,
      height: 8,
    },
    numberOfMine: 10,
    numberOfFlag: 0,
    numberOfOpenedBlank: 0,
    map: initialMineMap(8, 8),
  },
};
