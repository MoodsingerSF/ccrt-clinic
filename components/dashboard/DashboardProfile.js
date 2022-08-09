import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import theme from "../../src/themes/theme";
import { makeStyles } from "@mui/styles";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UserDataRow from "./user-profile/UserDataRow";
const PhotoEditingDialog = dynamic(() =>
  import("../dialogs/PhotoEditingDialog")
);
// const UpdateProfileModal = dynamic(() => import("../modal/UpdateProfileModal"));

const DashboardProfile = () => {
  const classes = useStyles();

  const theme = useTheme();
  const IsDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const Is4KDesktop = useMediaQuery(theme.breakpoints.up("xl"));

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [ProfilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(
    `${"/images/ArtistScreen/logo2.jpg"}`
  );

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
        style={{
          height: Is4KDesktop ? "250px" : IsDesktop ? "150px" : "100px",
        }}
      >
        <Avatar
          className={classes.ccrt_dashboard__profile__top__profile__wrapper}
          style={{
            width: Is4KDesktop ? "250px" : IsDesktop ? "150px" : "100px",
            height: Is4KDesktop ? "250px" : IsDesktop ? "150px" : "100px",
          }}
        >
          <Image
            src={profilePhotoPreview.toString()}
            alt={ProfilePhoto !== null ? "Profile picture" : ""}
            layout="fill"
            objectFit="cover"
            width={Is4KDesktop ? "250px" : IsDesktop ? "150px" : "100px"}
            height={Is4KDesktop ? "250px" : IsDesktop ? "150px" : "100px"}
          />
          <IconButton
            onClick={() => setOpenEditDialog(true)}
            className={classes.ccrt_dashboard__profile__change__icon_button}
            style={{
              width: Is4KDesktop ? "250px" : IsDesktop ? "150px" : "100px",
              height: Is4KDesktop ? "250px" : IsDesktop ? "150px" : "100px",
            }}
          >
            <AddAPhotoIcon />
          </IconButton>
        </Avatar>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          marginTop: Is4KDesktop ? "100px" : IsDesktop ? "80px" : "60px",
        }}
      >
        <UserDataRow
          title="FirstName"
          value="Azizul"
          icon={<PersonOutlineIcon />}
          editable={true}
        />
        <UserDataRow
          title="LastName"
          value="Islam"
          icon={<PersonOutlineIcon />}
          editable={true}
        />
        <UserDataRow
          title="Email"
          value="test@gmail.com"
          icon={<MailOutlineIcon />}
        />
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
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt_dashboard__profile__section: {
    position: "relative",
  },
  ccrt_dashboard__profile__top__bg: {
    position: "relative",
    background: theme.palette.custom.DEFAULT_COLOR_MINUS_20,
  },
  ccrt_dashboard__profile__top__profile__wrapper: {
    position: "absolute",
    top: "30%",
    borderRadius: "50%",
    overflow: "hidden",
    background: theme.palette.custom.DEFAULT_COLOR_MINUS_18,
  },
  ccrt_dashboard__profile__change__icon_button: {
    position: "absolute",
    color: "#fff",
    opacity: "0",
    transition: "opacity 0.6s ease",
    "&:hover": {
      opacity: "1",
    },
  },
});

export default DashboardProfile;
