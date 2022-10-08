import React from "react";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
// import { useRouter } from "next/router";
import CustomChip from "../../chip/CustomChip";

const BlogPopularTags = ({ tags = [] }) => {
  const classes = useStyles();
  // const theme = useTheme();
  // const router = useRouter();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__blogDetails__tags__container}
    >
      <Typography className={classes.ccrt__blogDetails__popular_tag__title}>
        Popular tags
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        {tags.map((tag) => (
          <CustomChip key={tag} title={tag} />
          // <Chip
          //   key={tag}
          //   onClick={() => {
          //     router.push("/blogs");
          //   }}
          //   label={tag}
          //   className={classes.ccrt__blogDetails__popular_tags}
          // />
        ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__blogDetails__tags__container: {
    margin: "20px 0 0 0",
    padding: "34px 40px",
    // border: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
  },
  ccrt__blogDetails__popular_tag__title: {
    fontSize: "90%",
    fontWeight: 500,
    textTransform: "capitalize",
    paddingBottom: "10px",
    margin: "0 0 20px",
    borderBottom: `1px solid ${theme.palette.custom.BLACK}`,
    color: theme.palette.custom.BLACK,
    width: "100%",
    textAlign: "center",
  },
  // ccrt__blogDetails__popular_tags: {
  //   margin: "5px ",
  //   background: theme.palette.custom.GREEN,
  //   color: "#fff",
  //   transition: "background  0.5s ease",
  //   cursor: "pointer",
  //   "&:hover": {
  //     background: theme.palette.custom.GREEN,
  //   },
  // },
}));

BlogPopularTags.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default BlogPopularTags;
