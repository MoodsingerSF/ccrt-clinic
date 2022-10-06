import { Avatar, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../button/CustomButton";
import PropTypes from "prop-types";
import { useTheme } from "@mui/styles";
import { sendPasswordResetCode } from "../../controllers/UserController";
const AccountFound = ({
  userId,
  email,
  name,
  imageUrl,
  notYouHandler,
  openSnackbar,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const handleSuccess = async () => {
    try {
      setLoading(true);
      await sendPasswordResetCode(userId);
      setLoading(false);
      onSuccess();
      openSnackbar(
        "An email has been sent to your email address with a password reset token."
      );
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.code + ": " + data.message);
      }
    }
  };
  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Grid container item xs={12}>
        <Grid container justifyContent={"flex-start"} alignItems="center">
          <Grid
            container
            direction={"column"}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              src={imageUrl}
              style={{
                height: "20vh",
                width: "20vh",
                border: `1px solid ${theme.palette.custom.BLACK}`,
              }}
              alt="profile image"
            />
            <Typography
              style={{
                fontSize: "90%",
                fontWeight: "bold",
                color: theme.palette.custom.BLACK,
                textTransform: "capitalize",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              {name}
            </Typography>
          </Grid>
          <Grid
            container
            direction={"column"}
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              style={{
                fontSize: "80%",
                fontWeight: 500,
                color: theme.palette.custom.BLACK,
              }}
            >
              An account has been found with the email address
            </Typography>
            <Typography
              style={{
                fontSize: "90%",
                fontWeight: "bold",
                color: theme.palette.custom.BLACK,
              }}
            >
              {email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 30 }}
        spacing={1}
      >
        <Grid container item xs={6} sm={6} md={6}>
          <CustomButton title="Not You?" onClick={notYouHandler} />
        </Grid>
        <Grid container item xs={6} sm={6} md={6}>
          <CustomButton
            title="continue"
            onClick={handleSuccess}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

AccountFound.propTypes = {
  email: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  notYouHandler: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export default AccountFound;
