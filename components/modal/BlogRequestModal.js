import React from "react";
import { Chip, Grid, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import BlogDetailsAuthorCard from "../cards/BlogDetailsAuthorCard";
import Image from "next/image";
import ModalBodyWrapper from "./ModalBodyWrapper";
import Editor from "../text-editor/Editor";
const BlogRequestModal = ({
  open,
  onClose,
  avatar,
  creatorName,
  title,
  description,
  imageUrl,
  tags,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBodyWrapper onClose={onClose}>
        {/* <Grid container alignItems="flex-start"> */}
        <Grid item lg={4}>
          <BlogDetailsAuthorCard name={creatorName} avatar={avatar} />
        </Grid>
        <Grid container item lg={8}>
          <Typography style={{ fontSize: "140%", fontWeight: "bold" }}>
            {title}
          </Typography>
          <Grid
            container
            spacing={1}
            style={{
              marginTop: 5,
              marginBottom: 20,
              // background: "red",
              marginLeft: 1,
            }}
          >
            {tags.map((tag) => (
              <Chip
                style={{
                  marginRight: 5,
                  fontSize: "80%",
                  padding: "0px 5px",
                  fontWeight: "600",
                  border: "1px solid grey",
                }}
                key={tag}
                label={tag}
              />
            ))}
          </Grid>

          <Grid container style={{ position: "relative" }}>
            <Image
              loader={({ src }) => src}
              src={imageUrl}
              alt="blog-img"
              layout="fill"
            />
          </Grid>
          <Editor readOnly={true} initialEditorState={description} />
        </Grid>
        {/* </Grid> */}
      </ModalBodyWrapper>
    </Modal>
  );
};

BlogRequestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  creatorName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};
export default BlogRequestModal;
