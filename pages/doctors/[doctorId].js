import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { CategoryData } from "../../data/doctors-by-category/data";
import { CATEGORY_TITLE } from "../../data/doctor/data";
import FallbackComponent from "../../components/misc/FallbackComponent";
import DoctorsCategory from "../../components/doctor/doctor-details/DoctorsCategory";
import DoctorDetailsMiddle from "../../components/doctor/doctor-details/DoctorDetailsMiddle";
import PropTypes from "prop-types";
import { retrieveUserDetails } from "../../controllers/UserController";
import { getActiveSchedule } from "../../controllers/DoctorScheduleController";
import DoctorScheduleComponent from "../../components/misc/DoctorScheduleComponent";
import LoaderComponent from "../../components/misc/LoaderComponent";
import avatar from "../../public/image/doctor/docAvatar2.png";
import ReviewSection from "../../components/review/ReviewSection";
import PatientReviews from "../../components/review/PatientReviews";
const DoctorDetails = ({ doctorId }) => {
  const router = useRouter();

  if (router.isFallback) return <FallbackComponent />;
  const classes = useStyles();

  const scheduleRef = useRef(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const getDoctorDetails = async (doctorId) => {
    try {
      setLoading(true);
      const data = await retrieveUserDetails(doctorId);
      setLoading(false);
      setDoctorDetails(data);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  const getSchedule = async (doctorId) => {
    try {
      setScheduleLoading(true);
      const schedule = await getActiveSchedule(doctorId);
      setSchedule(schedule);
      setScheduleLoading(false);
    } catch (error) {
      setScheduleLoading(false);
    }
  };

  useEffect(() => {
    getDoctorDetails(doctorId);
    getSchedule(doctorId);
  }, [doctorId]);

  return (
    <>
      {loading ? (
        <FallbackComponent />
      ) : !doctorDetails ? null : (
        <Grid container justifyContent={"center"} alignItems="center">
          <Grid container style={{ width: "95%" }}>
            <Grid
              container
              spacing={2}
              className={classes.ccrt__doctor__details__page__container}
            >
              <Grid container item md={12} lg={8}>
                <Grid container xs={12}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    style={{
                      position: "relative",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      lg={3}
                      style={{ margin: " 0 0 20px 0" }}
                    >
                      <Grid
                        container
                        className={
                          classes.ccrt__doctor__details__page__image__container
                        }
                      >
                        {doctorDetails && doctorDetails.profileImageUrl ? (
                          <Image
                            loader={({ src }) => src}
                            src={doctorDetails.profileImageUrl}
                            alt={doctorDetails.fullName}
                            layout="fill"
                            objectFit="contain"
                          />
                        ) : (
                          <Image
                            src={avatar}
                            alt={doctorDetails.fullName ?? "avatar"}
                            layout="fill"
                            objectFit="contain"
                          />
                        )}
                      </Grid>
                      <Grid container style={{ marginTop: "20px" }}>
                        <Button
                          fullWidth
                          size="small"
                          variant="outlined"
                          onClick={() =>
                            window.scrollTo(0, scheduleRef.current.offsetTop)
                          }
                        >
                          get an appointment
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={8} lg={9}>
                      <DoctorDetailsMiddle
                        name={doctorDetails.fullName}
                        specializations={doctorDetails.specializations}
                        awards={doctorDetails.awards}
                        education={doctorDetails.education}
                        experiences={doctorDetails.experiences}
                        trainings={doctorDetails.trainings}
                        about={doctorDetails.about}
                      />
                      <PatientReviews />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                md={12}
                lg={4}
                className={
                  classes.ccrt__doctor__details__page__right__container
                }
              >
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems="center"
                  className={
                    classes.ccrt__doctor__details__page__right__container__wrapper
                  }
                >
                  <Typography
                    className={
                      classes.ccrt__doctor__details__page__right__container__title
                    }
                  >
                    {CATEGORY_TITLE}
                  </Typography>
                  <Grid container justifyContent={"center"} alignItems="center">
                    {CategoryData.map((item) => (
                      <DoctorsCategory key={item.id} title={item.title} />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{ marginBottom: 20 }}
              ref={scheduleRef}
            >
              <Grid container item xs={12}>
                {scheduleLoading ? (
                  <Grid container style={{ height: "25vh" }}>
                    <LoaderComponent />
                  </Grid>
                ) : schedule ? (
                  <Grid container justifyContent={"center"}>
                    <Grid
                      container
                      flexDirection="column"
                      justifyContent={"center"}
                      alignItems="center"
                    >
                      <Typography className={classes.title}>
                        Doctor Weekly Schedule
                      </Typography>
                      <Typography style={{ fontSize: "80%" }}>
                        (Please click on a time slot to book an appointment.)
                      </Typography>
                    </Grid>
                    <DoctorScheduleComponent
                      schedule={schedule}
                      // onClick={handleClickSchedule}
                      clickable={true}
                    />
                  </Grid>
                ) : null}
              </Grid>
              <Grid container item xs={12}>
                <ReviewSection />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export async function getStaticProps({ params }) {
  return {
    props: {
      doctorId: params.doctorId,
      revalidate: 60,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { doctorId: "1" } }],
    fallback: true,
  };
}

DoctorDetails.propTypes = {
  doctorId: PropTypes.string,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doctor__details__page__container: {
      // width: "95vw",
      marginTop: "12vh",
    },
    ccrt__doctor__details__page__image__container: {
      position: "relative",
      minHeight: "25vh",
    },

    ccrt__doctor__details__page__right__container__wrapper: {
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      padding: "20px 0px",
      margin: "0px 0",
    },
    ccrt__doctor__details__page__right__container__title: {
      textTransform: "uppercase",
      marginBottom: "10px",
      fontWeight: "500",
      color: theme.palette.custom.DEFAULT_COLOR_3,
      borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      width: "100%",
      textAlign: "center",
      padding: "0 0 15px 0",
      fontSize: "120%",
    },
    title: {
      fontWeight: "bold",
      color: theme.palette.custom.DEFAULT_COLOR_3,
    },
  })
);

export default DoctorDetails;
