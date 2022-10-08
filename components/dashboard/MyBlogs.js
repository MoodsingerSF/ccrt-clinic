import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import BlogCard from "../cards/BlogCard";
import { makeStyles } from "@mui/styles";
import { retrieveUserId } from "../../controllers/LocalStorageController";
// import LoaderComponent from "../misc/LoaderComponent";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import {
  DASHBOARD_TITLE_MARGIN_TOP,
  SNACKBAR_INITIAL_STATE,
} from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import { retrieveUserBlogs } from "../../controllers/BlogController";
import DashboardTitle from "./DashboardTitle";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import BlogEditorBackdrop from "../backdrops/BlogEditorBackdrop";
import DashboardLoaderComponent from "./DashboardLoaderComponent";
// import { prettyDate } from "../../controllers/DateController";
const MyBlogs = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const [blogs, setBlogs] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [hasMore, setHasMore] = useState(true);
  const [openBlogEditor, setOpenBlogEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const retrieveBlogs = async (page) => {
    try {
      setLoading(true);
      const temp = await retrieveUserBlogs(retrieveUserId(), page, 15);
      if (temp.data.length === 0) {
        setHasMore(false);
      }
      if (page === 0) setBlogs(temp.data);
      else setBlogs((prev) => [...prev, ...temp.data]);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieveBlogs(page);
  }, [page]);
  const onSuccessfulDelete = (blogId) => {
    setBlogs((prev) => prev.filter((item) => item.blogId !== blogId));
  };
  return (
    <Grid container>
      {!loading && (
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: 20, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
        >
          <Grid container item sm={6}>
            <DashboardTitle title={"My Blogs"} />
          </Grid>
          <Grid container item sm={3}>
            <Typography
              onClick={() => {
                setOpenBlogEditor(true);
              }}
              className={classes.ccrt__dashboard__blogs__create__blog__link}
            >
              Create new blog
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid container style={{ marginBottom: 20 }}>
        {!loading ? (
          blogs.length === 0 ? (
            <NoContentToShowComponent />
          ) : (
            blogs.map((blog) => {
              return (
                <Grid
                  container
                  key={blog.blogId}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  className={classes.ccrt__dashboard_blogs__wrapper}
                >
                  <BlogCard
                    blogId={blog.blogId}
                    avatar={blog.avatar}
                    name={blog.fullName}
                    date={blog.creationTime}
                    image={blog.imageUrl}
                    title={blog.title}
                    description={blog.description}
                    tags={blog.tags}
                    showOptions={true}
                    onSuccessfulDelete={() => {
                      onSuccessfulDelete(blog.blogId);
                    }}
                    openSnackbar={(message) => {
                      handleSnackbarOpen(message, setSnackbar);
                    }}
                  />
                </Grid>
              );
            })
          )
        ) : (
          <DashboardLoaderComponent />
        )}
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
      <BlogEditorBackdrop
        open={openBlogEditor}
        onClose={() => {
          setOpenBlogEditor(false);
        }}
        openSnackbar={(message) => {
          handleSnackbarOpen(message, setSnackbar);
        }}
        onSuccessfulCreation={(blog) => {
          setBlogs((prev) => [blog, ...prev]);
        }}
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__dashboard_blogs__wrapper: {
    position: "relative",
  },
  ccrt__dashboard_blogs__card__right__icon: {
    position: "absolute",
    top: "4%",
    right: "4%",
    cursor: "pointer",
  },
  ccrt__dashboard__blogs__create__blog__link: {
    textDecoration: "none",
    background: theme.palette.custom.BLACK,
    fontSize: "80%",
    width: "100%",
    textAlign: "center",
    color: "#fff",
    textTransform: "capitalize",
    padding: "10px 20px",
    fontWeight: "500",
    borderRadius: 5,
    cursor: "pointer",
  },
}));
export default MyBlogs;
