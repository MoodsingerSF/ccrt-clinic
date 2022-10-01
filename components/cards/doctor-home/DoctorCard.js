import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import avatar from "../../../public/image/doctor/doctor.jpg";
import CustomChip from "../../chip/CustomChip";

const DoctorCard = ({ doctorId, imageUrl, name, specializations, fee }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Grid
      container
      item
      xs={12}
      onClick={() => router.push(`/doctors/${doctorId}`)}
    >
      <Grid container item xs={12} className={classes.ccrt__doctor__card}>
        <Grid container className={classes.ccrt__doctor__card__media}>
          {imageUrl === null ? (
            <Image
              src={avatar}
              alt={name}
              layout="fill"
              objectFit="cover"
              className={classes.ccrt__doctor__card__media_image}
            />
          ) : (
            <Image
              src={imageUrl}
              alt={name}
              loader={({ src }) => src}
              layout="fill"
              objectFit="cover"
              className={classes.ccrt__doctor__card__media_image}
            />
          )}
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            container
            // direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.ccrt__doctor__card__name__container}
          >
            <Grid
              // container
              item
              xs={9}
              // justifyContent="flex-start"
              // alignItems="flex-start"
              // style={{ background: "red", height: "100%" }}
            >
              <Grid
                container
                justifyContent="flex-start"
                alignItems="flex-start"
                // style={{ marginBottom: 5, background: "green" }}
              >
                <Typography className={classes.ccrt__doctor__card__name}>
                  {name}
                </Typography>
              </Grid>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                item
                xs={12}
                // style={{ overflowX: "scroll", width: "100%" }}
              >
                {specializations.map((item) => (
                  <Grid item key={item}>
                    <CustomChip title={item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              xs={3}
              container
              direction={"row"}
              justifyContent="center"
              alignItems={"center"}
              style={{ height: "100%" }}
            >
              <Typography className={classes.creditSignStyle}>
                &#2547;
              </Typography>
              <Typography className={classes.amountStyle}>{fee}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

DoctorCard.propTypes = {
  doctorId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  specializations: PropTypes.array.isRequired,
  fee: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doctor__card: {
      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      borderRadius: 5,
      marginBottom: 10,
      background: "white",
      border: `.5px solid ${theme.palette.custom.BLACK}`,
      cursor: "pointer",
    },
    ccrt__doctor__card__media: {
      width: "100%",
      aspectRatio: 1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,

      position: "relative",
      overflow: "hidden",
    },
    ccrt__doctor__card__media_image: {
      width: "100%",
      aspectRatio: 1,
      // borderRadius: 15,
    },
    ccrt__doctor__card__name__container: {
      padding: "10px 0",
      width: "95%",
    },
    ccrt__doctor__card__name: {
      textTransform: "capitalize",
      fontSize: "85%",
      fontWeight: 500,
      marginTop: 5,
      color: theme.palette.custom.BLACK,
    },
    creditSignStyle: {
      fontSize: "100%",
      color: theme.palette.custom.GREEN,
      fontWeight: "bold",
    },
    amountStyle: {
      fontSize: "130%",
      color: theme.palette.custom.GREEN,
      fontWeight: "bold",
    },
  })
);
export default DoctorCard;
