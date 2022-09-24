import { Grid } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import FormDialog from "../dialogs/FormDialog";
import AddFileButton from "../userTimeSlot/AddFileButton";
import TimeSlotBookedUserInfo from "../userTimeSlot/TimeSlotBookedUserInfo";
import PropTypes from "prop-types";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { SNACKBAR_INITIAL_STATE } from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import { lowerCase } from "lodash";
import LoaderComponent from "../misc/LoaderComponent";
const reducer = (state, action) => {
  switch (action.type) {
    case "initialize":
      return [...action.payload];
    case "insert":
      return [...state, { ...action.payload, imageUrl: null }];
    case "add-image-url":
      return state.map((item) => {
        if (item.title === action.payload.title) {
          return {
            ...item,
            imageUrl: action.payload.imageUrl,
            resourceId: action.payload.resourceId,
          };
        } else return item;
      });
    case "remove-image-url":
      return state.map((item) => {
        if (item.title === action.payload.title) {
          return { ...item, imageUrl: null };
        } else return item;
      });
    default:
      return state;
  }
};

const ReportComp = ({
  retrieveReports,
  addReport,
  updateReport,
  editable = false,
}) => {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const [fileList, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(false);

  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };

  const retrieveUploadedReports = async () => {
    try {
      setLoading(true);
      const reports = await retrieveReports();
      dispatch({ type: "initialize", payload: reports });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveUploadedReports();
  }, []);

  // useEffect(() => {
  //   setFiles(fileList);
  // }, [fileList]);

  return (
    <>
      {loading ? (
        <Grid container style={{ height: "80vh" }}>
          <LoaderComponent />
        </Grid>
      ) : (
        <Grid container>
          {fileList.length !== 0 && (
            <Grid container>
              {fileList.map((item) => (
                <TimeSlotBookedUserInfo
                  key={item.title}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  resourceId={item.resourceId}
                  addImageUrl={(imageUrl, resourceId) => {
                    dispatch({
                      type: "add-image-url",
                      payload: {
                        title: item.title,
                        imageUrl: imageUrl,
                        resourceId: resourceId,
                      },
                    });
                  }}
                  addReport={addReport}
                  updateReport={updateReport}
                  openSnackbar={openSnackbar}
                  editable={editable}
                />
              ))}
            </Grid>
          )}
          {editable && <AddFileButton setOpenFormDialog={setOpenFormDialog} />}
          {editable && openFormDialog && (
            <FormDialog
              onClose={() => setOpenFormDialog(false)}
              addSection={(title) => {
                const foundFile = fileList.find(
                  (item) => lowerCase(item.title) === lowerCase(title)
                );
                if (typeof foundFile !== "undefined") {
                  openSnackbar(
                    `You have already added the report titled ${title}. You can update that report anytime.`
                  );
                  return;
                }
                dispatch({ type: "insert", payload: { title } });
              }}
            />
          )}
          <CustomSnackbar
            open={snackbar.open}
            message={snackbar.message}
            onClose={() => {
              handleSnackbarClose(setSnackbar);
            }}
          />
        </Grid>
      )}
    </>
  );
};

ReportComp.propTypes = {
  // setFiles: PropTypes.func,
  retrieveReports: PropTypes.func.isRequired,
  addReport: PropTypes.func.isRequired,
  updateReport: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

export default ReportComp;
