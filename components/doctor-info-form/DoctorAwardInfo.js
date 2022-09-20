import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoctorFormAwardModal from "../modal/DoctorFormAwardModal";
import ConfirmationModal from "../modal/ConfirmationModal";

const DoctorAwardInfo = ({ id, title, year, award, setAward }) => {
  const classes = useStyles();
  const [showEditableModal, setShowEditableModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleDeleteSection = (id) => {
    // console.log(id);
    const items = award.filter((item) => item.id !== id);
    setAward(items);
  };

  return (
    <>
      <Grid
        container
        flexDirection={"column"}
        className={classes.ccrt__award__section__content__container}
      >
        <Typography
          className={classes.ccrt__award__section__content__content__heading_1}
        >
          {title}
        </Typography>
        <Typography
          className={classes.ccrt__award__section__content__content__heading_2}
        >
          {year}
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
        <DoctorFormAwardModal
          open={showEditableModal}
          onNegativeFeedback={() => setShowEditableModal(false)}
          award={award}
          setAward={setAward}
          editable={true}
          id={id}
          awardName={title}
          date={year}
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

const useStyles = makeStyles((theme) => ({
  ccrt__award__section__content__container: {
    position: "relative",
    margin: "10px 0",
  },
  ccrt__award__section__content__content__heading_1: {
    fontSize: "110%",
    fontWeight: "500",
  },
  ccrt__award__section__content__content__heading_2: {
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

DoctorAwardInfo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  award: PropTypes.array.isRequired,
  setAward: PropTypes.func.isRequired,
};
export default DoctorAwardInfo;
