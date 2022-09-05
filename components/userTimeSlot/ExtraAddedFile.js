import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";

const ExtraAddedFile = ({ title, preview, handleRemovePreview, index }) => {
  const classes = useStyles();
  return (
    <Grid key={index} container style={{ marginBottom: "20px" }}>
      <Typography className={classes.ccrt__content__header}>
        {title}
        <small
          style={{
            color: "black",
            fontSize: "75%",
            marginLeft: "5px",
          }}
        >
          (if any)
        </small>
      </Typography>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        className={classes.ccrt_image_preview_wrapper}
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        <IconButton
          className={classes.ccrt__image__wrapper__clear__button}
          onClick={() => handleRemovePreview(index)}
        >
          <ClearIcon fontSize="small" className={classes.ccrt__clear__button} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__content__header: {
      textTransform: "capitalize",
      fontWeight: "500",
      fontSize: "100%",
      marginBottom: "5px",
      fontSize: "85%",
      color: `${theme.palette.grey[700]}`,
    },
    ccrt_image_preview_wrapper: {
      position: "relative",
      height: "300px",
      backgroundPosition: "center",
      backgroundSize: "auto 100%",
      backgroundOrigin: "content-box",
      backgroundRepeat: "no-repeat",
      border: `2px dashed ${theme.palette.grey[500]}`,
      padding: "5px",
    },
    ccrt__image__wrapper__clear__button: {
      position: "absolute",
      top: "0",
      right: "0",
      cursor: "pointer",
      background: "#fff",
    },
    ccrt__clear__button: {
      color: `${theme.palette.custom.DEFAULT_COLOR}`,
    },
  })
);
ExtraAddedFile.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  handleRemovePreview: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
export default ExtraAddedFile;
