import ACTION_TYPES from '../actions/actionsTypes';

const initialState = {
  loading: false,
  data: '',
  error: '',
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.API_PENDING:
      return {
        ...state,
        loading: true,
    };

    case ACTION_TYPES.API_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
    };

    case ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
    };

    case ACTION_TYPES.RECOVER_PRODUCT:
      return {
        ...state,
        loading: false,
        data: {
            list: [action.payload],
            totalCount: 1,
            nextPage: 0
        }
    };

    case ACTION_TYPES.DELETE_PRODUCT:
      return {
        ...state,
        loading: true,
    };

    case ACTION_TYPES.UPDATE_PRODUCT:
      return {
        ...state,
        loading: true,
    };

    default:
      return state;
  }
};

export default apiReducer;