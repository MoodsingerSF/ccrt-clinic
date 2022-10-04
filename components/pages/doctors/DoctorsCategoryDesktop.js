import React, { useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { CATEGORY_TITLE } from "../../../data/doctor/data";
import PropTypes from "prop-types";
import Specialization from "../../doctor/Specialization";
import useSpecializations from "../../../hooks/useSpecializations";
import CustomButton from "../../button/CustomButton";
const DoctorsCategoryDesktop = ({ filter }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const {
    data: specializations,
    loading,
    hasMore,
  } = useSpecializations(page, 15);
  return (
    <Grid
      container
      item
      xs={12}
      md={3}
      justifyContent={"center"}
      alignItems="flex-start"
      className={classes.ccrt__dctr__page__left__menu}
    >
      <Grid
        container
        style={{
          width: "90%",
        }}
        justifyContent={"center"}
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          container
          justifyContent={"center"}
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            container
            justifyContent={"center"}
            alignItems="flex-start"
          >
            <Typography className={classes.ccrt__dctr__page__left__menu__title}>
              {CATEGORY_TITLE}
            </Typography>
          </Grid>

          <Grid container>
            {specializations.map((item) => (
              <Specialization
                key={item.id}
                id={item.id}
                title={item.name}
                selected={Number(filter) === item.id}
              />
            ))}
          </Grid>
          {loading && <CircularProgress className={classes.loaderStyle} />}
          {!loading && hasMore && (
            <Grid container>
              <CustomButton
                title="Load More"
                onClick={() => setPage((prev) => prev + 1)}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

DoctorsCategoryDesktop.propTypes = {
  filter: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dctr__page__left__menu: {
      position: "fixed",
      height: "88vh",
      overflowY: "auto",
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    },
    ccrt__dctr__page__left__menu__title: {
      // textTransform: "uppercase",
      width: "120%",
      fontWeight: "500",
      color: theme.palette.custom.BLACK,
      borderBottom: `1px solid ${theme.palette.custom.BLACK}`,
      textAlign: "center",
      paddingBottom: 20,
      // margin: "20px 0",
    },
    loaderStyle: { color: theme.palette.custom.BLACK, margin: "10px 0px" },
  })
);
export default DoctorsCategoryDesktop;
