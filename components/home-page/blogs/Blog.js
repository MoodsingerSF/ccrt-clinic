import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
import Heading from "../section-heading/Heading";
import { BlogData } from "../../../data/home-blog/data";
import BlogCard from "./BlogCard";

const Blog = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        padding: matches ? "0 80px" : "0 10px",
        margin: matches ? "50px 0 0 0" : "20px 0 0 0",
      }}
    >
      <Heading title="blogs by popular tags" />
      <Grid container>
        <Swiper
          slidesPerView={1}
          spaceBetween={100}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          //   navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className={classes.ccrt__home__blog__card__mySwiper}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1400: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1536: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
        >
          {BlogData.map((item) => (
            <SwiperSlide
              key={item.id}
              className={classes.ccrt__home__blog__slide}
            >
              <BlogCard image={item.image} name={item.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__home__blog__card__mySwiper: {
      width: "100%",
      height: "100%",
      margin: "50px ",
      padding: "0 10px 50px 10px",
    },
    ccrt__home__blog__slide: {
      minHeight: "30vh",
    },
  })
);
export default Blog;
