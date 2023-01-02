import React, { useRef, useState } from "react";
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
import SaveIcon from "@mui/icons-material/Save";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import CustomButton from "../button/CustomButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
const PhotoEditingDialog = ({ open, onClose, title, onSave, openSnackbar }) => {
  const classes = useStyles();
  const inputRef = useRef();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(
    `${"/images/ArtistScreen/logo2.jpg"}`
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveProfilePicture = async () => {
    if (photo === null) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      await onSave(photo);
      setLoading(false);
      onClose();
      openSnackbar("Profile picture has been updated successfully.");
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        openSnackbar(error.response.data.message);
      }
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: isDesktop ? "40%" : "100%",
        },
      }}
    >
      <DialogTitle>
        <Typography className={classes.ccrt__photo__editing__dialog__title}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent style={{ margin: 0, padding: 0 }}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ width: "95%" }}
          >
            <Box
              component={Grid}
              container
              className={classes.ccrt__photo__editing__dialog__content}
              style={{
                backgroundImage: `url(${photoPreview})`,
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
              <AddAPhotoIcon
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
                onChange={(event) => {
                  setPhoto(event.target.files[0]);
                  setPhotoPreview(URL.createObjectURL(event.target.files[0]));
                }}
                hidden
              />
            </Box>
            {error && photo === null && (
              <Typography style={{ fontSize: "80%", color: "red" }}>
                You must choose a profile picture
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        className={classes.ccrt__photo__editing__dialog__action__wrapper}
      >
        <Grid
          container
          justifyContent="flex-end"
          spacing={1}
          style={{ marginTop: 10 }}
        >
          <Grid item xs={6} md={3}>
            <CustomButton
              title="close"
              onClick={() => {
                if (!loading) {
                  onClose();
                } else {
                  openSnackbar("Please wait until photo is uploaded.");
                }
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <CustomButton
              icon={<SaveIcon />}
              title="save"
              onClick={saveProfilePicture}
              loading={loading}
            />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__photo__editing__dialog__title: {
      color: theme.palette.custom.BLACK,
      fontWeight: 600,
      fontSize: "85%",
      textAlign: "center",
    },
    ccrt__photo__editing__dialog__content: {
      height: "200px",
      width: "200px",
      borderRadius: "50%",
      border: `1.3px dashed ${theme.palette.custom.BLACK}`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    ccrt__photo__editing__dialog__content__add__wrapper: {
      // backgroundColor: theme.palette.custom.BLACK,
      border: `1.3px dashed ${theme.palette.custom.BLACK}`,
      borderRadius: 5,
      height: 45,
      cursor: "pointer",
      marginTop: "25px",
    },
    ccrt__photo__editing__dialog__content__add__icon: {
      fontSize: "90%",
      color: theme.palette.custom.BLACK,
      marginRight: "10px",
      fontWeight: "bold",
    },
    ccrt__photo__editing__dialog__content__add__button__title: {
      fontSize: "85%",
      fontWeight: 500,
      color: theme.palette.custom.BLACK,
      textTransform: "capitalize",
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
  onSave: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func,
};

export default PhotoEditingDialog;
