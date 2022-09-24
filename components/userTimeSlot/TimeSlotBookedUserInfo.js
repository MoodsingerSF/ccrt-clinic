import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import TimeSlotBookedUserInfoTextField from "../textfields/TimeSlotBookedUserInfoTextField";
import { useState } from "react";
// import { addReport, updateReport } from "../../controllers/UserController";
import CustomButton from "../button/CustomButton";

const TimeSlotBookedUserInfo = ({
  resourceId,
  addImageUrl,
  title,
  imageUrl,
  openSnackbar,
  addReport,
  updateReport,
  editable = false,
  // removeImageUrl,
  // onFileRemove,
  // isStoreFile,
}) => {
  const classes = useStyles();
  // const [finalImageUrl, setFinalImageUrl] = useState(imageUrl);
  // const [newUpload, setNewUpload] = useState(imageUrl === null);
  const [preview, setPreview] = useState(null);
  const [showButtons, setShowButtons] = useState(imageUrl === null);
  const [uploadNewFile, setUploadNewFile] = useState(imageUrl === null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitFile = async () => {
    try {
      if (file === null) {
        setError(true);
        return;
      }
      setLoading(true);
      const data = await addReport(title, file);
      setUploadNewFile(false);
      setShowButtons(false);
      setFile(null);
      setPreview(null);
      openSnackbar(`${title} report has been added successfully.`);
      addImageUrl(data.imageUrl, data.resourceId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data?.code + " : " + data?.message);
      }
    }
  };

  const handleUpdateReport = async () => {
    try {
      if (file === null) {
        setError(true);
        return;
      }
      setLoading(true);
      const data = await updateReport(resourceId, file);
      setUploadNewFile(false);
      setShowButtons(false);
      setFile(null);
      setPreview(null);
      openSnackbar(`${title} report has been updated successfully.`);
      addImageUrl(data.imageUrl, data.resourceId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data?.code + " : " + data?.message);
      }
    }
  };

  return (
    <Grid container className={classes.ccrt__content__wrapper}>
      <Typography className={classes.ccrt__content__header}>
        {title}
        {/* <small className={classes.ccrt__content__header__small}>(if any)</small> */}
      </Typography>
      {!uploadNewFile ? (
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          className={classes.ccrt_image_preview_wrapper}
          style={{
            backgroundImage: `url(/${imageUrl})`,
          }}
        >
          {editable && (
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
          )}
        </Grid>
      ) : (
        <>
          {file === null ? (
            <>
              <TimeSlotBookedUserInfoTextField
                onFileDrop={(e) => {
                  setFile(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
              {error && (
                <Typography style={{ color: "red", fontSize: "75%" }}>
                  You must select an image
                </Typography>
              )}
            </>
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
                  setFile(null);
                  // setShowButtons(true);
                  // setUploadNewFile(true);
                }}
              >
                <ClearIcon
                  fontSize="small"
                  className={classes.ccrt__clear__button}
                />
              </IconButton>
            </Grid>
          )}
        </>
      )}

      {showButtons && (
        <Grid
          container
          justifyContent={"flex-end"}
          alignItems="center"
          style={{ marginTop: "10px" }}
        >
          <Grid
            container
            justifyContent={"flex-end"}
            alignItems="center"
            item
            xs={12}
            sm={6}
            spacing={2}
          >
            <Grid container item xs={6}>
              {!loading && (
                <CustomButton
                  title="Cancel"
                  onClick={() => {
                    setUploadNewFile(false);
                    setShowButtons(false);
                  }}
                />
              )}
            </Grid>

            <Grid container item xs={6}>
              <CustomButton
                title={imageUrl === null ? "Submit" : "Update"}
                onClick={() => {
                  if (imageUrl === null) {
                    submitFile();
                  } else {
                    handleUpdateReport();
                  }
                }}
                loading={loading}
              />
            </Grid>
          </Grid>
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
  addImageUrl: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  addReport: PropTypes.func.isRequired,
  updateReport: PropTypes.func.isRequired,
  resourceId: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  // removeImageUrl: PropTypes.func.isRequired,

  // onFileRemove: PropTypes.func.isRequired,
  // isStoreFile: PropTypes.object,
};

export default TimeSlotBookedUserInfo;
