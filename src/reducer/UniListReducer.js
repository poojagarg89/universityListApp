import * as types from '../action/actionTypes';

const initialState = {
  isFetching: false,
  universityDetails: [],
};

export default function getUniversityDetails(state = initialState, action) {
  switch (action.type) {
    case types.UNIVERSITY_LIST_REQUEST:
      return { ...state, isFetching: true };

    case types.UNIVERSITY_LIST_SUCCESS:
      return { isFetching: false, universityDetails: action.universityDetails };

    case types.UNIVERSITY_LIST_ERROR:
      return { ...state, isFetching: false, error: action.message };

    default:
      return state;
  }
}
