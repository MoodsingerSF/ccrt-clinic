import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import News from "../components/home-page/news/News";
import Doctor from "../components/home-page/doctor/Doctor";
import Review from "../components/home-page/review/Review";
import Sponsor from "../components/home-page/sponsor/Sponsor";
import Blog from "../components/home-page/blogs/Blog";
import Hero from "../components/home-page/hero-section/Hero";
// import Category from "../components/home-page/doctors-category/Category";
import Footer from "../components/footer/Footer";
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
          <News />
          <Doctor />
        </>
      )}

      <Sponsor />
      {showSliders && <Review />}

      {showSliders && <Blog />}
      {/* <Category /> */}
      <Footer />
    </Grid>
  );
}
