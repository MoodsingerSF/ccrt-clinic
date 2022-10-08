import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@mui/styles";

const AdvicesSection = ({ advices, setAdvices, editable = false }) => {
  const classes = useStyles();
  return (
    <Grid
      // style={{ background: "red" }}
      container
      justifyContent={"center"}
      alignItems="center"
    >
      <Typography className={classes.ccrt__prescription__advice__heading}>
        Advices
      </Typography>
      {!editable ? (
        <Grid
          container
          // style={{ marginTop: 20 }}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography className={classes.advices}>{advices}</Typography>
        </Grid>
      ) : (
        <Grid
          container
          className={classes.ccrt__prescription__advice__textArea__container}
        >
          <TextField
            aria-label="minimum height"
            placeholder="Advice..."
            minRows={8}
            multiline
            maxRows={Infinity}
            InputProps={{ className: classes.input }}
            value={advices}
            onChange={(e) => setAdvices(e.target.value)}
            className={classes.ccrt__prescription__advice__textArea}
          />
        </Grid>
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__advice__heading: {
      // width: "100%",
      textAlign: "center",
      // padding: "20px 0",
      color: "white",
      fontSize: "100%",
      fontWeight: "bold",
    },
    ccrt__prescription__advice__textArea__container: {
      // padding: "20px  0",
    },
    ccrt__prescription__advice__textArea: {
      width: "100%",
      borderColor: `${"white"}`,
      borderRadius: "5px",
      padding: "10px",
      // outline: "none",
    },
    input: {
      fontSize: "80%",
      color: "white",
      fontWeight: 500,
      border: `1px solid ${theme.palette.custom.GREEN}`,
    },
    advices: {
      color: "white",
      fontWeight: 500,
      fontSize: "85%",
      margin: 20,
    },
  })
);
AdvicesSection.propTypes = {
  advices: PropTypes.string,
  setAdvices: PropTypes.func,
  editable: PropTypes.bool,
};
export default AdvicesSection;
