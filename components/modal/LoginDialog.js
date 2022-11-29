import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/styles";
import CustomButton from "../button/CustomButton";
import { useRouter } from "next/router";
import { Context } from "../../contexts/LoginPromptContext";
const LoginDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const router = useRouter();
  const { closeLoginPrompt } = useContext(Context);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Grid container justifyContent={"center"} alignItems="center">
          <Grid container style={{ width: "95%" }}>
            <Grid container>
              <Typography
                style={{
                  color: theme.palette.custom.BLACK,
                  fontSize: "85%",
                  fontWeight: "500",
                }}
              >
                You are not allowed to perform this operation because you are
                not logged in.
              </Typography>
            </Grid>
            <Grid container>
              <Typography
                style={{
                  color: theme.palette.custom.BLACK,
                  fontSize: "85%",
                  fontWeight: "500",
                  margin: "10px 0px",
                }}
              >
                If you have an account, please log in.
              </Typography>
            </Grid>
            <Grid container>
              <CustomButton
                title="Log In"
                onClick={() => {
                  closeLoginPrompt();
                  router.push("/login");
                }}
              />
            </Grid>
            <Grid container>
              <Typography
                style={{
                  color: theme.palette.custom.BLACK,
                  fontSize: "85%",
                  fontWeight: "500",
                  margin: "10px 0px",
                }}
              >
                {"If you don't have an account, please sign up first."}
              </Typography>
            </Grid>
            <Grid container>
              <CustomButton
                title="Sign Up"
                onClick={() => {
                  closeLoginPrompt();

                  router.push("/signup");
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginDialog;
