import React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import AdvicesSection from "./body/AdvicesSection";
import DrugSection from "./body/DrugSection";
import DurationSection from "./body/DurationSection";

const PrescriptionBody = ({
  advides,
  setAdvices,
  showAddedForm,
  drugLists,
  setDrugLists,
  durations,
  setDurations,
}) => {
  return (
    <Grid container justifyContent={"center"} alignItems="flex-start">
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        item
        sm={12}
        lg={4}
      >
        <AdvicesSection advides={advides} setAdvices={setAdvices} />
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        alignItems="flex-start"
        item
        sm={12}
        lg={8}
      >
        <Grid item sm={12} lg={8}>
          <DrugSection
            showAddedForm={showAddedForm}
            drugLists={drugLists}
            setDrugLists={setDrugLists}
          />
        </Grid>
        <Grid item sm={12} lg={4}>
          <DurationSection
            durations={durations}
            setDurations={setDurations}
            showAddedForm={showAddedForm}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

PrescriptionBody.propTypes = {
  advides: PropTypes.string,
  setAdvices: PropTypes.func,
  showAddedForm: PropTypes.bool.isRequired,
  drugLists: PropTypes.array,
  setDrugLists: PropTypes.func,
  durations: PropTypes.array,
  setDurations: PropTypes.func,
};
export default PrescriptionBody;
