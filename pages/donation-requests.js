import React, { useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
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
import DonateModal from "../components/modal/DonateModal";

const RequestDonationList = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matcheSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matcheMd = useMediaQuery(theme.breakpoints.up("md"));
  const [openDonateModal, setOpenDonateModal] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const openSnackbar = (message) => handleSnackbarOpen(message, setSnackbar);

  const {
    data: donationRequests,
    loading,
    hasMore,
  } = useDonationRequests(page, 8, "ACCEPTED", "INCOMPLETE");

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
        style={{
          position: "relative",
          height: !matcheSm ? "200px" : matcheMd ? "350px" : "280px",
          background: "#EFF5F5",
        }}
      >
        {!matcheSm ? null : <Image src={bgImg} alt="bg" layout="fill" />}
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ position: "absolute" }}
        >
          <Typography
            className={
              !matcheSm
                ? classes.ccrt__donation__container__header__text_mobile
                : classes.ccrt__donation__container__header__text
            }
          >
            {`We can't do this without your support`}
          </Typography>
          <Grid container justifyContent={"center"} alignItems="center" my={1}>
            <ActionButton
              type="success"
              title="Donate to CCRT"
              onClick={() => {
                setOpenDonateModal(true);
              }}
            />
          </Grid>
          <Grid container justifyContent={"center"} alignItems="center">
            <Grid container item xs={11} md={6}>
              <Typography
                className={
                  !matcheSm
                    ? classes.ccrt__donation__request__row__button_mobile
                    : classes.ccrt__donation__request__row__button
                }
              >
                {`This donation will go to CCRT's account. CCRT will spend this to sponsor an appointment/ sponsor treatment of a patient.`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {loading && page === 0 ? (
        <LoaderComponent />
      ) : donationRequests.length === 0 ? (
        <Grid container mb={2}>
          <NoContentToShowComponent title="No requests to show." />
        </Grid>
      ) : (
        <Grid
          container
          item
          style={{ width: "95%" }}
          justifyContent={"flex-start"}
          alignItems="center"
          spacing={2}
          my={2}
        >
          {donationRequests.map((request) => (
            <Grid
              container
              justifyContent={"flex-start"}
              item
              xs={12}
              sm={5}
              md={3}
              lg={2}
              key={request.id}
            >
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
              <Grid item sm={2}>
                <CustomButton
                  title="Load More"
                  onClick={() => setPage((prev) => prev + 1)}
                  color={theme.palette.custom.BLACK}
                  loading={loading}
                  size={"small"}
                />
              </Grid>
            </Grid>
          )}
          {openDonateModal && (
            <DonateModal
              open={true}
              onNegativeFeedback={() => setOpenDonateModal(false)}
              name={null}
              amount={null}
              number={null}
              requestId={null}
              openSnackbar={openSnackbar}
            />
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
  ccrt__donation__container__header__text_mobile: {
    fontSize: "100%",
    textTransform: "capitalize",
    fontWeight: "700",
    textAlign: "center",
    color: theme.palette.custom.BLACK,
    // marginBottom: 10,
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
  ccrt__donation__request__row__button_mobile: {
    fontSize: "80%",
    borderRadius: "5px",
    textAlign: "center",
    textTransform: "capitalize",
    cursor: "pointer",
    color: theme.palette.custom.BLACK,
    padding: "0 10px",
  },
  ccrt__donation__request__row__button: {
    fontSize: "90%",
    borderRadius: "5px",
    textAlign: "center",
    textTransform: "capitalize",
    cursor: "pointer",
    // color: theme.palette.custom.BLACK,
    color: "#000",
    padding: "0 10px",
  },
}));
export default RequestDonationList;
