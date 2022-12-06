import React, { useState } from "react";
import {
  AppBar,
  Dialog,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import SignUpTextField from "../textfields/SignUpTextField";
import CustomButton from "../button/CustomButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowbackIcon from "@mui/icons-material/ArrowBack";
import { addCover } from "../../controllers/CoverController";
import PropTypes from "prop-types";
import { errorHandler } from "../../misc/functions";
import ImageAndTitleUploadCompBody from "../misc/ImageAndTitleUploadCompBody";
import BackdropHeaderComp from "../misc/BackdropHeaderComp";
import theme from "../../themes/theme";
import CustomCheckbox from "../textfields/CustomCheckbox";
import ImageUploadComp from "../misc/ImageUploadComp";

const YES = true;
const NO = false;

const CoverAddDialog = ({
  open,
  onNegativeFeedback,
  type,
  onSuccess,
  openSnackbar,
}) => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState("");
  const [checked, setChecked] = useState(YES);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSave = async (type, itemId, image, link) => {
    try {
      setLoading(true);
      const cover = await addCover({
        type,
        ...(itemId ? { itemId } : {}),
        ...(link ? { link } : {}),
        ...(image ? { image } : {}),
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

  const onImageChange = (image) => {
    setCoverImage(image);
  };

  return (
    <Dialog fullScreen open={open} onClose={onNegativeFeedback}>
      {type !== "OTHERS" ? (
        <Grid container justifyContent={"center"} alignItems={"center"}>
          {step === 1 && (
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
                    inputLabel={`What's the ${type.toLowerCase()} id?`}
                    type={"text"}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder={`${type.toLowerCase()} id`}
                  />
                  <CustomButton
                    title={"continue"}
                    onClick={() => {
                      if (id === "") {
                        openSnackbar(
                          `Please provide a valid ${type.toLowerCase()} id`
                        );
                      } else {
                        setStep(2);
                      }
                    }}
                    // loading={loading}
                    color={theme.palette.custom.BUTTON_BACKGROUND}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {step === 2 && (
            <Grid container>
              <AppBar sx={{ position: "relative" }}>
                <Toolbar
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="close"
                    onClick={() => setStep(1)}
                  >
                    <ArrowbackIcon />
                  </IconButton>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onNegativeFeedback}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                style={{
                  height: "88vh",
                }}
              >
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                  item
                  xs={11}
                  sm={4}
                >
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Typography>
                      Do you want to use the existing image?
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    onClick={() => {
                      if (checked !== YES) {
                        setChecked(YES);
                      }
                    }}
                  >
                    <CustomCheckbox checked={checked} name="Yes" />
                    <Typography style={{ cursor: "pointer" }}>Yes</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    onClick={() => {
                      if (checked !== NO) {
                        setChecked(NO);
                      }
                    }}
                  >
                    <CustomCheckbox checked={!checked} name="No" />
                    <Typography style={{ cursor: "pointer" }}>No</Typography>
                  </Grid>
                  <CustomButton
                    title={checked ? "save" : "continue"}
                    onClick={() => {
                      if (checked) {
                        onSave(type, id, null, null);
                      } else {
                        setStep(3);
                      }
                    }}
                    loading={checked ? loading : false}
                    color={theme.palette.custom.BUTTON_BACKGROUND}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {step === 3 && (
            <Grid container>
              <AppBar sx={{ position: "relative" }}>
                <Toolbar
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="close"
                    onClick={() => setStep(2)}
                  >
                    <ArrowbackIcon />
                  </IconButton>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onNegativeFeedback}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
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
                  sm={4}
                >
                  <ImageUploadComp
                    onFileChange={(image) => onImageChange(image)}
                  />

                  <CustomButton
                    title={"save"}
                    onClick={() => {
                      if (!coverImage) {
                        openSnackbar(`Please select cover image`);
                      } else {
                        onSave(type, id, coverImage, null);
                      }
                    }}
                    loading={loading}
                    color={theme.palette.custom.BUTTON_BACKGROUND}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <ImageAndTitleUploadCompBody
            onNegativeFeedback={onNegativeFeedback}
            onSave={(image, link) => onSave(type, id, image, link)}
            headerTitle={"Enter Url"}
            openSnackbar={openSnackbar}
          />
        </Grid>
      )}
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
