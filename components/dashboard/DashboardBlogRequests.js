import { Grid } from "@mui/material";
import React from "react";
import { DASHBOARD_TITLE_MARGIN_TOP } from "../../misc/constants";
import BlogRequest from "./blog-request/BlogRequest";
import DashboardTitle from "./DashboardTitle";

const DashboardBlogRequests = () => {
  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
      >
        <DashboardTitle title="Blog Requests" />
        <BlogRequest />
      </Grid>
    </Grid>
  );
};

export default DashboardBlogRequests;
