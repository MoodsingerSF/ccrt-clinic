import React, { useState } from "react";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Comment from "./Comment";

function* generateId(index) {
  while (true) {
    yield index;
    index++;
  }
}
const getId = generateId(0);

const CommentSection = ({ comments, setComments }) => {
  const classes = useStyles();

  const [value, setValue] = useState("");

  const handleCommentTextfieldValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmitComment = () => {
    const obj = {
      id: getId.next().value,
      comment: value,
    };
    setComments((prev) => [obj, ...prev]);
    setValue("");
  };

  return (
    <Grid container>
      <Grid container className={classes.ccrt_comment_box_section}>
        <Grid container className={classes.ccrt_comment_box_section_avatar}>
          <Avatar sx={{ width: 38, height: 38 }}>H</Avatar>
        </Grid>
        <TextField
          fullWidth
          multiline
          id="standard-basic"
          variant="standard"
          placeholder="Add a comment..."
          value={value}
          onChange={handleCommentTextfieldValue}
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          className={classes.ccrt_comment_box_section_textarea}
        />
        <Grid
          container
          justifyContent={"flex-end"}
          alignItems="center"
          className={classes.ccrt_comment_box_section_comment_button_container}
        >
          <Button
            className={classes.ccrt_comment_box_section_comment_button}
            onClick={handleSubmitComment}
          >
            comment
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.ccrt_comment_section}>
        {comments.map((comment) => (
          <Comment key={comment.id} text={comment.comment} />
        ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  resize: {
    fontSize: "90%",
  },
  ccrt_comment_box_section: {
    position: "relative",
  },
  ccrt_comment_box_section_avatar: {
    position: "absolute",
  },
  ccrt_comment_box_section_textarea: {
    marginLeft: "50px",
  },
  ccrt_comment_box_section_comment_button_container: {
    marginTop: "10px",
  },
  ccrt_comment_box_section_comment_button: {
    background: "rgba(0, 0, 0, 0.05)",
    color: "#909090",
  },
  ccrt_comment_section: {
    marginTop: "10px",
  },
});

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default CommentSection;
