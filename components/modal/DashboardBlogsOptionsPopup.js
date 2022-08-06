import React, { useState } from "react";
// import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";
// import { blogData } from "../../data/blog/data";

const DashboardBlogsOptionsPopup = ({ blogId }) => {
  const classes = useStyles();
  // const router = useRouter();

  const [confirmOption, setConfirmOption] = useState(false);

  const handleOpenConfirmOptionModel = () => {
    setConfirmOption(true);
  };

  const handleCloseConfirmOptionModel = () => setConfirmOption(false);

  const handleEditBlog = () => {};

  const handleDeleteBlogs = () => {
    // blogData.filter((blog) => blog.blogId !== blogId);
    // console.log(blogId);
    setConfirmOption(false);
  };

  return (
    <Grid
      container
      className={classes.ccrt__dashboard_blogs__card__right__icon__popup}
    >
      <Grid container>
        <ul
          className={
            classes.ccrt__dashboard_blogs__card__right__icon__popup__ul
          }
        >
          <li
            onClick={handleEditBlog}
            className={
              classes.ccrt__dashboard_blogs__card__right__icon__popup__li
            }
          >
            Edit
          </li>
          <li
            onClick={handleOpenConfirmOptionModel}
            className={
              classes.ccrt__dashboard_blogs__card__right__icon__popup__li
            }
          >
            Delete
          </li>
        </ul>
      </Grid>
      {confirmOption && (
        <ConfirmationModal
          title={`Do you want to delete this blog?`}
          onNegativeFeedback={handleCloseConfirmOptionModel}
          onPositiveFeedback={handleDeleteBlogs}
        />
      )}
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard_blogs__card__right__icon__popup: {
    position: "absolute",
    top: "13%",
    right: "3%",
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    width: "40%",
  },
  ccrt__dashboard_blogs__card__right__icon__popup__ul: {
    listStyle: "none",
    width: "100%",
    padding: "0",
    margin: "0",
  },
  ccrt__dashboard_blogs__card__right__icon__popup__li: {
    width: "100%",
    padding: "5px",
    cursor: "pointer",
    "&:hover": {
      background: "#eeeeee",
    },
  },
});
export default DashboardBlogsOptionsPopup;
