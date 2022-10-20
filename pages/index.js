import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Doctor from "../components/home-page/doctor/Doctor";
import Sponsor from "../components/home-page/sponsor/Sponsor";
import Blog from "../components/home-page/blogs/Blog";
import Hero from "../components/home-page/hero-section/Hero";
export default function Home() {
  const [showSliders, setShowSliders] = useState(false);
  useEffect(() => {
    setShowSliders(true);
  }, []);

  return (
    <Grid container>
      <Hero />
      {showSliders && (
        <>
          <Doctor />
        </>
      )}

      <Sponsor />

      {showSliders && <Blog />}
    </Grid>
  );
}
