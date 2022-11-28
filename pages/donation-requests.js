import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { BOX_SHADOW } from "../misc/colors";
import Image from "next/image";
import bgImg from "../public/image/home-page/donate/bg.png";
import DonationRequestCard from "../components/cards/DonationRequestCard";
import { APP_BAR_HEIGHT, SNACKBAR_INITIAL_STATE } from "../misc/constants";
import useDonationRequests from "../hooks/useDonationRequests";
import { handleSnackbarClose, handleSnackbarOpen } from "../misc/functions";
import CustomSnackbar from "../components/snackbar/CustomSnackbar";
import LoaderComponent from "../components/misc/LoaderComponent";
import NoContentToShowComponent from "../components/misc/NoContentToShowComponent";
import CustomButton from "../components/button/CustomButton";
import ActionButton from "../components/button/ActionButton";

const RequestDonationList = () => {
  const classes = useStyles();
  const theme = useTheme();

  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const openSnackbar = (message) => handleSnackbarOpen(message, setSnackbar);

  const {
    data: donationRequests,
    loading,
    hasMore,
  } = useDonationRequests(page, 5, "ACCEPTED", "INCOMPLETE");
  console.log(donationRequests);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt_request_donation_list_container}
    >
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        className={classes.ccrt__donation__container}
      >
        <Image src={bgImg} alt="bg" layout="fill" />
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ position: "absolute" }}
        >
          <Typography
            className={classes.ccrt__donation__container__header__text}
          >
            {`We can't do this without your support`}
          </Typography>
          <Grid container justifyContent={"center"} alignItems="center">
            <ActionButton
              type="success"
              title="Donate Now"
              onClick={() => {}}
            />
            {/* <Typography
              className={classes.ccrt__donation__request__row__button}
            >
              donate today
            </Typography> */}
          </Grid>
        </Grid>
      </Grid>
      {loading && page === 0 ? (
        <LoaderComponent />
      ) : donationRequests.length === 0 ? (
        <NoContentToShowComponent title="No requests to show." />
      ) : (
        <Grid
          container
          item
          style={{ width: "95%" }}
          justifyContent={"flex-start"}
          alignItems="flex-start"
          spacing={2}
          my={2}
        >
          {donationRequests.map((request) => (
            <Grid container item xs={11} sm={5} md={3} lg={2} key={request.id}>
              <DonationRequestCard
                name={
                  request.requestor.firstName + " " + request.requestor.lastName
                }
                profileImageUrl={request.requestor.profileImageUrl}
                amount={request.amount}
                details={request.description}
                number={request.phoneNo}
                requestId={request.requestId}
                openSnackbar={openSnackbar}
              />
            </Grid>
          ))}
          {hasMore && (
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
                  loading={loading}
                />
              </Grid>
            </Grid>
          )}
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

const useStyles = makeStyles((theme) => ({
  ccrt_request_donation_list_container: {
    marginTop: APP_BAR_HEIGHT,
    marginBottom: "20px",
  },
  ccrt__donation__container__header__text: {
    fontSize: "120%",
    textTransform: "capitalize",
    fontWeight: "bold",
    textAlign: "center",
    color: theme.palette.custom.BLACK,
    marginBottom: 10,
  },
  ccrt__donation__container: {
    position: "relative",
    height: "350px",
  },
  ccrt__donation__container__wrapper: {
    background: theme.palette.custom.DEFAULT_COLOR_3,
    boxShadow: BOX_SHADOW,
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
  },
  ccrt__donation__container__header: {
    fontSize: "90%",
    color: "#fff",
    fontWeight: "300",
  },
  ccrt__donation__request__row__button: {
    fontSize: "90%",
    marginRight: "20px",
    border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_2}`,
    borderRadius: "5px",
    textAlign: "center",
    lineHeight: "1.7",
    textTransform: "capitalize",
    cursor: "pointer",
    padding: "0 10px",
    transition: "all 0.3s ease",
    "&:hover": {
      border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      background: theme.palette.custom.DEFAULT_COLOR_3,
      color: "#fff",
    },
  },
}));
export default RequestDonationList;
