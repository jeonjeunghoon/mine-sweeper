import styled from "@emotion/styled";

export default function ProgressBar() {
  return (
    <S.ProgressBar>
      <S.MineNumber></S.MineNumber>
      <S.Reset></S.Reset>
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

  Reset: styled.div`
    width: 28px;
    height: 28px;

    border-top: 2px solid white;
    border-left: 2px solid white;
    border-bottom: 2px solid #8b8b8b;
    border-right: 2px solid #8b8b8b;
  `,

  Timer: styled.div`
    width: 40px;
    height: 28px;

    background-color: black;
  `,
};
