import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useRouter } from "next/router";
import React from "react";
import {
  DONATION_SECTION_HEIGHT,
  DONATION_SECTION_HEIGHT_MOBILE,
} from "../../misc/constants";
import DonationLink from "./DonationLink";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import RequestPageIcon from "@mui/icons-material/RequestPage";
const DonationSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid
      container
      item
      xs={12}
      justifyContent={"center"}
      alignItems="center"
      style={{
        height: isDesktop
          ? DONATION_SECTION_HEIGHT
          : DONATION_SECTION_HEIGHT_MOBILE,
        background: theme.palette.custom.BLACK,
      }}
    >
      <Grid
        container
        style={{ width: "95%" }}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          md={6}
          container
          justifyContent={isDesktop ? "flex-start" : "center"}
          alignItems="center"
        >
          <Typography
            style={{
              color: "#fff",
              fontWeight: "300",
              fontSize: "75%",
              textTransform: "uppercase",
              wordSpacing: 1.5,
            }}
          >
            Be the part of a noble cause
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
          justifyContent={isDesktop ? "flex-end" : "space-between"}
          alignItems="center"
        >
          <Grid item style={{ marginRight: isDesktop ? 60 : 0 }}>
            <DonationLink
              icon={<VolunteerActivismIcon style={{ color: "#fff" }} />}
              title={"Donate"}
              onClick={() => router.push("/donation-requests")}
            />
          </Grid>
          <Grid item>
            <DonationLink
              icon={<RequestPageIcon style={{ color: "#fff" }} />}
              title={"Request for Financial Aid"}
              onClick={() => router.push("/donation")}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DonationSection;
