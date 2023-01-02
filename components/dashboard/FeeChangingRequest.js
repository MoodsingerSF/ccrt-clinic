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
  APPOINTMENT_STATUS,
  DASHBOARD_TITLE_MARGIN_TOP,
  SNACKBAR_INITIAL_STATE,
  VERIFICATION_STATUS,
} from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";

import FeeChangingRequestRow from "./FeeChangingRequestRow";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
// import LoaderBackdrop from "../backdrops/LoaderBackdrop";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import DashboardFilterComponent from "../misc/DashboardFilterComponent";
import useFeeChangingRequests from "../../hooks/useFeeChangingRequests";
import CustomButton from "../button/CustomButton";
import LoaderComponent from "../misc/LoaderComponent";

const FeeChangingRequest = () => {
  const classes = useStyle();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState(APPOINTMENT_STATUS.PENDING);
  const { feeChangingRequests, loading, hasMore } = useFeeChangingRequests(
    page,
    15,
    filterValue
  );
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };

  return (
    <Grid container>
      <Grid container style={{ marginTop: DASHBOARD_TITLE_MARGIN_TOP }}>
        <DashboardTitle title="Manage Fee changing Requests">
          <DashboardFilterComponent
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
              setPage(0);
            }}
            options={VERIFICATION_STATUS}
          />
        </DashboardTitle>
      </Grid>
      {/* <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: 10 }}
      >
        <Grid container justifyContent={"flex-end"}></Grid>
      </Grid> */}
      {!loading && feeChangingRequests.length === 0 ? (
        <NoContentToShowComponent title="No requests to show." />
      ) : (
        <Grid container style={{ marginBottom: 40 }}>
          {!loading ? (
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography className={classes.titleStyle}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.titleStyle}>
                        Previous Amount (TK)
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.titleStyle}>
                        Requested Amount (TK)
                      </Typography>
                    </TableCell>
                    <TableCell align={"center"}>
                      <Typography className={classes.titleStyle}>
                        Status
                      </Typography>
                    </TableCell>
                    {filterValue === "PENDING" && (
                      <TableCell align="center">
                        <Typography className={classes.titleStyle}>
                          Actions
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feeChangingRequests &&
                    feeChangingRequests.map((request, index) => (
                      <TableRow key={request.requestId}>
                        <FeeChangingRequestRow
                          serialNo={index + 1}
                          firstName={request.user.firstName}
                          lastName={request.user.lastName}
                          changingAmount={request.amount}
                          previousAmount={request.previousAmount}
                          status={request.status}
                          requestId={request.requestId}
                          openSnackbar={openSnackbar}
                          filterValue={filterValue}
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
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
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
export default FeeChangingRequest;
