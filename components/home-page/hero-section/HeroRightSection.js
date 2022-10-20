import React from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import classNames from "classnames";
import { createStyles, makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  HERO_SECTION_HEIGHT,
  HERO_SECTION_HEIGHT_MOBILE,
} from "../../../misc/constants";

const HeroRightSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      container
      justifyContent={"flex-end"}
      alignItems="center"
      style={{
        height: matches ? HERO_SECTION_HEIGHT : HERO_SECTION_HEIGHT_MOBILE,
      }}
    >
      <Grid
        container
        flexDirection={"column"}
        alignItems="flex-end"
        justifyContent={"center"}
      >
        <TextField
          className={classes.ccrt__home_page__search_field}
          size="small"
          placeholder="search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            classes: { notchedOutline: classes.noBorder },
          }}
        />
        <Grid
          container
          flexDirection={"column"}
          alignItems="flex-end"
          style={{ margin: "25px 0" }}
        >
          <Typography
            className={classNames({
              [classes.cover_header_1_tablet]: !matches,
              [classes.cover_header_1_desktop]: matches,
            })}
          >
            Cancer
          </Typography>
          <Typography
            className={classNames({
              [classes.cover_header_2_tablet]: !matches,
              [classes.cover_header_2_desktop]: matches,
            })}
          >
            support
          </Typography>
          <Typography
            className={classNames({
              [classes.cover_sub_header_tablet]: !matches,
              [classes.cover_sub_header_desktop]: matches,
            })}
          >
            is just
          </Typography>
          <Typography
            className={classNames({
              [classes.cover_sub_header_tablet]: !matches,
              [classes.cover_sub_header_desktop]: matches,
            })}
          >
            a click away
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__home_page__search_field: {
      background: "#fff",
      borderRadius: "20px",
      boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
      // margin: "20px 0 20px 0",
    },
    cover_header_1_tablet: {
      fontSize: "300%",
      fontWeight: "700",
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "0.9",
      color: theme.palette.custom.BLACK,
      // letterSpacing: "5px",
      textAlign: "right",
    },
    cover_header_1_desktop: {
      fontSize: "380%",
      fontWeight: "700",
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "0.9",
      color: theme.palette.custom.BLACK,
      // letterSpacing: "5px",
    },
    cover_header_2_tablet: {
      fontSize: "250%",
      fontWeight: "700",
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "1",
      color: theme.palette.custom.BLACK,
      // letterSpacing: "5px",
      textAlign: "right",
    },
    cover_header_2_desktop: {
      fontSize: "300%",
      fontWeight: "700",
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "1",
      color: theme.palette.custom.BLACK,
      // letterSpacing: "5px",
    },
    cover_sub_header_tablet: {
      fontSize: "200%",
      fontWeight: "700",
      color: theme.palette.custom.GREY,
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "0.9",
      // textAlign: "center",

      // letterSpacing: "1px",
    },
    cover_sub_header_desktop: {
      fontSize: "280%",
      fontWeight: "700",
      color: theme.palette.custom.GREY,
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "0.9",
      textAlign: "right",
    },

    noBorder: {
      border: "none",
    },
  })
);

export default HeroRightSection;
