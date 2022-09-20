import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoctorInfoFormTextField from "../textfields/DoctorInfoFormTextField";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import {
  validateInput,
  validateYear,
} from "../../controllers/DoctorInfoFormController";

function* generateId(i) {
  while (true) {
    yield i++;
  }
}
const getId = generateId(0);

const DoctorFormAwardModal = ({
  open,
  onNegativeFeedback,
  award,
  setAward,
  id = "",
  awardName = "",
  date = "",
  editable = false,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);

  const [title, setTitle] = useState(awardName);
  const [year, setYear] = useState(date);

  const handleSubmitAward = () => {
    if (validate(title, year)) {
      const awardItem = {
        id: getId.next().value.toLocaleString(),
        title,
        year,
      };
      setAward([...award, awardItem]);
      setTitle("");
      setYear("");
      onNegativeFeedback();
    } else {
      setShowError(true);
    }
  };

  const handleSubmitEditAward = () => {
    if (validate(title, year)) {
      const awardItem = {
        id: id,
        title,
        year,
      };
      setAward((prev) =>
        prev.map((item) => (item.id === id ? awardItem : item))
      );
      setTitle("");
      setYear("");
      onNegativeFeedback();
    } else {
      setShowError(true);
    }
  };

  const validate = (title, year) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = !validateInput(title) && validateYear(year);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={showError && validateInput(title)}
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
          <Button
            onClick={editable ? handleSubmitEditAward : handleSubmitAward}
          >
            {editable ? "update" : "save"}
          </Button>
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
  award: PropTypes.array,
  setAward: PropTypes.func,
  id: PropTypes.string,
  awardName: PropTypes.string,
  date: PropTypes.string,
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
