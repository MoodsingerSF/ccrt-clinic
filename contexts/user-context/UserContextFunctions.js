export const setAuthorizationToken = (dispatch) => {
  return (token) => {
    dispatch({ type: "token", payload: { token } });
  };
};
export const getAuthorizationToken = (state) => {
  return () => state["token"];
};

export const setUserId = (dispatch) => {
  return (userId) => {
    dispatch({ type: "user-id", payload: { userId } });
  };
};
export const getUserId = (state) => {
  return () => state["userId"];
};

export const isSignedIn = (state) => {
  return () => state["token"] !== null;
};
