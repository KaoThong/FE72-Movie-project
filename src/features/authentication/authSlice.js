import produce from "immer";
import { SET_PROFILE, DEL_PROFILE } from "./action";

const initialState = {
  profile: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE: {
      const newState = produce(state, (draft) => {
        draft.profile = action.payload;
      });
      return newState;
    }
    case DEL_PROFILE: {
      const newState = produce(state, (draft) => {
        draft.profile = null;
      });
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
