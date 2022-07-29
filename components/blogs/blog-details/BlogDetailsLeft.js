import React from "react";
// import Image from "next/image";
import Link from "next/link";
import { Chip, Grid, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import Author from "../../../public/image/blogDetails/author.png";
import { useStyles } from "../../../styles/blogDetailstyle";
import BlogDetailsAuthorCard from "../../cards/BlogDetailsAuthorCard";

const BlogDetailsLeft = () => {
  const classes = useStyles();
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
      <BlogDetailsAuthorCard />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.ccrt__blogDetails__tags__container}
      >
        <Typography className={classes.ccrt__blogDetails__popular_tag__title}>
          Popular tags
        </Typography>
        <Grid container>
          <Link href="#">
            <a>
              <Chip
                label="cancer"
                className={classes.ccrt__blogDetails__popular_tags}
              />
            </a>
          </Link>
          <Link href="#">
            <a>
              <Chip
                label="heart"
                className={classes.ccrt__blogDetails__popular_tags}
              />
            </a>
          </Link>
          <Link href="#">
            <a>
              <Chip
                label="liver"
                className={classes.ccrt__blogDetails__popular_tags}
              />
            </a>
          </Link>
          <Link href="#">
            <a>
              <Chip
                label="leukemia"
                className={classes.ccrt__blogDetails__popular_tags}
              />
            </a>
          </Link>
          <Link href="#">
            <a>
              <Chip
                label="cancer"
                className={classes.ccrt__blogDetails__popular_tags}
              />
            </a>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogDetailsLeft;
