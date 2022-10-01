import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoctorFormExperienceModal from "../modal/DoctorFormExperienceModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import { processShowDate } from "../../misc/functions";
import { deleteExperience } from "../../controllers/UserController";
import ActionButton from "../button/ActionButton";

const DoctorExperienceInfo = ({
  id,
  organization,
  jobTitle,
  department,
  division,
  startYear,
  endYear,
  // experiences,
  // setExperiences,
  openSnackbar,
  experiences = [],
  setExperiences = () => {},
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
      setExperiences(
        experiences.filter((item) => {
          return item.id !== id;
        })
      );
      setLoading(false);
      openSnackbar("Education entity has been removed successfully.");
      setConfirmationModal(false);
    } catch (error) {
      if (error && error.response) {
        // const { data } = error.response;
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
        // flexDirection={"column"}
        className={classes.ccrt__experience__section__content__container}
      >
        <Grid item xs={9}>
          <Typography
            className={
              classes.ccrt__experience__section__content__content__heading_2
            }
          >
            {jobTitle}
            {department ? "," : null} {department ? department : null}
          </Typography>
          {division && (
            <Typography
              className={
                classes.ccrt__experience__section__content__content__heading_2
              }
            >
              {division ? division : null}
            </Typography>
          )}
          <Typography
            className={
              classes.ccrt__experience__section__content__content__heading_1
            }
          >
            {organization}
          </Typography>

          <Typography
            className={
              classes.ccrt__experience__section__content__content__heading_3
            }
          >
            {startDate} - {endDate}
          </Typography>
        </Grid>
        <Grid item xs={3} container justifyContent="flex-end">
          <Grid item>
            {editable && (
              <>
                <ActionButton
                  icon={<EditIcon fontSize="small" />}
                  title={"Remove"}
                  type="error"
                  onClick={() => setConfirmationModal(true)}
                />
                <ActionButton
                  icon={<DeleteIcon fontSize="small" />}
                  title={"Edit"}
                  type="info"
                  onClick={() => setShowEditableModal(true)}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      {showEditableModal && (
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

const useStyles = makeStyles((theme) => ({
  ccrt__experience__section__content__container: {
    position: "relative",
    margin: "10px 0",
  },
  ccrt__experience__section__content__content__heading_1: {
    fontSize: "85%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
  },
  ccrt__experience__section__content__content__heading_2: {
    fontSize: "85%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
  },
  ccrt__experience__section__content__content__heading_3: {
    fontSize: "80%",
    fontWeight: 500,
    color: theme.palette.custom.GREY,
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
