import React, { useState } from "react";
import {
  Box,
  Grid,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PropTypes from "prop-types";
import { formErrors } from "../../data/signup/data";
import CustomButton from "../button/CustomButton";
import { validateUpdateFee } from "../../controllers/SignupController";
import { retrieveUserId } from "../../controllers/LocalStorageController";

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
  price = false,
}) => {
  const previousAmount = editableValue;
  const theme = useTheme();
  const IsDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [editedValue, setEditedValue] = useState(editableValue);
  const [loading, setLoading] = useState(false);

  const [showError, setShowError] = useState(false);

  const handleSubmitValue = async () => {
    if (validate(editedValue)) {
      try {
        setLoading(true);
        await onSave(editedValue);
        onSuccess(editedValue);
        setLoading(false);
        onClose();
        openSnackbar(`${fieldName} has been updated successfully.`);
      } catch (error) {
        setLoading(false);
      }
    } else {
      setShowError(true);
    }
  };

  const handleSubmitPrice = async () => {
    console.log("Clicked-1");
    // if (!validateUpdateFee(editableValue, previousAmount)) {
    //   console.log("Clicked-2");
    //   setShowError(true);
    //   return;
    // }
    console.log("Clicked");
    try {
      setLoading(true);
      const response = await onSave(
        editableValue,
        previousAmount,
        retrieveUserId()
      );
      setLoading(false);
      onClose();
      openSnackbar(`${fieldName} has been updated successfully.`);
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChangeValue = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={box__style} style={{ width: IsDesktop ? "50vw" : "90vw" }}>
        <Typography style={{ marginBottom: "10px", fontWeight: 500 }}>
          {title}
        </Typography>
        <TextField
          style={{ fontSize: "80%", fontWeight: 500 }}
          value={editedValue}
          size="small"
          fullWidth
          multiline
          onChange={(e) => handleChangeValue(e)}
          error={
            showError &&
            (price
              ? !validateUpdateFee(editedValue, previousAmount)
              : !validate(editedValue))
          }
        />
        {showError &&
          (price
            ? !validateUpdateFee(editedValue, previousAmount) && (
                <Typography
                  style={{
                    color: "red",
                    fontSize: "70%",
                    margin: "5px 0",
                    textAlign: "left",
                  }}
                >
                  {"price cann't be empty and equal"}
                </Typography>
              )
            : !validate(editedValue) && (
                <Typography
                  style={{
                    color: "red",
                    fontSize: "70%",
                    margin: "5px 0",
                    textAlign: "left",
                  }}
                >
                  {formErrors.name}
                </Typography>
              ))}
        <Grid container style={{ marginTop: 20 }}></Grid>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <CustomButton
              title="Save"
              onClick={price ? handleSubmitPrice : handleSubmitValue}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

UpdateProfileModal.propTypes = {
  fieldName: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editableValue: PropTypes.string.isRequired,
  title: PropTypes.string,
  onSave: PropTypes.func,
  validate: PropTypes.func,
  onSuccess: PropTypes.func,
  openSnackbar: PropTypes.func,
  userId: PropTypes.string,
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
