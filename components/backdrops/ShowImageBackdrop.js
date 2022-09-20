import React from "react";
import Image from "next/image";
import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const ShowImageBackdrop = ({ onNegativeFeedback, file, open }) => {
  const classes = useStyles();
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        textAlign: "center",
      }}
      open={open}
      onClick={onNegativeFeedback}
    >
      {file ? (
        <Grid>
          <Image src={file} alt="image" />
          <Tooltip title="close" arrow>
            <IconButton
              className={classes.ccrt__show__image__backdrop__close__button}
              onClick={onNegativeFeedback}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      ) : (
        <CircularProgress color="inherit" />
      )}
    </Backdrop>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__show__image__backdrop__close__button: {
    position: "fixed",
    top: "2%",
    right: "2%",
    color: "#fff",
  },
}));
ShowImageBackdrop.propTypes = {
  onNegativeFeedback: PropTypes.func.isRequired,
  file: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};
export default ShowImageBackdrop;
