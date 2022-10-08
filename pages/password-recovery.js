import React, { useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Head from "next/head";
import SignUpTextField from "../components/textfields/SignUpTextField";
import CustomButton from "../components/button/CustomButton";
import { validateEmail } from "../controllers/SignupController";
import { formErrors } from "../data/signup/data";
import { BOX_SHADOW } from "../misc/colors";
import AccountFound from "../components/passwordRecovery/AccountFound";
import PasswordChange from "../components/passwordRecovery/PasswordChange";
import { findUserByEmail } from "../controllers/UserController";
import CustomSnackbar from "../components/snackbar/CustomSnackbar";
import { handleSnackbarClose, handleSnackbarOpen } from "../misc/functions";
import {
  APP_BAR_HEIGHT,
  BODY_HEIGHT,
  SNACKBAR_INITIAL_STATE,
} from "../misc/constants";

const PasswordRecoveryScreen = () => {
  const classes = useStyles();

  const user = useRef(null);
  const [email, setEmail] = useState("");
  //   const [userDetails, setUserDetails] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAccountFound, setIsAccountFound] = useState(false);
  const [hasRes, setHasRes] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const searchUserByEmail = async () => {
    try {
      if (validate(email)) {
        setLoading(true);
        const foundUser = await findUserByEmail(email);
        user.current = foundUser;
        setIsAccountFound(true);
        setHasRes(true);
        setLoading(false);
      } else {
        setShowError(true);
      }
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.code + ": " + data.message);
      }
    }
  };

  const validate = (email) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = validateEmail(email);
    return isEverythingAllRight;
  };

  return (
    <Grid
      className={classes.ccrt__passwordRecovery__container}
      container
      justifyContent="center"
      alignItems="center"
    >
      <Head>
        <title>Recover Password</title>
      </Head>

      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        item
        xs={11}
        sm={10}
        md={6}
        className={classes.ccrt__passwordRecovery__wrapper}
      >
        {isChangingPass === false ? (
          <>
            {hasRes === true && isAccountFound === true ? (
              <AccountFound
                userId={user?.current.userId}
                email={user?.current.email}
                name={user?.current.firstName + " " + user?.current.lastName}
                imageUrl={user?.current.profileImageUrl}
                notYouHandler={() => {
                  setHasRes(false);
                  setIsAccountFound(false);
                  setEmail("");
                }}
                onSuccess={() => {
                  setIsChangingPass(true);
                  setIsAccountFound(false);
                  setHasRes(false);
                }}
                openSnackbar={openSnackbar}
              />
            ) : (
              <>
                <Grid container justifyContent={"center"} alignItems="center">
                  <Typography
                    className={classes.ccrt__passwordRecovery__header}
                  >
                    Password Recovery
                  </Typography>
                </Grid>
                <Grid
                  container
                  justifyContent={"flex-start"}
                  alignItems="center"
                  className={classes.ccrt_textField_container}
                >
                  <Typography className={classes.ccrt_textField_label}>
                    Enter your email address
                  </Typography>
                  <Grid
                    container
                    flexDirection={"row"}
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems="center"
                      style={{ marginBottom: 15 }}
                    >
                      <SignUpTextField
                        type="text"
                        label="email address"
                        variant="outlined"
                        value={email}
                        onChange={handleEmail}
                        error={showError && !validateEmail(email)}
                        errorText={formErrors.email}
                      />
                    </Grid>
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems="center"
                    >
                      <CustomButton
                        title={"search"}
                        onClick={searchUserByEmail}
                        loading={loading}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </>
        ) : (
          <PasswordChange
            userId={user?.current.userId}
            onCancel={() => {
              setIsChangingPass(false);
              setHasRes(false);
              setIsAccountFound(false);
              setEmail("");
            }}
            openSnackbar={openSnackbar}
          />
        )}
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        onClose={() => handleSnackbarClose(setSnackbar)}
        message={snackbar.message}
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__passwordRecovery__container: {
    width: "calc(100vw - 5px)",
    height: BODY_HEIGHT,
    marginTop: APP_BAR_HEIGHT,
  },
  ccrt__passwordRecovery__wrapper: {
    boxShadow: BOX_SHADOW,
    borderRadius: "5px",
    padding: "20px 10px",
  },
  ccrt__passwordRecovery__header: {
    fontSize: "120%",
    fontWeight: "bold",
    color: theme.palette.custom.BLACK,
    marginBottom: "10px",
    textTransform: "capitalize",
  },
  ccrt_textField_label: {
    marginBottom: "15px",
    fontSize: "85%",
    fontWeight: "500",
    color: theme.palette.custom.BLACK,
  },
}));

export default PasswordRecoveryScreen;
