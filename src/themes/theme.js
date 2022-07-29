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
  },
  typography: {
    fontSize: 16,
  },
});

export default theme;
