import React from "react";
import { TableCell, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { prettyDate } from "../../controllers/DateController";
import PropTypes from "prop-types";

const MyDonationsRow = ({
  serialNo,
  fullName,
  amount,
  date,
  disease,
  phoneNo,
}) => {
  const classes = useStyles();

  return (
    <>
      <TableCell align="left">
        <Typography className={classes.textStyle}>
          {serialNo}. {fullName}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.textStyle}>{amount}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography className={classes.textStyle}>
          {prettyDate(date)}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography className={classes.textStyle}>{disease}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography className={classes.textStyle}>{phoneNo}</Typography>
      </TableCell>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  textStyle: {
    fontSize: "100%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
  },
}));

MyDonationsRow.propTypes = {
  serialNo: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  disease: PropTypes.string.isRequired,
  phoneNo: PropTypes.string.isRequired,
};
export default MyDonationsRow;
