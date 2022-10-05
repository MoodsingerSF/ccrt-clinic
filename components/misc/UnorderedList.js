import { Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@mui/styles";
const UnorderedList = ({ options }) => {
  const classes = useStyles();
  return (
    <ul className={classes.listStyle}>
      {options.map((item) => (
        <li key={item}>
          <Typography className={classes.paragraphStyle}>{item}</Typography>
        </li>
      ))}
    </ul>
  );
};
UnorderedList.propTypes = {
  options: PropTypes.array.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    paragraphStyle: {
      fontWeight: 500,
      color: theme.palette.custom.BLACK,
      fontSize: "85%",
    },

    listStyle: {
      color: theme.palette.custom.BLACK,
    },
  })
);

export default UnorderedList;
