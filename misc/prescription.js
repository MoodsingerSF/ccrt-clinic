import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
// import { DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW } from "./colors";
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
import AdvicesSection from "../components/prescription/body/AdvicesSection";
import SaveIcon from "@mui/icons-material/Save";

const Prescription = ({
  patient,
  doctor,
  appointmentId,
  editable = false,
  date,
}) => {
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const [advices, setAdvices] = useState("");
  const [drugLists, setDrugLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPrescription, setLoadingPrescription] = useState(false);

  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };
  const handleSubmitPrescription = async () => {
    try {
      setLoading(true);
      await createPrescription(appointmentId, advices, drugLists);
      openSnackbar("Prescription has been added successfully.");
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
      setAdvices(prescription.advice);
      setDrugLists(prescription.medications);
      setLoadingPrescription(false);
    } catch (error) {
      setLoadingPrescription(false);
    }
  };

  useEffect(() => {
    getPrescription(appointmentId);
  }, [appointmentId]);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="flex-start"
      style={{
        borderRadius: 5,
        minHeight: "85vh",
        marginBottom: 40,
        // borderRight: `1px solid ${"red"}`,
      }}
    >
      <Grid container className={classes.ccrt__prescription__container}>
        <PrescriptionHeader doctor={doctor} date={date} />
        <PrescriptionMiddle
          patientName={patient.firstName + " " + patient.lastName}
          patientGender={patient.gender}
          patientAge={getAgeFromBirthDate(patient.birthDate)}
        />
        <Grid item xs={4} className={classes.leftSide}>
          <AdvicesSection
            editable={editable}
            advices={advices}
            setAdvices={setAdvices}
          />
        </Grid>
        <Grid item xs={8} container>
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
                editable={editable}
                // showAddedForm={true}
                drugLists={drugLists}
                // editable={editable}
                // setDrugLists={setDrugLists}
                // durations={durations}
                // setDurations={setDurations}
              />
              {editable && (
                <Grid
                  container
                  justifyContent="flex-end"
                  style={{ marginTop: 30 }}
                >
                  <Grid item xs={4}>
                    <CustomButton
                      icon={<SaveIcon />}
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
  date: PropTypes.string.isRequired,

  editable: PropTypes.bool,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__container: {
      // minHeight: "85vh",
      width: "100%",
      // boxShadow: `${DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW}`,
      // borderRadius: "5px",/
      // marginTop: "10vh",
    },
    leftSide: {
      background: theme.palette.custom.BLACK,
    },
  })
);
export default Prescription;
