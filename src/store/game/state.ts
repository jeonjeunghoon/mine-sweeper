import { generateInitialGameMap } from "../../utils/map";

export type Map = number[][];

export type Level = "Beginner" | "Intermediate" | "Expert" | "Custom";

type State = {
  level: Level;
  map: Map;
  size: {
    row: number;
    col: number;
  };
  mine: number;
};

export const initialState: State = {
  level: "Beginner",
  map: generateInitialGameMap({ row: 8, col: 8 }),
  size: {
    row: 8,
    col: 8,
  },
  mine: 10,
};
