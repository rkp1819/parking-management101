export const initialState = {
  user: null,
  parkingSpaceData: {},
  parkingZoneData: [],
  displaySpaceData: [],
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_PARKINGZONEDATA: "SET_PARKINGZONEDATA",
  SET_PARKINGSPACEDATA: "SET_PARKINGSPACEDATA",
  SET_DISPLAYSPACEDATA: "SET_DISPLAYSPACEDATA",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_PARKINGSPACEDATA:
      return {
        ...state,
        parkingSpaceData: action.parkingSpaceData,
      };
    case actionTypes.SET_PARKINGZONEDATA:
      return {
        ...state,
        parkingZoneData: action.parkingZoneData,
      };
    case actionTypes.SET_DISPLAYSPACEDATA:
      return {
        ...state,
        displaySpaceData: action.displaySpaceData,
      };
    default:
      return state;
  }
};

export default reducer;
