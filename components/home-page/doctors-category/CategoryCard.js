import React from "react";
import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const CategoryCard = ({ title }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      item
      xs={6}
      sm={4}
      className={classes.textStyle__wrapper}
      style={{}}
    >
      <Typography className={classes.textStyle}>{title}</Typography>
    </Grid>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    textStyle__wrapper: {
      border: "1px solid black",
      minHeight: "8vh",
      margin: "1px 0",
    },
    textStyle: {
      fontSize: "90%",
      textTransform: "uppercase",
      cursor: "pointer",
      height: "8vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      transition: "all 0.15s ease",
      "&:hover": {
        background: theme.palette.custom.DEFAULT_COLOR_3,
        color: "#fff",
        fontSize: "100%",
      },
    },
  })
);
CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
};
export default CategoryCard;
