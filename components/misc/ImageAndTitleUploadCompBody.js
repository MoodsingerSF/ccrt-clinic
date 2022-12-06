import React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import ImageAndTitleUploadComp from "./ImageAndTitleUploadComp";
import BackdropHeaderComp from "./BackdropHeaderComp";

const ImageAndTitleUploadCompBody = ({
  onNegativeFeedback,
  onSave,
  headerTitle,
  openSnackbar,
}) => {
  return (
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
          md={6}
          xl={4}
        >
          <ImageAndTitleUploadComp
            headerTitle={headerTitle}
            onSave={onSave}
            openSnackbar={openSnackbar}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

ImageAndTitleUploadCompBody.propTypes = {
  onNegativeFeedback: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
  openSnackbar: PropTypes.string.isRequired,
};
export default ImageAndTitleUploadCompBody;
