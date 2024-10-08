import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import ContactPageCard from "../components/cards/ContactPageCard";
import ContactFooter from "../components/contact/ContactFooter";
import classNames from "classnames";
import { APP_BAR_HEIGHT } from "../misc/constants";

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
      <Grid container spacing={2} style={{ marginBottom: 40, marginTop: 15 }}>
        <ContactPageCard
          heading="Phone"
          text="+8801726932272"
          icon={<LocalPhoneIcon fontSize="large" />}
        />
        <ContactPageCard
          heading="Email"
          text="ccrtbd@gmail.com"
          icon={<EmailIcon fontSize="large" />}
        />
        <ContactPageCard
          heading="Address"
          text="Dhaka, Bangladesh"
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
    paddingTop: APP_BAR_HEIGHT,
  },
  ccrt_contact__page_container__desktop: {
    padding: "0 70px",
    marginBottom: "10px",
    paddingTop: APP_BAR_HEIGHT,
  },
}));
export default Contact;
