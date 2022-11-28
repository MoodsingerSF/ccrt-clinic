import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  validateDescription,
  validateEmail,
  validateName,
} from "../../controllers/ContactFormController";
import SignUpTextField from "../textfields/SignUpTextField";
import { SNACKBAR_INITIAL_STATE } from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import CustomButton from "../button/CustomButton";
import { createSuggestion } from "../../controllers/SuggestionController";

const ContactFooter = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [showError, setShowError] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const openSnackbar = (message) => handleSnackbarOpen(message, setSnackbar);
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (validate(name, email, description)) {
        await createSuggestion(name, email, description);
        openSnackbar(
          "Your suggestion has been sent successfully. Thank you for your suggestion."
        );
      } else {
        setShowError(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.code + ": " + data.message);
      }
    }
  };

  const validate = (name, email, description) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      validateName(name) &&
      validateEmail(email) &&
      validateDescription(description);
    return isEverythingAllRight;
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Grid container>
          <Grid
            container
            className={classes.ccrt_contact__page__contact__info__subtitle}
          >
            Get In Touch
          </Grid>
          <h2 className={classes.ccrt_contact__page__contact__info__title}>
            We love to hear from you. Feel free to get in touch.
          </h2>
          <Grid container>
            <Typography
              className={classes.ccrt_contact__page__contact__details}
            >
              We highly encourage to get in touch with us for any query or
              feedback regarding our service. Just connect with us in your
              favorable platform and we will get back to you right away.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <SignUpTextField
          label="Name"
          type="text"
          variant="outlined"
          value={name}
          onChange={handleChangeName}
          error={showError && !validateName(name)}
          errorText={"Invalid Name"}
        />
        <SignUpTextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={handleChangeEmail}
        />

        <SignUpTextField
          fullWidth
          multiline={true}
          label="Your Message"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={showError && !validateDescription(description)}
          errorText={"Invalid Message"}
        />

        <Grid container>
          <CustomButton
            title="Send Message"
            onClick={handleSubmit}
            loading={loading}
          />
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

const useStyles = makeStyles((theme) => ({
  ccrt_contact__page__contact__info__subtitle: {
    fontSize: "16px",
    color: theme.palette.custom.BLACK,
    textTransform: "uppercase",
    marginBottom: "16px",
    // marginTop: "30px",
  },
  ccrt_contact__page__contact__info__title: {
    fontSize: "180%",
    // lineHeight: "42px",
    fontWeight: "700",
    marginBottom: "30px",
    color: theme.palette.custom.BLACK,
  },
  ccrt_contact__page__contact__details: {
    fontSize: "85%",
    fontWeight: "500",
    marginBottom: "30px",
    color: theme.palette.custom.BLACK,
  },
}));
export default ContactFooter;
