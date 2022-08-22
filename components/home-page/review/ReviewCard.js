import React from "react";
import Image from "next/image";
import { Avatar, Box, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const ReviewCard = ({ image, name, description, icon }) => {
  const classes = useStyles();

  return (
    <Box
      container
      style={{
        position: "relative",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
      <Box
        style={{
          position: "absolute",
          top: "10%",
          right: "6%",
          color: "red",
        }}
      >
        {icon}
        {icon}
        {icon}
        {icon}
        {icon}
      </Box>
    </Box>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__review__card__description__container: {
      padding: "0 0 0 20px",
    },
    ccrt__review__card__name: {
      fontSize: "90%",
      textTransform: "capitalize",
      color: theme.palette.custom.SECOND_DEFAULT_COLOR,
      fontWeight: "500",
      marginBottom: "10px",
    },
    ccrt__review__card__description: {
      fontSize: "75%",
      textAlign: "justify",
    },
  })
);

ReviewCard.proptypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
export default ReviewCard;
