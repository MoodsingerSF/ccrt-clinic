import React from "react";
import { TableCell, Typography, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const RequestDonationListRow = ({ index, name, phone, amount, status }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <TableCell>
        <Typography className={classes.ccrt__donation__request__row__index}>
          {index + 1}.
        </Typography>
      </TableCell>
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
          style={{
            width: matchesSm ? (matchesMd ? "40%" : "75%") : "100%",
          }}
          className={classes.ccrt__donation__request__row__status}
        >
          {amount}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          style={{
            width: matchesSm ? (matchesMd ? "40%" : "75%") : "100%",
          }}
          className={classes.ccrt__donation__request__row__status}
        >
          {status}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          style={{
            width: matchesSm ? (matchesMd ? "40%" : "75%") : "100%",
          }}
          className={classes.ccrt__donation__request__row__button}
        >
          donate
        </Typography>
      </TableCell>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__donation__request__row__index: {
    fontSize: "100%",
    fontWeight: "500",
  },
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
    textAlign: "center",
    lineHeight: "1.7",
    textTransform: "capitalize",
    cursor: "pointer",
  },
}));
RequestDonationListRow.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
export default RequestDonationListRow;
