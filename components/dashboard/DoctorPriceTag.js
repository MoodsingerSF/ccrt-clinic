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
  // onSuccess,
  openSnackbar,
}) => {
  const classes = useStyles();

  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);

  return (
    <Grid container>
      <Grid container alignItems={"center"} style={{ padding: 10 }}>
        <Typography
          className={classes.ccrt_dashboard__profile__dctr__price__tag}
        >
          {title}: {price} |=
        </Typography>
        {/* <IconButton
          style={{ marginLeft: "5px" }}
          onClick={() => setOpenUpdateProfileModal(editable)}
        > */}
        <DriveFileRenameOutlineIcon
          fontSize="small"
          style={{
            color: "white",
            fontSize: "110%",
            marginLeft: 10,
            cursor: "pointer",
          }}
          onClick={() => setOpenUpdateProfileModal(editable)}
        />
        {/* </IconButton> */}
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
          // onSuccess={onSuccess}
          openSnackbar={openSnackbar}
          isPrice={true}
        />
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt_dashboard__profile__dctr__price__tag: {
    // position: "absolute",
    // bottom: "0",
    // right: "0",
    background: `${theme.palette.custom.BLACK}`,
    fontSize: "85%",
    fontWeight: 600,
    color: "white",
    // padding: "7px 10px",
    // borderRadius: "5px",
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
