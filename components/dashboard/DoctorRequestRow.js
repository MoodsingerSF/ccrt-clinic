import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  Avatar,
  // Button,
  Grid,
  // IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW } from "../../misc/colors";
import { capitalize } from "lodash";
import {
  acceptDoctorRequest,
  rejectDoctorRequest,
} from "../../controllers/UserController";
import ConfirmationModal from "../modal/ConfirmationModal";
import CustomChip from "../chip/CustomChip";
import ActionButton from "../button/ActionButton";

const DoctorRequestRow = ({
  serialNo,
  userId,
  firstName,
  lastName,
  profileImageUrl,
  email,
  specializations,
  fee,
  openSnackbar,
  openLoader,
  closeLoader,
  onSuccess,
}) => {
  console.log(specializations);
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [showAcceptanceConfirmationModal, setShowAcceptanceConfirmationModal] =
    useState(false);
  const [showRejectionConfirmationModal, setShowRejectionConfirmationModal] =
    useState(false);

  const handleShowDoctorDetails = () => {
    setShowDoctorDetails(!showDoctorDetails);
  };

  const handleAcceptanceOfDoctorRequest = async () => {
    try {
      setShowRejectionConfirmationModal(false);
      openLoader();
      await acceptDoctorRequest(userId);
      onSuccess(userId);
      closeLoader();
      openSnackbar("User has been accepted successfully");
    } catch (error) {
      closeLoader();
      if (error && error.response) {
        openSnackbar(error.response.data.message);
      }
    }
  };
  const handleRejectionOfDoctorRequest = async () => {
    try {
      setShowRejectionConfirmationModal(false);
      openLoader();
      await rejectDoctorRequest(userId);
      onSuccess(userId);
      closeLoader();
      openSnackbar("User has been rejected successfully");
    } catch (error) {
      closeLoader();
      if (error && error.response) {
        openSnackbar(error.response.data.message);
      }
    }
  };

  return (
    <>
      <tr className={classes.ccrt__dashboard__doctor__req__table__data__row}>
        <td>
          <Grid container justifyContent="flex-start" alignItems="center">
            {/* <Typography
              className={classNames({
                [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
                  !matchesSm,
                [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
                  matchesSm,
              })}
              style={{ marginLeft: 5 }}
            > */}
            <Typography className={classes.textStyle}>
              {serialNo + 1}
            </Typography>
            {/* </Typography> */}
            <Avatar src={profileImageUrl} className={classes.avatarStyle}>
              {profileImageUrl ? null : capitalize(firstName).charAt(0)}
            </Avatar>
            {/* <Typography
              className={classNames({
                [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
                  !matchesSm,
                [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
                  matchesSm,
              })}
            > */}
            <Typography className={classes.textStyle}>
              {firstName + " " + lastName}
            </Typography>
            {/* </Typography> */}
          </Grid>
        </td>
        <td
          className={classNames({
            [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
              matchesSm,
          })}
        >
          <Grid container justifyContent={"center"} alignItems="center">
            {specializations.map((item) => {
              return (
                <Grid item key={item} style={{ marginRight: 4 }}>
                  <CustomChip title={item} onlyBorder={true} />
                </Grid>
              );
            })}
          </Grid>
        </td>
        <td
          className={classNames({
            [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
              matchesSm,
          })}
        >
          <Typography className={classes.textStyle}>{`${fee}`}</Typography>
        </td>
        {/* <td
          className={classNames({
            [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
              matchesSm,
          })}
        >
          <Typography className={classes.textStyle}>{email}</Typography>
        </td> */}
        {/* <td
          className={classNames({
            [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
              matchesSm,
          })}
        >
          <Grid container justifyContent="center" alignItems="center">
            <CustomChip title="Pending" onlyBorder={true} />
          </Grid>
        </td> */}
        <td
          className={classNames({
            [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
              matchesSm,
          })}
        >
          <Tooltip title="Accept Request">
            <ActionButton
              title="Accept"
              icon={<FileDownloadDoneOutlinedIcon />}
              type="success"
              onClick={() => {
                setShowAcceptanceConfirmationModal(true);
              }}
            />
            {/* <Button
              variant="outlined"
              size="small"
              startIcon={<FileDownloadDoneOutlinedIcon fontSize="small" />}
            >
              Accept
            </Button> */}
            {/* <IconButton
              size="small"
              // color="success"
              onClick={() => {
                setShowAcceptanceConfirmationModal(true);
              }}
            >
              <FileDownloadDoneOutlinedIcon fontSize="small" />
            </IconButton> */}
          </Tooltip>
          <Tooltip title="Reject Request">
            <ActionButton
              title="Reject"
              icon={<ClearIcon />}
              type="error"
              onClick={() => {
                setShowRejectionConfirmationModal(true);
              }}
            />
          </Tooltip>
          <Tooltip title={!showDoctorDetails ? "View Details" : "Hide Details"}>
            <ActionButton
              title={!showDoctorDetails ? "View Details" : "Hide Details"}
              icon={
                showDoctorDetails ? (
                  <ExpandLessOutlinedIcon />
                ) : (
                  <ExpandMoreOutlinedIcon />
                )
              }
              type="info"
              onClick={handleShowDoctorDetails}
            />
            {/* <IconButton
              size="small"
              color="secondary"
              onClick={handleShowDoctorDetails}
            >
              {showDoctorDetails ? (
                <ExpandLessOutlinedIcon />
              ) : (
                <ExpandMoreOutlinedIcon />
              )}
            </IconButton> */}
          </Tooltip>
        </td>
      </tr>
      {showDoctorDetails ? (
        <tr
          style={{
            background: theme.palette.custom.BLACK,
            borderRadius: 5,
            // width: "100%",
            boxShadow: DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW,
          }}
        >
          <td
            colSpan="5"
            style={{
              padding: "10px",
            }}
          >
            <Grid container justifyContent={"center"} alignItems="center">
              <Grid
                item
                container
                justifyContent={"center"}
                alignItems="center"
                style={{ marginBottom: 10 }}
              >
                <Avatar
                  src={profileImageUrl}
                  style={{
                    height: "15vh",
                    width: "15vh",
                    borderRadius: "15vh",
                    background: theme.palette.custom.GREEN,
                  }}
                >
                  {profileImageUrl ? null : capitalize(firstName).charAt(0)}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography className={classes.details_text}>
                  User Id: {userId}
                </Typography>
                <Typography className={classes.details_text}>
                  First Name: {firstName}
                </Typography>
                <Typography className={classes.details_text}>
                  Last Name: {lastName}
                </Typography>
                <Typography className={classes.details_text}>
                  Email: {email}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                <Typography
                  style={{
                    color: theme.palette.custom.GREEN,
                    fontSize: "120%",
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  Specializations
                </Typography>
                <Grid container justifyContent="center" alignItems="center">
                  {specializations.map((item) => {
                    return (
                      <CustomChip
                        key={item}
                        title={item}
                        color={theme.palette.custom.RED}
                        // onlyBorder={true}
                        fontColor="white"
                      />
                    );
                  })}
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                <Typography
                  style={{
                    color: theme.palette.custom.GREEN,
                    fontSize: "120%",
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  Fee Per Visit
                </Typography>

                <Typography
                  style={{
                    color: "white",
                    fontSize: "120%",
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  &#2547; {fee} TK
                </Typography>
              </Grid>
            </Grid>
          </td>
        </tr>
      ) : null}
      {showAcceptanceConfirmationModal && (
        <ConfirmationModal
          title="Are you sure you want to accept this doctor registration request?"
          onPositiveFeedback={handleAcceptanceOfDoctorRequest}
          onNegativeFeedback={() => {
            setShowAcceptanceConfirmationModal(false);
          }}
        />
      )}

      {showRejectionConfirmationModal && (
        <ConfirmationModal
          title="Are you sure you want to reject this doctor registration request?"
          onPositiveFeedback={handleRejectionOfDoctorRequest}
          onNegativeFeedback={() => {
            setShowRejectionConfirmationModal(false);
          }}
        />
      )}
    </>
  );
};
DoctorRequestRow.propTypes = {
  serialNo: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string,
  email: PropTypes.string.isRequired,
  specializations: PropTypes.array.isRequired,
  fee: PropTypes.number.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  openLoader: PropTypes.func.isRequired,
  closeLoader: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  ccrt__dashboard__doctor__req__table__data__mobile: {
    // borderBottom: "1px solid #ddd",
    padding: "12px 0",
    cursor: "pointer",
    textAlign: "center",
    // fontSize: "85%",
    fontWeight: 400,
  },
  ccrt__dashboard__doctor__req__table__data__desktop: {
    // borderBottom: "1px solid #ddd",
    padding: "8px 0",
    cursor: "pointer",
    textAlign: "center",
    // fontSize: "85%",
    fontWeight: 400,
  },
  ccrt__dashboard__doctor__req__table__data__row: {
    "&:hover": {
      background: "#f6f6f6",
    },
    height: 70,
    borderBottom: `.5px solid ${theme.palette.custom.DEFAULT_COLOR}`,
  },
  details_text: {
    color: "white",
    fontSize: "85%",
    fontWeight: 500,
  },

  email: {
    // fontSize: "70%",
  },
  avatarStyle: {
    marginLeft: 10,
    marginRight: 10,
    border: `1px solid ${theme.palette.custom.GREEN}`,
    background: theme.palette.custom.BLACK,
  },
  textStyle: {
    color: theme.palette.custom.BLACK,
    fontSize: "85%",
    fontWeight: 500,
  },
}));
export default DoctorRequestRow;
