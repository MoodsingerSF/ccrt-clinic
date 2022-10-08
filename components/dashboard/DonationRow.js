import React, { useState } from "react";
import { TableCell, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import DonationInfoModal from "../modal/DonationInfoModal";
import { prettyDate } from "../../controllers/DateController";
import ActionButton from "../button/ActionButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

const DonationRow = ({
  donarName,
  recipientName,
  phone,
  amount,
  date,
  disease,
  description,
}) => {
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
          {prettyDate(date)}
        </Typography>
      </TableCell>
      <TableCell>
        {/* <Tooltip title="View"> */}
        <ActionButton
          title="View"
          icon={<VisibilityIcon fontSize="small" />}
          onClick={() => setOpenDonationInfoModal(true)}
          type=""
        />
        {/* </Tooltip> */}
      </TableCell>
      {openDonationInfoModal && (
        <DonationInfoModal
          open={openDonationInfoModal}
          onNegativeFeedback={() => setOpenDonationInfoModal(false)}
          donarName={donarName}
          recipientName={recipientName}
          amount={amount}
          phone={phone}
          disease={disease}
          description={description}
        />
      )}
    </>
  );
};

DonationRow.propTypes = {
  donarName: PropTypes.string.isRequired,
  recipientName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  disease: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
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

export default DonationRow;
