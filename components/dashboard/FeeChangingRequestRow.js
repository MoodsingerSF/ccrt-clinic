import React, { useState } from "react";
import {
  Chip,
  IconButton,
  TableCell,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import ConfirmationModal from "../modal/ConfirmationModal";
import {
  acceptFeeRequest,
  RejectFeeRequest,
} from "../../controllers/UserController";

const FeeChangingRequestRow = ({
  firstName,
  lastName,
  status,
  changingAmount,
  previousAmount,
  requestId,
  openSnackbar,
  filterValue,
}) => {
  const fullName = `${firstName} ${lastName}`;
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptRequest, setAcceptRequest] = useState(false);

  const handleAcceptFeeRequest = async () => {
    try {
      setLoading(true);
      const isAccepted = await acceptFeeRequest(requestId);
      if (isAccepted) {
        openSnackbar("Request has been accepted successfully.");
      } else {
        openSnackbar(
          "Operation couldn't be performed. Please try again later."
        );
      }
      setLoading(false);
      setOpenConfirmationModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectFeeRequest = async () => {
    try {
      setLoading(true);
      const isAccepted = await RejectFeeRequest(requestId);
      if (isAccepted === 200) {
        openSnackbar("Request has been rejected successfully.");
      } else {
        openSnackbar(
          "Operation couldn't be performed. Please try again later."
        );
      }
      setLoading(false);
      setOpenConfirmationModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAcceptButton = () => {
    setOpenConfirmationModal(true);
    setAcceptRequest(true);
  };

  return (
    <>
      <TableCell>
        <Typography style={{ fontSize: "105%", fontWeight: "500" }}>
          {fullName}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Chip
          label={`${previousAmount} |=`}
          color="primary"
          size="small"
          style={{
            fontSize: "95%",
            fontWeight: "500",
          }}
        />
      </TableCell>
      <TableCell align="center">
        <Chip
          label={`${changingAmount} |=`}
          color="primary"
          size="small"
          style={{
            fontSize: "95%",
            fontWeight: "500",
          }}
        />
      </TableCell>
      <TableCell align={filterValue === "pending" ? "center" : "right"}>
        <Chip
          label={status}
          color="primary"
          size="small"
          style={{
            fontSize: "80%",
            fontWeight: "400",
          }}
        />
      </TableCell>
      {filterValue === "pending" && (
        <TableCell align="right">
          <Tooltip title="Reject">
            <IconButton
              size="small"
              style={{ background: "red", marginRight: "5px" }}
              onClick={() => setOpenConfirmationModal(true)}
            >
              <ClearIcon fontSize="small" style={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Accept">
            <IconButton
              size="small"
              style={{ background: "green" }}
              onClick={handleClickAcceptButton}
            >
              <DoneIcon fontSize="small" style={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        </TableCell>
      )}

      {openConfirmationModal && (
        <ConfirmationModal
          title="Are you sure?"
          onNegativeFeedback={() => setOpenConfirmationModal(false)}
          onPositiveFeedback={
            acceptRequest ? handleAcceptFeeRequest : handleRejectFeeRequest
          }
          loading={loading}
        />
      )}
    </>
  );
};

FeeChangingRequestRow.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  changingAmount: PropTypes.number.isRequired,
  previousAmount: PropTypes.number.isRequired,
  requestId: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};
export default FeeChangingRequestRow;
