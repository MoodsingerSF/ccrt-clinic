import React from "react";
import { Button, Grid } from "@mui/material";

const AnotherSignupButton = ({ value, Icon }) => {
  return (
    <Grid container>
      <Button variant="contained" fullWidth startIcon={Icon}>
        {value}
      </Button>
    </Grid>
  );
};

export default AnotherSignupButton;
