import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { createStyles, makeStyles } from "@mui/styles";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import NewsCard from "./NewsCard";
import { NewsData } from "../../../data/news/data";
import NewsCardMobile from "./NewsCardMobile";

const News = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid container style={{ padding: matches ? "0 80px" : "0 20px" }}>
      <Grid item xs={12} lg={6}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          pagination={true}
          modules={[Pagination, Autoplay]}
        >
          {NewsData.map((item) => (
            <SwiperSlide key={item.id} className={classes.swiper_slide}>
              {matches ? (
                <NewsCard
                  picture={item.img}
                  title={item.title}
                  description={item.sub_title}
                />
              ) : (
                <NewsCardMobile
                  picture={item.img}
                  title={item.title}
                  description={item.sub_title}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          pagination={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          // }}
        >
          {NewsData.map((item) => (
            <SwiperSlide key={item.id} className={classes.swiper_slide}>
              {matches ? (
                <NewsCard
                  picture={item.img}
                  title={item.title}
                  description={item.sub_title}
                />
              ) : (
                <NewsCardMobile
                  picture={item.img}
                  title={item.title}
                  description={item.sub_title}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    swiper_slide: {
      //   textAlign: "center",
      //   display: "-webkit-box",
      //   display: "-ms-flexbox",
      //   display: "-webkit-flex",
      marginBottom: "10px",
    },
  })
);
export default News;
