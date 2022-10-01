import { Grid, Modal } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import DrugAddedForm from "../prescription/body/DrugAddedForm";
const DrugAdditionModal = ({ open, addDrug, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        style={{
          background: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          borderRadius: 5,
        }}
      >
        <Grid item xs={11}>
          <DrugAddedForm addDrug={addDrug} onClose={onClose} />
        </Grid>
      </Grid>
    </Modal>
  );
};

DrugAdditionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  addDrug: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DrugAdditionModal;
