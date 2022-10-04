import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import donation from "../public/image/donation/Donation.png";
import SignUpTextField from "../components/textfields/SignUpTextField";
import CustomButton from "../components/button/CustomButton";

const Donation = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleSubmitRequest = () => {
    setLoading(true);
    // Api call
    setLoading(false);
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
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems="center"
          className={classes.ccrt_textField_container}
        >
          <Typography className={classes.ccrt_textField_label}>
            Fullname
          </Typography>
          <Grid container justifyContent={"center"} alignItems="center">
            <SignUpTextField
              type="text"
              variant="outlined"
              //   value={code}
              //   onChange={handleChangeCode}
              //   error={showError && !validatePassword(code)}
              //   errorText={formErrors.password}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems="center"
          className={classes.ccrt_textField_container}
        >
          <Typography className={classes.ccrt_textField_label}>
            phone number
          </Typography>
          <Grid container justifyContent={"center"} alignItems="center">
            <SignUpTextField
              type="text"
              variant="outlined"
              //   value={code}
              //   onChange={handleChangeCode}
              //   error={showError && !validatePassword(code)}
              //   errorText={formErrors.password}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems="center"
          className={classes.ccrt_textField_container}
        >
          <Typography className={classes.ccrt_textField_label}>
            how much do you want?
          </Typography>
          <Grid container justifyContent={"center"} alignItems="center">
            <SignUpTextField
              type="text"
              variant="outlined"
              //   value={code}
              //   onChange={handleChangeCode}
              //   error={showError && !validatePassword(code)}
              //   errorText={formErrors.password}
            />
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
}));
export default Donation;
