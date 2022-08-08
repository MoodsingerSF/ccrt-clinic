import React from "react";
import { Grid, Modal, Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const ConfirmationModal = ({
  onPositiveFeedback,
  onNegativeFeedback,
  title,
}) => {
  return (
    <Modal open={true} onClose={onNegativeFeedback}>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h1"
          style={{ fontSize: "90%", marginBottom: "10px" }}
        >
          {title}
        </Typography>
        <Grid container justifyContent="center" alignItems="center">
          <Button onClick={onPositiveFeedback}>Yes</Button>
          <Button onClick={onNegativeFeedback}>No</Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;

ConfirmationModal.propTypes = {
  onPositiveFeedback: PropTypes.func.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
