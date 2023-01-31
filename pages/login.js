import React, { useContext, useState } from "react";
import Head from "next/head";
// import Link from "next/link";
import { Grid, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import { useStyles } from "../styles/loginstyles";
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";
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
  // LOGIN_WITH_FACEBOOK,
  // LOGIN_WITH_GOOGLE,
} from "../data/login/data";
import CustomButton from "../components/button/CustomButton";
import CustomSnackbar from "../components/snackbar/CustomSnackbar";
import {
  APP_BAR_HEIGHT,
  AUTHORIZATION_HEADER_PREFIX,
  BODY_HEIGHT,
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
  const retrieveUserDetailsHelper = async (userId) => {
    try {
      const data = await retrieveUserDetails(userId);
      setUser(getModifiedUserState(data));
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
        await retrieveUserDetailsHelper(userId);
        router.replace("/");
      }
      setLoading(false);
    } catch (error) {
      if (error && error.response) {
        const status = error.response.status;
        if (status === StatusCodes.FORBIDDEN) {
          openSnackbar("Username and password haven't matched.");
        } else if (status === StatusCodes.LOCKED) {
          openSnackbar(
            "Your signup request as a doctor is currently in review."
          );
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
        style={{ minHeight: BODY_HEIGHT, marginTop: APP_BAR_HEIGHT }}
      >
        <Grid
          container
          className={classNames({
            [classes.ccrt__login__containerMobile]: !matches,
            [classes.ccrt__login__containerDesktopSm]: matches,
            [classes.ccrt__login__containerDesktopMd]: matchesMD,
            [classes.ccrt__login__containerDesktopLg]: matchesLG,
          })}
          justifyContent="center"
        >
          <Typography
            style={{
              color: theme.palette.custom.BLACK,
              fontWeight: "bold",
              fontSize: "130%",
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            {HEADER_TITLE}
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <SignUpTextField
                label="Email"
                type="email"
                value={email}
                onChange={handleEmail}
                error={showError && !validateEmail(email)}
                errorText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <SignUpTextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePassword}
                error={showError && !validatePassword(password)}
                errorText={formErrors.password}
              />
            </Grid>
            <Grid container>
              <Typography
                onClick={() => router.push("/password-recovery")}
                className={classes.ccrt__login__forgot__password}
              >
                {FORGOT__PASSWORD}
              </Typography>
            </Grid>
            <CustomButton
              icon={null}
              title={LOGIN}
              onClick={handleSubmitForm}
              size="small"
              loading={loading}
            />
          </Grid>
          {/* <Grid container alignItems="center" justifyContent="center">
            <Typography className={classes.ccrt__login__or__text}>
              Or
            </Typography>
          </Grid> */}
          {/* <Grid container>
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
          </Grid> */}
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: "15px" }}
          >
            <Typography
              className={classes.ccrt__login__or__text}
            >{`Don't have an account?`}</Typography>

            <Typography
              onClick={() => {
                router.push("/signup");
              }}
              className={classes.ccrt__login__signup__link}
            >
              Sign Up
            </Typography>
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
