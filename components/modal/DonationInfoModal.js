import React from "react";
import {
  Box,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { BOX_SHADOW } from "../../misc/colors";
import DonationInfoGroup from "../misc/DonationInfoGroup";

const DonationInfoModal = ({
  open,
  onNegativeFeedback,
  donarName,
  recipientName,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matcheLg = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div>
      <Modal
        open={open}
        onClose={onNegativeFeedback}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            width: matches ? (matcheLg ? "60vw" : "70vw") : "95vw",
          }}
        >
          <Grid container justifyContent={"center"} alignItems="center">
            <Grid container item xs={12} md={6}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className={classes.ccrt__donation_info_modal_title}
              >
                donar details
              </Typography>
              <DonationInfoGroup label={"name"} text={donarName} />
            </Grid>
            <Grid container item xs={12} md={6}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className={classes.ccrt__donation_info_modal_title}
              >
                recipient details
              </Typography>
              <DonationInfoGroup label={"name"} text={recipientName} />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

DonationInfoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  donarName: PropTypes.string.isRequired,
  recipientName: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  ccrt__donation_info_modal_title: {
    textTransform: "capitalize",
    fontWeight: "300",
  },
  ccrt__donation__text_group__container: {
    boxShadow: BOX_SHADOW,
    padding: "5px",
    borderRadius: "3px",
    margin: "5px",
  },
  ccrt__donate_modal__label: {
    fontSize: "85%",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  ccrt__donate_modal__text: {
    fontSize: "95%",
    fontWeight: "300",
    borderRadius: "5px",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
};
export default DonationInfoModal;
