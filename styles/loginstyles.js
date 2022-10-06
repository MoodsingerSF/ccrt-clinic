import { createStyles, makeStyles } from "@mui/styles";
import { BOX_SHADOW } from "../misc/colors";

export const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__login__containerMobile: {
      background: "#FFF",
      padding: "20px",
    },
    ccrt__login__containerDesktopSm: {
      background: "#FFF",
      width: "80%",
      padding: "20px 50px",
      borderRadius: "5px",
    },
    ccrt__login__containerDesktopMd: {
      background: "#FFF",
      width: "50%",
      boxShadow: BOX_SHADOW,
      padding: "30px",
      borderRadius: "5px",
    },
    ccrt__login__containerDesktopLg: {
      background: "#FFF",
      width: "40%",
      boxShadow: BOX_SHADOW,
      padding: "50px",
      borderRadius: "5px",
    },
    ccrt__login__forgot__password: {
      fontSize: "85%",
      margin: "15px 0",
      textDecoration: "none",
      fontWeight: 500,
      color: theme.palette.primary.BLACK,
      cursor: "pointer",
    },
    ccrt__login__or__text: {
      margin: "10px 0",
      fontSize: "80%",
      fontWeight: 500,
    },
    ccrt__login__signup__link: {
      marginLeft: "5px",
      fontWeight: "bold",
      fontSize: "90%",
      color: theme.palette.custom.BLACK,
      cursor: "pointer",
    },
  })
);
