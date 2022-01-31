import React, { createContext, useReducer } from "react";
import stateChangeReducer from "../reducers/stateChangeReducer.js"

const initialState = {
  mainPage: true,
  detailedOptions: [],
  name: "",
  recType: "",
  selectedFile: ""
};


export const ReconcileContext = createContext();

export function ReconcileProvider(props) {
  const [state, dispatch] = useReducer(stateChangeReducer, initialState);

  return (
    <ReconcileContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ReconcileContext.Provider>
  );
}