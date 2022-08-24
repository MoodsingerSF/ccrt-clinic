import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import ContactPageCard from "../components/cards/ContactPageCard";
import ContactFooter from "../components/contact/ContactFooter";
import classNames from "classnames";

const Contact = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classNames({
        [classes.ccrt_contact__page_container__mobile]: !matches,
        [classes.ccrt_contact__page_container__desktop]: matches,
      })}
    >
      <Grid container spacing={2} style={{ margin: "30px 0" }}>
        <ContactPageCard
          heading="Phone"
          text="212-333-4633"
          icon={<LocalPhoneIcon fontSize="large" />}
        />
        <ContactPageCard
          heading="Email"
          text="yourname@gmail.com"
          icon={<EmailIcon fontSize="large" />}
        />
        <ContactPageCard
          heading="Address"
          text="Ultrices tristique"
          icon={<PlaceIcon fontSize="large" />}
        />
      </Grid>
      <ContactFooter />
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  ccrt_contact__page_container__mobile: {
    padding: "0 10px",
    marginBottom: "10px",
  },
  ccrt_contact__page_container__desktop: {
    padding: "0 70px",
    marginBottom: "10px",
  },
}));
export default Contact;
