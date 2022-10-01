import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import SocialShareComponent from "../../misc/SocialShareComponent";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { prettyDate } from "../../../controllers/DateController";
import Editor from "../../text-editor/Editor";
import Image from "next/image";
import { DOMAIN_ADDRESS } from "../../../misc/constants";
import CustomChip from "../../chip/CustomChip";

const BlogDetailsRight = ({
  title,
  description,
  authorName,
  publishDate,
  imageUrl,
  tags,
  blogId,
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
        <Typography
          variant="h6"
          className={classNames({
            [classes.ccrt__blogDetails__right__title__mobile]: !matches,
            [classes.ccrt__blogDetails__right__title_tablet]: matches,
          })}
        >
          {title}
        </Typography>
        <Grid container>
          <Grid item className={classes.ccrt__blogDetails__right__blog_meta}>
            <Grid container>
              <PersonOutlineIcon
                className={classes.ccrt__blogDetails__right__icon}
              />
              <Typography
                style={{ textTransform: "capitalize", fontSize: "90%" }}
              >
                {authorName}
              </Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.ccrt__blogDetails__right__blog_meta}>
            <Grid container>
              <CalendarMonthOutlinedIcon
                className={classes.ccrt__blogDetails__right__icon}
              />
              <Typography
                style={{ textTransform: "capitalize", fontSize: "90%" }}
              >
                {prettyDate(publishDate)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        style={{ position: "relative", width: "100%", height: 250 }}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Image
          loader={({ src }) => src}
          src={"/" + imageUrl}
          alt="blog-img"
          layout="fill"
          objectFit="cover"
        />
      </Grid>
      <Editor readOnly={true} initialEditorState={description} />
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
            <CustomChip key={tag} title={tag} />
          ))}
        </Grid>
        <Grid item xs={12} lg={6} container>
          <SocialShareComponent
            justifyContent="flex-end"
            link={DOMAIN_ADDRESS + "blogs/" + blogId}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__blogDetails__right__section__mobile: {
    padding: "0 0px",
    marginBottom: 20,
  },
  ccrt__blogDetails__right__section__tablet: {
    padding: "0px 0px 30px",
    marginBottom: 20,
  },
  ccrt__blogDetails__right__section__desktop_Lg: {
    // border: `1px solid ${"black"}`,
    marginBottom: 20,
  },
  ccrt__blogDetails__right__title__mobile: {
    fontSize: "100%",
    textAlign: "justify",
    fontWeight: "700",
    margin: "0 0 13px",
    color: theme.palette.custom.BLACK,
    // color: DEFAULT_COLOR,
  },
  ccrt__blogDetails__right__title_tablet: {
    textAlign: "justify",
    fontSize: "100%",
    // lineHeight: "35px",
    color: theme.palette.custom.BLACK,
    margin: "0 0 13px",
  },
  ccrt__blogDetails__right__blog_meta: {
    fontSize: "75%",
    marginRight: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.custom.GREY,
  },
  ccrt__blogDetails__right__icon: {
    fontSize: "125%",
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
}));

BlogDetailsRight.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.any,
  tags: PropTypes.array.isRequired,
  blogId: PropTypes.string.isRequired,
};

export default BlogDetailsRight;
