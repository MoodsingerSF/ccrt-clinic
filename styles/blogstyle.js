import { createStyles, makeStyles } from "@mui/styles";
import { DEFAULT_COLOR_MINUS_2 } from "../misc/colors";
import img from "../public/image/ccrt-bg/CCRT_bg.jpg";

export const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__blog__header: {
      height: "40vh",
      width: "100vw",
      overflow: "hidden",
      zIndex: "-1",
      //   backgroundColor: "#000000",
      //   opacity: "0.7",
    },
    ccrt__blog__wrapper: {
      boxSizing: "border-box",
      display: "block",
      overflow: "hidden",
      width: "initial",
      height: "initial",
      background: "none",
      opacity: "1",
      border: "0",
      margin: "0",
      padding: "0",
      position: "absolute",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
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
    ccrt__blog__body__container: {
      width: "95%",
      margin: "20px 0",
    },
    ccrt__blog__content__title: {
      fontWeight: "bold",
      marginBottom: "5px",
    },
    ccrt__blog__hashtag: {
      margin: "0 5px",
      background: DEFAULT_COLOR_MINUS_2,
      color: "#fff",
      padding: "0 5px",
    },
  })
);
