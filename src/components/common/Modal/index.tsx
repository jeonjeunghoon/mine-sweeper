import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import styled from "@emotion/styled";

import { useModal } from "../../../hooks/useModal";

type TextAlign = "start" | "center" | "end";

type Props = {
  buttonText?: string;
  buttonAlign?: TextAlign;
} & PropsWithChildren;

export default function Modal({
  buttonText = "모달 창 열기",
  buttonAlign = "center",
  children,
}: Props) {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <S.ModalButton buttonAlign={buttonAlign} onClick={openModal}>
        {buttonText}
      </S.ModalButton>
      {isModalOpen &&
        createPortal(
          <S.ModalContainer>
            <S.Background onClick={closeModal} />
            <S.Modal>
              <S.CloseButtonWrapper>
                <S.CloseButton onClick={closeModal}>❌</S.CloseButton>
              </S.CloseButtonWrapper>
              {children}
            </S.Modal>
          </S.ModalContainer>,
          document.body
        )}
    </>
  );
}

const S = {
  ModalButton: styled.button<{ buttonAlign: TextAlign }>`
    flex: 1;

    text-align: ${({ buttonAlign }) => buttonAlign};
  `,

  ModalContainer: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    overflow: hidden;
    z-index: 2;
  `,

  Background: styled.div`
    width: 100vw;
    height: 100vh;

    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  `,

  Modal: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;

    border-radius: 8px;
    border-top: 2px solid white;
    border-left: 2px solid white;
    border-bottom: 2px solid #8b8b8b;
    border-right: 2px solid #8b8b8b;
    background-color: ${({ theme }) => theme.colors.primary};
  `,

  CloseButtonWrapper: styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
  `,

  CloseButton: styled.button``,
};
