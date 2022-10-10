import React from "react";
import Image from "next/image";
import { Avatar, TableCell, Typography } from "@mui/material";
import profilePic2 from "../../public/image/doctor/doctor.jpg";
import { makeStyles } from "@mui/styles";
import { prettyDate } from "../../controllers/DateController";
import PropTypes from "prop-types";

const Donor = ({
  DonorFullName,
  profileImageUrl,
  amount,
  creationTime,
  serialNo,
}) => {
  const classes = useStyles();

  return (
    <>
      <TableCell align="left">
        <Typography>{serialNo}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={classes.ccrt__donor__name}>
          <Avatar
            sx={{ width: 45, height: 45 }}
            style={{ marginRight: "20px" }}
          >
            <Image
              src={profileImageUrl ? profileImageUrl : profilePic2}
              alt="name"
              layout="fill"
            />
          </Avatar>
          {DonorFullName}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.ccrt__donor__time}>
          {prettyDate(creationTime)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.ccrt__donor__amount}>
          {amount} ৳
        </Typography>
      </TableCell>
    </>
  );
};

Donor.propTypes = {
  DonorFullName: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  creationTime: PropTypes.number.isRequired,
  serialNo: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  ccrt__donor__name: {
    fontSize: "90%",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
  },
  ccrt__donor__time_wrapper: {
    padding: "10px 10px 0 10px",
    margin: "0",
  },
  ccrt__donor__time: {
    fontSize: "90%",
    fontWeight: "500",
  },
  ccrt__donor__amount: {
    fontSize: "90%",
    fontWeight: "500",
  },
}));

export default Donor;
