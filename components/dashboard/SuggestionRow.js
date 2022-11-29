import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import PropTypes from "prop-types";

import {
  Grid,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";

const SuggestionRow = ({ index, name, email, message }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Grid
            container
            alignItems="center"
            style={{ width: matchesMd ? "20vw" : matchesSm ? "25vw" : "50vw" }}
          >
            <Typography className={classes.textStyle}>
              {index + 1}. {name}
            </Typography>
          </Grid>
        </TableCell>
        <TableCell align="center">
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            style={{ width: matchesMd ? "20vw" : matchesSm ? "25vw" : "50vw" }}
          >
            <Typography className={classes.textStyle}>{email}</Typography>
          </Grid>
        </TableCell>
        <TableCell align="center">
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            style={{ width: matchesMd ? "55vw" : matchesSm ? "50vw" : "80vw" }}
          >
            <Typography className={classes.textStyle}>{message}</Typography>
          </Grid>
        </TableCell>
      </TableRow>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  textStyle: {
    color: theme.palette.custom.BLACK,
    fontSize: "80%",
    fontWeight: 500,
    textAlign: "center",
  },
}));

SuggestionRow.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default SuggestionRow;
