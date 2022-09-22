import React from "react";
import { Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import loadingAnimationData from "../../public/animations/loading3.json";

const CustomButton = ({
  title,
  icon = null,
  onClick,
  size = "medium",
  loading = false,
}) => {
  return (
    <Grid container>
      <Button
        variant="contained"
        fullWidth
        startIcon={icon}
        size={size}
        onClick={() => {
          if (!loading) {
            onClick();
          }
        }}
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
};

export default CustomButton;
