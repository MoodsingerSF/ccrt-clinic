import { Box, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import animationData from "../../public/animations/success.json";
import { useTheme } from "@mui/styles";
import CustomButton from "../button/CustomButton";
import { useRouter } from "next/router";

const PasswordRecoverySuccessModal = ({ open, onClose }) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid
          container
          direction="column"
          justifyContent={"center"}
          alignItems="center"
        >
          <Lottie
            animationData={animationData}
            style={{ width: "50vh", height: "50vh" }}
          />
          <Typography
            style={{
              fontSize: "80%",
              fontWeight: 500,
              color: theme.palette.custom.BLACK,
            }}
          >
            Your password has been successfully reset.
          </Typography>
          <Grid item xs={12} sm={4} style={{ marginTop: 20 }}>
            <CustomButton
              color={theme.palette.custom.GREEN}
              title="Log In"
              onClick={() => {
                router.push("/login");
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

PasswordRecoverySuccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: "75%",
  p: 4,
};

export default PasswordRecoverySuccessModal;
