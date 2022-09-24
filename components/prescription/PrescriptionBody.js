import React, { useState } from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import AdvicesSection from "./body/AdvicesSection";
import CustomButton from "../button/CustomButton";
import DrugAdditionModal from "../modal/DrugAdditionModal";
import DrugDetailsCard from "../cards/DrugDetailsCard";
// import DrugSection from "./body/DrugSection";
// import DurationSection from "./body/DurationSection";

const PrescriptionBody = ({
  advices,
  setAdvices,
  addDrug,
  // showAddedForm,
  drugLists,
  editable = false,
  // setDrugLists,
  // durations,
  // setDurations,
}) => {
  const [showDrugAdditionModal, setShowDrugAdditionModal] = useState(false);
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
        <AdvicesSection
          editable={editable}
          advices={advices}
          setAdvices={setAdvices}
        />
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        alignItems="flex-start"
        item
        sm={12}
        lg={8}
      >
        {drugLists.map((item, index) => (
          <DrugDetailsCard
            key={item.drugName}
            serialNo={index + 1}
            drugName={item.drugName}
            hasPerDayRule={item.perDayRule}
            perDayRule={item.perDayRule}
            morning={item.morning}
            noon={item.noon}
            night={item.night}
            duration={item.duration.value + " " + item.duration.unit}
          />
        ))}
        {editable && (
          <Grid item xs={4} style={{ marginTop: 20 }}>
            <CustomButton
              title="Add a New Drug"
              onClick={() => {
                setShowDrugAdditionModal(true);
              }}
            />
          </Grid>
        )}
        {/* <Grid item sm={12} lg={8}>
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
        </Grid> */}
      </Grid>
      {showDrugAdditionModal && (
        <DrugAdditionModal
          open={open}
          addDrug={(drug) => {
            addDrug(drug);
            setShowDrugAdditionModal(false);
          }}
        />
      )}
    </Grid>
  );
};

PrescriptionBody.propTypes = {
  advices: PropTypes.string,
  setAdvices: PropTypes.func,
  addDrug: PropTypes.func.isRequired,
  // showAddedForm: PropTypes.bool.isRequired,
  drugLists: PropTypes.array,
  editable: PropTypes.bool,
  // setDrugLists: PropTypes.func,
  // durations: PropTypes.array,
  // setDurations: PropTypes.func,
};
export default PrescriptionBody;
