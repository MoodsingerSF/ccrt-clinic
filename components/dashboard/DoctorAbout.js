import React, { useState } from "react";
import {
  Grid,
  IconButton,
  useTheme,
  Typography,
  useMediaQuery,
  Button,
  Chip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import UpdateProfileModal from "../modal/UpdateProfileModal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PropTypes from "prop-types";

const DoctorAbout = ({
  title,
  value,
  icon,
  editable = false,
  //   onSave,
  //   validate,
  //   onSuccess,
  //   openSnackbar,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const IsDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const onClose = () => {
    setOpenUpdateProfileModal(false);
  };
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          width: IsDesktop ? "60vw" : "100vw",
          marginBottom: "10px",
        }}
      >
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          item
          xs={12}
          md={2}
        >
          <Typography className={classes.ccrt__dashboard__user__data__row}>
            {icon}
            <span style={{ margin: "0 5px" }} />
            {title}
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          item
          xs={12}
          md={10}
        >
          <Typography
            style={{
              marginLeft: IsDesktop ? "0px" : "40px",
              fontSize: "80%",
              fontWeight: 500,
              width: IsDesktop ? "90%" : "79%",
              textAlign: IsDesktop ? "center" : "justify",
            }}
          >
            {showMore ? `${value}` : `${value.substring(0, 100)}`}
            {`${value.substring(0, 100)}`.length >= 100 && (
              <Chip
                style={{ marginLeft: "5px" }}
                size="small"
                label={showMore ? "show less" : "show more"}
                onClick={() => setShowMore(!showMore)}
              />
            )}
          </Typography>
          {editable ? (
            <IconButton onClick={() => setOpenUpdateProfileModal(editable)}>
              <DriveFileRenameOutlineIcon style={{ fontSize: "80%" }} />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
      {editable && (
        <UpdateProfileModal
          fieldName={title}
          open={openUpdateProfileModal}
          onClose={onClose}
          editableValue={value}
          title={`Update ${title}`}
          //   validate={validate}
          //   onSave={onSave}
          //   onSuccess={onSuccess}
          //   openSnackbar={openSnackbar}
        />
      )}
    </>
  );
};

DoctorAbout.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  editable: PropTypes.bool,
  onSave: PropTypes.func,
  validate: PropTypes.func,
  onSuccess: PropTypes.func,
  openSnackbar: PropTypes.func,
};

const useStyles = makeStyles({
  ccrt__dashboard__user__data__row: {
    fontSize: "90%",
    fontWeight: "500",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DoctorAbout;
