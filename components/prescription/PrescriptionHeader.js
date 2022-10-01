import React from "react";
import { Grid } from "@mui/material";
import DoctorSection from "./header/DoctorSection";
import CompanySection from "./header/CompanySection";
import DateSection from "./header/DateSection";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
const PrescriptionHeader = ({ doctor, date }) => {
  const classes = useStyes();
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
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
        <DateSection date={date} />
      </Grid>
    </Grid>
  );
};

const useStyes = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__header__container: {
      borderBottom: `1.5px solid ${theme.palette.custom.GREEN}`,
      background: theme.palette.custom.BLACK,
      padding: 20,
    },
  })
);

PrescriptionHeader.propTypes = {
  doctor: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};
export default PrescriptionHeader;
