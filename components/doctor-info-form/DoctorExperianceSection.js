import React, { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BOX_SHADOW } from "../../misc/colors";
import PropTypes from "prop-types";
import DoctorFormExperianceModal from "../modal/DoctorFormExperianceModal";
import { makeStyles } from "@mui/styles";
import DoctorExperianceInfo from "./DoctorExperianceInfo";

const DoctorExperianceSection = ({ experiances, setExperiances }) => {
  const classes = useStyles();
  const [showExperianceModal, setShowExperiancegModal] = useState(false);

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        className={classes.ccrt__experiance__section__wrapper}
      >
        <Typography className={classes.ccrt__experiance__section__header}>
          Experiance
        </Typography>
        {experiances.length === 0 && (
          <IconButton onClick={() => setShowExperiancegModal(true)}>
            <AddIcon />
          </IconButton>
        )}

        {experiances.length !== 0 &&
          experiances.map((item) => (
            <DoctorExperianceInfo
              key={item.id}
              id={item.id}
              organization={item.organization}
              jobTitle={item.jobTitle}
              department={item.department}
              division={item.division}
              startYear={item.startYear}
              endYear={item.endYear}
              experiances={experiances}
              setExperiances={setExperiances}
            />
          ))}

        {experiances.length !== 0 && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowExperiancegModal(true)}
          >
            <AddIcon fontSize="small" /> add another
          </Button>
        )}
      </Grid>
      {showExperianceModal && (
        <DoctorFormExperianceModal
          open={showExperianceModal}
          onNegativeFeedback={() => setShowExperiancegModal(false)}
          experiances={experiances}
          setExperiances={setExperiances}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__experiance__section__wrapper: {
    padding: "10px",
    borderRadius: "5px",
    boxShadow: BOX_SHADOW,
    marginBottom: "20px",
  },
  ccrt__experiance__section__header: {
    fontSize: "130%",
    fontWeight: "600",
  },
}));

DoctorExperianceSection.propTypes = {
  experiances: PropTypes.array.isRequired,
  setExperiances: PropTypes.func.isRequired,
};
export default DoctorExperianceSection;
