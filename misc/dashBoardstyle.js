import { createStyles, makeStyles } from "@mui/styles";
import { APP_BAR_HEIGHT } from "../misc/constants";

export const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dashboard__container: {
      position: "relative",
      // marginTop: "4vh",
    },
    ccrt__dashboard__left__container: {
      minHeight: "100vh",
      background: theme.palette.custom.DEFAULT_COLOR_MINUS_2,
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
      padding: `${APP_BAR_HEIGHT} 20px 0px 20px`,
    },
  })
);
