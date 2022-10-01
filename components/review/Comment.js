import React from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const Comment = ({ text }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.ccrt_comment_section_container}>
      <Grid container className={classes.ccrt_comment_section_container_avatar}>
        <Avatar sx={{ width: 38, height: 38 }}>R</Avatar>
      </Grid>
      <Grid container className={classes.ccrt_comment_section_contant}>
        <Grid container>
          <Typography className={classes.ccrt_comment_section_contant_name}>
            Md. Azizul Islam Rajib{" "}
            <span className={classes.ccrt_comment_section_contant_date}>
              {new Date().toDateString()}
            </span>
          </Typography>
        </Grid>
        <Grid container>
          <Typography className={classes.ccrt_comment_section_contant_comment}>
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt_comment_section_container: {
    position: "relative",
    marginBottom: "20px",
  },
  ccrt_comment_section_container_avatar: {
    position: "absolute",
  },
  ccrt_comment_section_contant: {
    marginLeft: "50px",
  },
  ccrt_comment_section_contant_name: {
    fontSize: "85%",
    fontWeight: "500",
    lineHeight: "2rem",
  },
  ccrt_comment_section_contant_date: {
    color: "#909090",
    fontSize: "80%",
  },
  ccrt_comment_section_contant_comment: {
    fontSize: "88%",
  },
});

Comment.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Comment;
