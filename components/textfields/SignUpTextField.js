import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const SignUpTextField = ({
  labelText = "",
  adornment = "",
  label = "",
  type,
  placeholder = "",
  value,
  onChange,
  error = false,
  errorText = "",
  variant = "standard",
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent={"flex-start"}
      alignItems="center"
      className={classes.ccrt_textField_container}
    >
      {labelText && (
        <Typography className={classes.ccrt_textField_label}>
          {labelText}
        </Typography>
      )}
      <Grid container style={{ marginBottom: "10px" }}>
        <TextField
          variant={variant}
          size="small"
          fullWidth
          label={label}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          InputProps={
            adornment && {
              startAdornment: (
                <InputAdornment position="start">{adornment}</InputAdornment>
              ),
            }
          }
        />
        {error && (
          <Typography className={classes.ccrt__text_field__error_text}>
            {errorText}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

SignUpTextField.propTypes = {
  labelText: PropTypes.string,
  adornment: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
};

const useStyles = makeStyles(() => ({
  ccrt_textField_container: {
    marginBottom: "15px",
    width: "100%",
  },
  ccrt_textField_label: {
    marginBottom: "5px",
    fontSize: "80%",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  ccrt__text_field__error_text: {
    color: "red",
    fontSize: "70%",
  },
}));

export default SignUpTextField;
