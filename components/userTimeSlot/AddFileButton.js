import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";

const AddFileButton = ({ setOpenFormDialog }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt__add_section_wrapper}
      onClick={() => setOpenFormDialog(true)}
    >
      <AddIcon fontSize="small" />
      <Typography
        style={{
          textTransform: "uppercase",
          fontWeight: "500",
          fontSize: "90%",
        }}
      >
        Add section
      </Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__add_section_wrapper: {
      border: `2px dashed ${theme.palette.grey[500]}`,
      color: `${theme.palette.grey[700]}`,
      borderRadius: "5px",
      margin: "10px 0",
      cursor: "pointer",
      padding: "10px",
    },
  })
);

AddFileButton.propTypes = {
  AddFileButton: PropTypes.func.isRequired,
};
export default AddFileButton;
