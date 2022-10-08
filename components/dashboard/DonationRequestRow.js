import React, { useState } from "react";
import { Grid, TableCell, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import ConfirmationModal from "../modal/ConfirmationModal";
import ActionButton from "../button/ActionButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const DonationRequestRow = ({
  name,
  amount,
  phone,
  disease,
  description,
  serialNo,
}) => {
  const classes = useStyles();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptRequest, setAcceptRequest] = useState(false);

  const handleClickAcceptButton = () => {
    setOpenConfirmationModal(true);
    setAcceptRequest(true);
  };

  const handleAcceptDonationRequest = async () => {
    setLoading(true);
    //  Api Call
    setLoading(false);
  };

  const handleRejectDonationRequest = async () => {
    setLoading(true);
    //  Api Call
    setLoading(false);
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
      <TableCell align="center">
        <Grid item style={{ marginBottom: 5 }}>
          <ActionButton
            title={"Accept"}
            // const handleClickAcceptButton = () => {
            onClick={handleClickAcceptButton}
            type="success"
            icon={<CheckIcon />}
          />
        </Grid>
        <ActionButton
          title={"Reject"}
          onClick={() => {}}
          type="error"
          icon={<ClearIcon />}
        />
      </TableCell>

      {openConfirmationModal && (
        <ConfirmationModal
          title="Are you sure?"
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
  amount: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  disease: PropTypes.string.isRequired,
  description: PropTypes.string,
};
export default DonationRequestRow;
