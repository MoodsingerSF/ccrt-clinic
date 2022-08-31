import { useContext, useEffect, useState } from "react";
import React from "react";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "../controllers/LocalStorageController";
import { Context } from "../contexts/user-context/UserContext";
import { retrieveUserDetails } from "../controllers/UserController";
import { getModifiedUserState } from "./data-middleware/UserDataMiddleware";
import { Grid, Typography } from "@mui/material";
// eslint-disable-next-line react/prop-types
const LoginChecker = ({ children }) => {
  const { setAuthorizationToken, setUserId, setUser } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const retrieveUserDetailsHelper = async () => {
    try {
      setLoading(true);
      const data = await retrieveUserDetails(retrieveUserId());
      setUser(getModifiedUserState(data));
      setLoading(false);
    } catch (error) {
      //
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = retrieveAuthorizationToken();
    if (token !== null) {
      setAuthorizationToken(token);
      setUserId(retrieveUserId());
      retrieveUserDetailsHelper();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Grid
          container
          style={{ zIndex: 100, height: "100vh" }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>loading...</Typography>
        </Grid>
      ) : (
        children
      )}
    </>
  );
};

export default LoginChecker;
