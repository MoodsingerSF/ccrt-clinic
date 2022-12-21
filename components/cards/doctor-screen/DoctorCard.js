import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
import CustomChip from "../../chip/CustomChip";

const DoctorCard = ({
  imageUrl = null,
  name,
  specializations,
  doctorId,
  fee,
  about,
}) => {
  const router = useRouter();
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid
      container
      className={classes.ccrt__dctr__page__right__content__wrapper}
    >
      <Grid item xs={12} md={3}>
        <Grid
          container
          className={classes.ccrt__doct__page__image__container}
          onClick={() => {
            router.push("/doctors/" + doctorId);
          }}
        >
          {imageUrl !== null && (
            <Image
              src={imageUrl}
              loader={({ src }) => src}
              alt="doctor"
              layout="fill"
              objectFit="cover"
              style={{ borderRadius: 5 }}
            />
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid
          container
          flexDirection={"column"}
          justifyContent="center"
          alignItems={matches ? "flex-start" : "center"}
          className={
            classes.ccrt__dctr__page__right__content__description__wrapper
          }
        >
          <Typography
            className={classes.ccrt__doct__page__dctr__name}
            onClick={() => {
              router.push("/doctors/" + doctorId);
            }}
          >
            {name}
          </Typography>
          <Typography className={classes.ccrt__doct__page__dctr__fee}>
            &#2547;{fee}
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.sectionTitle}>
                specializations:
              </Typography>
            </Grid>

            <Grid item container xs={12}>
              {specializations.map((item) => (
                <CustomChip key={item} title={item} fontColor={"#fff"} />
              ))}
            </Grid>
          </Grid>
          <Typography className={classes.aboutStyle}>{about}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dctr__page__right__content__wrapper: {
      margin: "5px 0",
    },
    ccrt__dctr__page__right__content__description__wrapper: {
      padding: "0px 20px",
    },
    ccrt__doct__page__image__container: {
      position: "relative",
      height: "30vh",
      background: theme.palette.custom.BLACK,
      borderRadius: 5,
      cursor: "pointer",
    },
    ccrt__doct__page__dctr__name: {
      cursor: "pointer",
      fontSize: "100%",
      fontWeight: 600,
      textTransform: "capitalize",
      color: theme.palette.custom.BLACK,
    },
    ccrt__doct__page__dctr__fee: {
      fontSize: "120%",
      fontWeight: 600,
      textTransform: "capitalize",
      color: theme.palette.custom.GREEN,
    },

    ccrt__dctr__page__right__content__button__wrapper: {
      marginTop: "10px",
    },
    ccrt__dctr__page__appoinment__button: {
      margin: "0 10px 0 0",
    },
    sectionTitle: {
      fontSize: "90%",
      fontWeight: 500,
      color: theme.palette.custom.BLACK,
      textTransform: "capitalize",
      marginRight: 10,
    },
    aboutStyle: {
      fontSize: "80%",
      fontWeight: 500,
      color: theme.palette.custom.GREY,
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
    },
  })
);

DoctorCard.propTypes = {
  doctorId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  about: PropTypes.string,
  specializations: PropTypes.array.isRequired,
  fee: PropTypes.number.isRequired,
};

export default DoctorCard;
