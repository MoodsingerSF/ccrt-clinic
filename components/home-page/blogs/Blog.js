import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import Heading from "../section-heading/Heading";
// import { BlogData } from "../../../data/home/data";
import BlogCard from "./BlogCard";
import { retrievePopularBlogs } from "../../../controllers/BlogController";
import { prettyDate } from "../../../controllers/DateController";
import LoaderComponent from "../../misc/LoaderComponent";

const Blog = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const getPopularBlogs = async () => {
    try {
      setLoading(true);
      const blogs = await retrievePopularBlogs(0);
      setBlogs(blogs);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPopularBlogs();
  }, []);

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          // style={{
          //   margin: matches ? "50px 0 0 0" : "20px 0 0 0",
          // }}
        >
          <Grid
            container
            style={{ width: "95%", marginBottom: 30, marginTop: 30 }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <Heading title="Popular Blogs" />
            </Grid>

            <Grid container style={{ marginTop: 30 }}>
              <Swiper
                slidesPerView={1.5}
                spaceBetween={isDesktop ? 30 : 15}
                slidesPerGroup={1}
                loop={false}
                pagination={{
                  clickable: true,
                }}
                modules={[Navigation, Pagination]}
                className={classes.ccrt__home__blog__card__mySwiper}
                breakpoints={{
                  600: {
                    slidesPerView: 3,
                  },
                  900: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                  1400: {
                    slidesPerView: 6,
                  },
                }}
              >
                {blogs?.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    className={classes.ccrt__home__blog__slide}
                  >
                    <BlogCard
                      image={item.imageUrl}
                      name={item.title}
                      tags={item.tags}
                      blogId={item.blogId}
                      date={prettyDate(item.creationTime)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__home__blog__card__mySwiper: {
      width: "100%",
      height: "100%",
      // margin: "50px ",
      // padding: "0 10px 50px 10px",
    },
    ccrt__home__blog__slide: {
      minHeight: "30vh",
    },
  })
);
export default Blog;
