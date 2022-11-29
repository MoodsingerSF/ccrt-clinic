import React from "react";
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/styles";

const ConfirmationModal = ({
  onPositiveFeedback,
  onNegativeFeedback,
  title,
  subTitle = null,
  loading = false,
}) => {
  const theme = useTheme();
  return (
    <Dialog open={true} onClose={onNegativeFeedback}>
      <DialogContent>
        <Grid container justifyContent={"center"} alignItems="center">
          <Typography
            id="modal-modal-title"
            style={{
              fontSize: "85%",
              marginBottom: "10px",
              fontWeight: 500,
              color: theme.palette.custom.BLACK,
            }}
          >
            {title}
          </Typography>
          {subTitle && (
            <Typography
              id="modal-modal-title"
              style={{ fontSize: "80%", marginBottom: "10px" }}
            >
              {subTitle}
            </Typography>
          )}
          <Grid container justifyContent="center" alignItems="center">
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <>
                <Button onClick={onPositiveFeedback}>yes</Button>
                <Button onClick={onNegativeFeedback}>No</Button>
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;

ConfirmationModal.propTypes = {
  onPositiveFeedback: PropTypes.func.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  loading: PropTypes.bool,
};
