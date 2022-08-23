import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import BlogCard from "../cards/BlogCard";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import { retrieveUserId } from "../../controllers/LocalStorageController";
import LoaderComponent from "../misc/LoaderComponent";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import {
  DASHBOARD_TITLE_MARGIN_TOP,
  SNACKBAR_INITIAL_STATE,
} from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import { retrieveUserBlogs } from "../../controllers/BlogController";
import DashboardTitle from "./DashboardTitle";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
const DashboardBlogs = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const [blogs, setBlogs] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [hasMore, setHasMore] = useState(true);
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
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: 10, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
      >
        <Grid container item sm={6}>
          <DashboardTitle title={"My Blogs"} />
        </Grid>
        <Grid container item sm={3}>
          <Link href="/blog-edit">
            <a className={classes.ccrt__dashboard__blogs__creat__blog__link}>
              Create new blog
            </a>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
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
          <LoaderComponent />
        )}
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard_blogs__wrapper: {
    position: "relative",
  },
  ccrt__dashboard_blogs__card__right__icon: {
    position: "absolute",
    top: "4%",
    right: "4%",
    cursor: "pointer",
  },
  ccrt__dashboard__blogs__creat__blog__link: {
    textDecoration: "none",
    background: DEFAULT_COLOR_MINUS_2,
    fontSize: "80%",
    width: "100%",
    textAlign: "center",
    color: "#fff",
    textTransform: "capitalize",
    padding: "10px 20px",
    fontWeight: "500",
    borderRadius: 5,
  },
});
export default DashboardBlogs;
