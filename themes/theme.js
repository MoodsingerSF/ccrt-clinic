import { createTheme } from "@mui/material/styles";
import { grey, purple, red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main_minus_2: purple[400],
      main: purple[600],
    },
    secondary: {
      main: "#2ecc71",
    },
    error: {
      main: red.A400,
    },
    custom: {
      FOOTER_BG: "#f2f7ff",
      DEFAULT_COLOR: "#631976",
      DEFAULT_COLOR_2: "#9180BA",
      DEFAULT_COLOR_3: "#9DCB80",
      HEADING: "#aac984",
      DEFAULT_COLOR_MINUS_2: "#7b1f92",
      DEFAULT_COLOR_MINUS_20: "#f7e8fa",
      DEFAULT_COLOR_MINUS_18: "#ecccf4",
      TABLE_HOVER_COLOR: grey[50],
      BORDER: grey[300],
      GREEN: "#2ecc71",
      GREY: "#7f8c8d",
    },
  },
  typography: {
    fontSize: 16,
  },
});

export default theme;
