const TOKEN_KEY = "authorization-token";
const USER_ID_KEY = "user-id";

export const isAuthorizationTokenAvailable = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};
export const retrieveAuthorizationToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthorizationToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const isUserIdAvailable = () => {
  return localStorage.getItem(USER_ID_KEY) !== null;
};
export const retrieveUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

export const setUserId = (token) => {
  localStorage.setItem(USER_ID_KEY, token);
};

export const clearStorage = () => {
  localStorage.clear();
};
