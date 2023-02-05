import React, { useContext, useState } from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { formErrors } from "../../data/signup/data";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../controllers/signupController";
import CustomButton from "../../components/button/CustomButton";
import SignUpTextField from "../../components/textfields/SignUpTextField";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import classNames from "classnames";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import {
  APP_BAR_HEIGHT,
  BODY_HEIGHT,
  SNACKBAR_INITIAL_STATE,
} from "../../misc/constants";
import { isGuest, updatePassword } from "../../controllers/UserController";
import ForbiddenComponent from "../../components/misc/ForbiddenComponent";
import { Context } from "../../contexts/user-context/UserContext";

const ChangePassword = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { getRole } = useContext(Context);
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLg = useMediaQuery(theme.breakpoints.up("lg"));

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmNewPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };

  const handleSubmitForm = async () => {
    try {
      setLoading(true);
      if (validate(currentPassword, newPassword, confirmPassword)) {
        await updatePassword(currentPassword, newPassword);
        setLoading(false);
        openSnackbar("Password has been updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowError(false);
      } else {
        setShowError(true);
      }
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.code + ":" + data.message);
      }
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

  if (isGuest(getRole())) return <ForbiddenComponent />;

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
          [classes.ccrt__change_password__containerMobile]: !matchesSm,
          [classes.ccrt__change_password__containerDesktopSm]: matchesSm,
          [classes.ccrt__change_password__containerDesktopMd]: matchesMd,
          [classes.ccrt__change_password__containerDesktopLg]: matchesLg,
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
            <Grid container justifyContent={"center"} alignItems="center">
              <SignUpTextField
                label={"Current password"}
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
            <Grid container justifyContent={"center"} alignItems="center">
              <SignUpTextField
                label={"New password"}
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
            <Grid container justifyContent={"center"} alignItems="center">
              <SignUpTextField
                label={"Retype new password"}
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
      <CustomSnackbar
        open={snackbar.open}
        onClose={() => handleSnackbarClose(setSnackbar)}
        message={snackbar.message}
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt_change_password_container: {
    marginTop: APP_BAR_HEIGHT,
    height: BODY_HEIGHT,
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
    fontSize: "110%",
    fontWeight: "bold",
    marginBottom: "15px",
    textTransform: "capitalize",
    color: theme.palette.custom.BLACK,
  },
  ccrt_textField_container: {
    // marginBottom: "15px",
    width: "100%",
  },
  ccrt_textField_label: {
    marginBottom: "5px",
    fontSize: "80%",
    fontWeight: "500",
  },
}));

export default ChangePassword;
