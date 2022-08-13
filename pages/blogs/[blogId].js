import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Grid, useTheme } from "@mui/material";
import { useStyles } from "../../styles/BlogDetailStyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
// import { useRouter } from "next/router";
import { blogData } from "../../data/blog/data";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
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

const BlogDetailsScreen = ({ blog }) => {
  const router = useRouter();
  if (router.isFallback) return null;

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  // const [blog, setBlog] = useState(null);

  // const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
  useEffect(() => {
    // const blogId = router.query.blogId;
    // setBlog(blogData[parseInt(blogId) - 1]);
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__blogDetails__section}
    >
      {blog !== null && (
        <Grid
          container
          spacing={4}
          className={classNames({
            [classes.ccrt__blogDetails__container__mobile]: !matches,
            [classes.ccrt__blogDetails__container_tablet]: matches,
          })}
        >
          <Grid item xs={12} sm={12} md={5} lg={4}>
            <BlogDetailsLeft
              author={{ name: blog.name, avatar: blog.avatar }}
              tags={blog.tags}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={8}>
            <BlogDetailsRight
              title={blog.title}
              description={blog.description}
              authorName={blog.name}
              publishDate={blog.date}
              imageUrl={blog.image}
              tags={blog.tags}
              blogId={blog.blogId}
            />
            {!matchesMD && (
              <>
                <Grid container>
                  <BlogDetailsAuthorCard
                    name={blog.name}
                    avatar={blog.avatar}
                  />
                </Grid>
                <Grid container>
                  <BlogPopularTags tags={blog.tags} />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
export async function getStaticProps({ params }) {
  return {
    props: {
      blog: blogData[parseInt(params.blogId) - 1],
      revalidate: 60,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { blogId: "1" } }],
    fallback: true,
  };
}

BlogDetailsScreen.propTypes = {
  blog: PropTypes.object,
};
export default BlogDetailsScreen;
