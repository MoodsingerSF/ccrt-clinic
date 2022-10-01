import React, { useState } from "react";
import {
  Avatar,
  Chip,
  Grid,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import { createStyles, makeStyles } from "@mui/styles";
import BlogRequestModal from "../../modal/BlogRequestModal";
import PropTypes from "prop-types";
import { capitalize } from "lodash";
import { acceptBlog, rejectBlog } from "../../../controllers/BlogController";
import ActionButton from "../../button/ActionButton";
// import { SNACKBAR_INITIAL_STATE } from "../../../misc/constants";
const BlogRequestRow = ({
  avatar,
  creatorName,
  title,
  status,
  // eslint-disable-next-line no-unused-vars
  blogId,
  description,
  imageUrl,
  tags,
  openSnackbar,
  handleLoadingOpen,
  handleLoadingClose,
}) => {
  const classes = useStyle();

  const [blogReqModalOpen, setBlogReqModalOpen] = useState(false);

  const handleOpenBlogReqModal = () => setBlogReqModalOpen(true);
  const handleCloseBlogReqModal = () => setBlogReqModalOpen(false);

  const handleAcceptBlog = async () => {
    try {
      handleLoadingOpen();
      const isAccepted = await acceptBlog(blogId);
      if (isAccepted) {
        openSnackbar("Blog has been accepted successfully.");
      } else {
        openSnackbar(
          "Operation couldn't be performed. Please try again later."
        );
      }
      handleLoadingClose();
    } catch (error) {
      if (error && error.response) {
        openSnackbar(
          "Operation couldn't be performed. Please try again later. " +
            error.response.body.message
        );
      }
      handleLoadingClose();
    }
  };
  const handleRejectBlog = async () => {
    try {
      handleLoadingOpen();
      const isRejected = await rejectBlog(blogId);
      if (isRejected) {
        openSnackbar("Blog has been rejected successfully.");
      } else {
        openSnackbar(
          "Operation couldn't be performed. Please try again later."
        );
      }
      handleLoadingClose();
    } catch (error) {
      if (error && error.response) {
        openSnackbar(
          "Operation couldn't be performed. Please try again later. " +
            error.response.body.message
        );
      }
      handleLoadingClose();
    }
  };

  return (
    <>
      <TableRow className={classes.rowContainer}>
        <TableCell>
          <Grid container>
            <Grid item lg={2}>
              <Avatar
                className={classes.ccrt__dashboard__blog__request__avatar}
                src={"/" + avatar}
              ></Avatar>
            </Grid>
            <Grid
              item
              lg={10}
              className={classes.ccrt__dashboard__blog__request__name}
            >
              <Typography className={classes.nameStyle}>
                {capitalize(creatorName)}
              </Typography>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align="center">
          <Grid
            container
            className={classes.ccrt__dashboard__blog__request__title}
          >
            <Typography className={classes.titleStyle}>{title}</Typography>
          </Grid>
        </TableCell>
        <TableCell align="right">
          <Chip
            label={status}
            size="small"
            className={classes.ccrt__dashboard__blog__request__status}
          />
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Accept the blog">
            <ActionButton
              type="success"
              title="Accept"
              icon={<DoneIcon />}
              onClick={handleAcceptBlog}
            />
          </Tooltip>

          <Tooltip title="Reject the blog">
            <ActionButton
              type="error"
              title="Reject"
              icon={<ClearIcon />}
              onClick={handleRejectBlog}
            />
          </Tooltip>
          <Tooltip title="View Blog">
            <ActionButton
              type="info"
              title="View Blog"
              icon={<VisibilityIcon />}
              onClick={handleOpenBlogReqModal}
            />
          </Tooltip>
        </TableCell>
      </TableRow>

      <BlogRequestModal
        open={blogReqModalOpen}
        onClose={handleCloseBlogReqModal}
        avatar={avatar}
        creatorName={creatorName}
        title={title}
        description={description}
        imageUrl={imageUrl}
        tags={tags}
      />
    </>
  );
};
BlogRequestRow.propTypes = {
  blogId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  creatorName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  handleLoadingOpen: PropTypes.func.isRequired,
  handleLoadingClose: PropTypes.func.isRequired,
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
      // width: "200px",
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
    textStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "90%",
      fontWeight: 500,
    },
    nameStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "90%",
      fontWeight: 500,
      textTransform: "capitalize",
      marginLeft: 10,
    },
    titleStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "90%",
      fontWeight: 500,
      textTransform: "capitalize",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    rowContainer: {
      height: 60,
      borderBottom: `1.1px solid ${theme.palette.custom.BLACK}`,
    },
  })
);

export default BlogRequestRow;
