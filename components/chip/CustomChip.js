import { Typography, useTheme } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import theme from "../../themes/theme.js";
const CustomChip = ({
  title,
  color = "#2ecc71",
  onlyBorder = false,
  fontColor = null,
}) => {
  const themeS = useTheme(theme);
  return (
    <Typography
      style={{
        fontSize: "65%",
        fontWeight: 500,
        ...(!onlyBorder ? { background: color } : {}),
        ...(onlyBorder ? { border: `1px solid ${color}` } : {}),
        color: fontColor ? fontColor : themeS.palette.custom.BLACK,
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
  fontColor: PropTypes.string,

  onlyBorder: PropTypes.bool,
};

export default CustomChip;
