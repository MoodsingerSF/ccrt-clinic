import { useContext, useEffect } from "react";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "../controllers/LocalStorageController";
import { Context } from "../contexts/user-context/UserContext";
import { retrieveUserDetails } from "../controllers/UserController";
import { getModifiedUserState } from "./data-middleware/UserDataMiddleware";
const LoginChecker = () => {
  const { setAuthorizationToken, setUserId, setUser } = useContext(Context);

  const retrieveUserDetailsHelper = async () => {
    try {
      const response = await retrieveUserDetails();
      if (response.status === 200) {
        setUser(getModifiedUserState(response.data));
      }
    } catch (error) {
      //
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

  return null;
};

export default LoginChecker;
