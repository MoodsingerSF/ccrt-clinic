import React from "react";
import Link from "next/link";
import { Chip, Grid, Typography } from "@mui/material";
import { useStyles } from "../../../styles/blogDetailstyle";

const BlogPopularTags = () => {
  const classes = useStyles();
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
      <Grid container justifyContent="center" alignItems="center">
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
  );
};

export default BlogPopularTags;
