import { createTheme } from "@mui/material/styles";
import { purple, red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: purple[600],
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    custom: {
      DEFAULT_COLOR: "#631976",
      DEFAULT_COLOR_MINUS_2: "#7b1f92",
      DEFAULT_COLOR_MINUS_20: "#f7e8fa",
      DEFAULT_COLOR_MINUS_18: "#ecccf4",
    },
  },
  typography: {
    fontSize: 16,
  },
});

export default theme;
