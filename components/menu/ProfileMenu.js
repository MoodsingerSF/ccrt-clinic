import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Context } from "../../contexts/user-context/UserContext";
import { clearStorage } from "../../controllers/LocalStorageController";
const ProfileMenu = ({ anchorEl, open, onClose }) => {
  const router = useRouter();
  const { logout } = useContext(Context);
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={() => {
          onClose();
          router.push("/");
        }}
      >
        <Avatar /> Home
      </MenuItem>
      <MenuItem
        onClick={() => {
          onClose();
          router.push("/dashboard/profile");
        }}
      >
        <Avatar /> Dashboard
      </MenuItem>

      <Divider />

      <MenuItem
        onClick={() => {
          onClose();
          router.push("/settings");
        }}
      >
        <ListItemIcon>
          <SettingsOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          logout();
          clearStorage();
          router.replace("/");
        }}
      >
        <ListItemIcon>
          <LogoutOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

ProfileMenu.propTypes = {
  anchorEl: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfileMenu;
