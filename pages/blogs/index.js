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
        <title>Blog</title>
      </Head>
      <Grid container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid container className={classes.ccrt__blog__header}>
            <span className={classes.ccrt__blog__header__wrapper}>
              <Image src={img} alt="bg_img" />
            </span>
          </Grid>
          <h2 className={classes.ccrt__blog__header__title}>Blog</h2>
        </Grid>
        <Grid container justifyContent="flex-start" alignItems="center">
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
                  description={blog.description}
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
