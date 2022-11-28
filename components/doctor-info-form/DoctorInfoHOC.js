import { Grid, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import React, { useState } from "react";
import ActionButton from "../button/ActionButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import ConfirmationModal from "../modal/ConfirmationModal";
const DoctorInfoHOC = ({
  children,
  editable = false,
  editModal,
  onDelete,
  openSnackbar,
  onSuccess,
  showEditableModal,
  setShowEditableModal,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
      onSuccess();
      setLoading(false);
      openSnackbar("Entity has been removed successfully.");
      setConfirmationModal(false);
    } catch (error) {
      setLoading(false);

      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.code + ":" + data.message);
      }
    }
  };
  return (
    <>
      <Grid
        container
        className={classes.ccrt__education__section__content__container}
      >
        <Grid item xs={9}>
          {children}
        </Grid>

        <Grid
          item
          xs={3}
          container
          justifyContent={"flex-end"}
          alignItems="center"
        >
          <Grid item>
            <Grid container justifyContent={"center"} alignItems="center">
              {editable && (
                <Grid
                  item
                  style={{
                    marginTop: 5,
                  }}
                >
                  <ActionButton
                    icon={<EditIcon fontSize="small" />}
                    title={"Remove"}
                    type="error"
                    onClick={() => setConfirmationModal(true)}
                  />
                </Grid>
              )}
              {editable && (
                <Grid
                  item
                  style={{
                    marginLeft: isDesktop ? 10 : 0,
                    marginTop: 5,
                  }}
                >
                  <ActionButton
                    icon={<DeleteIcon fontSize="small" />}
                    title={"Edit"}
                    type="info"
                    onClick={() => setShowEditableModal(true)}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {showEditableModal && editModal}
      {confirmationModal && (
        <ConfirmationModal
          onPositiveFeedback={() => {
            handleDelete();
          }}
          onNegativeFeedback={() => setConfirmationModal(false)}
          title={"Are you sure you want to delete?"}
          loading={loading}
        />
      )}
    </>
  );
};

DoctorInfoHOC.propTypes = {
  children: PropTypes.node,
  editable: PropTypes.bool,
  editModal: PropTypes.node.isRequired,
  onDelete: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  showEditableModal: PropTypes.bool.isRequired,
  setShowEditableModal: PropTypes.func.isRequired,
};
const useStyles = makeStyles(() => ({
  ccrt__education__section__content__container: {
    position: "relative",
    margin: "10px 0",
  },
}));

export default DoctorInfoHOC;
