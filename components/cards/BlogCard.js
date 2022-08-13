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

const BlogCard = ({
  blogId,
  avatar,
  name,
  date,
  image,
  title,
  tags = [],
  showOptions = false,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const [openOptionsPopup, setOpenOptionsPopup] = useState(false);

  const handleClickOpenOptionsPopup = () => {
    setOpenOptionsPopup(!openOptionsPopup);
  };

  // const handleCloseOptionsPopup = () => {
  //   setOpenOptionsPopup(false);
  // };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__blog__body__container}
    >
      <Card>
        <CardHeader
          avatar={<Avatar>{avatar}</Avatar>}
          action={
            showOptions && (
              <IconButton
                aria-label="settings"
                onClick={handleClickOpenOptionsPopup}
              >
                <MoreVertIcon />
              </IconButton>
            )
          }
          classes={{
            title: classes.ccrt__blog__creator_name,
            subheader: classes.ccrt__blog__subheader,
          }}
          title={name}
          subheader={date}
        />
        <CardMedia
          height="194"
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/blogs/" + blogId);
          }}
        >
          <Image src={image} alt="blog" />
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
          {/* <Typography variant="body2" color="text.secondary">
            {description}
          </Typography> */}
          <Grid container mt={2}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label="#cancer"
                // size="small"
                component="a"
                href="#basic-chip"
                clickable
                className={classes.ccrt__blog__hashtag}
              />
            ))}
          </Grid>
        </CardContent>
      </Card>
      {openOptionsPopup && <DashboardBlogsOptionsPopup blogId={blogId} />}
    </Grid>
  );
};

BlogCard.propTypes = {
  blogId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  showOptions: PropTypes.bool,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__blog__body__container: {
      padding: "10px",
      // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    ccrt__blog__creator_name: {
      fontWeight: "bold",
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
