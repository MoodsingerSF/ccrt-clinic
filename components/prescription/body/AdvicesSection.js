import React from "react";
import { Grid, TextareaAutosize, Typography } from "@mui/material";
import theme from "../../../themes/theme";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@mui/styles";

const AdvicesSection = ({ advides, setAdvices }) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Typography className={classes.ccrt__prescription__advice__heading}>
        Advices
      </Typography>
      <Grid
        container
        className={classes.ccrt__prescription__advice__textArea__container}
      >
        <TextareaAutosize
          aria-label="minimum height"
          placeholder="Write..."
          minRows={8}
          maxRows={Infinity}
          value={advides}
          onChange={(e) => setAdvices(e.target.value)}
          className={classes.ccrt__prescription__advice__textArea}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__advice__heading: {
      width: "100%",
      textAlign: "center",
      padding: "20px 0",
      borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
    },
    ccrt__prescription__advice__textArea__container: {
      padding: "20px  0",
    },
    ccrt__prescription__advice__textArea: {
      width: "100%",
      borderColor: `${theme.palette.grey[300]}`,
      borderRadius: "5px",
      padding: "10px",
      fontSize: "100%",
      outline: "none",
    },
  })
);
AdvicesSection.propTypes = {
  advides: PropTypes.string,
  setAdvices: PropTypes.func,
};
export default AdvicesSection;
