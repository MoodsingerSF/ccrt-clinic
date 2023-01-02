import React from "react";
import { Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import loadingAnimationData from "../../public/animations/loading3.json";
import { createStyles, makeStyles } from "@mui/styles";

const CustomButton = ({
  title,
  icon = null,
  onClick,
  size = "medium",
  loading = false,
  color = null,
  variant = "contained",
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Button
        variant={variant}
        fullWidth
        startIcon={icon}
        size={size}
        onClick={() => {
          if (!loading) {
            onClick();
          }
        }}
        style={{ ...(color ? { background: color } : null) }}
        classes={{ root: classes.root }}
      >
        {loading ? (
          <Lottie
            animationData={loadingAnimationData}
            style={{ height: 30, width: 30 }}
          />
        ) : (
          title
        )}
      </Button>
    </Grid>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  size: PropTypes.string,
  loading: PropTypes.bool,
  color: PropTypes.string,
  variant: PropTypes.string,
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontSize: "85%",
      fontWeight: 500,
      textTransform: "capitalize",
    },
  })
);

export default CustomButton;
