import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { Avatar, Grid, Typography, useTheme } from "@mui/material";
// import { useStyles } from "../../styles/BlogDetailStyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { DEFAULT_COLOR, DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
const BlogDetailsAuthorCard = ({ name, avatar }) => {
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
        {avatar}
      </Avatar>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.ccrt__blogDetails__author__info}
      >
        <Link href="#">
          <a className={classes.ccrt__blogDetails__author__title}>{name}</a>
        </Link>

        <Grid container justifyContent="center" alignItems="center">
          <Typography className={classes.ccrt__blogDetails__author__subtitle}>
            Author
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles({
  ccrt__blogDetails__author__containerMobile: {
    margin: "40px 0 0 0",
    padding: "20px 10px 0",
    border: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
  },
  ccrt__blogDetails__container__container__Tablet: {
    margin: "20px 0 0 0",
    padding: "20px 10px 0",
    border: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
  },
  ccrt__blogDetails__author__avatar__mobile: {
    height: "100px",
    width: "100px",
  },
  ccrt__blogDetails__author__avatar__tablet: {
    height: "150px",
    width: "150px",
  },
  ccrt__blogDetails__author__info: {
    marginTop: "20px",
  },
  ccrt__blogDetails__author__title: {
    textDecoration: "none",
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: "700",
    margin: "0 0 2px",
    color: DEFAULT_COLOR,
  },
  ccrt__blogDetails__author__subtitle: {
    fontSize: "18px",
    lineHeight: "32px",
    fontWeight: "600",
    color: "#696969",
    margin: "0 0 9px",
  },
});

BlogDetailsAuthorCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default BlogDetailsAuthorCard;
