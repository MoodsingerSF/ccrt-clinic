import React, { useState } from "react";
import {
  Grid,
  TableCell,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import ConfirmationModal from "../modal/ConfirmationModal";

const DonationRequestRow = ({ name, amount, phone, status }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

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
        <Typography className={classes.ccrt__donation__request__row__name}>
          {name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={classes.ccrt__donation__request__row__common}>
          +88 {phone}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          style={{ width: matchesSm ? (matchesMd ? "40%" : "75%") : "100%" }}
          className={classes.ccrt__donation__request__row__status}
        >
          {amount}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          style={{ width: matchesSm ? (matchesMd ? "40%" : "75%") : "100%" }}
          className={classes.ccrt__donation__request__row__status}
        >
          {status}
        </Typography>
      </TableCell>
      <TableCell>
        <Grid container item xs={12} spacing={1}>
          <Grid container item xs={12} md={6}>
            <Typography
              className={classes.ccrt__donation__request__row__button}
              onClick={handleClickAcceptButton}
            >
              accept
            </Typography>
          </Grid>
          <Grid container item xs={12} md={6}>
            <Typography
              className={classes.ccrt__donation__request__row__button}
              onClick={() => setOpenConfirmationModal(true)}
            >
              reject
            </Typography>
          </Grid>
        </Grid>
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
  ccrt__donation__request__row__name: {
    fontSize: "100%",
    marginRight: "20px",
    lineHeight: "1.7",
    textTransform: "capitalize",
  },
  ccrt__donation__request__row__common: {
    fontSize: "100%",
    marginRight: "20px",
  },
  ccrt__donation__request__row__status: {
    fontSize: "100%",
    marginRight: "20px",
    border: "1px solid green",
    borderRadius: "10px",
    textAlign: "center",
    lineHeight: "1.7",
    textTransform: "capitalize",
  },
  ccrt__donation__request__row__button: {
    fontSize: "100%",
    marginRight: "20px",
    border: "1px solid green",
    borderRadius: "10px",
    padding: "0 10px",
    textAlign: "center",
    lineHeight: "1.7",
    textTransform: "capitalize",
    cursor: "pointer",
  },
}));
DonationRequestRow.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
export default DonationRequestRow;
