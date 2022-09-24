import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DashboardTitle from "./DashboardTitle";
import {
  DASHBOARD_TITLE_MARGIN_TOP,
  SNACKBAR_INITIAL_STATE,
} from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import {
  retrieveAcceptFeeChangingRequests,
  retrievePendingFeeChangingRequests,
  retrieveRejectFeeChangingRequests,
} from "../../controllers/UserController";
import FeeChangingRequestRow from "./FeeChangingRequestRow";
import { createStyles, makeStyles } from "@mui/styles";
import LoaderBackdrop from "../backdrops/LoaderBackdrop";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import DashboardFilterComponent from "../misc/DashboardFilterComponent";

const FeeChangingRequest = () => {
  const classes = useStyle();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("pending");
  const [allRequest, setAllRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };

  const AllFeeChangingRequests = async () => {
    try {
      setLoading(true);
      const retrievedAllFee =
        (filterValue === "pending" &&
          (await retrievePendingFeeChangingRequests())) ||
        (filterValue === "finished" &&
          (await retrieveAcceptFeeChangingRequests())) ||
        (filterValue === "cancelled" &&
          (await retrieveRejectFeeChangingRequests()));
      setLoading(false);
      setAllRequest(retrievedAllFee);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    AllFeeChangingRequests();
  }, [filterValue]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: 10, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
      >
        <DashboardTitle title="Manage Fee changing Request" />
        <Grid container justifyContent={"flex-end"}>
          <DashboardFilterComponent
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </Grid>
      </Grid>
      {loading ? (
        <LoaderBackdrop open={true} />
      ) : allRequest.length === 0 ? (
        <NoContentToShowComponent title="There is no requests to show." />
      ) : (
        <Grid container>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "20%" }}>Name</TableCell>
                  <TableCell style={{ width: "20%" }} align="center">
                    Previous Amount
                  </TableCell>
                  <TableCell style={{ width: "20%" }} align="center">
                    Changing Amonut
                  </TableCell>
                  <TableCell style={{ width: "20%" }} align="center">
                    Status
                  </TableCell>
                  <TableCell style={{ width: "20%" }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRequest
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request) => (
                    <TableRow key={request.requestId} hover>
                      <FeeChangingRequestRow
                        firstName={request.user.firstName}
                        lastName={request.user.lastName}
                        changingAmount={request.amount}
                        previousAmount={request.previousAmount}
                        status={request.status}
                        requestId={request.requestId}
                        openSnackbar={openSnackbar}
                      />
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={allRequest.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
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
        background: theme.palette.primary.main_minus_2,
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
  })
);
export default FeeChangingRequest;
