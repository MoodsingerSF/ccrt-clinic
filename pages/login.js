import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Grid, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import { useStyles } from "../styles/loginstyles";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { formErrors } from "../data/signup/data";
import SignUpTextField from "../components/textfields/SignUpTextField";
import {
  validateEmail,
  validatePassword,
} from "../controllers/signupController";
import {
  FORGOT__PASSWORD,
  HEADER_TITLE,
  LOGIN,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_GOOGLE,
} from "../data/login/data";
import CustomButton from "../components/button/CustomButton";

const LoginScreen = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmitForm = () => {
    if (validate(email, password)) {
      // if everything is alright, send verification code
      setLoading(true);
      //api
      // setLoading(false);
    } else {
      setShowError(true);
    }
  };
  const validate = (email, password) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = validateEmail(email) && validatePassword(password);
    return isEverythingAllRight;
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          container
          className={classNames({
            [classes.ccrt__login__containerMobile]: !matches,
            [classes.ccrt__login__containerDesktopSm]: matches,
            [classes.ccrt__login__containerDesktopMd]: matchesMD,
            [classes.ccrt__login__containerDesktopLg]: matchesLG,
          })}
        >
          <h2>{HEADER_TITLE}</h2>
          <Grid container>
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
            <Grid container>
              <Link href="#">
                <a className={classes.ccrt__login__forgot__password}>
                  {FORGOT__PASSWORD}
                </a>
              </Link>
            </Grid>
            <CustomButton
              icon={null}
              title={LOGIN}
              onClick={handleSubmitForm}
              size="small"
              loading={loading}
            />
          </Grid>
          <Grid container alignItems="center" justifyContent="center">
            <Typography className={classes.ccrt__login__or__text}>
              Or
            </Typography>
          </Grid>
          <Grid container>
            <Grid container>
              <CustomButton
                title={LOGIN_WITH_GOOGLE}
                icon={<GoogleIcon />}
                onCLick={() => {}}
                size="small"
              />
            </Grid>
            <Grid container style={{ marginTop: "10px" }}>
              <CustomButton
                title={LOGIN_WITH_FACEBOOK}
                icon={<FacebookIcon />}
                onCLick={() => {}}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: "15px" }}
          >
            <Typography>{`Don't have an account?`}</Typography>
            <Link href="/signup">
              <a className={classes.ccrt__login__signup__link}>Signup</a>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginScreen;
