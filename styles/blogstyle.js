import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    ccrt__blog__header: {
      height: "40vh",
      width: "100vw",
      overflow: "hidden",
      // position: "relative",
      zIndex: "-1",
    },
    ccrt__blog__header__title: {
      position: "absolute",
      top: "15%",
      color: "white",
      margin: "0",
      fontSize: "32px",
      lineHeight: "48px",
      textShadow: "1px 1px 1px #3c5c5e",
    },
  })
);
