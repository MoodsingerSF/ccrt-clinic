import React from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  DialogContent,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const TimeSlotBookUserInfoModal = ({ onNegativeFeedback, selectedDate }) => {
  return (
    <div>
      <Dialog fullScreen open={true} onClose={onNegativeFeedback}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: "85%",
                fontWeight: "500",
              }}
            >
              User Information
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onNegativeFeedback}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container justifyContent={"center"} alignItems="center">
            <Grid container>
              <Typography>Title</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

TimeSlotBookUserInfoModal.propTypes = {
  onNegativeFeedback: PropTypes.bool.isRequired,
  selectedDate: PropTypes.string.isRequired,
};

export default TimeSlotBookUserInfoModal;
