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
import { useStyles } from "../../styles/blogstyle";
import PropTypes from "prop-types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardBlogsOptionsPopup from "../modal/DashboardBlogsOptionsPopup";

const BlogCard = ({
  blogId,
  avatar,
  name,
  date,
  image,
  title,
  description,
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
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Grid container mt={2}>
            <Chip
              label="#cancer"
              // size="small"
              component="a"
              href="#basic-chip"
              clickable
              className={classes.ccrt__blog__hashtag}
            />
            <Chip
              label="#cancer"
              // size="small"
              component="a"
              href="#basic-chip"
              clickable
              className={classes.ccrt__blog__hashtag}
            />
            <Chip
              label="#cancer"
              // size="small"
              component="a"
              href="#basic-chip"
              clickable
              className={classes.ccrt__blog__hashtag}
            />
          </Grid>
        </CardContent>
      </Card>
      {openOptionsPopup && <DashboardBlogsOptionsPopup blogId={blogId} />}
    </Grid>
  );
};

export default BlogCard;
BlogCard.propTypes = {
  blogId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showOptions: PropTypes.bool,
};
