import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CommentSection from "./CommentSection";
import RatingSection from "./RatingSection";

const ReviewSection = () => {
  const classes = useStyles();

  const [comments, setComments] = useState([]);
  return (
    <Grid container spacing={2} className={classes.ccrt_comment__section}>
      <Grid item xs={12} lg={5}>
        <Typography className={classes.ccrt_comment__section__header}>
          0 ratings
        </Typography>
        <RatingSection />
      </Grid>
      <Grid item xs={12} lg={7}>
        <Typography className={classes.ccrt_comment__section__header}>
          {comments.length} comments
        </Typography>
        <CommentSection comments={comments} setComments={setComments} />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt_comment__section: {
    margin: "20px 0",
  },
  ccrt_comment__section__header: {
    fontSize: "100%",
    textTransform: "capitalize",
    marginBottom: "20px",
  },
});
export default ReviewSection;
