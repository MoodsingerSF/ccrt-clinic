import React, { useState } from "react";
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
import { DASHBOARD_TITLE_MARGIN_TOP } from "../../misc/constants";
import LoaderBackdrop from "../backdrops/LoaderBackdrop";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import { makeStyles } from "@mui/styles";
import DonationRow from "./DonationRow";

const data = [
  {
    id: 1,
    donarName: "Azizul Islam Rajib",
    recipientName: "Rakibul Islam Rafi",
    phone: "01888397458",
    amount: "10,000",
    date: new Date().toDateString(),
  },
  {
    id: 2,
    donarName: "Rakibul Islam Rafi",
    recipientName: "Azizul Islam Rajib",
    phone: "01888397458",
    amount: "10,000",
    date: new Date().toDateString(),
  },
];

const Donation = () => {
  const classes = useStyles();

  const [donations, setDonations] = useState(data);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
                  <TableCell style={{ width: "20%" }}>Donar Name</TableCell>
                  <TableCell style={{ width: "20%" }}>Recipient Name</TableCell>
                  <TableCell style={{ width: "20%" }}>
                    Recipient Number
                  </TableCell>
                  <TableCell style={{ width: "20%" }}>Amonut</TableCell>
                  <TableCell style={{ width: "20%" }}>Date</TableCell>
                  <TableCell style={{ width: "20%" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request) => (
                    <TableRow key={request.id} hover>
                      <DonationRow
                        donarName={request.donarName}
                        recipientName={request.recipientName}
                        phone={request.phone}
                        amount={request.amount}
                        date={request.date}
                      />
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={donations.length}
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

export default Donation;
