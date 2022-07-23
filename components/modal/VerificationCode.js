import React, { useEffect, useState } from "react";
import { Modal, Typography, Grid, TextField, Button } from "@mui/material";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import {
  INITIALSECONDS,
  MESSAGE,
  RESEND,
  SUBTITLE,
  TITLE,
  VERIFY_BUTTON,
} from "../../data/signupVerificationCodeModal/data";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const VerificationCode = ({ open, onClose }) => {
  const classes = useStyles();
  const [seconds, setSeconds] = useState(INITIALSECONDS);
  const [disabled, setDisabled] = useState(true);
  const [showContent, setShowContent] = useState(true);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setDisabled(false);
        setShowContent(false);
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);

  return (
    <Modal open={open} onClose={onClose}>
      <Grid container className={classes.modal__container}>
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h6" component="h2">
            {TITLE}
          </Typography>
          <Typography className={classes.modal__subtitle}>
            {SUBTITLE}
          </Typography>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <TextField
            size="small"
            fullWidth
            color="primary"
            placeholder="Enter Code"
          />
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Typography className={classes.modal__text_message}>
            {MESSAGE}
            <Button
              variant="text"
              size="small"
              disabled={disabled}
              className={classes.modal__resend}
              onClick={() => {
                setSeconds(INITIALSECONDS);
                setDisabled(true);
                setShowContent(true);
                //api
              }}
            >
              {RESEND}
            </Button>
            {showContent ? (
              <Typography className={classes.modal__resend__timer}>
                After {seconds} Secs
              </Typography>
            ) : null}
          </Typography>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            fullWidth
            className={classes.modal__verify__button}
          >
            {VERIFY_BUTTON}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

const useStyles = makeStyles({
  modal__container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: DEFAULT_COLOR_MINUS_2,
    textAlign: "center",
    width: 400,
    background: "#fff",
    borderRadius: "6px",
    padding: "50px 50px",
    boxShadow: 24,
  },
  modal__subtitle: {
    marginBottom: "20px",
    fontSize: "80%",
  },
  modal__text_message: {
    margin: "10px 0 20px 0",
    fontSize: "85%",
  },
  modal__resend: {
    color: DEFAULT_COLOR_MINUS_2,
    marginLeft: "5px",
    marginRight: "5px",
    textTransform: "capitalize",
    fontWeight: "500",
  },
  modal__resend__timer: {
    fontSize: "100%",
  },
  modal__verify__button: {
    color: "white",
  },
});

VerificationCode.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.string.isRequired,
};
export default VerificationCode;
