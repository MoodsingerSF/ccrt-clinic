import { useContext, useEffect, useState } from "react";
import React from "react";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "../controllers/LocalStorageController";
import { Context } from "../contexts/user-context/UserContext";
import { retrieveUserDetails } from "../controllers/UserController";
import { getModifiedUserState } from "./data-middleware/UserDataMiddleware";
import { Grid } from "@mui/material";
import LoaderComponent from "./misc/LoaderComponent";
import Footer from "./footer/Footer";
import { useRouter } from "next/router";
// eslint-disable-next-line react/prop-types
const LoginChecker = ({ children }) => {
  const { setAuthorizationToken, setUserId, setUser } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const retrieveUserDetailsHelper = async () => {
    try {
      setLoading(true);
      const data = await retrieveUserDetails(retrieveUserId());
      setUser(getModifiedUserState(data));
      setLoading(false);
    } catch (error) {
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
          <LoaderComponent />
        </Grid>
      ) : (
        <>
          {children}
          {!router.pathname.startsWith("/dashboard") && <Footer />}
        </>
      )}
    </>
  );
};

export default LoginChecker;
