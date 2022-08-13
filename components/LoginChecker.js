import { useContext, useEffect } from "react";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "../controllers/LocalStorageController";
import { Context } from "../contexts/user-context/UserContext";
const LoginChecker = () => {
  const { setAuthorizationToken, setUserId } = useContext(Context);
  useEffect(() => {
    const token = retrieveAuthorizationToken();
    if (token !== null) {
      setAuthorizationToken(token);
      setUserId(retrieveUserId());
    }
  }, []);

  return null;
};

export default LoginChecker;
