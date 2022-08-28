import React from "react";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import { HOTELINE_BACKGROUND } from "../../../misc/colors";
import {
  ASSISTANCE_BUTTON,
  HOTELINE,
  PHONE_CODE,
} from "../../../data/home/data";

const HotlineSection = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      item
      xs={12}
      className={classes.ccrt__home_page__hotline__container}
    >
      <Grid
        item
        xs={8}
        className={classes.ccrt__home_page__hotline__textfield__wrapper}
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
                      className={classes.ccrt__home_page__hotline__phone__icon}
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
        xs={4}
        container
        flexDirection="row"
        justifyContent={"flex-end"}
      >
        <Avatar style={{ background: "#fff", marginRight: "20px" }}>
          <PhoneIcon
            className={classes.ccrt__home_page__hotline__another__phone_icon}
          />
        </Avatar>
        <Typography className={classes.ccrt__home_page__hotline__textStyle}>
          {HOTELINE}
        </Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__home_page__hotline__container: {
      background: HOTELINE_BACKGROUND,
      position: "absolute",
      width: "100%",
      bottom: "15%",
      padding: "13px 70px",
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
    },
    ccrt__home_page__hotline__textfield__button__avatar: {
      background: "#fff",
      marginRight: "10px",
    },
    ccrt__home_page__hotline__phone__icon: {
      color: theme.palette.custom.DEFAULT_COLOR_3,
      padding: "3px",
    },
    ccrt__home_page__hotline__another__phone_icon: {
      color: theme.palette.custom.DEFAULT_COLOR_3,
    },
    ccrt__home_page__hotline__textStyle: {
      textTransform: "uppercase",
      fontWeight: "700",
      fontSize: "150%",
      color: theme.palette.custom.DEFAULT_COLOR_3,
    },
    noBorder: {
      border: "none",
    },
  })
);
export default HotlineSection;
