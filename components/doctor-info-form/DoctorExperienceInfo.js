import React, { useState } from "react";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import DoctorFormExperienceModal from "../modal/DoctorFormExperienceModal";
import { processShowDate } from "../../misc/functions";
import { deleteExperience } from "../../controllers/UserController";
import DoctorInfoHOC from "./DoctorInfoHOC";
import { useStyles } from "./DoctorInfoStyle";

const DoctorExperienceInfo = ({
  id,
  organization,
  jobTitle,
  department,
  division,
  startYear,
  endYear,
  openSnackbar,
  experiences = [],
  setExperiences = () => {},
  editable = false,
}) => {
  const classes = useStyles();

  const [showEditableModal, setShowEditableModal] = useState(false);

  const handleDelete = async () => {
    await deleteExperience(id);
  };

  const startDate = processShowDate(startYear);
  const endDate = processShowDate(endYear);

  return (
    <DoctorInfoHOC
      editable={editable}
      editModal={
        <DoctorFormExperienceModal
          open={showEditableModal}
          onNegativeFeedback={() => setShowEditableModal(false)}
          experiences={experiences}
          setExperiences={setExperiences}
          id={id}
          titleName={jobTitle}
          organizationName={organization}
          departmentName={department}
          divisionName={division}
          start={startYear}
          end={endYear}
          editable={true}
          openSnackbar={openSnackbar}
        />
      }
      showEditableModal={showEditableModal}
      setShowEditableModal={setShowEditableModal}
      openSnackbar={openSnackbar}
      onDelete={handleDelete}
      onSuccess={() => {
        setExperiences(
          experiences.filter((item) => {
            return item.id !== id;
          })
        );
      }}
    >
      <>
        <Typography className={classes.ccrt__doctor__info__content__heading_2}>
          {jobTitle}
          {department ? "," : null} {department ? department : null}
        </Typography>
        {division && (
          <Typography
            className={classes.ccrt__doctor__info__content__heading_2}
          >
            {division ? division : null}
          </Typography>
        )}
        <Typography className={classes.ccrt__doctor__info__content__heading_1}>
          {organization}
        </Typography>

        <Typography className={classes.ccrt__doctor__info__content__heading_3}>
          {startDate} - {endDate}
        </Typography>
      </>
    </DoctorInfoHOC>
  );
};

DoctorExperienceInfo.propTypes = {
  id: PropTypes.number.isRequired,
  organization: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  division: PropTypes.string.isRequired,
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired,
  experiences: PropTypes.array.isRequired,
  setExperiences: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

export default DoctorExperienceInfo;
