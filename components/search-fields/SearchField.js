import React from "react";
import { Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import PropTypes from "prop-types";

const SearchField = ({ placeholder, size = "medium" }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.ccrt__search__container}>
      <TextField
        fullWidth
        size={size}
        placeholder={placeholder}
        className={classes.ccrt__searchField}
      />
      <span className={classes.ccrt__search__button}>
        <SearchIcon />
      </span>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__search__container: {
    position: "relative",
    background: "#FFFFFF",
  },
  ccrt__searchField: {
    paddingRight: "55px",
  },
  ccrt__search__button: {
    position: "absolute",
    right: "0",
    background: DEFAULT_COLOR_MINUS_2,
    color: "white",
    padding: "12px 15px",
    cursor: "pointer",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
});

export default SearchField;

SearchField.propTypes = {
  placeholder: PropTypes.string,
  size: PropTypes.string,
};
