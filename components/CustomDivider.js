import { Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
const CustomDivider = ({ color = "white" }) => {
  return <Box style={{ height: 1.5, background: color }} />;
};

CustomDivider.propTypes = {
  color: PropTypes.string,
};

export default CustomDivider;
