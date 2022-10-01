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
        <Grid container>
          <DashboardTitle title="Blog Requests" />
        </Grid>

        <BlogRequest />
      </Grid>
    </Grid>
  );
};

export default DashboardBlogRequests;
