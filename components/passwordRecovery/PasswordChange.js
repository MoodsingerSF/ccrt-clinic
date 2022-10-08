import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import SignUpTextField from "../textfields/SignUpTextField";
import { makeStyles } from "@mui/styles";
import CustomButton from "../button/CustomButton";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../controllers/SignupController";
import { formErrors } from "../../data/signup/data";
import PropTypes from "prop-types";
import { resetPassword } from "../../controllers/UserController";
import PasswordRecoverySuccessModal from "../modal/PasswordRecoverySuccessModal";
const PasswordChange = ({ userId, onCancel, openSnackbar }) => {
  const classes = useStyles();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmNewPassword = (e) => {
    setRetypedPassword(e.target.value);
  };

  const handleSubmitForm = async () => {
    try {
      if (validate(code, password, retypedPassword)) {
        setLoading(true);
        await resetPassword(userId, code, password);
        setLoading(false);
        setShowSuccessModal(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.code + ": " + data.message);
      }
    }
  };

  const validate = (code, password, retypedPassword) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      validatePassword(code) &&
      validatePassword(password) &&
      validateConfirmPassword(retypedPassword, password);
    return isEverythingAllRight;
  };

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Grid container justifyContent={"center"} alignItems="center">
        <Typography className={classes.headerStyle}>Reset Password</Typography>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        style={{ marginBottom: 10 }}
      >
        <Typography className={classes.smallTextStyle}>
          An email has been sent to you with a password reset token.
        </Typography>
      </Grid>
      <Grid
        container
        justifyContent={"flex-start"}
        alignItems="center"
        className={classes.ccrt_textField_container}
      >
        <Grid container justifyContent={"center"} alignItems="center">
          <SignUpTextField
            type="password"
            label="Password reset code"
            variant="outlined"
            value={code}
            onChange={handleChangeCode}
            error={showError && !validatePassword(code)}
            errorText={formErrors.password}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent={"flex-start"}
        alignItems="center"
        className={classes.ccrt_textField_container}
      >
        <Grid container justifyContent={"center"} alignItems="center">
          <SignUpTextField
            type="password"
            label="New Password"
            variant="outlined"
            value={password}
            onChange={handleChangePassword}
            error={showError && !validatePassword(password)}
            errorText={formErrors.password}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent={"flex-start"}
        alignItems="center"
        className={classes.ccrt_textField_container}
      >
        <Grid container justifyContent={"center"} alignItems="center">
          <SignUpTextField
            type="password"
            variant="outlined"
            label="Retype New Password"
            value={retypedPassword}
            onChange={handleConfirmNewPassword}
            error={
              showError && !validateConfirmPassword(retypedPassword, password)
            }
            errorText={formErrors.confirmPassword}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} alignItems="center" spacing={1}>
        <Grid container item xs={12} md={5} lg={4}>
          {!loading && <CustomButton title={"cancel"} onClick={onCancel} />}
        </Grid>
        <Grid container item xs={12} md={5} lg={4}>
          <CustomButton
            title={"confirm"}
            onClick={handleSubmitForm}
            loading={loading}
          />
        </Grid>
      </Grid>
      <PasswordRecoverySuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </Grid>
  );
};
PasswordChange.propTypes = {
  userId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};
const useStyles = makeStyles((theme) => ({
  ccrt_textField_container: {
    marginBottom: "5px",
    width: "100%",
  },
  ccrt_textField_label: {
    marginBottom: "5px",
    fontSize: "80%",
    fontWeight: "500",
  },
  smallTextStyle: {
    fontSize: "80%",
    fontWeight: "500",
    color: theme.palette.custom.BLACK,
  },
  headerStyle: {
    fontSize: "100%",
    fontWeight: "bold",
    color: theme.palette.custom.BLACK,
  },
}));
export default PasswordChange;
