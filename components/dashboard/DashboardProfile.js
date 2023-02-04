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
// import InfoIcon from "@mui/icons-material/Info";
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
  validateText,
  validateUpdateFee,
} from "../../controllers/signupController";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import { SNACKBAR_INITIAL_STATE } from "../../misc/constants";
import DashboardLoaderComponent from "./DashboardLoaderComponent";
import { retrieveUserId } from "../../controllers/LocalStorageController";
import { Context } from "../../contexts/user-context/UserContext";
import { Role } from "../../enums/Role";
import DoctorPriceTag from "./DoctorPriceTag";
import DoctorAbout from "./DoctorAbout";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DoctorInfoForm from "../misc/doctorInfoForm";
const PhotoEditingDialog = dynamic(() =>
  import("../dialogs/PhotoEditingDialog")
);
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
  const [userDetails, setUserDetails] = useState({
    education: [],
    trainings: [],
    experiences: [],
    awards: [],
  });

  const [loading, setLoading] = useState(false);
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const data = await retrieveUserDetails(retrieveUserId());
      setLoading(false);
      dispatch({ type: "initialize", payload: data });
      setUserDetails({
        education: data.education,
        trainings: data.trainings,
        experiences: data.experiences,
        awards: data.awards,
      });
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
                  src={"/" + user.profileImageUrl}
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
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{
              marginTop: Is4KDesktop ? "100px" : IsDesktop ? "80px" : "60px",
            }}
          >
            {getRole() === Role.DOCTOR && (
              <Grid
                container
                justifyContent={"center"}
                alignItems="center"
                style={{ marginTop: -20, marginBottom: 10 }}
              >
                <DoctorPriceTag
                  title="Fee"
                  price={user.fee}
                  editable={true}
                  onSave={feeChangingRequests}
                  validate={(editableValue, updatedValue) =>
                    validateUpdateFee(editableValue, updatedValue)
                  }
                  openSnackbar={openSnackbar}
                />
              </Grid>
            )}
            <UserDataRow
              title="First Name"
              value={user.firstName}
              icon={<PersonOutlineIcon className={classes.iconStyle} />}
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
              icon={<PersonOutlineIcon className={classes.iconStyle} />}
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
              icon={<MailOutlineIcon className={classes.iconStyle} />}
            />
            {getRole() === Role.DOCTOR && (
              <>
                <DoctorAbout
                  title={"About"}
                  value={user.about}
                  icon={<InfoOutlinedIcon className={classes.iconStyle} />}
                  editable={true}
                  validate={(newAbout) => validateText(newAbout)}
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
                  educationList={userDetails.education}
                  trainingList={userDetails.trainings}
                  experienceList={userDetails.experiences}
                  awardList={userDetails.awards}
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
      background: theme.palette.custom.BLACK,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    ccrt_dashboard__profile__top__profile__wrapper: {
      position: "absolute",
      top: "30%",
      borderRadius: "50%",
      overflow: "hidden",
      background: theme.palette.custom.BLACK,
      // border: `1.5px dashed ${theme.palette.custom.BLUE}`,
    },
    iconStyle: { color: theme.palette.custom.BLACK, fontSize: "150%" },
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
