import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import DoctorCard from "../../components/cards/doctor-screen/DoctorCard";
import DoctorsCategoryDesktop from "../../components/pages/doctors/DoctorsCategoryDesktop";
import DoctorCategoryMobile from "../../components/pages/doctors/DoctorCategoryMobile";
import { withRouter } from "next/router";
import LoaderComponent from "../../components/misc/LoaderComponent";
import NoContentToShowComponent from "../../components/misc/NoContentToShowComponent";
import useDoctors from "../../hooks/useDoctors";
import CustomButton from "../../components/button/CustomButton";

const DoctorsScreen = withRouter((props) => {
  const specializationId = props.router.query.specialization;

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [page, setPage] = useState(0);
  const {
    data: doctors,
    hasMore,
    loading,
  } = useDoctors(page, 15, specializationId ? specializationId : -1);
  useEffect(() => {
    setPage(0);
  }, [specializationId]);

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Grid
        container
        spacing={4}
        className={classes.ccrt__dctr__page__container}
      >
        {matches ? (
          <DoctorsCategoryDesktop
            filter={specializationId ? specializationId : -1}
          />
        ) : (
          <DoctorCategoryMobile
            filter={specializationId ? specializationId : -1}
          />
        )}
        <Grid container>
          <Grid item md={3}></Grid>
          <Grid
            container
            item
            xs={12}
            md={9}
            justifyContent={"center"}
            alignItems="center"
          >
            {doctors && doctors.length === 0 ? (
              loading ? (
                <LoaderComponent />
              ) : (
                <NoContentToShowComponent title="No doctors to show." />
              )
            ) : (
              <Grid
                container
                justifyContent={"center"}
                alignItems="flex-start"
                style={{ height: "100%", marginBottom: 30 }}
              >
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems="flex-start"
                  // style={{ height: "100%" }}
                >
                  {doctors &&
                    doctors.map((item) => (
                      <DoctorCard
                        key={item.userId}
                        doctorId={item.userId}
                        name={item.firstName + " " + item.lastName}
                        specializations={item.specializations}
                        imageUrl={item.profileImageUrl}
                        fee={item.fee}
                        about={item.about}
                      />
                    ))}
                </Grid>
                {loading && <LoaderComponent />}

                {!loading && hasMore && (
                  <Grid item xs={2}>
                    <CustomButton
                      title="Load More"
                      onClick={() => setPage((prev) => prev + 1)}
                    />
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__dctr__page__container: {
      marginTop: "12vh",
      minHeight: "88vh",
    },
    ccrt__dctr__page__right__content: {},
    ccrt__dctr__page__right__content_mobile: {
      borderLeft: "none",
    },
  })
);
export default DoctorsScreen;
