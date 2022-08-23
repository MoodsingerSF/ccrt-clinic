import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import ConfirmationModal from "./ConfirmationModal";
import { deleteBlog } from "../../controllers/BlogController";
import LoaderBackdrop from "../backdrops/LoaderBackdrop";

const DashboardBlogsOptionsPopup = ({
  blogId,
  anchorEl,
  onClose,
  onSuccessfulDelete = () => {},
  openSnackbar = () => {},
}) => {
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
        <MenuItem onClick={onClose}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            onClose();
            setOpenDeleteDialog(true);
          }}
        >
          Delete
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
  openSnackbar: PropTypes.func,
};
export default DashboardBlogsOptionsPopup;
