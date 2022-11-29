import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Drawer,
  Grid,
  // IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import PropTypes from "prop-types";
import AppbarDrawerLink from "../appbar/AppbarDrawerLink";
// import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";

import {
  APP_BAR_ROUTES,
  ROUTE_ICON_STYLE,
  VIEW_CRITERIA,
} from "../dashboard/Routes";
import { Context } from "../../contexts/user-context/UserContext";
import { clearStorage } from "../../controllers/LocalStorageController";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CustomDivider from "../CustomDivider";
import DashboardSidebar from "../dashboard/DashboardSidebar";

const AppbarDrawer = ({ open, onClose }) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const { isSignedIn, logout } = useContext(Context);
  const [searchText, setSearchText] = useState("");
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);
  const onSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        keyword: searchText,
      },
    });
    onClose();
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "80vw",
            background: `${theme.palette.custom.BLACK}`,
          },
        }}
      >
        <Box>
          <Box
            style={{
              padding: "10px",
            }}
          >
            <TextField
              className={classes.ccrt__home_page__search_field}
              size="small"
              placeholder="search doctor and blog"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ cursor: "pointer" }}>
                    <SearchIcon onClick={onSearch} />
                  </InputAdornment>
                ),
                classes: { notchedOutline: classes.noBorder },
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
            />
          </Box>
          <CustomDivider />
          <List style={{ padding: "0" }}>
            {isSignedIn() && (
              <ListItem
                className={classes.ccrt__mobile__dashboard__container}
                style={{ padding: "0" }}
                onClick={() => setShowDashboardMenu(!showDashboardMenu)}
              >
                <Grid container style={{ padding: "8px 16px" }}>
                  <DashboardIcon
                    className={classes.ccrt__mobile__dashboard__icon}
                  />
                  <Typography
                    className={classes.ccrt__mobile__dashboard__heading}
                  >
                    Dashboard
                    <Typography
                      style={{ position: "absolute", top: "0", right: "0" }}
                    >
                      {showDashboardMenu ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Typography>
                  </Typography>
                  {showDashboardMenu && (
                    <DashboardSidebar
                      routeName={router.query.route?.[0]}
                      showMobile={true}
                      onClose={onClose}
                      onNegativeFeedback={() => setShowDashboardMenu(false)}
                    />
                  )}
                </Grid>
              </ListItem>
            )}
          </List>

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
    color: "white",
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
  ccrt__mobile__dashboard__heading: {
    position: "relative",
    fontSize: "80%",
    fontWeight: "500",
    color: "#fff",
    marginLeft: 26,
    width: "100%",
  },
  ccrt__mobile__dashboard__container: {
    position: "relative",
    cursor: "pointer",
  },
  ccrt__mobile__dashboard__icon: {
    position: "absolute",
    fontSize: "110%",
    top: "8px",
    left: "11px",
    color: "#fff",
  },
  ccrt__home_page__search_field: {
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
    margin: "20px 0 20px 0",
  },
  noBorder: {
    border: "none",
  },
}));
AppbarDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
export default AppbarDrawer;
