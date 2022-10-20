import React, { useState } from "react";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { deleteEducation } from "../../controllers/UserController";
import { processShowDate } from "../../misc/functions";
import dynamic from "next/dynamic";
import DoctorInfoHOC from "./DoctorInfoHOC";
import { useStyles } from "./DoctorInfoStyle";
const DoctorFormEducationModal = dynamic(() =>
  import("../modal/DoctorFormEducationModal")
);
const DoctorEducationInfo = ({
  id,
  instituteName,
  degreeName,
  subjectName,
  startYear,
  endYear,
  openSnackbar,
  education = [],
  setEducation = () => {},
  editable = false,
}) => {
  const classes = useStyles();
  const [showEditableModal, setShowEditableModal] = useState(false);

  const handleDelete = async () => {
    await deleteEducation(id);
  };

  const startDate = processShowDate(startYear);
  const endDate = processShowDate(endYear);

  return (
    <DoctorInfoHOC
      editable={editable}
      editModal={
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
          openSnackbar={openSnackbar}
        />
      }
      showEditableModal={showEditableModal}
      setShowEditableModal={setShowEditableModal}
      openSnackbar={openSnackbar}
      onDelete={handleDelete}
      onSuccess={() => {
        setEducation(
          education.filter((item) => {
            return item.id !== id;
          })
        );
      }}
    >
      <>
        <Typography className={classes.ccrt__doctor__info__content__heading_2}>
          {degreeName}, {subjectName}
        </Typography>
        <Typography className={classes.ccrt__doctor__info__content__heading_1}>
          {instituteName}
        </Typography>

        <Typography className={classes.ccrt__doctor__info__content__heading_3}>
          {startDate} <span style={{ fontWeight: "700" }}>-</span> {endDate}
        </Typography>
      </>
    </DoctorInfoHOC>
  );
};

DoctorEducationInfo.propTypes = {
  id: PropTypes.number.isRequired,
  instituteName: PropTypes.string.isRequired,
  degreeName: PropTypes.string.isRequired,
  subjectName: PropTypes.string.isRequired,
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  education: PropTypes.array,
  setEducation: PropTypes.func,
  editable: PropTypes.bool,
};

export default DoctorEducationInfo;
