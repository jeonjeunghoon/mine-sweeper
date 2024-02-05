import styled from "@emotion/styled";

export default function Menu() {
  return (
    <S.MenuContainer>
      <S.MenuButton>Game</S.MenuButton>
    </S.MenuContainer>
  );
}

const S = {
  MenuContainer: styled.div`
    height: 20px;
  `,

  MenuButton: styled.button``,
};
