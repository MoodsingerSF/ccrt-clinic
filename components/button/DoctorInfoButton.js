import React from "react";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

const DoctorInfoButton = ({ onClick, icon, className }) => {
  return (
    <IconButton className={className} onClick={onClick}>
      {icon}
    </IconButton>
  );
};

DoctorInfoButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.element,
  className: PropTypes.object,
};
export default DoctorInfoButton;
