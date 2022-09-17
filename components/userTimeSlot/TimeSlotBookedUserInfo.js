import React from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import TimeSlotBookedUserInfoTextField from "../textfields/TimeSlotBookedUserInfoTextField";
import { useState } from "react";

const TimeSlotBookedUserInfo = ({
  isFilePicked,
  onFileDrop,
  title,
  // onFileRemove,
  // isStoreFile,
}) => {
  const classes = useStyles();

  const [preview, setPreview] = useState(null);
  const [showButtons, setShowButtons] = useState(true);
  const [uploadNewFile, setUploadNewFile] = useState(false);

  // console.log(isFilePicked);

  const submitFiles = () => {
    if (preview) {
      setShowButtons(false);
      // setLoading(true)
      // Api call
      console.log("Submit Files");
      // setLoading(false);
    } else {
      setShowButtons(true);
    }
  };

  return (
    <Grid container className={classes.ccrt__content__wrapper}>
      <Typography className={classes.ccrt__content__header}>
        {title}
        <small className={classes.ccrt__content__header__small}>(if any)</small>
      </Typography>

      {isFilePicked ? (
        uploadNewFile ? (
          <TimeSlotBookedUserInfoTextField
            onFileDrop={(e) => {
              onFileDrop(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        ) : (
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
                setShowButtons(true);
                setUploadNewFile(true);
              }}
            >
              <ClearIcon
                fontSize="small"
                className={classes.ccrt__clear__button}
              />
            </IconButton>
          </Grid>
        )
      ) : (
        <>
          <TimeSlotBookedUserInfoTextField
            onFileDrop={(e) => {
              onFileDrop(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </>
      )}
      {showButtons && (
        <Grid
          container
          justifyContent={"flex-end"}
          alignItems="center"
          style={{ marginTop: "10px" }}
        >
          <Button
            size="small"
            variant="contained"
            style={{ marginRight: "10px", fontSize: "75%" }}
            onClick={() => {
              setUploadNewFile(false);
            }}
          >
            cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            style={{ fontSize: "75%" }}
            onClick={submitFiles}
          >
            Save
          </Button>
        </Grid>
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
  isFilePicked: PropTypes.object,
  onFileDrop: PropTypes.func.isRequired,
  // onFileRemove: PropTypes.func.isRequired,
  // isStoreFile: PropTypes.object,
};

export default TimeSlotBookedUserInfo;
