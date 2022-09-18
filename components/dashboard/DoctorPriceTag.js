import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { makeStyles } from "@mui/styles";
import UpdateProfileModal from "../modal/UpdateProfileModal";
import PropTypes from "prop-types";

const DoctorPriceTag = ({
  title,
  price,
  editable,
  //   onSave,
  //   validate,
  //   onSuccess,
  //   openSnackbar,
}) => {
  const classes = useStyles();

  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);

  return (
    <>
      <Grid container>
        <Typography
          className={classes.ccrt_dashboard__profile__dctr__price__tag}
        >
          {title}: {price} |=
          <IconButton
            style={{ marginLeft: "5px" }}
            onClick={() => setOpenUpdateProfileModal(editable)}
          >
            <DriveFileRenameOutlineIcon fontSize="small" />
          </IconButton>
        </Typography>
      </Grid>
      {editable && (
        <UpdateProfileModal
          editableValue={price}
          open={openUpdateProfileModal}
          onClose={() => setOpenUpdateProfileModal(false)}
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

const useStyles = makeStyles((theme) => ({
  ccrt_dashboard__profile__dctr__price__tag: {
    position: "absolute",
    bottom: "0",
    right: "0",
    background: `${theme.palette.custom.DEFAULT_COLOR_MINUS_18}`,
    fontSize: "90%",
    fontWeight: "500",
    padding: "7px 10px",
    borderRadius: "5px",
  },
}));

DoctorPriceTag.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  // onSave: PropTypes.func,
  // validate: PropTypes.func,
  // onSuccess: PropTypes.func,
  // openSnackbar: PropTypes.func,
};
export default DoctorPriceTag;
