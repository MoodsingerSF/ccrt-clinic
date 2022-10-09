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
import LoaderBackdrop from "../backdrops/LoaderBackdrop";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import DonationRow from "./DonationRow";
import useDonations from "../../hooks/useDonations";
import CustomButton from "../button/CustomButton";

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
      {loading ? (
        <LoaderBackdrop open={true} />
      ) : donations.length === 0 ? (
        <NoContentToShowComponent title="There is nothing to show." />
      ) : (
        <Grid container>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "25%" }}>
                    <Typography className={classes.titleStyle}>
                      Donar Name
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: "25%" }}>
                    <Typography className={classes.titleStyle}>
                      Recipient Name
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: "25%" }}>
                    <Typography className={classes.titleStyle}>Date</Typography>
                  </TableCell>
                  <TableCell style={{ width: "25%" }}>
                    <Typography className={classes.titleStyle}>
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations.map((request) => (
                  <TableRow key={request.donationId} hover>
                    <DonationRow
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
          {!loading && hasMore && (
            <Grid
              container
              justifyContent={"center"}
              alignItems="center"
              style={{ marginTop: 20 }}
            >
              <Grid item xs={12} sm={2}>
                <CustomButton
                  title="Load More"
                  onClick={() => setPage((prev) => prev + 1)}
                  color={theme.palette.custom.BLACK}
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
        fontWeight: "500",
        color: "#FFFFFF",
        background: theme.palette.custom.BLACK,
      },
      "& tbody td": {
        fontWeight: "400",
        fontSize: "85%",
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
