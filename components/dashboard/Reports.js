import { Grid } from "@mui/material";
import React from "react";
import {
  addReport,
  retrieveAllReports,
  updateReport,
} from "../../controllers/UserController";

import DashboardTitle from "./DashboardTitle";
import ReportComp from "./ReportComp";

const Reports = () => {
  return (
    <Grid container style={{ height: "82vh", overflowY: "scroll" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          marginBottom: 10,
        }}
      >
        <DashboardTitle title={"Manage Reports"} />
      </Grid>
      <ReportComp
        retrieveReports={retrieveAllReports}
        addReport={addReport}
        updateReport={updateReport}
        editable={true}
      />
    </Grid>
  );
};

export default Reports;
