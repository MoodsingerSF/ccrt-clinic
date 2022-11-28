import React, { useState } from "react";
// import Image from "next/image";
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
import { useRouter } from "next/router";
// import appoinment from "../../../public/image/home-page/hero/appoinment.png";

const HeroRightSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const [searchText, setSearchText] = useState("");

  const onSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        keyword: searchText,
      },
    });
  };

  return (
    <Grid container className={classes.ccrt__hero_right__section}>
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
              <InputAdornment position="end" style={{ cursor: "pointer" }}>
                <SearchIcon onClick={onSearch} />
              </InputAdornment>
            ),
            classes: { notchedOutline: classes.noBorder },
          }}
          // onClick={() => {
          //   router.push("/search");
          // }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
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
              [classes.cover_header_1_tablet]: !matchesMD,
              [classes.cover_header_1_desktop]: matchesMD,
            })}
          >
            Cancer
          </Typography>
          <Typography
            className={classNames({
              [classes.cover_header_2_tablet]: !matchesMD,
              [classes.cover_header_2_desktop]: matchesMD,
            })}
          >
            support
          </Typography>
          <Typography
            className={classNames({
              [classes.cover_sub_header_tablet]: !matchesMD,
              [classes.cover_sub_header_desktop]: matchesMD,
            })}
          >
            is just
          </Typography>
          <Typography
            className={classNames({
              [classes.cover_sub_header_tablet]: !matchesMD,
              [classes.cover_sub_header_desktop]: matchesMD,
            })}
          >
            a click away
          </Typography>
        </Grid>
        {/* <Grid
          container
          justifyContent={"flex-end"}
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
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__hero_right__section: {
      height: "75vh",
    },
    ccrt__home_page__search_field: {
      background: "#fff",
      borderRadius: "20px",
      boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
      margin: "20px 0 20px 0",
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
      // letterSpacing: "5px",
    },
    // ccrt__book__appoinment__image_wrapper: {
    //   height: "10vh",
    // },
    // ccrt__book__appoinment__image: {
    //   position: "relative",
    //   height: "100%",
    //   width: "30%",
    //   cursor: "pointer",
    // },
    noBorder: {
      border: "none",
    },
  })
);

export default HeroRightSection;
