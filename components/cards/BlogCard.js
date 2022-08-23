import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardBlogsOptionsPopup from "../modal/DashboardBlogsOptionsPopup";
import { createStyles, makeStyles } from "@mui/styles";
import { capitalize } from "lodash";
import { prettyDate } from "../../controllers/DateController";

const BlogCard = ({
  blogId,
  avatar,
  name,
  date,
  image,
  title,
  tags = [],
  showOptions = false,
  onSuccessfulDelete = () => {},
  openSnackbar = () => {},
}) => {
  const classes = useStyles();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
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
      alignItems="center"
      className={classes.ccrt__blog__body__container}
    >
      <Card>
        <CardHeader
          avatar={
            <Avatar>{avatar ? avatar : capitalize(name).charAt(0)}</Avatar>
          }
          action={
            showOptions && (
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
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
            src={image}
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
          <Grid container mt={2}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label="#cancer"
                component="a"
                href="#basic-chip"
                clickable
                className={classes.ccrt__blog__hashtag}
              />
            ))}
          </Grid>
        </CardContent>
      </Card>
      <DashboardBlogsOptionsPopup
        anchorEl={anchorEl}
        blogId={blogId}
        onClose={handleClose}
        onSuccessfulDelete={onSuccessfulDelete}
        openSnackbar={openSnackbar}
      />
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
  tags: PropTypes.array.isRequired,
  showOptions: PropTypes.bool,
  onSuccessfulDelete: PropTypes.func,
  openSnackbar: PropTypes.func,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__blog__body__container: {
      padding: "10px",
      // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    ccrt__blog__creator_name: {
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    ccrt__blog__subheader: {
      fontSize: "80%",
    },
    ccrt__blog__content__title: {
      fontWeight: "bold",
      fontSize: "100%",
      marginBottom: "5px",
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
    ccrt__blog__hashtag: {
      margin: "5px 3px",
      fontSize: "70%",
      padding: "3px 3px",
      fontWeight: "bold",
      background: theme.palette.grey.main,
      // border: `1.5px solid ${theme.palette.primary.main}`,
    },
  })
);

export default BlogCard;
