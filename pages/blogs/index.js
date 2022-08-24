import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Grid } from "@mui/material";
import { useStyles } from "../../styles/blogstyle";
import img from "../../public/image/ccrt-bg/CCRT_bg.jpg";
import BlogCard from "../../components/cards/BlogCard";
import useBlogs from "../../hooks/useBlogs";
import { VerificationStatus } from "../../enums/VerificationStatus";
import LoaderBackdrop from "../../components/backdrops/LoaderBackdrop";

const BlogScreen = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const { blogs, loading } = useBlogs(page, VerificationStatus.ACCEPTED);
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <Grid container style={{ marginTop: "12vh" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          // style={{
          //   position: "relative",
          // }}
        >
          <Grid container className={classes.ccrt__blog__header}>
            <Image src={img} alt="bg_img" layout="fill" />
          </Grid>
          <h2 className={classes.ccrt__blog__header__title}>Blogs</h2>
        </Grid>
        <Grid
          container
          style={{ background: "white" }}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {!loading ? (
            blogs.map((blog) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={blog.blogId}>
                  <BlogCard
                    key={blog.blogId}
                    blogId={blog.blogId}
                    avatar={blog.avatar}
                    name={blog.fullName}
                    date={blog.creationTime}
                    image={blog.imageUrl}
                    title={blog.title}
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
    </>
  );
};

export default BlogScreen;
