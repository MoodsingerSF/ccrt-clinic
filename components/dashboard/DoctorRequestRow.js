import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  Avatar,
  Grid,
  IconButton,
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
            <Typography
              className={classNames({
                [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
                  !matchesSm,
                [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
                  matchesSm,
              })}
              style={{ marginLeft: 5 }}
            >
              {serialNo + 1}
            </Typography>
            <Avatar
              src={profileImageUrl}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              {profileImageUrl ? null : capitalize(firstName).charAt(0)}
            </Avatar>
            <Typography
              className={classNames({
                [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
                  !matchesSm,
                [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
                  matchesSm,
              })}
            >
              {firstName + " " + lastName}
            </Typography>
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
                  <CustomChip title={item} color={"#2ecc71"} />
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
          {`${fee} tk`}
        </td>
        <td
          className={classNames({
            [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
              matchesSm,
          })}
        >
          {email}
        </td>
        <td
          className={classNames({
            [classes.ccrt__dashboard__doctor__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__doctor__req__table__data__desktop]:
              matchesSm,
          })}
        >
          <Grid container justifyContent="center" alignItems="center">
            <CustomChip title="Pending" color="#1abc9c" />
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
          <Tooltip title="Accept Request">
            <IconButton
              size="small"
              color="success"
              onClick={() => {
                setShowAcceptanceConfirmationModal(true);
              }}
            >
              <FileDownloadDoneOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reject Request">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setShowRejectionConfirmationModal(true);
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={!showDoctorDetails ? "View Details" : "Hide Details"}>
            <IconButton
              size="small"
              color="secondary"
              onClick={handleShowDoctorDetails}
            >
              {showDoctorDetails ? (
                <ExpandLessOutlinedIcon />
              ) : (
                <ExpandMoreOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
        </td>
      </tr>
      {showDoctorDetails ? (
        <tr
          style={{
            background: "#F7F8FC",
            boxShadow: DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW,
          }}
        >
          <td
            colSpan="4"
            style={{
              padding: "10px",
            }}
          >
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
          </td>
        </tr>
      ) : null}
      {showAcceptanceConfirmationModal && (
        <ConfirmationModal
          title="Are you sure you want to accept this doctor request?"
          onPositiveFeedback={handleAcceptanceOfDoctorRequest}
          onNegativeFeedback={() => {
            setShowAcceptanceConfirmationModal(false);
          }}
        />
      )}

      {showRejectionConfirmationModal && (
        <ConfirmationModal
          title="Are you sure you want to reject this doctor request?"
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
    fontSize: "85%",
    fontWeight: 400,
  },
  ccrt__dashboard__doctor__req__table__data__desktop: {
    // borderBottom: "1px solid #ddd",
    padding: "8px 0",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "85%",
    fontWeight: 400,
  },
  ccrt__dashboard__doctor__req__table__data__row: {
    "&:hover": {
      background: "#f6f6f6",
    },
    borderBottom: `.5px solid ${theme.palette.custom.DEFAULT_COLOR}`,
  },
  details_text: {
    fontSize: "80%",
  },

  email: {
    fontSize: "70%",
  },
}));
export default DoctorRequestRow;
