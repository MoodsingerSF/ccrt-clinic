import React, { useState } from "react";
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

const PasswordRecoveryScreen = () => {
  const classes = useStyles();

  const [gmail, setGmail] = useState("");
  //   const [userDetails, setUserDetails] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAccountFound, setIsAccountFound] = useState(false);
  const [hasRes, setHasRes] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  const handleGmail = (e) => {
    setGmail(e.target.value);
  };

  const handleSubmitForm = () => {
    if (validate(gmail)) {
      setLoading(true);
      //   Api Call
      console.log("Successful");
      setIsAccountFound(true);
      setHasRes(true);
      setLoading(false);
    } else {
      setShowError(true);
    }
  };

  const validate = (gmail) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = validateEmail(gmail);
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
                notYouHandler={() => {
                  setHasRes(false);
                  setIsAccountFound(false);
                  setGmail("");
                }}
                onSuccess={() => {
                  setIsChangingPass(true);
                  setIsAccountFound(false);
                  setHasRes(false);
                }}
              />
            ) : (
              <>
                <Grid container justifyContent={"center"} alignItems="center">
                  <Typography
                    className={classes.ccrt__passwordRecovery__header}
                  >
                    Search your profile
                  </Typography>
                </Grid>
                <Grid
                  container
                  justifyContent={"flex-start"}
                  alignItems="center"
                  className={classes.ccrt_textField_container}
                >
                  <Typography className={classes.ccrt_textField_label}>
                    Search your account by gmail
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
                    >
                      <SignUpTextField
                        type="text"
                        variant="outlined"
                        placeholder="example@gmail.com"
                        value={gmail}
                        onChange={handleGmail}
                        error={showError && !validateEmail(gmail)}
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
                        onClick={handleSubmitForm}
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
            onCancel={() => {
              setIsChangingPass(false);
              setHasRes(false);
              setIsAccountFound(false);
              setGmail("");
            }}
          />
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__passwordRecovery__container: {
    width: "calc(100vw - 5px)",
    height: "88vh",
    marginTop: "12vh",
  },
  ccrt__passwordRecovery__wrapper: {
    boxShadow: BOX_SHADOW,
    borderRadius: "5px",
    padding: "20px 10px",
  },
  ccrt__passwordRecovery__header: {
    fontSize: "120%",
    fontWeight: "300",
    marginBottom: "10px",
    textTransform: "capitalize",
  },
  ccrt_textField_label: {
    marginBottom: "5px",
    fontSize: "80%",
    fontWeight: "500",
  },
}));

export default PasswordRecoveryScreen;
