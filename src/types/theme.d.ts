import "@emotion/react";

import { Colors } from "../styles/theme";

declare module "@emotion/react" {
  export interface Theme {
    colors: Colors;
  }
}
