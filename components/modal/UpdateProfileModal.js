import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PropTypes from "prop-types";
import { formErrors } from "../../data/signup/data";
import { validateName } from "../../controllers/SignupController";

const UpdateProfileModal = ({ open, onClose, editableValue }) => {
  const theme = useTheme();
  const IsDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // const [commingValue, setCommingValue] = useState(editableValue);
  const [editValue, setEditValue] = useState(editableValue);
  const [loading, setLoading] = useState(false);

  const [showError, setShowError] = useState(false);

  const handleSubmitValue = () => {
    if (validate(editValue)) {
      // if everything is alright, send verification code
      setLoading(true);
      //api
      console.log(editValue);
      setLoading(false);
    } else {
      setShowError(true);
    }
  };

  const validate = (editValue) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = validateName(editValue);
    return isEverythingAllRight && editableValue !== editValue;
  };

  const handleChangeValue = (e) => {
    setEditValue(e.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={box__style} style={{ width: IsDesktop ? "50vw" : "90vw" }}>
        <Typography style={{ marginBottom: "10px" }}>
          Update your profile
        </Typography>
        <TextField
          value={editValue}
          fullWidth
          onChange={(e) => handleChangeValue(e)}
          error={showError && !validate(editValue)}
        />
        {showError && !validate(editValue) && (
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
        <Button
          variant="contained"
          onClick={handleSubmitValue}
          style={{ margin: "10px 0" }}
        >
          {loading ? "..." : "Save"}
        </Button>
      </Box>
    </Modal>
  );
};

UpdateProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editableValue: PropTypes.string.isRequired,
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
