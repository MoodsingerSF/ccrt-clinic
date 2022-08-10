import { state as initialState } from "./UserContextState";
export const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "token":
      return { ...state, token: payload.token };
    case "user-id":
      return { ...state, userId: payload.userId };
    case "user":
      return { ...state, user: { ...payload } };
    case "logout":
      return { ...initialState };
    default:
      return state;
  }
};
