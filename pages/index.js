import React from "react";
import { Button, Grid } from "@mui/material";

export default function Home() {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Button color="primary" style={{ background: "red" }}>
        Click Me!
      </Button>
    </Grid>
  );
}
