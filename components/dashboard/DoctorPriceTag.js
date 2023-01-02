import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { makeStyles } from "@mui/styles";
import UpdateProfileModal from "../modal/UpdateProfileModal";
import PropTypes from "prop-types";

const DoctorPriceTag = ({
  title,
  price,
  editable,
  onSave,
  validate,
  openSnackbar,
}) => {
  const classes = useStyles();

  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);

  return (
    <Grid item>
      <Grid container alignItems={"center"} justifyContent="center">
        <Typography
          className={classes.ccrt_dashboard__profile__dctr__price__tag}
        >
          {title}: {price} |=
        </Typography>

        <DriveFileRenameOutlineIcon
          fontSize="small"
          className={classes.iconStyle}
          onClick={() => setOpenUpdateProfileModal(editable)}
        />
      </Grid>
      {editable && (
        <UpdateProfileModal
          editableValue={price}
          open={openUpdateProfileModal}
          onClose={() => setOpenUpdateProfileModal(false)}
          fieldName={"Amount"}
          title={`Update ${title}`}
          validate={validate}
          onSave={onSave}
          openSnackbar={openSnackbar}
          isPrice={true}
        />
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt_dashboard__profile__dctr__price__tag: {
    color: theme.palette.custom.BLACK,
    fontSize: "85%",
    fontWeight: 600,
  },
  iconStyle: {
    color: theme.palette.custom.BLACK,

    fontSize: "110%",
    marginLeft: 10,
    cursor: "pointer",
  },
}));

DoctorPriceTag.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  editable: PropTypes.bool,
  onSave: PropTypes.func,
  // onSuccess: PropTypes.func,
  openSnackbar: PropTypes.func,
  validate: PropTypes.func,
};
export default DoctorPriceTag;
