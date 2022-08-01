import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { DASHBOARD_DOCTOR_DETAILS_BOX_SHADOW } from "../../misc/colors";

const DoctorRequestRow = ({ doctor }) => {
  const classes = useStyles();

  const [showDctrDetails, setShowDctrDetails] = useState(false);

  const handleShowDctrDetails = () => {
    setShowDctrDetails(!showDctrDetails);
  };

  return (
    <>
      <tr className={classes.ccrt__dashboard__dctr__req__table__data__row}>
        <td className={classes.ccrt__dashboard__dctr__req__table__data}>
          {doctor.name}
        </td>
        <td className={classes.ccrt__dashboard__dctr__req__table__data}>
          {doctor.email}
        </td>
        <td className={classes.ccrt__dashboard__dctr__req__table__data}>
          {doctor.status}
        </td>
        <td className={classes.ccrt__dashboard__dctr__req__table__data}>
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
            colspan="4"
            style={{
              padding: "10px",
            }}
          >
            <Typography>Name: {doctor.name}</Typography>
            <Typography>Email: {doctor.email}</Typography>
            <Typography>About Doctor: lorem</Typography>
          </td>
        </tr>
      ) : null}
    </>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard__dctr__req__table__data: {
    borderBottom: "1px solid #ddd",
    padding: "12px 0",
    cursor: "pointer",
    textAlign: "center",
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
