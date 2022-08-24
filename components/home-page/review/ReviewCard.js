import React from "react";
import Image from "next/image";
import { Avatar, Box, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const ReviewCard = ({ image, name, description, icon }) => {
  const classes = useStyles();

  return (
    <Box container className={classes.ccrt__review__card__container}>
      <Avatar sx={{ width: 60, height: 60 }}>
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </Avatar>
      <Box className={classes.ccrt__review__card__description__container}>
        <Typography className={classes.ccrt__review__card__name}>
          {name}
        </Typography>
        <Typography className={classes.ccrt__review__card__description}>
          {description}
        </Typography>
      </Box>
      <Box className={classes.ccrt__review__card__review_icon}>
        {icon}
        {icon}
        {icon}
        {icon}
        {icon}
      </Box>
    </Box>
  );
};
ReviewCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__review__card__container: {
      position: "relative",
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    ccrt__review__card__description__container: {
      padding: "0 0 0 20px",
    },
    ccrt__review__card__name: {
      fontSize: "90%",
      textTransform: "capitalize",
      color: theme.palette.custom.DEFAULT_COLOR_3,
      fontWeight: "500",
      marginBottom: "10px",
    },
    ccrt__review__card__description: {
      fontSize: "75%",
      textAlign: "justify",
    },
    ccrt__review__card__review_icon: {
      position: "absolute",
      top: "10%",
      right: "6%",
      color: "red",
    },
  })
);

export default ReviewCard;
