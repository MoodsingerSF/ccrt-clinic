import React from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

import { Typography } from "@mui/material";

const SuggestionRow = ({ index, name, email, message }) => {
  const classes = useStyles();

  return (
    <>
      <tr className={classes.ccrt__table__cell__row}>
        {/* <td className={classes.ccrt__table__cell}>{index + 1}</td> */}
        <td
          className={classes.ccrt__table__cell}
          align="left"
          style={{ width: "20%" }}
        >
          <Typography className={classes.textStyle}>
            {index + 1}. {name}
          </Typography>
        </td>
        <td
          className={classes.ccrt__table__cell}
          align="center"
          style={{ width: "20%" }}
        >
          <Typography className={classes.textStyle}>{email}</Typography>
        </td>
        <td
          className={classes.ccrt__table__cell}
          align="center"
          style={{ width: "60%" }}
        >
          <Typography className={classes.textStyle}>{message}</Typography>
        </td>
      </tr>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__table__cell__row: {
    // cursor: "pointer",
    borderBottom: "1px solid rgba(113, 110, 182, 0.15)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: theme.palette.custom.TABLE_HOVER_COLOR,
    },
  },
  ccrt__table__cell: {
    textTransform: "capitalize",
    padding: "10px 0px",
  },
  textStyle: {
    color: theme.palette.custom.BLACK,
    fontSize: "80%",
    fontWeight: 500,
  },
}));

SuggestionRow.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default SuggestionRow;
