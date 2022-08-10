import { CreateContext } from "../CreateContext";
import { reducer } from "./UserContextReducer";
import { state } from "./UserContextState";
import {
  setAuthorizationToken,
  getAuthorizationToken,
  setUserId,
  getUserId,
  isSignedIn,
} from "./UserContextFunctions";

export const { Context, Provider } = CreateContext(
  reducer,
  { setAuthorizationToken, setUserId },
  { getAuthorizationToken, getUserId, isSignedIn },
  state
);
