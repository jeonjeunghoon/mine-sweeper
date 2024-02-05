import { MouseEvent } from "react";

import styled from "@emotion/styled";

import { useDispatch, useSelector } from "react-redux";
import {
  Position,
  changeGameState,
  checkSuccessCondition,
  initialMineMapByClick,
  openBlank,
  toggleIsFlag,
  updateMineMapByClickTile,
} from "../../store/game/slice";
import { gameStateSelector } from "../../store/game/selector";
import { Blank } from "../../store/game/state";

export default function Tile({
  position,
  isOpen,
  isMine,
  isFlag,
  numberOfNearMine,
}: Blank) {
  const dispatch = useDispatch();
  const state = useSelector(gameStateSelector);

  const handleBlackClick = (position: Position) => {
    if (isFlag) return;

    if (state === "pause") {
      dispatch(changeGameState({ state: "start" }));
      dispatch(initialMineMapByClick({ position }));
      dispatch(updateMineMapByClickTile({ position }));
      dispatch(checkSuccessCondition());
    }

    if (state === "start") {
      if (isMine) {
        dispatch(openBlank({ position }));
        dispatch(changeGameState({ state: "fail" }));
      } else {
        dispatch(updateMineMapByClickTile({ position }));
        dispatch(checkSuccessCondition());
      }
    }
  };

  const renderFlag = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (state === "pause") {
      dispatch(changeGameState({ state: "start" }));
      dispatch(initialMineMapByClick({ position }));
    }

    dispatch(toggleIsFlag({ position }));
  };

  return (
    <S.Container>
      {isOpen ? (
        <S.Square>{isMine ? "💣" : numberOfNearMine}</S.Square>
      ) : (
        <S.Blank
          onClick={() => handleBlackClick(position)}
          onContextMenu={renderFlag}
          disabled={state === "success" || state === "fail"}
        >
          {isFlag ? "🚩" : isMine ? 1 : 0}
        </S.Blank>
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
  `,

  Square: styled.div`
    width: 100%;
    height: 100%;

    text-align: center;
    border: 1px solid #8b8b8b;
    cursor: default;
  `,

  Blank: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    border-top: 2px solid white;
    border-left: 2px solid white;
    border-bottom: 2px solid #8b8b8b;
    border-right: 2px solid #8b8b8b;
    cursor: ${({ disabled }) => disabled && "default"};
    font-size: 1.2rem;
  `,
};
