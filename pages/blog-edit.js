import React, { useContext, useRef, useState } from "react";
import Head from "next/head";
import {
  Autocomplete,
  Box,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import { DEFAULT_COLOR_MINUS_2 } from "../misc/colors";
import Editor from "../components/text-editor/Editor";
import CustomButton from "../components/button/CustomButton";
import Image from "next/image";
import {
  isBlogTitleCorrect,
  isCoverPhotoCorrect,
  isTagListCorrect,
} from "../controllers/BlogController";
import { createBlog } from "../controllers/BlogController";
import { Context } from "../contexts/user-context/UserContext";
import { SNACKBAR_INITIAL_STATE } from "../misc/constants";
import CustomSnackbar from "../components/snackbar/CustomSnackbar";
import { handleSnackbarClose, handleSnackbarOpen } from "../misc/functions";

const BlogEditor = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { getUserId } = useContext(Context);
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  const inputRef = useRef();
  const editorStateRef = useRef();

  const [blogTitle, setBlogTitle] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(
    `${"/images/ArtistScreen/logo2.jpg"}`
  );
  const [tagList, setTagList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);

  const suggestions = ["React", "HTML", "CSS"];

  const onCoverPhotoChange = (event) => {
    setCoverPhoto(event.target.files[0]);
    setCoverPhotoPreview(URL.createObjectURL(event.target.files[0]));
  };

  const validateInputs = () => {
    const isCorrect =
      isBlogTitleCorrect(blogTitle) &&
      isTagListCorrect(tagList) &&
      isCoverPhotoCorrect(coverPhoto) &&
      editorStateRef.current !== null;
    return isCorrect;
  };
  const createBlogHandler = async () => {
    try {
      setLoading(true);
      const response = await createBlog(
        blogTitle,
        JSON.stringify(editorStateRef.current),
        getUserId(),
        coverPhoto,
        tagList
      );
      if (response.status === 200) {
        handleSnackbarOpen("Blog has been created successfully.", setSnackbar);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        handleSnackbarOpen(error.response.data.message, setSnackbar);
      }
    }
  };
  const handleBlogUpload = () => {
    if (!validateInputs()) {
      setError(true);
      return;
    }
    createBlogHandler();
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__blog__editor__container}
    >
      <Head>
        <title>Manage Blog</title>
      </Head>

      <Grid container justifyContent="center" alignItems="center">
        <h2>Write your blog</h2>
      </Grid>

      {coverPhoto !== null && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "30vh", width: "60vw", position: "relative" }}
        >
          <Image
            loader={(src) => src}
            src={coverPhotoPreview}
            layout="fill"
            objectFit="contain"
          />
        </Grid>
      )}

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        item
        className={classNames({
          [classes.ccrt__blog__editor__container_Mobile]: !matchesMd,
          [classes.ccrt__blog__editor__container_Md]: matchesMd,
        })}
      >
        <Grid container item md={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            item
            md={6}
            mb={2}
          >
            <TextField
              fullWidth
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              error={error && !isBlogTitleCorrect(blogTitle)}
              helperText={
                error && !isBlogTitleCorrect(blogTitle)
                  ? "Title can not be empty"
                  : ""
              }
              label="Write your blog title here"
              variant="outlined"
              size="small"
              className={classNames({
                [classes.ccrt__blog__title__field_mobile]: !matchesMd,
                [classes.ccrt__blog__title__field_Md]: matchesMd,
              })}
            />
          </Grid>
          <Grid container item md={6} mb={2}>
            <Grid
              container
              alignItems="center"
              className={classes.ccrt__blog__editor__choose__img__container}
            >
              <Box
                component={Grid}
                container
                item
                onClick={() => {
                  if (inputRef && inputRef.current) {
                    inputRef.current.click();
                  }
                }}
                className={classes.ccrt__blog__editor__image__button}
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  className={classes.ccrt__blog__editor__image__add_icon__text}
                >
                  Choose Cover Image
                </Typography>
                <input
                  ref={inputRef}
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={onCoverPhotoChange}
                  hidden
                />
              </Box>
              <Typography style={{ paddingLeft: 5, fontSize: "70%" }}>
                {coverPhoto !== null ? (
                  <span> {coverPhoto.name}</span>
                ) : (
                  <span>File is not chosen</span>
                )}
              </Typography>
            </Grid>
            {error && !isCoverPhotoCorrect(coverPhoto) && (
              <Typography className={classes.error_text}>
                You must choose a cover photo
              </Typography>
            )}
          </Grid>
        </Grid>

        <Editor editorStateRef={editorStateRef} />

        <Grid
          container
          item
          xs={12}
          style={{ position: "relative", margin: "10px 0" }}
        >
          <Grid container>
            <Autocomplete
              fullWidth
              size="small"
              multiple
              id="tags-outlined"
              options={suggestions}
              getOptionLabel={(option) => option}
              onChange={(event, newValue) => {
                setTagList(() => newValue);
              }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="You must choose at-least one tag."
                  error={error && !isTagListCorrect(tagList)}
                  helperText={
                    error && !isTagListCorrect(tagList)
                      ? "Enter at least one tag"
                      : ""
                  }
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <CustomButton
            loading={loading}
            onClick={handleBlogUpload}
            title="Submit"
          />
        </Grid>
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

const useStyles = makeStyles((theme) => ({
  ccrt__blog__editor__section: {
    height: "100vh",
  },
  ccrt__blog__editor__container_Md: {
    padding: "20px 50px",
  },
  ccrt__blog__editor__container_Mobile: {
    padding: "20px ",
  },
  ccrt__blog__title__field_Md: {
    marginRight: "10px",
  },
  ccrt__blog__editor__choose__img__container: {
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: "4px 10px",
    borderRadius: "4px",
  },
  ccrt__blog__editor__image__add_icon: {
    fontSize: "90%",
    color: "white",
    marginRight: "10px",
    fontWeight: "bold",
  },
  ccrt__blog__editor__image__add_icon__text: {
    fontSize: "80%",
    color: "white",
    textTransform: "Capitalize",
  },
  ccrt__blog__editor__image__button: {
    backgroundColor: DEFAULT_COLOR_MINUS_2,
    borderRadius: 5,
    height: 45,
    width: 200,
    cursor: "pointer",

    // marginTop: 15,
  },
  ccrt__blog__editor__choose__img__bottom__container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px",
  },
  ccrt__blog__editor__choose__img__cancel__button: {
    fontSize: "80%",
    color: "white",
    padding: "7px 20px",
    backgroundColor: DEFAULT_COLOR_MINUS_2,
    borderRadius: 5,
    cursor: "pointer",
    textTransform: "uppercase",
  },
  ccrt__blog__editor__choose__img__save__button: {
    fontSize: "80%",
    color: "white",
    padding: "7px 20px",
    backgroundColor: DEFAULT_COLOR_MINUS_2,
    borderRadius: 5,
    cursor: "pointer",
    textTransform: "uppercase",
  },
  ccrt__blog__hashtag__textfield: {
    cursor: "pointer",
    padding: "10px 15px",
    "&:hover": {
      background: theme.palette.grey[200],
    },
  },
  ccrt__blog__hashtag__suggestions__container: {
    position: "absolute",
    marginTop: "50px",
    zIndex: "99",
    background: theme.palette.grey[100],
  },
  error_text: {
    fontSize: "70%",
    color: theme.palette.error.main,
  },
}));
export default BlogEditor;
