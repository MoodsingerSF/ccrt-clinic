import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const NewsCard = ({ picture, title, description }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.ccrt__news__card__container}>
      <Grid item xs={4} className={classes.ccrt__news__card__img__container}>
        <Image src={picture} alt="news" layout="fill" objectFit="cover" />
      </Grid>
      <Grid item xs={8} className={classes.ccrt__news__card__des__container}>
        <Typography
          variant="h5"
          color="text.secondary"
          className={classes.ccrt__news__content__title}
        >
          {title}
        </Typography>
        <Typography className={classes.ccrt__news__content__subtitle}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__news__card__container: {
      border: "2px solid #9e9e9e",
      width: "95%",
      minHeight: "30vh",
      position: "relative",
      borderRadius: "3px",
      padding: "10px 15px 10px 8px",
    },
    ccrt__news__card__img__container: {
      position: "relative",
    },
    ccrt__news__card__des__container: {
      padding: "5px 10px 10px 10px",
    },
    ccrt__news__content__title: {
      fontWeight: "700",
      margin: "7px",
    },
    ccrt__news__content__subtitle: {
      textAlign: "justify",
      fontSize: "82%",
      marginLeft: "10px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 6 /* number of lines to show */,
      "-webkit-box-orient": "vertical",
    },
  })
);

NewsCard.propTypes = {
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default NewsCard;
