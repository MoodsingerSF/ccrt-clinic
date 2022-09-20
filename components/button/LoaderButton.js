import React from "react";
// import { makeStyles } from "@material-ui/styles";
import loadingAnimationData from "../../public/animations/loading.json";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
// import classNames from "classnames";
import Lottie from "lottie-react";
function LoaderButton({ title, startIcon, onClick, loading = false }) {
  return (
    <Box
      component={Grid}
      onClick={() => {
        if (!loading) {
          if (onClick) onClick();
        }
      }}
      //   className={classNames({
      //     [classes.buttonStyle]: !disabled,
      //     [classes.buttonStyleDisabled]: disabled,
      //   })}
      container
      justifyContent="center"
      alignItems="center"
    >
      {loading ? (
        <Lottie animationData={loadingAnimationData} width={100} height={100} />
      ) : (
        // <LoaderView />
        <Grid container justifyContent="center" alignItems="center">
          {startIcon ? startIcon : null}
          <Typography
          // className={classNames({
          //   [classes.titleStyle]: !disabled,
          //   [classes.titleStyleDisabled]: disabled,
          // })}
          >
            {title}
          </Typography>
        </Grid>
      )}
    </Box>
  );
}
LoaderButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  //   disabled: PropTypes.bool.isRequired,
  startIcon: PropTypes.any,
};
// const useStyles = makeStyles({
//   buttonStyle: {
//     // background: GRADIENT_BACKGROUND_COLOR,
//     borderRadius: 5,
//     // transform: "background .3s ease-in-out",
//     // "&:hover": {
//     //   background: GRADIENT_BACKGROUND_COLOR_REVERSE,
//     // },
//     height: 40,
//     minWidth: 100,
//     padding: "0px 10px",
//     cursor: "pointer",
//   },
//   buttonStyleDisabled: {
//     // background: MATTE_BLACK_LIGHT,
//     borderRadius: 5,
//     transform: "background .3s ease-in-out",
//     height: 40,
//     minWidth: 100,
//     padding: "0px 10px",
//     cursor: "no-drop",
//   },
//   titleStyle: {
//     fontSize: "70%",
//     // color: MATTE_BLACK,
//     textAlign: "center",
//   },
//   titleStyleDisabled: {
//     fontSize: "70%",
//     // color: SECONDARY_TEXT_COLOR,
//     textAlign: "center",
//   },
// });
export default LoaderButton;
