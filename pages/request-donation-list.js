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
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import RequestDonationListRow from "../components/dashboard/RequestDonationListRow";

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

const RequestDonationList = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [lists, setLists] = useState(data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt_request_donation_list_container}
    >
      <Typography
        className={classes.ccrt_request_donation_list_container_header}
      >
        Request for donation list
      </Typography>
      <Grid container>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "5%" }}>Id</TableCell>
                <TableCell style={{ width: "20%" }}>Name</TableCell>
                <TableCell style={{ width: "20%" }}>Phone Number</TableCell>
                <TableCell style={{ width: "20%" }}>Request Amonut</TableCell>
                <TableCell style={{ width: "20%" }}>Status</TableCell>
                <TableCell style={{ width: "20%" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lists
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((list, index) => (
                  <TableRow key={list.id} hover>
                    <RequestDonationListRow
                      index={index}
                      name={list.name}
                      phone={list.phone}
                      amount={list.amount}
                      status={list.status}
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={lists.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt_request_donation_list_container: {
    marginTop: "12vh",
  },
  ccrt_request_donation_list_container_header: {
    fontSize: "125%",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
}));
export default RequestDonationList;
