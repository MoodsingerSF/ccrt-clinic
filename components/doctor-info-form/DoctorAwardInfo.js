import React, { useState } from "react";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import DoctorFormAwardModal from "../modal/DoctorFormAwardModal";
import { deleteAward } from "../../controllers/UserController";
import DoctorInfoHOC from "./DoctorInfoHOC";
import { useStyles } from "./DoctorInfoStyle";

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

  const handleDelete = async () => {
    await deleteAward(id);
  };

  return (
    <DoctorInfoHOC
      editable={editable}
      editModal={
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
      }
      showEditableModal={showEditableModal}
      setShowEditableModal={setShowEditableModal}
      openSnackbar={openSnackbar}
      onDelete={handleDelete}
      onSuccess={() => {
        setAward(
          award.filter((item) => {
            return item.id !== id;
          })
        );
      }}
    >
      <>
        <Typography className={classes.ccrt__doctor__info__content__heading_1}>
          {title}
        </Typography>
        <Typography className={classes.ccrt__doctor__info__content__heading_2}>
          {year}
        </Typography>
      </>
    </DoctorInfoHOC>
  );
};

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
