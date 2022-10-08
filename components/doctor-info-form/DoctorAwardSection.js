import React, { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import DoctorFormAwardModal from "../modal/DoctorFormAwardModal";
import { makeStyles } from "@mui/styles";
import DoctorAwardInfo from "./DoctorAwardInfo";

const DoctorAwardSection = ({ award, setAward }) => {
  const classes = useStyles();
  const [showAwardModal, setShowAwardModal] = useState(false);

  const handleAddedAward = (data) => {
    setAward((prev) => [...prev, data]);
    setShowAwardModal(false);
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
          <IconButton onClick={() => setShowAwardModal(true)}>
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
              editable={true}
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
          onPositiveFeedback={(data) => handleAddedAward(data)}
          award={award}
          setAward={setAward}
          // onPositiveFeedback={handleAddedAward}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__award__section__wrapper: {
    padding: "10px 0px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  ccrt__award__section__header: {
    fontSize: "100%",
    fontWeight: 600,
    color: theme.palette.custom.BLACK,
  },
}));

DoctorAwardSection.propTypes = {
  award: PropTypes.array.isRequired,
  setAward: PropTypes.func.isRequired,
};
export default DoctorAwardSection;
