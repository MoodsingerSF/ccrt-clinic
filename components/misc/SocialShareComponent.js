import React from "react";
import Link from "next/link";
import { Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

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
      <ul>
        <li className={classes.ccrt__blogDetails__author__share}>
          <Link href={link}>
            <a>
              <FacebookIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
            </a>
          </Link>
        </li>
        <li className={classes.ccrt__blogDetails__author__share}>
          <Link href={link}>
            <a>
              <TwitterIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
            </a>
          </Link>
        </li>
        <li className={classes.ccrt__blogDetails__author__share}>
          <Link href={link}>
            <a>
              <WhatsAppIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
            </a>
          </Link>
        </li>
        <li className={classes.ccrt__blogDetails__author__share}>
          <Link href={link}>
            <a>
              <TelegramIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
            </a>
          </Link>
        </li>
      </ul>
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
