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
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import {
  DASHBOARD_TITLE_MARGIN_TOP,
  DONATION_REQUEST_STATUS,
  SNACKBAR_INITIAL_STATE,
} from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import CustomButton from "../button/CustomButton";
import DashboardLoaderComponent from "../dashboard/DashboardLoaderComponent";
import DashboardTitle from "../dashboard/DashboardTitle";
import DonationRequestRow from "../dashboard/DonationRequestRow";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import DashboardFilterComponent from "./DashboardFilterComponent";
import NoContentToShowComponent from "./NoContentToShowComponent";
import PropTypes from "prop-types";
const DonationRequestsComp = ({
  title,
  filterValue,
  onChangeFilterValue,
  loading,
  page,
  donationRequests,
  hasMore,
  onLoadMore,
  showActions = false,
  showViewActions = false,
}) => {
  const classes = useStyles();

  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid
        container
        style={{ marginBottom: 10, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
        justifyContent="center"
        alignItems="center"
      >
        <DashboardTitle title={title}>
          {showActions && (
            <DashboardFilterComponent
              value={filterValue}
              onChange={onChangeFilterValue}
              options={DONATION_REQUEST_STATUS}
            />
          )}
        </DashboardTitle>
      </Grid>
      {loading && page == 0 ? (
        <DashboardLoaderComponent />
      ) : donationRequests.length === 0 ? (
        <NoContentToShowComponent title="No requests to show." />
      ) : (
        <Grid container justifyContent={"center"} alignItems="center">
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
                  {!showActions && (
                    <TableCell align="center">
                      <Typography className={classes.titleStyle}>
                        Status
                      </Typography>
                    </TableCell>
                  )}
                  {showViewActions && (
                    <TableCell align="center">
                      <Typography className={classes.titleStyle}>
                        Actions
                      </Typography>
                    </TableCell>
                  )}
                  {showActions && filterValue.requestStatus === "ACCEPTED" && (
                    <TableCell align="center">
                      <Typography className={classes.titleStyle}>
                        Actions
                      </Typography>
                    </TableCell>
                  )}
                  {showActions && filterValue.requestStatus === "PENDING" && (
                    <TableCell align="center">
                      <Typography className={classes.titleStyle}>
                        Actions
                      </Typography>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {donationRequests &&
                  donationRequests.map((request, index) => (
                    <TableRow key={request.id} hover>
                      <DonationRequestRow
                        serialNo={index + 1}
                        requestId={request.requestId}
                        name={
                          request.requestor.firstName +
                          " " +
                          request.requestor.lastName
                        }
                        phone={request.phoneNo}
                        amount={request.amount}
                        description={request.description}
                        disease={request.disease}
                        openSnackbar={openSnackbar}
                        showActions={showActions}
                        status={request.status}
                        showViewActions={showViewActions}
                        filterValue={filterValue}
                      />
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid item xs={12} sm={4} style={{ margin: "15px 0px" }}>
            {hasMore && (
              <CustomButton
                title="Load More"
                onClick={onLoadMore}
                loading={loading}
              />
            )}
          </Grid>
        </Grid>
      )}

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => handleSnackbarClose(setSnackbar)}
      />
    </Grid>
  );
};

DonationRequestsComp.propTypes = {
  title: PropTypes.string.isRequired,
  filterValue: PropTypes.any.isRequired,
  onChangeFilterValue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  donationRequests: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  showActions: PropTypes.bool,
  showViewActions: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired,
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

export default DonationRequestsComp;
