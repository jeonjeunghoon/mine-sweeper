import { PropsWithChildren } from "react";

import styled from "@emotion/styled";

export default function Layout({ children }: PropsWithChildren) {
  return <S.Layout>{children}</S.Layout>;
}

const S = {
  Layout: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    overflow-x: auto;
    background-color: #0e0e0e;
  `,
};
