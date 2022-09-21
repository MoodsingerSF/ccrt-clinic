import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import DoctorRequestRow from "./DoctorRequestRow";
import classNames from "classnames";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { SNACKBAR_INITIAL_STATE } from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import LoaderBackdrop from "../backdrops/LoaderBackdrop";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import { retrievePendingDoctors } from "../../controllers/UserController";
import DashboardTitle from "./DashboardTitle";

const DoctorsRequest = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backdropLoading, setBackdropLoading] = useState(false);

  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };
  const getPendingDoctors = async () => {
    try {
      setLoading(true);
      const retrievedDoctors = await retrievePendingDoctors();
      setLoading(false);
      setDoctors(retrievedDoctors);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error && error.response) {
        openSnackbar(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    getPendingDoctors();
  }, []);
  const openLoader = () => {
    setBackdropLoading(true);
  };
  const closeLoader = () => {
    setBackdropLoading(false);
  };
  return (
    <Grid container>
      <Grid
        container
        style={{ marginTop: 20 }}
        justifyContent="center"
        alignItems="center"
      >
        <DashboardTitle title="Doctor Registration Requests" />
      </Grid>

      {loading ? (
        <LoaderBackdrop open={loading} />
      ) : doctors.length === 0 ? (
        <NoContentToShowComponent title="No doctor requests to show" />
      ) : (
        <table className={classes.ccrt__dashboard__dctr__req__table}>
          <thead>
            <tr className={classes.ccrt__dashboard__dctr__req__table__row}>
              <th
                align="center"
                className={classNames({
                  [classes.ccrt__dashboard__dctr__req__table__head__mobile]:
                    !matchesSm,
                  [classes.ccrt__dashboard__dctr__req__table__head__desktop]:
                    matchesSm,
                })}
              >
                Name
              </th>

              <th
                align="center"
                className={classNames({
                  [classes.ccrt__dashboard__dctr__req__table__head__mobile]:
                    !matchesSm,
                  [classes.ccrt__dashboard__dctr__req__table__head__desktop]:
                    matchesSm,
                })}
              >
                Specializations
              </th>

              <th
                align="center"
                className={classNames({
                  [classes.ccrt__dashboard__dctr__req__table__head__mobile]:
                    !matchesSm,
                  [classes.ccrt__dashboard__dctr__req__table__head__desktop]:
                    matchesSm,
                })}
              >
                Fee
              </th>
              <th
                className={classNames({
                  [classes.ccrt__dashboard__dctr__req__table__head__mobile]:
                    !matchesSm,
                  [classes.ccrt__dashboard__dctr__req__table__head__desktop]:
                    matchesSm,
                })}
              >
                Email
              </th>
              <th
                className={classNames({
                  [classes.ccrt__dashboard__dctr__req__table__head__mobile]:
                    !matchesSm,
                  [classes.ccrt__dashboard__dctr__req__table__head__desktop]:
                    matchesSm,
                })}
              >
                Status
              </th>
              <th
                className={classNames({
                  [classes.ccrt__dashboard__dctr__req__table__head__mobile]:
                    !matchesSm,
                  [classes.ccrt__dashboard__dctr__req__table__head__desktop]:
                    matchesSm,
                })}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => {
              return (
                <DoctorRequestRow
                  key={doctor.userId}
                  serialNo={index}
                  userId={doctor.userId}
                  firstName={doctor.firstName}
                  lastName={doctor.lastName}
                  email={doctor.email}
                  specializations={doctor.specializations}
                  fee={doctor.fee}
                  profileImageUrl={doctor.profileImageUrl}
                  openSnackbar={openSnackbar}
                  openLoader={openLoader}
                  closeLoader={closeLoader}
                  onSuccess={(userId) => {
                    setDoctors((prev) =>
                      prev.filter((item) => item.userId !== userId)
                    );
                  }}
                />
              );
            })}
          </tbody>
        </table>
      )}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
      {backdropLoading && <LoaderBackdrop open={true} />}
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard__dctr__req__table: {
    background: "#F7F8FC",
    minWidth: "100%",
    width: "auto",
    borderCollapse: "collapse",
    margin: "25px 0",
  },
  ccrt__dashboard__dctr__req__table__row: {
    background: DEFAULT_COLOR_MINUS_2,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },

  ccrt__dashboard__dctr__req__table__head__desktop: {
    padding: "12px 0",
    // width: "200px",
    fontSize: "80%",
  },
  ccrt__dashboard__dctr__req__table__head__mobile: {
    fontSize: "80%",
    padding: "12px 0",
  },
});
export default DoctorsRequest;
