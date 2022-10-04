import React, { useState } from "react";
import {
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import DashboardTitle from "./DashboardTitle";
import { DASHBOARD_TITLE_MARGIN_TOP } from "../../misc/constants";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import LoaderBackdrop from "../backdrops/LoaderBackdrop";
import { makeStyles } from "@mui/styles";
import DonationRequestRow from "./DonationRequestRow";

const data = [
  {
    id: 1,
    name: "Azizul Islam Rajib",
    phone: "01888397458",
    amount: "10,000",
    status: "pending",
  },
  {
    id: 2,
    name: "Rakibul Islam Rafi",
    phone: "01888397458",
    amount: "10,000",
    status: "pending",
  },
];

const RequestForDonation = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("pending");
  const [allRequest, setAllRequest] = useState(data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid
        container
        style={{ marginBottom: 10, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
        justifyContent="center"
        alignItems="center"
      >
        <DashboardTitle title="Request For Donation" />
        <Grid container justifyContent={"flex-end"}>
          <TextField
            style={{ width: "200px" }}
            size="small"
            id="outlined-select-currency"
            select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>
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
                  <TableCell style={{ width: "20%" }}>Phone Number</TableCell>
                  <TableCell style={{ width: "20%" }}>Request Amonut</TableCell>
                  <TableCell style={{ width: "20%" }}>Status</TableCell>
                  <TableCell style={{ width: "20%" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRequest
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request) => (
                    <TableRow key={request.id} hover>
                      <DonationRequestRow
                        name={request.name}
                        phone={request.phone}
                        amount={request.amount}
                        status={request.status}
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
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    "& thead th": {
      fontWeight: "500",
      color: "#FFFFFF",
      background: theme.palette.primary.main_minus_2,
    },
    "& tbody td": {
      fontSize: "85%",
    },
    "& tbody tr:hover": {
      background: theme.palette.custom.TABLE_HOVER_COLOR,
    },
  },
}));
export default RequestForDonation;
