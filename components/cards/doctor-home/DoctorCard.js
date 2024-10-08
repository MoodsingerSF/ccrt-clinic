import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

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
          <Image
            src={imageUrl ? imageUrl : "/image/doctor/doctor.jpg"}
            alt={name}
            loader={({ src }) => src}
            layout="fill"
            objectFit="cover"
            className={classes.ccrt__doctor__card__media_image}
          />
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.ccrt__doctor__card__name__container}
          >
            <Grid container>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                mb={1}
              >
                <Typography className={classes.ccrt__doctor__card__name}>
                  {name}
                </Typography>
              </Grid>
              <Grid container justifyContent="flex-start" alignItems="center">
                {specializations.map((item) => (
                  <Grid item key={item.id}>
                    <CustomChip title={item} fontColor={"#fff"} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid style={{ position: "absolute", top: "20%", right: "0" }}>
              <Typography className={classes.amountStyle}>
                &#2547; {fee}
              </Typography>
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
    },
    ccrt__doctor__card__name__container: {
      position: "relative",
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
    amountStyle: {
      fontSize: "85%",
      color: theme.palette.custom.GREEN,
      fontWeight: "500",
    },
  })
);
export default DoctorCard;
