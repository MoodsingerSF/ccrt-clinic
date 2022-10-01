import { Backdrop, Grid, IconButton, Tooltip } from "@mui/material";
import React from "react";
// import ModalBodyWrapper from "./ModalBodyWrapper";
import CloseIcon from "@mui/icons-material/Close";

import PropTypes from "prop-types";
import Prescription from "../../misc/prescription";
const PrescriptionModal = ({
  open,
  onClose,
  appointmentId,
  patient,
  doctor,
  editable = false,
  date,
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
      <Tooltip title="close" arrow>
        <IconButton
          style={{ position: "fixed", top: "2%", right: "2%" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
      {/* <ModalBodyWrapper onClose={onClose}> */}
      <Grid
        container
        style={{ marginTop: 0, minHeight: "100vh" }}
        alignItems="flex-start"
        justifyContent="center"
      >
        <Grid container style={{ width: "80%", marginTop: 60 }}>
          <Prescription
            appointmentId={appointmentId}
            patient={patient}
            doctor={doctor}
            editable={editable}
            date={date}
          />
        </Grid>
      </Grid>
      {/* </ModalBodyWrapper> */}
    </Backdrop>
  );
};

PrescriptionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointmentId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,

  patient: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
  editable: PropTypes.bool,
};

export default PrescriptionModal;
