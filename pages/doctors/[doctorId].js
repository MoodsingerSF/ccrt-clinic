import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { CategoryData } from "../../data/doctors-by-category/data";
import { CATEGORY_TITLE, DoctorData } from "../../data/doctor/data";
import FallbackComponent from "../../components/misc/FallbackComponent";
import DoctorsCategory from "../../components/doctor/doctor-details/DoctorsCategory";
import DoctorDetailsMiddle from "../../components/doctor/doctor-details/DoctorDetailsMiddle";
// import NotFoundComponent from "../../components/misc/NotFoundComponent";

const DoctorDetails = ({ doctorId }) => {
  const classes = useStyles();
  const router = useRouter();
  if (router.isFallback) return <FallbackComponent />;

  const [DoctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  //   const [found, setFound] = useState(true);
  const getDoctorDetails = (blogId) => {
    setLoading(true);
    const item = DoctorData.find((item) => item.id === blogId);
    setDoctorDetails(item);
    setLoading(false);
  };

  useEffect(() => {
    getDoctorDetails(doctorId);
  }, [doctorId]);

  return (
    <>
      {loading ? (
        <FallbackComponent />
      ) : (
        <Grid container justifyContent={"center"} alignItems="center">
          <Grid
            container
            spacing={4}
            className={classes.ccrt__doct__details__page__container}
          >
            <Grid
              container
              item
              md={12}
              lg={8}
              className={classes.ccrt__doct__details__page__left__container}
            >
              <Grid
                container
                spacing={4}
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
                      classes.ccrt__doct__details__page__image__container
                    }
                  >
                    {DoctorDetails && DoctorDetails.image && (
                      <Image
                        src={DoctorDetails?.image?.src}
                        alt={DoctorDetails?.name}
                        layout="fill"
                        objectFit="contain"
                      />
                    )}
                  </Grid>
                  <Grid container style={{ marginTop: "20px" }}>
                    <Button fullWidth size="small" variant="outlined">
                      get an appoinment
                    </Button>
                  </Grid>
                </Grid>
                <DoctorDetailsMiddle
                  name={DoctorDetails?.name}
                  specialty={DoctorDetails?.specialty}
                  degree={DoctorDetails?.degree}
                  education={DoctorDetails?.education}
                  experiance={DoctorDetails?.experiance}
                />
              </Grid>
            </Grid>
            <Grid
              item
              md={12}
              lg={4}
              className={classes.ccrt__doct__details__page__right__container}
            >
              <Grid
                container
                justifyContent={"center"}
                alignItems="center"
                className={
                  classes.ccrt__doct__details__page__right__container__wrapper
                }
              >
                <Typography
                  className={
                    classes.ccrt__doct__details__page__right__container__title
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

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doct__details__page__container: {
      width: "95vw",
      marginTop: "12vh",
    },
    ccrt__doct__details__page__image__container: {
      position: "relative",
      minHeight: "25vh",
    },

    ccrt__doct__details__page__right__container__wrapper: {
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      padding: "20px 0px",
      margin: "20px 0",
    },
    ccrt__doct__details__page__right__container__title: {
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
  })
);

export default DoctorDetails;
