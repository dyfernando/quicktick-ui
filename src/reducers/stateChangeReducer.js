const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MAIN_PAGE":
      return {
        ...state,
        mainPage: !state.mainPage,
        detailedOptions: action.detailedOptions,
        name: action.detailedOptions[0].name,
        recType: action.detailedOptions[0].recType
      };
    case "ON_FILE_CHANGE":
      return {
        ...state,
        selectedFile: action.filename
      };
    case "CHANGE_DISPLAY_CONTENT":
      return { ...state, name: action.name, recType: action.recType };
    case "RESET_STATE":
      return {
        ...state,
        mainPage: !state.mainPage,
        detailedOptions: [],
        name: "",
        recType: "",
        selectedFile: ""
      };
    case "RELOAD":
      return action.state
    default:
      return state;
  }
};
export default reducer;