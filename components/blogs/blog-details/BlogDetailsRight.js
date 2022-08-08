import React from "react";
import Image from "next/image";
import { Chip, Grid, Typography, useTheme } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import { useStyles } from "../../../styles/BlogDetailStyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import SocialShareComponent from "../../misc/SocialShareComponent";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { DEFAULT_COLOR, DEFAULT_COLOR_MINUS_2 } from "../../../misc/colors";

const BlogDetailsRight = ({
  title,
  description,
  authorName,
  publishDate,
  imageUrl,
  tags,
  // blogId,
}) => {
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
          {title}
        </h2>
        <Grid container>
          <span className={classes.ccrt__blogDetails__right__blog_meta}>
            <PersonOutlineIcon
              className={classes.ccrt__blogDetails__right__icon}
            />
            <span>{authorName}</span>
          </span>
          <span className={classes.ccrt__blogDetails__right__blog_meta}>
            <CalendarMonthOutlinedIcon
              className={classes.ccrt__blogDetails__right__icon}
            />
            <span>{publishDate}</span>
          </span>
        </Grid>
      </Grid>
      <Grid container>
        <Image src={imageUrl} alt="blog-img" />
      </Grid>
      <Grid container style={{ marginTop: "20px" }}>
        <Typography style={{ textAlign: "justify" }}>{description}</Typography>
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
          {tags.map((tag) => (
            <Chip
              key={tag}
              className={classes.ccrt__blogDetails__right__tags}
              label={tag}
            />
          ))}
        </Grid>
        <Grid item xs={12} lg={6} container>
          <SocialShareComponent justifyContent="flex-end" link={"sfvdgh"} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__blogDetails__right__section__mobile: {
    padding: "0 20px",
  },
  ccrt__blogDetails__right__section__tablet: {
    padding: "15px 25px 30px",
  },
  ccrt__blogDetails__right__section__desktop_Lg: {
    border: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
  },
  ccrt__blogDetails__right__title__mobile: {
    fontSize: "100%",
    textAlign: "justify",
    fontWeight: "700",
    margin: "0 0 13px",
    color: DEFAULT_COLOR,
  },
  ccrt__blogDetails__right__title_tablet: {
    textAlign: "justify",
    lineHeight: "35px",
    margin: "0 0 13px",
    color: DEFAULT_COLOR,
  },
  ccrt__blogDetails__right__blog_meta: {
    fontSize: "16px",
    marginRight: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ccrt__blogDetails__right__icon: {
    fontSize: "20px",
    marginRight: "5px",
  },
  ccrt__blogDetails__right__blog__tags__mobile: {
    justifyContent: "right",
  },
  ccrt__blogDetails__right__blog__tags__tablet: {
    justifyContent: "right",
  },
  ccrt__blogDetails__right__blog__tags__laptop: {
    justifyContent: "right",
  },
  ccrt__blogDetails__right__blog__tags__LG: {
    justifyContent: "left",
  },
  ccrt__blogDetails__right__tags: {
    margin: "5px",
  },
});

BlogDetailsRight.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.any,
  tags: PropTypes.array.isRequired,
  // blogId: PropTypes.string.isRequired,
};

export default BlogDetailsRight;
