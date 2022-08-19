import { createTheme } from "@mui/material/styles";
import { purple, red } from "@mui/material/colors";

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
      footer_bg: "#f2f7ff",
    },
  },
  typography: {
    fontSize: 16,
  },
});

export default theme;
