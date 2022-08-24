import React, { useState } from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import useMediaQuery from "@mui/material/useMediaQuery";
import SignUpTextField from "../textfields/SignUpTextField";
import { formErrors } from "../../data/signup/data";
import CustomButton from "../button/CustomButton";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../controllers/SignupController";
import { BOX_SHADOW } from "../../misc/colors";
import {
  CREATE_BUTTON,
  CREATE_NEW_ADMIN_TITLE,
} from "../../data/dashboard/data";
import { createAdmin } from "../../controllers/UserController";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { SNACKBAR_INITIAL_STATE } from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";

const CreateNewAdmin = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const handleSubmitForm = async () => {
    if (validate(firstName, lastName, email, password)) {
      try {
        setLoading(true);
        const isCreated = await createAdmin(
          firstName,
          lastName,
          email,
          password
        );
        setLoading(false);
        if (isCreated) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          openSnackbar("A new admin has been added successfully.");
        } else {
          openSnackbar("Admin couldn't be created.");
        }
      } catch (error) {
        setLoading(false);
        if (error && error.response) {
          openSnackbar(error.response.data.message);
        }
      }
    } else {
      setShowError(true);
    }
  };
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validate = (firstName, lastName, email, password) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      validateName(firstName) &&
      validateName(lastName) &&
      validateEmail(email) &&
      validatePassword(password);
    return isEverythingAllRight;
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classNames({
        [classes.ccrt_dashboard_create_new_admin__mobile]: !matchesMobile,
        [classes.ccrt_dashboard_create_new_admin__tablet]: matchesMobile,
        [classes.ccrt_dashboard_create_new_admin__desktop]: matchesDesktop,
      })}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classNames({
            [classes.ccrt_dashboard_create_new_admin_form__mobile]:
              !matchesMobile,
            [classes.ccrt_dashboard_create_new_admin_form__tablet]:
              matchesMobile,
            [classes.ccrt_dashboard_create_new_admin_form__desktop]:
              matchesDesktop,
          })}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classNames({
              [classes.ccrt_dashboard_create_new_admin_form__container__mobile]:
                !matchesMobile,
              [classes.ccrt_dashboard_create_new_admin_form__container__tablet]:
                matchesMobile,
              [classes.ccrt_dashboard_create_new_admin_form__container__desktop]:
                matchesDesktop,
            })}
          >
            <Typography
              className={classes.ccrt_dashboard_create_new_admin__title}
            >
              {CREATE_NEW_ADMIN_TITLE}
            </Typography>
            <SignUpTextField
              label="First Name"
              type="text"
              value={firstName}
              onChange={handleFirstName}
              error={showError && !validateName(firstName)}
              errorText={formErrors.name}
            />
            <SignUpTextField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={handleLastName}
              error={showError && !validateName(lastName)}
              errorText={formErrors.name}
            />
            <SignUpTextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmail}
              error={showError && !validateEmail(email)}
              errorText={formErrors.email}
            />
            <SignUpTextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePassword}
              error={showError && !validatePassword(password)}
              errorText={formErrors.password}
            />
            <Grid container mt={2}>
              <CustomButton
                icon={null}
                title={CREATE_BUTTON}
                onClick={handleSubmitForm}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt_dashboard_create_new_admin__mobile: {
    height: "70vh",
  },
  ccrt_dashboard_create_new_admin__tablet: {
    height: "71vh",
  },
  ccrt_dashboard_create_new_admin__desktop: {
    height: "86vh",
  },
  ccrt_dashboard_create_new_admin_form__mobile: {
    width: "100%",
    background: "#ffffff",
    boxShadow: BOX_SHADOW,
    padding: "15px 0",
  },
  ccrt_dashboard_create_new_admin_form__tablet: {
    width: "100%",
    background: "#ffffff",
    boxShadow: BOX_SHADOW,
    padding: "15px 0",
  },
  ccrt_dashboard_create_new_admin_form__desktop: {
    width: "80%",
    background: "#ffffff",
    boxShadow: BOX_SHADOW,
    padding: "15px 0",
  },
  ccrt_dashboard_create_new_admin_form__container__mobile: {
    width: "90%",
  },
  ccrt_dashboard_create_new_admin_form__container__tablet: {
    width: "65%",
    padding: "20px 0",
  },
  ccrt_dashboard_create_new_admin_form__container__desktop: {
    width: "70%",
    padding: "20px 0",
  },
  ccrt_dashboard_create_new_admin__title: {
    textTransform: "capitalize",
    fontWeight: "600",
    fontSize: "120%",
  },
});
export default CreateNewAdmin;
