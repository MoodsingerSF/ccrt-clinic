import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Image from "next/image";
import ShowImageBackdrop from "../backdrops/ShowImageBackdrop";

const AppointmentDetailsShowReportRow = ({ fileItem }) => {
  const classes = useStyles();
  const [showFile, setShowFile] = useState(false);
  const [showImageView, setShowImageView] = useState(false);
  return (
    <Grid container>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        className={classes.ccrt__reportRow__container}
        onClick={() => setShowFile(!showFile)}
      >
        <Typography className={classes.ccrt__report__title}>
          {fileItem.title}
        </Typography>
        <IconButton>
          {showFile ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Grid>
      {showFile && (
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          className={classes.ccrt__report__view__section}
        >
          <Grid
            container
            style={{
              cursor: "pointer",
            }}
            onClick={() => setShowImageView(true)}
          >
            <Image src={fileItem.file} alt={fileItem.title} height={250} />
            <Grid container className={classes.ccrt__report__bottom__container}>
              <Typography className={classes.ccrt__report__bottom__text}>
                Click for fullview
              </Typography>
            </Grid>
          </Grid>
          {showImageView && (
            <ShowImageBackdrop
              open={showImageView}
              onNegativeFeedback={() => {
                setShowImageView(false);
              }}
              file={fileItem.file}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__reportRow__container: {
      border: `1px solid ${theme.palette.custom.BORDER}`,
      borderRadius: "5px",
      marginBottom: "20px",
      cursor: "pointer",
    },
    ccrt__report__title: {
      padding: "10px 5px",
      borderRadius: "5px",
      fontSize: "90%",
      fontWeight: "500",
      lineHeight: "1.25",
      textTransform: "capitalize",
    },
    ccrt__report__view__section: {
      marginBottom: "10px",
      position: "relative",
    },
    ccrt__report__bottom__container: {
      position: "absolute",
      bottom: "0",
      background: "#fff",
    },
    ccrt__report__bottom__text: {
      textAlign: "center",
      width: "100%",
      padding: "15px",
      border: `1px solid ${theme.palette.custom.DEFAULT_COLOR}`,
      borderTop: "0",
      borderBottomLeftRadius: "5px",
      borderBottomRightRadius: "5px",
      fontSize: "80%",
      textTransform: "capitalize",
      fontWeight: "500",
    },
  })
);
AppointmentDetailsShowReportRow.propTypes = {
  fileItem: PropTypes.object.isRequired,
};
export default AppointmentDetailsShowReportRow;
