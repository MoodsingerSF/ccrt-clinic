import React, { useState } from "react";
import { Grid, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoctorInfoFormTextField from "../textfields/DoctorInfoFormTextField";
import PropTypes from "prop-types";
import {
  validateInput,
  validateYear,
} from "../../controllers/DoctorInfoFormController";
import CustomButton from "../button/CustomButton";
import { addAward, updateAward } from "../../controllers/UserController";
import { style, useStyles } from "../../styles/ProfileInfoModalStyle";

const DoctorFormAwardModal = ({
  open,
  onNegativeFeedback,
  onPositiveFeedback,
  setAward,
  id = "",
  awardName = "",
  date = "",
  editable = false,
  openSnackbar,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(awardName);
  const [year, setYear] = useState(date);

  const handleSubmitAward = async () => {
    try {
      if (!validate(name, year)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await addAward(name, year);
      setLoading(false);
      onPositiveFeedback(data);
      openSnackbar("Award entity has been added successfully.");
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.message);
      }
    }
  };

  const handleSubmitEditAward = async () => {
    try {
      if (!validate(name, year)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await updateAward(name, year, id);
      setAward((prev) => prev.map((item) => (item.id === id ? data : item)));
      setLoading(false);
      onNegativeFeedback();
      openSnackbar("Award entity has been updated successfully.");
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.message);
      }
    }
  };

  const validate = (name, year) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = !validateInput(name) && validateYear(year);
    return isEverythingAllRight;
  };

  return (
    <Modal open={open} onClose={onNegativeFeedback}>
      <Grid container justifyContent={"center"} alignItems="center" sx={style}>
        <Grid container style={{ width: "95%" }}>
          <Grid container justifyContent={"center"} alignItems="center">
            <Grid
              container
              justifyContent={"space-between"}
              alignItems="center"
              className={classes.ccrt__modal__appbar__wrapper}
            >
              <Typography className={classes.ccrt__modal__appbar__text}>
                {editable ? "update award" : "add award"}
              </Typography>
              <IconButton onClick={onNegativeFeedback}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            spacing={2}
            className={classes.ccrt__modal__content__container}
          >
            <Grid item xs={12}>
              <DoctorInfoFormTextField
                placeholder={"Award name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={showError && validateInput(name)}
                errorText={"Required"}
              />
            </Grid>
            <Grid item xs={12}>
              <DoctorInfoFormTextField
                placeholder={"Year"}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                error={showError && !validateYear(year)}
                errorText={"Required"}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            className={classes.ccrt__modal__footer__container}
          >
            <CustomButton
              icon={null}
              title={editable ? "update" : "save"}
              onClick={editable ? handleSubmitEditAward : handleSubmitAward}
              size="medium"
              loading={loading}
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

DoctorFormAwardModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  onPositiveFeedback: PropTypes.func.isRequired,
  setAward: PropTypes.func,
  id: PropTypes.number,
  awardName: PropTypes.string,
  date: PropTypes.number,
  editable: PropTypes.bool,
  openSnackbar: PropTypes.func.isRequired,
};

export default DoctorFormAwardModal;
