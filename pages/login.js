import React, { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Grid, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import { useStyles } from "../styles/LoginStyles";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { formErrors } from "../data/signup/data";
import SignUpTextField from "../components/textfields/SignUpTextField";
import {
  validateEmail,
  validatePassword,
} from "../controllers/SignupController";
import {
  FORGOT__PASSWORD,
  HEADER_TITLE,
  LOGIN,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_GOOGLE,
} from "../data/login/data";
import CustomButton from "../components/button/CustomButton";
import CustomSnackbar from "../components/snackbar/CustomSnackbar";
import {
  AUTHORIZATION_HEADER_PREFIX,
  SNACKBAR_INITIAL_STATE,
} from "../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../misc/functions";
import { login } from "../controllers/LoginController";
import { StatusCodes } from "http-status-codes";
import {
  setAuthorizationToken,
  setUserId,
} from "../controllers/LocalStorageController";
import { Context } from "../contexts/user-context/UserContext";
import { useRouter } from "next/router";
import { retrieveUserDetails } from "../controllers/UserController";
import { getModifiedUserState } from "../components/data-middleware/UserDataMiddleware";

const LoginScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
  const {
    setAuthorizationToken: setAuthorizationTokenInProvider,
    setUserId: setUserIdInProvider,
    setUser,
  } = useContext(Context);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
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
  const retrieveUserDetailsHelper = async () => {
    try {
      const response = await retrieveUserDetails();
      if (response.status === 200) {
        setUser(getModifiedUserState(response.data));
      }
    } catch (error) {
      //
    }
  };
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await login(email, password);
      if (response.status === 200) {
        const authorizationToken = response.headers.authorization.replace(
          AUTHORIZATION_HEADER_PREFIX,
          ""
        );
        const userId = response.headers.userid;
        setAuthorizationToken(authorizationToken);
        setUserId(userId);
        setAuthorizationTokenInProvider(authorizationToken);
        setUserIdInProvider(userId);
        await retrieveUserDetailsHelper();
        router.replace("/");
      }
      setLoading(false);
    } catch (error) {
      if (error && error.response) {
        const status = error.response.status;
        if (status === StatusCodes.FORBIDDEN) {
          openSnackbar("Username and password haven't matched.");
        }
      }
      setLoading(false);
    }
  };
  const handleSubmitForm = () => {
    if (validate(email, password)) {
      onLogin();
    } else {
      setShowError(true);
    }
  };
  const validate = (email, password) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = validateEmail(email) && validatePassword(password);
    return isEverythingAllRight;
  };

  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
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
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => handleSnackbarClose(setSnackbar)}
      />
    </>
  );
};

export default LoginScreen;
