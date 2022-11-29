import React, { useState } from "react";
import { Grid, TableCell, Typography, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
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
import DonorListBackdrop from "../backdrops/DonorListBackdrop";
import { errorHandler } from "../../misc/functions";
import classNames from "classnames";

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
  showViewActions = false,
  status,
  filterValue,
}) => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptRequest, setAcceptRequest] = useState(false);
  const [openDonorListBackdrop, setOpenDonorListBackdrop] = useState(false);
  const [showDescriptionDetails, setShowDescriptionDetails] = useState(false);

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
      errorHandler(error, openSnackbar);
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
      errorHandler(error, openSnackbar);
    }
  };

  return (
    <>
      <TableCell>
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems="center"
          style={{ width: matchesMd ? "15vw" : matchesSm ? "25vw" : "40vw" }}
        >
          <Typography className={classes.ccrt__donation__request__row__common}>
            {serialNo}. {name}
          </Typography>
        </Grid>
      </TableCell>
      <TableCell align="center">
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ width: matchesMd ? "15vw" : matchesSm ? "25vw" : "40vw" }}
        >
          <Typography className={classes.ccrt__donation__request__row__common}>
            {phone}
          </Typography>
        </Grid>
      </TableCell>
      <TableCell align="center">
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ width: matchesMd ? "15vw" : matchesSm ? "25vw" : "40vw" }}
        >
          <Typography className={classes.ccrt__donation__request__row__common}>
            {amount}
          </Typography>
        </Grid>
      </TableCell>
      <TableCell align="center">
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ width: matchesMd ? "15vw" : matchesSm ? "25vw" : "40vw" }}
        >
          <Typography className={classes.ccrt__donation__request__row__common}>
            {disease}
          </Typography>
        </Grid>
      </TableCell>
      <TableCell align="center">
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ width: matchesMd ? "30vw" : matchesSm ? "50" : "80vw" }}
        >
          <Typography
            className={classNames({
              [classes.ccrt__donation__request__row__description]: true,
              [classes.ccrt__donation__request__row__description__details]:
                !showDescriptionDetails,
            })}
          >
            {description}
          </Typography>
          <Grid container justifyContent={"center"} alignItems="center">
            <Typography
              style={{
                color: theme.palette.custom.GREEN,
                fontSize: "85%",
                fontWeight: "500",
              }}
              onClick={() => setShowDescriptionDetails((prev) => !prev)}
            >
              {showDescriptionDetails ? "Hide Details" : "Show Details"}
            </Typography>
          </Grid>
        </Grid>
      </TableCell>
      {!showActions && (
        <TableCell align="center">
          <Grid container justifyContent={"center"} alignItems="center">
            <CustomChip
              title={filterValue.completionStatus}
              color={CHIP_COLORS[status]}
            />
          </Grid>
        </TableCell>
      )}
      {showViewActions ? (
        <TableCell align="center">
          <Grid container justifyContent={"center"} alignItems="center">
            <ActionButton
              title="view donors"
              onClick={() => setOpenDonorListBackdrop(true)}
              type=""
              icon={null}
            />
          </Grid>
        </TableCell>
      ) : (
        filterValue.requestStatus === "ACCEPTED" && (
          <TableCell align="center">
            <Grid container justifyContent={"center"} alignItems="center">
              <ActionButton
                title="view donors"
                onClick={() => setOpenDonorListBackdrop(true)}
                type=""
                icon={null}
              />
            </Grid>
          </TableCell>
        )
      )}

      {showActions && filterValue.requestStatus === "PENDING" && (
        <TableCell align="center">
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            spacing={0.5}
          >
            <Grid item>
              <ActionButton
                title={"Accept"}
                onClick={handleClickAcceptButton}
                type="success"
                icon={<CheckIcon />}
              />
            </Grid>
            <Grid item>
              <ActionButton
                title={"Reject"}
                onClick={handleClickRejectButton}
                type="error"
                icon={<ClearIcon />}
              />
            </Grid>
          </Grid>
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
      {openDonorListBackdrop && (
        <DonorListBackdrop
          open={openDonorListBackdrop}
          onNegativeFeedback={() => setOpenDonorListBackdrop(false)}
          requestId={requestId}
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
  },
  ccrt__donation__request__row__description__details: {
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
  showViewActions: PropTypes.bool,
  filterValue: PropTypes.object.isRequired,
  description: PropTypes.string,
  status: PropTypes.string.isRequired,
};
export default DonationRequestRow;
