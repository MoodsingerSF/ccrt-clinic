import { Box, Modal, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";
import { style } from "../../styles/ProfileInfoModalStyle";
import PropTypes from "prop-types";
const DetailsModal = ({ open, onClose, details }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesLg = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={style}
        style={{
          width: matches ? (matchesLg ? "50vw" : "70vw") : "95vw",
          padding: 10,
        }}
      >
        <Typography
          style={{
            color: theme.palette.custom.BLACK,
            fontSize: "80%",
            // fontWeight: "400",
            textAlign: "justify",
          }}
        >
          {details}
        </Typography>
      </Box>
    </Modal>
  );
};

DetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  details: PropTypes.string.isRequired,
};

export default DetailsModal;
