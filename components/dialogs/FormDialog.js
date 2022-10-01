import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { validateTitle } from "../../controllers/ContactFormController";

const FormDialog = ({ onClose, addSection }) => {
  const [title, setTitle] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onSave = () => {
    if (validate(title)) {
      setShowError(true);
    } else {
      addSection(title);
      onClose();
    }
  };

  const validate = (title) => {
    return validateTitle(title);
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogTitle>Add Your Report or Test</DialogTitle>
      <DialogContent>
        <Grid container>
          <TextField
            fullWidth
            autoFocus
            placeholder="Enter your report or test name"
            type="text"
            value={title}
            variant="standard"
            style={{ marginBottom: "3px" }}
            onChange={handleChangeTitle}
          />
          {showError && validateTitle(title) && (
            <Typography
              style={{
                fontSize: "75%",
                color: "red",
              }}
            >
              you have to given report or test name
            </Typography>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  addSection: PropTypes.func.isRequired,
};
export default FormDialog;
