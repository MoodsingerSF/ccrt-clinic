import {
  Avatar,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Context } from "../../contexts/user-context/UserContext";
import { clearStorage } from "../../controllers/LocalStorageController";
import { createStyles, makeStyles } from "@mui/styles";
import { Dashboard, Home } from "@mui/icons-material";
const ProfileMenu = ({ anchorEl, open, onClose }) => {
  const router = useRouter();
  const { logout, getProfileImageUrl, getFirstName } = useContext(Context);
  console.log(getProfileImageUrl());
  const classes = useStyles();
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      onClick={onClose}
      classes={{
        paper: classes.paperStyle,
        root: classes.rootStyle,
      }}
      // PaperProps={{
      //   elevation: 0,
      //   sx: {
      //     overflow: "visible",
      //     filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      //     mt: 1.5,
      //     "& .MuiAvatar-root": {
      //       width: 32,
      //       height: 32,
      //       ml: -0.5,
      //       mr: 1,
      //     },
      //     "&:before": {
      //       content: '""',
      //       display: "block",
      //       position: "absolute",
      //       top: 0,
      //       right: 14,
      //       width: 10,
      //       height: 10,
      //       bgcolor: "background.paper",
      //       transform: "translateY(-50%) rotate(45deg)",
      //       zIndex: 0,
      //     },
      //   },
      // }}
      transformOrigin={{ horizontal: "center", vertical: "top" }}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Grid container className={classes.profileDetailsContainerStyle}>
        <Grid item xs={8}>
          <Typography className={classes.welcomeTextStyle}>Welcome!</Typography>
          <Typography className={classes.nameTextStyle}>
            {getFirstName()}
          </Typography>
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          <Avatar style={{ marginRight: 10 }} src={getProfileImageUrl()} />
        </Grid>
      </Grid>
      {/* </MenuItem> */}
      <MenuItem
        onClick={() => {
          onClose();
          router.push("/");
        }}
      >
        <Home className={classes.iconStyle} />
        <Typography className={classes.textStyle}>Home</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          onClose();
          router.push("/dashboard/profile");
        }}
      >
        <Dashboard className={classes.iconStyle} />
        <Typography className={classes.textStyle}>Dashboard</Typography>
      </MenuItem>

      <Divider />

      <MenuItem>
        <SettingsOutlinedIcon className={classes.iconStyle} />
        <Typography className={classes.textStyle}>Settings</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          logout();
          clearStorage();
          router.replace("/");
        }}
      >
        <LogoutOutlinedIcon className={classes.iconStyle} />
        <Typography className={classes.textStyle}>Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

ProfileMenu.propTypes = {
  anchorEl: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    paperStyle: {
      padding: 0,
      margin: 0,
      // backgroundColor: theme.palette.custom.GREY,
      width: "20vw",
    },
    rootStyle: {
      // background: "rgba(0,0,0,.5)",
    },
    iconStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "140%",
      marginRight: 10,
    },
    textStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "85%",
      // marginRight: 10,
    },
    profileDetailsContainerStyle: {
      background: theme.palette.custom.BLACK,
      paddingTop: 20,
      paddingBottom: 20,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    welcomeTextStyle: {
      color: "white",
      fontSize: "110%",
      fontWeight: "bold",
      paddingLeft: 10,
    },
    nameTextStyle: {
      color: "white",
      fontSize: "80%",
      fontWeight: "bold",
      paddingLeft: 10,
    },
  })
);

export default ProfileMenu;
