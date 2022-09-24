import { Backdrop, Grid } from "@mui/material";
import React from "react";
import ModalBodyWrapper from "./ModalBodyWrapper";
import PropTypes from "prop-types";
import Prescription from "../../misc/prescription";
const PrescriptionModal = ({
  open,
  onClose,
  appointmentId,
  patient,
  doctor,
  editable = false,
}) => {
  return (
    <Backdrop
      sx={{
        background: "white",
        color: "black",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        overflowY: "scroll",
      }}
      open={open}
    >
      <ModalBodyWrapper onClose={onClose}>
        <Grid
          container
          style={{ marginTop: 0, minHeight: "100vh" }}
          alignItems="flex-start"
        >
          <Prescription
            appointmentId={appointmentId}
            patient={patient}
            doctor={doctor}
            editable={editable}
            // onClose={onClose}
          />
        </Grid>
      </ModalBodyWrapper>
    </Backdrop>
  );
};

PrescriptionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointmentId: PropTypes.string.isRequired,
  patient: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
  editable: PropTypes.bool,
};

export default PrescriptionModal;
