import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SignUpTextField from "../textfields/SignUpTextField";
import { formErrors } from "../../data/signup/data";
import CustomButton from "../button/CustomButton";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../controllers/signupController";
import { BOX_SHADOW } from "../../misc/colors";
import { CREATE_BUTTON } from "../../data/dashboard/data";

const CreateNewAdmin = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmitForm = () => {
    if (validate(firstName, lastName, email, password)) {
      // if everything is alright, send verification code
    } else {
      setShowError(true);
    }
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
      className={classes.ccrt_dashboard_create_new_admin}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.ccrt_dashboard_create_new_admin_form}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.ccrt_dashboard_create_new_admin_form__container}
          >
            <Typography
              style={{
                textTransform: "capitalize",
                fontWeight: "600",
                fontSize: "120%",
              }}
            >
              Create New Admin
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
                // loading={true}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt_dashboard_create_new_admin: {
    marginTop: "100px",
    // change for mobile
  },
  ccrt_dashboard_create_new_admin_form: {
    height: "100%",
    width: "70%",
    background: "#ffffff",
    boxShadow: BOX_SHADOW,
    padding: "50px 0",
    // change for mobile
  },
  ccrt_dashboard_create_new_admin_form__container: {
    width: "70%",
  },
});
export default CreateNewAdmin;
