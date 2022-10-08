import React, { useState } from "react";
// import Image from "next/image";
import Head from "next/head";
import { Grid } from "@mui/material";
// import { useStyles } from "../../styles/blogstyle";
// import img from "../../public/image/ccrt-bg/CCRT_bg.jpg";
// import BlogCard from "../../components/cards/BlogCard";
import useBlogs from "../../hooks/useBlogs";
import { VerificationStatus } from "../../enums/VerificationStatus";
import LoaderBackdrop from "../../components/backdrops/LoaderBackdrop";
import BlogCard from "../../components/home-page/blogs/BlogCard";
import { prettyDate } from "../../controllers/DateController";
import Heading from "../../components/home-page/section-heading/Heading";

const BlogScreen = () => {
  // const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const { blogs, loading } = useBlogs(page, VerificationStatus.ACCEPTED);
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
        <Grid container style={{ width: "95%" }}>
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
            spacing={4}
          >
            {!loading ? (
              blogs.map((blog) => {
                return (
                  <Grid item xs={12} sm={6} md={3} lg={3} key={blog.blogId}>
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
