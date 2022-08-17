import { Grid } from "@mui/material";
import React from "react";

const DashboardBlogRequests = () => {
  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "10px" }}
      >
        <h2>Blog Requests</h2>
      </Grid>
      <Grid container>
        {/* {blogs.map((blog) => {
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
    })} */}
      </Grid>
    </Grid>
  );
};

export default DashboardBlogRequests;
