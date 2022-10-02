import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import SignUpTextField from "../textfields/SignUpTextField";
import { makeStyles } from "@mui/styles";
import CustomButton from "../button/CustomButton";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../controllers/SignupController";
import { formErrors } from "../../data/signup/data";

const PasswordChange = ({ onCancel }) => {
  // const router = useRouter();
  const classes = useStyles();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChangeCode = (e) => {
    setCode(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmNewPassword = (e) => {
    setRetypedPassword(e.target.value);
  };

  const handleSubmitForm = () => {
    if (validate(code, password, retypedPassword)) {
      setLoading(true);
      //   Api Call
      console.log("Successful");
      setLoading(false);
    } else {
      setShowError(true);
    }
  };

  const validate = (code, password, retypedPassword) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      validatePassword(code) &&
      validatePassword(password) &&
      validateConfirmPassword(retypedPassword, password);
    return isEverythingAllRight;
  };

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Grid
        container
        justifyContent={"flex-start"}
        alignItems="center"
        className={classes.ccrt_textField_container}
      >
        <Typography className={classes.ccrt_textField_label}>
          What's your code?
        </Typography>
        <Grid container justifyContent={"center"} alignItems="center">
          <SignUpTextField
            type="password"
            variant="outlined"
            value={code}
            onChange={handleChangeCode}
            error={showError && !validatePassword(code)}
            errorText={formErrors.password}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent={"flex-start"}
        alignItems="center"
        className={classes.ccrt_textField_container}
      >
        <Typography className={classes.ccrt_textField_label}>
          New password
        </Typography>
        <Grid container justifyContent={"center"} alignItems="center">
          <SignUpTextField
            type="password"
            variant="outlined"
            value={password}
            onChange={handleChangePassword}
            error={showError && !validatePassword(password)}
            errorText={formErrors.password}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent={"flex-start"}
        alignItems="center"
        className={classes.ccrt_textField_container}
      >
        <Typography className={classes.ccrt_textField_label}>
          Confirm new password
        </Typography>
        <Grid container justifyContent={"center"} alignItems="center">
          <SignUpTextField
            type="password"
            variant="outlined"
            value={retypedPassword}
            onChange={handleConfirmNewPassword}
            error={
              showError && !validateConfirmPassword(retypedPassword, password)
            }
            errorText={formErrors.confirmPassword}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} alignItems="center" spacing={1}>
        <Grid container item xs={12} md={5} lg={4}>
          <CustomButton title={"cancel"} onClick={onCancel} loading={loading} />
        </Grid>
        <Grid container item xs={12} md={5} lg={4}>
          <CustomButton
            title={"confirm"}
            onClick={handleSubmitForm}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  ccrt_textField_container: {
    marginBottom: "15px",
    width: "100%",
  },
  ccrt_textField_label: {
    marginBottom: "5px",
    fontSize: "80%",
    fontWeight: "500",
  },
}));
export default PasswordChange;
