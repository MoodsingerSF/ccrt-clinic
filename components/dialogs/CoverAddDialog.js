import React, { useState } from "react";
import { Dialog, Grid } from "@mui/material";
import BackdropHeaderComp from "../misc/BackdropHeaderComp";
import SignUpTextField from "../textfields/SignUpTextField";
import CustomButton from "../button/CustomButton";
import { addCover } from "../../controllers/CoverController";
import PropTypes from "prop-types";

const CoverAddDialog = ({
  open,
  onNegativeFeedback,
  type,
  onSuccess,
  openSnackbar,
}) => {
  const [itemId, setItemId] = useState("");
  const [loading, setLoading] = useState(false);

  const onSave = async (type, itemId) => {
    try {
      setLoading(true);
      const cover = await addCover({
        type,
        itemId,
      });
      onSuccess(cover);
      setLoading(false);
      onNegativeFeedback();
      openSnackbar(`Cover has been added successfully.`);
    } catch (error) {
      setLoading(false);
      openSnackbar(error.message);
      console.log(error);
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={onNegativeFeedback}>
      <Grid container>
        <BackdropHeaderComp onClose={onNegativeFeedback} />
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          style={{ height: "88vh" }}
        >
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            item
            xs={11}
            sm={8}
            md={7}
            lg={6}
            xl={4}
          >
            <SignUpTextField
              label={`What's the ${type.toLowerCase()} id?`}
              type={"text"}
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              placeholder={`${type.toLowerCase()} id`}
            />
            <CustomButton
              title={"Save"}
              onClick={() => {
                if (itemId === "") {
                  openSnackbar(
                    `Please provide a valid ${type.toLowerCase()} id`
                  );
                } else {
                  onSave(type, itemId);
                  console.log(type, itemId);
                }
              }}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};
CoverAddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};
export default CoverAddDialog;
