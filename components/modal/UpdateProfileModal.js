import React, { useState } from "react";
import {
  Box,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PropTypes from "prop-types";
import { formErrors } from "../../data/signup/data";
import CustomButton from "../button/CustomButton";
import { retrieveUserId } from "../../controllers/LocalStorageController";
import DoctorInfoFormTextField from "../textfields/DoctorInfoFormTextField";

const UpdateProfileModal = ({
  fieldName,
  open,
  onClose,
  editableValue,
  title = "Update your profile",
  onSave,
  validate,
  onSuccess,
  openSnackbar,
  isPrice = false,
}) => {
  const theme = useTheme();
  const IsDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [updatedValue, setUpdatedValue] = useState(editableValue);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmitValue = async () => {
    if (validate(updatedValue)) {
      try {
        setLoading(true);
        await onSave(updatedValue);
        onSuccess(updatedValue);
        setLoading(false);
        onClose();
        openSnackbar(`${fieldName} has been updated successfully.`);
      } catch (error) {
        setLoading(false);
        if (error && error.response) {
          const { data } = error.response;
          openSnackbar(data.message);
        }
      }
    } else {
      setShowError(true);
    }
  };

  const handleSubmitPrice = async () => {
    if (validate(editableValue, updatedValue)) {
      try {
        setLoading(true);
        await onSave(updatedValue, editableValue, retrieveUserId());
        openSnackbar(`Request has been sent successfully.`);
        setLoading(false);
        onClose();
      } catch (error) {
        setLoading(false);
        if (error && error.response) {
          const { data } = error.response;
          openSnackbar(data.message);
        }
      }
    } else {
      setShowError(true);
    }
  };

  const handleChangeValue = (e) => {
    setUpdatedValue(e.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={box__style} style={{ width: IsDesktop ? "50vw" : "90vw" }}>
        <Typography
          style={{
            marginBottom: "10px",
            fontWeight: 600,
            fontSize: "100%",
            color: theme.palette.custom.BLACK,
          }}
        >
          {title}
        </Typography>
        <DoctorInfoFormTextField
          label={fieldName}
          value={updatedValue}
          onChange={(e) => handleChangeValue(e)}
          error={
            showError &&
            (isPrice
              ? !validate(editableValue, updatedValue)
              : !validate(updatedValue))
          }
          errorText={
            isPrice
              ? "Fee can't be empty or equal to previous amount."
              : formErrors.name
          }
        />

        <Grid container style={{ marginTop: 20 }}></Grid>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6} sm={6} md={4}>
            <CustomButton title="Cancel" onClick={onClose} />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <CustomButton
              title="Save"
              onClick={isPrice ? handleSubmitPrice : handleSubmitValue}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

UpdateProfileModal.propTypes = {
  fieldName: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editableValue: PropTypes.string.isRequired,
  title: PropTypes.string,
  onSave: PropTypes.func,
  validate: PropTypes.func,
  onSuccess: PropTypes.func,
  openSnackbar: PropTypes.func,
  userId: PropTypes.string,
  isPrice: PropTypes.bool,
};

export default UpdateProfileModal;

const box__style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
