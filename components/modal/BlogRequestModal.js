import React from "react";
import { Button, Grid, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import BlogDetailsAuthorCard from "../cards/BlogDetailsAuthorCard";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  overflowY: "scroll",
  height: "100%",
  display: "block",
  bgcolor: "background.paper",
  p: 4,
};

const BlogRequestModal = ({ open, onClose, item }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid
            // container
            item
            lg={4}
            // justifyContent="center"
            // alignContent="center"
          >
            <BlogDetailsAuthorCard name={item.name} avatar={item.avatar} />
          </Grid>
          <Grid container item lg={8}>
            <h3 style={{ fontSize: "110%" }}>{item.title}</h3>
            <Grid container>
              <Image src={item.image} alt="blog-img" />
            </Grid>
            <Grid container>
              <Typography
                style={{
                  textAlign: "justify",
                  margin: "20px 0",
                }}
              >
                {item.description}
              </Typography>
            </Grid>
            <Grid container>
              <Button variant="contained" onClick={onClose}>
                close
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

BlogRequestModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  item: PropTypes.object,
};
export default BlogRequestModal;
