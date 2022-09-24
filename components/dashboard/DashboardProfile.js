import React, { useContext, useEffect, useReducer, useState } from "react";
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
import InfoIcon from "@mui/icons-material/Info";
import { createStyles, makeStyles } from "@mui/styles";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UserDataRow from "./user-profile/UserDataRow";
import {
  feeChangingRequests,
  retrieveUserDetails,
  updateAbout,
  updateFirstName,
  updateLastName,
  updateProfilePicture,
} from "../../controllers/UserController";
import {
  validateName,
  validateUpdateFee,
} from "../../controllers/SignupController";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import { SNACKBAR_INITIAL_STATE } from "../../misc/constants";
import DashboardLoaderComponent from "./DashboardLoaderComponent";
import { retrieveUserId } from "../../controllers/LocalStorageController";
import DoctorInfoForm from "../../pages/doctorInfoForm";
import { Context } from "../../contexts/user-context/UserContext";
import { Role } from "../../enums/Role";
import DoctorPriceTag from "./DoctorPriceTag";
import DoctorAbout from "./DoctorAbout";
const PhotoEditingDialog = dynamic(() =>
  import("../dialogs/PhotoEditingDialog")
);
// const UpdateProfileModal = dynamic(() => import("../modal/UpdateProfileModal"));
const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "initialize":
      return { ...payload };
    case "first-name":
      return { ...state, firstName: payload.firstName };
    case "last-name":
      return { ...state, lastName: payload.lastName };
    case "profile-image-url":
      return { ...state, profileImageUrl: payload.profileImageUrl };
    case "fee":
      return { ...state, fee: payload.fee };
    case "about":
      return { ...state, about: payload.about };
    default:
      return state;
  }
};
const DashboardProfile = () => {
  const { getRole } = useContext(Context);
  const classes = useStyles();

  const theme = useTheme();
  const IsDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const Is4KDesktop = useMediaQuery(theme.breakpoints.up("xl"));

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const [user, dispatch] = useReducer(reducer, null);
  const [loading, setLoading] = useState(false);
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const data = await retrieveUserDetails(retrieveUserId());
      setLoading(false);
      console.log(data);
      dispatch({ type: "initialize", payload: data });
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      {loading ? (
        <DashboardLoaderComponent />
      ) : !user ? null : (
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
              {user.profileImageUrl && (
                <Image
                  loader={({ src }) => src}
                  src={user.profileImageUrl}
                  alt={"Profile Picture"}
                  layout="fill"
                  objectFit="cover"
                  width={Is4KDesktop ? "250px" : IsDesktop ? "150px" : "100px"}
                  height={Is4KDesktop ? "250px" : IsDesktop ? "150px" : "100px"}
                />
              )}

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
            {getRole() === Role.DOCTOR && (
              <DoctorPriceTag
                title="Fee"
                price={user.fee}
                editable={true}
                onSave={feeChangingRequests}
                validate={(editableValue, updatedValue) =>
                  validateUpdateFee(editableValue, updatedValue)
                }
                // onSuccess={(newFee) => {
                //   dispatch({
                //     type: "fee",
                //     payload: { fee: newFee },
                //   });
                // }}
                openSnackbar={openSnackbar}
              />
            )}
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
              title="First Name"
              value={user.firstName}
              icon={<PersonOutlineIcon />}
              editable={true}
              validate={(newFirstName) => validateName(newFirstName)}
              onSave={updateFirstName}
              onSuccess={(newFirstName) => {
                dispatch({
                  type: "first-name",
                  payload: { firstName: newFirstName },
                });
              }}
              openSnackbar={openSnackbar}
            />
            <UserDataRow
              title="Last Name"
              value={user.lastName}
              icon={<PersonOutlineIcon />}
              editable={true}
              validate={(newLastName) => validateName(newLastName)}
              onSave={updateLastName}
              onSuccess={(newLastName) => {
                dispatch({
                  type: "last-name",
                  payload: { lastName: newLastName },
                });
              }}
              openSnackbar={openSnackbar}
            />
            <UserDataRow
              title="Email"
              value={user.email}
              icon={<MailOutlineIcon />}
            />
            {getRole() === Role.DOCTOR && (
              <>
                <DoctorAbout
                  title={"About"}
                  value={user.about}
                  icon={<InfoIcon />}
                  editable={true}
                  validate={(newAbout) => validateName(newAbout)}
                  onSave={updateAbout}
                  onSuccess={(newAbout) => {
                    dispatch({
                      type: "about",
                      payload: { about: newAbout },
                    });
                  }}
                  openSnackbar={openSnackbar}
                />
                <DoctorInfoForm
                  headingShow={false}
                  educationList={user.education}
                  trainingList={user.trainings}
                  experienceList={user.experiences}
                  awardList={user.awards}
                />
              </>
            )}
          </Grid>
          <PhotoEditingDialog
            open={openEditDialog}
            onClose={() => {
              setOpenEditDialog(false);
            }}
            title="Update Profile Picture"
            onSave={async (profilePicture) => {
              const { profileImageUrl } = await updateProfilePicture(
                profilePicture
              );
              dispatch({
                type: "profile-image-url",
                payload: {
                  profileImageUrl: profileImageUrl,
                },
              });
            }}
            openSnackbar={openSnackbar}
          />
        </Grid>
      )}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => handleSnackbarClose(setSnackbar)}
      />
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt_dashboard__profile__section: {
      position: "relative",
    },
    ccrt_dashboard__profile__top__bg: {
      position: "relative",
      background: theme.palette.custom.DEFAULT_COLOR_MINUS_20,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
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
  })
);

export default DashboardProfile;
