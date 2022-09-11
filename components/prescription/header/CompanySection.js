import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import theme from "../../../themes/theme";
import logo from "../../../public/image/logo/logo.png";

const CompanySection = () => {
  return (
    <>
      <Grid container style={{ position: "relative", height: "10vh" }}>
        <Image src={logo} alt="logo" layout="fill" objectFit="contain" />
      </Grid>
      <Grid>
        <Typography
          variant="h6"
          style={{
            textTransform: "uppercase",
            color: `${theme.palette.custom.HEADING}`,
          }}
        >
          cancer care and research trust
        </Typography>
      </Grid>
    </>
  );
};

export default CompanySection;
