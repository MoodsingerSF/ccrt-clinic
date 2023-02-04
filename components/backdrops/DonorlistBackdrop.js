import React, { useState } from "react";
import {
  Backdrop,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import LoaderComponent from "../misc/LoaderComponent";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import useAllDonars from "../../hooks/useAllDonors";
import Donor from "../dashboard/Donor";
import CustomButton from "../button/CustomButton";
import DashboardTitle from "../dashboard/DashboardTitle";
// fixed

const DonorListBackdrop = ({ open, onNegativeFeedback, requestId }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(0);

  const { data, loading, hasMore } = useAllDonars(page, 4, requestId);

  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#fff",
      }}
      open={open}
    >
      <Grid
        container
        alignItems="flex-start"
        justifyContent={"center"}
        style={{ height: "100vh", overflow: "auto" }}
      >
        <Tooltip title="close" arrow>
          <IconButton
            className={classes.ccrt__show__image__backdrop__close__button}
            onClick={onNegativeFeedback}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <Grid container style={{ width: "95%", marginTop: "12vh" }}>
          <DashboardTitle title="Donor List" />

          <Grid container>
            {loading ? (
              <LoaderComponent />
            ) : data.length !== 0 ? (
              <Grid
                container
                justifyContent={"center"}
                alignItems="center"
                // style={{ background: "blue" }}
              >
                <Grid
                  container
                  item
                  style={{ marginTop: "20px", width: "100%" }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <Typography className={classes.textStyle}>
                              Donor name
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography className={classes.textStyle}>
                              Date
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography className={classes.textStyle}>
                              Amount
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item, index) => (
                          <TableRow key={item.donationId}>
                            <Donor
                              serialNo={index + 1}
                              DonorFullName={
                                item.donor.firstName + " " + item.donor.lastName
                              }
                              profileImageUrl={"/" + item.donor.profileImageUrl}
                              amount={item.amount}
                              creationTime={item.creationTime}
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
              </Grid>
            ) : (
              <NoContentToShowComponent title="No donations to show." />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Backdrop>
  );
};
DonorListBackdrop.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  requestId: PropTypes.string.isRequired,
};
const useStyles = makeStyles(() => ({
  ccrt__show__image__backdrop__close__button: {
    position: "fixed",
    top: "1%",
    right: "1%",
    color: "#000",
  },
  textStyle: {
    color: "white",
    fontSize: "85%",
    fontWeight: "500",
  },
}));
export default DonorListBackdrop;
