import React from "react";
import { Grid } from "@mui/material";
import { blogData } from "../../data/blog/data";
import BlogCard from "../cards/BlogCard";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";

const DashboardBlogs = () => {
  const blogs = blogData.filter((blog) => blog.userId === "user1");
  const classes = useStyles();

  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "10px" }}
      >
        <Grid container item sm={6}>
          <h2>My Blogs</h2>
        </Grid>
        <Grid container item sm={6}>
          <Link href="/blog-edit">
            <a
              style={{
                textDecoration: "none",
                background: DEFAULT_COLOR_MINUS_2,
                width: "100%",
                textAlign: "center",
                color: "#fff",
                textTransform: "uppercase",
                padding: "10px 20px",
                fontWeight: "500",
              }}
            >
              Create new blog
            </a>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        {blogs.map((blog) => {
          return (
            <Grid
              container
              key={blog.blogId}
              item
              xs={12}
              sm={6}
              md={4}
              className={classes.ccrt__dashboard_blogs__wrapper}
            >
              <BlogCard
                blogId={blog.blogId}
                avatar={blog.avatar}
                name={blog.name}
                date={blog.date}
                image={blog.image}
                title={blog.title}
                description={blog.description}
                showOptions={true}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard_blogs__wrapper: {
    position: "relative",
  },
  ccrt__dashboard_blogs__card__right__icon: {
    position: "absolute",
    top: "4%",
    right: "4%",
    cursor: "pointer",
  },
});
export default DashboardBlogs;
