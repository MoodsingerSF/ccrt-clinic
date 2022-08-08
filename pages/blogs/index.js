import React from "react";
import Image from "next/image";
import Head from "next/head";
import { Grid } from "@mui/material";
import { useStyles } from "../../styles/blogstyle";
import img from "../../public/image/ccrt-bg/CCRT_bg.jpg";
import BlogCard from "../../components/cards/BlogCard";
import { blogData } from "../../data/blog/data";

const BlogScreen = () => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <Grid container>
        <Grid container justifyContent="center" alignItems="center">
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
          {blogData.map((blog) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={blog.blogId}>
                <BlogCard
                  key={blog.blogId}
                  blogId={blog.blogId}
                  avatar={blog.avatar}
                  name={blog.name}
                  date={blog.date}
                  image={blog.image}
                  title={blog.title}
                  tags={blog.tags}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default BlogScreen;
