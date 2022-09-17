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
  USER_GENDER,
  USER_TYPES,
  validateBirthDate,
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
// import BasicDatePicker from "../components/misc/BasicDatePicker";
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
  const [userType, setUserType] = useState(USER_TYPES[0]);
  const [userGender, setUserGender] = useState(USER_GENDER[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  console.log(birthDate);
  const [specialization, setSpecialization] = useState("");
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
  const handleUserGenderChange = (e) => {
    setUserGender(e.target.value);
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
  const handleBirthDate = (e) => {
    setBirthDate(e.target.value);
  };
  const handleSpecialization = (e) => {
    setSpecialization(e.target.value);
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
    await signUp(userType, firstName, lastName, email, password);
    router.push("/login");
  };

  const handleSubmitForm = () => {
    if (
      validate(
        firstName,
        lastName,
        email,
        password,
        confirmedPassword,
        policy,
        birthDate
      )
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
    policy,
    birthDate
  ) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      validateName(firstName) &&
      validateName(lastName) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword, password) &&
      validateBirthDate(birthDate) &&
      policy;
    return isEverythingAllRight;
  };

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "12vh" }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "88vh" }}
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
            xs={12}
            md={8}
            style={{ minHeight: "88vh" }}
            className={classNames({
              [classes.ccrt__signup__right]: !matches,
              [classes.ccrt__signup__right__Sm]: matches,
              [classes.ccrt__signup__right__Md]: matchesMD,
            })}
          >
            <Typography className={classes.sign_up_title}>
              {SIGN_UP_TITLE}
            </Typography>
            <Grid
              container
              justifyContent={"space-between"}
              style={{ marginBottom: "10px" }}
            >
              <Grid item xs={12} md={6}>
                <Typography className={classes.field_title}>
                  Choose your role
                </Typography>
                <Grid container justifyContent="flex-start" alignItems="center">
                  {USER_TYPES.map((role) => {
                    return (
                      <CustomCheckbox
                        key={role}
                        name={role}
                        checked={userType === role}
                        value={role}
                        onChange={handleUserTypeChange}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography className={classes.field_title}>Gender</Typography>
                <Grid container justifyContent="flex-start" alignItems="center">
                  {USER_GENDER.map((gender) => {
                    return (
                      <CustomCheckbox
                        key={gender}
                        name={gender}
                        checked={userGender === gender}
                        value={gender}
                        onChange={handleUserGenderChange}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <SignUpTextField
                    label="First Name"
                    variant="outlined"
                    type="text"
                    value={firstName}
                    onChange={handleFirstName}
                    error={showError && !validateName(firstName)}
                    errorText={formErrors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SignUpTextField
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    value={lastName}
                    onChange={handleLastName}
                    error={showError && !validateName(lastName)}
                    errorText={formErrors.name}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <SignUpTextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    error={showError && !validateEmail(email)}
                    errorText={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SignUpTextField
                    // label="Birth Date"
                    variant="outlined"
                    // shrink={true}
                    type="date"
                    value={birthDate}
                    onChange={handleBirthDate}
                    error={showError && !validateBirthDate(birthDate)}
                    errorText={formErrors.birthDate}
                  />
                  {/* <BasicDatePicker
                    label={"Date of birth"}
                    value={birthDate}
                    onChange={(newValue) => setBirthDate(newValue)}
                  /> */}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                {userType === "DOCTOR" && (
                  <SignUpTextField
                    label="Specialization"
                    variant="outlined"
                    type="text"
                    value={specialization}
                    onChange={handleSpecialization}
                    error={showError && !validateName(specialization)}
                    errorText={formErrors.specialization}
                  />
                )}
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <SignUpTextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    error={showError && !validatePassword(password)}
                    errorText={formErrors.password}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SignUpTextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={confirmedPassword}
                    onChange={handleConfirmPassword}
                    error={
                      showError &&
                      !validateConfirmPassword(confirmedPassword, password)
                    }
                    errorText={formErrors.confirmPassword}
                  />
                </Grid>
              </Grid>

              <Grid container flexDirection={"column"}>
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
                  <Typography
                    className={classes.ccrt__signup__policyError__text}
                  >
                    {formErrors.policy}
                  </Typography>
                )}
              </Grid>
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
    </Grid>
  );
};

export default SignupScreen;
