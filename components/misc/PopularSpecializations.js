import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { retrievePopularSpecializations } from "../../controllers/SpecializationController";
import { CATEGORY_TITLE } from "../../data/doctor/data";
import DoctorsCategory from "../doctor/doctor-details/DoctorsCategory";
import LoaderComponent from "./LoaderComponent";

const PopularSpecializations = () => {
  const classes = useStyles();
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPopularSpecializations = async () => {
    try {
      setLoading(true);
      const data = await retrievePopularSpecializations(0, 15);
      setSpecializations(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPopularSpecializations();
  }, []);

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : specializations.length === 0 ? null : (
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
            {specializations.map((item) => (
              <DoctorsCategory key={item.id} id={item.id} title={item.name} />
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doctor__details__page__right__container__title: {
      // textTransform: "capitalize",
      marginBottom: "10px",
      fontWeight: "bold",
      color: theme.palette.custom.BLACK,
      // borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      width: "100%",
      textAlign: "center",
      padding: "0 0 15px 0",
      fontSize: "120%",
    },
    ccrt__doctor__details__page__right__container__wrapper: {
      // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      paddingBottom: 10,
      margin: "0px 0",
    },
  })
);

export default PopularSpecializations;
