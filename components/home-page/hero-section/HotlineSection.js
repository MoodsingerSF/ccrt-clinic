import React from "react";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import { HOTLINE_BACKGROUND } from "../../../misc/colors";
import {
  ASSISTANCE_BUTTON,
  HOTLINE,
  PHONE_CODE,
} from "../../../data/home/data";

const HotlineSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      item
      xs={12}
      className={classes.ccrt__home_page__hotline__container}
      style={{
        position: "absolute",
        bottom: "0%",
        // bottom: matchesLG ? "1%" : "10%",
      }}
    >
      <Grid container style={{ width: "95%" }}>
        <Grid
          item
          xs={12}
          md={12}
          lg={8}
          className={classes.ccrt__home_page__hotline__textfield__wrapper}
          // style={{
          //   marginBottom: matchesLG ? "0" : "10px",
          // }}
        >
          <TextField
            className={classes.ccrt__home_page__hotline__textfield}
            size="small"
            fullWidth
            placeholder="TELL US YOUR PHONE NUMBER"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography>{PHONE_CODE}</Typography>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
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
                    {ASSISTANCE_BUTTON}
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
          md={12}
          lg={4}
          container
          flexDirection="row"
          justifyContent={!matchesLG ? "center" : "flex-end"}
        >
          <Avatar style={{ background: "#fff", marginRight: "20px" }}>
            <PhoneIcon
              className={classes.ccrt__home_page__hotline__another__phone_icon}
            />
          </Avatar>
          <Typography className={classes.ccrt__home_page__hotline__textStyle}>
            {HOTLINE}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__home_page__hotline__container: {
      background: HOTLINE_BACKGROUND,
      width: "100%",
      padding: "13px 0px",
      zIndex: "99",
    },
    ccrt__home_page__hotline__textfield__wrapper: {
      position: "relative",
      borderRadius: "10px",
    },
    ccrt__home_page__hotline__textfield: {
      background: "#fff",
      borderRadius: "20px",
    },
    ccrt__home_page__hotline__textfield__button: {
      background: theme.palette.custom.DEFAULT_COLOR_2,
      padding: "4px 10px",
      borderRadius: "15px",
      color: "#fff",
      fontSize: "85%",
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
    },
    ccrt__home_page__hotline__textStyle: {
      textTransform: "uppercase",
      fontWeight: "700",
      fontSize: "150%",
      color: theme.palette.custom.GREEN,
    },
    noBorder: {
      border: "none",
    },
  })
);
export default HotlineSection;
