import React, { useState } from "react";
import { TableCell, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import DonationInfoModal from "../modal/DonationInfoModal";

const DonationRow = ({ donarName, recipientName, phone, amount, date }) => {
  const classes = useStyles();
  const [openDonationInfoModal, setOpenDonationInfoModal] = useState(false);

  return (
    <>
      <TableCell>
        <Typography className={classes.ccrt__donation__request__row__name}>
          {donarName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={classes.ccrt__donation__request__row__name}>
          {recipientName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={classes.ccrt__donation__request__row__name}>
          {phone}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={classes.ccrt__donation__request__row__name}>
          {amount}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={classes.ccrt__donation__request__row__name}>
          {date}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          className={classes.ccrt__donation__request__row__action}
          onClick={() => setOpenDonationInfoModal(true)}
        >
          view
        </Typography>
      </TableCell>
      {openDonationInfoModal && (
        <DonationInfoModal
          open={openDonationInfoModal}
          onNegativeFeedback={() => setOpenDonationInfoModal(false)}
          donarName={donarName}
          recipientName={recipientName}
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
  ccrt__donation__request__row__action: {
    fontSize: "100%",
    textTransform: "capitalize",
    border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_2}`,
    cursor: "pointer",
    textAlign: "center",
    padding: "0 10px",
    borderRadius: "3px",
    transition: "all 0.3s ease",
    "&:hover": {
      background: theme.palette.custom.DEFAULT_COLOR_2,
      color: "#fff",
    },
  },
}));
DonationRow.propTypes = {
  donarName: PropTypes.string.isRequired,
  recipientName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
export default DonationRow;
