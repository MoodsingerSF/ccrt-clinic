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

export const setUser = (dispatch) => {
  return (user) => {
    dispatch({ type: "user", payload: { ...user } });
  };
};
export const getUser = (state) => {
  return () => state["user"];
};
export const getFirstName = (state) => {
  return () => state["user"].firstName;
};
export const getLastName = (state) => {
  return () => state["user"].lastName;
};
export const getFullName = (state) => {
  return () => state["user"].firstName + " " + state["user"].lastName;
};
export const getEmail = (state) => {
  return () => state["user"].email;
};
export const getProfileImageUrl = (state) => {
  return () => state["user"].profileImageUrl;
};
export const getRole = (state) => {
  return () => state["user"].role;
};
export const logout = (dispatch) => {
  return () => {
    dispatch({ type: "logout" });
  };
};
