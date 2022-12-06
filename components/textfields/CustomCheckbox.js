import { Checkbox } from "@mui/material";
import { withStyles } from "@mui/styles";
import theme from "../../themes/theme";

const checkBoxStyles = () => ({
  root: {
    "&$checked": {
      color: theme.palette.custom.BUTTON_BACKGROUND,
    },
    color: theme.palette.custom.BUTTON_BACKGROUND,
  },
  checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);
export default CustomCheckbox;
