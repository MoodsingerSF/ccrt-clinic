import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
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
          className={classes.doctor_section}
        >
          <Grid container style={{ width: "95%" }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ marginBottom: 20, marginTop: 20 }}
            >
              <Heading title="Popular Doctors" />
            </Grid>
            <Grid container>
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                slidesPerGroup={1}
                loop={false}
                loopFillGroupWithBlank={true}
                navigation={true}
                modules={[Navigation]}
                className={classes.ccrt__doctor__card__mySwiper}
                breakpoints={{
                  600: {
                    slidesPerView: 2,
                  },
                  900: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                }}
              >
                {doctors.map((doctor) => (
                  <SwiperSlide key={doctor.userId}>
                    <DoctorCard
                      doctorId={doctor.userId}
                      imageUrl={doctor.profileImageUrl}
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
    doctor_section: {
      // background: theme.palette.custom.DOCTOR_SECTION_BACKGROUND,
      // margin: "10px 0px",
    },
  })
);
export default Doctor;
