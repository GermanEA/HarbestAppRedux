import ACTION_TYPES from './actionsTypes.js';

export const fetchData = () => ({
  type: ACTION_TYPES.API_PENDING,
});

export const fetchSuccess = (data) => ({
  type: ACTION_TYPES.API_SUCCESS,
  payload: data,
});

export const fetchError = (error) => ({
  type: ACTION_TYPES.API_ERROR,
  payload: error,
});

export const recoverProduct = (data) => ({
    type: ACTION_TYPES.RECOVER_PRODUCT,
    payload: data,
});

export const deleteProduct = () => ({
    type: ACTION_TYPES.DELETE_PRODUCT
});

export const updateProduct = () => ({
    type: ACTION_TYPES.DELETE_PRODUCT
});