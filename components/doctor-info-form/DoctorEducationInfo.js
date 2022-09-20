import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoctorFormEducationModal from "../modal/DoctorFormEducationModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import axios from "axios";
import { deleteEducation } from "../../controllers/UserController";

const DoctorEducationInfo = ({
  id,
  instituteName,
  degreeName,
  subjectName,
  startYear,
  endYear,
  education,
  setEducation,
}) => {
  const classes = useStyles();
  const [showEditableModal, setShowEditableModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleDeleteSection = (id) => {
    console.log(id);
    try {
      const response = deleteEducation(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // const items = education.filter((item) => item.id !== id);
    // setEducation(items);
  };

  return (
    <>
      <Grid
        container
        flexDirection={"column"}
        className={classes.ccrt__education__section__content__container}
      >
        <Typography
          className={
            classes.ccrt__education__section__content__content__heading_1
          }
        >
          {instituteName}
        </Typography>
        <Typography
          className={
            classes.ccrt__education__section__content__content__heading_2
          }
        >
          {degreeName}, {subjectName}
        </Typography>
        <Typography
          className={
            classes.ccrt__education__section__content__content__heading_3
          }
        >
          {startYear} - {endYear}
        </Typography>

        <IconButton
          className={classes.ccrt__doctor__training__info__edit}
          onClick={() => setShowEditableModal(true)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          className={classes.ccrt__doctor__training__info__delete}
          onClick={() => setConfirmationModal(true)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Grid>
      {showEditableModal && (
        <DoctorFormEducationModal
          open={showEditableModal}
          onNegativeFeedback={() => setShowEditableModal(false)}
          education={education}
          setEducation={setEducation}
          id={id}
          institute={instituteName}
          degreeName={degreeName}
          subjectName={subjectName}
          start={startYear}
          end={endYear}
          editable={true}
        />
      )}
      {confirmationModal && (
        <ConfirmationModal
          onPositiveFeedback={() => handleDeleteSection(id)}
          onNegativeFeedback={() => setConfirmationModal(false)}
          title={"You want to delete this section"}
        />
      )}
    </>
  );
};

DoctorEducationInfo.propTypes = {
  instituteName: PropTypes.string.isRequired,
  degreeName: PropTypes.string.isRequired,
  subjectName: PropTypes.string.isRequired,
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired,
  education: PropTypes.array.isRequired,
  setEducation: PropTypes.func.isRequired,
};

const useStyles = makeStyles(() => ({
  ccrt__education__section__content__container: {
    position: "relative",
    margin: "10px 0",
  },
  ccrt__education__section__content__content__heading_1: {
    fontSize: "110%",
    fontWeight: "500",
  },
  ccrt__education__section__content__content__heading_2: {
    fontSize: "90%",
    fontWeight: "400",
  },
  ccrt__education__section__content__content__heading_3: {
    fontSize: "80%",
    fontWeight: "300",
  },
  ccrt__doctor__training__info__delete: {
    position: "absolute",
    right: "0",
  },
  ccrt__doctor__training__info__edit: {
    position: "absolute",
    right: "50px",
  },
}));

export default DoctorEducationInfo;
