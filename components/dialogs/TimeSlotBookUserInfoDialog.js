import React, { useReducer, useState } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  DialogContent,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@mui/styles";
import classNames from "classnames";
import FormDialog from "./FormDialog";
import TimeSlotBookedUserInfo from "../userTimeSlot/TimeSlotBookedUserInfo";
import AddFileButton from "../userTimeSlot/AddFileButton";

const reducer = (state, action) => {
  switch (action.type) {
    case "insert":
      return [...state, { ...action.payload, file: null }];
    case "add-file":
      return state.map((item) => {
        if (item.title === action.payload.title) {
          return { ...item, file: action.payload.file };
        } else return item;
      });
    case "remove-file":
      return state.map((item) => {
        if (item.title === action.payload.title) {
          return { ...item, file: null };
        } else return item;
      });
    default:
      return state;
  }
};

const TimeSlotBookUserInfoDialog = ({ onNegativeFeedback }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  const [fileList, dispatch] = useReducer(reducer, []);

  const [xrayFile, setXrayFile] = useState(null);
  const [ecgFile, setEcgFile] = useState(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const onXrayFileDrop = (file) => {
    setXrayFile(file);
  };

  const onEcgFileDrop = (file) => {
    setEcgFile(file);
  };

  const submitFiles = () => {
    // Api call
    console.log("Submit Files");
  };

  return (
    <div>
      <Dialog fullScreen open={true} onClose={onNegativeFeedback}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar className={classes.ccrt__toolbar}>
            <Typography className={classes.ccrt__toolbar__title}>
              User Information
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onNegativeFeedback}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container justifyContent={"center"} alignItems="center">
            <Grid
              container
              justifyContent={"center"}
              alignItems="flex-start"
              flexDirection={"column"}
              className={classNames({
                [classes.ccrt__dialog__content__section__small]: !matchesMobile,
                [classes.ccrt__dialog__content__section__medium]: !matchesMd,
                [classes.ccrt__dialog__content__section_large]: matchesMd,
              })}
            >
              <TimeSlotBookedUserInfo
                title="x-ray report"
                onFileDrop={onXrayFileDrop}
                onFileRemove={() => setXrayFile(null)}
                isFilePicked={xrayFile}
              />
              <TimeSlotBookedUserInfo
                title="ECG report"
                onFileDrop={onEcgFileDrop}
                onFileRemove={() => setEcgFile(null)}
                isFilePicked={ecgFile}
              />
              {fileList.length !== 0 && (
                <Grid container>
                  {fileList.map((item, index) => (
                    <TimeSlotBookedUserInfo
                      key={item.title}
                      title={item.title}
                      onFileDrop={(file) =>
                        dispatch({
                          type: "add-file",
                          payload: { title: item.title, file: file },
                        })
                      }
                      onFileRemove={(file) =>
                        dispatch({
                          type: "remove-file",
                          payload: { title: item.title },
                        })
                      }
                      isFilePicked={item.file}
                    />
                  ))}
                </Grid>
              )}
              <AddFileButton setOpenFormDialog={setOpenFormDialog} />
              <Grid container justifyContent={"center"} alignItems="center">
                <Button fullWidth variant="contained" onClick={submitFiles}>
                  Save files
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        {openFormDialog && (
          <FormDialog
            onClose={() => setOpenFormDialog(false)}
            addSection={(title) =>
              dispatch({ type: "insert", payload: { title } })
            }
          />
        )}
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    ccrt__toolbar__title: {
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "85%",
      fontWeight: "500",
    },
    ccrt__dialog__content__section_large: {
      width: "50%",
    },
    ccrt__dialog__content__section__medium: {
      width: "85%",
    },
    ccrt__dialog__content__section__small: {
      position: "relative",
      width: "95%",
    },
  })
);

TimeSlotBookUserInfoDialog.propTypes = {
  onNegativeFeedback: PropTypes.bool.isRequired,
};

export default TimeSlotBookUserInfoDialog;
