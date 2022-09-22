import React, { useState } from "react";
import { Box, Grid, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoctorInfoFormTextField from "../textfields/DoctorInfoFormTextField";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import {
  validateInput,
  validateYear,
} from "../../controllers/DoctorInfoFormController";
import CustomButton from "../button/CustomButton";
import { addAward, updateAward } from "../../controllers/UserController";

const DoctorFormAwardModal = ({
  open,
  onNegativeFeedback,
  onPositiveFeedback,
  setAward,
  id = "",
  awardName = "",
  date = "",
  editable = false,
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (name, year) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = !validateInput(name) && validateYear(year);
    return isEverythingAllRight;
  };

  return (
    <Modal open={open} onClose={onNegativeFeedback}>
      <Box sx={style}>
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          className={classes.ccrt__modal__appbar__container}
        >
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
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__modal__appbar__container: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  ccrt__modal__appbar__wrapper: {
    padding: "10px",
  },
  ccrt__modal__appbar__text: {
    fontSize: "120%",
    textTransform: "capitalize",
  },
  ccrt__modal__content__container: {
    padding: "40px 20px",
  },
  ccrt__modal__footer__container: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    padding: "10px",
  },
}));

DoctorFormAwardModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  onPositiveFeedback: PropTypes.func.isRequired,
  setAward: PropTypes.func,
  id: PropTypes.number,
  awardName: PropTypes.string,
  date: PropTypes.number,
  editable: PropTypes.bool,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
};

export default DoctorFormAwardModal;
