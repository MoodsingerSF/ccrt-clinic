import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { DoctorData } from "../../../data/doctor/data";
import DoctorCard from "./DoctorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Heading from "../section-heading/Heading";

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
        margin: matches ? "50px 0 0 0" : "20px 0 0 0",
      }}
    >
      <Heading title="Our Popular Doctors" />
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
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {DoctorData.map((doctor) => (
            <SwiperSlide
              key={doctor.id}
              className={classes.ccrt__doctor__card__swiper_slide}
            >
              <DoctorCard
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
      margin: "30px 0 0 0",
      transition: "transform 0.12s ease",
      "&:hover": {
        transform: "scale(1.1)",
        cursor: "pointer",
      },
    },
  })
);
export default Doctor;
