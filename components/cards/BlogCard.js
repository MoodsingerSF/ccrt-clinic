import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createStyles, makeStyles } from "@mui/styles";
import { capitalize } from "lodash";
import { prettyDate } from "../../controllers/DateController";
import dynamic from "next/dynamic";
import CustomChip from "../chip/CustomChip";
const BlogEditorBackdrop = dynamic(() =>
  import("../backdrops/BlogEditorBackdrop")
);
const DashboardBlogsOptionsPopup = dynamic(() =>
  import("../modal/DashboardBlogsOptionsPopup")
);

const BlogCard = ({
  blogId,
  avatar,
  name,
  date,
  image,
  title,
  tags = [],
  description,
  showOptions = false,
  onSuccessfulDelete = () => {},
  openSnackbar = () => {},
}) => {
  const classes = useStyles();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openBlogEditor, setOpenBlogEditor] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      className={classes.ccrt__blog__body__container}
    >
      <Card className={classes.cardRoot}>
        <CardHeader
          avatar={
            <Avatar src={"/" + avatar}>
              {avatar ? null : capitalize(name).charAt(0)}
            </Avatar>
          }
          action={
            showOptions && (
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon className={classes.iconStyle} />
              </IconButton>
            )
          }
          classes={{
            title: classes.ccrt__blog__creator_name,
            subheader: classes.ccrt__blog__subheader,
          }}
          title={name}
          subheader={prettyDate(date)}
        />
        <CardMedia
          style={{ cursor: "pointer", position: "relative", height: 194 }}
          onClick={() => {
            router.push("/blogs/" + blogId);
          }}
        >
          <Image
            loader={({ src }) => src}
            src={"/" + image}
            alt="blog"
            layout="fill"
          />
        </CardMedia>
        <CardContent>
          <Typography
            className={classes.ccrt__blog__content__title}
            onClick={() => {
              router.push("/blogs/" + blogId);
            }}
          >
            {title}
          </Typography>
          <Grid container>
            {tags.map((tag, index) => (
              <CustomChip key={index} title={tag.name} />
            ))}
          </Grid>
        </CardContent>
      </Card>
      {showOptions && (
        <DashboardBlogsOptionsPopup
          anchorEl={anchorEl}
          blogId={blogId}
          onClose={handleClose}
          onSuccessfulDelete={onSuccessfulDelete}
          openSnackbar={openSnackbar}
          openBlogEditor={() => setOpenBlogEditor(true)}
        />
      )}
      {openBlogEditor && (
        <BlogEditorBackdrop
          open={openBlogEditor}
          onClose={() => setOpenBlogEditor(false)}
          openSnackbar={openSnackbar}
          blogId={blogId}
          title={title}
          description={description}
          tags={tags}
          imageUrl={image}
          edit={true}
        />
      )}
    </Grid>
  );
};

BlogCard.propTypes = {
  blogId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.array.isRequired,
  showOptions: PropTypes.bool,
  onSuccessfulDelete: PropTypes.func,
  openSnackbar: PropTypes.func,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__blog__body__container: {
      padding: "5px",

      // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    iconStyle: {
      fontWeight: 500,
      fontSize: "100%",
      color: theme.palette.custom.BLACK,
    },
    ccrt__blog__creator_name: {
      fontWeight: 500,
      fontSize: "80%",
      color: theme.palette.custom.BLACK,

      textTransform: "capitalize",
    },
    ccrt__blog__subheader: {
      fontSize: "70%",
      color: theme.palette.custom.GREY,
    },
    ccrt__blog__content__title: {
      fontWeight: 500,
      fontSize: "90%",
      marginBottom: "5px",
      color: theme.palette.custom.BLACK,

      cursor: "pointer",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2 /* number of lines to show */,
      "-webkit-box-orient": "vertical",
      transition: "color .1s ease-in-out",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    cardRoot: {
      width: "100%",
      // boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      border: `1px solid ${theme.palette.custom.BLACK}`,
    },
    // ccrt__blog__hashtag: {
    //   margin: "5px 3px",
    //   fontSize: "70%",
    //   padding: "3px 3px",
    //   fontWeight: "bold",
    //   background: theme.palette.grey.main,
    //   // border: `1.5px solid ${theme.palette.primary.main}`,
    // },
  })
);

export default BlogCard;
