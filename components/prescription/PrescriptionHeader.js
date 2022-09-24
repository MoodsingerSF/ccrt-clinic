import React from "react";
import { Grid } from "@mui/material";
import DoctorSection from "./header/DoctorSection";
import CompanySection from "./header/CompanySection";
import DateSection from "./header/DateSection";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
const PrescriptionHeader = ({ doctor }) => {
  const classes = useStyes();
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="flex-start"
      className={classes.ccrt__prescription__header__container}
    >
      <Grid item sm={12} lg={4}>
        <DoctorSection doctor={doctor} />
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        item
        sm={12}
        lg={4}
      >
        <CompanySection />
      </Grid>
      <Grid
        container
        justifyContent={"flex-end"}
        alignItems="center"
        item
        sm={12}
        lg={4}
      >
        <DateSection />
      </Grid>
    </Grid>
  );
};

const useStyes = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__header__container: {
      borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      padding: "20px 0",
    },
  })
);

PrescriptionHeader.propTypes = {
  doctor: PropTypes.object.isRequired,
};
export default PrescriptionHeader;
