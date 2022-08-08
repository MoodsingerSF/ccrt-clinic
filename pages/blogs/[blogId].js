import React from "react";
import dynamic from "next/dynamic";
import { Grid, useTheme } from "@mui/material";
import { useStyles } from "../../styles/blogDetailstyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
// import BlogDetailsLeft from "../../components/blogs/blog-details/BlogDetailsLeft";
// import BlogDetailsRight from "../../components/blogs/blog-details/BlogDetailsRight";
// import BlogPopularTags from "../../components/blogs/blog-details/BlogPopularTags";
// import BlogDetailsAuthorCard from "../../components/cards/BlogDetailsAuthorCard";
const BlogDetailsLeft = dynamic(() =>
  import("../../components/blogs/blog-details/BlogDetailsLeft")
);
const BlogDetailsRight = dynamic(() =>
  import("../../components/blogs/blog-details/BlogDetailsRight")
);
const BlogPopularTags = dynamic(() =>
  import("../../components/blogs/blog-details/BlogPopularTags")
);
const BlogDetailsAuthorCard = dynamic(() =>
  import("../../components/cards/BlogDetailsAuthorCard")
);

const BlogDetailsScreen = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  // const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
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
        className={classNames({
          [classes.ccrt__blogDetails__container__mobile]: !matches,
          [classes.ccrt__blogDetails__container_tablet]: matches,
        })}
      >
        <Grid item xs={12} sm={12} md={5} lg={4}>
          <BlogDetailsLeft />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={8}>
          <BlogDetailsRight />
          <Grid
            container
            className={classNames({
              [classes.ccrt__blogDetails__author__Desktop_Md]: matchesMD,
            })}
          >
            <BlogDetailsAuthorCard />
          </Grid>
          <Grid
            container
            className={classNames({
              [classes.ccrt__blog__popular_tags__Desktop_Md]: matchesMD,
            })}
          >
            <BlogPopularTags />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogDetailsScreen;
