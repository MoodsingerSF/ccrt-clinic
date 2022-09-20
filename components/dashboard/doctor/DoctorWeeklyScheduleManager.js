import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import DashboardTitle from "../DashboardTitle";
import { getSchedule } from "../../../controllers/DoctorScheduleController";
import DashboardLoaderComponent from "../DashboardLoaderComponent";
import NoContentToShowComponent from "../../misc/NoContentToShowComponent";
import { SNACKBAR_INITIAL_STATE } from "../../../misc/constants";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import {
  handleSnackbarClose,
  handleSnackbarOpen,
} from "../../../misc/functions";
import LoaderBackdrop from "../../backdrops/LoaderBackdrop";
import DoctorScheduleComponent from "../../misc/DoctorScheduleComponent";
// import ConfirmationModal from "../../modal/ConfirmationModal";

const DoctorWeeklyScheduleManager = () => {
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const [schedule, setSchedule] = useState({
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });
  const [loading, setLoading] = useState(false);
  const [openLoaderBackdrop, setOpenLoaderBackdrop] = useState(false);

  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };

  const retrieveDoctorSchedule = async () => {
    try {
      setLoading(true);
      const data = await getSchedule();
      setSchedule(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieveDoctorSchedule();
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 20 }}
    >
      <DashboardTitle title="Manage Weekly Schedule" />
      {loading ? (
        <DashboardLoaderComponent />
      ) : schedule === null ? (
        <NoContentToShowComponent title="No schedule to show" />
      ) : (
        <DoctorScheduleComponent
          schedule={schedule}
          setSchedule={setSchedule}
          openSnackbar={openSnackbar}
          openLoader={() => {
            setOpenLoaderBackdrop(true);
          }}
          closeLoader={() => {
            setOpenLoaderBackdrop(false);
          }}
          editable={true}
        />
      )}

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
      <LoaderBackdrop open={openLoaderBackdrop} />
    </Grid>
  );
};

export default DoctorWeeklyScheduleManager;
