import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    ccrt__blogDetails__section: {
      position: "relative",
      marginTop: "17vh",
    },
    ccrt__blogDetails__container__mobile: {
      padding: "0 10px",
      // paddingTop: 100,
    },
    ccrt__blogDetails__container_tablet: {
      position: "relative",
      width: "90%",
      // paddingTop: 100,
    },
  })
);
