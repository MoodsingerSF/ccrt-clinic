import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, Grid, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import { useStyles } from "../../styles/blogDetailstyle";
import Author from "../../public/image/blogDetails/author.png";

const BlogDetailsAuthorCard = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__blogDetails__author__container}
    >
      <Avatar style={{ height: "150px", width: "150px" }}>
        <Image src={Author} alt="author" />
      </Avatar>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.ccrt__blogDetails__author__info}
      >
        {/* <Typography> */}
        <Link href="#">
          <a className={classes.ccrt__blogDetails__author__title}>Joe Willis</a>
        </Link>
        {/* </Typography> */}

        <Grid container justifyContent="center" alignItems="center">
          <Typography className={classes.ccrt__blogDetails__author__subtitle}>
            Author
          </Typography>
          <Typography style={{ textAlign: "center" }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor
          </Typography>
        </Grid>

        <ul>
          <li className={classes.ccrt__blogDetails__author__share}>
            <Link href="#">
              <a>
                <FacebookIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
              </a>
            </Link>
          </li>
          <li className={classes.ccrt__blogDetails__author__share}>
            <Link href="#">
              <a>
                <TwitterIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
              </a>
            </Link>
          </li>
          <li className={classes.ccrt__blogDetails__author__share}>
            <Link href="#">
              <a>
                <WhatsAppIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
              </a>
            </Link>
          </li>
          <li className={classes.ccrt__blogDetails__author__share}>
            <Link href="#">
              <a>
                <TelegramIcon style={{ color: DEFAULT_COLOR_MINUS_2 }} />
              </a>
            </Link>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default BlogDetailsAuthorCard;
