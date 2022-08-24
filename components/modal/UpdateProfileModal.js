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
}) => {
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

  // const validate = (editedValue) => {
  //   let isEverythingAllRight = true;
  //   isEverythingAllRight = validateName(editedValue);
  //   return isEverythingAllRight && editableValue !== editedValue;
  // };

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
          onChange={(e) => handleChangeValue(e)}
          error={showError && !validate(editedValue)}
        />
        {showError && !validate(editedValue) && (
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
        )}
        <Grid container style={{ marginTop: 20 }}></Grid>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <CustomButton
              title="Save"
              onClick={handleSubmitValue}
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
