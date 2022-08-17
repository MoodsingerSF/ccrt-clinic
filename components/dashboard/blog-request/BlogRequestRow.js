import React, { useState } from "react";
import {
  Avatar,
  Chip,
  Grid,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import { createStyles, makeStyles } from "@mui/styles";
import BlogRequestModal from "../../modal/BlogRequestModal";

const BlogRequestRow = ({ item }) => {
  const classes = useStyle();

  const [blogReqModalOpen, setBlogReqModalOpen] = useState(false);

  const handleOpenBlogReqModal = () => setBlogReqModalOpen(true);
  const handleCloseBlogReqModal = () => setBlogReqModalOpen(false);

  const handleAcceptBlog = () => {
    // Write function => Accept the blog and remove It from The table.
  };
  const handleDeleteBlog = () => {
    // Write function => Delete the blog and remove It from The table.
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Grid container>
            <Grid item lg={2}>
              <Avatar
                className={classes.ccrt__dashboard__blog__request__avatar}
              >
                {item.avatar}
              </Avatar>
            </Grid>
            <Grid
              item
              lg={10}
              className={classes.ccrt__dashboard__blog__request__name}
            >
              {item.name}
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align="center">
          <Grid
            container
            className={classes.ccrt__dashboard__blog__request__title}
          >
            {item.title}
          </Grid>
        </TableCell>
        <TableCell align="right">
          <Chip
            label={item.status}
            size="small"
            className={classes.ccrt__dashboard__blog__request__status}
          />
        </TableCell>
        <TableCell align="right">
          <IconButton
            size="small"
            className={classes.ccrt__dashboard__blog__request__view_icon}
            onClick={handleOpenBlogReqModal}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="success" onClick={handleAcceptBlog}>
            <DoneIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={handleDeleteBlog}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
      <BlogRequestModal
        open={blogReqModalOpen}
        onClose={handleCloseBlogReqModal}
        item={item}
      />
    </>
  );
};
const useStyle = makeStyles((theme) =>
  createStyles({
    ccrt__dashboard__blog__request__avatar: {
      width: "30px",
      height: "30px",
    },
    ccrt__dashboard__blog__request__title: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "200px",
      display: "block",
      overflow: "hidden",
    },
    ccrt__dashboard__blog__request__name: {
      marginTop: "5px",
    },
    ccrt__dashboard__blog__request__status: {
      background: theme.palette.primary.main_minus_2,
      color: "#ffffff",
      fontSize: "80%",
    },
    ccrt__dashboard__blog__request__view_icon: {
      color: "#8457AC",
    },
  })
);

export default BlogRequestRow;
