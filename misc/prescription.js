import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW } from "./colors";
import PrescriptionHeader from "../components/prescription/PrescriptionHeader";
import PrescriptionMiddle from "../components/prescription/PrescriptionMiddle";
import PrescriptionBody from "../components/prescription/PrescriptionBody";
import CustomButton from "../components/button/CustomButton";
import PropTypes from "prop-types";
import {
  getAgeFromBirthDate,
  handleSnackbarClose,
  handleSnackbarOpen,
} from "./functions";
import {
  createPrescription,
  retrievePrescription,
} from "../controllers/AppointmentController";
import CustomSnackbar from "../components/snackbar/CustomSnackbar";
import { SNACKBAR_INITIAL_STATE } from "./constants";
import LoaderComponent from "../components/misc/LoaderComponent";
const Prescription = ({ patient, doctor, appointmentId, editable = false }) => {
  const classes = useStyles();

  const [patientName, setPatientName] = useState(patient.firstName);
  const [patientGender, setPatientGender] = useState(patient.gender);
  const [patientAge, setPatientAge] = useState(
    getAgeFromBirthDate(patient.birthDate)
  );
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  // console.log(patientName, patientGender, patientAge);
  const [advices, setAdvices] = useState("");
  const [drugLists, setDrugLists] = useState([]);
  // const [durations, setDurations] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [loadingPrescription, setLoadingPrescription] = useState(false);

  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };
  const handleSubmitPrescription = async () => {
    try {
      setLoading(true);
      const response = await createPrescription(
        appointmentId,
        advices,
        drugLists
      );
      openSnackbar("Prescription has been added successfully.");
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        openSnackbar(error.response.data.message);
      }
    }
  };
  const getPrescription = async (appointmentId) => {
    try {
      setLoadingPrescription(true);
      const prescription = await retrievePrescription(appointmentId);
      console.log(prescription);
      setAdvices(prescription.advice);
      setDrugLists(prescription.medications);
      setLoadingPrescription(false);
    } catch (error) {
      setLoadingPrescription(false);

      console.log(error);
    }
  };

  useEffect(() => {
    getPrescription(appointmentId);
  }, [appointmentId]);

  return (
    <Grid container justifyContent={"center"} alignItems="flex-start">
      <Grid className={classes.ccrt__prescription__container}>
        <PrescriptionHeader doctor={doctor} />
        <PrescriptionMiddle
          patientName={patientName}
          setPatientName={setPatientName}
          patientGender={patientGender}
          setPatientGender={setPatientGender}
          patientAge={patientAge}
          setPatientAge={setPatientAge}
        />
        {loadingPrescription ? (
          <LoaderComponent />
        ) : (
          <>
            <PrescriptionBody
              advices={advices}
              setAdvices={setAdvices}
              addDrug={(drug) => {
                setDrugLists((prev) => [...prev, drug]);
              }}
              // showAddedForm={true}
              drugLists={drugLists}
              editable={editable}
              // setDrugLists={setDrugLists}
              // durations={durations}
              // setDurations={setDurations}
            />
            {editable && (
              <Grid
                container
                justifyContent="flex-end"
                style={{ marginTop: 30, marginBottom: 30 }}
              >
                <Grid item xs={2}>
                  <CustomButton
                    icon={null}
                    title="save prescription"
                    onClick={handleSubmitPrescription}
                    size="small"
                    loading={loading}
                  />
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => handleSnackbarClose(setSnackbar)}
      />
    </Grid>
  );
};

Prescription.propTypes = {
  patient: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
  appointmentId: PropTypes.string.isRequired,
  editable: PropTypes.bool,
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__prescription__container: {
      // minHeight: "88vh",
      width: "100%",
      background: "#fff",
      boxShadow: `${DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW}`,
      // padding: "20px 20px 15px 20px",
      borderRadius: "5px",
      marginTop: "10vh",
    },
  })
);
export default Prescription;
