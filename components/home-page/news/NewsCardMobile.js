import React from "react";
import Image from "next/image";
import { Typography, CardMedia, CardContent, Card } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const NewsCardMobile = ({ picture, title, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.ccrt__news__card__container} elevation={0}>
      <CardMedia className={classes.ccrt__news__card__media}>
        <Image src={picture} alt="picture" layout="fill" objectFit="center" />
      </CardMedia>
      <CardContent className={classes.ccrt__news__card__content}>
        <Typography
          gutterBottom
          variant="h5"
          className={classes.ccrt__news__content__title}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={classes.ccrt__news__content__subtitle}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__news__card__container: {
      borderRadius: "3px",
      marginRight: "5px",
    },
    ccrt__news__card__media: {
      position: "relative",
      height: "40vh",
    },
    ccrt__news__card__content: {
      borderLeft: "2px solid #9e9e9e",
      borderRight: "2px solid #9e9e9e",
      borderBottom: "2px solid #9e9e9e",
    },
    ccrt__news__content__title: {
      fontSize: "100%",
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

NewsCardMobile.propTypes = {
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default NewsCardMobile;
