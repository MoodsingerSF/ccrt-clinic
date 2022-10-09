import React, { useState } from "react";
import { Grid, TableCell, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import ConfirmationModal from "../modal/ConfirmationModal";
import ActionButton from "../button/ActionButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  acceptDonationRequest,
  rejectDonationRequest,
} from "../../controllers/DonationRequestController";
import CustomChip from "../chip/CustomChip";
import { CHIP_COLORS } from "../../misc/constants";

const DonationRequestRow = ({
  requestId,
  name,
  amount,
  phone,
  disease,
  description,
  serialNo,
  openSnackbar,
  showActions = false,
  status,
}) => {
  const classes = useStyles();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptRequest, setAcceptRequest] = useState(false);

  const handleClickAcceptButton = () => {
    setOpenConfirmationModal(true);
    setAcceptRequest(true);
  };

  const handleClickRejectButton = () => {
    setOpenConfirmationModal(true);
    setAcceptRequest(false);
  };

  const handleAcceptDonationRequest = async () => {
    try {
      setLoading(true);
      await acceptDonationRequest(requestId);
      setLoading(false);
      openSnackbar("Donation request has been accepted successfully.");
      setOpenConfirmationModal(false);
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        if (data && data.code && data.message)
          openSnackbar(data.code + ": " + data.message);
        else openSnackbar("Something went wrong. Please try again later.");
      }
    }
  };

  const handleRejectDonationRequest = async () => {
    try {
      setLoading(true);
      await rejectDonationRequest(requestId);
      setLoading(false);
      openSnackbar("Donation request has been rejected successfully.");
      setOpenConfirmationModal(false);
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        if (data && data.code && data.message)
          openSnackbar(data.code + ": " + data.message);
        else openSnackbar("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <TableCell>
        <Typography className={classes.ccrt__donation__request__row__common}>
          {serialNo}. {name}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.ccrt__donation__request__row__common}>
          {phone}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.ccrt__donation__request__row__common}>
          {amount}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.ccrt__donation__request__row__common}>
          {disease}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          className={classes.ccrt__donation__request__row__description}
        >
          {description}
        </Typography>
      </TableCell>
      {!showActions && (
        <TableCell align="center">
          <Grid container justifyContent={"center"} alignItems="center">
            <CustomChip title={status} color={CHIP_COLORS[status]} />
          </Grid>
        </TableCell>
      )}
      {showActions && (
        <TableCell align="center">
          <Grid item style={{ marginBottom: 5 }}>
            <ActionButton
              title={"Accept"}
              onClick={handleClickAcceptButton}
              type="success"
              icon={<CheckIcon />}
            />
          </Grid>
          <ActionButton
            title={"Reject"}
            onClick={handleClickRejectButton}
            type="error"
            icon={<ClearIcon />}
          />
        </TableCell>
      )}
      {openConfirmationModal && (
        <ConfirmationModal
          title={`Are you sure you want to ${
            acceptRequest ? "accept" : "reject"
          } this donation request?`}
          onNegativeFeedback={() => setOpenConfirmationModal(false)}
          onPositiveFeedback={
            acceptRequest
              ? handleAcceptDonationRequest
              : handleRejectDonationRequest
          }
          loading={loading}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__donation__request__row__common: {
    fontSize: "100%",
    color: theme.palette.custom.BLACK,
    fontWeight: "500",
  },
  ccrt__donation__request__row__description: {
    fontSize: "100%",
    color: theme.palette.custom.BLACK,
    fontWeight: "500",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2 /* number of lines to show */,
    "-webkit-box-orient": "vertical",
  },
}));
DonationRequestRow.propTypes = {
  serialNo: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  requestId: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  disease: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  description: PropTypes.string,
  status: PropTypes.string.isRequired,
};
export default DonationRequestRow;
