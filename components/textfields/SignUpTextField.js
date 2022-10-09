import { Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import { InputAdornment } from "@mui/material";

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
  multiline = false,
  numRows = 5,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [textfieldType, setTextfieldType] = useState(type);
  const [viewPassword, setViewPassword] = useState(false);
  useEffect(() => {
    if (type === "password") {
      if (viewPassword) {
        setTextfieldType("text");
      } else {
        setTextfieldType("password");
      }
    }
  }, [viewPassword]);

  return (
    <Grid item xs={12} style={{ marginBottom: "10px" }}>
      {labelText && (
        <Typography className={classes.ccrt_textField_label}>
          {labelText}
        </Typography>
      )}
      <TextField
        variant={variant}
        size="small"
        fullWidth
        multiline={multiline}
        label={label}
        type={textfieldType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        // classes={{ root: classes.root }}
        InputLabelProps={{
          style: {
            color: theme.palette.custom.BLACK,
            fontSize: "85%",
            fontWeight: 500,
            margin: 0,
            padding: 0,
          },
        }}
        inputProps={{
          style: {
            padding: "5px 10px",
          },
        }}
        // classes={{ root: classes.root }}
        InputProps={{
          ...(adornment
            ? {
                startAdornment: (
                  <InputAdornment position="start">{adornment}</InputAdornment>
                ),
              }
            : {}),
          className: classes.input,
          ...(multiline ? { rows: numRows } : {}),
          endAdornment:
            type === "password" ? (
              viewPassword ? (
                <RemoveRedEyeIcon
                  className={classes.iconStyle}
                  onClick={() => setViewPassword(false)}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  className={classes.iconStyle}
                  onClick={() => setViewPassword(true)}
                />
              )
            ) : null,
        }}
      />
      {error && (
        <Typography style={{ color: "red", fontSize: "70%" }}>
          {errorText}
        </Typography>
      )}
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
  multiline: PropTypes.bool,
  errorText: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  numRows: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  ccrt_textField_container: {
    marginBottom: "10px",
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
  input: {
    fontSize: "85%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
    paddingTop: 10,
    margin: 0,
    padding: 0,
  },
  iconStyle: { marginRight: 10, fontSize: "150%", cursor: "pointer" },
}));

export default SignUpTextField;
