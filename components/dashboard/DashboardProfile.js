import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Grid,
  Modal,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SignUpTextField from "../textfields/SignUpTextField";
import CustomButton from "../button/CustomButton";
import { validateName } from "../../controllers/signupController";
import { formErrors } from "../../data/signup/data";
import { UPDATE_PROFILE } from "../../data/dashboard/data";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PhotoEditingDialog from "../dialogs/PhotoEditingDialog";
import theme from "../../src/themes/theme";

const DashboardProfile = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [ProfilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(
    `${"/images/ArtistScreen/logo2.jpg"}`
  );

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClosemodal = () => {
    setOpen(false);
  };

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmitForm = () => {
    if (validate(firstName, lastName)) {
      // if everything is alright, send verification code
      setLoading(true);
      //api
      // setLoading(false);
    } else {
      setShowError(true);
    }
  };

  const validate = (firstName, lastName) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = validateName(firstName) && validateName(lastName);
    return isEverythingAllRight;
  };

  const onCoverPhotoChange = (event) => {
    setProfilePhoto(event.target.files[0]);
    setProfilePhotoPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onSaveProfilePicture = () => {
    if (ProfilePhoto !== null) {
      setOpenEditDialog(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt_dashboard__profile__section}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.ccrt_dashboard__profile__top__bg}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.ccrt_dashboard__profile__top__profile__wrapper}
        >
          <Image
            src={profilePhotoPreview.toString()}
            alt={ProfilePhoto !== null ? "Profile picture" : ""}
            width={200}
            height={200}
          />
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={
            classes.ccrt_dashboard__profile__change__icon_button__wrapper
          }
        >
          <IconButton
            onClick={() => setOpenEditDialog(true)}
            className={classes.ccrt_dashboard__profile__change__icon_button}
          >
            <AddAPhotoIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.ccrt_dashboard__profile__details__section}
      >
        <Typography>First name: Azizul</Typography>
        <Typography>Last name: Islam</Typography>
        <Typography>Email: rajib@gmail.com</Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Button variant="contained" onClick={() => setOpen(true)}>
          Update Profile
        </Button>
      </Grid>
      <PhotoEditingDialog
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
        }}
        title="Edit profile"
        onSave={onSaveProfilePicture}
        onChange={onCoverPhotoChange}
        profilePhotoPreview={profilePhotoPreview}
      />
      <Modal open={open} onClose={handleClosemodal}>
        <Box sx={style}>
          <Typography style={{ marginBottom: "10px" }}>
            Update your profile
          </Typography>
          <Grid container justifyContent="center" alignItems="center">
            <SignUpTextField
              label="First Name"
              type="text"
              value={firstName}
              onChange={handleChangeFirstName}
              error={showError && !validateName(firstName)}
              errorText={formErrors.name}
            />
            <SignUpTextField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={handleChangeLastName}
              error={showError && !validateName(lastName)}
              errorText={formErrors.name}
            />
          </Grid>
          <CustomButton
            icon={null}
            title={UPDATE_PROFILE}
            onClick={handleSubmitForm}
            size="small"
            loading={loading}
          />
        </Box>
      </Modal>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt_dashboard__profile__section: {
    position: "relative",
  },
  ccrt_dashboard__profile__top__bg: {
    position: "relative",
    height: "200px",
    background: theme.palette.custom.DEFAULT_COLOR_MINUS_20,
  },
  ccrt_dashboard__profile__top__profile__wrapper: {
    position: "absolute",
    top: "30%",
    width: "200px",
    height: "200px",
    overflow: "hidden",
    borderRadius: "50%",
    background: theme.palette.custom.DEFAULT_COLOR_MINUS_18,
    textAlign: "center",
  },
  ccrt_dashboard__profile__details__section: {
    marginTop: "100px",
    display: "block",
    textAlign: "center",
  },
  ccrt_dashboard__profile__change__icon_button__wrapper: {
    position: "relative",
    width: "200px",
    height: "200px",
  },
  ccrt_dashboard__profile__change__icon_button: {
    position: "absolute",
    bottom: "-18px",
    left: "-9%",
    color: theme.palette.custom.DEFAULT_COLOR,
  },
});

export default DashboardProfile;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
