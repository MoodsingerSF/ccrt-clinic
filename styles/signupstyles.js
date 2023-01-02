import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    containerMobile: {
      borderRadius: "0px",
      background: "none",
    },
    containerDesktopSm: {
      background: theme.palette.custom.BLACK,
    },
    containerDesktopMd: {
      background: theme.palette.custom.BLACK,
      width: "100%",
    },
    containerDesktopLg: {
      width: "100%",
      background: theme.palette.custom.BLACK,
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
      width: "50%",
      padding: "20px 90px",
    },
    linkStyle: {
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontWeight: "bold",
      fontSize: "90%",
      marginLeft: "10px",
    },
    termsTextStyle__Mobile: {
      fontSize: "80%",
      color: theme.palette.grey[900],
    },
    termsTextStyle__DesktopMd: {
      fontSize: "90%",
    },
    ccrt__signup__policyError__text: {
      color: "red",
      fontSize: "70%",
      marginBottom: "15px",
    },
    sign_up_title: {
      fontSize: "180%",
      fontWeight: "bold",
      textAlign: "center",
    },
    field_title: {
      fontWeight: 500,
      // textTransform: "capitalize",
      fontSize: "85%",
      color: theme.palette.custom.BLACK,
    },
  })
);
