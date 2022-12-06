import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BackupIcon from "@mui/icons-material/Backup";
import PropTypes from "prop-types";

const FileInputField = ({
  onFileDrop,
  labelText = "",
  error = false,
  errorText = "",
}) => {
  const classes = useStyles();
  return (
    <Grid container style={{ marginBottom: "10px" }}>
      {labelText && (
        <Typography
          style={{
            fontSize: "100%",
            letterSpacing: "0.5px",
            fontWeight: "500",
            color: "rgba(0, 0, 0, 0.87)",
            marginBottom: "5px",
          }}
        >
          {labelText}
        </Typography>
      )}

      <Grid
        container
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
        className={classes.ccrt__upload__file__wrapper}
      >
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={onFileDrop}
          className={classes.ccrt__upload__file__field}
        />
        <BackupIcon fontSize="large" className={classes.ccrt_BackupIcon} />
        <Typography className={classes.ccrt__upload__file__container__title}>
          Browse file to upload
        </Typography>
      </Grid>

      {error && (
        <Typography style={{ color: "red", fontSize: "80%" }}>
          {errorText}
        </Typography>
      )}
    </Grid>
  );
};

FileInputField.propTypes = {
  onFileDrop: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  ccrt__upload__file__wrapper: {
    position: "relative",
    border: `2px dashed ${theme.palette.custom.BUTTON_BACKGROUND}`,
    height: "150px",
    width: "100%",
    borderRadius: "5px",
  },
  ccrt__upload__file__field: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    opacity: "0",
    cursor: "pointer",
  },
  ccrt_BackupIcon: {
    color: `${theme.palette.custom.BUTTON_BACKGROUND}`,
  },
  ccrt__upload__file__container__title: {
    color: `${theme.palette.custom.BUTTON_BACKGROUND}`,
  },
}));

export default FileInputField;
