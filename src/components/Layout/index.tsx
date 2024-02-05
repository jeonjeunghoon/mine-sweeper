import { PropsWithChildren } from "react";

import styled from "@emotion/styled";

export default function Layout({ children }: PropsWithChildren) {
  return <S.Layout>{children}</S.Layout>;
}

const S = {
  Layout: styled.div`
    height: 100%;

    overflow-x: auto;
    background-color: black;
  `,
};
