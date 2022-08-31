import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import DoctorsCategory from "../../doctor/DoctorsCategory";
import { CategoryData } from "../../../data/doctors-by-category/data";
import { CATEGORY_TITLE } from "../../../data/doctor/data";

const DoctorsCategoryDesktop = ({ filter, handleFilter }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      item
      xs={12}
      md={4}
      className={classes.ccrt__dctr__page__left__menu}
    >
      <Grid
        item
        sm={3}
        style={{
          position: "fixed",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h5"
          className={classes.ccrt__dctr__page__left__menu__title}
        >
          {CATEGORY_TITLE}
        </Typography>
        {CategoryData.map((item) => (
          <DoctorsCategory
            key={item.id}
            title={item.title}
            filter={filter}
            handleFilter={handleFilter}
          />
        ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dctr__page__left__menu: {
      position: "relative",
    },
    ccrt__dctr__page__left__menu__title: {
      textTransform: "uppercase",
      width: "100%",
      margin: "0 0 10px 0",
      fontWeight: "500",
      color: theme.palette.custom.DEFAULT_COLOR_3,
      borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      textAlign: "center",
      margin: "20px 0",
    },
  })
);
export default DoctorsCategoryDesktop;
