import React from "react";
import { Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";

const SocialShareComponent = ({ justifyContent = "center", link }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      container
      justifyContent={justifyContent}
      alignItems="center"
    >
      <FacebookShareButton
        url={link}
        className={classes.ccrt__blogDetails__author__share}
      >
        <FacebookIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
      </FacebookShareButton>

      <TwitterShareButton
        url={link}
        className={classes.ccrt__blogDetails__author__share}
      >
        <TwitterIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
      </TwitterShareButton>
      <WhatsappShareButton
        url={link}
        className={classes.ccrt__blogDetails__author__share}
      >
        <WhatsAppIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
      </WhatsappShareButton>
      <TelegramShareButton
        url={link}
        className={classes.ccrt__blogDetails__author__share}
      >
        <TelegramIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
      </TelegramShareButton>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__blogDetails__author__share: {
    display: "inline-block",
    listStyle: "none",
    margin: "0 10px",
  },
});

SocialShareComponent.propTypes = {
  justifyContent: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export default SocialShareComponent;
