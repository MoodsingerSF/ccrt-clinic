import { Grid } from "@mui/material";
import React from "react";
import {
  MODAL_APP_BAR_HEIGHT,
  MODAL_CONTENT_CONTAINER_HEIGHT,
} from "../../misc/constants";
import ModalAppBar from "./ModalAppBar";
import PropTypes from "prop-types";
const ModalBodyWrapper = ({ onClose, children }) => {
  return (
    <Grid
      container
      style={{
        height: "100vh",
        background: "white",
      }}
    >
      <ModalAppBar onClose={onClose} />
      <Grid
        container
        style={{
          height: MODAL_CONTENT_CONTAINER_HEIGHT,
          marginTop: MODAL_APP_BAR_HEIGHT,
          overflowY: "scroll",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={2} style={{ width: "95%", marginTop: 20 }}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};
ModalBodyWrapper.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export default ModalBodyWrapper;
