import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoctorFormAwardModal from "../modal/DoctorFormAwardModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import { deleteAward } from "../../controllers/UserController";
import ActionButton from "../button/ActionButton";

const DoctorAwardInfo = ({
  id,
  title,
  year,
  award = [],
  setAward = () => {},
  editable = false,
  openSnackbar,
}) => {
  const classes = useStyles();
  const [showEditableModal, setShowEditableModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteSection = async (id) => {
    setLoading(true);
    try {
      await deleteAward(id);
      setAward(
        award.filter((item) => {
          return item.id !== id;
        })
      );
      setLoading(false);
      openSnackbar("Education entity has been removed successfully.");
      setConfirmationModal(false);
    } catch (error) {
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.code + ":" + data.message);
      }
    }
  };

  return (
    <>
      <Grid
        container
        // flexDirection={"column"}
        className={classes.ccrt__award__section__content__container}
      >
        <Grid item xs={9}>
          <Typography
            className={
              classes.ccrt__award__section__content__content__heading_1
            }
          >
            {title}
          </Typography>
          <Typography
            className={
              classes.ccrt__award__section__content__content__heading_2
            }
          >
            {year}
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
        <DoctorFormAwardModal
          open={showEditableModal}
          onNegativeFeedback={() => setShowEditableModal(false)}
          award={award}
          setAward={setAward}
          editable={true}
          id={id}
          awardName={title}
          date={year}
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
  ccrt__award__section__content__container: {
    position: "relative",
    margin: "10px 0",
  },
  ccrt__award__section__content__content__heading_1: {
    fontSize: "85%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
  },
  ccrt__award__section__content__content__heading_2: {
    fontSize: "85%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
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

DoctorAwardInfo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  award: PropTypes.array,
  setAward: PropTypes.func,
  editable: PropTypes.bool,
  openSnackbar: PropTypes.func,
};
export default DoctorAwardInfo;
