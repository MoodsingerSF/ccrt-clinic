import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
const DoctorCard = ({
  image,
  name,
  specialty,
  degree,
  department,
  doctorId,
}) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.ccrt__dctr__page__right__content__wrapper}
    >
      <Grid item xs={3}>
        <Grid container className={classes.ccrt__doct__page__image__container}>
          <Image src={image} alt="doctor" layout="fill" objectFit="cover" />
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Grid
          container
          flexDirection={"column"}
          justifyContent="center"
          className={
            classes.ccrt__dctr__page__right__content__description__wrapper
          }
        >
          <Typography className={classes.ccrt__doct__page__dctr__name}>
            {name}
          </Typography>
          <Typography className={classes.ccrt__doct__page__dctr__specialty}>
            <strong>Specialty - </strong> {specialty}
            <br />
            <strong>Degree - </strong>
            {degree}
            <br />
            <strong>Department - </strong>
            {department}
          </Typography>
          <Grid
            container
            className={
              classes.ccrt__dctr__page__right__content__button__wrapper
            }
          >
            <Button
              size="small"
              variant="contained"
              className={classes.ccrt__dctr__page__appoinment__button}
            >
              get an appoinment
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                router.push("/doctors/" + doctorId);
              }}
            >
              view details
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dctr__page__right__content__wrapper: {
      border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      margin: "5px 0",
      padding: "5px",
    },
    ccrt__dctr__page__right__content__description__wrapper: {
      padding: "20px",
    },
    ccrt__doct__page__image__container: {
      position: "relative",
      height: "30vh",
    },
    ccrt__doct__page__dctr__name: {
      fontSize: "140%",
      fontWeight: "500",
      textTransform: "capitalize",
      color: theme.palette.custom.DEFAULT_COLOR_3,
      margin: "0 0 5px 0",
    },
    ccrt__doct__page__dctr__specialty: {
      fontSize: "85%",
      color: "#6d6d6d",
      textTransform: "capitalize",
    },
    ccrt__dctr__page__right__content__button__wrapper: {
      marginTop: "30px",
    },
    ccrt__dctr__page__appoinment__button: {
      margin: "0 10px 0 0",
    },
  })
);

DoctorCard.propTypes = {
  doctorId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
};

export default DoctorCard;
