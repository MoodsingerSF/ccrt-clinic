import React, { useState } from "react";
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
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@mui/styles";
import classNames from "classnames";
import ReportComp from "../dashboard/ReportComp";
// import FormDialog from "./FormDialog";
// import TimeSlotBookedUserInfo from "../userTimeSlot/TimeSlotBookedUserInfo";
// import AddFileButton from "../userTimeSlot/AddFileButton";

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

const TimeSlotBookUserInfoDialog = ({ onNegativeFeedback }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  const [files, setFiles] = useState([]);
  console.log(files);
  // const [prescription, setPrescription] = useState(null);
  // console.log(prescription);

  const [cancerType, setCancerType] = useState("");

  // const onPrescriptionFileDrop = (file) => {
  //   setPrescription(file);
  // };

  const handleChangeCancerType = (e) => {
    setCancerType(e.target.value);
  };

  // const validate = (cancerType) => {
  //   let isEverythingAllRight = true;
  //   isEverythingAllRight = !validateField(cancerType);
  //   return isEverythingAllRight;
  // };

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
                {/* {showError && validateField(cancerType) && (
                  <Typography
                    style={{
                      color: "red",
                      fontSize: "70%",
                      marginBottom: "5px",
                    }}
                  >
                    Required
                  </Typography>
                )} */}
              </Grid>
              <ReportComp setFiles={setFiles} />

              {/* <TimeSlotBookedUserInfo
                title="previous/current prescription"
                onFileDrop={onPrescriptionFileDrop}
                onFileRemove={() => setPrescription(null)}
                isFilePicked={prescription}
              /> */}
            </Grid>
          </Grid>
        </DialogContent>
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
