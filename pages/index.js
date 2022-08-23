import React from "react";
import { Grid } from "@mui/material";
import News from "../components/home-page/news/News";
import Doctor from "../components/home-page/doctor/Doctor";
import Review from "../components/home-page/review/Review";
import Sponsor from "../components/home-page/sponsor/Sponsor";
import Blog from "../components/home-page/blogs/Blog";
import Hero from "../components/home-page/hero-section/Hero";
export default function Home() {
  return (
    <Grid container>
      <Hero />
      <News />
      <Doctor />
      <Sponsor />
      <Review />
      <Blog />
    </Grid>
  );
}
