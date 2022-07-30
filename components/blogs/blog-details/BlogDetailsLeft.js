import React from "react";
import { Grid, TextField, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import SearchIcon from "@mui/icons-material/Search";
import { useStyles } from "../../../styles/blogDetailstyle";
import BlogDetailsAuthorCard from "../../cards/BlogDetailsAuthorCard";
import BlogPopularTags from "./BlogPopularTags";

const BlogDetailsLeft = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid container>
      <Grid container className={classes.ccrt__blogDetails__search__container}>
        <TextField
          fullWidth
          placeholder="Search here"
          className={classes.ccrt__blogDetails__searchField}
        />
        <span className={classes.ccrt__blog__details__search__button}>
          <SearchIcon />
        </span>
      </Grid>
      <Grid
        container
        className={classNames({
          [classes.ccrt__blogDetails__author__card]: !matchesMD,
        })}
      >
        <BlogDetailsAuthorCard />
      </Grid>
      <Grid
        container
        className={classNames({
          [classes.ccrt__blog__popular_tags]: !matchesMD,
        })}
      >
        <BlogPopularTags />
      </Grid>
    </Grid>
  );
};

export default BlogDetailsLeft;
