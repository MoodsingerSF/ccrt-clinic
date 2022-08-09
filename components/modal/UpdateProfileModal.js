import React, { useState } from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import SignUpTextField from "../textfields/SignUpTextField";
import CustomButton from "../button/CustomButton";
import { UPDATE_PROFILE } from "../../data/dashboard/data";
import { formErrors } from "../../data/signup/data";
import { validateName } from "../../controllers/signupController";
import PropTypes from "prop-types";

const UpdateProfileModal = ({ open, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmitForm = () => {
    if (validate(firstName, lastName)) {
      // if everything is alright, send verification code
      setLoading(true);
      //api
      // setLoading(false);
    } else {
      setShowError(true);
    }
  };

  const validate = (firstName, lastName) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = validateName(firstName) && validateName(lastName);
    return isEverythingAllRight;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography style={{ marginBottom: "10px" }}>
          Update your profile
        </Typography>
        <Grid container justifyContent="center" alignItems="center">
          <SignUpTextField
            label="First Name"
            type="text"
            value={firstName}
            onChange={handleChangeFirstName}
            error={showError && !validateName(firstName)}
            errorText={formErrors.name}
          />
          <SignUpTextField
            label="Last Name"
            type="text"
            value={lastName}
            onChange={handleChangeLastName}
            error={showError && !validateName(lastName)}
            errorText={formErrors.name}
          />
        </Grid>
        <CustomButton
          icon={null}
          title={UPDATE_PROFILE}
          onClick={handleSubmitForm}
          size="small"
          loading={loading}
        />
      </Box>
    </Modal>
  );
};

UpdateProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateProfileModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
