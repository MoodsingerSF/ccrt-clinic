import { createStyles, makeStyles } from "@mui/styles";
import { DEFAULT_COLOR_MINUS_2 } from "../misc/colors";

export const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dashboard__left__container: {
      height: "100%",
      background: DEFAULT_COLOR_MINUS_2,
      position: "fixed",
      top: "0",
      left: "0",
    },
    ccrt__dashboard__right__container: {
      padding: "0 20px ",
    },
  })
);
