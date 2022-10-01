import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
// import avatar from "../../../public/image/doctor/docAvatar2.png";
import CustomChip from "../../chip/CustomChip";
// import DoctorEducationInfo from "../../doctor-info-form/DoctorEducationInfo";

const DoctorCard = ({
  imageUrl = null,
  name,
  specializations,
  // education,
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
      onClick={() => {
        router.push("/doctors/" + doctorId);
      }}
    >
      <Grid item xs={12} md={3}>
        <Grid container className={classes.ccrt__doct__page__image__container}>
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
          <Typography className={classes.ccrt__doct__page__dctr__name}>
            {name}
          </Typography>
          <Typography className={classes.ccrt__doct__page__dctr__fee}>
            &#2547;{fee}
          </Typography>
          <Grid container>
            <Grid item xs={2}>
              <Typography className={classes.sectionTitle}>
                specializations:
              </Typography>
            </Grid>

            <Grid item container xs={9} style={{ paddingLeft: 10 }}>
              {specializations.map((item) => (
                <CustomChip key={item} title={item} />
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
      // border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      margin: "5px 0",
      cursor: "pointer",
    },
    ccrt__dctr__page__right__content__description__wrapper: {
      // padding: "20px",
      padding: "0px 20px",
    },
    ccrt__doct__page__image__container: {
      position: "relative",
      height: "30vh",
      background: theme.palette.custom.BLACK,
      borderRadius: 5,
    },
    ccrt__doct__page__dctr__name: {
      fontSize: "100%",
      fontWeight: 600,
      textTransform: "capitalize",
      color: theme.palette.custom.BLACK,
      // margin: "0 0 5px 0",
    },
    ccrt__doct__page__dctr__fee: {
      fontSize: "120%",
      fontWeight: 600,
      textTransform: "capitalize",
      color: theme.palette.custom.GREEN,
      // margin: "0 0 5px 0",
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
  // education: PropTypes.array.isRequired,
  fee: PropTypes.number.isRequired,

  // department: PropTypes.string.isRequired,
};

export default DoctorCard;
