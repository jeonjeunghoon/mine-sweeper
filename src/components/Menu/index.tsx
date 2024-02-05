import styled from "@emotion/styled";

import { useDispatch } from "react-redux";
import { changeGameState, changeLevel, resetMap } from "../../store/game/slice";

import { useMenu } from "../../hooks/useMenu";

import Modal from "../common/Modal";
import CustomMapForm from "../CustomMapForm";

export default function Menu() {
  const { isOpen, openMenu, closeMenu } = useMenu();
  const dispatch = useDispatch();

  return (
    <S.MenuContainer>
      {isOpen && (
        <S.MenuList>
          <li>
            <S.Menu
              onClick={() => {
                dispatch(changeLevel({ level: "Beginner" }));
                dispatch(resetMap());
                dispatch(changeGameState({ state: "pause" }));
                closeMenu();
              }}
            >
              Beginner
            </S.Menu>
          </li>
          <li>
            <S.Menu
              onClick={() => {
                dispatch(changeLevel({ level: "Intermediate" }));
                dispatch(resetMap());
                dispatch(changeGameState({ state: "pause" }));
                closeMenu();
              }}
            >
              Intermediate
            </S.Menu>
          </li>
          <li>
            <S.Menu
              onClick={() => {
                dispatch(changeLevel({ level: "Expert" }));
                dispatch(resetMap());
                dispatch(changeGameState({ state: "pause" }));
                closeMenu();
              }}
            >
              Expert
            </S.Menu>
          </li>
          <li>
            <S.CustomMenu>
              <Modal buttonText='Custom' buttonAlign='start'>
                <CustomMapForm closeMenu={closeMenu} />
              </Modal>
            </S.CustomMenu>
          </li>
        </S.MenuList>
      )}
      <button onClick={openMenu}>Game</button>
    </S.MenuContainer>
  );
}

const S = {
  MenuContainer: styled.div`
    position: relative;
    height: 20px;
  `,

  MenuList: styled.ul`
    position: absolute;

    border-top: 2px solid white;
    border-left: 2px solid white;
    border-bottom: 2px solid #8b8b8b;
    border-right: 2px solid #8b8b8b;
    background-color: ${({ theme }) => theme.colors.primary};

    li:not(:last-child) {
      border-bottom: 1px solid #8b8b8b;
    }
  `,

  Menu: styled.button`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100px;
    height: 20px;
    padding: 8px;
  `,

  CustomMenu: styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100px;
    height: 20px;
    padding: 8px;
  `,
};
