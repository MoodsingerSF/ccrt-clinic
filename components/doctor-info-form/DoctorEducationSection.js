import React, { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BOX_SHADOW } from "../../misc/colors";
import PropTypes from "prop-types";
import DoctorFormEducationModal from "../modal/DoctorFormEducationModal";
import { makeStyles } from "@mui/styles";
import DoctorEducationInfo from "./DoctorEducationInfo";

const DoctorEducationSection = ({ education, setEducation }) => {
  const classes = useStyles();
  const [showEducationModal, setShowEducationModal] = useState(false);

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
              instituteName={item.instituteName}
              degreeName={item.degreeName}
              subjectName={item.subjectName}
              startYear={item.startYear}
              endYear={item.endYear}
              education={education}
              setEducation={setEducation}
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
          education={education}
          setEducation={setEducation}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
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
  education: PropTypes.array.isRequired,
  setEducation: PropTypes.func.isRequired,
};
export default DoctorEducationSection;
