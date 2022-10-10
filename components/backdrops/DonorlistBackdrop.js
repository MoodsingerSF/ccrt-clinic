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
} from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import LoaderComponent from "../misc/LoaderComponent";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import useAllDonars from "../../hooks/useAllDonors";
import Donor from "../dashboard/Donor";
import CustomButton from "../button/CustomButton";

const DonorlistBackdrop = ({ open, onNegativeFeedback, requestId }) => {
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
      <Tooltip title="close" arrow>
        <IconButton
          className={classes.ccrt__show__image__backdrop__close__button}
          onClick={onNegativeFeedback}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
      {loading ? (
        <LoaderComponent />
      ) : data.length !== 0 ? (
        <Grid container justifyContent={"center"} alignItems="center">
          <Grid container item xs={10} style={{ marginTop: "20px" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "10%", color: "#ffffff" }}>
                      No
                    </TableCell>
                    <TableCell style={{ width: "30%", color: "#ffffff" }}>
                      Donor name
                    </TableCell>
                    <TableCell
                      style={{ width: "30%", color: "#ffffff" }}
                      align="center"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      style={{ width: "30%", color: "#ffffff" }}
                      align="center"
                    >
                      Amount
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
                        profileImageUrl={item.donor.profileImageUrl}
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
        <NoContentToShowComponent title="No data to show." />
      )}
    </Backdrop>
  );
};
DonorlistBackdrop.propTypes = {
  open: PropTypes.bool.isRequired,
};
const useStyles = makeStyles(() => ({
  ccrt__show__image__backdrop__close__button: {
    position: "fixed",
    top: "1%",
    right: "1%",
    color: "#000",
  },
}));
export default DonorlistBackdrop;
