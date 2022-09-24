import React from "react";
import { Grid, Typography } from "@mui/material";
// import theme from "../../../themes/theme";
import PropTypes from "prop-types";
const DoctorSection = ({ doctor }) => {
  return (
    <>
      {/* <Typography
        variant="h6"
        gutterBottom
        style={{
          textTransform: "uppercase",
          color: `${theme.palette.custom.DEFAULT_COLOR}`,
        }}
      >
        {`Doctor's section`}
      </Typography> */}
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="flex-start"
      >
        <Typography
          style={{
            textTransform: "capitalize",
            fontSize: "100%",
            fontWeight: 500,
          }}
        >
          {doctor.firstName + " " + doctor.lastName}
        </Typography>
        {/* <Typography style={{ fontSize: "90%", fontWeight: "500" }}>
          Doctor department
        </Typography> */}
      </Grid>
    </>
  );
};

DoctorSection.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default DoctorSection;
