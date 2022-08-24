import { Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
const DashboardTitle = ({ title }) => {
  return (
    <Typography style={{ fontSize: "125%", fontWeight: "bold" }}>
      {title}
    </Typography>
  );
};

DashboardTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
export default DashboardTitle;
