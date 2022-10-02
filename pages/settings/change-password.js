import React, { useState } from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { formErrors } from "../../data/signup/data";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../controllers/SignupController";
import CustomButton from "../../components/button/CustomButton";
import SignUpTextField from "../../components/textfields/SignUpTextField";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import classNames from "classnames";

const ChangePassword = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matcheSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matcheMd = useMediaQuery(theme.breakpoints.up("md"));
  const matcheLg = useMediaQuery(theme.breakpoints.up("lg"));

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmNewPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitForm = () => {
    if (validate(currentPassword, newPassword, confirmPassword)) {
      setLoading(true);
      //   Api Call
      console.log("Successful");
      setLoading(false);
      setOpenSnackbar(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setShowError(true);
    }
  };

  const validate = (currentPassword, newPassword, confirmPassword) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      validatePassword(currentPassword) &&
      validatePassword(newPassword) &&
      validateConfirmPassword(confirmPassword, newPassword);
    return isEverythingAllRight;
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt_change_password_container}
    >
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        className={classNames({
          [classes.ccrt__change_password__containerMobile]: !matcheSm,
          [classes.ccrt__change_password__containerDesktopSm]: matcheSm,
          [classes.ccrt__change_password__containerDesktopMd]: matcheMd,
          [classes.ccrt__change_password__containerDesktopLg]: matcheLg,
        })}
      >
        <Typography className={classes.ccrt__change_password__header}>
          Change Password
        </Typography>
        <Grid container justifyContent={"center"} alignItems="center">
          <Grid
            container
            justifyContent={"flex-start"}
            alignItems="center"
            className={classes.ccrt_textField_container}
          >
            <Typography className={classes.ccrt_textField_label}>
              What's your current password?
            </Typography>
            <Grid container justifyContent={"center"} alignItems="center">
              <SignUpTextField
                type="password"
                variant="outlined"
                value={currentPassword}
                onChange={handleCurrentPassword}
                error={showError && !validatePassword(currentPassword)}
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
            <Typography className={classes.ccrt_textField_label}>
              New password
            </Typography>
            <Grid container justifyContent={"center"} alignItems="center">
              <SignUpTextField
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={handleNewPassword}
                error={showError && !validatePassword(newPassword)}
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
            <Typography className={classes.ccrt_textField_label}>
              Confirm new password
            </Typography>
            <Grid container justifyContent={"center"} alignItems="center">
              <SignUpTextField
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={handleConfirmNewPassword}
                error={
                  showError &&
                  !validateConfirmPassword(confirmPassword, newPassword)
                }
                errorText={formErrors.confirmPassword}
              />
            </Grid>
          </Grid>
          <Grid container>
            <CustomButton
              title={"confirm"}
              onClick={handleSubmitForm}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Grid>
      {openSnackbar && (
        <CustomSnackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={"Successfully change password"}
        />
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt_change_password_container: {
    marginTop: "12vh",
    height: "88vh",
  },
  ccrt__change_password__containerMobile: {
    width: "90%",
  },
  ccrt__change_password__containerDesktopSm: {
    width: "70%",
  },
  ccrt__change_password__containerDesktopMd: {
    width: "50%",
  },
  ccrt__change_password__containerDesktopLg: {
    width: "40%",
  },
  ccrt__change_password__header: {
    fontSize: "130%",
    marginBottom: "15px",
    letterSpacing: "1px",
    textTransform: "capitalize",
  },
  ccrt_textField_container: {
    marginBottom: "15px",
    width: "100%",
  },
  ccrt_textField_label: {
    marginBottom: "5px",
    fontSize: "80%",
    fontWeight: "500",
  },
}));

export default ChangePassword;
