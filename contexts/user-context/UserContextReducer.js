export const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "token":
      return { ...state, token: payload.token };
    case "user-id":
      return { ...state, userId: payload.userId };
    default:
      return state;
  }
};
