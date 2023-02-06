import React, { useMemo, useState } from "react";
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
import {
  formErrors,
  SIGN_UP_BUTTON,
  SIGN_UP_TITLE,
  TERMS_CONDITIONS,
} from "../data/signup/data";
import SignUpTextField from "../components/textfields/SignUpTextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import {
  sendOtp,
  signUp,
  USER_GENDERS,
  USER_TYPES,
  validateBirthDate,
  validateConfirmPassword,
  validateEmail,
  validateFee,
  validateName,
  validatePassword,
} from "../controllers/signupController";
import CustomButton from "../components/button/CustomButton";
import CustomCheckbox from "../components/checkbox/CustomCheckbox";
import CustomSnackbar from "../components/snackbar/CustomSnackbar";
import {
  APP_BAR_HEIGHT,
  BODY_HEIGHT,
  SNACKBAR_INITIAL_STATE,
} from "../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../misc/functions";
import { useRouter } from "next/router";
import BasicDatePicker from "../components/misc/BasicDatePicker";
import TagTextField from "../components/textfields/TagTextField";
import { isTagListCorrect } from "../controllers/BlogController";
import { searchSpecializations } from "../controllers/SpecializationController";
import dayjs from "dayjs";
import { createStyles, makeStyles } from "@mui/styles";
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
  const [gender, setGender] = useState(USER_GENDERS[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(dayjs());
  const dateFormat = new Date(value && value.$d);
  const day = dateFormat.getDate();
  const month = dateFormat.getMonth();
  const year = dateFormat.getFullYear();
  const birthDate = `${year}-${month + 1}-${day}`;
  const [specializationList, setSpecializationList] = useState([]);
  const [fee, setFee] = useState("");
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
  const handleGenderChange = (e) => {
    setGender(e.target.value);
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
  const handleFee = (e) => {
    setFee(e.target.value);
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
    await signUp(
      userType,
      firstName,
      lastName,
      email,
      password,
      gender,
      birthDate,
      specializationList,
      fee
    );
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
        birthDate,
        specializationList,
        fee
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
    birthDate,
    specializationList,
    fee
  ) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      validateName(firstName) &&
      validateName(lastName) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword, password) &&
      validateBirthDate(birthDate) &&
      isTagListCorrect(specializationList) &&
      validateFee(fee) &&
      policy;
    return isEverythingAllRight;
  };
  const firstNameTextField = useMemo(
    () => (
      <SignUpTextField
        label="First Name"
        variant="outlined"
        type="text"
        value={firstName}
        onChange={handleFirstName}
        error={showError && !validateName(firstName)}
        errorText={formErrors.name}
      />
    ),
    [firstName, showError]
  );
  const lastNameTextField = useMemo(
    () => (
      <SignUpTextField
        label="Last Name"
        variant="outlined"
        type="text"
        value={lastName}
        onChange={handleLastName}
        error={showError && !validateName(lastName)}
        errorText={formErrors.name}
      />
    ),
    [lastName, showError]
  );
  const emailTextField = useMemo(
    () => (
      <SignUpTextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={handleEmail}
        error={showError && !validateEmail(email)}
        errorText={formErrors.email}
      />
    ),
    [email, showError]
  );

  const passwordTextField = useMemo(
    () => (
      <SignUpTextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={handlePassword}
        error={showError && !validatePassword(password)}
        errorText={formErrors.password}
      />
    ),
    [password, showError]
  );
  const confirmedPasswordTextField = useMemo(
    () => (
      <SignUpTextField
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={confirmedPassword}
        onChange={handleConfirmPassword}
        error={
          showError && !validateConfirmPassword(confirmedPassword, password)
        }
        errorText={formErrors.confirmPassword}
      />
    ),
    [confirmedPassword, showError]
  );
  const userTypeRadioGroup = useMemo(
    () => (
      <>
        <Typography className={classes.field_title}>Sign up as</Typography>
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
      </>
    ),
    [userType, showError]
  );

  const genderRadioGroup = useMemo(
    () => (
      <>
        <Typography className={classes.field_title}>Gender</Typography>
        <Grid container justifyContent="flex-start" alignItems="center">
          {USER_GENDERS.map((item) => {
            return (
              <CustomCheckbox
                key={item}
                name={item}
                checked={gender === item}
                value={item}
                onChange={handleGenderChange}
              />
            );
          })}
        </Grid>
      </>
    ),
    [gender, showError]
  );

  const feeTextField = useMemo(
    () => (
      <SignUpTextField
        label="Fee"
        variant="outlined"
        type="text"
        value={fee}
        onChange={handleFee}
        error={showError && !validateFee(fee)}
        errorText={formErrors.fee}
      />
    ),
    [fee, showError]
  );

  const tagTextField = useMemo(
    () => (
      <TagTextField
        label={"Specialization"}
        value={specializationList}
        onChange={(event, newValue) => {
          setSpecializationList(() => newValue);
        }}
        error={showError && !isTagListCorrect(specializationList)}
        errorText={formErrors.specializationList}
        retrieveSuggestions={searchSpecializations}
        processData={(data) => data.map((item) => item.name)}
      />
    ),
    [specializationList, showError]
  );

  const birthDateSelector = useMemo(
    () => (
      <>
        <Grid item xs={8}>
          <BasicDatePicker
            label={"Date of birth"}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            error={showError && !validateBirthDate(birthDate)}
            errorText={formErrors.birthDate}
          />
        </Grid>
        <Typography
          style={{
            fontSize: "85%",
            fontWeight: 500,
            marginLeft: 10,
            color: theme.palette.custom.BLACK,
          }}
        >
          Birth Date
        </Typography>
      </>
    ),
    [value, showError]
  );
  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: APP_BAR_HEIGHT }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: BODY_HEIGHT }}
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
            style={{ minHeight: BODY_HEIGHT }}
            className={classNames({
              [classes.ccrt__signup__right]: !matches,
              [classes.ccrt__signup__right__Sm]: matches,
              [classes.ccrt__signup__right__Md]: matchesMD,
            })}
          >
            <Typography
              style={{
                color: theme.palette.custom.BLACK,
                fontSize: "130%",
                fontWeight: 600,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {SIGN_UP_TITLE}
            </Typography>
            <Grid
              container
              justifyContent={"space-between"}
              style={{ marginBottom: "10px" }}
            >
              <Grid item xs={12} md={6}>
                {userTypeRadioGroup}
              </Grid>
              <Grid item xs={12} md={6}>
                {genderRadioGroup}
              </Grid>
            </Grid>
            <Grid container>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {firstNameTextField}
                </Grid>
                <Grid item xs={12} md={6}>
                  {lastNameTextField}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {emailTextField}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  container
                  direction={"row"}
                  style={{ marginBottom: 10 }}
                  alignItems="center"
                >
                  {birthDateSelector}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {userType === "DOCTOR" && tagTextField}
                </Grid>
                <Grid item xs={12} md={6}>
                  {userType === "DOCTOR" && feeTextField}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {passwordTextField}
                </Grid>
                <Grid item xs={12} md={6}>
                  {confirmedPasswordTextField}
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

const useStyles = makeStyles((theme) =>
  createStyles({
    containerMobile: {
      borderRadius: "0px",
      background: "none",
    },
    containerDesktopSm: {
      background: theme.palette.custom.BLACK,
    },
    containerDesktopMd: {
      background: theme.palette.custom.BLACK,
      width: "100%",
    },
    containerDesktopLg: {
      width: "100%",
      background: theme.palette.custom.BLACK,
    },
    ccrt__signup__right: {
      background: "#fff",
      borderRadius: "0px",
      padding: "0 20px 20px 20px",
    },
    ccrt__signup__right__Sm: {
      background: "#fff",
      padding: "20px 50px",
    },
    ccrt__signup__right__Md: {
      width: "50%",
      padding: "20px 90px",
    },
    linkStyle: {
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontWeight: "bold",
      fontSize: "90%",
      marginLeft: "10px",
    },
    termsTextStyle__Mobile: {
      fontSize: "80%",
      color: theme.palette.grey[900],
    },
    termsTextStyle__DesktopMd: {
      fontSize: "90%",
    },
    ccrt__signup__policyError__text: {
      color: "red",
      fontSize: "70%",
      marginBottom: "15px",
    },
    sign_up_title: {
      fontSize: "180%",
      fontWeight: "bold",
      textAlign: "center",
    },
    field_title: {
      fontWeight: 500,
      // textTransform: "capitalize",
      fontSize: "85%",
      color: theme.palette.custom.BLACK,
    },
  })
);

export default SignupScreen;
