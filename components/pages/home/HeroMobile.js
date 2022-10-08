import React from "react";
// import Image from "next/image";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
// import appoinment from "../../../public/image/home-page/hero/appoinment.png";
import PhoneIcon from "@mui/icons-material/Phone";
import { HOTLINE_BACKGROUND } from "../../../misc/colors";
import { HOTLINE, PHONE_CODE } from "../../../data/home/data";
// import Image from "next/image";
// import hero from "../../../public/image/home-page/hero/Cover.png";

const HeroMobile = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      style={{
        height: "100vh",
        paddingTop: "15vh",
        background: `linear-gradient(to right,rgba(255,255,255,.5),rgba(255,255,255,.5)),url(../image/home-page/hero/Cover.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        style={{
          width: "95%",
        }}
      >
        <Grid container>
          <TextField
            fullWidth
            className={classes.ccrt__home_page__search_field}
            size="small"
            placeholder="search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          container
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          style={{ marginTop: 50 }}
        >
          <Typography className={classes.cover_header_1}>Cancer</Typography>
          <Typography className={classes.cover_header_2}>support</Typography>
          <Typography className={classes.cover_sub_header}>is just</Typography>
          <Typography className={classes.cover_sub_header}>
            a click away
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid
        container
        justifyContent={"flex-start"}
        alignItems="center"
        className={classes.ccrt__book__appoinment__image_wrapper}
      >
        <Grid container className={classes.ccrt__book__appoinment__image}>
          <Image
            src={appoinment}
            alt="book a appoinment"
            layout="fill"
            objectFit="contain"
          />
        </Grid>
      </Grid> */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        // item
        // xs={12}
        className={classes.ccrt__home_page__hotline__container}
      >
        <Grid container style={{ width: "95%" }}>
          <Grid
            item
            xs={12}
            className={classes.ccrt__home_page__hotline__textfield__wrapper}
          >
            <TextField
              className={classes.ccrt__home_page__hotline__textfield}
              size="small"
              fullWidth
              placeholder="YOUR PHONE NUMBER"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography style={{ fontSize: "80%" }}>
                      {PHONE_CODE}
                    </Typography>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      style={{}}
                      className={
                        classes.ccrt__home_page__hotline__textfield__button
                      }
                    >
                      <Avatar
                        sx={{ width: 23, height: 23 }}
                        className={
                          classes.ccrt__home_page__hotline__textfield__button__avatar
                        }
                      >
                        <PhoneIcon
                          className={
                            classes.ccrt__home_page__hotline__phone__icon
                          }
                          fontSize="small"
                        />
                      </Avatar>
                      call
                    </Button>
                  </InputAdornment>
                ),
                classes: { notchedOutline: classes.noBorder },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent={"center"}
            alignItems="center"
            style={{ margin: "5px 0px" }}
          >
            <PhoneIcon
              className={classes.ccrt__home_page__hotline__another__phone_icon}
            />
            <Typography className={classes.ccrt__home_page__hotline__textStyle}>
              {HOTLINE}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    cover_header_1: {
      fontSize: "200%",
      fontWeight: "700",
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "0.9",
      letterSpacing: "5px",
    },
    cover_header_2: {
      fontSize: "170%",
      fontWeight: "700",
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "1",
      letterSpacing: "5px",
    },
    cover_sub_header: {
      fontSize: "140%",
      fontWeight: "700",
      color: theme.palette.grey[600],
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "0.9",
      letterSpacing: "5px",
    },

    ccrt__book__appoinment__image_wrapper: {
      height: "20vh",
    },
    ccrt__book__appoinment__image: {
      position: "relative",
      height: "100%",
      width: "50%",
      cursor: "pointer",
    },
    ccrt__home_page__hotline__container: {
      background: HOTLINE_BACKGROUND,
      // width: "100%",
      paddingTop: "10px",
      position: "absolute",

      bottom: 0,
    },
    ccrt__home_page__hotline__textfield__wrapper: {
      position: "relative",
      borderRadius: "10px",
      //   marginBottom: "10px",
    },
    ccrt__home_page__hotline__textfield: {
      background: "#fff",
      borderRadius: "100px",
      fontSize: "80%",
    },
    ccrt__home_page__hotline__textfield__button: {
      background: theme.palette.custom.DEFAULT_COLOR_2,
      borderRadius: "15px",
      color: "#fff",
      fontSize: "70%",
      marginRight: "-10px",
      "&:hover": {
        background: theme.palette.custom.DEFAULT_COLOR_2,
      },
    },
    ccrt__home_page__hotline__textfield__button__avatar: {
      background: "#fff",
      marginRight: "10px",
    },
    ccrt__home_page__hotline__phone__icon: {
      color: theme.palette.custom.GREEN,
      padding: "3px",
    },
    ccrt__home_page__hotline__another__phone_icon: {
      color: theme.palette.custom.GREEN,
      fontSize: "140%",
      background: "white",
      padding: 5,
      borderRadius: 100,
      marginRight: 5,
    },
    ccrt__home_page__hotline__textStyle: {
      textTransform: "uppercase",
      fontWeight: "500",
      fontSize: "80%",
      color: theme.palette.custom.GREEN,
    },
    noBorder: {
      border: "none",
    },
  })
);
export default HeroMobile;
