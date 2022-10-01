import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  ccrt__modal__appbar__wrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  ccrt__modal__appbar__text: {
    fontSize: "100%",
    fontWeight: 500,
    textTransform: "capitalize",
    color: theme.palette.custom.BLACK,
    // marginLeft: 10,
  },
  ccrt__modal__content__container: {
    paddingBottom: 10,
  },
  ccrt__modal__footer__container: {
    marginBottom: 10,
  },
}));

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
};
