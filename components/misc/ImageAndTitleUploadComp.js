import { Grid } from "@mui/material";
import { useTheme } from "@mui/styles";
import React, { useState } from "react";
import CustomButton from "../button/CustomButton";
import SignUpTextField from "../textfields/SignUpTextField";
import ImageUploadComp from "./ImageUploadComp";
import PropTypes from "prop-types";
import { errorHandler } from "../../misc/functions";
import { useRouter } from "next/router";

const ImageAndTitleUploadComp = ({ onSave, headerTitle, openSnackbar }) => {
  const theme = useTheme();
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const save = async (image, title) => {
    try {
      if (title === "" || !image) {
        openSnackbar(`Please fill all the input fields.`);
      } else {
        setLoading(true);
        await onSave(image, title);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorHandler(error, openSnackbar, router);
    }
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      item
      xs={12}
    >
      <ImageUploadComp onFileChange={(image) => setImage(image)} />
      <SignUpTextField
        type={"text"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={headerTitle}
      />

      <CustomButton
        size="small"
        title={"save"}
        onClick={() => {
          save(image, title);
        }}
        loading={loading}
        color={theme.palette.custom.BUTTON_BACKGROUND}
      />
    </Grid>
  );
};
ImageAndTitleUploadComp.propTypes = {
  onSave: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default ImageAndTitleUploadComp;
