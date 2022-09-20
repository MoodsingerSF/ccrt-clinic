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
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@mui/styles";
import classNames from "classnames";
import FormDialog from "./FormDialog";
import TimeSlotBookedUserInfo from "../userTimeSlot/TimeSlotBookedUserInfo";
import AddFileButton from "../userTimeSlot/AddFileButton";
import { validateField } from "../../controllers/TimeSlotBookedUserInfoController";

const cancers = [
  {
    value: "breast cancer",
    label: "breast cancer",
  },
  {
    value: "lung cancer",
    label: "lung cancer",
  },
  {
    value: "stomach cancer",
    label: "stomach cancer",
  },
  {
    value: "bone cancer",
    label: "bone cancer",
  },
  {
    value: "brain cancer",
    label: "brain cancer",
  },
  {
    value: "ovarian cancer",
    label: "ovarian cancer",
  },
  {
    value: "prostate cancer",
    label: "prostate cancer",
  },
  {
    value: "testicular cancer",
    label: "testicular cancer",
  },
];

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

  const [prescription, setPrescription] = useState(null);
  const [ecgFile, setEcgFile] = useState(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("female");
  const [date, setDate] = useState("");
  const [cancerType, setCancerType] = useState("");
  const [showError, setShowError] = useState(false);

  const onPrescriptionFileDrop = (file) => {
    setPrescription(file);
  };

  const onEcgFileDrop = (file) => {
    setEcgFile(file);
  };

  const handleChangePatientName = (e) => {
    setPatientName(e.target.value);
  };

  const handleChangeCancerType = (e) => {
    setCancerType(e.target.value);
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const submitFiles = () => {
    if (validate(patientName, cancerType, date)) {
      // Api call
      console.log("Submit Files");
    } else {
      setShowError(true);
    }
  };
  const validate = (patientName, cancerType, date) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      !validateField(patientName) &&
      !validateField(cancerType) &&
      !validateField(date);
    return isEverythingAllRight;
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
              <Grid
                container
                flexDirection={"column"}
                className={classes.ccrt__content__wrapper}
              >
                <Typography className={classes.ccrt__content__header}>
                  Name:
                </Typography>
                <TextField
                  size="small"
                  placeholder="Enter your name"
                  value={patientName}
                  onChange={handleChangePatientName}
                />
                {showError && validateField(patientName) && (
                  <Typography
                    style={{
                      color: "red",
                      fontSize: "70%",
                      marginBottom: "5px",
                    }}
                  >
                    Required
                  </Typography>
                )}
              </Grid>

              <Grid container className={classes.ccrt__content__wrapper}>
                <FormControl>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    className={classes.ccrt__content__header}
                  >
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={gender}
                    onChange={handleChangeGender}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio size="small" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio size="small" />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio size="small" />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid
                container
                flexDirection={"column"}
                className={classes.ccrt__content__wrapper}
              >
                <Typography className={classes.ccrt__content__header}>
                  Date of birth:
                </Typography>
                <TextField
                  size="small"
                  placeholder="dd/mm/yyyy"
                  value={date}
                  onChange={handleChangeDate}
                />
                {showError && validateField(date) && (
                  <Typography
                    style={{
                      color: "red",
                      fontSize: "70%",
                      marginBottom: "5px",
                    }}
                  >
                    Required
                  </Typography>
                )}
              </Grid>

              <Grid
                container
                flexDirection={"column"}
                className={classes.ccrt__content__wrapper}
              >
                <Typography className={classes.ccrt__content__header}>
                  type of cancer:
                </Typography>
                <TextField
                  size="small"
                  id="outlined-select-currency"
                  select
                  value={cancerType}
                  onChange={handleChangeCancerType}
                >
                  {cancers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {showError && validateField(cancerType) && (
                  <Typography
                    style={{
                      color: "red",
                      fontSize: "70%",
                      marginBottom: "5px",
                    }}
                  >
                    Required
                  </Typography>
                )}
              </Grid>

              <TimeSlotBookedUserInfo
                title="previous/current prescription"
                onFileDrop={onPrescriptionFileDrop}
                onFileRemove={() => setPrescription(null)}
                isFilePicked={prescription}
              />
              {/* <TimeSlotBookedUserInfo
                title="ECG report"
                onFileDrop={onEcgFileDrop}
                onFileRemove={() => setEcgFile(null)}
                isFilePicked={ecgFile}
              /> */}
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

const useStyles = makeStyles((theme) =>
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
    ccrt__content__wrapper: {
      marginBottom: "20px",
    },
    ccrt__content__header: {
      textTransform: "capitalize",
      fontWeight: "500",
      marginBottom: "5px",
      fontSize: "85%",
      color: `${theme.palette.grey[700]}`,
    },
  })
);

TimeSlotBookUserInfoDialog.propTypes = {
  onNegativeFeedback: PropTypes.bool.isRequired,
};

export default TimeSlotBookUserInfoDialog;
