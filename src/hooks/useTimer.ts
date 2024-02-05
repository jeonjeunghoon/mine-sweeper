import { useEffect, useState } from "react";

import { GameState } from "../store/game/state";

export const useTimer = (gameState: GameState) => {
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer = 0;

    if (gameState === "start" && !timerRunning) {
      setTimerRunning(true);
    } else if (
      (gameState === "success" || gameState === "fail") &&
      timerRunning
    ) {
      setTimerRunning(false);
    } else if (gameState === "pause") {
      clearInterval(timer);
      setTime(0);
      setTimerRunning(false);
    }

    if (timerRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [gameState, timerRunning]);

  return time;
};
