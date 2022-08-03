import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW } from "../../misc/colors";

const DoctorRequestRow = ({ doctor }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [showDctrDetails, setShowDctrDetails] = useState(false);

  const handleShowDctrDetails = () => {
    setShowDctrDetails(!showDctrDetails);
  };

  return (
    <>
      <tr className={classes.ccrt__dashboard__dctr__req__table__data__row}>
        <td
          className={classNames({
            [classes.ccrt__dashboard__dctr__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__dctr__req__table__data__desktop]:
              matchesSm,
          })}
        >
          {doctor.name}
        </td>
        <td
          className={classNames({
            [classes.ccrt__dashboard__dctr__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__dctr__req__table__data__desktop]:
              matchesSm,
          })}
        >
          {doctor.email}
        </td>
        <td
          className={classNames({
            [classes.ccrt__dashboard__dctr__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__dctr__req__table__data__desktop]:
              matchesSm,
          })}
        >
          {doctor.status}
        </td>
        <td
          className={classNames({
            [classes.ccrt__dashboard__dctr__req__table__data__mobile]:
              !matchesSm,
            [classes.ccrt__dashboard__dctr__req__table__data__desktop]:
              matchesSm,
          })}
        >
          <IconButton size="small" color="success">
            <FileDownloadDoneOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <ClearIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="secondary"
            onClick={handleShowDctrDetails}
          >
            {showDctrDetails ? (
              <ExpandLessOutlinedIcon />
            ) : (
              <ExpandMoreOutlinedIcon />
            )}
          </IconButton>
        </td>
      </tr>
      {showDctrDetails ? (
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
            <Typography>Name: {doctor.name}</Typography>
            <Typography>Email: {doctor.email}</Typography>
            <Typography>About Doctor: lorem</Typography>
            {/* <Typography>Name: {doctor.name}</Typography>
            <Typography>Email: {doctor.email}</Typography>
            <Typography>About Doctor: lorem</Typography> */}
          </td>
        </tr>
      ) : null}
    </>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard__dctr__req__table__data__mobile: {
    borderBottom: "1px solid #ddd",
    padding: "12px 0",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "80%",
  },
  ccrt__dashboard__dctr__req__table__data__desktop: {
    borderBottom: "1px solid #ddd",
    padding: "8px 0",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "95%",
  },
  ccrt__dashboard__dctr__req__table__data__row: {
    "&:hover": {
      background: "#f6f6f6",
    },
  },
});
export default DoctorRequestRow;

DoctorRequestRow.propTypes = {
  doctor: PropTypes.object.isRequired,
};
