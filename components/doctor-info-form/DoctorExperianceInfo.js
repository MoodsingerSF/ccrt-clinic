import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoctorFormExperianceModal from "../modal/DoctorFormExperianceModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import { processShowDate } from "../../misc/functions";
import DoctorInfoButton from "../button/DoctorInfoButton";
import { deleteExperience } from "../../controllers/UserController";

const DoctorExperianceInfo = ({
  id,
  organization,
  jobTitle,
  department,
  division,
  startYear,
  endYear,
  // experiances,
  // setExperiances,
  openSnackbar,
  experiances = [],
  setExperiances = () => {},
  editable = false,
}) => {
  const classes = useStyles();

  const [showEditableModal, setShowEditableModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteSection = async (id) => {
    setLoading(true);
    try {
      await deleteExperience(id);
      setExperiances(
        experiances.filter((item) => {
          return item.id !== id;
        })
      );
      setLoading(false);
      openSnackbar("Education entity has been removed successfully.");
      setConfirmationModal(false);
    } catch (error) {
      if (error && error.response) {
        const { data } = error.response;
        // openSnackbar(data.code + ":" + data.message);
      }
    }
  };

  const startDate = processShowDate(startYear);
  const endDate = processShowDate(endYear);

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
          {jobTitle}
          {department ? "," : null} {department ? department : null}
        </Typography>
        {division && (
          <Typography
            className={
              classes.ccrt__experiance__section__content__content__heading_2
            }
          >
            {division ? division : null}
          </Typography>
        )}

        <Typography
          className={
            classes.ccrt__experiance__section__content__content__heading_3
          }
        >
          {startDate} - {endDate}
        </Typography>

        {editable && (
          <>
            <DoctorInfoButton
              className={classes.ccrt__doctor__training__info__edit}
              onClick={() => setShowEditableModal(true)}
              icon={<EditIcon fontSize="small" />}
            />
            <DoctorInfoButton
              className={classes.ccrt__doctor__training__info__delete}
              onClick={() => setConfirmationModal(true)}
              icon={<DeleteIcon fontSize="small" />}
            />
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
          titleName={jobTitle}
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
          loading={loading}
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
  id: PropTypes.number.isRequired,
  organization: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  division: PropTypes.string.isRequired,
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired,
  experiances: PropTypes.array.isRequired,
  setExperiances: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

export default DoctorExperianceInfo;
