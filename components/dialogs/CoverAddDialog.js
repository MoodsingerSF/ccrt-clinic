import React, { useState } from "react";
import { Dialog, DialogContent, Grid } from "@mui/material";
import SignUpTextField from "../textfields/SignUpTextField";
import CustomButton from "../button/CustomButton";
import { addCover } from "../../controllers/CoverController";
import PropTypes from "prop-types";
import { errorHandler } from "../../misc/functions";
import { capitalize } from "lodash";

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
      errorHandler(error, openSnackbar);
    }
  };

  return (
    <Dialog open={open} onClose={onNegativeFeedback}>
      <DialogContent>
        <Grid container>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            // style={{ height: "88vh" }}
          >
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              item
              xs={12}
            >
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                item
                xs={12}
                style={{ width: "95%" }}
              >
                <SignUpTextField
                  label={`${capitalize(type)} id`}
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
                    }
                  }}
                  loading={loading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
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
