import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import { Box, Drawer, IconButton, List, Typography } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import PropTypes from "prop-types";
import AppbarDrawerLink from "../appbar/AppbarDrawerLink";
import CloseIcon from "@mui/icons-material/Close";
import SignUpTextField from "../textfields/SignUpTextField";
import {
  APP_BAR_ROUTES,
  ROUTE_ICON_STYLE,
  VIEW_CRITERIA,
} from "../dashboard/Routes";
import { Context } from "../../contexts/user-context/UserContext";
import { clearStorage } from "../../controllers/LocalStorageController";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CustomDivider from "../CustomDivider";

const AppbarDrawer = ({ open, onClose }) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const { isSignedIn, logout } = useContext(Context);
  const [searchKeyword, setSearchKeyword] = useState("");
  console.log("app bar drawer");
  return (
    <>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box
          style={{
            background: `${theme.palette.custom.BLACK}`,
            minHeight: "100vh",
          }}
        >
          <Box
            style={{
              padding: "10px",
              textAlign: "end",
            }}
          >
            <IconButton
              size="small"
              onClick={onClose}
              style={{
                background: "white",
                color: `${theme.palette.custom.BLACK}`,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            style={{
              padding: "10px",
            }}
          >
            <SignUpTextField
              label="Search"
              variant="outlined"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              color="white"
            />
          </Box>
          <CustomDivider />
          <List component="nav" aria-label="mailbox folders">
            {APP_BAR_ROUTES.map((item) => {
              if (
                item.showCriteria === VIEW_CRITERIA.ALWAYS ||
                (item.showCriteria === VIEW_CRITERIA.AFTER_AUTHORIZATION &&
                  isSignedIn()) ||
                (item.showCriteria === VIEW_CRITERIA.BEFORE_AUTHORIZATION &&
                  !isSignedIn())
              ) {
                return (
                  <AppbarDrawerLink
                    key={item.title}
                    name={item.title}
                    onClick={() => {
                      router.push(item.path);
                      onClose();
                    }}
                    icon={item.icon}
                  />
                );
              } else return null;
            })}
          </List>

          <>
            <CustomDivider />

            {isSignedIn() && (
              <AppbarDrawerLink
                name={"Log Out"}
                onClick={() => {
                  logout();
                  clearStorage();
                  router.replace("/");
                }}
                icon={<LogoutOutlinedIcon style={ROUTE_ICON_STYLE} />}
              />
            )}
            {!isSignedIn() && (
              <Box
                style={{
                  padding: "10px",
                }}
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
              </Box>
            )}
          </>
        </Box>
      </Drawer>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  sign_up_title: {
    fontSize: "90%",
    fontWeight: "500",
    textAlign: "center",
  },
  sign_up_button_style: {
    background: theme.palette.primary.main_minus_2,
    color: "white",
    padding: "5px 20px",
    fontSize: "85%",
    fontWeight: "500",
    cursor: "pointer",
    borderRadius: 30,
    textAlign: "center",
  },
}));
AppbarDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
export default AppbarDrawer;
