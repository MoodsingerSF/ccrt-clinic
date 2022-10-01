import React, { useState } from "react";
import {
  Grid,
  IconButton,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import UpdateProfileModal from "../modal/UpdateProfileModal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PropTypes from "prop-types";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";

const DoctorAbout = ({
  title,
  value,
  icon,
  editable = false,
  onSave,
  validate,
  onSuccess,
  openSnackbar,
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
          md={5}
        >
          {icon}
          <Typography className={classes.ccrt__dashboard__user__data__row}>
            {title}
          </Typography>
        </Grid>

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          item
          xs={12}
          md={7}
        >
          {value ? (
            <Typography
              style={{
                marginLeft: IsDesktop ? "0px" : "40px",
                fontSize: "85%",
                fontWeight: 600,
                width: IsDesktop ? "80%" : "79%",
                textAlign: "justify",
                color: theme.palette.custom.BLACK,
              }}
            >
              {showMore ? `${value}` : `${value.substring(0, 80)}`}
              {`${value.substring(0, 100)}`.length >= 100 && (
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: "100%",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "inline-block",
                    color: DEFAULT_COLOR_MINUS_2,
                    textTransform: "capitalize",
                  }}
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "view less" : "view more"}
                </span>
              )}
            </Typography>
          ) : (
            <Typography
              style={{
                fontSize: "90%",
                textAlign: "center",
                width: IsDesktop ? "90%" : "79%",
                // textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              please update about
            </Typography>
          )}

          {editable ? (
            <IconButton onClick={() => setOpenUpdateProfileModal(editable)}>
              <DriveFileRenameOutlineIcon className={classes.editIconStyle} />
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
          validate={validate}
          onSave={onSave}
          onSuccess={onSuccess}
          openSnackbar={openSnackbar}
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

const useStyles = makeStyles((theme) => ({
  ccrt__dashboard__user__data__row: {
    fontSize: "85%",
    fontWeight: 600,
    color: theme.palette.custom.BLACK,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  editIconStyle: {
    color: theme.palette.custom.BLACK,
    fontSize: "85%",
  },
}));

export default DoctorAbout;
