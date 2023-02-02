import React from "react";
import { Grid, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlogDetailsAuthorCard from "../../cards/BlogDetailsAuthorCard";
import BlogPopularTags from "./BlogPopularTags";
import PropTypes from "prop-types";

const BlogDetailsLeft = ({ author, tags = [] }) => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid container>
      {matchesMD && (
        <>
          <BlogDetailsAuthorCard name={author.name} avatar={author.avatar} />
          <BlogPopularTags tags={tags} />
        </>
      )}
    </Grid>
  );
};

BlogDetailsLeft.propTypes = {
  author: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
};

export default BlogDetailsLeft;
