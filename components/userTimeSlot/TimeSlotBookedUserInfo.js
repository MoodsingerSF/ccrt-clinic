import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import TimeSlotBookedUserInfoTextField from "../textfields/TimeSlotBookedUserInfoTextField";
import { useState } from "react";

const TimeSlotBookedUserInfo = ({
  isFilePicked,
  onFileDrop,
  title,
  onFileRemove,
}) => {
  const classes = useStyles();
  const [preview, setPreview] = useState(null);
  return (
    <Grid container className={classes.ccrt__content__wrapper}>
      <Typography className={classes.ccrt__content__header}>
        {title}
        <small className={classes.ccrt__content__header__small}>(if any)</small>
      </Typography>

      {isFilePicked ? (
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
            onClick={() => {
              setPreview(null);
              onFileRemove();
            }}
          >
            <ClearIcon
              fontSize="small"
              className={classes.ccrt__clear__button}
            />
          </IconButton>
        </Grid>
      ) : (
        <TimeSlotBookedUserInfoTextField
          onFileDrop={(e) => {
            onFileDrop(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__content__wrapper: {
      marginBottom: "20px",
    },
    ccrt__content__header: {
      textTransform: "capitalize",
      fontWeight: "500",
      marginBottom: "5px",
      fontSize: "85%",
      color: `${theme.palette.grey[700]}`,
    },
    ccrt__content__header__small: {
      color: "black",
      fontSize: "75%",
      marginLeft: "5px",
    },
    ccrt_image_preview_wrapper: {
      position: "relative",
      height: "300px",
      backgroundPosition: "center",
      backgroundSize: "auto 100%",
      backgroundOrigin: "content-box",
      backgroundRepeat: "no-repeat",
      border: `2px dashed ${theme.palette.grey[500]}`,
      padding: "5px",
    },
    ccrt__image__wrapper__clear__button: {
      position: "absolute",
      top: "0",
      right: "0",
      cursor: "pointer",
      background: "#fff",
    },
    ccrt__clear__button: {
      color: `${theme.palette.custom.DEFAULT_COLOR}`,
    },
  })
);

TimeSlotBookedUserInfo.propTypes = {
  title: PropTypes.string.isRequired,
  isFilePicked: PropTypes.bool.isRequired,
  onFileDrop: PropTypes.func.isRequired,
  onFileRemove: PropTypes.func.isRequired,
};

export default TimeSlotBookedUserInfo;
