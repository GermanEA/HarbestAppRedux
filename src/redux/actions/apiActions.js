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

export const toastMessage = (message) => ({
    type: ACTION_TYPES.TOAST_SUCCESS,
    payload: message,
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

export const createProduct = () => ({
    type: ACTION_TYPES.CREATE_PRODUCT
});

export const changeFilterActive = (filterActive) => ({
    type: ACTION_TYPES.CHANGE_FILTER_ACTIVE,
    payload: filterActive
});

export const changePagination = (page) => ({
    type: ACTION_TYPES.CHANGE_PAGINATION,
    payload: page
});