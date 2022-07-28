import React, { useRef, useState } from "react";
import Head from "next/head";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import { DEFAULT_COLOR_MINUS_2 } from "../misc/colors";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const BlogEditor = () => {
  const classes = useStyles();
  const theme = useTheme();
  const inputRef = useRef();

  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  const [titleOkay, setTitleOkay] = useState(true);
  const [tagsOkay, setTagsOkay] = useState(true);

  const [blogTitle, setBlogTitle] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(
    `${"/images/ArtistScreen/logo2.jpg"}`
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [tagLists, setTagLists] = useState([]);
  // const [suggestions, setSuggestions] = useState(["React", "HTML", "CSS"]);
  const suggestions = ["React", "HTML", "CSS"];

  const onCoverPhotoChange = (event) => {
    setCoverPhoto(event.target.files[0]);
    setCoverPhotoPreview(URL.createObjectURL(event.target.files[0]));
  };

  //saving cover photo
  const onSaveCoverPicture = () => {
    if (coverPhoto !== null) {
      setOpenDialog(false);
    }
  };

  const uploadBlog = () => {
    if (blogTitle === "") {
      setTitleOkay(false);
      // return;
    }
    if (tagLists.length === 0) {
      setTagsOkay(false);
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  console.log(tagLists);
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Head>
        <title>Manage Blog</title>
      </Head>

      <Grid container justifyContent="center" alignItems="center">
        <h2>Write your blog</h2>
      </Grid>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        item
        md={10}
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
              error={!titleOkay}
              helperText={titleOkay === false ? "Enter title" : ""}
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
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Choose cover image
              </Button>
              <Typography style={{ paddingLeft: 5, fontSize: "70%" }}>
                {coverPhoto !== null ? (
                  <span> {coverPhoto.name}</span>
                ) : (
                  <span>File not choosen</span>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Editor
          editorState={editorState}
          placeholder="click here to write"
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          wrapperStyle={{
            width: "100%",
          }}
          editorStyle={{
            border: `1px solid ${theme.palette.grey[200]}`,
            fontSize: "80%",
            padding: "20px",
            minHeight: "300px",
            lineHeight: "0",
          }}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />

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
                setTagLists(() => newValue);
              }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Choose at least one hashtag!"
                  error={!tagsOkay}
                  helperText={
                    tagsOkay === false ? "Enter at least one tag" : ""
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
          <Button
            variant="contained"
            size="small"
            className={classes.ccrt__blog__submit__buttonStyle}
            onClick={uploadBlog}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        PaperProps={{
          style: {
            width: "40%",
            height: "80%",
          },
        }}
      >
        <DialogTitle>
          <Typography style={{ color: DEFAULT_COLOR_MINUS_2 }}>
            Choose blog cover image
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component={Grid}
              container
              style={{
                height: "30vh",
                width: "100%",
                backgroundImage: `url(${coverPhotoPreview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
            <Box
              component={Grid}
              container
              item
              onClick={() => {
                if (inputRef && inputRef.current) {
                  inputRef.current.click();
                }
              }}
              style={{
                backgroundColor: DEFAULT_COLOR_MINUS_2,
                borderRadius: 5,
                height: 45,
                cursor: "pointer",
                marginTop: 15,
              }}
              alignItems="center"
              justifyContent="center"
            >
              <AddSharpIcon
                style={{
                  fontSize: "90%",
                  color: "white",
                  marginRight: "10px",
                  fontWeight: "bold",
                }}
              />
              <Typography
                style={{
                  fontSize: "80%",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                Choose
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
          </Grid>
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <Typography
            onClick={() => {
              setOpenDialog(false);
            }}
            style={{
              fontSize: "80%",
              color: "white",
              padding: "7px 20px",
              backgroundColor: DEFAULT_COLOR_MINUS_2,
              borderRadius: 5,
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            cancel
          </Typography>
          <Typography
            onClick={() => {
              onSaveCoverPicture();
            }}
            style={{
              fontSize: "80%",
              color: "white",
              padding: "7px 20px",
              backgroundColor: DEFAULT_COLOR_MINUS_2,
              borderRadius: 5,
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            save
          </Typography>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__blog__editor__container_Md: {
    padding: "20px 50px",
    border: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
  },
  ccrt__blog__editor__container_Mobile: {
    padding: "20px 50px",
  },
  ccrt__blog__title__field_Md: {
    marginRight: "10px",
  },
  ccrt__blog__editor__choose__img__container: {
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: "4px 10px",
    borderRadius: "4px",
  },
  ccrt__blog__submit__buttonStyle: {
    fontSize: "80%",
    padding: "5px 40px",
    marginTop: 10,
    marginBottom: 10,
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
}));
export default BlogEditor;
