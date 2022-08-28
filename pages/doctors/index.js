import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { CategoryData } from "../../data/doctors-by-category/data";
import { CATEGORY_TITLE, DoctorData } from "../../data/doctor/data";
import DoctorCard from "../../components/cards/doctor-screen/DoctorCard";
import DoctorsCategory from "../../components/doctor/DoctorsCategory";

const DoctorsScreen = () => {
  const classes = useStyles();
  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Grid
        container
        spacing={4}
        className={classes.ccrt__dctr__page__container}
      >
        <Grid item sm={4} className={classes.ccrt__dctr__page__left__menu}>
          <Grid container>
            <Typography
              variant="h5"
              className={classes.ccrt__dctr__page__left__menu__title}
            >
              {CATEGORY_TITLE}
            </Typography>
          </Grid>
          {CategoryData.map((item) => (
            <DoctorsCategory key={item.id} title={item.title} />
          ))}
        </Grid>
        <Grid
          container
          item
          sm={8}
          className={classes.ccrt__dctr__page__right__content}
        >
          {DoctorData.map((item) => (
            <DoctorCard
              key={item.id}
              doctorId={item.id}
              image={item.image}
              name={item.name}
              specialty={item.specialty}
              degree={item.degree}
              department={item.department}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dctr__page__container: {
      width: "90vw",
      marginTop: "12vh",
    },
    ccrt__dctr__page__left__menu: {},
    ccrt__dctr__page__left__menu__title: {
      textTransform: "uppercase",
      borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      width: "100%",
      margin: "0 0 10px 0",
      fontWeight: "500",
      color: theme.palette.custom.DEFAULT_COLOR_3,
    },
    ccrt__dctr__page__right__content: {
      borderLeft: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
    },
  })
);
export default DoctorsScreen;
