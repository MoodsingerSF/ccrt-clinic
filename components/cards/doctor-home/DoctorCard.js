import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { HOME_PAGE_DOCTOR_CARD_BOX_SHADOW } from "../../../misc/colors";
import PropTypes from "prop-types";
import avatar from "../../../public/image/doctor/docAvatar2.png";

const DoctorCard = ({
  doctorId,
  image = null,
  name,
  specialization,
  department,
  patient_count,
}) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Grid container onClick={() => router.push(`/doctors/${doctorId}`)}>
      <Grid container className={classes.ccrt__doctor__card}>
        <Grid container className={classes.ccrt__doctor__card__media}>
          {image === null ? (
            <Image
              src={avatar}
              alt={name}
              layout="fill"
              objectFit="contain"
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
          ) : (
            <Image
              loader={({ src }) => src}
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
          )}
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
            className={classes.ccrt__doctor__card__name__container}
          >
            <Typography className={classes.ccrt__doctor__card__name}>
              {name}
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
            className={classes.ccrt__doctor__card__description}
          >
            <Typography className={classes.ccrt__doctor__card__subtitle}>
              {specialization}
            </Typography>
            <Typography className={classes.ccrt__doctor__card__dep}>
              {department}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.ccrt__doctor__card__footer}>
        <Grid item className={classes.ccrt__doctor__card__footer__icon}>
          <GroupAddOutlinedIcon fontSize="large" />
        </Grid>
        <Grid
          item
          flexDirection="column"
          className={classes.ccrt__doctor__card__footer__container}
        >
          <Typography
            className={classes.ccrt__doctor__card__footer__patient_served}
          >
            patients served
          </Typography>
          <Typography
            className={
              classes.ccrt__doctor__card__footer__patient_served__count
            }
          >
            {patient_count}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

DoctorCard.propTypes = {
  doctorId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  patient_count: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doctor__card: {
      boxShadow: HOME_PAGE_DOCTOR_CARD_BOX_SHADOW,
      borderRadius: "10px",
    },
    ccrt__doctor__card__media: {
      minHeight: "27vh",
      position: "relative",
    },
    ccrt__doctor__card__name__container: {
      background: theme.palette.custom.DEFAULT_COLOR_3,
      padding: "10px 0",
    },
    ccrt__doctor__card__name: {
      textTransform: "capitalize",
      fontSize: "95%",
      fontWeight: "600",
      color: "#fff",
      padding: "5px",
    },
    ccrt__doctor__card__description: {
      margin: "15px 0",
      display: "flex",
      flexDirection: "column",
    },
    ccrt__doctor__card__subtitle: {
      textTransform: "capitalize",
      fontSize: "85%",
      fontWeight: "600",
    },
    ccrt__doctor__card__dep: {
      textTransform: "uppercase",
      fontSize: "70%",
      fontWeight: "500",
    },
    ccrt__doctor__card__footer: {
      position: "relative",
      margin: "20px 0",
      padding: "8px 0",
      display: "flex",
      justifyContent: "center",
    },
    ccrt__doctor__card__footer__icon: {
      marginRight: "5px",
    },
    ccrt__doctor__card__footer__patient_served: {
      fontSize: "70%",
      textTransform: "uppercase",
      fontWeight: "500",
      color: theme.palette.custom.DEFAULT_COLOR_2,
    },
    ccrt__doctor__card__footer__patient_served__count: {
      fontSize: "90%",
      textTransform: "uppercase",
      fontWeight: "700",
      color: theme.palette.custom.DEFAULT_COLOR_3,
    },
  })
);
export default DoctorCard;
