import ACTION_TYPES from '../actions/actionsTypes';

const initialState = {
  loading: false,
  data: '',
  error: '',
  currentPage: 0,
  filterActive: true,
  toastMessage: ''
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.API_PENDING:
      return {
        ...state,
        loading: true,
        error: ''
    };

    case ACTION_TYPES.API_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: ''
    };

    case ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
    };

    case ACTION_TYPES.TOAST_SUCCESS:
      return {
        ...state,
        toastMessage: action.payload,
    };

    case ACTION_TYPES.RECOVER_PRODUCT:
      return {
        ...state,
        loading: false,
        data: {
            list: [action.payload],
            totalCount: 1,
            nextPage: 0
        },
        error: ''
    };

    case ACTION_TYPES.DELETE_PRODUCT:
      return {
        ...state,
        loading: true,
        error: ''
    };

    case ACTION_TYPES.UPDATE_PRODUCT:
      return {
        ...state,
        loading: true,
        error: ''
    };

    case ACTION_TYPES.CREATE_PRODUCT:
      return {
        ...state,
        loading: true,
        error: ''
    };

    case ACTION_TYPES.CHANGE_FILTER_ACTIVE:
      return {
        ...state,
        filterActive: action.payload,
        loading: true,
        currentPage: 0
    };

    case ACTION_TYPES.CHANGE_PAGINATION:
      return {
        ...state,
        currentPage: action.payload,
        loading: true
    };

    default:
      return state;
  }
};

export default apiReducer;