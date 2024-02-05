import { MouseEvent } from "react";

import styled from "@emotion/styled";

import { useDispatch, useSelector } from "react-redux";
import {
  Position,
  changeGameState,
  initialGameMapByClick,
  openBlank,
  setIsMine,
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
    if (state === "pause") {
      dispatch(changeGameState({ state: "start" }));
      dispatch(initialGameMapByClick({ position }));
      dispatch(updateMineMapByClickTile({ position }));
    } else {
      if (isMine) {
        dispatch(openBlank({ position }));
        dispatch(setIsMine({ position }));
      } else {
        dispatch(updateMineMapByClickTile({ position }));
      }
    }
  };

  const renderFlag = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (state === "pause") {
      dispatch(changeGameState({ state: "start" }));
      dispatch(initialGameMapByClick({ position }));
    }

    dispatch(toggleIsFlag({ position }));
  };

  return (
    <S.Container>
      {isOpen ? (
        <S.Square>{isMine ? "💣" : numberOfNearMine}</S.Square>
      ) : isFlag ? (
        <S.Flag>🚩</S.Flag>
      ) : (
        <S.Blank
          onClick={() => handleBlackClick(position)}
          onContextMenu={renderFlag}
          disabled={state === "success" || state === "fail"}
        >
          {isMine ? 1 : 0}
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
  `,

  Blank: styled.button`
    width: 100%;
    height: 100%;
    border-top: 2px solid white;
    border-left: 2px solid white;
    border-bottom: 2px solid #8b8b8b;
    border-right: 2px solid #8b8b8b;
  `,

  Flag: styled.div`
    width: 100%;
    height: 100%;
    border-top: 2px solid white;
    border-left: 2px solid white;
    border-bottom: 2px solid #8b8b8b;
    border-right: 2px solid #8b8b8b;
  `,
};
