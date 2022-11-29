import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import FallbackComponent from "../../components/misc/FallbackComponent";
import DoctorDetailsMiddle from "../../components/doctor/doctor-details/DoctorDetailsMiddle";
import PropTypes from "prop-types";
import { retrieveUserDetails } from "../../controllers/UserController";
import { getActiveSchedule } from "../../controllers/DoctorScheduleController";
import DoctorScheduleComponent from "../../components/misc/DoctorScheduleComponent";
import LoaderComponent from "../../components/misc/LoaderComponent";
import avatar from "../../public/image/doctor/docAvatar2.png";
import ActionButton from "../../components/button/ActionButton";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import ReviewSection from "../../components/review/ReviewSection";
import { retrieveAverageRating } from "../../controllers/RatingController";
import { APP_BAR_HEIGHT } from "../../misc/constants";
import { Context } from "../../contexts/user-context/UserContext";
import PopularSpecializations from "../../components/misc/PopularSpecializations";
const DoctorDetails = ({ doctorId }) => {
  const router = useRouter();

  if (router.isFallback) return <FallbackComponent />;
  const { isSignedIn } = useContext(Context);
  const classes = useStyles();
  const theme = useTheme();
  const scheduleRef = useRef(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [averageRatings, setAverageRatings] = useState([]);
  const [overAllRating, setOverAllRating] = useState(0);

  const getDoctorDetails = async (doctorId) => {
    try {
      setLoading(true);
      const data = await retrieveUserDetails(doctorId);
      setLoading(false);
      setDoctorDetails(data);
      console.log(data);
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

  const getAverageRating = async (doctorId) => {
    try {
      const response = await retrieveAverageRating(doctorId);
      setAverageRatings(response.data.ratings);
      const average =
        response.data.ratings.reduce((n, { rating }) => n + rating, 0) / 6;
      setOverAllRating(average);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorDetails(doctorId);
    getSchedule(doctorId);
    getAverageRating(doctorId);
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
                <Grid container item xs={12}>
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
                            src={"/" + doctorDetails.profileImageUrl}
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
                      <Grid container style={{ marginTop: 10 }}>
                        <ActionButton
                          type="info"
                          title="get an appointment"
                          onClick={() =>
                            window.scrollTo(0, scheduleRef.current.offsetTop)
                          }
                          icon={<BookOutlinedIcon />}
                          fullWidth={true}
                        />
                        {/* <Button
                          fullWidth
                          size="small"
                          variant="outlined"
                          
                          style={{}}
                        >
                          get an appointment
                        </Button> */}
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
                        averageRatings={averageRatings}
                        overAllRating={overAllRating}
                      />
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
                <PopularSpecializations />
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
                      <Typography
                        style={{
                          fontSize: "80%",
                          color: theme.palette.custom.GREY,
                        }}
                      >
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
              {isSignedIn() && (
                <Grid container item xs={12}>
                  <ReviewSection doctorId={doctorId} />
                </Grid>
              )}
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
      marginTop: APP_BAR_HEIGHT,
    },
    ccrt__doctor__details__page__image__container: {
      position: "relative",
      minHeight: "25vh",
    },

    title: {
      fontWeight: "bold",
      color: theme.palette.custom.BLACK,
    },
  })
);

export default DoctorDetails;
