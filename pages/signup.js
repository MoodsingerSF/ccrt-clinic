import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/image/logo/logo.png";
import {
  SIGN_UP_BUTTON,
  SIGN_UP_TITLE,
  SIGN_UP_WITH_FACEBOOK,
  SIGN_UP_WITH_GOOGLE,
  SUBTITLE,
  TERMS_CONDITIONS,
  TITLE,
} from "../data/signup/data";
import SignUpTextField from "../components/textfields/SignUpTextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import { useStyles } from "../styles/signupstyles";
import {
  formErrors,
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../controllers/signupController";

const signup = () => {
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
    <Grid
      container
      alignItems={"center"}
      justifyContent="center"
      className={classNames({
        [classes.containerMobile]: !matches,
        [classes.containerDesktopSm]: matches,
        [classes.containerDesktopMd]: matchesMD,
        [classes.containerDesktopLg]: matchesLG,
      })}
    >
      <Grid
        container
        item
        sm={12}
        md={4}
        alignItems="flex-start"
        justifyContent={"center"}
        className={classNames({
          [classes.ccrt__signup__left]: !matches,
          [classes.ccrt__signup__left__Sm]: matches,
          [classes.ccrt__signup__left__Md]: matchesMD,
          [classes.ccrt__signup__left__Lg]: matchesLG,
        })}
      >
        <Image src={logo} alt="ccrt logo" />
        <Grid
          container
          className={classNames({
            [classes.ccrt__signup__left__desc]: !matches,
            [classes.ccrt__signup__left__desc__Sm]: matches,
          })}
        >
          <h2 style={{ color: "white" }}>{TITLE}</h2>
          <Typography
            style={{
              color: "white",
              textAlign: "justify",
            }}
          >
            {SUBTITLE}
          </Typography>
        </Grid>
      </Grid>
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
              showError && !validateConfirmPassword(confirmedPassword, password)
            }
            errorText={formErrors.confirmPassword}
          />
          <FormControlLabel
            control={<Checkbox checked={policy} onChange={handlePolicy} />}
            label={
              <Typography className={classes.termsTextStyle}>
                {TERMS_CONDITIONS}
              </Typography>
            }
            style={{ marginTop: 20 }}
          />
          {showError && !policy && (
            <Typography
              style={{ color: "red", fontSize: "70%", marginBottom: 5 }}
            >
              {formErrors.policy}
            </Typography>
          )}
          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: 20 }}
            onClick={handleSubmitForm}
          >
            {SIGN_UP_BUTTON}
          </Button>
        </Grid>
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          xs={12}
        >
          <Typography>Or</Typography>
        </Grid>
        <Grid
          container
          className={classNames({
            [classes.ccrt__signup__another__way]: !matches,
          })}
        >
          <Button
            variant="contained"
            fullWidth
            style={{
              marginBottom: 5,
            }}
            startIcon={<GoogleIcon />}
          >
            {SIGN_UP_WITH_GOOGLE}
          </Button>
          <Button variant="contained" fullWidth startIcon={<FacebookIcon />}>
            {SIGN_UP_WITH_FACEBOOK}
          </Button>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          item
          xs={12}
          style={{ marginTop: 10 }}
        >
          <Typography>Already have an account?</Typography>
          <Link href="/login">
            <a className={classes.linkStyle}>Log In</a>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default signup;
