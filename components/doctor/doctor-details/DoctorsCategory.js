import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

const DoctorsCategory = ({ title }) => {
  const classes = useStyles();
  return (
    <Grid item>
      <Typography
        className={classes.ccrt__doctor__details__dctr__category__list}
      >
        {title}
      </Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doctor__details__dctr__category__list: {
      background: theme.palette.custom.GREEN,
      color: theme.palette.custom.BLACK,
      padding: "5px 10px",
      margin: "5px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "70%",
      fontWeight: 500,
      textTransform: "capitalize",
    },
  })
);

DoctorsCategory.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DoctorsCategory;
