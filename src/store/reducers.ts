import { combineReducers } from "@reduxjs/toolkit";

import gameReduce from "./game/slice";

export const rootReducer = combineReducers({
  game: gameReduce,
});
