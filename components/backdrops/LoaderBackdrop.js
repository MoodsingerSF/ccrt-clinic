import { Backdrop } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import LoaderComponent from "../misc/LoaderComponent";
const LoaderBackdrop = ({ open }) => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={open}>
      <LoaderComponent />
    </Backdrop>
  );
};
LoaderBackdrop.propTypes = {
  open: PropTypes.bool.isRequired,
};
export default LoaderBackdrop;
