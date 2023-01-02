import React, { useState } from "react";
import {
  Grid,
  IconButton,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import UpdateProfileModal from "../../modal/UpdateProfileModal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PropTypes from "prop-types";

const UserDataRow = ({
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
          // height: 40,
        }}
        className={classes.containerStyle}
      >
        <Grid
          container
          justifyContent="flex-start"
          alignItems={!IsDesktop ? "flex-start" : "center"}
          item
          xs={10}
          md={5}
        >
          {icon}
          <Grid item>
            <Typography
              className={classes.ccrt__dashboard__user__data__row__title}
            >
              {title}
            </Typography>
            {!IsDesktop && (
              <Typography
                className={classes.valueStyle}
                style={{ marginLeft: 10 }}
              >
                {value}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={IsDesktop ? "space-between" : "flex-end"}
          alignItems="center"
          item
          xs={2}
          md={7}
        >
          {IsDesktop && (
            <Typography className={classes.valueStyle}>{value}</Typography>
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

UserDataRow.propTypes = {
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
  ccrt__dashboard__user__data__row__title: {
    fontSize: "85%",
    fontWeight: 600,
    color: theme.palette.custom.BLACK,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  valueStyle: {
    fontSize: "85%",
    fontWeight: 600,
    color: theme.palette.custom.BLACK,
  },
  containerStyle: {
    marginBottom: "10px",
    height: 40,
    // background: theme.palette.custom.GREY,
  },
  editIconStyle: {
    color: theme.palette.custom.BLACK,
    fontSize: "85%",
  },
}));

export default UserDataRow;
