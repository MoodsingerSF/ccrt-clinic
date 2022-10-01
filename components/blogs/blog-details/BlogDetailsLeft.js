import React from "react";
import { Grid, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
// import SearchIcon from "@mui/icons-material/Search";
import BlogDetailsAuthorCard from "../../cards/BlogDetailsAuthorCard";
import BlogPopularTags from "./BlogPopularTags";
import PropTypes from "prop-types";
// import { makeStyles } from "@mui/styles";
// import { DEFAULT_COLOR_MINUS_2 } from "../../../misc/colors";

const BlogDetailsLeft = ({ author, tags = [] }) => {
  // const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid container>
      {/* <Grid container className={classes.ccrt__blogDetails__search__container}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search here"
          className={classes.ccrt__blogDetails__searchField}
        />
        <span className={classes.ccrt__blog__details__search__button}>
          <SearchIcon />
        </span>
      </Grid> */}
      {matchesMD && (
        <>
          <BlogDetailsAuthorCard name={author.name} avatar={author.avatar} />
          <BlogPopularTags tags={tags} />
        </>
      )}
    </Grid>
  );
};

// const useStyles = makeStyles({
//   ccrt__blogDetails__search__container: {
//     position: "relative",
//     marginBottom: 10,
//   },
//   ccrt__blogDetails__searchField: {
//     paddingRight: "25px",
//   },
//   ccrt__blog__details__search__button: {
//     position: "absolute",
//     right: "0",
//     background: DEFAULT_COLOR_MINUS_2,
//     color: "white",
//     padding: "4.3px 6px",
//     cursor: "pointer",
//     borderTopRightRadius: "5px",
//     borderBottomRightRadius: "5px",
//   },
// });

BlogDetailsLeft.propTypes = {
  author: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
};

export default BlogDetailsLeft;
