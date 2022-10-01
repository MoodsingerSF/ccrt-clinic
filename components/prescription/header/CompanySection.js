import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
// import theme from "../../../themes/theme";
import logo from "../../../public/image/logo/logo.png";

const CompanySection = () => {
  return (
    <>
      <Grid container style={{ position: "relative", height: "10vh" }}>
        <Image src={logo} alt="logo" layout="fill" objectFit="contain" />
      </Grid>
      <Grid>
        <Typography
          style={{
            textTransform: "capitalize",
            color: `${"white"}`,
            fontSize: "80%",
            fontWeight: 600,
            marginTop: 20,
          }}
        >
          cancer care and research trust
        </Typography>
      </Grid>
    </>
  );
};

export default CompanySection;
