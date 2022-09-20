import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoctorFormExperianceModal from "../modal/DoctorFormExperianceModal";
import ConfirmationModal from "../modal/ConfirmationModal";

const DoctorExperianceInfo = ({
  id,
  organization,
  jobTitle,
  department,
  division,
  startYear,
  endYear,
  experiances = [],
  setExperiances = () => {},
  editable = false,
}) => {
  const classes = useStyles();

  const [showEditableModal, setShowEditableModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleDeleteSection = (id) => {
    // console.log(id);
    const items = experiances.filter((item) => item.id !== id);
    setExperiances(items);
  };

  return (
    <>
      <Grid
        key={id}
        container
        flexDirection={"column"}
        className={classes.ccrt__experiance__section__content__container}
      >
        <Typography
          className={
            classes.ccrt__experiance__section__content__content__heading_1
          }
        >
          {organization}
        </Typography>
        <Typography
          className={
            classes.ccrt__experiance__section__content__content__heading_2
          }
        >
          {jobTitle}, {department}, {division}
        </Typography>
        <Typography
          className={
            classes.ccrt__experiance__section__content__content__heading_3
          }
        >
          {startYear} - {endYear}
        </Typography>
        {editable && (
          <>
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
          </>
        )}
      </Grid>
      {showEditableModal && (
        <DoctorFormExperianceModal
          open={showEditableModal}
          onNegativeFeedback={() => setShowEditableModal(false)}
          experiances={experiances}
          setExperiances={setExperiances}
          id={id}
          title={jobTitle}
          organizationName={organization}
          departmentName={department}
          divisionName={division}
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

const useStyles = makeStyles(() => ({
  ccrt__experiance__section__content__container: {
    position: "relative",
    margin: "10px 0",
  },
  ccrt__experiance__section__content__content__heading_1: {
    fontSize: "110%",
    fontWeight: "500",
  },
  ccrt__experiance__section__content__content__heading_2: {
    fontSize: "90%",
    fontWeight: "400",
  },
  ccrt__experiance__section__content__content__heading_3: {
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

DoctorExperianceInfo.propTypes = {
  id: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  division: PropTypes.string.isRequired,
  startYear: PropTypes.string.isRequired,
  endYear: PropTypes.string.isRequired,
  experiances: PropTypes.array,
  setExperiances: PropTypes.func,
  editable: PropTypes.bool,
};

export default DoctorExperianceInfo;
