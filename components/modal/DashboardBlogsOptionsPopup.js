import React, { useState } from "react";
import { Grid, Menu, MenuItem, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ConfirmationModal from "./ConfirmationModal";
import { deleteBlog } from "../../controllers/BlogController";
import LoaderBackdrop from "../backdrops/LoaderBackdrop";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const DashboardBlogsOptionsPopup = ({
  blogId,
  anchorEl,
  onClose,
  openBlogEditor = () => {},
  onSuccessfulDelete = () => {},
  openSnackbar = () => {},
}) => {
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const onConfirmDelete = async () => {
    try {
      setOpenDeleteDialog(false);
      setDeleting(true);
      const isDeleted = await deleteBlog(blogId);
      setDeleting(false);

      if (isDeleted) {
        onSuccessfulDelete();
        openSnackbar("Blog has been deleted successfully.");
      } else {
        openSnackbar("Blog couldn't be deleted. Please try again.");
      }
    } catch (error) {
      setDeleting(false);
      if (error && error.response) {
        openSnackbar(error.response.body.message);
      }
    }
  };
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            onClose();
            openBlogEditor();
          }}
        >
          <Grid container alignItems={"center"}>
            <EditIcon className={classes.iconStyle} />
            <Typography className={classes.titleStyle}>Edit</Typography>
          </Grid>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClose();
            setOpenDeleteDialog(true);
          }}
        >
          <Grid container alignItems={"center"}>
            <DeleteOutlineOutlinedIcon className={classes.iconStyle} />
            <Typography className={classes.titleStyle}>Delete</Typography>
          </Grid>
        </MenuItem>
      </Menu>
      {openDeleteDialog && (
        <ConfirmationModal
          title={`Do you want to delete this blog?`}
          onNegativeFeedback={() => {
            setOpenDeleteDialog(false);
          }}
          onPositiveFeedback={onConfirmDelete}
        />
      )}
      <LoaderBackdrop open={deleting} />
    </>
  );
};

DashboardBlogsOptionsPopup.propTypes = {
  blogId: PropTypes.string.isRequired,
  anchorEl: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  onSuccessfulDelete: PropTypes.func,
  openBlogEditor: PropTypes.func,

  openSnackbar: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  titleStyle: {
    fontSize: "80%",
    fontWeight: 500,
    marginLeft: 5,
    color: theme.palette.custom.BLACK,
  },
  iconStyle: {
    fontSize: "90%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
  },
}));
export default DashboardBlogsOptionsPopup;
