import { Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
const SignUpTextField = ({
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
const useStyles = makeStyles((theme) => ({
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

SignUpTextField.propTypes = {
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

export default SignUpTextField;
