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
import classNames from "classnames";
import Image from "next/image";
import hero from "../../../public/image/home-page/hero/Cover.png";
import appoinment from "../../../public/image/home-page/hero/appoinment.png";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";

// className={classNames({
//             [classes.ccrt__login__containerMobile]: !matches,
//             [classes.ccrt__login__containerDesktopSm]: matches,
//             [classes.ccrt__login__containerDesktopMd]: matchesMD,
//             [classes.ccrt__login__containerDesktopLg]: matchesLG,
//           })}

const Hero = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid
      container
      // justifyContent="cenetr"
      // alignItems="center"
      style={{ minHeight: "88vh", position: "relative" }}
    >
      <Grid
        item
        xs={6}
        style={{
          // display:
          minHeight: "88vh",
          position: "relative",
        }}
      >
        <Image
          src={hero}
          alt="hero"
          layout="fill"
          objectFit="contain"
          style={{}}
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        flexDirection={"column"}
        alignItems="flex-end"
        style={{ paddingRight: "50px" }}
      >
        <Grid
          container
          flexDirection={"column"}
          alignItems="flex-end"
          justifyContent={"center"}
          style={{ paddingRight: "20px" }}
        >
          {/* <Grid container> */}
          <TextField
            style={{
              background: "#fff",
              borderRadius: "20px",
              boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
              margin: "50px 0 30px 0",
            }}
            size="small"
            // fullWidth
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
          {/* </Grid> */}
          <Typography
            // variant="h1"
            // gutterBottom
            className={classes.cover_header_1}
          >
            Cancer
          </Typography>
          <Typography
            // variant="h2"
            className={classes.cover_header_2}
          >
            support
          </Typography>
          <Typography
            // variant="h3"
            className={classes.cover_sub_header}
          >
            is just
          </Typography>
          <Typography
            // variant="h3"
            className={classes.cover_sub_header}
          >
            a click away
          </Typography>
        </Grid>
        <Grid
          container
          style={{
            // background: "red",
            position: "relative",
            height: "10vh",
            width: "20vw",
            marginTop: "30px",
            cursor: "pointer",
          }}
        >
          <Image src={appoinment} alt="book a appoinment" />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        item
        xs={12}
        style={{
          background: "rgba(232, 232, 232,0.7)",
          position: "absolute",
          width: "100%",
          bottom: "10%",
          padding: "13px 70px",
        }}
      >
        <Grid
          item
          xs={8}
          style={{
            position: "relative",
            // background: "#fff",
            borderRadius: "10px",
          }}
        >
          <TextField
            style={{
              background: "#fff",
              borderRadius: "20px",
            }}
            size="small"
            fullWidth
            placeholder="TELL US YOUR PHONE NUMBER"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography>+880 |</Typography>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    style={{
                      background: "#9180BA",
                      padding: "4px 10px",
                      borderRadius: "15px",
                      color: "#fff",
                      fontSize: "85%",
                      marginRight: "-10px",
                    }}
                  >
                    <Avatar
                      sx={{ width: 23, height: 23 }}
                      style={{
                        background: "#fff",
                        marginRight: "10px",
                      }}
                    >
                      <PhoneIcon
                        style={{ color: "#9DCB80", padding: "3px" }}
                        fontSize="small"
                      />
                    </Avatar>
                    request for assistance
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
            <PhoneIcon style={{ color: "#9DCB80" }} />
          </Avatar>
          <Typography
            style={{
              textTransform: "uppercase",
              fontWeight: "700",
              fontSize: "150%",
              color: "#9DCB80",
            }}
          >
            Hotline: 96521
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    cover_header_1: {
      fontSize: "440%",
      fontWeight: "700",
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "0.9",
      letterSpacing: "5px",
    },
    cover_header_2: {
      fontSize: "360%",
      fontWeight: "700",
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "1",
      letterSpacing: "5px",
    },
    cover_sub_header: {
      fontSize: "315%",
      fontWeight: "700",
      color: theme.palette.grey[600],
      padding: 0,
      margin: 0,
      textTransform: "uppercase",
      lineHeight: "0.9",
      letterSpacing: "5px",
    },
    noBorder: {
      border: "none",
    },
  })
);

export default Hero;
