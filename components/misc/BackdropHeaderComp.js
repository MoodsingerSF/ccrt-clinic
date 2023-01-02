import { AppBar, IconButton, Toolbar } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowbackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
const BackdropHeaderComp = ({ onClose }) => {
  return (
    <AppBar sx={{ position: "relative" }}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <ArrowbackIcon />
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

BackdropHeaderComp.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default BackdropHeaderComp;
