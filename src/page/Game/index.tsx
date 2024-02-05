import styled from "@emotion/styled";

import Menu from "../../components/Menu";
import ProgressBar from "../../components/ProgressBar";
import MineMap from "../../components/MineMap";

export default function Game() {
  return (
    <S.Container>
      <Menu />
      <S.ContentsContainer>
        <ProgressBar />
        <MineMap />
      </S.ContentsContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    padding: 8px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
  `,

  ContentsContainer: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 8px;
    padding: 8px;

    border-top: 2px solid white;
    border-left: 2px solid white;
    border-bottom: 2px solid #8b8b8b;
    border-right: 2px solid #8b8b8b;
  `,
};
