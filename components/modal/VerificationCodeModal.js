import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Grid,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import {
  INITIAL_SECONDS,
  MESSAGE,
  RESEND,
  SUBTITLE,
  TITLE,
  VERIFY_BUTTON,
} from "../../data/signupVerificationCodeModal/data";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import CustomButton from "../button/CustomButton";
import { verifyOtp } from "../../controllers/SignupController";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import { SNACKBAR_INITIAL_STATE } from "../../misc/constants";

const VerificationCodeModal = ({
  openModal,
  handleCloseVerificationCodeModal,
  onResend,
  otpId,
  handleSignUp,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const [code, setCode] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showModalContent, setShowModalContent] = useState(true);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setDisabled(false);
        setShowModalContent(false);
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      await verifyOtp(otpId, code);
      await handleSignUp();
      // setLoading(false);
      // handleCloseVerificationCodeModal();
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        handleSnackbarOpen(error.response.data.message, setSnackbar);
      }
    }
  };

  return (
    <Modal open={openModal} onClose={handleCloseVerificationCodeModal}>
      <Grid
        container
        // className={classes.modal__container}
        className={classNames({
          [classes.modal__container_Mobile]: !matches,
          [classes.modal__container_DesktopSm]: matches,
          [classes.modal__container_DesktopMd]: matchesMD,
          [classes.modal__container_DesktopLg]: matchesLG,
        })}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h6" component="h2">
            {TITLE}
          </Typography>
          <Grid container justifyContent="center" alignItems="center">
            <Typography className={classes.modal__subtitle}>
              {SUBTITLE}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <TextField
            size="small"
            fullWidth
            color="primary"
            placeholder="Enter Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
                setSeconds(INITIAL_SECONDS);
                setDisabled(true);
                setShowModalContent(true);
                onResend();
                //api
              }}
            >
              {RESEND}
            </Button>
            {showModalContent ? (
              <Typography className={classes.modal__resend__timer}>
                After {seconds} Secs
              </Typography>
            ) : null}
          </Typography>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <CustomButton
            loading={loading}
            title={VERIFY_BUTTON}
            onClick={onSignUp}
          />
        </Grid>
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          onClose={() => {
            handleSnackbarClose(setSnackbar);
          }}
        />
      </Grid>
    </Modal>
  );
};

const useStyles = makeStyles({
  modal__container_Mobile: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: DEFAULT_COLOR_MINUS_2,
    textAlign: "center",
    width: "90%",
    background: "#fff",
    borderRadius: "6px",
    padding: "50px 50px",
    boxShadow: 24,
  },
  modal__container_DesktopSm: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: DEFAULT_COLOR_MINUS_2,
    textAlign: "center",
    width: "50%",
    background: "#fff",
    borderRadius: "6px",
    padding: "50px 50px",
    boxShadow: 24,
  },
  modal__container_DesktopMd: {
    width: "50%",
  },
  modal__container_DesktopLg: {
    width: "40%",
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
});

VerificationCodeModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleCloseVerificationCodeModal: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
  otpId: PropTypes.string.isRequired,
  handleSignUp: PropTypes.func.isRequired,
};
export default VerificationCodeModal;
