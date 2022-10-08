import React from "react";
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

const DonateModal = ({ open, onNegativeFeedback, name, amount, number }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matcheLg = useMediaQuery(theme.breakpoints.up("md"));

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
          <Grid container flexDirection={"column"}>
            <Typography className={classes.ccrt__donate_modal__label}>
              number:
            </Typography>
            <Typography className={classes.ccrt__donate_modal__text}>
              +88{number}
            </Typography>
          </Grid>
          <Grid container flexDirection={"column"}>
            <Typography className={classes.ccrt__donate_modal__label}>
              amount:
            </Typography>
            <Typography className={classes.ccrt__donate_modal__text}>
              {amount} &#2547;
            </Typography>
          </Grid>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Typography className={classes.ccrt__donate_modal__section_header}>
              Donar form
            </Typography>
          </Grid>
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
    border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_2}`,
    margin: "5px 0",
    padding: "5px",
    borderRadius: "5px",
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
