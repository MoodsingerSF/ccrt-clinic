import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
// import { DoctorData } from "../../data/doctor/data";
import DoctorCard from "../../components/cards/doctor-screen/DoctorCard";
import DoctorsCategoryDesktop from "../../components/pages/doctors/DoctorsCategoryDesktop";
import DoctorCategoryMobile from "../../components/pages/doctors/DoctorCategoryMobile";
import classNames from "classnames";
import { withRouter } from "next/router";
import LoaderComponent from "../../components/misc/LoaderComponent";
import { retrieveDoctorsFilter } from "../../controllers/AllDoctorController";

const DoctorsScreen = withRouter((props) => {
  const queryParams = props.router.query.specialization;

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFilter = async (queryParams) => {
    try {
      setLoading(true);
      if (!queryParams) {
        setFilter("all");
        const response = await retrieveDoctorsFilter(0);
        setDoctors(response);
      } else {
        const paramsId = Number(queryParams[queryParams.length - 1]);
        const paramsText = queryParams.slice(0, -1);
        setFilter(paramsText);
        const response = await retrieveDoctorsFilter(paramsId);
        setDoctors(response);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFilter(queryParams);
  }, [queryParams]);

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Grid
        container
        spacing={4}
        className={classes.ccrt__dctr__page__container}
      >
        {matches ? (
          <DoctorsCategoryDesktop filter={filter} handleFilter={handleFilter} />
        ) : (
          <DoctorCategoryMobile filter={filter} handleFilter={handleFilter} />
        )}
        {loading ? (
          <Grid container>
            <Grid item md={3}></Grid>
            <Grid
              container
              item
              xs={12}
              md={9}
              justifyContent={"center"}
              alignItems="center"
              style={{
                borderLeft: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
              }}
            >
              <LoaderComponent />
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item md={3}></Grid>
            <Grid
              item
              xs={12}
              md={9}
              className={classNames({
                [classes.ccrt__dctr__page__right__content_mobile]: !matches,
                [classes.ccrt__dctr__page__right__content]: matches,
              })}
            >
              {doctors.map((item) => (
                <DoctorCard
                  key={item.userId}
                  doctorId={item.userId}
                  // image={item.profileImageUrl}
                  name={item.firstName + " " + item.lastName}
                  specialty={item.specializations}
                  degree={item.education}
                  // department={item.department}
                />
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
});

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__dctr__page__container: {
      marginTop: "12vh",
      minHeight: "100vh",
    },
    ccrt__dctr__page__right__content: {},
    ccrt__dctr__page__right__content_mobile: {
      borderLeft: "none",
    },
  })
);
export default DoctorsScreen;
