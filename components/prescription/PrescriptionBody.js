import React, { useState } from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import CustomButton from "../button/CustomButton";
import DrugAdditionModal from "../modal/DrugAdditionModal";
import DrugDetailsCard from "../cards/DrugDetailsCard";
import AddIcon from "@mui/icons-material/Add";
const PrescriptionBody = ({ addDrug, drugLists, editable = false }) => {
  const [showDrugAdditionModal, setShowDrugAdditionModal] = useState(false);
  return (
    <Grid container justifyContent={"center"} alignItems="flex-start">
      <Grid
        container
        direction="column"
        justifyContent={"flex-start"}
        alignItems="flex-start"
        item
        xs={12}
        // style={{ background: "blue" }}
      >
        {drugLists.map((item, index) => (
          <Grid item xs={8} key={item.drugName} style={{ marginLeft: 15 }}>
            <DrugDetailsCard
              serialNo={index + 1}
              drugName={item.drugName}
              hasPerDayRule={item.perDayRule}
              perDayRule={item.perDayRule}
              morning={item.morning}
              noon={item.noon}
              night={item.night}
              duration={item.duration.value + " " + item.duration.unit}
              timeGapWithMeal={item.timeGapWithMeal}
              relationWithMeal={item.relationWithMeal}
            />
          </Grid>
        ))}
      </Grid>
      {editable && (
        <Grid item xs={4} style={{ marginTop: 20 }}>
          <CustomButton
            icon={<AddIcon />}
            title="Add a New Drug"
            onClick={() => {
              setShowDrugAdditionModal(true);
            }}
          />
        </Grid>
      )}
      {showDrugAdditionModal && (
        <DrugAdditionModal
          open={true}
          addDrug={(drug) => {
            addDrug(drug);
          }}
          onClose={() => {
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
  drugLists: PropTypes.array,
  editable: PropTypes.bool,
};
export default PrescriptionBody;
