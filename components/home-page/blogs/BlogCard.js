import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const BlogCard = ({ image, name }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.ccrt__home__blog__img__container}>
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.ccrt__home__blog__description__container}
      >
        <Typography className={classes.ccrt__home__blog__textStyle}>
          {name}
        </Typography>
      </Grid>
    </>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__home__blog__img__container: {
      position: "relative",
      height: "25vh",
    },
    ccrt__home__blog__description__container: {
      borderLeft: "1px solid #bbbcbe",
      borderRight: "1px solid #bbbcbe",
      borderBottom: "1px solid #bbbcbe",
    },
    ccrt__home__blog__textStyle: {
      fontSize: "118%",
      textTransform: "uppercase",
      padding: "10px 25px",
      textAlign: "center",
    },
  })
);
BlogCard.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
export default BlogCard;
