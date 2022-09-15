import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import DoctorFormAwardModal from "../modal/DoctorFormAwardModal";
import EditIcon from "@mui/icons-material/Edit";

const DoctorAwardInfo = ({ id, title, year, award, setAward }) => {
  const classes = useStyles();
  const [showEditableModal, setShowEditableModal] = useState(false);

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
  ccrt__doctor__training__info__edit: {
    position: "absolute",
    right: "0",
  },
}));

DoctorAwardInfo.propTypes = {
  id: PropTypes.string.isRequired,
  titleid: PropTypes.string.isRequired,
  yearid: PropTypes.string.isRequired,
  award: PropTypes.array.isRequired,
  setAward: PropTypes.func.isRequired,
};
export default DoctorAwardInfo;
