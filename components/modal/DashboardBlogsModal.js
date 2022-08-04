import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";

const DashboardBlogsModal = ({ handleClose }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.ccrt__dashboard_blogs__card__right__icon__popup}
    >
      <Grid container>
        <ul
          className={
            classes.ccrt__dashboard_blogs__card__right__icon__popup__ul
          }
        >
          <li
            onClick={handleClose}
            className={
              classes.ccrt__dashboard_blogs__card__right__icon__popup__li
            }
          >
            Edit
          </li>
          <li
            onClick={handleClose}
            className={
              classes.ccrt__dashboard_blogs__card__right__icon__popup__li
            }
          >
            Delete
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard_blogs__card__right__icon__popup: {
    position: "absolute",
    top: "13%",
    right: "3%",
    background: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    width: "40%",
  },
  ccrt__dashboard_blogs__card__right__icon__popup__ul: {
    listStyle: "none",
    width: "100%",
    padding: "0",
    margin: "0",
  },
  ccrt__dashboard_blogs__card__right__icon__popup__li: {
    width: "100%",
    padding: "5px",
    cursor: "pointer",
    "&:hover": {
      background: "#eeeeee",
    },
  },
});
export default DashboardBlogsModal;

DashboardBlogsModal.propTypes = {
  handleClose: PropTypes.func,
};
