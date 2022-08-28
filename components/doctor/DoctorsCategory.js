import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";

const DoctorsCategory = ({ title }) => {
  const classes = useStyles();

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox size="small" />}
        label={
          <Typography className={classes.ccrt__dctr__page__left__menu__list}>
            {title}
          </Typography>
        }
      />
    </FormGroup>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dctr__page__left__menu__list: {
      width: "100%",
      padding: "5px",
      textTransform: "capitalize",
      fontSize: "90%",
      fontWeight: "500",
      color: theme.palette.grey[700],
    },
  })
);
DoctorsCategory.propTypes = {
  title: PropTypes.string.isRequired,
};
export default DoctorsCategory;
