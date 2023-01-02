import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FileInputField from "../textfields/FileInputField";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";

const ImageUploadComp = ({
  onFileChange,
  showError = false,
  errorText = "",
  label = "Select an image",
}) => {
  const classes = useStyles();
  const [preview, setPreview] = useState(false);
  const [image, setImage] = useState(null);
  const onFileDrop = (e) => {
    setImage(e.target.files[0]);
    onFileChange(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      {preview ? (
        <Grid container>
          <Grid container>
            <Typography>{"Selected Image"}</Typography>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            className={classes.ccrt_image_preview_wrapper}
            style={{
              backgroundImage: `url(${preview})`,
            }}
          >
            <IconButton
              className={classes.ccrt__image__wrapper__clear__button}
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                cursor: "pointer",
              }}
              onClick={() => {
                setPreview(null);
                onFileChange(null);
                setImage(null);
              }}
            >
              <ClearIcon
                fontSize="small"
                className={classes.ccrt__clear__button}
              />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <FileInputField
          onFileDrop={onFileDrop}
          labelText={label}
          error={showError && !image}
          errorText={errorText}
        />
      )}
    </>
  );
};
ImageUploadComp.propTypes = {
  showError: PropTypes.bool,
  errorText: PropTypes.string,
  onFileChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};
const useStyles = makeStyles((theme) => ({
  ccrt_image_preview_wrapper: {
    position: "relative",
    height: "200px",
    backgroundPosition: "center",
    backgroundSize: "auto 100%",
    backgroundOrigin: "content-box",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
  },
  ccrt__clear__button: {
    color: `${theme.palette.custom.BUTTON_BACKGROUND}`,
  },
}));

export default ImageUploadComp;
