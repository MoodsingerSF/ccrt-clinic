import React from "react";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const AnotherSignupButtons = ({ value, Icon }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Button
        variant="contained"
        fullWidth
        className={classes.anotherSignupButton}
        startIcon={Icon}
      >
        {value}
      </Button>
    </Grid>
  );
};

const useStyles = makeStyles({
  anotherSignupButton: {
    marginBottom: "10px",
  },
});

export default AnotherSignupButtons;
