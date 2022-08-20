import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputField from "./InputField";
import {
  validateDescription,
  validateEmail,
  validateName,
} from "../../controllers/ContactFormController";

const ContactFooter = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [showError, setShowError] = useState(false);
  //   const [loading, setLoading] = useState(false);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmitForm = () => {
    if (validate(name, email, description)) {
      // if everything is alright
      //   setLoading(true);
      //api
      console.log(name, email, description);
      console.log("Clicked");
      //   setLoading(false);
    } else {
      //   console.log(name, email, description);
      setShowError(true);
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
      <Grid item lg={6}>
        <Grid container style={{ padding: "0 15px" }}>
          <Grid
            container
            className={classes.ccrt_contact__page__contact__info__subtitle}
          >
            Get In Touch
          </Grid>
          <h2 className={classes.ccrt_contact__page__contact__info__title}>
            We love to hear from you feel free to get in touch
          </h2>
          <Grid container>
            <Typography>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} style={{ marginTop: "30px" }}>
        <InputField
          placeholder="Your Name"
          type="text"
          value={name}
          onChange={handleChangeName}
          error={showError && !validateName(name)}
          errorText={"Invalid Name"}
        />
        <InputField
          placeholder="Your E-mail"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          error={showError && !validateEmail(email)}
          errorText={"Invalid Email"}
        />

        <TextField
          fullWidth
          multiline
          placeholder="Your Message"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{
            rows: 5,
          }}
          style={{ marginBottom: "10px" }}
        />
        {showError && !validateDescription(description) && (
          <Typography
            style={{ color: "red", fontSize: "70%", marginBottom: "5px" }}
          >
            Invalid Message
          </Typography>
        )}
        <Button variant="contained" fullWidth onClick={handleSubmitForm}>
          send message
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt_contact__page__contact__info__subtitle: {
    fontSize: "16px",
    // color: "#412cc5",
    textTransform: "uppercase",
    marginBottom: "16px",
    marginTop: "30px",
  },
  ccrt_contact__page__contact__info__title: {
    fontSize: "180%",
    lineHeight: "42px",
    fontWeight: "700",
    marginBottom: "30px",
  },
}));
export default ContactFooter;
