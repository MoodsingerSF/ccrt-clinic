import React, { useState } from "react";
import {
  Box,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import SignUpTextField from "../textfields/SignUpTextField";
import CustomButton from "../button/CustomButton";
import { validateEmpty } from "../../controllers/DonationController";
import { giveDonationToOthers } from "../../controllers/DonationRequestController";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { SNACKBAR_INITIAL_STATE } from "../../misc/constants";

const DonateModal = ({
  open,
  onNegativeFeedback,
  name,
  amount,
  number,
  requestId,
  openSnackbar,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matcheLg = useMediaQuery(theme.breakpoints.up("md"));

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [donateAmount, setDonateAmount] = useState("");

  const handleChangeAmount = (e) => {
    setDonateAmount(e.target.value);
  };

  const handleSubmitDonation = async () => {
    try {
      if (validate(donateAmount)) {
        setLoading(true);
        await giveDonationToOthers(amount, requestId);
        setLoading(false);
        setDonateAmount("");
        onNegativeFeedback();
        openSnackbar("Your donation has been added successfully.");
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const validate = (donateAmount) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = validateEmpty(donateAmount);
    return !isEverythingAllRight;
  };

  return (
    <div>
      <Modal open={open} onClose={onNegativeFeedback}>
        <Box
          sx={style}
          style={{
            width: matches ? (matcheLg ? "50vw" : "70vw") : "95vw",
          }}
        >
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Typography className={classes.ccrt__donate_modal__section_header}>
              Recipient details
            </Typography>
          </Grid>
          <Grid container flexDirection={"column"}>
            <Typography className={classes.ccrt__donate_modal__label}>
              Name:
            </Typography>
            <Typography className={classes.ccrt__donate_modal__text}>
              {name}
            </Typography>
          </Grid>
          <Grid container justifyContent={"space-between"}>
            <Grid container flexDirection={"column"} item sm={12} lg={5}>
              <Typography className={classes.ccrt__donate_modal__label}>
                number:
              </Typography>
              <Typography className={classes.ccrt__donate_modal__text}>
                {number}
              </Typography>
            </Grid>
            <Grid container flexDirection={"column"} sm={12} lg={5}>
              <Typography className={classes.ccrt__donate_modal__label}>
                amount:
              </Typography>
              <Typography className={classes.ccrt__donate_modal__text}>
                {amount} &#2547;
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid container flexDirection={"column"}>
            <SignUpTextField
              type={"text"}
              labelText={" How much you want to donate"}
              value={donateAmount}
              onChange={handleChangeAmount}
              adornment={"৳"}
              variant="outlined"
              error={showError && validateEmpty(donateAmount)}
              errorText={"Enter valid Input"}
            />
          </Grid>
          <CustomButton
            title={"send"}
            onClick={handleSubmitDonation}
            loading={loading}
          />
        </Box>
      </Modal>
    </div>
  );
};

DonateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};
const useStyles = makeStyles((theme) => ({
  ccrt__donate_modal__section_header: {
    fontSize: "120%",
    fontWeight: "300",
    textTransform: "capitalize",
    margin: "10px 0",
  },
  ccrt__donate_modal__label: {
    fontSize: "85%",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  ccrt__donate_modal__text: {
    fontSize: "95%",
    fontWeight: "300",
    // border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_2}`,
    margin: "5px 0",
    // padding: "5px",
    // borderRadius: "5px",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "5px",
  p: 2,
};
export default DonateModal;
