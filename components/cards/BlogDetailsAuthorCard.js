import React from "react";
import { Avatar, Grid, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { capitalize } from "lodash";
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
        src={avatar}
      >
        {avatar ? null : capitalize(name).charAt(0)}
      </Avatar>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.ccrt__blogDetails__author__info}
      >
        <Typography className={classes.ccrt__blogDetails__author__title}>
          {name}
        </Typography>

        <Grid container justifyContent="center" alignItems="center">
          <Typography className={classes.ccrt__blogDetails__author__subtitle}>
            Author
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  ccrt__blogDetails__author__containerMobile: {
    margin: "0px 0 0 0",
    padding: "20px 10px 0",
  },
  ccrt__blogDetails__container__container__Tablet: {
    margin: "0px 0 0 0",
    padding: "20px 10px 0",
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
    fontSize: "90%",
    fontWeight: 500,
    margin: "0 0 2px",
    color: theme.palette.custom.BLACK,
    textTransform: "capitalize",
  },
  ccrt__blogDetails__author__subtitle: {
    fontSize: "100%",
    lineHeight: "32px",
    fontWeight: "600",
    color: theme.palette.custom.GREEN,
    margin: "0 0 9px",
  },
}));

BlogDetailsAuthorCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default BlogDetailsAuthorCard;
