import React from "react";
import Image from "next/image";
import { Avatar, Grid, TableCell, Typography } from "@mui/material";
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
        <Grid container alignItems={"center"} style={{ width: "100%" }}>
          <Grid item xs={6} sm={3} md={2} container alignItems={"center"}>
            <Typography className={classes.ccrt__donor__name}>
              {serialNo}.
            </Typography>

            <Avatar
              sx={{ width: 45, height: 45 }}
              style={{ marginRight: "20px" }}
            >
              <Image
                loader={({ src }) => src}
                src={profileImageUrl}
                alt="name"
                layout="fill"
              />
            </Avatar>
          </Grid>
          <Grid item xs={6} sm={9} md={10}>
            <Typography className={classes.ccrt__donor__name}>
              {DonorFullName}
            </Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell align="center">
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ width: "100%" }}
        >
          <Typography className={classes.ccrt__donor__time}>
            {prettyDate(creationTime)}
          </Typography>
        </Grid>
      </TableCell>
      <TableCell align="center">
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ width: "100%" }}
        >
          <Typography className={classes.ccrt__donor__amount}>
            {amount} ৳
          </Typography>
        </Grid>
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

const useStyles = makeStyles(() => ({
  ccrt__donor__name: {
    fontSize: "90%",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
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
