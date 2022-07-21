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
import { DEFAULT_COLOR } from "../misc/colors";
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
  const classes2 = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [policy, setPolicy] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputfieldName = (e) => {
    setName(e.target.value);
  };
  const handleInputfieldEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleInputfieldPass = (e) => {
    setPassword(e.target.value);
  };
  const handleInputfieldEmailConPass = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleInputfieldPolicy = () => {
    setPolicy(!policy);
  };

  const handleSubmitForm = () => {
    if (validate(name, email, password, confirmPassword, policy)) {
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
      className={classNames({
        [classes2.containerMobile]: !matches,
        [classes2.containerDesktopSm]: matches,
        [classes2.containerDesktopMd]: matchesMD,
        [classes2.containerDesktopLg]: matchesLG,
      })}
    >
      <Grid
        item
        sm={12}
        md={4}
        align="center"
        className={classNames({
          [classes2.ccrt__signup__left]: !matches,
          [classes2.ccrt__signup__left__Sm]: matches,
          [classes2.ccrt__signup__left__Md]: matchesMD,
          [classes2.ccrt__signup__left__Lg]: matchesLG,
        })}
      >
        <Image src={logo} />
        <Grid
          className={classNames({
            [classes2.ccrt__signup__left__desc]: !matches,
            [classes2.ccrt__signup__left__desc__Sm]: matches,
          })}
        >
          <h2 style={{ color: "white" }}>{TITLE}</h2>
          <Typography
            style={{
              color: "white",
              textAlign: "justify",
              padding: "0 20px",
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
          [classes2.ccrt__signup__right]: !matches,
          [classes2.ccrt__signup__right__Sm]: matches,
          [classes2.ccrt__signup__right__Md]: matchesMD,
        })}
      >
        <h2>{SIGN_UP_TITLE}</h2>
        <Grid>
          <SignUpTextField
            label="Full Name"
            type="text"
            value={name}
            onChange={handleInputfieldName}
            error={showError && !validateName(name)}
            errorText={formErrors.name}
          />
          <SignUpTextField
            label="Email"
            type="email"
            value={email}
            onChange={handleInputfieldEmail}
            error={showError && !validateEmail(email)}
            errorText={formErrors.email}
          />

          <SignUpTextField
            label="Password"
            type="password"
            value={password}
            onChange={handleInputfieldPass}
            error={showError && !validatePassword(password)}
            errorText={formErrors.password}
          />
          <SignUpTextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleInputfieldEmailConPass}
            error={
              showError && !validateConfirmPassword(confirmPassword, password)
            }
            errorText={formErrors.confirmPassword}
          />
          <FormControlLabel
            control={
              <Checkbox checked={policy} onChange={handleInputfieldPolicy} />
            }
            label={
              <span style={{ fontSize: "16px", color: "#666666" }}>
                {TERMS_CONDITIONS}
              </span>
            }
            style={{ marginTop: "20px" }}
          />
          {showError && !policy && (
            <Typography
              style={{ color: "red", fontSize: "10px", marginBottom: "5px" }}
            >
              {formErrors.policy}
            </Typography>
          )}
          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={handleSubmitForm}
          >
            {SIGN_UP_BUTTON}
          </Button>
        </Grid>
        <Grid align="center" my={2}>
          <span>Or</span>
        </Grid>
        <Grid
          className={classNames({
            [classes2.ccrt__signup__another__way]: !matches,
          })}
        >
          <Button
            variant="contained"
            fullWidth
            style={{
              position: "relative",
              cursor: "pointer",
              marginBottom: "5px",
            }}
          >
            <GoogleIcon />
            <span style={{ fontSize: "14px", marginLeft: "10px" }}>
              {SIGN_UP_WITH_GOOGLE}
            </span>
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{ position: "relative", cursor: "pointer" }}
          >
            <FacebookIcon />
            <span style={{ fontSize: "14px", marginLeft: "10px" }}>
              {SIGN_UP_WITH_FACEBOOK}
            </span>
          </Button>
        </Grid>
        <Grid align="center" mt={4}>
          <p>
            Already have an account?
            <Link href="/login">
              <a
                style={{
                  textDecoration: "none",
                  color: DEFAULT_COLOR,
                  fontWeight: "500",
                  marginLeft: "5px",
                }}
              >
                Log In
              </a>
            </Link>
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default signup;
