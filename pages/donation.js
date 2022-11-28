import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import CustomButton from "../components/button/CustomButton";
import { grey } from "@mui/material/colors";
import { validateEmpty } from "../controllers/DonationController";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import {
  APP_BAR_HEIGHT,
  BODY_HEIGHT,
  SNACKBAR_INITIAL_STATE,
} from "../misc/constants";
import SignUpTextField from "../components/textfields/SignUpTextField";
import { createDonationRequest } from "../controllers/DonationRequestController";
import CustomSnackbar from "../components/snackbar/CustomSnackbar";
import { handleSnackbarClose, handleSnackbarOpen } from "../misc/functions";

const Donation = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  const [disease, setDisease] = useState("");
  const [description, setDescription] = useState("");
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const openSnackbar = (message) => handleSnackbarOpen(message, setSnackbar);

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmitRequest = async () => {
    try {
      setLoading(true);
      if (validate(number, amount, description)) {
        await createDonationRequest(number, disease, amount, description);
        openSnackbar("Your request for donation has been added successfully.");
      } else {
        setShowError(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.code + " " + data.message);
      }
    }
  };

  const validate = (number, amount, description) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      validateEmpty(number) &&
      validateEmpty(amount) &&
      validateEmpty(description);
    return !isEverythingAllRight;
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt__donation__container}
    >
      <Grid
        container
        item
        xs={11}
        md={6}
        lg={4}
        style={{ background: "white", padding: "10px 15px", borderRadius: 5 }}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          className={classes.ccrt_donation_header_section}
        >
          <Grid container justifyContent={"center"} alignItems="center">
            <VolunteerActivismIcon
              style={{
                color: theme.palette.custom.BLACK,
                fontSize: "250%",
                marginBottom: 10,
              }}
            />
          </Grid>
          <Grid container justifyContent={"center"} alignItems="center">
            <Typography className={classes.ccrt__donation__header}>
              Request For Donation
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <SignUpTextField
            type={"text"}
            value={number}
            onChange={handleChangeNumber}
            label="Phone Number"
            variant="outlined"
            error={showError && validateEmpty(number)}
            errorText={"Enter valid number"}
          />

          <SignUpTextField
            type={"text"}
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            label={"Disease"}
            variant="outlined"
            error={showError && validateEmpty(number)}
            errorText={"Enter valid disease."}
          />
          <SignUpTextField
            type={"text"}
            value={amount}
            label={"Required amount"}
            onChange={handleChangeAmount}
            // adornment={"৳"}
            variant="outlined"
            error={showError && validateEmpty(amount)}
            errorText={"Enter valid amount"}
          />

          <SignUpTextField
            label={"About Yourself"}
            variant="outlined"
            multiline={true}
            numRows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={showError && validateEmpty(amount)}
            errorText={"Enter valid amount"}
          />

          <Grid container justifyContent={"center"} alignItems="center">
            <CustomButton
              title={"submit"}
              onClick={handleSubmitRequest}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Grid>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => handleSnackbarClose(setSnackbar)}
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__donation__container: {
    marginTop: APP_BAR_HEIGHT,
    minHeight: BODY_HEIGHT,
    width: "100vw",
    backgroundImage:
      "linear-gradient(to right,rgba(0,0,0,.7),rgba(0,0,0,.7)),url(/image/donation.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  },
  ccrt_donation_header_section: {
    margin: "20px 0",
  },
  ccrt__donation__header: {
    fontSize: "100%",
    fontWeight: "500",
    color: theme.palette.custom.BLACK,
  },
  ccrt_textField_container: {
    marginBottom: "15px",
    width: "100%",
  },
  ccrt_textField_label: {
    marginBottom: "5px",
    fontSize: "80%",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  ccrt_textArea: {
    width: "100%",
    border: `1px solid ${grey[400]}`,
    borderRadius: "5px",
    padding: "10px",
    fontSize: "100%",
    background: "transparent",
  },
}));
export default Donation;
