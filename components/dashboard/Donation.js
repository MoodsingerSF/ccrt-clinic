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
import { DASHBOARD_TITLE_MARGIN_TOP } from "../../misc/constants";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import DonationRow from "./DonationRow";
import useDonations from "../../hooks/useDonations";
import CustomButton from "../button/CustomButton";
import DashboardLoaderComponent from "./DashboardLoaderComponent";

const Donation = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const { data: donations, loading, hasMore } = useDonations(page, 5);

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid
        container
        style={{ marginBottom: 10, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
        justifyContent="center"
        alignItems="center"
      >
        <DashboardTitle title="Donations" />
      </Grid>
      {loading && page === 0 ? (
        <DashboardLoaderComponent />
      ) : donations.length === 0 ? (
        <NoContentToShowComponent title="No donations to show." />
      ) : (
        <Grid container>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "30%" }}>
                    <Typography className={classes.titleStyle}>
                      Donor Name
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: "30%" }} align="center">
                    <Typography className={classes.titleStyle}>
                      Recipient Name
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: "20%" }} align="center">
                    <Typography className={classes.titleStyle}>Date</Typography>
                  </TableCell>
                  <TableCell style={{ width: "20%" }} align="center">
                    <Typography className={classes.titleStyle}>
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations.map((request, index) => (
                  <TableRow key={request.donationId} hover>
                    <DonationRow
                      serialNo={index + 1}
                      recipientName={
                        request.donationRequest.requestor.firstName +
                        " " +
                        request.donationRequest.requestor.lastName
                      }
                      donarName={
                        request.donor.firstName + " " + request.donor.lastName
                      }
                      phone={request.donationRequest.phoneNo}
                      amount={request.amount}
                      date={request.creationTime}
                      disease={request.donationRequest.disease}
                      description={request.donationRequest.description}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {hasMore && (
            <Grid
              container
              justifyContent={"center"}
              alignItems="center"
              style={{ marginTop: 20, marginBottom: 20 }}
            >
              <Grid item xs={12} sm={2}>
                <CustomButton
                  title="Load More"
                  onClick={() => setPage((prev) => prev + 1)}
                  color={theme.palette.custom.BLACK}
                  loading={loading}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    table: {
      marginTop: theme.spacing(3),

      "& thead th": {
        background: theme.palette.custom.BLACK,
      },
      "& tbody td": {
        // fontSize: "85%",
        padding: "10px",
      },
      "& tbody tr:hover": {
        background: theme.palette.custom.TABLE_HOVER_COLOR,
        cursor: "pointer",
      },
    },
    titleStyle: {
      color: "white",
      fontSize: "85%",
      fontWeight: 500,
    },
  })
);

export default Donation;
