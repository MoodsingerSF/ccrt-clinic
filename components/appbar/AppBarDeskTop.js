import { Avatar, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Context } from "../../contexts/user-context/UserContext";
import { APP_BAR_ROUTES, VIEW_CRITERIA } from "../dashboard/Routes";
import logo from "../../public/image/logo/logo2.png";
import ProfileMenu from "../menu/ProfileMenu";
import AppBarLink from "./AppBarLink";

const AppBarDeskTop = () => {
  const classes = useStyles();
  const router = useRouter();
  const { isSignedIn, getProfileImageUrl } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container>
      <Grid item xs={2} className={classes.ccrt_app_bar__logo}>
        <Image src={logo} layout="fill" objectFit="contain" />
      </Grid>
      <Grid container alignItems="center" item xs={2}></Grid>
      {isSignedIn() && <Grid container alignItems="center" item xs={1}></Grid>}
      <Grid container justifyContent="center" alignItems="center" item xs>
        {APP_BAR_ROUTES.map((item) => {
          if (
            item.showCriteria === VIEW_CRITERIA.ALWAYS ||
            (item.showCriteria === VIEW_CRITERIA.AFTER_AUTHORIZATION &&
              isSignedIn()) ||
            (item.showCriteria === VIEW_CRITERIA.BEFORE_AUTHORIZATION &&
              !isSignedIn())
          ) {
            return (
              <AppBarLink key={item.title} name={item.title} link={item.path} />
            );
          } else return null;
        })}

        {isSignedIn() && (
          <Avatar
            className={classes.avatar}
            onClick={handleProfileClick}
            src={"/" + getProfileImageUrl()}
          ></Avatar>
        )}
        {open && (
          <ProfileMenu
            open={open}
            onClose={handleProfileClose}
            anchorEl={anchorEl}
          />
        )}
        {!isSignedIn() && (
          <Grid
            item
            xs={3}
            container
            flexDirection="column"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography
              className={classes.sign_up_title}
            >{`Haven't registered yet?`}</Typography>
            <Typography
              className={classes.sign_up_button_style}
              onClick={() => {
                router.push("/signup");
              }}
            >
              Register Now
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt_app_bar__logo: {
      position: "relative",
      margin: "5px 0px",
    },
    sign_up_title: {
      fontSize: "80%",
      fontWeight: "500",
    },
    sign_up_button_style: {
      background: theme.palette.primary.main_minus_2,
      color: "white",
      padding: "5px 20px",
      fontSize: "80%",
      fontWeight: 500,
      cursor: "pointer",
      borderRadius: 30,
      transition: "background .2s",
      "&:hover": {
        background: theme.palette.primary.main,
      },
    },
    avatar: {
      marginRight: "2.5vw",
      border: `1px dashed ${theme.palette.primary.main}`,
      cursor: "pointer",
      marginLeft: 10,
    },
  })
);

export default AppBarDeskTop;
