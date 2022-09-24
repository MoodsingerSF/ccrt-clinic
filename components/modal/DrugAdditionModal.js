import { Grid, Modal } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import DrugAddedForm from "../prescription/body/DrugAddedForm";
const DrugAdditionModal = ({ open, addDrug }) => {
  return (
    <Modal open={open}>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        style={{ background: "white", height: "100vh", width: "100vw" }}
      >
        <Grid item xs={11} sm={6}>
          <DrugAddedForm addDrug={addDrug} />
        </Grid>
      </Grid>
    </Modal>
  );
};

DrugAdditionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  addDrug: PropTypes.func.isRequired,
};

export default DrugAdditionModal;
