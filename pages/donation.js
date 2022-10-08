import React, { useState } from "react";
import { Grid, TextareaAutosize, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import donation from "../public/image/donation/Donation.png";
import CustomButton from "../components/button/CustomButton";
import { grey } from "@mui/material/colors";
import { validateEmpty } from "../controllers/DonationController";
import SignUpTextField from "../components/textfields/SignUpTextField";

const Donation = () => {
  const classes = useStyles();

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmitRequest = () => {
    if (validate(number, amount, description)) {
      setLoading(true);
      // Api call
      setLoading(false);
    } else {
      setShowError(true);
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
        justifyContent={"center"}
        alignItems="center"
        className={classes.ccrt_donation_header_section}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ position: "relative" }}
        >
          <Image
            src={donation}
            alt={"donation"}
            height={50}
            width={50}
            style={{ color: "red" }}
          />
        </Grid>
        <Grid container justifyContent={"center"} alignItems="center">
          <Typography className={classes.ccrt__donation__header}>
            Request For Donation
          </Typography>
        </Grid>
      </Grid>

      <Grid container item xs={11} md={8} lg={6}>
        <SignUpTextField
          type={"text"}
          labelText={"phone number"}
          value={number}
          onChange={handleChangeNumber}
          adornment={"+880"}
          variant="outlined"
          error={showError && validateEmpty(number)}
          errorText={"Enter valid number"}
        />
        <SignUpTextField
          type={"text"}
          labelText={"how much do you want?"}
          value={amount}
          onChange={handleChangeAmount}
          adornment={"৳"}
          variant="outlined"
          error={showError && validateEmpty(amount)}
          errorText={"Enter valid amount"}
        />
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems="center"
          className={classes.ccrt_textField_container}
        >
          <Typography className={classes.ccrt_textField_label}>
            description
          </Typography>
          <Grid container>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={8}
              placeholder="about yourself"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={classes.ccrt_textArea}
            />
            {showError && validateEmpty(description) && (
              <Typography style={{ color: "red", fontSize: "70%" }}>
                {"Required"}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"} alignItems="center">
          <CustomButton
            title={"requesr"}
            onClick={handleSubmitRequest}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__donation__container: {
    marginTop: "13vh",
  },
  ccrt_donation_header_section: {
    margin: "20px 0",
  },
  ccrt__donation__header: {
    fontSize: "120%",
    fontWeight: "500",
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
  },
}));
export default Donation;
