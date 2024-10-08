import React, { useState } from "react";
import {
  Avatar,
  Chip,
  Grid,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
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
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
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
      <TableRow>
        <TableCell align="left">
          <Grid
            container
            style={{ width: matchesMd ? "15vw" : matchesSm ? "25vw" : "50vw" }}
            alignItems="center"
          >
            <Grid item xs={2}>
              <Avatar
                className={classes.ccrt__dashboard__blog__request__avatar}
                src={"/" + avatar}
              ></Avatar>
            </Grid>
            <Grid
              item
              xs={10}
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
            justifyContent={"center"}
            alignItems="center"
            style={{ width: matchesMd ? "15vw" : matchesSm ? "25vw" : "50vw" }}
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
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            style={{ width: matchesMd ? "30vw" : matchesSm ? "50vw" : "80vw" }}
            spacing={0.5}
          >
            <Grid item>
              <Tooltip title="Accept the blog">
                <ActionButton
                  type="success"
                  title="Accept"
                  icon={<DoneIcon />}
                  onClick={handleAcceptBlog}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Reject the blog">
                <ActionButton
                  type="error"
                  title="Reject"
                  icon={<ClearIcon />}
                  onClick={handleRejectBlog}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="View Blog">
                <ActionButton
                  type="info"
                  title="View Blog"
                  icon={<VisibilityIcon />}
                  onClick={handleOpenBlogReqModal}
                />
              </Tooltip>
            </Grid>
          </Grid>
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
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 1 /* number of lines to show */,
      "-webkit-box-orient": "vertical",
    },
    rowContainer: {
      height: 60,
      borderBottom: `1.1px solid ${theme.palette.custom.BLACK}`,
    },
  })
);

export default BlogRequestRow;
