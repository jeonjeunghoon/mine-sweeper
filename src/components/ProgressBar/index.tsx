import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  changeGameState,
  resetMap,
  resetNumberOfFlag,
  resetNumberOfOpenedBlank,
} from "../../store/game/slice";
import { gameStateSelector } from "../../store/game/selector";

export default function ProgressBar() {
  const dispatch = useDispatch();
  const state = useSelector(gameStateSelector);

  const resetGame = () => {
    dispatch(changeGameState({ state: "pause" }));
    dispatch(resetMap());
    dispatch(resetNumberOfFlag());
    dispatch(resetNumberOfOpenedBlank());
  };

  return (
    <S.ProgressBar>
      <S.MineNumber></S.MineNumber>
      <S.Reset onClick={resetGame}>
        {state === "success" ? "😎" : state === "fail" ? "😭" : "🙂"}
      </S.Reset>
      <S.Timer></S.Timer>
    </S.ProgressBar>
  );
}

const S = {
  ProgressBar: styled.div`
    display: flex;
    justify-content: space-between;

    border-top: 2px solid #8b8b8b;
    border-left: 2px solid #8b8b8b;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
  `,

  MineNumber: styled.div`
    width: 40px;
    height: 28px;

    background-color: black;
  `,

  Reset: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;

    border-top: 2px solid white;
    border-left: 2px solid white;
    border-bottom: 2px solid #8b8b8b;
    border-right: 2px solid #8b8b8b;
    font-size: 2rem;
  `,

  Timer: styled.div`
    width: 40px;
    height: 28px;

    background-color: black;
  `,
};
