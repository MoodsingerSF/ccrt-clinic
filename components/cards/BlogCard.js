import React from "react";
import Image from "next/image";
import blog from "../../public/image/blog/blog1.jpeg";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { useStyles } from "../../styles/blogstyle";
import { useRouter } from "next/router";

const BlogCard = ({ blogId }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__blog__body__container}
      onClick={() => {
        router.push("/blogs/" + blogId);
      }}
    >
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Grid container>
          <Card>
            <CardHeader
              avatar={<Avatar>R</Avatar>}
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia height="194">
              <Image src={blog} alt="blog" />
            </CardMedia>
            <CardContent>
              <Typography className={classes.ccrt__blog__content__title}>
                Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
              <Grid container mt={2}>
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Grid container>
          <Card>
            <CardHeader
              avatar={<Avatar>R</Avatar>}
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia height="194">
              <Image src={blog} alt="blog" />
            </CardMedia>
            <CardContent>
              <Typography className={classes.ccrt__blog__content__title}>
                Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
              <Grid container mt={2}>
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Grid container>
          <Card>
            <CardHeader
              avatar={<Avatar>R</Avatar>}
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia height="194">
              <Image src={blog} alt="blog" />
            </CardMedia>
            <CardContent>
              <Typography className={classes.ccrt__blog__content__title}>
                Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
              <Grid container mt={2}>
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Grid container>
          <Card>
            <CardHeader
              avatar={<Avatar>R</Avatar>}
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia height="194">
              <Image src={blog} alt="blog" />
            </CardMedia>
            <CardContent>
              <Typography className={classes.ccrt__blog__content__title}>
                Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
              <Grid container mt={2}>
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
                <Chip
                  label="#cancer"
                  size="small"
                  component="a"
                  href="#basic-chip"
                  clickable
                  className={classes.ccrt__blog__hashtag}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BlogCard;
