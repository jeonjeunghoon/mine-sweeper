import styled from "@emotion/styled";

import { useSelector } from "react-redux";
import { gameMineMapSelector } from "../../store/game/selector";

import Tile from "../Tile";

export default function MineMap() {
  const mineMap = useSelector(gameMineMapSelector);

  return (
    <S.MineMap>
      {mineMap.map((line, row) => (
        <S.Line key={Math.random()}>
          {line.map(({ isOpen, isMine, isFlag, numberOfNearMine }, col) => (
            <li key={`[${row},${col}]`}>
              <Tile
                position={{ row, col }}
                isOpen={isOpen}
                isMine={isMine}
                isFlag={isFlag}
                numberOfNearMine={numberOfNearMine}
              />
            </li>
          ))}
        </S.Line>
      ))}
    </S.MineMap>
  );
}

const S = {
  MineMap: styled.ul`
    flex: 1;

    border-top: 2px solid #8b8b8b;
    border-left: 2px solid #8b8b8b;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
  `,

  Line: styled.ul`
    display: flex;
  `,
};
