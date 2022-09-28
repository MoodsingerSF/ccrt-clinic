import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import DoctorsCategory from "../../doctor/DoctorsCategory";
import { CategoryData } from "../../../data/doctors-by-category/data";
import { CATEGORY_TITLE } from "../../../data/doctor/data";
import PropTypes from "prop-types";
const DoctorsCategoryDesktop = ({ filter }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      item
      xs={12}
      md={3}
      className={classes.ccrt__dctr__page__left__menu}
    >
      <Grid item xs={12}>
        <Typography
          variant="h5"
          className={classes.ccrt__dctr__page__left__menu__title}
        >
          {CATEGORY_TITLE}
        </Typography>
        <Grid
          container
          style={{
            padding: "0px 15px",
          }}
        >
          {CategoryData.map((item) => (
            <DoctorsCategory
              key={item.id}
              id={item.id}
              title={item.title}
              filter={filter}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

DoctorsCategoryDesktop.propTypes = {
  filter: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dctr__page__left__menu: {
      position: "fixed",
      height: "88vh",
      // marginBottom: 30,
      overflowY: "scroll",
    },
    ccrt__dctr__page__left__menu__title: {
      textTransform: "uppercase",
      width: "100%",
      fontWeight: "500",
      color: theme.palette.custom.DEFAULT_COLOR_3,
      borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      textAlign: "center",
      margin: "20px 0",
    },
  })
);
export default DoctorsCategoryDesktop;
