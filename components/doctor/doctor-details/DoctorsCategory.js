import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";

const DoctorsCategory = ({ title }) => {
  const classes = useStyles();
  return (
    <>
      <ul className={classes.ccrt__doctor__details__dctr__category__ul}>
        <li className={classes.ccrt__doctor__details__dctr__category__list}>
          {title}
        </li>
      </ul>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doctor__details__dctr__category__ul: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    ccrt__doctor__details__dctr__category__list: {
      background: theme.palette.custom.DEFAULT_COLOR_3,
      color: "#ffffff",
      padding: "5px",
      margin: "5px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "75%",
      textTransform: "uppercase",
    },
  })
);

DoctorsCategory.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DoctorsCategory;
