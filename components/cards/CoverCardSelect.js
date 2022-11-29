import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import CoverAddDialog from "../dialogs/CoverAddDialog";

const CoverCardSelect = ({ icon, type, onSuccess, openSnackbar }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState();

  return (
    <>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        className={classes.cardRoot}
        onClick={() => setOpenDialog(true)}
      >
        {icon}
        <Typography className={classes.card__title}>{type}</Typography>
      </Grid>
      {openDialog && (
        <CoverAddDialog
          type={type}
          open={openDialog}
          onNegativeFeedback={() => setOpenDialog(false)}
          onSuccess={onSuccess}
          openSnackbar={openSnackbar}
        />
      )}
    </>
  );
};

CoverCardSelect.propTypes = {
  icon: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

const useStyles = makeStyles(() => ({
  cardRoot: {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    borderRadius: 10,
    width: "95%",
    padding: 20,
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  card__title: {
    fontSize: "120%",
    fontWeight: "700",
  },
}));

export default CoverCardSelect;
