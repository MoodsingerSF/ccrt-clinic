import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Image from "next/image";
// import hero from "../../../public/image/home-page/hero/Cover.png";
import HotlineSection from "./HotlineSection";
// import HeroRightSection from "./HeroRightSection";
// import HeroMobile from "../../pages/home/HeroMobile";
import { APP_BAR_HEIGHT } from "../../../misc/constants";
import { useRouter } from "next/router";
import { retrieveAllCovers } from "../../../controllers/CoverController";
import LoaderComponent from "../../misc/LoaderComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination, Parallax } from "swiper";

const Hero = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [loading, setLoading] = useState(false);
  const [covers, setCovers] = useState([]);

  const getCovers = async () => {
    try {
      setLoading(true);
      const covers = await retrieveAllCovers("VISIBLE");
      setCovers(covers);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCovers();
  }, []);

  // console.log(covers);

  return (
    <>
      {/* {matches ? ( */}
      <Grid container className={classes.ccrt__hero__section}>
        {loading ? (
          <LoaderComponent />
        ) : (
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay, Parallax]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay
            loop
            speed={1500}
            pagination={{ clickable: true }}
          >
            {covers.map((item) => (
              <SwiperSlide
                key={item.url}
                onClick={() => router.push(item.link)}
                style={{ cursor: "pointer" }}
              >
                <>
                  <Grid
                    container
                    // className={classes.ccrt__home__banner__wrapper}
                    style={{
                      position: "relative",
                      height: "88vh",
                      width: "100vw",
                      background: `url(${item.imageUrl})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      filter: "blur(8px)",
                      "-webkit-filter": "blur(8px)",
                    }}
                  ></Grid>
                  <Grid
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                    }}
                  >
                    <Grid
                      container
                      style={{
                        position: "relative",
                        height: "88vh",
                        width: "100vw",
                      }}
                    >
                      <Image
                        loader={({ src }) => src}
                        src={item.imageUrl}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                        width={"100vw"}
                        height="88vh"
                      />
                    </Grid>
                  </Grid>
                </>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* <Grid container>
            <Grid
              item
              xs={6}
              className={classes.ccrt__hero__section__left__container}
            >
              <Image src={hero} alt="hero" layout="fill" objectFit="cover" />
            </Grid>
            <Grid
              // container
              item
              xs={12}
              sm={6}
              flexDirection={"column"}
              alignItems="flex-end"
              style={{ paddingRight: "2.5vw" }}
            >
              <HeroRightSection />
            </Grid>
            <HotlineSection />
          </Grid> */}
        {/* <HotlineSection /> */}
      </Grid>
      {/* // ) : (
      //   <HeroMobile />
      // )} */}
    </>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__hero__section: {
      paddingTop: APP_BAR_HEIGHT,
      minHeight: "100vh",
      position: "relative",
    },
    ccrt__hero__section__left__container: {
      // height: "100vh",
      position: "relative",
    },
  })
);

export default Hero;
