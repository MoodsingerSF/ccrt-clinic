import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    ccrt__blogDetails__section: {
      position: "relative",
      margin: "20px 0",
    },
    ccrt__blogDetails__container__mobile: {
      padding: "0 10px",
    },
    ccrt__blogDetails__container_tablet: {
      position: "relative",
      width: "90%",
    },
  })
);
