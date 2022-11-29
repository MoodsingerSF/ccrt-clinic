import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, createStyles, useTheme } from "@mui/styles";
import { CATEGORY_TITLE } from "../../../data/doctor/data";
import PropTypes from "prop-types";
import useSpecializations from "../../../hooks/useSpecializations";

const DoctorCategoryMobile = ({ filter }) => {
  const router = useRouter();
  const theme = useTheme();
  const [filterValue, setFilterValue] = useState(filter);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const {
    data: specializations,
    loading,
    hasMore,
  } = useSpecializations(page, 2);
  return (
    <Grid container justifyContent="center" alignItems="flex-start">
      <Grid container justifyContent="center">
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
              value={filterValue}
              onChange={(e) => {
                if (e.target.value !== "load more") {
                  setFilterValue(e.target.value);
                  router.push("/doctors?specialization=" + e.target.value);
                }
              }}
              InputProps={{
                classes: {
                  input: classes.ccrt_textfield,
                },
              }}
            >
              {specializations.map((item) => (
                <MenuItem
                  key={item.id}
                  id={item.id}
                  value={item.id}
                  className={classes.ccrt__doctor__category__select__item}
                >
                  {item.name}
                </MenuItem>
              ))}
              <MenuItem key={"load more"}>
                <Grid container justifyContent={"center"} alignItems="center">
                  {loading && <CircularProgress size={20} />}
                  {!loading && hasMore && (
                    <Typography
                      style={{
                        color: theme.palette.custom.GREEN,
                        fontSize: "85%",
                      }}
                      onClick={() => setPage((prev) => prev + 1)}
                    >
                      Load More
                    </Typography>
                  )}
                </Grid>
              </MenuItem>
            </TextField>
          </Box>
        </Grid>
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
      width: "95%",
      marginBottom: 20,
      // padding: "5px 0 0 32px",
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
      color: theme.palette.custom.GREEN,
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
