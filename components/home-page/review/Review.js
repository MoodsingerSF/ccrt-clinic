import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import Heading from "../section-heading/Heading";
import { ReviewData } from "../../../data/review/data";
import { HOME_PAGE_DOCTOR_CARD_BOX_SHADOW } from "../../../misc/colors";
import ReviewCard from "./ReviewCard";

const Review = () => {
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
      <Heading title="customer review" />
      <Grid container>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          //   navigation={true}
          modules={[Autoplay, Navigation]}
          className={classes.ccrt__review__card__mySwiper}
          breakpoints={{
            600: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // 1536: {
            //   slidesPerView: 4,
            //   spaceBetween: 20,
            // },
          }}
        >
          {ReviewData.map((review) => (
            <SwiperSlide
              key={review.id}
              className={classes.ccrt__review__card__swiper_slide}
            >
              <ReviewCard
                image={review.image}
                name={review.name}
                description={review.description}
                icon={review.star}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__review__card__mySwiper: {
      width: "100%",
      height: "100%",
      margin: "50px 0",
      padding: "0 5px",
    },
    ccrt__review__card__swiper_slide: {
      margin: "30px 0px",
      borderTopLeftRadius: "50px",
      borderBottomRightRadius: "50px",
      boxShadow: HOME_PAGE_DOCTOR_CARD_BOX_SHADOW,
    },
  })
);

export default Review;
