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
import useMyDonations from "../../hooks/useMyDonations";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import LoaderComponent from "../misc/LoaderComponent";
import CustomButton from "../button/CustomButton";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import MyDonationsRow from "./MyDonationsRow";

const MyDonations = () => {
  const classes = useStyle();
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const { data, loading, hasMore } = useMyDonations(page, 2);

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Grid
        container
        style={{ marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
        justifyContent="flex-start"
        alignItems="center"
      >
        <DashboardTitle title="My Donations" />
      </Grid>
      {!loading && data.length === 0 ? (
        <NoContentToShowComponent title="No donations to show." />
      ) : (
        <Grid container style={{ marginBottom: 40 }}>
          {!loading ? (
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "20%" }} align="left">
                      <Typography className={classes.titleStyle}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell style={{ width: "20%" }} align="center">
                      <Typography className={classes.titleStyle}>
                        Amount (TK)
                      </Typography>
                    </TableCell>
                    <TableCell style={{ width: "20%" }} align="left">
                      <Typography className={classes.titleStyle}>
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell style={{ width: "20%" }} align={"left"}>
                      <Typography className={classes.titleStyle}>
                        Disease
                      </Typography>
                    </TableCell>
                    <TableCell style={{ width: "20%" }} align={"left"}>
                      <Typography className={classes.titleStyle}>
                        Number
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.map((request, index) => (
                      <TableRow key={request.donationId} style={{ height: 60 }}>
                        <MyDonationsRow
                          serialNo={index + 1}
                          fullName={
                            request.donationRequest.requestor.firstName +
                            " " +
                            request.donationRequest.requestor.lastName
                          }
                          amount={request.amount}
                          date={request.creationTime}
                          disease={request.donationRequest.disease}
                          phoneNo={request.donationRequest.phoneNo}
                        />
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
          {loading ? <LoaderComponent /> : null}
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
const useStyle = makeStyles((theme) =>
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
export default MyDonations;
