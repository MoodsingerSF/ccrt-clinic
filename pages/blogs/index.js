import React from "react";
import Image from "next/image";
import Head from "next/head";
import { Grid } from "@mui/material";
import { useStyles } from "../../styles/blogstyle";
import img from "../../public/image/ccrt-bg/CCRT_bg.jpg";
import BlogCard from "../../components/cards/BlogCard";
import { useRouter } from "next/router";

const BlogScreen = () => {
  const classes = useStyles();

  const router = useRouter();

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
        <Grid container justifyContent="center" alignItems="center">
          {blogData.map((item) => (
            <BlogCard blogId={item.id} />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default BlogScreen;

const blogData = [
  {
    id: 1,
  },
];
