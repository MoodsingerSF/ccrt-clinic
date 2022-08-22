import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { DoctorData } from "../../../data/doctor/data";
import DoctorCard from "./DoctorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

const Doctor = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        padding: matches ? "0 80px" : "0 10px",
        margin: matches ? "50px 0" : "20px 0",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{
          fontSize: matches ? "200%" : "130%",
        }}
        className={classes.ccrt__doctor__card__section__title}
      >
        Our Popular Doctors
      </Typography>
      <Grid container>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          modules={[Navigation]}
          className={classes.ccrt__doctor__card__mySwiper}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {DoctorData.map((doctor) => (
            <SwiperSlide
              key={doctor.id}
              className={classes.ccrt__doctor__card__swiper_slide}
            >
              <DoctorCard
                key={doctor.id}
                image={doctor.image}
                name={doctor.name}
                specialist={doctor.specialist}
                department={doctor.department}
                patient_served={doctor.patient_served}
                patient_count={doctor.patient_count}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doctor__card__mySwiper: {
      padding: "0 20px",
      width: "100%",
      height: "100%",
    },
    ccrt__doctor__card__swiper_slide: {
      margin: "30px 0",
      transition: "transform 0.12s ease",
      "&:hover": {
        transform: "scale(1.1)",
        cursor: "pointer",
      },
    },

    ccrt__doctor__card__section__title: {
      color: theme.palette.custom.SECOND_DEFAULT_COLOR,
      fontWeight: "600",
      textTransform: "uppercase",
      marginBottom: "50px",
    },
  })
);
export default Doctor;
