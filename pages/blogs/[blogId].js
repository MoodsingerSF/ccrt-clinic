import React from "react";
import { Grid } from "@mui/material";
import { useStyles } from "../../styles/blogDetailstyle";
import BlogDetailsLeft from "../../components/blogs/blog-details/BlogDetailsLeft";
import BlogDetailsRight from "../../components/blogs/blog-details/BlogDetailsRight";

const BlogDetailsScreen = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__blogDetails__section}
    >
      <Grid
        container
        spacing={4}
        className={classes.ccrt__blogDetails__container}
      >
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <BlogDetailsLeft />
        </Grid>
        <Grid item xs={12} sm={6} md={7} lg={8}>
          <BlogDetailsRight />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogDetailsScreen;
