import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, Grid, Typography, useTheme } from "@mui/material";
import { useStyles } from "../../styles/blogDetailstyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import Author from "../../public/image/blogDetails/author.png";
import SocialShareComponent from "../misc/SocialShareComponent";

const BlogDetailsAuthorCard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classNames({
        [classes.ccrt__blogDetails__author__containerMobile]: !matches,
        [classes.ccrt__blogDetails__container__container__Tablet]: matches,
      })}
    >
      <Avatar
        className={classNames({
          [classes.ccrt__blogDetails__author__avatar__mobile]: !matches,
          [classes.ccrt__blogDetails__author__avatar__tablet]: matches,
        })}
      >
        <Image src={Author} alt="author" />
      </Avatar>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.ccrt__blogDetails__author__info}
      >
        <Link href="#">
          <a className={classes.ccrt__blogDetails__author__title}>Joe Willis</a>
        </Link>

        <Grid container justifyContent="center" alignItems="center">
          <Typography className={classes.ccrt__blogDetails__author__subtitle}>
            Author
          </Typography>
          <Typography style={{ textAlign: "center" }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor
          </Typography>
        </Grid>
        <SocialShareComponent link={"sjdguyd"} />
      </Grid>
    </Grid>
  );
};

export default BlogDetailsAuthorCard;
