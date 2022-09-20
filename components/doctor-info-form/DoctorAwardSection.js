import React, { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BOX_SHADOW } from "../../misc/colors";
import PropTypes from "prop-types";
import DoctorFormAwardModal from "../modal/DoctorFormAwardModal";
import { makeStyles } from "@mui/styles";
import DoctorAwardInfo from "./DoctorAwardInfo";

const DoctorAwardSection = ({ award, setAward }) => {
  const classes = useStyles();
  const [showAwardModal, setShowAwardModal] = useState(false);

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        className={classes.ccrt__award__section__wrapper}
      >
        <Typography className={classes.ccrt__award__section__header}>
          Award
        </Typography>
        {award.length === 0 && (
          <IconButton onClick={() => setShowAwardModal(true)}>
            <AddIcon />
          </IconButton>
        )}

        {award.length !== 0 &&
          award.map((item) => (
            <DoctorAwardInfo
              key={item.id}
              id={item.id}
              title={item.title}
              year={item.year}
              award={award}
              setAward={setAward}
            />
          ))}

        {award.length !== 0 && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowAwardModal(true)}
          >
            <AddIcon fontSize="small" /> add another
          </Button>
        )}
      </Grid>
      {showAwardModal && (
        <DoctorFormAwardModal
          open={showAwardModal}
          onNegativeFeedback={() => setShowAwardModal(false)}
          award={award}
          setAward={setAward}
        />
      )}
    </>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__award__section__wrapper: {
    padding: "10px",
    borderRadius: "5px",
    boxShadow: BOX_SHADOW,
    marginBottom: "20px",
  },
  ccrt__award__section__header: {
    fontSize: "130%",
    fontWeight: "600",
  },
}));

DoctorAwardSection.propTypes = {
  award: PropTypes.array.isRequired,
  setAward: PropTypes.func.isRequired,
};
export default DoctorAwardSection;
