import React from "react";
import { useRouter } from "next/router";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import HomeIcon from "@mui/icons-material/Home";
import AppbarDrawerLink from "../appbar/AppbarDrawerLink";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LoginIcon from "@mui/icons-material/Login";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CloseIcon from "@mui/icons-material/Close";

const AppbarDrawer = ({ open, onClose }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box
          style={{
            padding: "10px",
            background: `${DEFAULT_COLOR_MINUS_2}`,
            textAlign: "end",
          }}
        >
          <IconButton
            onClick={onClose}
            style={{ background: "#fff", color: `${DEFAULT_COLOR_MINUS_2}` }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box style={{ padding: "10px" }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search"
            variant="outlined"
          />
        </Box>
        <Divider />
        {/* <Box> */}
        <List component="nav" aria-label="mailbox folders">
          <AppbarDrawerLink
            name="Home"
            link="/"
            icon={<HomeIcon fontSize="small" />}
          />
          <AppbarDrawerLink
            name="Departments"
            link="#"
            icon={<WidgetsIcon fontSize="small" />}
          />
          <AppbarDrawerLink
            name="Product & Service"
            link="#"
            icon={<MedicalServicesIcon fontSize="small" />}
          />
          <AppbarDrawerLink
            name="Blogs"
            link="/blogs"
            icon={<RateReviewIcon fontSize="small" />}
          />
          <AppbarDrawerLink
            name="Contact"
            link="#"
            icon={<AccountBoxIcon fontSize="small" />}
          />
          <AppbarDrawerLink
            name="FAQ"
            link="#"
            icon={<LiveHelpIcon fontSize="small" />}
          />
          <AppbarDrawerLink
            name="Login"
            link="/login"
            icon={<LoginIcon fontSize="small" />}
          />

          <Divider light />
        </List>
        {/* </Box> */}
        <Box style={{ padding: "10px" }}>
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
