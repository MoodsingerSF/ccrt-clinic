import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import BackupIcon from "@mui/icons-material/Backup";
import PropTypes from "prop-types";

const TimeSlotBookedUserInfoTextField = ({ onFileDrop }) => {
  const classes = useStyles();

  return (
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
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__upload__file__wrapper: {
      position: "relative",
      border: `2px dashed ${theme.palette.grey[500]}`,
      height: "200px",
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
      color: `${theme.palette.custom.DEFAULT_COLOR_2}`,
    },
    ccrt__upload__file__container__title: {
      color: `${theme.palette.grey[700]}`,
    },
  })
);

TimeSlotBookedUserInfoTextField.propTypes = {
  onFileDrop: PropTypes.func.isRequired,
};

export default TimeSlotBookedUserInfoTextField;
