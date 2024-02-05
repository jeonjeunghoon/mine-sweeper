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

export const MINE_MAP: Record<Level, MineMap> = {
  Beginner: {
    size: {
      width: 8,
      height: 8,
    },
    numberOfMine: 10,
    numberOfFlag: 0,
    numberOfOpenedBlank: 0,
    map: initialMineMap(8, 8),
  },

  Intermediate: {
    size: {
      width: 16,
      height: 16,
    },
    numberOfMine: 40,
    numberOfFlag: 0,
    numberOfOpenedBlank: 0,
    map: initialMineMap(16, 16),
  },

  Expert: {
    size: {
      width: 32,
      height: 16,
    },
    numberOfMine: 100,
    numberOfFlag: 0,
    numberOfOpenedBlank: 0,
    map: initialMineMap(32, 16),
  },

  Custom: {
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

export const initialState: State = {
  level: "Beginner",
  state: "pause",
  mineMap: MINE_MAP["Beginner"],
};
