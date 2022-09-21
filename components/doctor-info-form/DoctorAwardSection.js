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
  const [showAwardgModal, setShowAwardgModal] = useState(false);

  const handleAddedAward = (data) => {
    setAward((prev) => [...prev, data]);
    setShowAwardgModal(false);
  };

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
          <IconButton onClick={() => setShowAwardgModal(true)}>
            <AddIcon />
          </IconButton>
        )}

        {award.length !== 0 &&
          award.map((item) => (
            <DoctorAwardInfo
              key={item.id}
              id={item.id}
              title={item.name}
              year={item.year}
              award={award}
              setAward={setAward}
            />
          ))}

        {award.length !== 0 && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowAwardgModal(true)}
          >
            <AddIcon fontSize="small" /> add another
          </Button>
        )}
      </Grid>
      {showAwardgModal && (
        <DoctorFormAwardModal
          open={showAwardgModal}
          onNegativeFeedback={() => setShowAwardgModal(false)}
          onPositiveFeedback={(data) => handleAddedAward(data)}
          award={award}
          setAward={setAward}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
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
