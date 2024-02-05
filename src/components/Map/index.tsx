import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Position, initialGameMapByClick } from "../../store/game/slice";
import { gameMapSelector } from "../../store/game/selector";

export default function Map() {
  const map = useSelector(gameMapSelector);
  const dispatch = useDispatch();

  const handleBlackClick = (position: Position) => {
    dispatch(initialGameMapByClick({ position }));
  };

  return (
    <S.Map>
      {map.map((line, col) => (
        <S.Line key={Math.random()}>
          {line.map((black, row) => (
            <S.Black key={Math.random()}>
              <button onClick={() => handleBlackClick({ row, col })}>
                {black}
              </button>
            </S.Black>
          ))}
        </S.Line>
      ))}
    </S.Map>
  );
}

const S = {
  Map: styled.ul`
    flex: 1;

    border-top: 2px solid #8b8b8b;
    border-left: 2px solid #8b8b8b;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
  `,

  Line: styled.ul`
    display: flex;
  `,

  Black: styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;

    border-top: 2px solid white;
    border-left: 2px solid white;
    border-bottom: 2px solid #8b8b8b;
    border-right: 2px solid #8b8b8b;
  `,
};
