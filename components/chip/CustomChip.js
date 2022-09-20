import { Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
const CustomChip = ({ title, color = "#f1c40f" }) => {
  return (
    <Typography
      style={{
        fontSize: "65%",
        fontWeight: 500,
        background: color,
        borderRadius: 25,
        padding: "4px 10px",
        textAlign: "center",
      }}
    >
      {title}
    </Typography>
  );
};

CustomChip.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default CustomChip;
