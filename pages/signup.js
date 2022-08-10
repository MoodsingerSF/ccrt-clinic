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
import { useStyles } from "../styles/SignupStyles";
import {
  sendOtp,
  signUp,
  USER_TYPES,
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../controllers/SignupController";
import CustomButton from "../components/button/CustomButton";
import CustomCheckbox from "../components/checkbox/CustomCheckbox";
import CustomSnackbar from "../components/snackbar/CustomSnackbar";
import { SNACKBAR_INITIAL_STATE } from "../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../misc/functions";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
  const [otpId, setOtpId] = useState("");
  const [userType, setUserType] = useState(USER_TYPES[0].value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [policy, setPolicy] = useState(false);
  const [showError, setShowError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const handleOpenVerificationCodeModal = () => setOpenModal(true);
  const handleCloseVerificationCodeModal = () => setOpenModal(false);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
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
  const handleConfirmPassword = (e) => {
    setConfirmedPassword(e.target.value);
  };
  const handlePolicy = () => {
    setPolicy(!policy);
  };

  const handleSendOtpCode = async () => {
    try {
      setLoading(true);
      const response = await sendOtp(email);

      if (response.status === 200) {
        setOtpId(response.data["otpId"]);
        handleOpenVerificationCodeModal();
      }
      setLoading(false);
    } catch (error) {
      if (error && error.response) {
        handleSnackbarOpen(error.response.data.message, setSnackbar);
      }
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(userType, firstName, lastName, email, password);
      router.push("/login");
    } catch (error) {
      if (error && error.response) {
        handleSnackbarOpen(error.response.data.message, setSnackbar);
      }
    }
  };

  const handleSubmitForm = () => {
    if (
      validate(firstName, lastName, email, password, confirmedPassword, policy)
    ) {
      handleSendOtpCode();
    } else {
      setShowError(true);
    }
  };

  const validate = (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    policy
  ) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      validateName(firstName) &&
      validateName(lastName) &&
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
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
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
            <Typography className={classes.sign_up_title}>
              {SIGN_UP_TITLE}
            </Typography>
            <Grid container>
              <Grid container>
                <Typography className={classes.field_title}>
                  Choose your role
                </Typography>
                <Grid container justifyContent="flex-start" alignItems="center">
                  {USER_TYPES.map((role) => {
                    return (
                      <CustomCheckbox
                        key={role.name}
                        name={role.name}
                        checked={userType === role.value}
                        value={role.value}
                        onChange={handleUserTypeChange}
                      />
                    );
                  })}
                </Grid>
              </Grid>
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
                  <Typography
                    // className={classes.termsTextStyle}
                    className={classNames({
                      [classes.termsTextStyle__Mobile]: !matches,
                      [classes.termsTextStyle__DesktopMd]: matchesMD,
                    })}
                  >
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
                  title={SIGN_UP_BUTTON}
                  onClick={handleSubmitForm}
                  loading={loading}
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
                onClick={() => {}}
              />
            </Grid>
            <Grid container style={{ marginTop: "10px" }}>
              <CustomButton
                title={SIGN_UP_WITH_FACEBOOK}
                icon={<FacebookIcon />}
                onClick={() => {}}
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
          {openModal && (
            <VerificationCodeModal
              openModal={openModal}
              handleCloseVerificationCodeModal={
                handleCloseVerificationCodeModal
              }
              onResend={handleSendOtpCode}
              otpId={otpId}
              handleSignUp={handleSignUp}
            />
          )}
        </Grid>
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
    </>
  );
};

export default SignupScreen;
