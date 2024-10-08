import React, { lazy, useEffect, useState } from "react";
import { Grid, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { retrieveBlogDetails } from "../../controllers/BlogController";
import Head from "next/head";
import { APP_BAR_HEIGHT, DOMAIN_ADDRESS } from "../../misc/constants";
import FallbackComponent from "../../components/misc/FallbackComponent";
import NotFoundComponent from "../../components/misc/NotFoundComponent";
const BlogDetailsLeft = lazy(() =>
  import("../../components/blogs/blog-details/BlogDetailsLeft")
);
const BlogDetailsRight = lazy(() =>
  import("../../components/blogs/blog-details/BlogDetailsRight")
);
const BlogPopularTags = lazy(() =>
  import("../../components/blogs/blog-details/BlogPopularTags")
);
const BlogDetailsAuthorCard = lazy(() =>
  import("../../components/cards/BlogDetailsAuthorCard")
);

const BlogDetailsScreen = ({ blogId, title, imageUrl }) => {
  const router = useRouter();
  if (router.isFallback) return <FallbackComponent />;

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(true);
  const getBlogDetails = async (blogId) => {
    try {
      setLoading(true);
      const response = await retrieveBlogDetails(blogId);
      setBlog(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        setFound(false);
      }
    }
  };

  useEffect(() => {
    getBlogDetails(blogId);
  }, [blogId]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:type" content="blog" key="og_type" />
        <meta
          property="og:url"
          content={`${DOMAIN_ADDRESS}blogs/${blogId}`}
          key="og_url"
        />
        <meta property="og:title" content={title} key="og_title" />
        <meta property="og:description" content={title} key="og_description" />
        <meta property="og:image" content={imageUrl} key="og_image" />

        <meta
          property="twitter:card"
          content="summary_large_image"
          key="twitter_card"
        />
        <meta
          property="twitter:url"
          content={`${DOMAIN_ADDRESS}blogs/${blogId}`}
          key="twitter_url"
        />
        <meta property="twitter:title" content={title} key="twitter_title" />
        <meta
          property="twitter:description"
          content={title}
          key="twitter_description"
        />
        <meta property="twitter:image" content={imageUrl} key="twitter_image" />
      </Head>
      {loading ? (
        <FallbackComponent />
      ) : found ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ paddingTop: APP_BAR_HEIGHT }}
        >
          {blog !== null && (
            <Grid container spacing={2} style={{ width: "95%", marginTop: 20 }}>
              <Grid item xs={12} sm={12} md={5} lg={3}>
                <BlogDetailsLeft
                  author={{
                    name: blog.fullName,
                    avatar: "/" + blog.avatar,
                  }}
                  tags={blog.tags}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={6}>
                <BlogDetailsRight
                  title={blog.title}
                  description={blog.description}
                  authorName={blog.fullName}
                  publishDate={blog.creationTime}
                  imageUrl={blog.imageUrl}
                  tags={blog.tags}
                  blogId={blog.blogId}
                />
                {!matchesMD && (
                  <>
                    <Grid container>
                      <BlogDetailsAuthorCard
                        name={blog.fullName}
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
      ) : (
        <NotFoundComponent />
      )}
    </>
  );
};
export async function getStaticProps({ params }) {
  try {
    const response = await retrieveBlogDetails(params.blogId);

    const blog = response.data;
    return {
      props: {
        blogId: blog.blogId,
        title: blog.title,
        imageUrl: blog.imageUrl,
        revalidate: 60,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { blogId: "1" } }],
    fallback: true,
  };
}

BlogDetailsScreen.propTypes = {
  blogId: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
};
export default BlogDetailsScreen;
