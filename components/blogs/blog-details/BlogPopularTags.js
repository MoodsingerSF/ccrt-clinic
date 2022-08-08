import React from "react";
import { Chip, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { DEFAULT_COLOR, DEFAULT_COLOR_MINUS_2 } from "../../../misc/colors";
import { useRouter } from "next/router";

const BlogPopularTags = ({ tags = [] }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__blogDetails__tags__container}
    >
      <Typography className={classes.ccrt__blogDetails__popular_tag__title}>
        Popular tags
      </Typography>
      <Grid container justifyContent="flex-start" alignItems="flex-start">
        {tags.map((tag) => (
          <Chip
            key={tag}
            onClick={() => {
              router.push("/blogs");
            }}
            label={tag}
            className={classes.ccrt__blogDetails__popular_tags}
          />
        ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__blogDetails__tags__container: {
    margin: "20px 0 0 0",
    padding: "34px 40px",
    border: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
  },
  ccrt__blogDetails__popular_tag__title: {
    fontSize: "24px",
    fontWeight: "700",
    textTransform: "capitalize",
    paddingBottom: "25px",
    margin: "0 0 29px",
    borderBottom: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
    color: DEFAULT_COLOR,
    width: "100vw",
    textAlign: "center",
  },
  ccrt__blogDetails__popular_tags: {
    margin: "5px ",
    background: DEFAULT_COLOR_MINUS_2,
    color: "#fff",
    transition: "background  0.5s ease",
    cursor: "pointer",
    "&:hover": {
      background: DEFAULT_COLOR,
    },
  },
});

BlogPopularTags.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default BlogPopularTags;
