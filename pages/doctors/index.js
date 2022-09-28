import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { DoctorData } from "../../data/doctor/data";
import DoctorCard from "../../components/cards/doctor-screen/DoctorCard";
import DoctorsCategoryDesktop from "../../components/pages/doctors/DoctorsCategoryDesktop";
import DoctorCategoryMobile from "../../components/pages/doctors/DoctorCategoryMobile";
import classNames from "classnames";
import { withRouter } from "next/router";
import LoaderComponent from "../../components/misc/LoaderComponent";

const DoctorsScreen = withRouter((props) => {
  const queryParams = props.router.query.specialization;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  // const [doctorData, setDoctorData] = useState(DoctorData);
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState(queryParams);
  const [loading, setLoading] = useState(false);

  const handleFilter = (value) => {
    setLoading(true);
    if (value === "all" || !value) {
      setFilter("all");
      setDoctors(DoctorData);
      setLoading(false);
    } else {
      setFilter(value);
      let data = DoctorData.filter((data) =>
        data.specialist.find((tit) => tit === value)
      );
      setDoctors(data);
      setLoading(false);
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
        )}
      </Grid>
    </Grid>
  );
});

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__dctr__page__container: {
      // width: "90vw",
      marginTop: "12vh",
      minHeight: "100vh",
    },
    ccrt__dctr__page__right__content: {
      // borderLeft: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
    },
    ccrt__dctr__page__right__content_mobile: {
      borderLeft: "none",
    },
  })
);
export default DoctorsScreen;
