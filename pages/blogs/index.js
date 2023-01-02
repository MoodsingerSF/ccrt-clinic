import React, { useState } from "react";
import Head from "next/head";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import useBlogs from "../../hooks/useBlogs";
import { VerificationStatus } from "../../enums/VerificationStatus";
import BlogCard from "../../components/home-page/blogs/BlogCard";
import { prettyDate } from "../../controllers/DateController";
import { useTheme } from "@mui/styles";
import CustomButton from "../../components/button/CustomButton";

const BlogScreen = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const { blogs, loading, hasMore } = useBlogs(
    page,
    2,
    VerificationStatus.ACCEPTED
  );
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "16vh" }}
      >
        <Grid container style={{ width: "95%", minHeight: "84vh" }}>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={isMobile ? 2 : 4}
          >
            {blogs.map((blog) => {
              return (
                <Grid item xs={6} sm={4} md={3} lg={3} key={blog.blogId}>
                  <BlogCard
                    key={blog.blogId}
                    blogId={blog.blogId}
                    date={prettyDate(blog.creationTime)}
                    image={blog.imageUrl}
                    name={blog.title}
                    tags={blog.tags}
                  />
                </Grid>
              );
            })}
            {loading && (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{
                  ...(blogs.length === 0
                    ? { height: "88vh" }
                    : { marginTop: 20 }),
                }}
              >
                <CircularProgress />
              </Grid>
            )}
            {!loading && hasMore && (
              <Grid container justifyContent={"center"} alignItems="center">
                <Grid item xs={6} sm={3} md={2}>
                  <CustomButton
                    onClick={() => setPage((prev) => prev + 1)}
                    title="Load More"
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BlogScreen;
