import React from "react";
import Image from "next/image";
import { Chip, Grid, Typography, useTheme } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { useStyles } from "../../../styles/blogDetailstyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
// import blog from "../../../public/image/blog/blog1.jpeg";
import blog1 from "../../../public/image/blogDetails/abc.jpg";
import { DEFAULT_COLOR_MINUS_2 } from "../../../misc/colors";
import SocialShareComponent from "../../misc/SocialShareComponent";

const BlogDetailsRight = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Grid
      container
      className={classNames({
        [classes.ccrt__blogDetails__right__section__mobile]: !matches,
        [classes.ccrt__blogDetails__right__section__tablet]: matches,
        [classes.ccrt__blogDetails__right__section__desktop_Lg]: matchesLG,
      })}
    >
      <Grid container mb={3}>
        <h2
          className={classNames({
            [classes.ccrt__blogDetails__right__title__mobile]: !matches,
            [classes.ccrt__blogDetails__right__title_tablet]: matches,
          })}
        >
          A Policy Dialogue named Multi-Sectoral Cooperation to Reduce the
          Burden of Cancer in Bangladesh and Ensuring Patients Access
        </h2>
        <Grid container>
          <span className={classes.ccrt__blogDetails__right__blog_meta}>
            <PersonOutlineIcon
              className={classes.ccrt__blogDetails__right__icon}
            />
            <span>Joe Willis</span>
          </span>
          <span className={classes.ccrt__blogDetails__right__blog_meta}>
            <CalendarMonthOutlinedIcon
              className={classes.ccrt__blogDetails__right__icon}
            />
            <span>01/06/2020</span>
          </span>
          <span className={classes.ccrt__blogDetails__right__blog_meta}>
            <ModeCommentOutlinedIcon
              className={classes.ccrt__blogDetails__right__icon}
            />
            <span>Comments (05)</span>
          </span>
        </Grid>
      </Grid>
      <Grid container>
        <Image src={blog1} alt="blog-img" />
      </Grid>
      <Grid container style={{ marginTop: "20px" }}>
        <Typography style={{ textAlign: "justify" }}>
          A Policy Dialogue named Multi-Sectoral Cooperation to Reduce the
          Burden of Cancer in Bangladesh and Ensuring Patients Access” was held
          after the inauguration session” was arranged inviting most of the
          stakeholders; e.g scientists, academicians, philanthropists, doctors,
          business persons, cancer survivors, media persons, and volunteers. Dr.
          Gowhor Rizvi, the renowned Professor and international affairs Advisor
          of the Prime Minister, was the Chief Guest and Sir Walter Bodmer, a
          prominent human Geneticist and Head of the Cancer and Immunogenetics
          Lab of the Oxford University was the Guest of Honor of the Policy
          Dialogue. Media coverage at ” THE BUSINESS STANDARD” and Daily
          Jugantor
        </Typography>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{
          marginTop: "20px",
        }}
      >
        <Grid
          item
          container
          xs={12}
          lg={6}
          className={classNames({
            [classes.ccrt__blogDetails__right__blog__tags__mobile]: !matches,
            [classes.ccrt__blogDetails__right__blog__tags__tablet]: matches,
            [classes.ccrt__blogDetails__right__blog__tags__laptop]: matchesMD,
            [classes.ccrt__blogDetails__right__blog__tags__LG]: matchesLG,
          })}
        >
          <Chip
            className={classes.ccrt__blogDetails__right__tags}
            label="cancer"
          />
          <Chip
            className={classes.ccrt__blogDetails__right__tags}
            label="heart"
          />
          <Chip
            className={classes.ccrt__blogDetails__right__tags}
            label="brain"
          />
          <Chip
            className={classes.ccrt__blogDetails__right__tags}
            label="liver"
          />
        </Grid>
        <Grid item xs={12} lg={6} container>
          <SocialShareComponent justifyContent="flex-end" link={"sfvdgh"} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogDetailsRight;
