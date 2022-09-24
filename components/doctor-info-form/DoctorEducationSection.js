import React, { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BOX_SHADOW } from "../../misc/colors";
import PropTypes from "prop-types";
import DoctorFormEducationModal from "../modal/DoctorFormEducationModal";
import { makeStyles } from "@mui/styles";
import DoctorEducationInfo from "./DoctorEducationInfo";

const DoctorEducationSection = ({ education, setEducation, openSnackbar }) => {
  const classes = useStyles();
  const [showEducationModal, setShowEducationModal] = useState(false);

  const handleAddedEducation = (data) => {
    setEducation((prev) => [...prev, data]);
    setShowEducationModal(false);
  };

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        className={classes.ccrt__education__section__wrapper}
      >
        <Typography className={classes.ccrt__education__section__header}>
          Education
        </Typography>
        {education.length === 0 && (
          <IconButton onClick={() => setShowEducationModal(true)}>
            <AddIcon />
          </IconButton>
        )}

        {education.length !== 0 &&
          education.map((item) => (
            <DoctorEducationInfo
              key={item.id}
              id={item.id}
              instituteName={item.institutionName}
              degreeName={item.degree}
              subjectName={item.subject}
              startYear={item.startDate}
              endYear={item.endDate}
              education={education}
              setEducation={setEducation}
              openSnackbar={openSnackbar}
              editable={true}
            />
          ))}

        {education.length !== 0 && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowEducationModal(true)}
          >
            <AddIcon fontSize="small" /> add another
          </Button>
        )}
      </Grid>
      {showEducationModal && (
        <DoctorFormEducationModal
          open={showEducationModal}
          onNegativeFeedback={() => setShowEducationModal(false)}
          onPositiveFeedback={(data) => handleAddedEducation(data)}
          setEducation={setEducation}
        />
      )}
    </>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__education__section__wrapper: {
    padding: "10px",
    borderRadius: "5px",
    boxShadow: BOX_SHADOW,
    marginBottom: "20px",
  },
  ccrt__education__section__header: {
    fontSize: "130%",
    fontWeight: "600",
  },
}));

DoctorEducationSection.propTypes = {
  education: PropTypes.array,
  setEducation: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};
export default DoctorEducationSection;
