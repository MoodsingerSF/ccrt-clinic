import React from "react";
import { useRouter } from "next/router";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { CategoryData } from "../../../data/doctors-by-category/data";
import { CATEGORY_TITLE } from "../../../data/doctor/data";
import PropTypes from "prop-types";

const DoctorCategoryMobile = ({ filter }) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography
        variant="h5"
        className={classes.ccrt__dctr__page__left__menu__title}
      >
        {CATEGORY_TITLE}
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <Box className={classes.ccrt__doctor__category__mobile__container}>
          <TextField
            size="small"
            fullWidth
            select
            label="Select category"
            value={filter}
            onChange={(e) => router.push("/doctors?category=" + e.target.value)}
            InputProps={{
              classes: {
                input: classes.ccrt_textfield,
              },
            }}
          >
            {CategoryData.map((option) => (
              <MenuItem
                key={option.title}
                value={option.title}
                className={classes.ccrt__doctor__category__select__item}
              >
                {option.title}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Grid>
    </Grid>
  );
};

DoctorCategoryMobile.propTypes = {
  filter: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doctor__category__mobile__container: {
      width: "100%",
      padding: "5px 0 0 32px",
    },
    ccrt_textfield: {
      textTransform: "capitalize",
      fontSize: "90%",
    },
    ccrt__dctr__page__left__menu__title: {
      fontSize: "120%",
      textTransform: "uppercase",
      width: "100%",
      fontWeight: "500",
      color: theme.palette.custom.DEFAULT_COLOR_3,
      textAlign: "center",
      margin: "20px 0",
    },
    ccrt__doctor__category__select__item: {
      textTransform: "capitalize",
      fontSize: "90%",
    },
  })
);

export default DoctorCategoryMobile;
