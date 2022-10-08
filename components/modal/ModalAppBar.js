import { Grid } from "@mui/material";
import React from "react";
import CloseButton from "../button/CloseButton";
import PropTypes from "prop-types";
import { MODAL_APP_BAR_HEIGHT } from "../../misc/constants";
const ModalAppBar = ({ onClose }) => {
  return (
    <Grid
      container
      style={{
        position: "fixed",
        height: MODAL_APP_BAR_HEIGHT,
        background: "white",
        zIndex: 1,
        // border: "1px solid black",
      }}
    >
      <Grid
        container
        style={{ width: "100%" }}
        justifyContent="flex-end"
        alignItems="center"
      >
        <CloseButton onClose={onClose} />
      </Grid>
    </Grid>
  );
};
ModalAppBar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalAppBar;
