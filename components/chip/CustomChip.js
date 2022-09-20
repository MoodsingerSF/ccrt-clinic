import { Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
const CustomChip = ({ title, color = "#2ecc71" }) => {
  return (
    <Typography
      style={{
        fontSize: "65%",
        fontWeight: 500,
        background: color,
        borderRadius: 25,
        padding: "4px 16px",
        textAlign: "center",
        textTransform: "capitalize",
        marginRight: 5,
        marginBottom: 5,
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
