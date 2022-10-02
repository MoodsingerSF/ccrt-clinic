import { Avatar, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../button/CustomButton";

const AccountFound = ({ notYouHandler, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Grid container item xs={12} style={{ position: "relative" }}>
        <Grid container justifyContent={"flex-start"} alignItems="center">
          <Typography
            style={{
              fontSize: "90%",
            }}
          >
            send verification code to{" "}
            <Typography style={{ fontSize: "120%", fontWeight: "300" }}>
              rajibislam700@gmail.com
            </Typography>
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{
            position: "absolute",
            right: "0%",
            top: "-20%",
            height: 45,
            width: 45,
          }}
        >
          <Avatar
            src={"A"}
            style={{ height: 45, width: 45 }}
            alt="profile image"
          />
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
          <CustomButton
            title="Not You?"
            onClick={notYouHandler}
            loading={false}
          />
        </Grid>
        <Grid container item xs={6} sm={6} md={6}>
          <CustomButton
            title="continue"
            onClick={onSuccess}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccountFound;
