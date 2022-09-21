import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import DoctorCard from "../../cards/doctor-home/DoctorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Heading from "../section-heading/Heading";
import { retrieveAcceptedDoctors } from "../../../controllers/UserController";
import LoaderComponent from "../../misc/LoaderComponent";

const Doctor = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const retrieveDoctors = async () => {
    try {
      setLoading(true);
      const data = await retrieveAcceptedDoctors();
      setDoctors(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieveDoctors();
  }, []);

  return (
    <>
      {loading ? (
        <Grid container style={{ height: "25vh" }}>
          <LoaderComponent />
        </Grid>
      ) : doctors.length === 0 ? null : (
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
              spaceBetween={10}
              slidesPerGroup={1}
              loop={false}
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
                  spaceBetween: 30,
                },
              }}
            >
              {doctors.map((doctor) => (
                <SwiperSlide
                  key={doctor.userId}
                  className={classes.ccrt__doctor__card__swiper_slide}
                >
                  <DoctorCard
                    doctorId={doctor.userId}
                    image={doctor.profileImageUrl}
                    name={doctor.fullName}
                    specializations={doctor.specializations}
                    patient_count={doctor.patient_count}
                    fee={doctor.fee}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__doctor__card__mySwiper: {
      padding: "0 5px",
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
