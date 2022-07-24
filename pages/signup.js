import React, { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  formErrors,
  SIGN_UP_BUTTON,
  SIGN_UP_TITLE,
  SIGN_UP_WITH_FACEBOOK,
  SIGN_UP_WITH_GOOGLE,
  TERMS_CONDITIONS,
} from "../data/signup/data";
import SignUpTextField from "../components/textfields/SignUpTextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import { useStyles } from "../styles/signupstyles";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../controllers/signupController";
import CustomButton from "../components/button/Button";
const VerificationCodeModal = dynamic(() =>
  import("../components/modal/VerificationCodeModal")
);
const SignupMobileHeader = dynamic(() =>
  import("../components/pages/signup/SignupMobileHeader")
);
const SignupDesktopSidebar = dynamic(() =>
  import("../components/pages/signup/SignupDesktopSidebar")
);

const SignupScreen = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [policy, setPolicy] = useState(false);
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmedPassword(e.target.value);
  };
  const handlePolicy = () => {
    setPolicy(!policy);
  };

  const handleSubmitForm = () => {
    if (validate(name, email, password, confirmedPassword, policy)) {
      // if everything is alright, send verification code
      handleOpen();
    } else {
      setShowError(true);
    }
  };

  const validate = (name, email, password, confirmPassword, policy) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      validateName(name) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword, password) &&
      policy;
    return isEverythingAllRight;
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={classNames({
          [classes.containerMobile]: !matches,
          [classes.containerDesktopSm]: matches,
          [classes.containerDesktopMd]: matchesMD,
          [classes.containerDesktopLg]: matchesLG,
        })}
      >
        {matches ? <SignupDesktopSidebar /> : <SignupMobileHeader />}
        <Grid
          item
          sm={12}
          md={8}
          className={classNames({
            [classes.ccrt__signup__right]: !matches,
            [classes.ccrt__signup__right__Sm]: matches,
            [classes.ccrt__signup__right__Md]: matchesMD,
          })}
        >
          <h2>{SIGN_UP_TITLE}</h2>
          <Grid container>
            <SignUpTextField
              label="Full Name"
              type="text"
              value={name}
              onChange={handleName}
              error={showError && !validateName(name)}
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
            <SignUpTextField
              label="Confirm Password"
              type="password"
              value={confirmedPassword}
              onChange={handleConfirmPassword}
              error={
                showError &&
                !validateConfirmPassword(confirmedPassword, password)
              }
              errorText={formErrors.confirmPassword}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={policy}
                  onChange={handlePolicy}
                />
              }
              label={
                <Typography className={classes.termsTextStyle}>
                  {TERMS_CONDITIONS}
                </Typography>
              }
            />
            {showError && !policy && (
              <Typography className={classes.ccrt__signup__policyError__text}>
                {formErrors.policy}
              </Typography>
            )}
            <Grid container mt={1}>
              <CustomButton
                icon={null}
                title={SIGN_UP_BUTTON}
                onClick={handleSubmitForm}
                // loading={true}
              />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            item
            xs={12}
          >
            <Typography style={{ margin: "10px 0" }}>Or</Typography>
          </Grid>
          <Grid container>
            <CustomButton
              title={SIGN_UP_WITH_GOOGLE}
              icon={<GoogleIcon />}
              onCLick={() => {}}
            />
          </Grid>
          <Grid container style={{ marginTop: "10px" }}>
            <CustomButton
              title={SIGN_UP_WITH_FACEBOOK}
              icon={<FacebookIcon />}
              onCLick={() => {}}
            />
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            item
            xs={12}
            style={{ marginTop: "10px" }}
          >
            <Typography>Already have an account?</Typography>
            <Link href="/login">
              <a className={classes.linkStyle}>Log In</a>
            </Link>
          </Grid>
        </Grid>
        {open && <VerificationCodeModal open={open} onClose={handleClose} />}
      </Grid>
    </>
  );
};

export default SignupScreen;
