import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DoctorFormExperianceModal from "../modal/DoctorFormExperianceModal";

const DoctorExperianceInfo = ({
  id,
  organization,
  jobTitle,
  department,
  division,
  startYear,
  endYear,
  experiances,
  setExperiances,
}) => {
  const classes = useStyles();

  const [showEditableModal, setShowEditableModal] = useState(false);

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
        <IconButton
          className={classes.ccrt__doctor__training__info__edit}
          onClick={() => setShowEditableModal(true)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
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
    </>
  );
};

const useStyles = makeStyles((theme) => ({
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
  ccrt__doctor__training__info__edit: {
    position: "absolute",
    right: "0",
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
  experiances: PropTypes.array.isRequired,
  setExperiances: PropTypes.func.isRequired,
};

export default DoctorExperianceInfo;
