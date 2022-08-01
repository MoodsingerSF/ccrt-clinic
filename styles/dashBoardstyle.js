import { createStyles, makeStyles } from "@mui/styles";
import { DEFAULT_COLOR_MINUS_2 } from "../misc/colors";

export const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dashboard__section: {
      position: "relative",
      minHeight: "100vh",
    },
    ccrt__dashboard__container: {
      background: "#F7F8FC",
    },
    ccrt__dashboard__left__container: {
      height: "100vh",
      background: DEFAULT_COLOR_MINUS_2,
    },
    ccrt__dashboard__right__container: {
      padding: "20px ",
    },
  })
);
