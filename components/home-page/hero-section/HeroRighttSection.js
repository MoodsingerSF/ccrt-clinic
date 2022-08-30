import React from "react";
import Image from "next/image";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import appoinment from "../../../public/image/home-page/hero/appoinment.png";

const HeroRighttSection = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        flexDirection={"column"}
        alignItems="flex-end"
        justifyContent={"center"}
        // style={{ paddingRight: "20px" }}
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
        <Typography className={classes.cover_header_1}>Cancer</Typography>
        <Typography className={classes.cover_header_2}>support</Typography>
        <Typography className={classes.cover_sub_header}>is just</Typography>
        <Typography className={classes.cover_sub_header}>
          a click away
        </Typography>
      </Grid>
      <Grid container className={classes.ccrt__book__appoinment__image_wrapper}>
        <Image
          src={appoinment}
          alt="book a appoinment"
          layout="fill"
          objectFit="contain"
        />
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__home_page__search_field: {
      background: "#fff",
      borderRadius: "20px",
      boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
      margin: "50px 0 50px 0",
    },
    cover_header_1: {
      fontSize: "380%",
      fontWeight: "700",
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "0.9",
      letterSpacing: "5px",
    },
    cover_header_2: {
      fontSize: "300%",
      fontWeight: "700",
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "1",
      letterSpacing: "5px",
    },
    cover_sub_header: {
      fontSize: "280%",
      fontWeight: "700",
      color: theme.palette.grey[600],
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "0.9",
      letterSpacing: "5px",
    },
    ccrt__book__appoinment__image_wrapper: {
      position: "relative",
      height: "10vh",
      width: "15vw",
      marginTop: 30,
      cursor: "pointer",
      background: theme.palette.custom.DEFAULT_COLOR_3,
    },
    noBorder: {
      border: "none",
    },
  })
);

export default HeroRighttSection;
