import React, { useReducer } from "react";
import { createContext } from "react";

export const CreateContext = (reducer, setters, getters, initialState) => {
  const Context = createContext();

  // eslint-disable-next-line react/prop-types
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundSetters = [];
    const boundGetters = [];
    for (let key in setters) {
      boundSetters[key] = setters[key](dispatch);
    }
    for (let key in getters) {
      boundGetters[key] = getters[key](state);
    }

    return (
      <Context.Provider value={{ state, ...boundSetters, ...boundGetters }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
