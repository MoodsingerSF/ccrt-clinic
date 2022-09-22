import { Grid } from "@mui/material";
import React, { useState } from "react";
// import { DASHBOARD_TITLE_MARGIN_TOP } from "../../misc/constants";

import DashboardTitle from "./DashboardTitle";
import ReportComp from "./ReportComp";

const Reports = () => {
  const [files, setFiles] = useState([]);
  console.log(files);
  return (
    <Grid container style={{ height: "82vh", overflowY: "scroll" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          marginBottom: 10,
          // marginTop: DASHBOARD_TITLE_MARGIN_TOP,
        }}
      >
        <DashboardTitle title={"Manage Reports"} />
      </Grid>
      <ReportComp setFiles={setFiles} />
    </Grid>
  );
};

export default Reports;
