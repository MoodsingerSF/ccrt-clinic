import { Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@mui/styles";
const OrderedList = ({ options }) => {
  const classes = useStyles();
  return (
    <ol className={classes.listStyle}>
      {options.map((item) => (
        <li key={item}>
          <Typography className={classes.paragraphStyle}>{item}</Typography>
        </li>
      ))}
    </ol>
  );
};
OrderedList.propTypes = {
  options: PropTypes.array.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    paragraphStyle: {
      fontWeight: 500,
      color: theme.palette.custom.BLACK,
      fontSize: "100%",
    },

    listStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "85%",
    },
  })
);

export default OrderedList;
