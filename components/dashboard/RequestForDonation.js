import React, { useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DashboardTitle from "./DashboardTitle";
import {
  DASHBOARD_TITLE_MARGIN_TOP,
  DONATION_REQUEST_STATUS,
} from "../../misc/constants";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
// import LoaderBackdrop from "../backdrops/LoaderBackdrop";
import { makeStyles } from "@mui/styles";
import DonationRequestRow from "./DonationRequestRow";
import DashboardFilterComponent from "../misc/DashboardFilterComponent";
import useDonationRequests from "../../hooks/useDonationRequests";
import DashboardLoaderComponent from "./DashboardLoaderComponent";

const RequestForDonation = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [filterValue, setFilterValue] = useState(
    DONATION_REQUEST_STATUS.PENDING
  );
  const {
    data: donationRequests,
    loading,
    hasMore,
  } = useDonationRequests(
    page,
    15,
    filterValue.requestStatus,
    filterValue.completionStatus
  );

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid
        container
        style={{ marginBottom: 10, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
        justifyContent="center"
        alignItems="center"
      >
        <DashboardTitle title="Request For Donation">
          <DashboardFilterComponent
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
            options={DONATION_REQUEST_STATUS}
          />
        </DashboardTitle>
      </Grid>
      {loading ? (
        <DashboardLoaderComponent />
      ) : donationRequests.length === 0 ? (
        <NoContentToShowComponent title="There is no requests to show." />
      ) : (
        <Grid container>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.titleStyle}>Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className={classes.titleStyle}>
                      Phone Number
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className={classes.titleStyle}>
                      Requested Amount
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className={classes.titleStyle}>
                      Disease
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: "25%" }} align="center">
                    <Typography className={classes.titleStyle}>
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography className={classes.titleStyle}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donationRequests &&
                  donationRequests.map((request, index) => (
                    <TableRow key={request.id} hover>
                      <DonationRequestRow
                        serialNo={index + 1}
                        name={
                          request.requestor.firstName +
                          " " +
                          request.requestor.lastName
                        }
                        phone={request.phoneNo}
                        amount={request.amount}
                        description={request.description}
                        disease={request.disease}
                      />
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    "& thead th": {
      background: theme.palette.custom.BLACK,
    },

    "& tbody tr:hover": {
      background: theme.palette.custom.TABLE_HOVER_COLOR,
    },
  },
  titleStyle: {
    color: "white",
    fontSize: "90%",
    fontWeight: 500,
  },
}));
export default RequestForDonation;
