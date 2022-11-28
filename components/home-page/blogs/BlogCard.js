import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
// import CustomChip from "../../chip/CustomChip";

const BlogCard = ({ image, name, tags, blogId, date }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Grid container onClick={() => router.push("/blogs/" + blogId)}>
      <Grid container className={classes.ccrt__home__blog__img__container}>
        <Image src={"/" + image} alt={name} layout="fill" objectFit="cover" />
      </Grid>

      <Grid
        container
        direction={"column"}
        justifyContent="center"
        alignItems="center"
        className={classes.ccrt__home__blog__description__container}
      >
        <Grid container style={{ marginTop: 10, padding: "0px 0px" }}>
          {tags.map((item) => (
            <Typography className={classes.tagStyle} key={item}>
              {item}
            </Typography>
          ))}
        </Grid>
        <Typography className={classes.ccrt__home__blog__textStyle}>
          {name}
        </Typography>
        <Grid container>
          <Typography className={classes.dateStyle}>{date}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__home__blog__img__container: {
      position: "relative",
      // height: "30vh",
      aspectRatio: 1.5,
      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      // borderLeft: `1px solid ${theme.palette.custom.GREEN}`,
      // borderRight: `1px solid ${theme.palette.custom.GREEN}`,
      // borderBottom: `1px solid ${theme.palette.custom.GREEN}`,
      // borderTopLeftRadius: 5,
      // borderTopRightRadius: 5,
      borderRadius: 5,
      overflow: "hidden",
      cursor: "pointer",
    },
    ccrt__home__blog__description__container: {
      // borderLeft: `1px solid ${theme.palette.custom.GREEN}`,
      // borderRight: `1px solid ${theme.palette.custom.GREEN}`,
      // borderBottom: `1px solid ${theme.palette.custom.GREEN}`,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
    ccrt__home__blog__textStyle: {
      fontSize: "90%",
      // fontWeight: "bold",
      // textTransform: "uppercase",
      // padding: "10px",
      paddingTop: 7,
      textAlign: "start",
      cursor: "pointer",
      color: theme.palette.custom.BLACK,
    },
    tagStyle: {
      fontSize: "70%",
      color: theme.palette.custom.GREY,
      marginRight: 5,
      border: `.3px solid ${theme.palette.custom.GREY}`,
      borderRadius: 30,
      padding: "1px 10px",
    },
    dateStyle: {
      fontSize: "75%",
      color: theme.palette.custom.GREY,
      marginTop: 5,
    },
  })
);
BlogCard.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  blogId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
export default BlogCard;
