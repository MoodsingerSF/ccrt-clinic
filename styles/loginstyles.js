import { createStyles, makeStyles } from "@mui/styles";
import { BOX_SHADOW } from "../misc/colors";

export const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__login__containerMobile: {
      background: "#FFF",
      padding: "20px",
      margin: "40px 0",
    },
    ccrt__login__containerDesktopSm: {
      background: "#FFF",
      width: "80%",
      padding: "20px 50px",
      margin: "20px 0",
      borderRadius: "5px",
    },
    ccrt__login__containerDesktopMd: {
      background: "#FFF",
      width: "50%",
      boxShadow: BOX_SHADOW,
      padding: "30px",
      margin: "35px 0",
      borderRadius: "5px",
    },
    ccrt__login__containerDesktopLg: {
      background: "#FFF",
      width: "40%",
      boxShadow: BOX_SHADOW,
      padding: "50px",
      margin: "80px 0",
      borderRadius: "5px",
    },
    ccrt__login__forgot__password: {
      fontSize: "90%",
      margin: "15px 0",
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
    ccrt__login__or__text: {
      margin: "10px 0",
      fontSize: "80%",
    },
    ccrt__login__signup__link: {
      textDecoration: "none",
      marginLeft: "5px",
      color: theme.palette.primary.main,
    },
  })
);
