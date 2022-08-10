import { CreateContext } from "../CreateContext";
import { reducer } from "./UserContextReducer";
import { state } from "./UserContextState";
import {
  setAuthorizationToken,
  getAuthorizationToken,
  setUserId,
  getUserId,
  isSignedIn,
  setUser,
  getUser,
  getFirstName,
  getLastName,
  getEmail,
  getRole,
  getProfileImageUrl,
  getFullName,
  logout,
} from "./UserContextFunctions";

export const { Context, Provider } = CreateContext(
  reducer,
  { setAuthorizationToken, setUserId, setUser, logout },
  {
    getAuthorizationToken,
    getUserId,
    isSignedIn,
    getUser,
    getFirstName,
    getLastName,
    getEmail,
    getRole,
    getProfileImageUrl,
    getFullName,
  },
  state
);
