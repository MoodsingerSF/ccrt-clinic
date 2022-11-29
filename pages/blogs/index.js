import React, { useState } from "react";
import Head from "next/head";
import { Grid, useMediaQuery } from "@mui/material";
import useBlogs from "../../hooks/useBlogs";
import { VerificationStatus } from "../../enums/VerificationStatus";
import LoaderBackdrop from "../../components/backdrops/LoaderBackdrop";
import BlogCard from "../../components/home-page/blogs/BlogCard";
import { prettyDate } from "../../controllers/DateController";
import Heading from "../../components/home-page/section-heading/Heading";
import { useTheme } from "@mui/styles";

const BlogScreen = () => {
  const theme = useTheme();

  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const { blogs, loading } = useBlogs(page, VerificationStatus.ACCEPTED);
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
            justifyContent={"flex-start"}
            alignItems="center"
            style={{ marginBottom: 15 }}
          >
            <Heading title="Blogs" />
          </Grid>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={isMobile ? 2 : 4}
          >
            {!loading ? (
              blogs.map((blog) => {
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
              })
            ) : (
              <LoaderBackdrop open={loading} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BlogScreen;
