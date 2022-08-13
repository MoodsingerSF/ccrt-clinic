import React, { useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { createStyles, makeStyles } from "@mui/styles";
import DialogActionButton from "../button/DialogActionButton";
import PropTypes from "prop-types";

const PhotoEditingDialog = ({
  open,
  onClose,
  title,
  onChange,
  onSave,
  profilePhotoPreview,
}) => {
  const classes = useStyles();
  const inputRef = useRef();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            width: isDesktop ? "40%" : "95%",
            height: "100%",
          },
        }}
      >
        <DialogTitle>
          <Typography
            className={classes.ccrt__photo__editing__dialog__title}
            style={{}}
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component={Grid}
              container
              className={classes.ccrt__photo__editing__dialog__content}
              style={{
                backgroundImage: `url(${profilePhotoPreview})`,
              }}
            ></Box>
            <Box
              component={Grid}
              container
              item
              onClick={() => {
                if (inputRef && inputRef.current) {
                  inputRef.current.click();
                }
              }}
              className={
                classes.ccrt__photo__editing__dialog__content__add__wrapper
              }
              alignItems="center"
              justifyContent="center"
            >
              <AddSharpIcon
                className={
                  classes.ccrt__photo__editing__dialog__content__add__icon
                }
              />
              <Typography
                className={
                  classes.ccrt__photo__editing__dialog__content__add__button__title
                }
              >
                Choose
              </Typography>
              <input
                ref={inputRef}
                type="file"
                name="file"
                accept="image/*"
                onChange={onChange}
                hidden
              />
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions
          className={classes.ccrt__photo__editing__dialog__action__wrapper}
        >
          <DialogActionButton onClick={onClose} title="cancel" />
          <DialogActionButton onClick={onSave} title="save" />
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__photo__editing__dialog__title: {
      color: theme.palette.custom.DEFAULT_COLOR,
      fontWeight: "600",
      textAlign: "center",
    },
    ccrt__photo__editing__dialog__content: {
      height: "200px",
      width: "200px",
      borderRadius: "50%",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    ccrt__photo__editing__dialog__content__add__wrapper: {
      backgroundColor: theme.palette.custom.DEFAULT_COLOR_MINUS_2,
      borderRadius: 5,
      height: 45,
      cursor: "pointer",
      marginTop: "25px",
    },
    ccrt__photo__editing__dialog__content__add__icon: {
      fontSize: "90%",
      color: "white",
      marginRight: "10px",
      fontWeight: "bold",
    },
    ccrt__photo__editing__dialog__content__add__button__title: {
      fontSize: "80%",
      color: "white",
      textTransform: "uppercase",
    },
    ccrt__photo__editing__dialog__action__wrapper: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "30px",
    },
  })
);

PhotoEditingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  profilePhotoPreview: PropTypes.string,
};

export default PhotoEditingDialog;
