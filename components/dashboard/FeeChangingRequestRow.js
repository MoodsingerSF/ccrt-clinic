import React, { useState } from "react";
import {
  Grid,
  TableCell,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import ConfirmationModal from "../modal/ConfirmationModal";
import {
  acceptFeeRequest,
  RejectFeeRequest,
} from "../../controllers/UserController";
import { APPOINTMENT_STATUS } from "../../misc/constants";
import { makeStyles, useTheme } from "@mui/styles";
import ActionButton from "../button/ActionButton";
import CustomChip from "../chip/CustomChip";
import { errorHandler } from "../../misc/functions";

const FeeChangingRequestRow = ({
  serialNo,
  firstName,
  lastName,
  status,
  changingAmount,
  previousAmount,
  requestId,
  openSnackbar,
  filterValue,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
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
      setLoading(false);
      errorHandler(error, openSnackbar);
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
      setLoading(false);
      errorHandler(error, openSnackbar);
    }
  };

  const handleClickAcceptButton = () => {
    setOpenConfirmationModal(true);
    setAcceptRequest(true);
  };

  return (
    <>
      <TableCell align="left">
        <Grid
          container
          style={{ width: matchesMd ? "15vw" : matchesSm ? "25vw" : "50vw" }}
        >
          <Typography
            className={classes.textStyle}
          >{`${serialNo}. ${fullName}`}</Typography>
        </Grid>
      </TableCell>
      <TableCell align="center">
        <Grid
          container
          style={{ width: matchesMd ? "15vw" : matchesSm ? "25vw" : "50vw" }}
        >
          <Typography className={classes.textStyle}>
            {previousAmount}
          </Typography>
        </Grid>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.textStyle}>{changingAmount}</Typography>

        {/* <Chip
          label={`${changingAmount} |=`}
          color="primary"
          size="small"
          style={{
            fontSize: "95%",
            fontWeight: "500",
          }}
        /> */}
      </TableCell>
      <TableCell align={"center"}>
        <Grid container justifyContent={"center"} alignItems="center">
          <CustomChip onlyBorder={false} title={status} />
        </Grid>
        {/* <Chip
          label={status}
          color="primary"
          size="small"
          style={{
            fontSize: "80%",
            fontWeight: "400",
          }}
        /> */}
      </TableCell>
      {filterValue === APPOINTMENT_STATUS.PENDING && (
        <TableCell align="right">
          <Tooltip title="Accept">
            <ActionButton
              title="Accept"
              icon={<DoneIcon fontSize="small" />}
              onClick={handleClickAcceptButton}
              type="success"
            />
          </Tooltip>
          <Tooltip title="Reject">
            <ActionButton
              title="Reject"
              icon={<ClearIcon fontSize="small" />}
              onClick={() => setOpenConfirmationModal(true)}
              type="error"
            />
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
  serialNo: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  changingAmount: PropTypes.number.isRequired,
  previousAmount: PropTypes.number.isRequired,
  requestId: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  textStyle: {
    fontSize: "100%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
    textAlign: "center",
  },
}));
export default FeeChangingRequestRow;
