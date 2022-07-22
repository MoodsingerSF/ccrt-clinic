import { createStyles, makeStyles } from "@mui/styles";
import { BOX_SHADOW } from "../misc/colors";

export const useStyles = makeStyles((theme) =>
  createStyles({
    containerMobile: {
      borderRadius: "0px",
      background: "none",
    },
    containerDesktopSm: {
      boxShadow: BOX_SHADOW,
      background: theme.palette.primary.main,
    },
    containerDesktopMd: {
      borderRadius: "26px",
      width: "900px",
      margin: "10px auto",
    },
    containerDesktopLg: {
      width: "1154px",
    },
    ccrt__signup__left: {
      padding: "20px 30px",
      width: "100%",
    },
    ccrt__signup__left__Sm: {
      padding: "20px 10px",
    },
    ccrt__signup__left__Md: {
      padding: "30px 20px",
    },
    ccrt__signup__left__Lg: {
      padding: "30px 20px",
    },
    ccrt__signup__left__desc: {
      display: "none",
    },
    ccrt__signup__left__desc__Sm: {
      display: "block",
    },
    ccrt__signup__right: {
      background: "#fff",
      borderRadius: "0px",
      padding: "0 20px 20px 20px",
    },
    ccrt__signup__right__Sm: {
      background: "#fff",
      padding: "20px 50px",
    },
    ccrt__signup__right__Md: {
      width: "729px",
      padding: "50px 90px",
      borderTopRightRadius: "25px",
      borderBottomRightRadius: "25px",
    },
    ccrt__signup__another__way: {
      display: "flex",
      flexDirection: "column",
    },
    linkStyle: {
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontWeight: "500",
      marginLeft: 5,
    },
    termsTextStyle: {
      fontSize: "80%",
      color: theme.palette.grey[900],
    },
  })
);
