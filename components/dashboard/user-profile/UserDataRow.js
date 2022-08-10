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

const UserDataRow = ({ title, value, icon, editable = false }) => {
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
        style={{ width: IsDesktop ? "60vw" : "100vw" }}
      >
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          item
          xs={12}
          md={5}
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
          md={7}
        >
          <Typography style={{ marginLeft: IsDesktop ? "0px" : "40px" }}>
            {value}
          </Typography>
          <Grid>
            {editable ? (
              <IconButton onClick={() => setOpenUpdateProfileModal(editable)}>
                <DriveFileRenameOutlineIcon />
              </IconButton>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <UpdateProfileModal
        open={openUpdateProfileModal}
        onClose={onClose}
        editableValue={value}
      />
    </>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard__user__data__row: {
    fontWeight: "500",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

UserDataRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  editable: PropTypes.bool,
};

export default UserDataRow;
