import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW } from "../misc/colors";
import PrescriptionHeader from "../components/prescription/PrescriptionHeader";
import PrescriptionMiddle from "../components/prescription/PrescriptionMiddle";
import PrescriptionBody from "../components/prescription/PrescriptionBody";
import CustomButton from "../components/button/CustomButton";

const Prescription = () => {
  const classes = useStyles();

  const [patientName, setPatientName] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientAge, setPatientAge] = useState("");
  // console.log(patientName, patientGender, patientAge);
  const [advices, setAdvices] = useState("");
  const [drugLists, setDrugLists] = useState([]);
  const [durations, setDurations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmitPrescription = () => {
    // setLoading(true);
    // Api call
    // setLoading(false);
  };

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Grid className={classes.ccrt__prescription__container}>
        <PrescriptionHeader />
        <PrescriptionMiddle
          patientName={patientName}
          setPatientName={setPatientName}
          patientGender={patientGender}
          setPatientGender={setPatientGender}
          patientAge={patientAge}
          setPatientAge={setPatientAge}
        />
        <PrescriptionBody
          advices={advices}
          setAdvices={setAdvices}
          showAddedForm={true}
          drugLists={drugLists}
          setDrugLists={setDrugLists}
          durations={durations}
          setDurations={setDurations}
        />
        <CustomButton
          icon={null}
          title="save prescription"
          onClick={handleSubmitPrescription}
          size="small"
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__prescription__container: {
      // minHeight: "88vh",
      width: "90%",
      background: "#fff",
      boxShadow: `${DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW}`,
      padding: "20px 20px 15px 20px",
      borderRadius: "5px",
      marginTop: "12vh",
    },
  })
);
export default Prescription;
