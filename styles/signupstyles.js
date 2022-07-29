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
      width: "80%",
      margin: "10px auto",
    },
    containerDesktopLg: {
      width: "70%",
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
    linkStyle: {
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontWeight: "500",
      marginLeft: "10px",
    },
    termsTextStyle: {
      fontSize: "80%",
      color: theme.palette.grey[900],
    },
    ccrt__signup__policyError__text: {
      color: "red",
      fontSize: "70%",
      marginBottom: "15px",
    },
  })
);
