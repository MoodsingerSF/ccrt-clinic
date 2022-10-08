import React, { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import DoctorFormExperienceModal from "../modal/DoctorFormExperienceModal";
import { makeStyles } from "@mui/styles";
import DoctorExperienceInfo from "./DoctorExperienceInfo";

const DoctorExperienceSection = ({
  experiences,
  setExperiences,
  openSnackbar,
}) => {
  const classes = useStyles();
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  const handleAddedExperience = (data) => {
    setExperiences((prev) => [...prev, data]);
    setShowExperienceModal(false);
  };

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        className={classes.ccrt__experience__section__wrapper}
      >
        <Typography className={classes.ccrt__experience__section__header}>
          Experience
        </Typography>
        {experiences.length === 0 && (
          <IconButton onClick={() => setShowExperienceModal(true)}>
            <AddIcon />
          </IconButton>
        )}

        {experiences.length !== 0 &&
          experiences.map((item) => (
            <DoctorExperienceInfo
              key={item.id}
              id={item.id}
              organization={item.organization}
              jobTitle={item.title}
              department={item.department}
              division={item.division}
              startYear={item.startDate}
              endYear={item.endDate}
              experiences={experiences}
              setExperiences={setExperiences}
              openSnackbar={openSnackbar}
              editable={true}
            />
          ))}

        {experiences.length !== 0 && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowExperienceModal(true)}
          >
            <AddIcon fontSize="small" /> add another
          </Button>
        )}
      </Grid>
      {showExperienceModal && (
        <DoctorFormExperienceModal
          open={showExperienceModal}
          onNegativeFeedback={() => setShowExperienceModal(false)}
          onPositiveFeedback={(data) => handleAddedExperience(data)}
          setExperiences={setExperiences}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__experience__section__wrapper: {
    padding: "10px 0px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  ccrt__experience__section__header: {
    fontSize: "100%",
    fontWeight: 600,
    color: theme.palette.custom.BLACK,
  },
}));

DoctorExperienceSection.propTypes = {
  experiences: PropTypes.array.isRequired,
  setExperiences: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};
export default DoctorExperienceSection;
