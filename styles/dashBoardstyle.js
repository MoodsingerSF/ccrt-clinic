import { createStyles, makeStyles } from "@mui/styles";
import { DEFAULT_COLOR_MINUS_2 } from "../misc/colors";

export const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dashboard__container: {
      position: "relative",
      marginTop: "10vh",
    },
    ccrt__dashboard__left__container: {
      minHeight: "100vh",
      background: DEFAULT_COLOR_MINUS_2,
      position: "fixed",
      top: "12%",
      overflowY: "scroll",
      /* Hide scrollbar for IE, Edge and Firefox */
      "-ms-overflow-style": "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,

      /* Hide scrollbar for Chrome, Safari and Opera */
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    ccrt__dashboard__right__container: {
      // background: "red",
      // minHeight: "100vh",
      padding: "0 20px ",
    },
  })
);
