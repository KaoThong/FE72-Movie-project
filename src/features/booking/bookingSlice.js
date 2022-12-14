import produce from "immer";
import {
  SET_MOVIES,
  DETAIL_MOVIES,
  SET_CINEMAS,
  SET_SCHEDULE,
  SET_CAROUSEL,
  SET_SEAT,
} from "./action";

const initialState = {
  movies: null,
  selectedMovie: {},
  cinemas: null,
  schedule: null,
  carousel: [],
  lstSeat: [],
};

// shallow
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      const nextState = produce(state, (draft) => {
        draft.movies = action.payload;
      });
      return nextState;

    case DETAIL_MOVIES:
      const nextDetail = produce(state, (draft) => {
        draft.selectedMovie = action.payload;
      });
      return nextDetail;

    case SET_CINEMAS: {
      const nextState = produce(state, (draft) => {
        draft.cinemas = action.payload;
      });
      return nextState;
    }

    case SET_SCHEDULE: {
      const nextState = produce(state, (draft) => {
        draft.schedule = action.payload[0];
      });
      return nextState;
    }

    case SET_CAROUSEL: {
      const nextState = produce(state, (draft) => {
        draft.carousel = action.payload;
      });

      return nextState;
    }

    case SET_SEAT: {
      const nextState = produce(state, (draft) => {
        draft.lstSeat = action.payload;
      });

      return nextState;
    }

    default:
      return state;
  }
};

export default reducer;
