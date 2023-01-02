import { CreateContext } from "./CreateContext";
const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { open: true };
    case "close":
      return { open: false };
    default:
      return state;
  }
};

const openLoginPrompt = (dispatch) => {
  return () => {
    dispatch({ type: "open" });
  };
};

const closeLoginPrompt = (dispatch) => {
  return () => {
    dispatch({ type: "close" });
  };
};

const isOpen = (state) => {
  return () => state.open;
};

export const { Provider, Context } = CreateContext(
  reducer,
  { openLoginPrompt, closeLoginPrompt },
  { isOpen },
  { open: false }
);
